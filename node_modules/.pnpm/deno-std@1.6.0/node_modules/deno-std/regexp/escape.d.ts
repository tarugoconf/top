/**
 * Escapes arbitrary text for interpolation into a regexp, such that it will
 * match exactly that text and nothing else.
 *
 * @example Usage
 * ```ts
 * import { escape } from "escape.ts";
 * import { assertEquals, assertMatch, assertNotMatch } from "../assert/mod.ts";
 *
 * const re = new RegExp(`^${escape(".")}$`, "u");
 *
 * assertEquals("^\\.$", re.source);
 * assertMatch(".", re);
 * assertNotMatch("a", re);
 * ```
 *
 * @param str The string to escape.
 * @returns The escaped string.
 */
export declare function escape(str: string): string;
