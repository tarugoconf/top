/**
 * Splits the given array into an array of chunks of the given size and returns them.
 *
 * @typeParam T The type of the elements in the iterable.
 *
 * @param iterable The iterable to take elements from.
 * @param size The size of the chunks. This must be a positive integer.
 *
 * @returns An array of chunks of the given size.
 *
 * @example Basic usage
 * ```ts
 * import { chunk } from "chunk.ts";
 * import { assertEquals } from "../assert/mod.ts";
 *
 * const words = [
 *   "lorem",
 *   "ipsum",
 *   "dolor",
 *   "sit",
 *   "amet",
 *   "consetetur",
 *   "sadipscing",
 * ];
 * const chunks = chunk(words, 3);
 *
 * assertEquals(
 *   chunks,
 *   [
 *     ["lorem", "ipsum", "dolor"],
 *     ["sit", "amet", "consetetur"],
 *     ["sadipscing"],
 *   ],
 * );
 * ```
 */
export declare function chunk<T>(iterable: Iterable<T>, size: number): T[][];
