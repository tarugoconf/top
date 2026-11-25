export interface DBEntry {
  source: string;
  compressible?: boolean;
  charset?: string;
  extensions?: string[];
}
export declare function consumeToken(v: string): [token: string, rest: string];
export declare function consumeValue(v: string): [value: string, rest: string];
export declare function consumeMediaParam(
  v: string,
): [key: string, value: string, rest: string];
export declare function decode2331Encoding(v: string): string | undefined;
export declare function isIterator<T>(obj: unknown): obj is Iterable<T>;
export declare function isToken(s: string): boolean;
export declare function isTSpecial(r: string): boolean;
export declare function needsEncoding(s: string): boolean;
