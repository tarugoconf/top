/**
 * Applies the given transformer to all values in the given record and returns a
 * new record containing the resulting keys associated to the last value that
 * produced them.
 *
 * @typeParam T The type of the values in the input record.
 * @typeParam O The type of the values in the output record.
 * @typeParam K The type of the keys in the input and output records.
 *
 * @param record The record to map values from.
 * @param transformer The function to transform each value.
 *
 * @returns A new record with all values transformed by the given transformer.
 *
 * @example Basic usage
 * ```ts
 * import { mapValues } from "map-values.ts";
 * import { assertEquals } from "../assert/mod.ts";
 *
 * const usersById = {
 *   a5ec: { name: "Mischa" },
 *   de4f: { name: "Kim" },
 * };
 * const namesById = mapValues(usersById, (user) => user.name);
 *
 * assertEquals(
 *   namesById,
 *   {
 *     a5ec: "Mischa",
 *     de4f: "Kim",
 *   },
 * );
 * ```
 */
export declare function mapValues<T, O, K extends string>(
  record: Readonly<Record<K, T>>,
  transformer: (value: T, key: K) => O,
): Record<K, O>;
/**
 * Applies the given transformer to all values in the given record and returns a
 * new record containing the resulting keys associated to the last value that
 * produced them.
 *
 * @typeParam T The type of the values in the input record.
 * @typeParam O The type of the values in the output record.
 * @typeParam K The type of the keys in the input and output records.
 *
 * @param record The record to map values from.
 * @param transformer The function to transform each value.
 *
 * @returns A new record with all values transformed by the given transformer.
 *
 * @example Basic usage
 * ```ts
 * import { mapValues } from "map-values.ts";
 * import { assertEquals } from "../assert/mod.ts";
 *
 * const usersById = {
 *   "a5ec": { name: "Mischa" },
 *   "de4f": { name: "Kim" },
 * };
 * const namesById = mapValues(usersById, (user) => user.name);
 *
 * assertEquals(
 *   namesById,
 *   {
 *     "a5ec": "Mischa",
 *     "de4f": "Kim",
 *   },
 * );
 * ```
 */
export declare function mapValues<T, O, K extends string>(
  record: Readonly<Partial<Record<K, T>>>,
  transformer: (value: T, key: K) => O,
): Partial<Record<K, O>>;
