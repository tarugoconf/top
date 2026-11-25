import { type ParseResult } from "./_io.ts";
/** Options for {@linkcode CsvParseStream}. */
export interface CsvParseStreamOptions {
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
   * If the wrong number of fields is in a row, a {@linkcode https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SyntaxError | SyntaxError}
   * is thrown.
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
/** Row return type. */
export type RowType<T> = T extends undefined ? string[]
  : ParseResult<CsvParseStreamOptions, T>[number];
/**
 * `CsvParseStream` transforms a stream of CSV-encoded text into a stream of
 * parsed objects.
 *
 * A `CsvParseStream` expects input conforming to
 * {@link https://www.rfc-editor.org/rfc/rfc4180.html | RFC 4180}.
 *
 * @example Usage with default options
 * ```ts
 * import { CsvParseStream } from "parse-stream.ts";
 * import { assertEquals } from "../assert/equals.ts";
 * import { assertType, IsExact } from "../testing/types.ts"
 *
 * const source = ReadableStream.from([
 *   "name,age\n",
 *   "Alice,34\n",
 *   "Bob,24\n",
 * ]);
 * const stream = source.pipeThrough(new CsvParseStream());
 * const result = await Array.fromAsync(stream);
 *
 * assertEquals(result, [
 *   ["name", "age"],
 *   ["Alice", "34"],
 *   ["Bob", "24"],
 * ]);
 * assertType<IsExact<typeof result, string[][]>>(true);
 * ```
 *
 * @example Skip first row with `skipFirstRow: true`
 * ```ts
 * import { CsvParseStream } from "parse-stream.ts";
 * import { assertEquals } from "../assert/equals.ts";
 * import { assertType, IsExact } from "../testing/types.ts"
 *
 * const source = ReadableStream.from([
 *   "name,age\n",
 *   "Alice,34\n",
 *   "Bob,24\n",
 * ]);
 * const stream = source.pipeThrough(new CsvParseStream({ skipFirstRow: true }));
 * const result = await Array.fromAsync(stream);
 *
 * assertEquals(result, [
 *   { name: "Alice", age: "34" },
 *   { name: "Bob", age: "24" },
 * ]);
 * assertType<IsExact<typeof result, Record<string, string>[]>>(true);
 * ```
 *
 * @example Specify columns with `columns` option
 * ```ts
 * import { CsvParseStream } from "parse-stream.ts";
 * import { assertEquals } from "../assert/equals.ts";
 * import { assertType, IsExact } from "../testing/types.ts"
 *
 * const source = ReadableStream.from([
 *   "Alice,34\n",
 *   "Bob,24\n",
 * ]);
 * const stream = source.pipeThrough(new CsvParseStream({
 *   columns: ["name", "age"]
 * }));
 * const result = await Array.fromAsync(stream);
 *
 * assertEquals(result, [
 *   { name: "Alice", age: "34" },
 *   { name: "Bob", age: "24" },
 * ]);
 * assertType<IsExact<typeof result, Record<"name" | "age", string>[]>>(true);
 * ```
 *
 * @example Specify columns with `columns` option and skip first row with
 * `skipFirstRow: true`
 * ```ts
 * import { CsvParseStream } from "parse-stream.ts";
 * import { assertEquals } from "../assert/equals.ts";
 * import { assertType, IsExact } from "../testing/types.ts"
 *
 * const source = ReadableStream.from([
 *   "Alice,34\n",
 *   "Bob,24\n",
 * ]);
 * const stream = source.pipeThrough(new CsvParseStream({
 *   columns: ["name", "age"],
 *   skipFirstRow: true,
 * }));
 * const result = await Array.fromAsync(stream);
 *
 * assertEquals(result, [{ name: "Bob", age: "24" }]);
 * assertType<IsExact<typeof result, Record<"name" | "age", string>[]>>(true);
 * ```
 *
 * @example TSV (tab-separated values) with `separator: "\t"`
 * ```ts
 * import { CsvParseStream } from "parse-stream.ts";
 * import { assertEquals } from "../assert/equals.ts";
 *
 * const source = ReadableStream.from([
 *   "Alice\t34\n",
 *   "Bob\t24\n",
 * ]);
 * const stream = source.pipeThrough(new CsvParseStream({
 *   separator: "\t",
 * }));
 * const result = await Array.fromAsync(stream);
 *
 * assertEquals(result, [
 *   ["Alice", "34"],
 *   ["Bob", "24"],
 * ]);
 * ```
 *
 * @example Trim leading space with `trimLeadingSpace: true`
 * ```ts
 * import { CsvParseStream } from "parse-stream.ts";
 * import { assertEquals } from "../assert/equals.ts";
 *
 * const source = ReadableStream.from([
 *   "      Alice,34\n          ",
 *   "Bob,     24\n",
 * ]);
 * const stream = source.pipeThrough(new CsvParseStream({
 *   trimLeadingSpace: true,
 * }));
 * const result = await Array.fromAsync(stream);
 *
 * assertEquals(result, [
 *   ["Alice", "34"],
 *   ["Bob", "24"],
 * ]);
 * ```
 *
 * @example Quoted fields
 * ```ts
 * import { CsvParseStream } from "parse-stream.ts";
 * import { assertEquals } from "../assert/equals.ts";
 *
 * const source = ReadableStream.from([
 *   `"a ""word""","com`,
 *   `ma,","newline`,
 *   `\n"\nfoo,bar,b`,
 *   `az\n`,
 * ]);
 * const stream = source.pipeThrough(new CsvParseStream());
 * const result = await Array.fromAsync(stream);
 *
 * assertEquals(result, [
 *   ['a "word"', "comma,", "newline\n"],
 *   ["foo", "bar", "baz"]
 * ]);
 * ```
 *
 * @example Allow lazy quotes with `lazyQuotes: true`
 * ```ts
 * import { CsvParseStream } from "parse-stream.ts";
 * import { assertEquals } from "../assert/equals.ts";
 *
 * const source = ReadableStream.from([
 *   `a "word","1"`,
 *   `2",a","b`,
 * ]);
 * const stream = source.pipeThrough(new CsvParseStream({
 *   lazyQuotes: true,
 * }));
 * const result = await Array.fromAsync(stream);
 *
 * assertEquals(result, [['a "word"', '1"2', 'a"', 'b']]);
 * ```
 *
 * @example Define comment prefix with `comment` option
 * ```ts
 * import { CsvParseStream } from "parse-stream.ts";
 * import { assertEquals } from "../assert/equals.ts";
 *
 * const source = ReadableStream.from([
 *   "Alice,34\n",
 *   "# THIS IS A COMMENT\n",
 *   "Bob,24\n",
 * ]);
 * const stream = source.pipeThrough(new CsvParseStream({
 *   comment: "#",
 * }));
 * const result = await Array.fromAsync(stream);
 *
 * assertEquals(result, [
 *   ["Alice", "34"],
 *   ["Bob", "24"],
 * ]);
 * ```
 *
 * @example Infer the number of fields from the first row with
 * `fieldsPerRecord: 0`
 * ```ts
 * import { CsvParseStream } from "parse-stream.ts";
 * import { assertEquals } from "../assert/equals.ts";
 * import { assertRejects } from "../assert/rejects.ts";
 *
 * const source = ReadableStream.from([
 *   "Alice,34\n",
 *   "Bob,24,CA\n", // Note that this row has more fields than the first row
 * ]);
 * const stream = source.pipeThrough(new CsvParseStream({
 *   fieldsPerRecord: 0,
 * }));
 * const reader = stream.getReader();
 * assertEquals(await reader.read(), { done: false, value: ["Alice", "34"] });
 * await assertRejects(
 *   () => reader.read(),
 *   SyntaxError,
 *   "Syntax error on line 2: expected 2 fields but got 3",
 * );
 * ```
 *
 * @example Enforce the number of field for each row with `fieldsPerRecord: 2`
 * ```ts
 * import { CsvParseStream } from "parse-stream.ts";
 * import { assertEquals } from "../assert/equals.ts";
 * import { assertRejects } from "../assert/rejects.ts";
 *
 * const source = ReadableStream.from([
 *   "Alice,34\n",
 *   "Bob,24,CA\n",
 * ]);
 * const stream = source.pipeThrough(new CsvParseStream({
 *   fieldsPerRecord: 2,
 * }));
 * const reader = stream.getReader();
 * assertEquals(await reader.read(), { done: false, value: ["Alice", "34"] });
 * await assertRejects(
 *   () => reader.read(),
 *   SyntaxError,
 *   "Syntax error on line 2: expected 2 fields but got 3",
 * );
 * ```
 *
 * @typeParam T The type of options for the stream.
 */
export declare class CsvParseStream<
  const T extends CsvParseStreamOptions | undefined = undefined,
> implements TransformStream<string, RowType<T>> {
  #private;
  /** Construct a new instance.
   *
   * @param options Options for the stream.
   */
  constructor(options?: T);
  /**
   * The instance's {@linkcode ReadableStream}.
   *
   * @example Usage
   * ```ts
   * import { CsvParseStream } from "parse-stream.ts";
   * import { assertEquals } from "../assert/equals.ts";
   *
   * const source = ReadableStream.from([
   *   "name,age\n",
   *   "Alice,34\n",
   *   "Bob,24\n",
   * ]);
   * const parseStream = new CsvParseStream({ skipFirstRow: true });
   * const parts = source.pipeTo(parseStream.writable);
   * assertEquals(await Array.fromAsync(parseStream.readable), [
   *   { name: "Alice", age: "34" },
   *   { name: "Bob", age: "24" },
   * ]);
   * ```
   *
   * @returns The instance's {@linkcode ReadableStream}.
   */
  get readable(): ReadableStream<RowType<T>>;
  /**
   * The instance's {@linkcode WritableStream}.
   *
   * @example Usage
   * ```ts
   * import { CsvParseStream } from "parse-stream.ts";
   * import { assertEquals } from "../assert/equals.ts";
   *
   * const source = ReadableStream.from([
   *   "name,age\n",
   *   "Alice,34\n",
   *   "Bob,24\n",
   * ]);
   * const parseStream = new CsvParseStream({ skipFirstRow: true });
   * const parts = source.pipeTo(parseStream.writable);
   * assertEquals(await Array.fromAsync(parseStream.readable), [
   *   { name: "Alice", age: "34" },
   *   { name: "Bob", age: "24" },
   * ]);
   * ```
   *
   * @returns The instance's {@linkcode WritableStream}.
   */
  get writable(): WritableStream<string>;
}
