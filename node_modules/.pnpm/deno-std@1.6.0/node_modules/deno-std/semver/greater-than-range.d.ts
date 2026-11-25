import type { Range, SemVer } from "./types.ts";
/**
 * Check if the SemVer is greater than the range.
 *
 * @example Usage
 * ```ts
 * import { parse, parseRange, greaterThanRange } from "mod.ts";
 * import { assert } from "../assert/mod.ts";
 *
 * const version1 = parse("1.2.3");
 * const version2 = parse("1.2.4");
 * const range = parseRange(">=1.2.3 <1.2.4");
 *
 * assert(!greaterThanRange(version1, range));
 * assert(greaterThanRange(version2, range));
 * ```
 *
 * @param version The version to check.
 * @param range The range to check against.
 * @returns `true` if the semver is greater than the range, `false` otherwise.
 */
export declare function greaterThanRange(
  version: SemVer,
  range: Range,
): boolean;
