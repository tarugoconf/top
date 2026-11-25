/**
 * Returns true if the given value is part of the given object, otherwise it
 * returns false.
 *
 * Note: this doesn't work with non-primitive values. For example,
 * `includesValue({x: {}}, {})` returns false.
 *
 * @typeParam T The type of the values in the input record.
 *
 * @param record The record to check for the given value.
 * @param value The value to check for in the record.
 *
 * @returns `true` if the value is part of the record, otherwise `false`.
 *
 * @example Basic usage
 * ```ts
 * import { includesValue } from "includes-value.ts";
 * import { assertEquals } from "../assert/mod.ts";
 *
 * const input = {
 *   first: 33,
 *   second: 34,
 * };
 *
 * assertEquals(includesValue(input, 34), true);
 * ```
 */
export declare function includesValue<T>(
  record: Readonly<Record<string, T>>,
  value: T,
): boolean;
