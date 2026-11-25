import type { Range } from "./types.ts";
/**
 * Parses a range string into a {@linkcode Range} object.
 *
 * @example Usage
 * ```ts
 * import { parseRange } from "parse-range.ts";
 * import { assertEquals } from "../assert/mod.ts";
 *
 * const range = parseRange(">=1.0.0 <2.0.0 || >=3.0.0");
 * assertEquals(range, [
 *   [
 *     { operator: ">=", major: 1, minor: 0, patch: 0, prerelease: [], build: [] },
 *     { operator: "<", major: 2, minor: 0, patch: 0, prerelease: [], build: [] },
 *   ],
 *   [
 *     { operator: ">=", major: 3, minor: 0, patch: 0, prerelease: [], build: [] },
 *   ]
 * ]);
 * ```
 *
 * @throws {TypeError} If the input range is invalid.
 * @param value The range set string
 * @returns A valid SemVer range
 */
export declare function parseRange(value: string): Range;
