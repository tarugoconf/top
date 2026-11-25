/**
 * Builds all possible orders of all elements in the given array.
 * Ignores equality of elements, meaning this will always return the same
 * number of permutations for a given length of input.
 *
 * @typeParam T The type of the elements in the array.
 *
 * @param inputArray The array to build permutations from.
 *
 * @returns An array of all possible permutations of the given array.
 *
 * @example Basic usage
 * ```ts
 * import { permutations } from "permutations.ts";
 * import { assertEquals } from "../assert/mod.ts";
 *
 * const numbers = [ 1, 2 ];
 * const windows = permutations(numbers);
 *
 * assertEquals(windows, [
 *   [ 1, 2 ],
 *   [ 2, 1 ],
 * ]);
 * ```
 */
export declare function permutations<T>(inputArray: Iterable<T>): T[][];
