// Copyright 2018-2026 the Deno authors. MIT license.
// This module is browser compatible.
import { extract as extractToml } from "./toml.js";
import { extract as extractYaml } from "./yaml.js";
import { extract as extractJson } from "./json.js";
import { RECOGNIZE_REGEXP_MAP } from "./_formats.js";
/**
 * Extracts and parses {@link https://yaml.org | YAML}, {@link https://toml.io |
 * TOML}, or {@link https://www.json.org/ | JSON} from the metadata of front
 * matter content, depending on the format.
 *
 * @example Usage
 * ```ts
 * import { extract } from "any.ts";
 * import { assertEquals } from "../assert/mod.ts";
 *
 * const output = `---json
 * {
 *   "title": "Three dashes marks the spot"
 * }
 * ---
 * Hello, world!`;
 * const result = extract(output);
 * assertEquals(result, {
 *   frontMatter: '{\n  "title": "Three dashes marks the spot"\n}',
 *   body: "Hello, world!",
 *   attrs: { title: "Three dashes marks the spot" }
 * })
 * ```
 *
 * @typeParam T The type of the parsed front matter.
 * @param text The text to extract front matter from.
 * @returns The extracted front matter and body content.
 */
export function extract(text) {
  const format = [...RECOGNIZE_REGEXP_MAP.entries()]
    .find(([_, regexp]) => regexp.test(text))?.[0];
  switch (format) {
    case "yaml":
      return extractYaml(text);
    case "toml":
      return extractToml(text);
    case "json":
      return extractJson(text);
    default:
      throw new TypeError("Unsupported front matter format");
  }
}
