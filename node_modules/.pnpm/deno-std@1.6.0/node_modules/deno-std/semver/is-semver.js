// Copyright 2018-2026 the Deno authors. MIT license.
// This module is browser compatible.
import { ANY } from "./_constants.js";
import { isValidNumber, isValidString } from "./_shared.js";
/**
 * Checks to see if value is a valid SemVer object. It does a check
 * into each field including prerelease and build.
 *
 * Some invalid SemVer sentinels can still return true such as ANY and INVALID.
 * An object which has the same value as a sentinel but isn't reference equal
 * will still fail.
 *
 * Objects which are valid SemVer objects but have _extra_ fields are still
 * considered SemVer objects and this will return true.
 *
 * A type assertion is added to the value.
 *
 * @example Usage
 * ```ts
 * import { isSemVer } from "is-semver.ts";
 * import { assert } from "../assert/mod.ts";
 *
 * const value = {
 *   major: 1,
 *   minor: 2,
 *   patch: 3,
 * };
 *
 * assert(isSemVer(value));
 * assert(!isSemVer({ major: 1, minor: 2 }));
 * ```
 *
 * @param value The value to check to see if its a valid SemVer object
 * @returns True if value is a valid SemVer otherwise false
 */
export function isSemVer(value) {
  if (value === null || value === undefined) {
    return false;
  }
  if (Array.isArray(value)) {
    return false;
  }
  if (typeof value !== "object") {
    return false;
  }
  if (value === ANY) {
    return true;
  }
  const { major, minor, patch, build = [], prerelease = [] } = value;
  return (isValidNumber(major) &&
    isValidNumber(minor) &&
    isValidNumber(patch) &&
    Array.isArray(prerelease) &&
    prerelease.every((v) => isValidString(v) || isValidNumber(v)) &&
    Array.isArray(build) &&
    build.every(isValidString));
}
