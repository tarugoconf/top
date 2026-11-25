import {
  checkIdentifier,
  compareIdentifier,
  compareNumber,
} from "./_shared.js";
/**
 * Compare two SemVers.
 *
 * Returns `0` if `version1` equals `version2`, or `1` if `version1` is greater, or `-1` if `version2` is
 * greater.
 *
 * Sorts in ascending order if passed to {@linkcode Array.sort}.
 *
 * @example Usage
 * ```ts
 * import { parse, compare } from "mod.ts";
 * import { assertEquals } from "../assert/mod.ts";
 *
 * const version1 = parse("1.2.3");
 * const version2 = parse("1.2.4");
 *
 * assertEquals(compare(version1, version2), -1);
 * assertEquals(compare(version2, version1), 1);
 * assertEquals(compare(version1, version1), 0);
 * ```
 *
 * @param version1 The first SemVer to compare
 * @param version2 The second SemVer to compare
 * @returns `1` if `version1` is greater, `0` if equal, or `-1` if `version2` is greater
 */
export function compare(version1, version2) {
  if (version1 === version2) {
    return 0;
  }
  return (compareNumber(version1.major, version2.major) ||
    compareNumber(version1.minor, version2.minor) ||
    compareNumber(version1.patch, version2.patch) ||
    checkIdentifier(version1.prerelease, version2.prerelease) ||
    compareIdentifier(version1.prerelease, version2.prerelease));
}
