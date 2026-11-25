// Copyright 2018-2026 the Deno authors. MIT license.
// This module is browser compatible.
import { format } from "../internal/format.js";
import { AssertionError } from "./assertion-error.js";
/**
 * Make an assertion that `actual` is less than `expected`.
 * If not then throw.
 *
 * @example Usage
 * ```ts ignore
 * import { assertLess } from "mod.ts";
 *
 * assertLess(1, 2); // Doesn't throw
 * assertLess(2, 1); // Throws
 * ```
 *
 * @typeParam T The type of the values to compare.
 * @param actual The actual value to compare.
 * @param expected The expected value to compare.
 * @param msg The optional message to display if the assertion fails.
 */
export function assertLess(actual, expected, msg) {
  if (actual < expected) {
    return;
  }
  const actualString = format(actual);
  const expectedString = format(expected);
  throw new AssertionError(msg ?? `Expect ${actualString} < ${expectedString}`);
}
