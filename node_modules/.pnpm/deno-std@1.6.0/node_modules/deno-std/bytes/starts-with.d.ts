/**
 * Returns `true` if the prefix array appears at the start of the source array,
 * `false` otherwise.
 *
 * The complexity of this function is `O(prefix.length)`.
 *
 * @param source Source array to check.
 * @param prefix Prefix array to check for.
 * @returns `true` if the prefix array appears at the start of the source array,
 * `false` otherwise.
 *
 * @example Basic usage
 * ```ts
 * import { startsWith } from "starts-with.ts";
 * import { assertEquals } from "../assert/mod.ts";
 *
 * const source = new Uint8Array([0, 1, 2, 1, 2, 1, 2, 3]);
 * const prefix = new Uint8Array([0, 1, 2]);
 *
 * assertEquals(startsWith(source, prefix), true);
 * ```
 */
export declare function startsWith(
  source: Uint8Array,
  prefix: Uint8Array,
): boolean;
