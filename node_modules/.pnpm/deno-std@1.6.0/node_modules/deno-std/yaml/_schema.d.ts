import type { KindType, Type } from "./_type.ts";
/**
 * Name of the schema to use.
 *
 * > [!NOTE]
 * > It is recommended to use the schema that is most appropriate for your use
 * > case. Doing so will avoid any unnecessary processing and benefit
 * > performance.
 *
 * Options include:
 * - `failsafe`: supports generic mappings, generic sequences and generic
 * strings.
 * - `json`: extends `failsafe` schema by also supporting nulls, booleans,
 * integers and floats.
 * - `core`: functionally the same as `json` schema.
 * - `default`: extends `core` schema by also supporting binary, omap, pairs and
 * set types.
 * - `extended`: extends `default` schema by also supporting regular
 * expressions and undefined values.
 *
 * See
 * {@link https://yaml.org/spec/1.2.2/#chapter-10-recommended-schemas | YAML 1.2 spec}
 * for more details on the `failsafe`, `json` and `core` schemas.
 */
export type SchemaType = "failsafe" | "json" | "core" | "default" | "extended";
/**
 * A type that can be implicitly resolved (i.e. without using a tag) when
 * loading a YAML document.
 */
export type ImplicitType = Type<"scalar">;
export type ExplicitType = Type<KindType>;
export type TypeMap = Record<KindType | "fallback", Map<string, ExplicitType>>;
export interface Schema {
  implicitTypes: ImplicitType[];
  explicitTypes: ExplicitType[];
  typeMap: TypeMap;
}
/**
 * Default YAML schema. It is not described in the YAML specification.
 */
export declare const DEFAULT_SCHEMA: Schema;
export declare const SCHEMA_MAP: Map<SchemaType, Schema>;
export declare function getSchema(
  schema?: SchemaType,
  types?: ImplicitType[],
): Schema;
