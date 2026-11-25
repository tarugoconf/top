import type { GlobOptions } from "../_common/glob-to-reg-exp.ts";
export type { GlobOptions };
/**
 * Like join(), but doesn't collapse "**\/.." when `globstar` is true.
 *
 * @example Usage
 *
 * ```ts
 * import { joinGlobs } from "join-globs.ts";
 * import { assertEquals } from "../../assert/mod.ts";
 *
 * const joined = joinGlobs(["foo", "**", "bar"], { globstar: true });
 * assertEquals(joined, "foo\\**\\bar");
 * ```
 *
 * @param globs The globs to join.
 * @param options The options for glob pattern.
 * @returns The joined glob pattern.
 */
export declare function joinGlobs(
  globs: string[],
  options?: Pick<GlobOptions, "globstar">,
): string;
