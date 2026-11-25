// Copyright 2018-2026 the Deno authors. MIT license.
// This module is browser compatible.
const QUOTE = '"';
const LF = "\n";
const CRLF = "\r\n";
const BYTE_ORDER_MARK = "\ufeff";
function getEscapedString(value, sep) {
  if (value === undefined || value === null) {
    return "";
  }
  let str = "";
  if (typeof value === "object") {
    str = JSON.stringify(value);
  } else {
    str = String(value);
  }
  // Is regex.test more performant here? If so, how to dynamically create?
  // https://stackoverflow.com/questions/3561493/
  if (str.includes(sep) || str.includes(LF) || str.includes(QUOTE)) {
    return `${QUOTE}${str.replaceAll(QUOTE, `${QUOTE}${QUOTE}`)}${QUOTE}`;
  }
  return str;
}
function normalizeColumn(column) {
  let header;
  let prop;
  if (typeof column === "object") {
    if (Array.isArray(column)) {
      header = String(column[column.length - 1]);
      prop = column;
    } else {
      prop = Array.isArray(column.prop) ? column.prop : [column.prop];
      header = typeof column.header === "string"
        ? column.header
        : String(prop[prop.length - 1]);
    }
  } else {
    header = String(column);
    prop = [column];
  }
  return { header, prop };
}
/**
 * Returns an array of values from an object using the property accessors
 * (and optional transform function) in each column
 */
function getValuesFromItem(item, normalizedColumns) {
  const values = [];
  if (normalizedColumns.length) {
    for (const column of normalizedColumns) {
      let value = item;
      for (const prop of column.prop) {
        if (typeof value !== "object" || value === null) {
          continue;
        }
        if (Array.isArray(value)) {
          if (typeof prop === "number") {
            value = value[prop];
          } else {
            throw new TypeError('Property accessor is not of type "number"');
          }
        } // I think this assertion is safe. Confirm?
        else {
          value = value[prop];
        }
      }
      values.push(value);
    }
  } else {
    if (Array.isArray(item)) {
      values.push(...item);
    } else if (typeof item === "object") {
      throw new TypeError(
        "No property accessor function was provided for object",
      );
    } else {
      values.push(item);
    }
  }
  return values;
}
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
export function stringify(data, options) {
  const { headers = true, separator: sep = ",", columns = [], bom = false } =
    options ?? {};
  if (sep.includes(QUOTE) || sep.includes(CRLF)) {
    const message = [
      "Separator cannot include the following strings:",
      '  - U+0022: Quotation mark (")',
      "  - U+000D U+000A: Carriage Return + Line Feed (\\r\\n)",
    ].join("\n");
    throw new TypeError(message);
  }
  const normalizedColumns = columns.map(normalizeColumn);
  let output = "";
  if (bom) {
    output += BYTE_ORDER_MARK;
  }
  if (headers && normalizedColumns.length > 0) {
    output += normalizedColumns
      .map((column) => getEscapedString(column.header, sep))
      .join(sep);
    output += CRLF;
  }
  for (const item of data) {
    const values = getValuesFromItem(item, normalizedColumns);
    output += values
      .map((value) => getEscapedString(value, sep))
      .join(sep);
    output += CRLF;
  }
  return output;
}
