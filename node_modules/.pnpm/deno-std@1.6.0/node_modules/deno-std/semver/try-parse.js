import { parse } from "./parse.js";
/**
 * Returns the parsed SemVer, or `undefined` if it's not valid.
 *
 * @example Usage
 * ```ts
 * import { tryParse } from "try-parse.ts";
 * import { assertEquals } from "../assert/mod.ts";
 *
 * assertEquals(tryParse("1.2.3"), { major: 1, minor: 2, patch: 3, prerelease: [], build: [] });
 * assertEquals(tryParse("1.2.3-alpha"), { major: 1, minor: 2, patch: 3, prerelease: ["alpha"], build: [] });
 * assertEquals(tryParse("1.2.3+build"), { major: 1, minor: 2, patch: 3, prerelease: [], build: ["build"] });
 * assertEquals(tryParse("1.2.3-alpha.1+build.1"), { major: 1, minor: 2, patch: 3, prerelease: ["alpha", 1], build: ["build", "1"] });
 * assertEquals(tryParse(" invalid "), undefined);
 * ```
 *
 * @param value The version string to parse
 * @returns A valid SemVer or `undefined`
 */
export function tryParse(value) {
  try {
    return parse(value);
  } catch {
    return undefined;
  }
}
