/**
 * Helper functions for working with
 * {@linkcode https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array | Uint8Array}
 * byte slices.
 *
 * ```ts
 * import { concat, indexOfNeedle, endsWith } from "mod.ts";
 * import { assertEquals } from "../assert/mod.ts";
 *
 * const a = new Uint8Array([0, 1, 2]);
 * const b = new Uint8Array([3, 4, 5]);
 *
 * const c = concat([a, b]);
 *
 * assertEquals(c, new Uint8Array([0, 1, 2, 3, 4, 5]));
 *
 * assertEquals(indexOfNeedle(c, new Uint8Array([2, 3])), 2);
 *
 * assertEquals(endsWith(c, b), true);
 * ```
 *
 * @module
 */
export * from "./concat.ts";
export * from "./copy.ts";
export * from "./ends-with.ts";
export * from "./equals.ts";
export * from "./includes-needle.ts";
export * from "./index-of-needle.ts";
export * from "./last-index-of-needle.ts";
export * from "./repeat.ts";
export * from "./starts-with.ts";
