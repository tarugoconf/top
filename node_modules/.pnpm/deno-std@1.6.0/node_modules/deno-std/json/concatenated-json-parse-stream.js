// Copyright 2018-2026 the Deno authors. MIT license.
import { toTransformStream } from "../streams/to-transform-stream.js";
import { parse } from "./_common.js";
function isBlankChar(char) {
  return char !== undefined && [" ", "\t", "\r", "\n"].includes(char);
}
const primitives = new Map(["null", "true", "false"].map((v) => [v[0], v]));
/**
 * Stream to parse
 * {@link https://en.wikipedia.org/wiki/JSON_streaming#Concatenated_JSON | Concatenated JSON}.
 *
 * @example Usage
 *
 * ```ts
 * import { ConcatenatedJsonParseStream } from "concatenated-json-parse-stream.ts";
 * import { assertEquals } from "../assert/mod.ts";
 *
 * const stream = ReadableStream.from([
 *   `{"foo":"bar"}`,
 *   `{"baz":100}`,
 * ]).pipeThrough(new ConcatenatedJsonParseStream());
 *
 * assertEquals(await Array.fromAsync(stream), [
 *   { foo: "bar" },
 *   { baz: 100 },
 * ]);
 * ```
 */
export class ConcatenatedJsonParseStream {
  /**
   * A writable stream of byte data.
   *
   * @example Usage
   * ```ts
   * import { ConcatenatedJsonParseStream } from "concatenated-json-parse-stream.ts";
   * import { assertEquals } from "../assert/mod.ts";
   *
   * const stream = ReadableStream.from([
   *   `{"foo":"bar"}`,
   *   `{"baz":100}`,
   * ]).pipeThrough(new ConcatenatedJsonParseStream());
   *
   * assertEquals(await Array.fromAsync(stream), [
   *   { foo: "bar" },
   *   { baz: 100 },
   * ]);
   * ```
   */
  writable;
  /**
   * A readable stream of byte data.
   *
   * @example Usage
   * ```ts
   * import { ConcatenatedJsonParseStream } from "concatenated-json-parse-stream.ts";
   * import { assertEquals } from "../assert/mod.ts";
   *
   * const stream = ReadableStream.from([
   *   `{"foo":"bar"}`,
   *   `{"baz":100}`,
   * ]).pipeThrough(new ConcatenatedJsonParseStream());
   *
   * assertEquals(await Array.fromAsync(stream), [
   *   { foo: "bar" },
   *   { baz: 100 },
   * ]);
   * ```
   */
  readable;
  /**
   * Constructs a new instance.
   */
  constructor() {
    const { writable, readable } = toTransformStream(
      this.#concatenatedJSONIterator,
    );
    this.writable = writable;
    this.readable = readable;
  }
  async *#concatenatedJSONIterator(src) {
    // Counts the number of '{', '}', '[', ']', and when the nesting level reaches 0, concatenates and returns the string.
    let targetString = "";
    let hasValue = false;
    let nestCount = 0;
    let readingString = false;
    let escapeNext = false;
    let readingPrimitive = false;
    let positionInPrimitive = 0;
    for await (const string of src) {
      let sliceStart = 0;
      for (let i = 0; i < string.length; i++) {
        const char = string[i];
        // We're reading a primitive at the top level
        if (readingPrimitive) {
          if (char === readingPrimitive[positionInPrimitive]) {
            positionInPrimitive++;
            // Emit the primitive when done reading
            if (positionInPrimitive === readingPrimitive.length) {
              yield parse(targetString + string.slice(sliceStart, i + 1));
              hasValue = false;
              readingPrimitive = false;
              positionInPrimitive = 0;
              targetString = "";
              sliceStart = i + 1;
            }
          } else {
            // If the primitive is malformed, keep reading, maybe the next characters can be useful in the syntax error.
            readingPrimitive = false;
            positionInPrimitive = 0;
          }
          continue;
        }
        if (readingString) {
          if (char === '"' && !escapeNext) {
            readingString = false;
            // When the nesting level is 0, it returns a string when '"' comes.
            if (nestCount === 0 && hasValue) {
              yield parse(targetString + string.slice(sliceStart, i + 1));
              hasValue = false;
              targetString = "";
              sliceStart = i + 1;
            }
          }
          escapeNext = !escapeNext && char === "\\";
          continue;
        }
        // Parses number with a nesting level of 0.
        // example: '0["foo"]' => 0, ["foo"]
        // example: '3.14{"foo": "bar"}' => 3.14, {foo: "bar"}
        if (
          hasValue && nestCount === 0 &&
          (char === "{" || char === "[" || char === '"' || char === " " ||
            char === "n" || char === "t" || char === "f")
        ) {
          yield parse(targetString + string.slice(sliceStart, i));
          hasValue = false;
          readingString = false;
          targetString = "";
          sliceStart = i;
          i--;
          continue;
        }
        switch (char) {
          case '"':
            readingString = true;
            escapeNext = false;
            break;
          case "{":
          case "[":
            nestCount++;
            break;
          case "}":
          case "]":
            nestCount--;
            break;
        }
        if (nestCount === 0 && primitives.has(char)) {
          // The first letter of a primitive at top level was found
          readingPrimitive = primitives.get(char);
          positionInPrimitive = 1;
        }
        // parse object or array
        if (
          hasValue && nestCount === 0 &&
          (char === "}" || char === "]")
        ) {
          yield parse(targetString + string.slice(sliceStart, i + 1));
          hasValue = false;
          targetString = "";
          sliceStart = i + 1;
          continue;
        }
        if (!hasValue && !isBlankChar(char)) {
          // We want to ignore the character string with only blank, so if there is a character other than blank, record it.
          hasValue = true;
        }
      }
      targetString += string.slice(sliceStart);
    }
    if (hasValue) {
      yield parse(targetString);
    }
  }
}
