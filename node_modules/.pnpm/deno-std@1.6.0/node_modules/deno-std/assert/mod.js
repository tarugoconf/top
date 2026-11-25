// Copyright 2018-2026 the Deno authors. MIT license.
// This module is browser compatible.
/** A library of assertion functions.
 * If the assertion is false an `AssertionError` will be thrown which will
 * result in pretty-printed diff of the failing assertion.
 *
 * This module is browser compatible, but do not rely on good formatting of
 * values for AssertionError messages in browsers.
 *
 * ```ts ignore
 * import { assert } from "mod.ts";
 *
 * assert("I am truthy"); // Doesn't throw
 * assert(false); // Throws `AssertionError`
 * ```
 *
 * @module
 */
export * from "./almost-equals.js";
export * from "./array-includes.js";
export * from "./equals.js";
export * from "./exists.js";
export * from "./false.js";
export * from "./greater-or-equal.js";
export * from "./greater.js";
export * from "./instance-of.js";
export * from "./is-error.js";
export * from "./less-or-equal.js";
export * from "./less.js";
export * from "./match.js";
export * from "./not-equals.js";
export * from "./not-instance-of.js";
export * from "./not-match.js";
export * from "./not-strict-equals.js";
export * from "./object-match.js";
export * from "./rejects.js";
export * from "./strict-equals.js";
export * from "./string-includes.js";
export * from "./throws.js";
export * from "./assert.js";
export * from "./assertion-error.js";
export * from "./equal.js";
export * from "./fail.js";
export * from "./unimplemented.js";
export * from "./unreachable.js";
