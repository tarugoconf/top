/**
 * Utility functions for working with text.
 *
 * ```ts
 * import { toCamelCase, compareSimilarity } from "mod.ts";
 * import { assertEquals } from "../assert/mod.ts";
 *
 * assertEquals(toCamelCase("snake_case"), "snakeCase");
 *
 * const words = ["hi", "help", "hello"];
 *
 * // Words most similar to "hep" will be at the front
 * assertEquals(words.sort(compareSimilarity("hep")), ["help", "hi", "hello"]);
 * ```
 *
 * @module
 */
export * from "./levenshtein-distance.ts";
export * from "./closest-string.ts";
export * from "./compare-similarity.ts";
export * from "./word-similarity-sort.ts";
export * from "./to-camel-case.ts";
export * from "./to-kebab-case.ts";
export * from "./to-pascal-case.ts";
export * from "./to-snake-case.ts";
export * from "./truncate.ts";
