/**
 * Returns a new record with all entries of the given record except the ones
 * that do not match the given predicate.
 *
 * @typeParam T The type of the values in the input record.
 *
 * @param record The record to filter entries from.
 * @param predicate The function to test each entry for a condition.
 *
 * @returns A new record with all entries that match the given predicate.
 *
 * @example Basic usage
 * ```ts
 * import { filterEntries } from "filter-entries.ts";
 * import { assertEquals } from "../assert/mod.ts";
 *
 * const menu = {
 *   Salad: 11,
 *   Soup: 8,
 *   Pasta: 13,
 * };
 *
 * const myOptions = filterEntries(
 *   menu,
 *   ([item, price]) => item !== "Pasta" && price < 10,
 * );
 *
 * assertEquals(myOptions, { Soup: 8 });
 * ```
 */
export declare function filterEntries<T>(
  record: Readonly<Record<string, T>>,
  predicate: (entry: [string, T]) => boolean,
): Record<string, T>;
