import type { GlobOptions } from "../_common/glob-to-reg-exp.ts";
export type { GlobOptions };
/**
 * Like normalize(), but doesn't collapse "**\/.." when `globstar` is true.
 *
 * @example Usage
 * ```ts
 * import { normalizeGlob } from "normalize-glob.ts";
 * import { assertEquals } from "../../assert/mod.ts";
 *
 * const normalized = normalizeGlob("**\\foo\\..\\bar", { globstar: true });
 * assertEquals(normalized, "**\\bar");
 * ```
 *
 * @param glob The glob pattern to normalize.
 * @param options The options for glob pattern.
 * @returns The normalized glob pattern.
 */
export declare function normalizeGlob(
  glob: string,
  options?: Pick<GlobOptions, "globstar">,
): string;
