/** Array index or record key corresponding to a value for a data object. */
export type PropertyAccessor = number | string;
/**
 * Column information.
 *
 * @param header Explicit column header name. If omitted,
 * the (final) property accessor is used for this value.
 *
 * @param prop Property accessor(s) used to access the value on the object
 */
export type ColumnDetails = {
  header?: string;
  prop: PropertyAccessor | PropertyAccessor[];
};
/**
 * The most essential aspect of a column is accessing the property holding the
 * data for that column on each object in the data array. If that member is at
 * the top level, `Column` can simply be a property accessor, which is either a
 * `string` (if it's a plain object) or a `number` (if it's an array).
 *
 * ```ts
 * const columns = [
 *   "name",
 * ];
 * ```
 *
 * Each property accessor will be used as the header for the column:
 *
 * | name |
 * | :--: |
 * | Deno |
 *
 * - If the required data is not at the top level (it's nested in other
 *   objects/arrays), then a simple property accessor won't work, so an array of
 *   them will be required.
 *
 *   ```ts
 *   const columns = [
 *     ["repo", "name"],
 *     ["repo", "org"],
 *   ];
 *   ```
 *
 *   When using arrays of property accessors, the header names inherit the value
 *   of the last accessor in each array:
 *
 *   | name |   org    |
 *   | :--: | :------: |
 *   | deno | denoland |
 *
 *  - If a different column header is desired, then a `ColumnDetails` object type
 *     can be used for each column:
 *
 *   - **`header?: string`** is the optional value to use for the column header
 *     name
 *
 *   - **`prop: PropertyAccessor | PropertyAccessor[]`** is the property accessor
 *     (`string` or `number`) or array of property accessors used to access the
 *     data on each object
 *
 *   ```ts
 *   const columns = [
 *     "name",
 *     {
 *       prop: ["runsOn", 0],
 *       header: "language 1",
 *     },
 *     {
 *       prop: ["runsOn", 1],
 *       header: "language 2",
 *     },
 *   ];
 *   ```
 *
 *   | name | language 1 | language 2 |
 *   | :--: | :--------: | :--------: |
 *   | Deno |    Rust    | TypeScript |
 */
