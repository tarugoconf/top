import { OPERATORS } from "./_constants.js";
import { ALL } from "./_constants.js";
import { isSemVer } from "./is-semver.js";
function isComparator(value) {
  if (
    value === null || value === undefined || Array.isArray(value) ||
    typeof value !== "object"
  ) {
    return false;
  }
  if (value === ALL) {
    return true;
  }
  const { operator } = value;
  return ((operator === undefined ||
    OPERATORS.includes(operator)) &&
    isSemVer(value));
}
/**
 * Does a deep check on the object to determine if its a valid range.
 *
 * Objects with extra fields are still considered valid if they have at
 * least the correct fields.
 *
 * Adds a type assertion if true.
 *
 * @example Usage
 * ```ts
 * import { isRange } from "is-range.ts";
 * import { assert } from "../assert/mod.ts";
 *
 * const range = [[{ major: 1, minor: 2, patch: 3 }]];
 * assert(isRange(range));
 * assert(!isRange({}));
 * ```
 * @param value The value to check if its a valid Range
 * @returns True if its a valid Range otherwise false.
 */
export function isRange(value) {
  return Array.isArray(value) &&
    value.every((r) => Array.isArray(r) && r.every((c) => isComparator(c)));
}
