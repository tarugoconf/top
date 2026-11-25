interface Success<T> {
  ok: true;
  body: T;
}
interface Failure {
  ok: false;
}
type ParseResult<T> = Success<T> | Failure;
type ParserComponent<T = unknown> = (scanner: Scanner) => ParseResult<T>;
type Block = {
  type: "Block";
  value: Record<string, unknown>;
};
type Table = {
  type: "Table";
  keys: string[];
  value: Record<string, unknown>;
};
type TableArray = {
  type: "TableArray";
  keys: string[];
  value: Record<string, unknown>;
};
export declare class Scanner {
  #private;
  constructor(source: string);
  get position(): number;
  get source(): string;
  /**
   * Get current character
   * @param index - relative index from current position
   */
  char(index?: number): string;
  /**
   * Get sliced string
   * @param start - start position relative from current position
   * @param end - end position relative from current position
   */
  slice(start: number, end: number): string;
  /**
   * Move position to next
   */
  next(count?: number): void;
  skipWhitespaces(): void;
  nextUntilChar(options?: {
    skipComments?: boolean;
  }): void;
  /**
   * Position reached EOF or not
   */
  eof(): boolean;
  isCurrentCharEOL(): boolean;
  startsWith(searchString: string): boolean;
  match(regExp: RegExp): RegExpMatchArray | null;
}
/**
 * Creates a nested object from the keys and values.
 *
 * e.g. `unflat(["a", "b", "c"], 1)` returns `{ a: { b: { c: 1 } } }`
 */
export declare function unflat(
  keys: string[],
  values?: unknown,
): Record<string, unknown>;
export declare function deepAssign(
  target: Record<string, unknown>,
  body: Block | Table | TableArray,
): Record<string, unknown>;
export declare function bareKey(scanner: Scanner): ParseResult<string>;
export declare function basicString(scanner: Scanner): ParseResult<string>;
export declare function literalString(scanner: Scanner): ParseResult<string>;
export declare function multilineBasicString(
  scanner: Scanner,
): ParseResult<string>;
export declare function multilineLiteralString(
  scanner: Scanner,
): ParseResult<string>;
export declare function boolean(scanner: Scanner): ParseResult<boolean>;
export declare function infinity(scanner: Scanner): ParseResult<number>;
export declare function nan(scanner: Scanner): ParseResult<number>;
export declare const dottedKey: ParserComponent<string[]>;
export declare function binary(scanner: Scanner): ParseResult<number | string>;
export declare function octal(scanner: Scanner): ParseResult<number | string>;
export declare function hex(scanner: Scanner): ParseResult<number | string>;
export declare function integer(scanner: Scanner): ParseResult<number | string>;
export declare function float(scanner: Scanner): ParseResult<number>;
export declare function dateTime(scanner: Scanner): ParseResult<Date>;
export declare function localTime(scanner: Scanner): ParseResult<string>;
export declare function arrayValue(scanner: Scanner): ParseResult<unknown[]>;
export declare function inlineTable(
  scanner: Scanner,
): ParseResult<Record<string, unknown>>;
export declare const value: ParserComponent<
  string | number | boolean | unknown[] | Date | Record<string, unknown>
>;
export declare const pair: ParserComponent<{
  [key: string]: unknown;
}>;
export declare function block(scanner: Scanner): ParseResult<Block>;
export declare const tableHeader: ParserComponent<string[]>;
export declare function table(scanner: Scanner): ParseResult<Table>;
export declare const tableArrayHeader: ParserComponent<string[]>;
export declare function tableArray(scanner: Scanner): ParseResult<TableArray>;
export declare function toml(
  scanner: Scanner,
): ParseResult<Record<string, unknown>>;
export declare function parserFactory<T>(
  parser: ParserComponent<T>,
): (tomlString: string) => T;
export {};
