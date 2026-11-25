/**
 * pooledMap transforms values from an (async) iterable into another async
 * iterable. The transforms are done concurrently, with a max concurrency
 * defined by the poolLimit.
 *
 * If an error is thrown from `iterableFn`, no new transformations will begin.
 * All currently executing transformations are allowed to finish and still
 * yielded on success. After that, the rejections among them are gathered and
 * thrown by the iterator in an `AggregateError`.
 *
 * @example Usage
 * ```ts
 * import { pooledMap } from "pool.ts";
 * import { assertEquals } from "../assert/mod.ts";
 *
 * const results = pooledMap(
 *   2,
 *   [1, 2, 3],
 *   (i) => new Promise((r) => setTimeout(() => r(i), 1000)),
 * );
 *
 * assertEquals(await Array.fromAsync(results), [1, 2, 3]);
 * ```
 *
 * @typeParam T the input type.
 * @typeParam R the output type.
 * @param poolLimit The maximum count of items being processed concurrently.
 * Must be a positive integer.
 * @param array The input array for mapping.
 * @param iteratorFn The function to call for every item of the array.
 * @returns The async iterator with the transformed values.
 * @throws {RangeError} If `poolLimit` is not a positive integer.
 */
export declare function pooledMap<T, R>(
  poolLimit: number,
  array: Iterable<T> | AsyncIterable<T>,
  iteratorFn: (data: T) => Promise<R>,
): AsyncIterableIterator<R>;
