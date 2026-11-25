import type { SemVer } from "./types.ts";
/**
 * Format a SemVer object into a string.
 *
 * @example Usage
 * ```ts
 * import { format } from "format.ts";
 * import { assertEquals } from "../assert/mod.ts";
 *
 * const semver = {
 *   major: 1,
 *   minor: 2,
 *   patch: 3,
 * };
 * assertEquals(format(semver), "1.2.3");
 * ```
 *
 * @param version The SemVer to format
 * @returns The string representation of a semantic version.
 */
export declare function format(version: SemVer): string;
