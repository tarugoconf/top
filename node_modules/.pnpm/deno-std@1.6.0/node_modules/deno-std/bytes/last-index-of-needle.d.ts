/**
 * Returns the index of the last occurrence of the needle array in the source
 * array, or -1 if it is not present.
 *
 * The complexity of this function is `O(source.length * needle.length)`.
 *
 * @param source Source array to check.
 * @param needle Needle array to check for.
 * @param start Start index in the source array to begin the search. Defaults to
 * `source.length - 1`.
 * @returns Index of the last occurrence of the needle array in the source
 * array, or -1 if it is not present.
 *
 * @example Basic usage
 * ```ts
 * import { lastIndexOfNeedle } from "last-index-of-needle.ts";
 * import { assertEquals } from "../assert/mod.ts";
 *
 * const source = new Uint8Array([0, 1, 2, 1, 2, 1, 2, 3]);
 * const needle = new Uint8Array([1, 2]);
 * const notNeedle = new Uint8Array([5, 0]);
 *
 * assertEquals(lastIndexOfNeedle(source, needle), 5);
 * assertEquals(lastIndexOfNeedle(source, notNeedle), -1);
 * ```
 *
 * @example Start index
 * ```ts
 * import { lastIndexOfNeedle } from "last-index-of-needle.ts";
 * import { assertEquals } from "../assert/mod.ts";
 *
 * const source = new Uint8Array([0, 1, 2, 1, 2, 1, 2, 3]);
 * const needle = new Uint8Array([1, 2]);
 *
 * assertEquals(lastIndexOfNeedle(source, needle, 2), 1);
 * assertEquals(lastIndexOfNeedle(source, needle, 6), 5);
 * ```
 * Defining a start index will begin the search at the specified index in the
 * source array.
 */
export declare function lastIndexOfNeedle(
  source: Uint8Array,
  needle: Uint8Array,
  start?: number,
): number;
