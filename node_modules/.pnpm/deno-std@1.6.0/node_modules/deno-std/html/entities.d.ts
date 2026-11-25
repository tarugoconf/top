/** Object structure for a list of HTML entities. */
export type EntityList = Record<string, string>;
/**
 * Escapes text for safe interpolation into HTML text content and quoted attributes.
 *
 * @example Usage
 * ```ts
 * import { escape } from "entities.ts";
 * import { assertEquals } from "../assert/mod.ts";
 *
 * assertEquals(escape("<>'&AA"), "&lt;&gt;&#39;&amp;AA");
 *
 * // Characters that don't need to be escaped will be left alone,
 * // even if named HTML entities exist for them.
 * assertEquals(escape("þð"), "þð");
 * ```
 *
 * @param str The string to escape.
 * @returns The escaped string.
 */
export declare function escape(str: string): string;
/** Options for {@linkcode unescape}. */
export type UnescapeOptions = {
  entityList: EntityList;
};
/**
 * Unescapes HTML entities in text.
 *
 * Default options only handle `&<>'"` and numeric entities.
 *
 * @example Basic usage
 * ```ts
 * import { unescape } from "entities.ts";
 * import { assertEquals } from "../assert/mod.ts";
 *
 * assertEquals(unescape("&lt;&gt;&#39;&amp;AA"), "<>'&AA");
 * assertEquals(unescape("&thorn;&eth;"), "&thorn;&eth;");
 * ```
 *
 * @example Using a custom entity list
 *
 * This uses the full named entity list from the HTML spec (~47K un-minified)
 *
 * ```ts
 * import { unescape } from "entities.ts";
 * import entityList from "named-entity-list.json.ts" with { type: "json" };
 * import { assertEquals } from "../assert/mod.ts";
 *
 * assertEquals(unescape("&lt;&gt;&#39;&amp;AA", { entityList }), "<>'&AA");
 * ```
 *
 * @param str The string to unescape.
 * @param options Options for unescaping.
 * @returns The unescaped string.
 */
export declare function unescape(
  str: string,
  options?: Partial<UnescapeOptions>,
): string;
