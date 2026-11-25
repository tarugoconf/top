import type { Range, SemVer } from "./types.ts";
/**
 * Check if the SemVer is less than the range.
 *
 * @example Usage
 * ```ts
 * import { parse, parseRange, lessThanRange } from "mod.ts";
 * import { assert } from "../assert/mod.ts";
 *
 * const version1 = parse("1.2.3");
 * const version2 = parse("1.0.0");
 * const range = parseRange(">=1.2.3 <1.2.4");
 *
 * assert(!lessThanRange(version1, range));
 * assert(lessThanRange(version2, range));
 * ```
 *
 * @param version The version to check.
 * @param range The range to check against.
 * @returns `true` if the SemVer is less than the range, `false` otherwise.
 */
export declare function lessThanRange(version: SemVer, range: Range): boolean;
