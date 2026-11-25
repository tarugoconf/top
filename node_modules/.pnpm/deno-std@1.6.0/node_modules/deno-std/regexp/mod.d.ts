/**
 * Functions for tasks related to
 * {@link https://en.wikipedia.org/wiki/Regular_expression | regular expression} (regexp),
 * such as escaping text for interpolation into a regexp.
 *
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
 * @module
 */
export * from "./escape.ts";
