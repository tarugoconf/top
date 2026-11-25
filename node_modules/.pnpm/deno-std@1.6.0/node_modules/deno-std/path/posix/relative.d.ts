/**
 * Return the relative path from `from` to `to` based on current working directory.
 *
 * If `from` and `to` are the same, return an empty string.
 *
 * @example Usage
 * ```ts
 * import { relative } from "relative.ts";
 * import { assertEquals } from "../../assert/mod.ts";
 *
 * const path = relative("/data/orandea/test/aaa", "/data/orandea/impl/bbb");
 * assertEquals(path, "../../impl/bbb");
 * ```
 *
 * @param from The path to start from.
 * @param to The path to reach.
 * @returns The relative path.
 */
export declare function relative(from: string, to: string): string;
