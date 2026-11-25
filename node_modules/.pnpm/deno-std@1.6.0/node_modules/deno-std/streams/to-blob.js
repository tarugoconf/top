// Copyright 2018-2026 the Deno authors. MIT license.
// This module is browser compatible.
/**
 * Converts a {@linkcode ReadableStream} of {@linkcode Uint8Array}s to a
 * {@linkcode Blob}. Works the same as {@linkcode Response.blob}.
 *
 * @param stream A `ReadableStream` of `Uint8Array`s to convert into a `Blob`.
 * @returns A `Promise` that resolves to the `Blob`.
 *
 * @example Basic usage
 * ```ts
 * import { toBlob } from "to-blob.ts";
 * import { assertEquals } from "../assert/mod.ts";
 *
 * const stream = ReadableStream.from([
 *   new Uint8Array([1, 2]),
 *   new Uint8Array([3, 4, 5]),
 * ]);
 * const blob = await toBlob(stream);
 * assertEquals(blob.size, 5);
 * ```
 */
export async function toBlob(stream) {
  return await new Response(stream).blob();
}
