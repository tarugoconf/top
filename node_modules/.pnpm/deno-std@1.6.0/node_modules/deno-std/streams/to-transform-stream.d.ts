/**
 * Convert the generator function into a {@linkcode TransformStream}.
 *
 * @typeparam I The type of the chunks in the source stream.
 * @typeparam O The type of the chunks in the transformed stream.
 * @param transformer A function to transform. Must return an iterable or async iterable.
 * @param writableStrategy An object that optionally defines a queuing strategy
 * for the stream's internal buffer between source and transformer.
 * @param readableStrategy An object that optionally defines a queuing strategy
 * for the stream's output buffer.
 * @returns A {@linkcode TransformStream} that transforms the source stream as defined by the provided transformer.
 *
 * @throws {TypeError} If `transformer` does not return an iterable or async iterable.
 *
 * When the output stream is cancelled, the cancellation is propagated to both
 * the iterator (via `throw()`) and the source readable stream.
 *
 * When the iterator throws an error, the error is propagated to both the output
 * readable stream and the source readable stream (via `cancel()`).
 *
 * @example Build a transform stream that multiplies each value by 100
 * ```ts
 * import { toTransformStream } from "to-transform-stream.ts";
 * import { assertEquals } from "../assert/mod.ts";
 *
 * const stream = ReadableStream.from([0, 1, 2])
 *   .pipeThrough(toTransformStream(async function* (src) {
 *     for await (const chunk of src) {
 *       yield chunk * 100;
 *     }
 *   }));
 *
 * assertEquals(
 *   await Array.fromAsync(stream),
 *   [0, 100, 200],
 * );
 * ```
 *
 * @example JSON Lines
 * ```ts
 * import { TextLineStream } from "text-line-stream.ts";
 * import { toTransformStream } from "to-transform-stream.ts";
 * import { assertEquals } from "../assert/mod.ts";
 *
 * const stream = ReadableStream.from([
 *   '{"name": "Alice", "age": ',
 *   '30}\n{"name": "Bob", "age"',
 *   ": 25}\n",
 * ]);
 *
 * type Person = { name: string; age: number };
 *
 * // Split the stream by newline and parse each line as a JSON object
 * const jsonStream = stream.pipeThrough(new TextLineStream())
 *   .pipeThrough(toTransformStream(async function* (src) {
 *     for await (const chunk of src) {
 *       if (chunk.trim().length === 0) {
 *         continue;
 *       }
 *       yield JSON.parse(chunk) as Person;
 *     }
 *   }));
 *
 * assertEquals(
 *   await Array.fromAsync(jsonStream),
 *   [{ "name": "Alice", "age": 30 }, { "name": "Bob", "age": 25 }],
 * );
 * ```
 */
export declare function toTransformStream<I, O>(
  transformer: (src: ReadableStream<I>) => Iterable<O> | AsyncIterable<O>,
  writableStrategy?: QueuingStrategy<I>,
  readableStrategy?: QueuingStrategy<O>,
): TransformStream<I, O>;
