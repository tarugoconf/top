import type { Comparator } from "./types.ts";
export declare function compareNumber(a: number, b: number): 1 | 0 | -1;
export declare function checkIdentifier(
  v1?: ReadonlyArray<string | number>,
  v2?: ReadonlyArray<string | number>,
): 1 | 0 | -1;
export declare function compareIdentifier(
  v1?: ReadonlyArray<string | number>,
  v2?: ReadonlyArray<string | number>,
): 1 | 0 | -1;
export declare const FULL_REGEXP: RegExp;
/**
 * A version that can contain wildcards.
 * @example "x", "1.x", "1.x.x", "1.2.x", "*", "1.*", "1.*.*", "1.2.*"
 */
export declare const XRANGE =
  "[v=\\s]*(?<major>0|[1-9]\\d*|x|X|\\*)(?:\\.(?<minor>0|[1-9]\\d*|x|X|\\*)(?:\\.(?<patch>0|[1-9]\\d*|x|X|\\*)(?:-(?<prerelease>(?:0|[1-9]\\d*|\\d*[a-zA-Z-][a-zA-Z0-9-]*)(?:\\.(?:0|[1-9]\\d*|\\d*[a-zA-Z-][a-zA-Z0-9-]*))*))?(?:\\+(?<buildmetadata>[0-9A-Za-z-]+(?:\\.[0-9A-Za-z-]+)*))?)?)?";
/**
 * An operator (`~`, `~>`, `^`, `=`, `<`, `<=`, `>`, or `>=`), followed by an x-range.
 * @example "~1.x.x", "^1.2.*", ">=1.2.3"
 */
export declare const OPERATOR_XRANGE_REGEXP: RegExp;
/**
 * An empty string or a comparator (`=`, `<`, `<=`, `>`, or `>=`), followed by a version.
 * @example ">1.2.3"
 */
export declare const COMPARATOR_REGEXP: RegExp;
/**
 * Returns true if the value is a valid SemVer number.
 *
 * Must be a number. Must not be NaN. Can be positive or negative infinity.
 * Can be between 0 and MAX_SAFE_INTEGER.
 * @param value The value to check
 * @returns True if its a valid semver number
 */
export declare function isValidNumber(value: unknown): value is number;
export declare const MAX_LENGTH = 256;
/**
 * Returns true if the value is a valid semver pre-release or build identifier.
 *
 * Must be a string. Must be between 1 and 256 characters long. Must match
 * the regular expression /[0-9A-Za-z-]+/.
 * @param value The value to check
 * @returns True if the value is a valid semver string.
 */
export declare function isValidString(value: unknown): value is string;
export declare function parsePrerelease(
  prerelease: string,
): (string | number)[];
export declare function parseBuild(buildmetadata: string): string[];
export declare function parseNumber(
  input: string,
  errorMessage: string,
): number;
export declare function isWildcardComparator(c: Comparator): boolean;
