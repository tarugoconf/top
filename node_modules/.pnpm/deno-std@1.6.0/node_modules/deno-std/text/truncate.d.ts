/** Options for {@linkcode truncate}. */
export interface TruncateOptions {
  /**
   * The string used to indicate where truncation occurred.
   *
   * @default {"…"}
   */
  suffix?: string;
  /**
   * Where to truncate.
   *
   * - `"end"`:    `"very long te…"`
   * - `"middle"`: `"very l…g text"` (useful for file paths)
   * - `"start"`:  `"…ery long text"`
   *
   * @default {"end"}
   */
  position?: "end" | "middle" | "start";
}
/**
 * Truncates a string to at most `maxLength` UTF-16 code units. When truncation
 * occurs the suffix is included within the `maxLength` budget. Surrogate pairs
 * are never split, so the result may be shorter than `maxLength` when a cut
 * would land inside a pair. When the suffix itself contains surrogate pairs and
 * `maxLength` is very small, the result can even be empty.
 *
 * Note: this function is not grapheme-cluster-aware. Combining characters, flag
 * emoji, and ZWJ sequences may still be visually split.
 *
 * @param str The string to truncate.
 * @param maxLength The maximum length of the returned string (must be a
 * non-negative integer).
 * @param options The truncation options.
 * @returns The truncated string.
 * @throws {RangeError} If `maxLength` is not a non-negative integer.
 * @throws {TypeError} If `position` is not a valid position.
 *
 * @example End truncation (default)
 * ```ts
 * import { truncate } from "truncate.ts";
 * import { assertEquals } from "../assert/mod.ts";
 *
 * assertEquals(truncate("Hello, world!", 8), "Hello, …");
 * assertEquals(truncate("Short", 10), "Short");
 * ```
 *
 * @example Middle truncation
 * ```ts
 * import { truncate } from "truncate.ts";
 * import { assertEquals } from "../assert/mod.ts";
 *
 * assertEquals(
 *   truncate("src/components/Button.tsx", 18, { position: "middle" }),
 *   "src/comp…utton.tsx",
 * );
 * ```
 *
 * @example Start truncation
 * ```ts
 * import { truncate } from "truncate.ts";
 * import { assertEquals } from "../assert/mod.ts";
 *
 * assertEquals(
 *   truncate("Hello, world!", 8, { position: "start" }),
 *   "… world!",
 * );
 * ```
 *
 * @example Custom suffix
 * ```ts
 * import { truncate } from "truncate.ts";
 * import { assertEquals } from "../assert/mod.ts";
 *
 * assertEquals(
 *   truncate("Hello, world!", 10, { suffix: "→" }),
 *   "Hello, wo→",
 * );
 * ```
 */
export declare function truncate(
  str: string,
  maxLength: number,
  options?: TruncateOptions,
): string;
