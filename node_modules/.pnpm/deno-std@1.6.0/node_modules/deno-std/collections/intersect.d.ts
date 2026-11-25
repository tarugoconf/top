/**
 * Returns all distinct elements that appear at least once in each of the given
 * iterables.
 *
 * @typeParam T The type of the elements in the input iterables.
 *
 * @param iterables The iterables to intersect.
 *
 * @returns An array of distinct elements that appear at least once in each of
 * the given iterables.
 *
 * @example Basic usage
 * ```ts
 * import { intersect } from "intersect.ts";
 * import { assertEquals } from "../assert/mod.ts";
 *
 * const lisaInterests = ["Cooking", "Music", "Hiking"];
 * const kimInterests = ["Music", "Tennis", "Cooking"];
 * const commonInterests = intersect(lisaInterests, kimInterests);
 *
 * assertEquals(commonInterests, ["Cooking", "Music"]);
 * ```
 */
export declare function intersect<T>(...iterables: Iterable<T>[]): T[];
