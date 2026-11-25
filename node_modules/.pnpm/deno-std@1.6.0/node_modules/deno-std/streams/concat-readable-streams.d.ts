/**
 * Concatenates multiple `ReadableStream`s into a single ordered
 * `ReadableStream`.
 *
 * Cancelling the resulting stream will cancel all the input streams.
 *
 * @typeParam T The type of the chunks in the streams.
 * @param streams An iterable of `ReadableStream`s to concat.
 * @returns A `ReadableStream` that will emit the concatenated chunks.
 *
 * @example Usage
 * ```ts
 * import { concatReadableStreams } from "concat-readable-streams.ts";
 * import { assertEquals } from "../assert/mod.ts";
 *
 * const stream1 = ReadableStream.from([1, 2, 3]);
 * const stream2 = ReadableStream.from([4, 5, 6]);
 * const stream3 = ReadableStream.from([7, 8, 9]);
 *
 * assertEquals(
 *   await Array.fromAsync(concatReadableStreams(stream1, stream2, stream3)),
 *   [1, 2, 3, 4, 5, 6, 7, 8, 9],
 * );
 * ```
 */
export declare function concatReadableStreams<T>(
  ...streams: ReadableStream<T>[]
): ReadableStream<T>;
