// Copyright 2018-2026 the Deno authors. MIT license.
// This module is browser compatible.
/**
 * Builds all possible orders of all elements in the given array.
 * Ignores equality of elements, meaning this will always return the same
 * number of permutations for a given length of input.
 *
 * @typeParam T The type of the elements in the array.
 *
 * @param inputArray The array to build permutations from.
 *
 * @returns An array of all possible permutations of the given array.
 *
 * @example Basic usage
 * ```ts
 * import { permutations } from "permutations.ts";
 * import { assertEquals } from "../assert/mod.ts";
 *
 * const numbers = [ 1, 2 ];
 * const windows = permutations(numbers);
 *
 * assertEquals(windows, [
 *   [ 1, 2 ],
 *   [ 2, 1 ],
 * ]);
 * ```
 */
export function permutations(inputArray) {
  const result = [];
  const array = [...inputArray];
  const k = array.length;
  if (k === 0) {
    return result;
  }
  // Heap's Algorithm
  const c = new Array(k).fill(0);
  result.push([...array]);
  let i = 1;
  while (i < k) {
    if (c[i] < i) {
      if (i % 2 === 0) {
        [array[0], array[i]] = [array[i], array[0]];
      } else {
        [array[c[i]], array[i]] = [array[i], array[c[i]]];
      }
      result.push([...array]);
      c[i] += 1;
      i = 1;
    } else {
      c[i] = 0;
      i += 1;
    }
  }
  return result;
}
