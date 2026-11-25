import { compare } from "./compare.js";
/**
 * Not equal comparison for two SemVers.
 *
 * This is equal to `compare(version1, version2) !== 0`.
 *
 * @example Usage
 * ```ts
 * import { parse, notEquals } from "mod.ts";
 * import { assert } from "../assert/mod.ts";
 *
 * const version1 = parse("1.2.3");
 * const version2 = parse("1.2.4");
 *
 * assert(notEquals(version1, version2));
 * assert(!notEquals(version1, version1));
 * ```
 *
 * @param version1 The first version to compare
 * @param version2 The second version to compare
 * @returns `true` if `version1` is not equal to `version2`, `false` otherwise
 */
export function notEquals(version1, version2) {
  return compare(version1, version2) !== 0;
}
