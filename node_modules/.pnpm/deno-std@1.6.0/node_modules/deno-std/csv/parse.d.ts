import { type ParseResult, type RecordWithColumn } from "./_io.ts";
export type { ParseResult, RecordWithColumn };
/** Options for {@linkcode parse}. */
export interface ParseOptions {
  /** Character which separates values.
   *
   * @default {","}
   */
  separator?: string;
  /** Character to start a comment.
   *
   * Lines beginning with the comment character without preceding whitespace
   * are ignored. With leading whitespace the comment character becomes part of
   * the field, even you provide `trimLeadingSpace: true`.
   *
   * By default, no character is considered to be a start of a comment.
   */
  comment?: string;
  /** Flag to trim the leading space of the value.
   *
   * This is done even if the field delimiter, `separator`, is white space.
   *
   * @default {false}
   */
  trimLeadingSpace?: boolean;
  /**
   * Allow unquoted quote in a quoted field or non-double-quoted quotes in
   * quoted field.
   *
   * @default {false}
   */
  lazyQuotes?: boolean;
  /**
   * Enabling checking number of expected fields for each row.
   *
   * If positive, each record is required to have the given number of fields.
   * If 0, it will be set to the number of fields in the first row, so that
   * future rows must have the same field count.
   * If negative, no check is made and records may have a variable number of
   * fields.
   *
   * If the wrong number of fields is in a row, a {@linkcode SyntaxError} is
   * thrown.
   */
  fieldsPerRecord?: number;
  /**
   * If you provide `skipFirstRow: true` and `columns`, the first line will be
   * skipped.
   * If you provide `skipFirstRow: true` but not `columns`, the first line will
   * be skipped and used as header definitions.
   *
   * @default {false}
   */
  skipFirstRow?: boolean;
  /** List of names used for header definition. */
  columns?: readonly string[];
}
/**
 * Parses CSV string into an array of arrays of strings.
 *
 * @example Usage
 * ```ts
 * import { parse } from "parse.ts";
 * import { assertEquals } from "../assert/equals.ts";
 *
 * const string = "a,b,c\n#d,e,f";
 *
 * assertEquals(parse(string), [["a", "b", "c"], ["#d", "e", "f"]]);
 * ```
 *
 * @example Quoted fields
 * ```ts
 * import { parse } from "parse.ts";
 * import { assertEquals } from "../assert/equals.ts";
 *
 * const string = `"a ""word""","comma,","newline\n"\nfoo,bar,baz`;
 * const result = parse(string);
 *
 * assertEquals(result, [
 *   ['a "word"', "comma,", "newline\n"],
 *   ["foo", "bar", "baz"]
 * ]);
 * ```
 *
 * @param input The input to parse.
 * @returns The parsed data.
 */
