// Copyright 2018-2026 the Deno authors. MIT license.
// Copyright (c) Jason Campbell. MIT license
// This module is browser compatible.
/**
 * Extracts
 * {@link https://daily-dev-tips.com/posts/what-exactly-is-frontmatter/ | front matter}
 * from strings. Adapted from
 * {@link https://github.com/jxson/front-matter/blob/36f139ef797bd9e5196a9ede03ef481d7fbca18e/index.js | jxson/front-matter}.
 *
 * ## Supported formats
 *
 * ### JSON
 *
 * ```ts
 * import { test, extractJson } from "mod.ts";
 * import { assertEquals } from "../assert/mod.ts";
 *
 * const str = "---json\n{\"and\": \"this\"}\n---\ndeno is awesome";
 *
 * assertEquals(test(str), true);
 * assertEquals(extractJson(str), {
 *   frontMatter: "{\"and\": \"this\"}",
 *   body: "deno is awesome",
 *   attrs: { and: "this" }
 * });
 * ```
 *
 * {@linkcode extractJson | extract} and {@linkcode test} support the following
 * delimiters.
 *
 * ```markdown
 * ---json
 * {
 *   "and": "this"
 * }
 * ---
 * ```
 *
 * ```markdown
 * {
 *   "is": "JSON"
 * }
 * ```
 *
 * ### TOML
 *
 * ```ts
 * import { test, extractToml } from "mod.ts";
 * import { assertEquals } from "../assert/mod.ts";
 *
 * const str = "---toml\nmodule = 'front_matter'\n---\ndeno is awesome";
 *
 * assertEquals(test(str), true);
 * assertEquals(extractToml(str), {
 *   frontMatter: "module = 'front_matter'",
 *   body: "deno is awesome",
 *   attrs: { module: "front_matter" }
 * });
 * ```
 *
 * {@linkcode extractToml | extract} and {@linkcode test} support the following
 * delimiters.
 *
 * ```markdown
 * ---toml
 * this = 'is'
 * ---
 * ```
 *
 * ```markdown
 * = toml =
 * parsed = 'as'
 * toml = 'data'
 * = toml =
 * ```
 *
 * ```markdown
 * +++
 * is = 'that'
 * not = 'cool?'
 * +++
 * ```
 *
 * ### YAML
 *
 * ```ts
 * import { test, extractYaml } from "mod.ts";
 * import { assertEquals } from "../assert/mod.ts";
 *
 * const str = "---yaml\nmodule: front_matter\n---\ndeno is awesome";
 *
 * assertEquals(test(str), true);
 * assertEquals(extractYaml(str), {
 *   frontMatter: "module: front_matter",
 *   body: "deno is awesome",
 *   attrs: { module: "front_matter" }
 * });
 * ```
 *
 * {@linkcode extractYaml | extract} and {@linkcode test} support the following
 * delimiters.
 *
 * ```front_matter
 * ---
 * these: are
 * ---
 * ```
 *
 * ```markdown
 * ---yaml
 * all: recognized
 * ---
 * ```
 *
 * ```markdown
 * = yaml =
 * as: yaml
 * = yaml =
 * ```
 *
 * @module
 */
import { extract as extractJson } from "./json.js";
import { extract as extractToml } from "./toml.js";
import { extract as extractYaml } from "./yaml.js";
export * from "./test.js";
export * from "./types.js";
export { extractJson, extractToml, extractYaml };
