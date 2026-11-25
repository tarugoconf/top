/**
 * Builds N-tuples of elements from the given N iterables with matching
 * indices, stopping when the shortest iterable is exhausted.
 *
 * Notes:
 * - Inputs are consumed eagerly. Non-array iterables are materialized via
 *   `Array.from` before zipping, so passing an infinite iterable (such as an
 *   unbounded generator) will hang.
 * - Strings are iterables of code points. Passing a string zips it
 *   character-by-character rather than treating it as a single scalar value.
 *
 * @typeParam T The tuple of element types in the input iterables.
 *
 * @param iterables The iterables to zip.
 *
 * @returns A new array containing N-tuples of elements from the given
 * iterables.
 *
 * @example Basic usage
 * ```ts
 * import { zip } from "zip.ts";
 * import { assertEquals } from "../assert/mod.ts";
 *
 * const numbers = [1, 2, 3, 4];
 * const letters = ["a", "b", "c", "d"];
 * const pairs = zip(numbers, letters);
 *
 * assertEquals(
 *   pairs,
 *   [
 *     [1, "a"],
 *     [2, "b"],
 *     [3, "c"],
 *     [4, "d"],
 *   ],
 * );
 * ```
 *
 * @example With iterables
 * ```ts
 * import { zip } from "zip.ts";
 * import { assertEquals } from "../assert/mod.ts";
 *
 * assertEquals(
 *   zip(new Set([1, 2, 3]), ["a", "b", "c"]),
 *   [[1, "a"], [2, "b"], [3, "c"]],
 * );
 * ```
 *
 * @example Strings are iterables
 * ```ts
 * import { zip } from "zip.ts";
 * import { assertEquals } from "../assert/mod.ts";
 *
 * // A string is zipped character-by-character, not as a single value.
 * assertEquals(
 *   zip("abc", [1, 2, 3]),
 *   [["a", 1], ["b", 2], ["c", 3]],
 * );
 * ```
 */
export declare function zip<T extends unknown[]>(
  ...iterables: {
    [K in keyof T]: Iterable<T[K]>;
  }
): T[];
