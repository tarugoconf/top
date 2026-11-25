/** Options for {@linkcode parseRecord}. */
export interface ReadOptions {
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
   * @default {"#"}
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
   * If === 0, it will be set to the number of fields in the first row, so that
   * future rows must have the same field count.
   * If negative, no check is made and records may have a variable number of
   * fields.
   *
   * If the wrong number of fields is in a row, a {@linkcode SyntaxError} is
   * thrown.
   */
  fieldsPerRecord?: number;
}
export interface LineReader {
  readLine(): Promise<string | null>;
  isEOF(): boolean;
}
export declare function parseRecord(
  fullLine: string,
  reader: LineReader,
  options: ReadOptions,
  zeroBasedRecordStartLine: number,
  zeroBasedLine?: number,
): Promise<Array<string>>;
export declare function createBareQuoteErrorMessage(
  zeroBasedRecordStartLine: number,
  zeroBasedLine: number,
  zeroBasedColumn: number,
): string;
export declare function createQuoteErrorMessage(
  zeroBasedRecordStartLine: number,
  zeroBasedLine: number,
  zeroBasedColumn: number,
): string;
export declare function convertRowToObject(
  row: readonly string[],
  headers: readonly string[],
  zeroBasedLine: number,
): Record<string, unknown>;
/** Parse result type for {@linkcode parse} and {@linkcode CsvParseStream}. */
export type ParseResult<ParseOptions, T> = T extends ParseOptions & {
  columns: readonly (infer C extends string)[];
} ? RecordWithColumn<C>[]
  : T extends ParseOptions & {
    skipFirstRow: true;
  } ? Record<string, string>[]
  : T extends ParseOptions & {
    columns?: undefined;
    skipFirstRow?: false | undefined;
  } ? string[][]
  : Record<string, string>[] | string[][];
/**
 * Record type with column type.
 *
 * @example
 * ```
 * type RecordWithColumn<"aaa"|"bbb"> => Record<"aaa"|"bbb", string>
 * type RecordWithColumn<string> => Record<string, string | undefined>
 * ```
 */
export type RecordWithColumn<C extends string> = string extends C
  ? Record<string, string>
  : Record<C, string>;
