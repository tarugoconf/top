import type { JsonValue } from "./types.ts";
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
export declare class ConcatenatedJsonParseStream
  implements TransformStream<string, JsonValue> {
  #private;
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
  readonly writable: WritableStream<string>;
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
  readonly readable: ReadableStream<JsonValue>;
  /**
   * Constructs a new instance.
   */
  constructor();
}
