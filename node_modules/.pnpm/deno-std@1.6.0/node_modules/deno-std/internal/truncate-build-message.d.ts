import type { CommonDiffResult, DiffResult } from "./types.ts";
/** The environment variable used for setting diff context length. */
export declare const DIFF_CONTEXT_LENGTH = "DIFF_CONTEXT_LENGTH";
/**
 * Get the truncation context length from the `DIFF_CONTEXT_LENGTH`
 * environment variable.
 * @returns The truncation context length, or `null` if not set or invalid.
 *
 * @example Usage
 * ```ts no-assert ignore
 * Deno.env.set("DIFF_CONTEXT_LENGTH", "10");
 * getTruncationContextLengthFromEnv(); // 10
 * ```
 */
export declare function getTruncationContextLengthFromEnv(): number | null;
/**
 * Truncates a diff result by consolidating unchanged lines.
 *
 * @param diffResult The diff result to truncate.
 * @param stringDiff Whether the diff is for strings.
 * @param contextLength The number of unchanged context lines to show around
 * each changed part of the diff. If not provided, it will be read from the
 * `DIFF_CONTEXT_LENGTH` environment variable. If that is not set or invalid,
 * no truncation will be performed.
 *
 * @returns The truncated diff result.
 *
 * @example Usage
 * ```ts no-assert ignore
 * truncateDiff(diffResult, false, 2);
 * ```
 */
export declare function truncateDiff(
  diffResult: ReadonlyArray<DiffResult<string>>,
  stringDiff: boolean,
  contextLength?: number | null,
): ReadonlyArray<DiffResult<string>>;
/**
 * Consolidates a sequence of common diff results by truncating unchanged lines.
 *
 * @param commons The sequence of common diff results to consolidate.
 * @param location The location of the common sequence in the overall diff:
 * "start", "middle", or "end".
 * @param stringDiff Whether the diff is for strings.
 * @param contextLength The number of unchanged context lines to show around
 * each changed part of the diff.
 * @returns The consolidated sequence of common diff results.
 *
 * @example Usage
 * ```ts no-assert ignore
 * consolidateCommon(commons, "middle", false, 2);
 * ```
 */
export declare function consolidateCommon(
  commons: ReadonlyArray<CommonDiffResult<string>>,
  location: "start" | "middle" | "end",
  stringDiff: boolean,
  contextLength: number,
): ReadonlyArray<CommonDiffResult<string>>;
