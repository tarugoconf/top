/** An inspect function conforming to the shape of `Deno.inspect` and `node:util`'s `inspect` */
export type InspectFn = (v: unknown, options: {
  depth: number;
  sorted: boolean;
  trailingComma: boolean;
  compact: boolean;
  iterableLimit: number;
  getters: boolean;
  strAbbreviateSize: number;
}) => string;
/**
 * Converts the input into a string. Objects, Sets and Maps are sorted so as to
 * make tests less flaky.
 *
 * @param v Value to be formatted
 *
 * @returns The formatted string
 *
 * @example Usage
 * ```ts
 * import { format } from "format.ts";
 * import { assertEquals } from "../assert/mod.ts";
 *
 * assertEquals(format({ a: 1, b: 2 }), "{\n  a: 1,\n  b: 2,\n}");
 * assertEquals(format(new Set([1, 2])), "Set(2) {\n  1,\n  2,\n}");
 * assertEquals(format(new Map([[1, 2]])), "Map(1) {\n  1 => 2,\n}");
 * ```
 */
export declare function format(v: unknown): string;
