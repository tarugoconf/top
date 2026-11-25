/**
 * Returns an array that drops all elements in the given iterable until the
 * last element that does not match the given predicate.
 *
 * @typeParam T The type of the elements in the input iterable.
 *
 * @param iterable The iterable to drop elements from.
 * @param predicate The function to test each element for a condition. The
 * function receives the element and its index.
 *
 * @returns An array that drops all elements until the last element that does
 * not match the given predicate.
 *
 * @example Basic usage
 * ```ts
 * import { dropLastWhile } from "drop-last-while.ts";
 * import { assertEquals } from "../assert/mod.ts";
 *
 * const numbers = [11, 42, 55, 20, 33, 44];
 *
 * const notFortyFour = dropLastWhile(numbers, (number) => number > 30);
 *
 * assertEquals(notFortyFour, [11, 42, 55, 20]);
 * ```
 *
 * @example Using the index parameter
 * ```ts
 * import { dropLastWhile } from "drop-last-while.ts";
 * import { assertEquals } from "../assert/mod.ts";
 *
 * const array = [20, 30, 20];
 * const result = dropLastWhile(array, (_, index) => index > 1);
 *
 * assertEquals(result, [20, 30]);
 * ```
 */
export declare function dropLastWhile<T>(
  iterable: Iterable<T>,
  predicate: (el: T, index: number) => boolean,
): T[];
