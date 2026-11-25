import { compare } from "./compare.js";
/**
 * Less than comparison for two SemVers.
 *
 * This is equal to `compare(version1, version2) < 0`.
 *
 * @example Usage
 * ```ts
 * import { parse, lessThan } from "mod.ts";
 * import { assert } from "../assert/mod.ts";
 *
 * const version1 = parse("1.2.3");
 * const version2 = parse("1.2.4");
 *
 * assert(lessThan(version1, version2));
 * assert(!lessThan(version2, version1));
 * assert(!lessThan(version1, version1));
 * ```
 *
 * @param version1 the first version to compare
 * @param version2 the second version to compare
 * @returns `true` if `version1` is less than `version2`, `false` otherwise
 */
export function lessThan(version1, version2) {
  return compare(version1, version2) < 0;
}