export type Column = ColumnDetails | PropertyAccessor | PropertyAccessor[];
/** An object (plain or array) */
export type DataItem = Readonly<Record<string, unknown> | unknown[]>;
/** Options for {@linkcode stringify}. */
export type StringifyOptions = {
  /** Whether to include the row of headers or not.
   *
   * @default {true}
   */
  headers?: boolean;
  /**
   * Delimiter used to separate values. Examples:
   *  - `","` _comma_
   *  - `"\t"` _tab_
   *  - `"|"` _pipe_
   *  - etc.
   *
   *  @default {","}
   */
  separator?: string;
  /**
   * A list of instructions for how to target and transform the data for each
   * column of output. This is also where you can provide an explicit header
   * name for the column.
   *
   * @default {[]}
   */
  columns?: readonly Column[];
  /**
   * Whether to add a
   * {@link https://en.wikipedia.org/wiki/Byte_order_mark | byte-order mark} to the
   * beginning of the file content. Required by software such as MS Excel to
   * properly display Unicode text.
   *
   * @default {false}
   */
  bom?: boolean;
};
/**
 * Converts an array of objects into a CSV string.
 *
 * @example Default options
 * ```ts
 * import { stringify } from "stringify.ts";
 * import { assertEquals } from "../assert/equals.ts";
 *
 * const data = [
 *   ["Rick", 70],
 *   ["Morty", 14],
 * ];
 *
 * assertEquals(stringify(data), `Rick,70\r\nMorty,14\r\n`);
 * ```
 *
 * @example Give an array of objects and specify columns
 * ```ts
 * import { stringify } from "stringify.ts";
 * import { assertEquals } from "../assert/equals.ts";
 *
 * const data = [
 *   { name: "Rick", age: 70 },
 *   { name: "Morty", age: 14 },
 * ];
 *
 * const columns = ["name", "age"];
 *
 * assertEquals(stringify(data, { columns }), `name,age\r\nRick,70\r\nMorty,14\r\n`);
 * ```
 *
 * @example Give an array of objects without specifying columns
 * ```ts
 * import { stringify } from "stringify.ts";
 * import { assertThrows } from "../assert/throws.ts";
 *
 * const data = [
 *   { name: "Rick", age: 70 },
 *   { name: "Morty", age: 14 },
 * ];
 *
 * assertThrows(
 *   () => stringify(data),
 *   TypeError,
 *   "No property accessor function was provided for object",
 * );
 * ```
 *
 * @example Give an array of objects and specify columns with `headers: false`
 * ```ts
 * import { stringify } from "stringify.ts";
 * import { assertEquals } from "../assert/equals.ts";
 *
 * const data = [
 *   { name: "Rick", age: 70 },
 *   { name: "Morty", age: 14 },
 * ];
 *
 * const columns = ["name", "age"];
 *
 * assertEquals(
 *   stringify(data, { columns, headers: false }),
 *  `Rick,70\r\nMorty,14\r\n`,
 * );
 * ```
 *
 * @example Give an array of objects and specify columns with renaming
 * ```ts
 * import { stringify } from "stringify.ts";
 * import { assertEquals } from "../assert/equals.ts";
 *
 * const data = [
 *   { name: "Rick", age: 70 },
 *   { name: "Morty", age: 14 },
 * ];
 *
 * const columns = [
 *   { prop: "name", header: "user name" },
 *   "age",
 * ];
 *
 * assertEquals(
 *   stringify(data, { columns }),
 *  `user name,age\r\nRick,70\r\nMorty,14\r\n`,
 * );
 * ```
 *
 * @example Give an array of objects with nested property and specify columns
 * ```ts
 * import {
 *   Column,
 *   stringify,
 * } from "stringify.ts";
 * import { assertEquals } from "../assert/equals.ts";
 *
 * const data = [
 *   {
 *     age: 70,
 *     name: {
 *       first: "Rick",
 *       last: "Sanchez",
 *     },
 *   },
 *   {
 *     age: 14,
 *     name: {
 *       first: "Morty",
 *       last: "Smith",
 *     },
 *   },
 * ];
 *
 * const columns: Column[] = [
 *   ["name", "first"],
 *   "age",
 * ];
 *
 * assertEquals(
 *   stringify(data, { columns }),
 *  `first,age\r\nRick,70\r\nMorty,14\r\n`,
 * );
 * ```
 *
 * @example Give an array of objects with nested property and specify columns
 * with renaming
 * ```ts
 * import {
 *   Column,
 *   stringify,
 * } from "stringify.ts";
 * import { assertEquals } from "../assert/equals.ts";
 *
 * const data = [
 *   {
 *     age: 70,
 *     name: {
 *       first: "Rick",
 *       last: "Sanchez",
 *     },
 *   },
 *   {
 *     age: 14,
 *     name: {
 *       first: "Morty",
 *       last: "Smith",
 *     },
 *   },
 * ];
 *
 * const columns: Column[] = [
 *   { prop: ["name", "first"], header: "first name" },
 *   "age",
 * ];
 *
 * assertEquals(
 *   stringify(data, { columns }),
 *  `first name,age\r\nRick,70\r\nMorty,14\r\n`,
 * );
 * ```
 *
 * @example Give an array of string arrays and specify columns with renaming
 * ```ts
 * import { stringify } from "stringify.ts";
 * import { assertEquals } from "../assert/equals.ts";
 *
 * const data = [
 *   ["Rick", 70],
 *   ["Morty", 14],
 * ];
 *
 * const columns = [
 *   { prop: 0, header: "name" },
 *   { prop: 1, header: "age" },
 * ];
 *
 * assertEquals(
 *   stringify(data, { columns }),
 *  `name,age\r\nRick,70\r\nMorty,14\r\n`,
 * );
 * ```
 *
 * @example Emit TSV (tab-separated values) with `separator: "\t"`
 * ```ts
 * import { stringify } from "stringify.ts";
 * import { assertEquals } from "../assert/equals.ts";
 *
 * const data = [
 *   ["Rick", 70],
 *   ["Morty", 14],
 * ];
 *
 * assertEquals(stringify(data, { separator: "\t" }), `Rick\t70\r\nMorty\t14\r\n`);
 * ```
 *
 * @example Prepend a byte-order mark with `bom: true`
 * ```ts
 * import { stringify } from "stringify.ts";
 * import { assertEquals } from "../assert/equals.ts";
 *
 * const data = [["Rick", 70]];
 *
 * assertEquals(stringify(data, { bom: true }), "\ufeffRick,70\r\n");
 * ```
 *
 * @param data The source data to stringify. It's an array of items which are
 * plain objects or arrays.
 * @param options Options for the stringification.
 * @returns A CSV string.
 */
export declare function stringify(
  data: readonly DataItem[],
  options?: StringifyOptions,
): string;
