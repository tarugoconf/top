import { type ImplicitType, type SchemaType } from "./_schema.ts";
import type { StringifyOptions as StableStringifyOptions } from "./stringify.ts";
import type { KindType, RepresentFn, Type } from "./_type.ts";
export type { ImplicitType, KindType, RepresentFn, SchemaType, Type };
/** Options for {@linkcode stringify}. */
export type StringifyOptions = StableStringifyOptions & {
  /**
   * Extra types to be added to the schema.
   */
  extraTypes?: ImplicitType[];
};
/**
 * Converts a JavaScript object or value to a YAML document string.
 *
 * @example Usage
 * ```ts
 * import { stringify } from "stringify.ts";
 * import { assertEquals } from "../assert/mod.ts";
 *
 * const data = { id: 1, name: "Alice" };
 * const yaml = stringify(data);
 *
 * assertEquals(yaml, "id: 1\nname: Alice\n");
 * ```
 *
 * @throws {TypeError} If `data` contains invalid types.
 * @param data The data to serialize.
 * @param options The options for serialization.
 * @returns A YAML string.
 */
export declare function stringify(
  data: unknown,
  options?: StringifyOptions,
): string;
