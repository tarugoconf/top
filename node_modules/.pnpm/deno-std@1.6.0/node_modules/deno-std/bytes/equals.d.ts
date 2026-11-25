/**
 * Check whether byte slices are equal to each other.
 *
 * @param a First array to check equality.
 * @param b Second array to check equality.
 * @returns `true` if the arrays are equal, `false` otherwise.
 *
 * @example Basic usage
 * ```ts
 * import { equals } from "equals.ts";
 * import { assertEquals } from "../assert/mod.ts";
 *
 * const a = new Uint8Array([1, 2, 3]);
 * const b = new Uint8Array([1, 2, 3]);
 * const c = new Uint8Array([4, 5, 6]);
 *
 * assertEquals(equals(a, b), true);
 * assertEquals(equals(a, c), false);
 * ```
 */
export declare function equals(a: Uint8Array, b: Uint8Array): boolean;
