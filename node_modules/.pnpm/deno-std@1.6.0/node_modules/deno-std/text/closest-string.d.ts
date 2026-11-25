/** Options for {@linkcode closestString}. */
export interface ClosestStringOptions {
  /**
   * Whether the distance should include case.
   *
   * @default {false}
   */
  caseSensitive?: boolean;
  /**
   * A custom comparison function to use for comparing strings.
   *
   * @param a The first string for comparison.
   * @param b The second string for comparison.
   * @returns The distance between the two strings.
   * @default {levenshteinDistance}
   */
  compareFn?: (a: string, b: string) => number;
}
/**
 * Finds the most similar string from an array of strings.
 *
 * By default, calculates the distance between words using the
 * {@link https://en.wikipedia.org/wiki/Levenshtein_distance | Levenshtein distance}.
 *
 * @example Usage
 * ```ts
 * import { closestString } from "closest-string.ts";
 * import { assertEquals } from "../assert/mod.ts";
 *
 * const possibleWords = ["length", "size", "blah", "help"];
 * const suggestion = closestString("hep", possibleWords);
 *
 * assertEquals(suggestion, "help");
 * ```
 *
 * @param givenWord The string to measure distance against
 * @param possibleWords The string-array to pick the closest string from
 * @param options The options for the comparison.
 * @returns The closest string
 */
export declare function closestString(
  givenWord: string,
  possibleWords: ReadonlyArray<string>,
  options?: ClosestStringOptions,
): string;
