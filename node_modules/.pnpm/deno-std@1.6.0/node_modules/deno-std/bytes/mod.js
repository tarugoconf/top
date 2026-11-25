// Copyright 2018-2026 the Deno authors. MIT license.
// This module is browser compatible.
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
export * from "./concat.js";
export * from "./copy.js";
export * from "./ends-with.js";
export * from "./equals.js";
export * from "./includes-needle.js";
export * from "./index-of-needle.js";
export * from "./last-index-of-needle.js";
export * from "./repeat.js";
export * from "./starts-with.js";
