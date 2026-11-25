// Copyright 2018-2026 the Deno authors. MIT license.
// This module is browser compatible.
import {
  convertRowToObject,
  createBareQuoteErrorMessage,
  createQuoteErrorMessage,
} from "./_io.js";
import { codePointLength } from "./_shared.js";
const BYTE_ORDER_MARK = "\ufeff";
class Parser {
  #input = "";
  #cursor = 0;
  #options;
  constructor(
    {
      separator = ",",
      trimLeadingSpace = false,
      comment,
      lazyQuotes,
      fieldsPerRecord,
    } = {},
  ) {
    this.#options = {
      separator,
      trimLeadingSpace,
      comment,
      lazyQuotes,
      fieldsPerRecord,
    };
  }
  #readLine() {
    if (this.#isEOF()) {
      return null;
    }
    let buffer = "";
    let hadNewline = false;
    while (this.#cursor < this.#input.length) {
      if (this.#input.startsWith("\r\n", this.#cursor)) {
        hadNewline = true;
        this.#cursor += 2;
        break;
      }
      if (this.#input.startsWith("\n", this.#cursor)) {
        hadNewline = true;
        this.#cursor += 1;
        break;
      }
      buffer += this.#input[this.#cursor];
      this.#cursor += 1;
    }
    if (!hadNewline && buffer.endsWith("\r")) {
      buffer = buffer.slice(0, -1);
    }
    return buffer;
  }
  #isEOF() {
    return this.#cursor >= this.#input.length;
  }
  #parseRecord(zeroBasedStartLine) {
    let fullLine = this.#readLine();
    if (fullLine === null) {
      return null;
    }
    if (fullLine.length === 0) {
      return [];
    }
    let zeroBasedLine = zeroBasedStartLine;
    // line starting with comment character is ignored
    if (this.#options.comment && fullLine[0] === this.#options.comment) {
      return [];
    }
    let line = fullLine;
    const quote = '"';
    const quoteLen = quote.length;
    const separatorLen = this.#options.separator.length;
    let recordBuffer = "";
    const fieldIndexes = [];
    parseField: while (true) {
      if (this.#options.trimLeadingSpace) {
        line = line.trimStart();
      }
      if (line.length === 0 || !line.startsWith(quote)) {
        // Non-quoted string field
        const i = line.indexOf(this.#options.separator);
        let field = line;
        if (i >= 0) {
          field = field.substring(0, i);
        }
        // Check to make sure a quote does not appear in field.
        if (!this.#options.lazyQuotes) {
          const j = field.indexOf(quote);
          if (j >= 0) {
            const col = codePointLength(
              fullLine.slice(0, fullLine.length - line.slice(j).length),
            );
            throw new SyntaxError(
              createBareQuoteErrorMessage(
                zeroBasedStartLine,
                zeroBasedLine,
                col,
              ),
            );
          }
        }
        recordBuffer += field;
        fieldIndexes.push(recordBuffer.length);
        if (i >= 0) {
          line = line.substring(i + separatorLen);
          continue parseField;
        }
        break parseField;
      } else {
        // Quoted string field
        line = line.substring(quoteLen);
        while (true) {
          const i = line.indexOf(quote);
          if (i >= 0) {
            // Hit next quote.
            recordBuffer += line.substring(0, i);
            line = line.substring(i + quoteLen);
            if (line.startsWith(quote)) {
              // `""` sequence (append quote).
              recordBuffer += quote;
              line = line.substring(quoteLen);
            } else if (line.startsWith(this.#options.separator)) {
              // `","` sequence (end of field).
              line = line.substring(separatorLen);
              fieldIndexes.push(recordBuffer.length);
              continue parseField;
            } else if (0 === line.length) {
              // `"\n` sequence (end of line).
              fieldIndexes.push(recordBuffer.length);
              break parseField;
            } else if (this.#options.lazyQuotes) {
              // `"` sequence (bare quote).
              recordBuffer += quote;
            } else {
              // `"*` sequence (invalid non-escaped quote).
              const col = codePointLength(
                fullLine.slice(0, fullLine.length - line.length - quoteLen),
              );
              throw new SyntaxError(
                createQuoteErrorMessage(zeroBasedStartLine, zeroBasedLine, col),
              );
            }
          } else if (line.length > 0 || !(this.#isEOF())) {
            // Hit end of line (copy all data so far).
            recordBuffer += line;
            const r = this.#readLine();
            line = r ?? ""; // This is a workaround for making this module behave similarly to the encoding/csv/reader.go.
            fullLine = line;
            if (r === null) {
              // Abrupt end of file (EOF or error).
              if (!this.#options.lazyQuotes) {
                const col = codePointLength(fullLine);
                throw new SyntaxError(
                  createQuoteErrorMessage(
                    zeroBasedStartLine,
                    zeroBasedLine,
                    col,
                  ),
                );
              }
              fieldIndexes.push(recordBuffer.length);
              break parseField;
            }
            zeroBasedLine++;
            recordBuffer += "\n"; // preserve line feed (This is because TextProtoReader removes it.)
          } else {
            // Abrupt end of file (EOF on error).
            if (!this.#options.lazyQuotes) {
              const col = codePointLength(fullLine);
              throw new SyntaxError(
                createQuoteErrorMessage(zeroBasedStartLine, zeroBasedLine, col),
              );
            }
            fieldIndexes.push(recordBuffer.length);
            break parseField;
          }
        }
      }
    }
    const result = [];
    let preIdx = 0;
    for (const i of fieldIndexes) {
      result.push(recordBuffer.slice(preIdx, i));
      preIdx = i;
    }
    return result;
  }
  parse(input) {
    this.#input = input.startsWith(BYTE_ORDER_MARK) ? input.slice(1) : input;
    this.#cursor = 0;
    const result = [];
    let lineResult;
    let first = true;
    let lineIndex = 0;
    const INVALID_RUNE = ["\r", "\n", '"'];
    const options = this.#options;
    if (
      INVALID_RUNE.includes(options.separator) ||
      (typeof options.comment === "string" &&
        INVALID_RUNE.includes(options.comment)) ||
      options.separator === options.comment
    ) {
      throw new Error("Cannot parse input: invalid delimiter");
    }
    // The number of fields per record that is either inferred from the first
    // row (when options.fieldsPerRecord = 0), or set by the caller (when
    // options.fieldsPerRecord > 0).
    //
    // Each possible variant means the following:
    // "ANY": Variable number of fields is allowed.
    // "UNINITIALIZED": The first row has not been read yet. Once it's read, the
    //                  number of fields will be set.
    // <number>: The number of fields per record that every record must follow.
    let _nbFields;
    if (options.fieldsPerRecord === undefined || options.fieldsPerRecord < 0) {
      _nbFields = "ANY";
    } else if (options.fieldsPerRecord === 0) {
      _nbFields = "UNINITIALIZED";
    } else {
      // TODO(magurotuna): Should we check if it's a valid integer?
      _nbFields = options.fieldsPerRecord;
    }
    while (true) {
      const r = this.#parseRecord(lineIndex);
      if (r === null) {
        break;
      }
      lineResult = r;
      lineIndex++;
      // If fieldsPerRecord is 0, Read sets it to
      // the number of fields in the first record
      if (first) {
        first = false;
        if (_nbFields === "UNINITIALIZED") {
          _nbFields = lineResult.length;
        }
      }
      if (lineResult.length > 0) {
        if (typeof _nbFields === "number" && _nbFields !== lineResult.length) {
          throw new SyntaxError(
            `Syntax error on line ${lineIndex}: expected ${_nbFields} fields but got ${lineResult.length}`,
          );
        }
        result.push(lineResult);
      }
    }
    return result;
  }
}
export function parse(input, options = { skipFirstRow: false }) {
  const parser = new Parser(options);
  const r = parser.parse(input);
  if (options.skipFirstRow || options.columns) {
    let headers = [];
    if (options.skipFirstRow) {
      const head = r.shift();
      if (head === undefined) {
        throw new TypeError("Cannot parse input: headers must be defined");
      }
      headers = head;
    }
    if (options.columns) {
      headers = options.columns;
    }
    const zeroBasedFirstLineIndex = options.skipFirstRow ? 1 : 0;
    return r.map((row, i) => {
      return convertRowToObject(row, headers, zeroBasedFirstLineIndex + i);
    });
  }
  return r;
}
