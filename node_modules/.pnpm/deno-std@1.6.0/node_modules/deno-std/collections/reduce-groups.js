// Copyright 2018-2026 the Deno authors. MIT license.
// This module is browser compatible.
import { mapValues } from "./map-values.js";
/**
 * Applies the given reducer to each group in the given grouping, returning the
 * results together with the respective group keys.
 *
 * @typeParam T input type of an item in a group in the given grouping.
 * @typeParam A type of the accumulator value, which will match the returned
 * record's values.
 *
 * @param record The grouping to reduce.
 * @param reducer The reducer function to apply to each group.
 * @param initialValue The initial value of the accumulator.
 *
 * @returns A record with the same keys as the input grouping, where each value
 * is the result of applying the reducer to the respective group.
 *
 * @example Basic usage
 * ```ts
 * import { reduceGroups } from "reduce-groups.ts";
 * import { assertEquals } from "../assert/mod.ts";
 *
 * const votes = {
 *   Woody: [2, 3, 1, 4],
 *   Buzz: [5, 9],
 * };
 *
 * const totalVotes = reduceGroups(votes, (sum, vote) => sum + vote, 0);
 *
 * assertEquals(totalVotes, {
 *   Woody: 10,
 *   Buzz: 14,
 * });
 * ```
 */
// deno-lint-ignore deno-style-guide/exported-function-args-maximum
export function reduceGroups(record, reducer, initialValue) {
  return mapValues(record, (value) => value.reduce(reducer, initialValue));
}
