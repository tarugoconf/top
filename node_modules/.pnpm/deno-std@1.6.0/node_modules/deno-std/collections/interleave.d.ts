/**
 * Returns all elements from the given iterables in round-robin order.
 * Unlike {@linkcode zip}, which stops at the shortest iterable and returns
 * tuples, `interleave` continues until all input iterables are exhausted and
 * returns a flat array. All input iterables are consumed eagerly.
 *
 * @typeParam T The tuple of element types in the input iterables.
 *
 * @param iterables The iterables to interleave.
 * @returns A new array containing all elements from the input iterables in
 * round-robin order.
 *
 * @example Basic usage
 * ```ts
 * import { interleave } from "interleave.ts";
 * import { assertEquals } from "../assert/mod.ts";
 *
 * const numbers = [1, 2, 3];
 * const letters = ["a", "b", "c"];
 *
 * assertEquals(interleave(numbers, letters), [1, "a", 2, "b", 3, "c"]);
 * ```
 *
 * @example Unequal-length arrays
 * ```ts
 * import { interleave } from "interleave.ts";
 * import { assertEquals } from "../assert/mod.ts";
 *
 * assertEquals(
 *   interleave([1, 2, 3], ["a", "b"], [true]),
 *   [1, "a", true, 2, "b", 3],
 * );
 * ```
 *
 * @example With iterables
 * ```ts
 * import { interleave } from "interleave.ts";
 * import { assertEquals } from "../assert/mod.ts";
 *
 * assertEquals(
 *   interleave(new Set([1, 2, 3]), ["a", "b", "c"]),
 *   [1, "a", 2, "b", 3, "c"],
 * );
 * ```
 */
export declare function interleave<T extends unknown[]>(
  ...iterables: {
    [K in keyof T]: Iterable<T[K]>;
  }
): T[number][];
