/**
 * Converts a {@linkcode ReadableStream} of {@linkcode Uint8Array}s to a
 * {@linkcode Uint8Array}. Works the same as {@linkcode Response.bytes}.
 *
 * @param stream A `ReadableStream` of `Uint8Array`s to convert into a `Uint8Array`.
 * @returns A `Promise` that resolves to the `Uint8Array`.
 *
 * @example Basic usage
 * ```ts
 * import { toBytes } from "to-bytes.ts";
 * import { assertEquals } from "../assert/mod.ts";
 *
 * const stream = ReadableStream.from([
 *   new Uint8Array([1, 2]),
 *   new Uint8Array([3, 4, 5]),
 * ]);
 * const bytes = await toBytes(stream);
 * assertEquals(bytes, new Uint8Array([1, 2, 3, 4, 5]));
 * ```
 */
export declare function toBytes(
  stream: ReadableStream<Uint8Array>,
): Promise<Uint8Array>;
