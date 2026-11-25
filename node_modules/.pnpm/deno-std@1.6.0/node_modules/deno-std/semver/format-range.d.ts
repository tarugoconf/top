import type { Range } from "./types.ts";
/**
 * Formats the SemVerrange into a string.
 *
 * @example Usage
 * ```ts
 * import { formatRange, parseRange } from "mod.ts";
 * import { assertEquals } from "../assert/mod.ts";
 *
 * const range = parseRange(">=1.2.3 <1.2.4");
 * assertEquals(formatRange(range), ">=1.2.3 <1.2.4");
 * ```
 *
 * @param range The range to format
 * @returns A string representation of the SemVer range
 */
export declare function formatRange(range: Range): string;
