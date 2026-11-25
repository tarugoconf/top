/**
 * Returns the index of the first occurrence of the needle array in the source
 * array, or -1 if it is not present.
 *
 * A start index can be specified as the third argument that begins the search
 * at that given index. The start index defaults to the start of the array.
 *
 * The complexity of this function is `O(source.length * needle.length)`.
 *
 * @param source Source array to check.
 * @param needle Needle array to check for.
 * @param start Start index in the source array to begin the search. Defaults to
 * 0.
 * @returns Index of the first occurrence of the needle array in the source
 * array, or -1 if it is not present.
 *
 * @example Basic usage
 * ```ts
 * import { indexOfNeedle } from "index-of-needle.ts";
 * import { assertEquals } from "../assert/mod.ts";
 *
 * const source = new Uint8Array([0, 1, 2, 1, 2, 1, 2, 3]);
 * const needle = new Uint8Array([1, 2]);
 * const notNeedle = new Uint8Array([5, 0]);
 *
 * assertEquals(indexOfNeedle(source, needle), 1);
 * assertEquals(indexOfNeedle(source, notNeedle), -1);
 * ```
 *
 * @example Start index
 * ```ts
 * import { indexOfNeedle } from "index-of-needle.ts";
 * import { assertEquals } from "../assert/mod.ts";
 *
 * const source = new Uint8Array([0, 1, 2, 1, 2, 1, 2, 3]);
 * const needle = new Uint8Array([1, 2]);
 *
 * assertEquals(indexOfNeedle(source, needle, 2), 3);
 * assertEquals(indexOfNeedle(source, needle, 6), -1);
 * ```
 * Defining a start index will begin the search at the specified index in the
 * source array.
 */
export declare function indexOfNeedle(
  source: Uint8Array,
  needle: Uint8Array,
  start?: number,
): number;
