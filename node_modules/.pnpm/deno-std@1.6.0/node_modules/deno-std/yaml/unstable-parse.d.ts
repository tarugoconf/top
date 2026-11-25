import type { ParseOptions as StableParseOptions } from "./parse.ts";
import { type ImplicitType, type SchemaType } from "./_schema.ts";
import type { KindType, RepresentFn, Type } from "./_type.ts";
export type { ImplicitType, KindType, RepresentFn, SchemaType, Type };
/** Options for {@linkcode parse}. */
export type ParseOptions = StableParseOptions & {
  /**
   * Extra types to be added to the schema.
   */
  extraTypes?: ImplicitType[];
};
/**
 * Parse and return a YAML string as a parsed YAML document object.
 *
 * Note: This does not support functions. Untrusted data is safe to parse.
 *
 * @example Usage
 * ```ts
 * import { parse } from "parse.ts";
 * import { assertEquals } from "../assert/mod.ts";
 *
 * const data = parse(`
 * id: 1
 * name: Alice
 * `);
 *
 * assertEquals(data, { id: 1, name: "Alice" });
 * ```
 *
 * @throws {YamlSyntaxError} Throws if the YAML is invalid or contains more
 * than one document.
 * @param content YAML string to parse.
 * @param options Parsing options.
 * @returns Parsed document.
 */
export declare function parse(content: string, options?: ParseOptions): unknown;
/**
 * Same as {@linkcode parse}, but understands multi-document YAML sources, and
 * returns multiple parsed YAML document objects.
 *
 * @example Usage
 * ```ts
 * import { parseAll } from "parse.ts";
 * import { assertEquals } from "../assert/mod.ts";
 *
 * const data = parseAll(`
 * ---
 * id: 1
 * name: Alice
 * ---
 * id: 2
 * name: Bob
 * ---
 * id: 3
 * name: Eve
 * `);
 * assertEquals(data, [ { id: 1, name: "Alice" }, { id: 2, name: "Bob" }, { id: 3, name: "Eve" }]);
 * ```
 *
 * @throws {YamlSyntaxError} Throws if the YAML is invalid.
 * @param content YAML string to parse.
 * @param options Parsing options.
 * @returns Array of parsed documents.
 */
export declare function parseAll(
  content: string,
  options?: ParseOptions,
): unknown[];