export declare function parse(input: string): string[][];
/**
 * Parses CSV string into an array of objects or an array of arrays of strings.
 *
 * If `columns` or `skipFirstRow` option is provided, it returns an array of
 * objects, otherwise it returns an array of arrays of string.
 *
 * @example Don't skip first row with `skipFirstRow: false`
 * ```ts
 * import { parse } from "parse.ts";
 * import { assertEquals } from "../assert/equals.ts";
 * import { assertType, IsExact } from "../testing/types.ts"
 *
 * const string = "a,b,c\nd,e,f";
 * const result = parse(string, { skipFirstRow: false });
 *
 * assertEquals(result, [["a", "b", "c"], ["d", "e", "f"]]);
 * assertType<IsExact<typeof result, string[][]>>(true);
 * ```
 *
 * @example Skip first row with `skipFirstRow: true`
 * ```ts
 * import { parse } from "parse.ts";
 * import { assertEquals } from "../assert/equals.ts";
 * import { assertType, IsExact } from "../testing/types.ts"
 *
 * const string = "a,b,c\nd,e,f";
 * const result = parse(string, { skipFirstRow: true });
 *
 * assertEquals(result, [{ a: "d", b: "e", c: "f" }]);
 * assertType<IsExact<typeof result, Record<string, string>[]>>(true);
 * ```
 *
 * @example Specify columns with `columns` option
 * ```ts
 * import { parse } from "parse.ts";
 * import { assertEquals } from "../assert/equals.ts";
 * import { assertType, IsExact } from "../testing/types.ts"
 *
 * const string = "a,b,c\nd,e,f";
 * const result = parse(string, { columns: ["x", "y", "z"] });
 *
 * assertEquals(result, [{ x: "a", y: "b", z: "c" }, { x: "d", y: "e", z: "f" }]);
 * assertType<IsExact<typeof result, Record<"x" | "y" | "z", string>[]>>(true);
 * ```
 *
 * @example Specify columns with `columns` option and skip first row with
 * `skipFirstRow: true`
 * ```ts
 * import { parse } from "parse.ts";
 * import { assertEquals } from "../assert/equals.ts";
 * import { assertType, IsExact } from "../testing/types.ts"
 *
 * const string = "a,b,c\nd,e,f";
 * const result = parse(string, { columns: ["x", "y", "z"], skipFirstRow: true });
 *
 * assertEquals(result, [{ x: "d", y: "e", z: "f" }]);
 * assertType<IsExact<typeof result, Record<"x" | "y" | "z", string>[]>>(true);
 * ```
 *
 * @example TSV (tab-separated values) with `separator: "\t"`
 * ```ts
 * import { parse } from "parse.ts";
 * import { assertEquals } from "../assert/equals.ts";
 *
 * const string = "a\tb\tc\nd\te\tf";
 * const result = parse(string, { separator: "\t" });
 *
 * assertEquals(result, [["a", "b", "c"], ["d", "e", "f"]]);
 * ```
 *
 * @example Trim leading space with `trimLeadingSpace: true`
 * ```ts
 * import { parse } from "parse.ts";
 * import { assertEquals } from "../assert/equals.ts";
 *
 * const string = " a,  b,    c\n";
 * const result = parse(string, { trimLeadingSpace: true });
 *
 * assertEquals(result, [["a", "b", "c"]]);
 * ```
 *
 * @example Lazy quotes with `lazyQuotes: true`
 * ```ts
 * import { parse } from "parse.ts";
 * import { assertEquals } from "../assert/equals.ts";
 *
 * const string = `a "word","1"2",a","b`;
 * const result = parse(string, { lazyQuotes: true });
 *
 * assertEquals(result, [['a "word"', '1"2', 'a"', 'b']]);
 * ```
 *
 * @example Set comment prefix with `comment` option
 * ```ts
 * import { parse } from "parse.ts";
 * import { assertEquals } from "../assert/equals.ts";
 *
 * const string = "a,b,c\n# THIS IS A COMMENT LINE\nd,e,f";
 * const result = parse(string, { comment: "#" });
 *
 * assertEquals(result, [["a", "b", "c"], ["d", "e", "f"]]);
 * ```
 *
 * @example Infer the number of fields from the first row with `fieldsPerRecord: 0`
 *  ```ts
 * import { parse } from "parse.ts";
 * import { assertThrows } from "../assert/throws.ts";
 *
 * // Note that the second row has more fields than the first row
 * const string = "a,b\nc,d,e";
 * assertThrows(
 *   () => parse(string, { fieldsPerRecord: 0 }),
 *   SyntaxError,
 *   "Syntax error on line 2: expected 2 fields but got 3",
 * );
 * ```
 *
 * @example Enforce the number of fields for each row with `fieldsPerRecord: 2`
 *  ```ts
 * import { parse } from "parse.ts";
 * import { assertThrows } from "../assert/throws.ts";
 *
 * const string = "a,b\nc,d,e";
 * assertThrows(
 *   () => parse(string, { fieldsPerRecord: 2 }),
 *   SyntaxError,
 *   "Syntax error on line 2: expected 2 fields but got 3",
 * );
 * ```
 *
 * @typeParam T The options' type for parsing.
 * @param input The input to parse.
 * @param options The options for parsing.
 * @returns If you don't provide `options.skipFirstRow` or `options.columns`, it
 * returns `string[][]`. If you provide `options.skipFirstRow` or
 * `options.columns`, it returns `Record<string, string>[]`.
 */
export declare function parse<const T extends ParseOptions>(
  input: string,
  options: T,
): ParseResult<ParseOptions, T>;
