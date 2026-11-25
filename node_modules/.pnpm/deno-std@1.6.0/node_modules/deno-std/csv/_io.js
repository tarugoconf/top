// Originally ported from Go:
// https://github.com/golang/go/blob/go1.12.5/src/encoding/csv/
// Copyright 2011 The Go Authors. All rights reserved. BSD license.
// https://github.com/golang/go/blob/master/LICENSE
// Copyright 2018-2026 the Deno authors. MIT license.
import { codePointLength } from "./_shared.js";
export async function parseRecord(
  fullLine,
  reader,
  options,
  zeroBasedRecordStartLine,
  zeroBasedLine = zeroBasedRecordStartLine,
) {
  // line starting with comment character is ignored
  if (options.comment && fullLine[0] === options.comment) {
    return [];
  }
  if (options.separator === undefined) {
    throw new TypeError("Cannot parse record: separator is required");
  }
  let line = fullLine;
  const quote = '"';
  const quoteLen = quote.length;
  const separatorLen = options.separator.length;
  let recordBuffer = "";
  const fieldIndexes = [];
  parseField: while (true) {
    if (options.trimLeadingSpace) {
      line = line.trimStart();
    }
    if (line.length === 0 || !line.startsWith(quote)) {
      // Non-quoted string field
      const i = line.indexOf(options.separator);
      let field = line;
      if (i >= 0) {
        field = field.substring(0, i);
      }
      // Check to make sure a quote does not appear in field.
      if (!options.lazyQuotes) {
        const j = field.indexOf(quote);
        if (j >= 0) {
          const col = codePointLength(
            fullLine.slice(0, fullLine.length - line.slice(j).length),
          );
          throw new SyntaxError(
            createBareQuoteErrorMessage(
              zeroBasedRecordStartLine,
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
          } else if (line.startsWith(options.separator)) {
            // `","` sequence (end of field).
            line = line.substring(separatorLen);
            fieldIndexes.push(recordBuffer.length);
            continue parseField;
          } else if (0 === line.length) {
            // `"\n` sequence (end of line).
            fieldIndexes.push(recordBuffer.length);
            break parseField;
          } else if (options.lazyQuotes) {
            // `"` sequence (bare quote).
            recordBuffer += quote;
          } else {
            // `"*` sequence (invalid non-escaped quote).
            const col = codePointLength(
              fullLine.slice(0, fullLine.length - line.length - quoteLen),
            );
            throw new SyntaxError(
              createQuoteErrorMessage(
                zeroBasedRecordStartLine,
                zeroBasedLine,
                col,
              ),
            );
          }
        } else if (line.length > 0 || !reader.isEOF()) {
          // Hit end of line (copy all data so far).
          recordBuffer += line;
          const r = await reader.readLine();
          line = r ?? ""; // This is a workaround for making this module behave similarly to the encoding/csv/reader.go.
          fullLine = line;
          if (r === null) {
            // Abrupt end of file (EOF or error).
            if (!options.lazyQuotes) {
              const col = codePointLength(fullLine);
              throw new SyntaxError(
                createQuoteErrorMessage(
                  zeroBasedRecordStartLine,
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
          if (!options.lazyQuotes) {
            const col = codePointLength(fullLine);
            throw new SyntaxError(
              createQuoteErrorMessage(
                zeroBasedRecordStartLine,
                zeroBasedLine,
                col,
              ),
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
export function createBareQuoteErrorMessage(
  zeroBasedRecordStartLine,
  zeroBasedLine,
  zeroBasedColumn,
) {
  return `Syntax error on line ${
    zeroBasedRecordStartLine + 1
  }; parse error on line ${zeroBasedLine + 1}, column ${
    zeroBasedColumn + 1
  }: bare " in non-quoted-field`;
}
export function createQuoteErrorMessage(
  zeroBasedRecordStartLine,
  zeroBasedLine,
  zeroBasedColumn,
) {
  return `Syntax error on line ${
    zeroBasedRecordStartLine + 1
  }; parse error on line ${zeroBasedLine + 1}, column ${
    zeroBasedColumn + 1
  }: extraneous or missing " in quoted-field`;
}
export function convertRowToObject(row, headers, zeroBasedLine) {
  if (row.length !== headers.length) {
    throw new Error(
      `Syntax error on line ${
        zeroBasedLine + 1
      }: The record has ${row.length} fields, but the header has ${headers.length} fields`,
    );
  }
  const out = {};
  for (const [index, header] of headers.entries()) {
    out[header] = row[index];
  }
  return out;
}
