/** Options for {@linkcode format}. */
export interface FormatOptions {
  /**
   * The style for formatting the duration.
   *
   * "narrow" for "0d 0h 0m 0s 0ms..."
   * "digital" for "00:00:00:00:000..."
   * "full" for "0 days, 0 hours, 0 minutes,..."
   *
   * @default {"narrow"}
   */
  style?: "narrow" | "digital" | "full";
  /**
   * Whether to ignore zero values.
   * With style="narrow" | "full", all zero values are ignored.
   * With style="digital", only values in the ends are ignored.
   *
   * @default {false}
   */
  ignoreZero?: boolean;
}
/**
 * Format milliseconds to time duration.
 *
 * @example Usage
 * ```ts
 * import { format } from "duration.ts";
 * import { assertEquals } from "../assert/mod.ts";
 *
 * assertEquals(format(99674, { style: "digital" }), "00:00:01:39:674:000:000");
 *
 * assertEquals(format(99674), "0d 0h 1m 39s 674ms 0µs 0ns");
 *
 * assertEquals(format(99674, { ignoreZero: true }), "1m 39s 674ms");
 *
 * assertEquals(format(99674, { style: "full", ignoreZero: true }), "1 minute, 39 seconds, 674 milliseconds");
 * ```
 *
 * @param ms The milliseconds value to format
 * @param options The options for formatting
 * @returns The formatted string
 * @throws {TypeError} If an invalid style option is provided.
 */
export declare function format(ms: number, options?: FormatOptions): string;
