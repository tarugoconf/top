/** Return type for {@linkcode invertBy}. */
export type InvertByResult<
  T extends Record<PropertyKey, PropertyKey>,
  K extends keyof T,
> = Record<PropertyKey, K[]>;
/**
 * Composes a new record with all keys and values inverted.
 *
 * The new record is generated from the result of running each element of the
 * input record through the given transformer function.
 *
 * The corresponding inverted value of each inverted key is an array of keys
 * responsible for generating the inverted value.
 *
 * @typeParam R The type of the input record.
 * @typeParam T The type of the iterator function.
 *
 * @param record The record to invert.
 * @param transformer The function to transform keys.
 *
 * @returns A new record with all keys and values inverted.
 *
 * @example Basic usage
 * ```ts
 * import { invertBy } from "invert-by.ts";
 * import { assertEquals } from "../assert/mod.ts";
 *
 * const record = { a: "x", b: "y", c: "z" };
 *
 * assertEquals(
 *   invertBy(record, (key) => String(key).toUpperCase()),
 *   { X: ["a"], Y: ["b"], Z: ["c"] }
 * );
 * ```
 */
export declare function invertBy<
  R extends Record<PropertyKey, PropertyKey>,
  T extends (key: PropertyKey) => PropertyKey,
>(record: Readonly<R>, transformer: T): InvertByResult<R, keyof R>;
