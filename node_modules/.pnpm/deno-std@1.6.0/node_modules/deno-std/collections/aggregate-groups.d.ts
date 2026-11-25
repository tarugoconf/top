/**
 * Applies the given aggregator to each group in the given grouping, returning the
 * results together with the respective group keys
 *
 * @typeParam T Type of the values in the input record.
 * @typeParam A Type of the accumulator value, which will match the returned
 * record's values.
 *
 * @param record The grouping to aggregate.
 * @param aggregator The function to apply to each group.
 *
 * @returns A record with the same keys as the input record, but with the values
 * being the result of applying the aggregator to each group.
 *
 * @example Basic usage
 * ```ts
 * import { aggregateGroups } from "aggregate-groups.ts";
 * import { assertEquals } from "../assert/mod.ts";
 *
 * const foodProperties = {
 *   Curry: ["spicy", "vegan"],
 *   Omelette: ["creamy", "vegetarian"],
 * };
 *
 * const descriptions = aggregateGroups(
 *   foodProperties,
 *   (current, key, first, acc) => {
 *     return first
 *       ? `${key} is ${current}`
 *       : `${acc} and ${current}`;
 *   },
 * );
 *
 * assertEquals(descriptions, {
 *   Curry: "Curry is spicy and vegan",
 *   Omelette: "Omelette is creamy and vegetarian",
 * });
 * ```
 */
export declare function aggregateGroups<T, A>(
  record: Readonly<Record<string, ReadonlyArray<T>>>,
  aggregator: (current: T, key: string, first: boolean, accumulator?: A) => A,
): Record<string, A>;
