/**
 * Multiplexes multiple async iterators into a single stream. It currently
 * makes an assumption that the final result (the value returned and not
 * yielded from the iterator) does not matter; if there is any result, it is
 * discarded.
 *
 * @example Usage
 * ```ts
 * import { MuxAsyncIterator } from "mux-async-iterator.ts";
 * import { assertEquals } from "../assert/mod.ts";
 *
 * async function* gen123(): AsyncIterableIterator<number> {
 *   yield 1;
 *   yield 2;
 *   yield 3;
 * }
 *
 * async function* gen456(): AsyncIterableIterator<number> {
 *   yield 4;
 *   yield 5;
 *   yield 6;
 * }
 *
 * const mux = new MuxAsyncIterator<number>();
 * mux.add(gen123());
 * mux.add(gen456());
 *
 * const result = await Array.fromAsync(mux);
 *
 * assertEquals(result, [1, 4, 2, 5, 3, 6]);
 * ```
 *
 * @typeParam T The type of the provided async iterables and generated async iterable.
 */
export declare class MuxAsyncIterator<T> implements AsyncIterable<T> {
  #private;
  /**
   * Add an async iterable to the stream.
   *
   * @param iterable The async iterable to add.
   *
   * @example Usage
   * ```ts
   * import { MuxAsyncIterator } from "mux-async-iterator.ts";
   * import { assertEquals } from "../assert/mod.ts";
   *
   * async function* gen123(): AsyncIterableIterator<number> {
   *   yield 1;
   *   yield 2;
   *   yield 3;
   * }
   *
   * const mux = new MuxAsyncIterator<number>();
   * mux.add(gen123());
   *
   * const result = await Array.fromAsync(mux.iterate());
   *
   * assertEquals(result, [1, 2, 3]);
   * ```
   */
  add(iterable: AsyncIterable<T>): void;
  /**
   * Returns an async iterator of the stream.
   * @returns the async iterator for all the added async iterables.
   *
   * @example Usage
   * ```ts
   * import { MuxAsyncIterator } from "mux-async-iterator.ts";
   * import { assertEquals } from "../assert/mod.ts";
   *
   * async function* gen123(): AsyncIterableIterator<number> {
   *   yield 1;
   *   yield 2;
   *   yield 3;
   * }
   *
   * const mux = new MuxAsyncIterator<number>();
   * mux.add(gen123());
   *
   * const result = await Array.fromAsync(mux.iterate());
   *
   * assertEquals(result, [1, 2, 3]);
   * ```
   */
  iterate(): AsyncIterableIterator<T>;
  /**
   * Implements an async iterator for the stream.
   * @returns the async iterator for all the added async iterables.
   *
   * @example Usage
   * ```ts
   * import { MuxAsyncIterator } from "mux-async-iterator.ts";
   * import { assertEquals } from "../assert/mod.ts";
   *
   * async function* gen123(): AsyncIterableIterator<number> {
   *   yield 1;
   *   yield 2;
   *   yield 3;
   * }
   *
   * const mux = new MuxAsyncIterator<number>();
   * mux.add(gen123());
   *
   * const result = await Array.fromAsync(mux);
   *
   * assertEquals(result, [1, 2, 3]);
   * ```
   */
  [Symbol.asyncIterator](): AsyncIterator<T>;
}
