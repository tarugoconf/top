// Copyright 2018-2026 the Deno authors. MIT license.
// This module is browser compatible.
/**
 * Returns the first element having the smallest value according to the provided
 * comparator or undefined if there are no elements.
 *
 * @typeParam T The type of the elements in the array.
 *
 * @param array The array to find the minimum element in.
 * @param comparator The function to compare elements.
 *
 * @returns The first element that is the smallest value of the given function
 * or undefined if there are no elements.
 *
 * @example Basic usage
 * ```ts
 * import { minWith } from "min-with.ts";
 * import { assertEquals } from "../assert/mod.ts";
 *
 * const people = ["Kim", "Anna", "John"];
 * const smallestName = minWith(people, (a, b) => a.length - b.length);
 *
 * assertEquals(smallestName, "Kim");
 * ```
 */
export function minWith(array, comparator) {
  let min;
  let isFirst = true;
  for (const current of array) {
    if (isFirst || comparator(current, min) < 0) {
      min = current;
      isFirst = false;
    }
  }
  return min;
}
