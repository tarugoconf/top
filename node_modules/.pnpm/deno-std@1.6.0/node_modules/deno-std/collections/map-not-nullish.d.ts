/**
 * Returns a new array, containing all elements in the given array transformed
 * using the given transformer, except the ones that were transformed to `null`
 * or `undefined`.
 *
 * @typeParam T The type of the elements in the input array.
 * @typeParam O The type of the elements in the output array.
 *
 * @param array The array to map elements from.
 * @param transformer The function to transform each element. The function
 * receives the element and its index.
 *
 * @returns A new array with all elements transformed by the given transformer,
 * except the ones that were transformed to `null` or `undefined`.
 *
 * @example Basic usage
 * ```ts
 * import { mapNotNullish } from "map-not-nullish.ts";
 * import { assertEquals } from "../assert/mod.ts";
 *
 * const people = [
 *   { middleName: null },
 *   { middleName: "William" },
 *   { middleName: undefined },
 *   { middleName: "Martha" },
 * ];
 * const foundMiddleNames = mapNotNullish(people, (people) => people.middleName);
 *
 * assertEquals(foundMiddleNames, ["William", "Martha"]);
 * ```
 *
 * @example Using the index parameter
 * ```ts
 * import { mapNotNullish } from "map-not-nullish.ts";
 * import { assertEquals } from "../assert/mod.ts";
 *
 * const values = [10, 20, 30, 40];
 * const result = mapNotNullish(values, (value, index) => index % 2 === 0 ? value : null);
 *
 * assertEquals(result, [10, 30]);
 * ```
 */
export declare function mapNotNullish<T, O>(
  array: Iterable<T>,
  transformer: (el: T, index: number) => O,
): NonNullable<O>[];
