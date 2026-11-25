// Copyright 2018-2026 the Deno authors. MIT license.
// This module is browser compatible.
import { testComparatorSet } from "./_test-comparator-set.js";
import { isWildcardComparator } from "./_shared.js";
import { compare } from "./compare.js";
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
export function greaterThanRange(version, range) {
  return range.every((comparatorSet) =>
    greaterThanComparatorSet(version, comparatorSet)
  );
}
function greaterThanComparatorSet(version, comparatorSet) {
  // If the comparator set contains wildcard, then the semver is not greater than the range.
  if (comparatorSet.some(isWildcardComparator)) {
    return false;
  }
  // If the semver satisfies the comparator set, then it's not greater than the range.
  if (testComparatorSet(version, comparatorSet)) {
    return false;
  }
  // If the semver is less than any of the comparator set, then it's not greater than the range.
  if (
    comparatorSet.some((comparator) => lessThanComparator(version, comparator))
  ) {
    return false;
  }
  return true;
}
function lessThanComparator(version, comparator) {
  const cmp = compare(version, comparator);
  switch (comparator.operator) {
    case "=":
    case undefined:
      return cmp < 0;
    case "!=":
      return cmp >= 0;
    case ">":
      return cmp <= 0;
    case "<":
      return false;
    case ">=":
      return cmp < 0;
    case "<=":
      return false;
  }
}
