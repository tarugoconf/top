/**
 * Returns the first element having the largest value according to the provided
 * comparator or undefined if there are no elements.
 *
 * The comparator is expected to work exactly like one passed to `Array.sort`,
 * which means that `comparator(a, b)` should return a negative number if
 * `a < b`, a positive number if `a > b` and `0` if `a === b`.
 *
 * @typeParam T The type of the elements in the array.
 *
 * @param array The array to find the maximum element in.
 * @param comparator The function to compare elements.
 *
 * @returns The first element that is the largest value of the given function or
 * undefined if there are no elements.
 *
 * @example Basic usage
 * ```ts
 * import { maxWith } from "max-with.ts";
 * import { assertEquals } from "../assert/mod.ts";
 *
 * const people = ["Kim", "Anna", "John", "Arthur"];
 * const largestName = maxWith(people, (a, b) => a.length - b.length);
 *
 * assertEquals(largestName, "Arthur");
 * ```
 */
export declare function maxWith<T>(
  array: Iterable<T>,
  comparator: (a: T, b: T) => number,
): T | undefined;
