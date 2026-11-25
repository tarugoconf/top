/** Options for {@linkcode LimitedTransformStream} */
export interface LimitedTransformStreamOptions {
  /**
   * If true, a {@linkcode RangeError} is thrown when the total number of
   * enqueued chunks is about to exceed the specified limit.
   *
   * @default {false}
   */
  error?: boolean;
}
/**
 * A {@linkcode TransformStream} that will only read & enqueue `size` amount of
 * chunks.
 *
 * If `options.error` is set, then instead of terminating the stream,
 * a {@linkcode RangeError} will be thrown when the total number of enqueued
 * chunks is about to exceed the specified size.
 *
 * @typeparam T The type the chunks in the stream.
 *
 * @example `size` is equal to the total number of chunks
 * ```ts
 * import { LimitedTransformStream } from "limited-transform-stream.ts";
 * import { assertEquals } from "../assert/mod.ts";
 *
 * const stream = ReadableStream.from(["1234", "5678"]);
 * const transformed = stream.pipeThrough(
 *   new LimitedTransformStream(2),
 * );
 *
 * // All chunks were read
 * assertEquals(
 *   await Array.fromAsync(transformed),
 *   ["1234", "5678"],
 * );
 * ```
 *
 * @example `size` is less than the total number of chunks
 * ```ts
 * import { LimitedTransformStream } from "limited-transform-stream.ts";
 * import { assertEquals } from "../assert/mod.ts";
 *
 * const stream = ReadableStream.from(["1234", "5678"]);
 * const transformed = stream.pipeThrough(
 *   new LimitedTransformStream(1),
 * );
 *
 * // Only the first chunk was read
 * assertEquals(
 *   await Array.fromAsync(transformed),
 *   ["1234"],
 * );
 * ```
 *
 * @example Throw a {@linkcode RangeError} when the total number of chunks is
 * about to exceed the specified limit
 *
 * Do this by setting `options.error` to `true`.
 *
 * ```ts
 * import { LimitedTransformStream } from "limited-transform-stream.ts";
 * import { assertRejects } from "../assert/mod.ts";
 *
 * const stream = ReadableStream.from(["1234", "5678"]);
 * const transformed = stream.pipeThrough(
 *   new LimitedTransformStream(1, { error: true }),
 * );
 *
 * await assertRejects(async () => {
 *   await Array.fromAsync(transformed);
 * }, RangeError);
 * ```
 */
export declare class LimitedTransformStream<T> extends TransformStream<T, T> {
  #private;
  /**
   * Constructs a new instance.
   *
   * @param size The maximum number of chunks to read.
   * @param options Options for the stream.
   */
  constructor(size: number, options?: LimitedTransformStreamOptions);
}
