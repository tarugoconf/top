/**
 * Returns true if the string can be parsed as SemVer.
 *
 * @example Usage
 * ```ts
 * import { canParse } from "can-parse.ts";
 * import { assert, assertFalse } from "../assert/mod.ts";
 *
 * assert(canParse("1.2.3"));
 * assertFalse(canParse("invalid"));
 * ```
 *
 * @param value The version string to check
 * @returns `true` if the string can be parsed as SemVer, `false` otherwise
 */
export declare function canParse(value: string): boolean;
