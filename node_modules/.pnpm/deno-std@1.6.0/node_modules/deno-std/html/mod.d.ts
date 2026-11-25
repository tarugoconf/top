/**
 * Functions for HTML tasks such as escaping or unescaping HTML entities.
 *
 * ```ts
 * import { unescape } from "entities.ts";
 * import { assertEquals } from "../assert/mod.ts";
 *
 * assertEquals(unescape("&lt;&gt;&#39;&amp;AA"), "<>'&AA");
 * assertEquals(unescape("&thorn;&eth;"), "&thorn;&eth;");
 * ```
 *
 * @module
 */
export * from "./entities.ts";
