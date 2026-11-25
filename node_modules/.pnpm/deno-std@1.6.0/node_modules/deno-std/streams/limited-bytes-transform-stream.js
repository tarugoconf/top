// Copyright 2018-2026 the Deno authors. MIT license.
// This module is browser compatible.
/**
 * A {@linkcode TransformStream} that will only read & enqueue chunks until the
 * total amount of enqueued data exceeds `size`. The last chunk that would
 * exceed the limit will NOT be enqueued, in which case a {@linkcode RangeError}
 * is thrown when `options.error` is set to true, otherwise the stream is just
 * terminated.
 *
 * @example `size` is equal to the total byte length of the chunks
 * ```ts
 * import { LimitedBytesTransformStream } from "limited-bytes-transform-stream.ts";
 * import { assertEquals } from "../assert/mod.ts";
 *
 * const stream = ReadableStream.from(["1234", "5678"]);
 * const transformed = stream.pipeThrough(new TextEncoderStream()).pipeThrough(
 *   new LimitedBytesTransformStream(8),
 * ).pipeThrough(new TextDecoderStream());
 *
 * assertEquals(
 *   await Array.fromAsync(transformed),
 *   ["1234", "5678"],
 * );
 * ```
 *
 * @example `size` is less than the total byte length of the chunks, and at the
 * boundary of the chunks
 * ```ts
 * import { LimitedBytesTransformStream } from "limited-bytes-transform-stream.ts";
 * import { assertEquals } from "../assert/mod.ts";
 *
 * const stream = ReadableStream.from(["1234", "5678"]);
 * const transformed = stream.pipeThrough(new TextEncoderStream()).pipeThrough(
 *   // `4` is the boundary of the chunks
 *   new LimitedBytesTransformStream(4),
 * ).pipeThrough(new TextDecoderStream());
 *
 * assertEquals(
 *   await Array.fromAsync(transformed),
 *   // The first chunk was read, but the second chunk was not
 *   ["1234"],
 * );
 * ```
 *
 * @example `size` is less than the total byte length of the chunks, and not at
 * the boundary of the chunks
 * ```ts
 * import { LimitedBytesTransformStream } from "limited-bytes-transform-stream.ts";
 * import { assertEquals } from "../assert/mod.ts";
 *
 * const stream = ReadableStream.from(["1234", "5678"]);
 * const transformed = stream.pipeThrough(new TextEncoderStream()).pipeThrough(
 *   // `5` is not the boundary of the chunks
 *   new LimitedBytesTransformStream(5),
 * ).pipeThrough(new TextDecoderStream());
 *
 * assertEquals(
 *   await Array.fromAsync(transformed),
 *   // The second chunk was not read because it would exceed the specified size
 *   ["1234"],
 * );
 * ```
 *
 * @example Throw error when the total byte length of the chunks exceeds the
 * specified size
 *
 * To do so, set `options.error` to `true`.
 *
 * ```ts
 * import { LimitedBytesTransformStream } from "limited-bytes-transform-stream.ts";
 * import { assertRejects } from "../assert/mod.ts";
 *
 * const stream = ReadableStream.from(["1234", "5678"]);
 * const transformed = stream.pipeThrough(new TextEncoderStream()).pipeThrough(
 *   new LimitedBytesTransformStream(5, { error: true }),
 * ).pipeThrough(new TextDecoderStream());
 *
 * await assertRejects(async () => {
 *   await Array.fromAsync(transformed);
 * }, RangeError);
 * ```
 */
export class LimitedBytesTransformStream extends TransformStream {
  #read = 0;
  /**
   * Constructs a new instance.
   *
   * @param size A size limit in bytes.
   * @param options Options for the stream.
   */
  constructor(size, options = { error: false }) {
    super({
      transform: (chunk, controller) => {
        if ((this.#read + chunk.byteLength) > size) {
          if (options.error) {
            throw new RangeError(`Exceeded byte size limit of '${size}'`);
          } else {
            controller.terminate();
          }
        } else {
          this.#read += chunk.byteLength;
          controller.enqueue(chunk);
        }
      },
    });
  }
}
