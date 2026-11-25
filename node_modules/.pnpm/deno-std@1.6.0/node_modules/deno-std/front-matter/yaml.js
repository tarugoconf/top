// Copyright 2018-2026 the Deno authors. MIT license.
// This module is browser compatible.
import { extractFrontMatter } from "./_shared.js";
import { parse } from "../yaml/parse.js";
import { EXTRACT_YAML_REGEXP } from "./_formats.js";
/**
 * Extracts and parses {@link https://yaml.org | YAML} from the metadata of
 * front matter content.
 *
 * @example Extract YAML front matter
 * ```ts
 * import { extract } from "yaml.ts";
 * import { assertEquals } from "../assert/mod.ts";
 *
 * const output = `---yaml
 * title: Three dashes marks the spot
 * ---
 * Hello, world!`;
 * const result = extract(output);
 *
 * assertEquals(result, {
 *   frontMatter: "title: Three dashes marks the spot",
 *   body: "Hello, world!",
 *   attrs: { title: "Three dashes marks the spot" },
 * });
 * ```
 *
 * Note: If you need to pass the options to the yaml parse,
 * use the new version of this API from `@std/yaml/unstable-yaml`.
 *
 * @typeParam T The type of the parsed front matter.
 * @param text The text to extract YAML front matter from.
 * @returns The extracted YAML front matter and body content.
 */
export function extract(text) {
  const { frontMatter, body } = extractFrontMatter(text, EXTRACT_YAML_REGEXP);
  const attrs = frontMatter ? parse(frontMatter) : {};
  return { frontMatter, body, attrs };
}
