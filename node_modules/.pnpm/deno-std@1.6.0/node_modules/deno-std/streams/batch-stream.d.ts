/**
 * A {@linkcode TransformStream} that groups input chunks into fixed-size
 * batches. Emits a `T[]` once `size` input chunks have been collected and
 * flushes any final non-empty partial batch when the input closes.
 *
 * Input order is preserved.
 *
 * For grouping an in-hand iterable instead of a stream, see
 * {@link https://jsr.io/@std/collections/doc/chunk | `chunk` from `@std/collections`}.
 * For resizing `Uint8Array` chunks at the byte level, see
 * {@linkcode FixedChunkStream}.
 *
 * @typeParam T The type of the input chunks.
 *
 * @example Batch records for bulk upload
 * ```ts
 * import { BatchStream } from "batch-stream.ts";
 * import { assertEquals } from "../assert/mod.ts";
 *
 * const records = ReadableStream.from([1, 2, 3, 4, 5])
 *   .pipeThrough(new BatchStream(2));
 *
 * assertEquals(await Array.fromAsync(records), [[1, 2], [3, 4], [5]]);
 * ```
 *
 * @example Type inference inside a pipeline
 * ```ts
 * import { BatchStream } from "batch-stream.ts";
 * import { assertEquals } from "../assert/mod.ts";
 *
 * interface User {
 *   id: string;
 * }
 *
 * const users: ReadableStream<User> = ReadableStream.from([
 *   { id: "a" },
 *   { id: "b" },
 *   { id: "c" },
 * ]);
 *
 * const batches: ReadableStream<User[]> = users.pipeThrough(
 *   new BatchStream(2),
 * );
 *
 * assertEquals(await Array.fromAsync(batches), [
 *   [{ id: "a" }, { id: "b" }],
 *   [{ id: "c" }],
 * ]);
 * ```
 */
export declare class BatchStream<T> extends TransformStream<T, T[]> {
  /**
   * Constructs a new instance.
   *
   * @param size The number of input chunks per emitted batch. Must be a
   * positive integer.
   */
  constructor(size: number);
}
