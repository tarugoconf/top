/**
 * Returns all elements in the given collection until the first element that
 * does not match the given predicate.
 *
 * @typeParam T The type of the elements in the iterable.
 *
 * @param iterable The iterable to take elements from.
 * @param predicate The predicate function to determine if an element should be
 * included. The function receives the element and its index.
 *
 * @returns An array containing all elements until the first element that
 * does not match the predicate.
 *
 * @example Basic usage
 * ```ts
 * import { takeWhile } from "take-while.ts";
 * import { assertEquals } from "../assert/mod.ts";
 *
 * const numbers = [1, 2, 3, 4, 5, 6];
 *
 * const result = takeWhile(numbers, (number) => number < 4);
 *
 * assertEquals(result, [1, 2, 3]);
 * ```
 *
 * @example Using the index parameter
 * ```ts
 * import { takeWhile } from "take-while.ts";
 * import { assertEquals } from "../assert/mod.ts";
 *
 * const array = [20, 30, 20];
 * const result = takeWhile(array, (_, index) => index < 2);
 *
 * assertEquals(result, [20, 30]);
 * ```
 */
export declare function takeWhile<T>(
  iterable: Iterable<T>,
  predicate: (el: T, index: number) => boolean,
): T[];
