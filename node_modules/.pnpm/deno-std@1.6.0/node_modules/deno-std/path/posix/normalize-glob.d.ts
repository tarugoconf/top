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
 * const path = normalizeGlob("foo/bar/../*", { globstar: true });
 * assertEquals(path, "foo/*");
 * ```
 *
 * @param glob The glob to normalize.
 * @param options The options to use.
 * @returns The normalized path.
 */
export declare function normalizeGlob(
  glob: string,
  options?: Pick<GlobOptions, "globstar">,
): string;
