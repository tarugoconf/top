import type { ParsedPath } from "../types.ts";
export type { ParsedPath } from "../types.ts";
/**
 * Return a `ParsedPath` object of the `path`.
 *
 * @example Usage
 * ```ts
 * import { parse } from "parse.ts";
 * import { assertEquals } from "../../assert/mod.ts";
 *
 * const path = parse("/home/user/file.txt");
 * assertEquals(path, {
 *   root: "/",
 *   dir: "/home/user",
 *   base: "file.txt",
 *   ext: ".txt",
 *   name: "file"
 * });
 * ```
 *
 * @param path The path to parse.
 * @returns The parsed path object.
 */
export declare function parse(path: string): ParsedPath;
