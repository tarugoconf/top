import type { SemVer } from "./types.ts";
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
export declare function parse(value: string): SemVer;
