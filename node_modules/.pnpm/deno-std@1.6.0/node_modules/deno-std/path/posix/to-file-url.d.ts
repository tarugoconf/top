/**
 * Converts a path string to a file URL.
 *
 * @example Usage
 * ```ts
 * import { toFileUrl } from "to-file-url.ts";
 * import { assertEquals } from "../../assert/mod.ts";
 *
 * assertEquals(toFileUrl("/home/foo"), new URL("file:///home/foo"));
 * assertEquals(toFileUrl("/home/foo bar"), new URL("file:///home/foo%20bar"));
 * assertEquals(toFileUrl("//foo/bar"), new URL("file:///foo/bar"));
 * ```
 *
 * @param path The path to convert.
 * @returns The file URL.
 */
export declare function toFileUrl(path: string): URL;
