import type { Extract } from "./types.ts";
export type { Extract };
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
export declare function extract<T>(text: string): Extract<T>;
