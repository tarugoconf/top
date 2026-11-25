// Copyright 2018-2026 the Deno authors. MIT license.
// This module is browser compatible.
import { levenshteinDistance } from "./levenshtein-distance.js";
/**
 * Takes a string and generates a comparator function to determine which of two
 * strings is more similar to the given one.
 *
 * By default, calculates the distance between words using the
 * {@link https://en.wikipedia.org/wiki/Levenshtein_distance | Levenshtein distance}.
 *
 * @param givenWord The string to measure distance against.
 * @param options Options for the sort.
 * @returns The difference in distance. This will be a negative number if `a`
 * is more similar to `givenWord` than `b`, a positive number if `b` is more
 * similar, or `0` if they are equally similar.
 *
 * @example Usage
 *
 * Most-similar words will be at the start of the array.
 *
 * ```ts
 * import { compareSimilarity } from "compare-similarity.ts";
 * import { assertEquals } from "../assert/mod.ts";
 *
 * const words = ["hi", "hello", "help"];
 * const sortedWords = words.toSorted(compareSimilarity("hep"));
 *
 * assertEquals(sortedWords, ["help", "hi", "hello"]);
 * ```
 */
export function compareSimilarity(givenWord, options) {
  const { compareFn = levenshteinDistance } = { ...options };
  if (options?.caseSensitive) {
    return (a, b) => compareFn(givenWord, a) - compareFn(givenWord, b);
  }
  givenWord = givenWord.toLowerCase();
  return (a, b) =>
    compareFn(givenWord, a.toLowerCase()) -
    compareFn(givenWord, b.toLowerCase());
}
