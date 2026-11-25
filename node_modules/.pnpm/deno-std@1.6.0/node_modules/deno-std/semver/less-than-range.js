// Copyright 2018-2026 the Deno authors. MIT license.
// This module is browser compatible.
import { testComparatorSet } from "./_test-comparator-set.js";
import { isWildcardComparator } from "./_shared.js";
import { compare } from "./compare.js";
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
export function lessThanRange(version, range) {
  return range.every((comparatorSet) =>
    lessThanComparatorSet(version, comparatorSet)
  );
}
function lessThanComparatorSet(version, comparatorSet) {
  // If the comparator set contains wildcard, then the semver is not greater than the range.
  if (comparatorSet.some(isWildcardComparator)) {
    return false;
  }
  // If the SemVer satisfies the comparator set, then it's not less than the range.
  if (testComparatorSet(version, comparatorSet)) {
    return false;
  }
  // If the SemVer is greater than any of the comparator set, then it's not less than the range.
  if (
    comparatorSet.some((comparator) =>
      greaterThanComparator(version, comparator)
    )
  ) {
    return false;
  }
  return true;
}
function greaterThanComparator(version, comparator) {
  const cmp = compare(version, comparator);
  switch (comparator.operator) {
    case "=":
    case undefined:
      return cmp > 0;
    case "!=":
      return cmp <= 0;
    case ">":
      return false;
    case "<":
      return cmp >= 0;
    case ">=":
      return false;
    case "<=":
      return cmp > 0;
  }
}
