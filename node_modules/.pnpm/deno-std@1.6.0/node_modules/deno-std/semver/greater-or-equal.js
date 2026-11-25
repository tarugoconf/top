import { compare } from "./compare.js";
/**
 * Greater than or equal to comparison for two SemVers.
 *
 * This is equal to `compare(version1, version2) >= 0`.
 *
 * @example Usage
 * ```ts
 * import { parse, greaterOrEqual } from "mod.ts";
 * import { assert } from "../assert/mod.ts";
 *
 * const version1 = parse("1.2.3");
 * const version2 = parse("1.2.4");
 *
 * assert(greaterOrEqual(version2, version1));
 * assert(!greaterOrEqual(version1, version2));
 * assert(greaterOrEqual(version1, version1));
 * ```
 *
 * @param version1 The first version to compare
 * @param version2 The second version to compare
 * @returns `true` if `version1` is greater than or equal to `version2`, `false` otherwise
 */
export function greaterOrEqual(version1, version2) {
  return compare(version1, version2) >= 0;
}
