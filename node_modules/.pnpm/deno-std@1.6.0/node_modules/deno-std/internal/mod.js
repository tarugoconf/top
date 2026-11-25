// Copyright 2018-2026 the Deno authors. MIT license.
// This module is browser compatible.
/**
 * Internal utilities for the public API of the Deno Standard Library.
 *
 * Note: this module is for internal use only and should not be used directly.
 *
 * ```ts
 * import { diff, diffStr, buildMessage } from "mod.ts";
 * import { assertEquals } from "../assert/mod.ts";
 *
 * const a = [1, 2, 3];
 * const b = [1, 2, 4];
 *
 * assertEquals(diff(a, b), [
 *   { type: "common", value: 1 },
 *   { type: "common", value: 2 },
 *   { type: "removed", value: 3 },
 *   { type: "added", value: 4 },
 * ]);
 *
 * const diffResult = diffStr("Hello, world!", "Hello, world");
 *
 * console.log(buildMessage(diffResult));
 * // [
 * //   "",
 * //   "",
 * //   "    [Diff] Actual / Expected",
 * //   "",
 * //   "",
 * //   "-   Hello, world!",
 * //   "+   Hello, world",
 * //   "",
 * // ]
 * ```
 *
 * @module
 */
export * from "./assertion-state.js";
export * from "./build-message.js";
export * from "./diff.js";
export * from "./diff-str.js";
export * from "./format.js";
export * from "./os.js";
export * from "./styles.js";
export * from "./truncate-build-message.js";
export * from "./types.js";
