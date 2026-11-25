// Copyright 2018-2026 the Deno authors. MIT license.
// This module is browser compatible.
import { splitToWords } from "./_util.js";
/**
 * Converts a string into snake_case.
 *
 * @example Usage
 * ```ts
 * import { toSnakeCase } from "to-snake-case.ts";
 * import { assertEquals } from "../assert/mod.ts";
 *
 * assertEquals(toSnakeCase("deno is awesome"), "deno_is_awesome");
 * ```
 *
 * @param input The string that is going to be converted into snake_case
 * @returns The string as snake_case
 */
export function toSnakeCase(input) {
  input = input.trim();
  return splitToWords(input).join("_").toLowerCase();
}
