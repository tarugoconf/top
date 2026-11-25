/** The case for the remaining characters in the string */
export type TrailingCase = "lower" | "unchanged";
/** Base options for title-case functions */
export interface BaseTitleCaseOptions {
  /**
   * Uses localized case formatting. If it is set to `true`, uses default
   * locale on the system. If it's set to a specific locale, uses that locale.
   *
   * @default {false}
   */
  locale?: boolean | NonNullable<Intl.LocalesArgument>;
  /**
   * The case to use for the remaining characters in the string:
   * - `"lower"` lowercases them, even if previously capitalized.
   * - `"unchanged"` preserves the original casing.
   *
   * @default {"lower"}
   */
  trailingCase?: TrailingCase;
}
type ResolvedOptions = {
  cacheKey: string;
  locale: Intl.Locale;
  trailingCase: TrailingCase;
  words: Intl.Segmenter;
  graphemes: Intl.Segmenter;
};
export declare function resolveOptions(
  opts?: BaseTitleCaseOptions,
): ResolvedOptions;
export declare const CACHE_MAX_SEGMENT_LENGTH = 32;
export declare function titleCaseSegment(
  s: string,
  opts: ResolvedOptions,
  _cache?: Map<string, string>,
): string;
export {};
