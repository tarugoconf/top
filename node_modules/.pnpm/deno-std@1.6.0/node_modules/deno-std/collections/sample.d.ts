/**
 * Returns a random element from the given iterable.
 *
 * @typeParam T The type of the elements in the iterable.
 *
 * @param iterable The iterable to sample from.
 *
 * @returns A random element from the given iterable, or `undefined` if the iterable has no elements.
 *
 * @example Basic usage
 * ```ts
 * import { sample } from "sample.ts";
 * import { assertArrayIncludes } from "../assert/mod.ts";
 *
 * const numbers = [1, 2, 3, 4];
 * const random = sample(numbers);
 *
 * assertArrayIncludes(numbers, [random]);
 * ```
 */
export declare function sample<T>(iterable: Iterable<T>): T | undefined;
