// Copyright 2018-2026 the Deno authors. MIT license.
// This module is browser compatible.
import { equal } from "./equal.js";
import { format } from "../internal/format.js";
import { AssertionError } from "./assertion-error.js";
function isPrimitive(value) {
  return value === null ||
    typeof value !== "object" && typeof value !== "function";
}
/**
 * Asserts that `actual` contains all values in `expected`, using deep equality
 * for non-primitive values.
 *
 * @example Usage with primitives
 * ```ts ignore
 * import { assertArrayIncludes } from "mod.ts";
 *
 * assertArrayIncludes([1, 2, 3], [2, 3]); // Passes
 * assertArrayIncludes([1, 2, 3], [4]); // Throws
 * ```
 *
 * @example Usage with objects (deep equality)
 * ```ts
 * import { assertArrayIncludes } from "mod.ts";
 *
 * assertArrayIncludes([{ a: 1 }, { b: 2 }], [{ a: 1 }]); // Passes
 * ```
 *
 * @typeParam T The element type of the arrays.
 * @param actual The array-like object to search within.
 * @param expected The values that must be present in `actual`.
 * @param msg Optional message to display on failure.
 * @throws {AssertionError} If any value in `expected` is not found in `actual`.
 */
export function assertArrayIncludes(actual, expected, msg) {
  const missing = [];
  const expectedLen = expected.length;
  const actualLen = actual.length;
  for (let i = 0; i < expectedLen; i++) {
    const item = expected[i];
    let found;
    if (isPrimitive(item)) {
      // Fast path
      found = Array.prototype.includes.call(actual, item);
    } else {
      found = false;
      for (let j = 0; j < actualLen; j++) {
        if (equal(item, actual[j])) {
          found = true;
          break;
        }
      }
    }
    if (!found) {
      missing.push(item);
    }
  }
  if (missing.length === 0) {
    return;
  }
  const msgSuffix = msg ? `: ${msg}` : ".";
  msg = `Expected actual: "${format(actual)}" to include: "${
    format(expected)
  }"${msgSuffix}\nmissing: ${format(missing)}`;
  throw new AssertionError(msg);
}
