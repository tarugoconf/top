/**
 * Returns a tuple of two records with the first one containing all entries of
 * the given record that match the given predicate and the second one containing
 * all that do not.
 *
 * @typeParam T The type of the values in the record.
 *
 * @param record The record to partition.
 * @param predicate The predicate function to determine which entries go where.
 *
 * @returns A tuple containing two records, the first one containing all entries
 * that match the predicate and the second one containing all that do not.
 *
 * @example Basic usage
 * ```ts
 * import { partitionEntries } from "partition-entries.ts";
 * import { assertEquals } from "../assert/mod.ts";
 *
 * const menu = {
 *   Salad: 11,
 *   Soup: 8,
 *   Pasta: 13,
 * };
 * const myOptions = partitionEntries(
 *   menu,
 *   ([item, price]) => item !== "Pasta" && price < 10,
 * );
 *
 * assertEquals(
 *   myOptions,
 *   [
 *     { Soup: 8 },
 *     { Salad: 11, Pasta: 13 },
 *   ],
 * );
 * ```
 */
export declare function partitionEntries<T>(
  record: Readonly<Record<string, T>>,
  predicate: (entry: [string, T]) => boolean,
): [match: Record<string, T>, rest: Record<string, T>];
