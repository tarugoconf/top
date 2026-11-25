/**
 * Converts a
 * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON}-formatted
 * {@linkcode ReadableSteam} of strings or {@linkcode Uint8Array}s to an object.
 * Works the same as {@linkcode Response.json} and {@linkcode Request.json}, but
 * also extends to support streams of strings.
 *
 * @param stream A `ReadableStream` whose chunks compose a JSON.
 * @returns A promise that resolves to the parsed JSON.
 *
 * @example Usage with a stream of strings
 * ```ts
 * import { toJson } from "to-json.ts";
 * import { assertEquals } from "../assert/mod.ts";
 *
 * const stream = ReadableStream.from([
 *   "[1, true",
 *   ', [], {}, "hello',
 *   '", null]',
 * ]);
 * assertEquals(await toJson(stream), [1, true, [], {}, "hello", null]);
 * ```
 *
 * @example Usage with a stream of `Uint8Array`s
 * ```ts
 * import { toJson } from "to-json.ts";
 * import { assertEquals } from "../assert/mod.ts";
 *
 * const stream = ReadableStream.from([
 *   "[1, true",
 *   ', [], {}, "hello',
 *   '", null]',
 * ]).pipeThrough(new TextEncoderStream());
 * assertEquals(await toJson(stream), [1, true, [], {}, "hello", null]);
 * ```
 */
export declare function toJson(
  stream: ReadableStream<string> | ReadableStream<Uint8Array>,
): Promise<unknown>;
