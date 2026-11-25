import type { DiffResult, DiffType } from "./types.ts";
/**
 * Colors the output of assertion diffs.
 *
 * @param diffType Difference type, either added or removed.
 * @param background If true, colors the background instead of the text.
 *
 * @returns A function that colors the input string.
 *
 * @example Usage
 * ```ts
 * import { createColor } from "mod.ts";
 * import { assertEquals } from "../assert/mod.ts";
 * import { bold, green, red, white } from "../fmt/colors.ts";
 *
 * assertEquals(createColor("added")("foo"), green(bold("foo")));
 * assertEquals(createColor("removed")("foo"), red(bold("foo")));
 * assertEquals(createColor("common")("foo"), white("foo"));
 * ```
 */
export declare function createColor(
  diffType: DiffType,
  /**
   * TODO(@littledivy): Remove this when we can detect true color terminals. See
   * https://github.com/denoland/std/issues/2575.
   */
  background?: boolean,
): (s: string) => string;
/**
 * Prefixes `+` or `-` in diff output.
 *
 * @param diffType Difference type, either added or removed
 *
 * @returns A string representing the sign.
 *
 * @example Usage
 * ```ts
 * import { createSign } from "mod.ts";
 * import { assertEquals } from "../assert/mod.ts";
 *
 * assertEquals(createSign("added"), "+   ");
 * assertEquals(createSign("removed"), "-   ");
 * assertEquals(createSign("common"), "    ");
 * ```
 */
export declare function createSign(diffType: DiffType): string;
/** Options for {@linkcode buildMessage}. */
export interface BuildMessageOptions {
  /**
   * Whether to output the diff as a single string.
   * @default {false}
   */
  stringDiff?: boolean;
}
/**
 * Builds a message based on the provided diff result.
 *
 * @param diffResult The diff result array.
 * @param options Optional parameters for customizing the message.
 * @param truncateDiff Function to truncate the diff (default is no truncation).
 *
 * @returns An array of strings representing the built message.
 *
 * @example Usage
 * ```ts no-assert
 * import { diffStr, buildMessage } from "mod.ts";
 *
 * diffStr("Hello, world!", "Hello, world");
 * // [
 * //   "",
 * //   "",
 * //   "    [Diff] Actual / Expected",
 * //   "",
 * //   "",
 * //   "-   Hello, world!",
 * //   "+   Hello, world",
 * //   "",
 * // ]
 * ```
 */
export declare function buildMessage(
  diffResult: ReadonlyArray<DiffResult<string>>,
  options?: BuildMessageOptions,
  truncateDiff?: (
    diffResult: ReadonlyArray<DiffResult<string>>,
    stringDiff: boolean,
    contextLength?: number | null,
  ) => ReadonlyArray<DiffResult<string>>,
): string[];
