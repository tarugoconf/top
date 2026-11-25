// Copyright 2018-2026 the Deno authors. MIT license.
// This module is browser compatible.
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
export * from "./levenshtein-distance.js";
export * from "./closest-string.js";
export * from "./compare-similarity.js";
export * from "./word-similarity-sort.js";
export * from "./to-camel-case.js";
export * from "./to-kebab-case.js";
export * from "./to-pascal-case.js";
export * from "./to-snake-case.js";
export * from "./truncate.js";
