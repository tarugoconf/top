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
export * from "./almost-equals.ts";
export * from "./array-includes.ts";
export * from "./equals.ts";
export * from "./exists.ts";
export * from "./false.ts";
export * from "./greater-or-equal.ts";
export * from "./greater.ts";
export * from "./instance-of.ts";
export * from "./is-error.ts";
export * from "./less-or-equal.ts";
export * from "./less.ts";
export * from "./match.ts";
export * from "./not-equals.ts";
export * from "./not-instance-of.ts";
export * from "./not-match.ts";
export * from "./not-strict-equals.ts";
export * from "./object-match.ts";
export * from "./rejects.ts";
export * from "./strict-equals.ts";
export * from "./string-includes.ts";
export * from "./throws.ts";
export * from "./assert.ts";
export * from "./assertion-error.ts";
export * from "./equal.ts";
export * from "./fail.ts";
export * from "./unimplemented.ts";
export * from "./unreachable.ts";
