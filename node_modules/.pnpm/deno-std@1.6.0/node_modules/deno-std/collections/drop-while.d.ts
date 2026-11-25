/**
 * Returns an array that drops all elements in the given iterable until the
 * first element that does not match the given predicate.
 *
 * @typeParam T The type of the elements in the input iterable.
 *
 * @param iterable The iterable to drop elements from.
 * @param predicate The function to test each element for a condition. The
 * function receives the element and its index.
 *
 * @returns An array that drops all elements until the first element that
 * does not match the given predicate.
 *
 * @example Basic usage
 * ```ts
 * import { dropWhile } from "drop-while.ts";
 * import { assertEquals } from "../assert/mod.ts";
 *
 * const numbers = [3, 2, 5, 2, 5];
 * const dropWhileNumbers = dropWhile(numbers, (number) => number !== 2);
 *
 * assertEquals(dropWhileNumbers, [2, 5, 2, 5]);
 * ```
 *
 * @example Using the index parameter
 * ```ts
 * import { dropWhile } from "drop-while.ts";
 * import { assertEquals } from "../assert/mod.ts";
 *
 * const array = [20, 30, 20];
 * const result = dropWhile(array, (_, index) => index < 1);
 *
 * assertEquals(result, [30, 20]);
 * ```
 */
export declare function dropWhile<T>(
  iterable: Iterable<T>,
  predicate: (el: T, index: number) => boolean,
): T[];
