/**
 * Returns all elements in the given array that produce a unique value using
 * the given discriminator, with the first matching occurrence retained.
 *
 * Uniqueness is determined by same-value-zero equality of the returned values.
 *
 * @typeParam T The type of the elements in the input array.
 * @typeParam D The type of the values produced by the discriminator function.
 *
 * @param array The array to filter for distinct elements.
 * @param discriminator The function to extract the value to compare for
 * uniqueness. The function receives the element and its index.
 *
 * @returns An array of distinct elements in the input array.
 *
 * @example Basic usage
 * ```ts
 * import { distinctBy } from "distinct-by.ts";
 * import { assertEquals } from "../assert/mod.ts";
 *
 * const users = [{ id: 1, name: "Anna" }, { id: 2, name: "Kim" }, { id: 1, name: "Anna again" }];
 * const uniqueUsers = distinctBy(users, (user) => user.id);
 *
 * assertEquals(uniqueUsers, [{ id: 1, name: "Anna" }, { id: 2, name: "Kim" }]);
 * ```
 *
 * @example Using the index parameter
 * ```ts
 * import { distinctBy } from "distinct-by.ts";
 * import { assertEquals } from "../assert/mod.ts";
 *
 * const items = [25, "asdf", true];
 * const result = distinctBy(items, (_, index) => index > 1);
 *
 * assertEquals(result, [25, true]);
 * ```
 */
export declare function distinctBy<T, D>(
  array: Iterable<T>,
  discriminator: (el: T, index: number) => D,
): T[];
