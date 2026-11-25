/**
 * Converts a {@linkcode ReadableSteam} of strings or {@linkcode Uint8Array}s
 * to a single string. Works the same as {@linkcode Response.text} and
 * {@linkcode Request.text}, but also extends to support streams of strings.
 *
 * @param stream A `ReadableStream` to convert into a `string`.
 * @returns A `Promise` that resolves to the `string`.
 *
 * @example Basic usage with a stream of strings
 * ```ts
 * import { toText } from "to-text.ts";
 * import { assertEquals } from "../assert/mod.ts";
 *
 * const stream = ReadableStream.from(["Hello, ", "world!"]);
 * assertEquals(await toText(stream), "Hello, world!");
 * ```
 *
 * @example Basic usage with a stream of `Uint8Array`s
 * ```ts
 * import { toText } from "to-text.ts";
 * import { assertEquals } from "../assert/mod.ts";
 *
 * const stream = ReadableStream.from(["Hello, ", "world!"])
 *   .pipeThrough(new TextEncoderStream());
 * assertEquals(await toText(stream), "Hello, world!");
 * ```
 */
export declare function toText(
  stream: ReadableStream<string> | ReadableStream<Uint8Array>,
): Promise<string>;
