// Copyright 2018-2026 the Deno authors. MIT license.
// This module is browser compatible.
/**
 * Calls the given reducer on each element of the given collection, passing its
 * result as the accumulator to the next respective call, starting with the
 * given initialValue. Returns all intermediate accumulator results.
 *
 * @typeParam T The type of the elements in the array.
 * @typeParam O The type of the accumulator.
 *
 * @param array The array to reduce.
 * @param reducer The reducer function to apply to each element.
 * @param initialValue The initial value of the accumulator.
 *
 * @returns An array of all intermediate accumulator results.
 *
 * @example Basic usage
 * ```ts
 * import { runningReduce } from "running-reduce.ts";
 * import { assertEquals } from "../assert/mod.ts";
 *
 * const numbers = [1, 2, 3, 4, 5];
 * const sumSteps = runningReduce(numbers, (sum, current) => sum + current, 0);
 *
 * assertEquals(sumSteps, [1, 3, 6, 10, 15]);
 * ```
 */
// deno-lint-ignore deno-style-guide/exported-function-args-maximum
export function runningReduce(array, reducer, initialValue) {
  let currentResult = initialValue;
  return array.map((el, currentIndex) =>
    currentResult = reducer(currentResult, el, currentIndex)
  );
}
