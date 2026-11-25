// Copyright 2018-2026 the Deno authors. MIT license.
// This module is browser compatible.
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
export function interleave(...iterables) {
  const arrayCount = iterables.length;
  if (arrayCount === 0) {
    return [];
  }
  const arrays = iterables.map((it) => Array.isArray(it) ? it : Array.from(it));
  let maxLength = 0;
  let totalLength = 0;
  for (let i = 0; i < arrayCount; ++i) {
    const len = arrays[i].length;
    totalLength += len;
    if (len > maxLength) {
      maxLength = len;
    }
  }
  const result = new Array(totalLength);
  // Fast path for two arrays
  if (arrayCount === 2) {
    const a = arrays[0];
    const b = arrays[1];
    const minLen = Math.min(a.length, b.length);
    let k = 0;
    for (let i = 0; i < minLen; ++i) {
      result[k++] = a[i];
      result[k++] = b[i];
    }
    for (let i = minLen; i < a.length; ++i) {
      result[k++] = a[i];
    }
    for (let i = minLen; i < b.length; ++i) {
      result[k++] = b[i];
    }
    return result;
  }
  let k = 0;
  for (let i = 0; i < maxLength; ++i) {
    for (let j = 0; j < arrayCount; ++j) {
      if (i < arrays[j].length) {
        result[k++] = arrays[j][i];
      }
    }
  }
  return result;
}
