import type { Range } from "./types.ts";
/**
 * Parses the given range string and returns a Range object. If the range string
 * is invalid, `undefined` is returned.
 *
 * @example Usage
 * ```ts
 * import { tryParseRange } from "mod.ts";
 * import { assertEquals } from "../assert/mod.ts";
 *
 * assertEquals(tryParseRange(">=1.2.3 <1.2.4"), [
 *  [
 *    { operator: ">=", major: 1, minor: 2, patch: 3, prerelease: [], build: [] },
 *    { operator: "<", major: 1, minor: 2, patch: 4, prerelease: [], build: [] },
 *  ],
 * ]);
 * ```
 *
 * @param value The range string
 * @returns A Range object if valid otherwise `undefined`
 */
export declare function tryParseRange(value: string): Range | undefined;
