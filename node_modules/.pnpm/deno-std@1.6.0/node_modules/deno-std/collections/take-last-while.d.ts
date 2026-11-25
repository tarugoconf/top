/**
 * Returns all elements in the given iterable after the last element that does not
 * match the given predicate.
 *
 * @typeParam T The type of the iterable elements.
 *
 * @param iterable The iterable to take elements from.
 * @param predicate The predicate function to determine if an element should be
 * included. The function receives the element and its index.
 *
 * @returns An array containing all elements after the last element that does
 * not match the predicate.
 *
 * @example Basic usage
 * ```ts
 * import { takeLastWhile } from "take-last-while.ts";
 * import { assertEquals } from "../assert/mod.ts";
 *
 * const numbers = [1, 2, 3, 4, 5, 6];
 * const result = takeLastWhile(numbers, (number) => number > 4);
 * assertEquals(result, [5, 6]);
 * ```
 *
 * @example Using the index parameter
 * ```ts
 * import { takeLastWhile } from "take-last-while.ts";
 * import { assertEquals } from "../assert/mod.ts";
 *
 * const array = [20, 30, 20];
 * const result = takeLastWhile(array, (_, index) => index > 0);
 *
 * assertEquals(result, [30, 20]);
 * ```
 */
export declare function takeLastWhile<T>(
  iterable: Iterable<T>,
  predicate: (el: T, index: number) => boolean,
): T[];
