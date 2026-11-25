import { parseBuild, parseNumber, parsePrerelease } from "./_shared.js";
import { FULL_REGEXP, MAX_LENGTH } from "./_shared.js";
/**
 * Attempt to parse a string as a semantic version, returning a SemVer object.
 *
 * @example Usage
 * ```ts
 * import { parse } from "parse.ts";
 * import { assertEquals } from "../assert/mod.ts";
 *
 * const version = parse("1.2.3");
 * assertEquals(version, {
 *   major: 1,
 *   minor: 2,
 *   patch: 3,
 *   prerelease: [],
 *   build: [],
 * });
 * ```
 *
 * @throws {TypeError} If the input string is invalid.
 * @param value The version string to parse
 * @returns A valid SemVer
 */
export function parse(value) {
  if (typeof value !== "string") {
    throw new TypeError(
      `Cannot parse version as version must be a string: received ${typeof value}`,
    );
  }
  if (value.length > MAX_LENGTH) {
    throw new TypeError(
      `Cannot parse version as version length is too long: length is ${value.length}, max length is ${MAX_LENGTH}`,
    );
  }
  value = value.trim();
  const groups = value.match(FULL_REGEXP)?.groups;
  if (!groups) {
    throw new TypeError(`Cannot parse version: ${value}`);
  }
  const major = parseNumber(
    groups.major,
    `Cannot parse version ${value}: invalid major version`,
  );
  const minor = parseNumber(
    groups.minor,
    `Cannot parse version ${value}: invalid minor version`,
  );
  const patch = parseNumber(
    groups.patch,
    `Cannot parse version ${value}: invalid patch version`,
  );
  const prerelease = groups.prerelease
    ? parsePrerelease(groups.prerelease)
    : [];
  const build = groups.buildmetadata ? parseBuild(groups.buildmetadata) : [];
  return { major, minor, patch, prerelease, build };
}
