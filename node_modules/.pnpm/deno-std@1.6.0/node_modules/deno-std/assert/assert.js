// Copyright 2018-2026 the Deno authors. MIT license.
// This module is browser compatible.
import { AssertionError } from "./assertion-error.js";
/**
 * Make an assertion, an error will be thrown if `expr` does not have a truthy value.
 *
 * @example Usage
 * ```ts ignore
 * import { assert } from "mod.ts";
 *
 * assert("hello".includes("ello")); // Doesn't throw
 * assert("hello".includes("world")); // Throws
 * ```
 *
 * @param expr The expression to test.
 * @param msg The optional message to display if the assertion fails.
 * @throws {AssertionError} If `expr` is falsy.
 */
export function assert(expr, msg = "") {
  if (!expr) {
    throw new AssertionError(msg);
  }
}
