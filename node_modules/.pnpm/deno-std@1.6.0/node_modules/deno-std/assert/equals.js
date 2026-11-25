// Copyright 2018-2026 the Deno authors. MIT license.
// This module is browser compatible.
import { equal } from "./equal.js";
import { buildMessage } from "../internal/build-message.js";
import { diff } from "../internal/diff.js";
import { diffStr } from "../internal/diff-str.js";
import { format } from "../internal/format.js";
import { AssertionError } from "./assertion-error.js";
/**
 * Make an assertion that `actual` and `expected` are equal, deeply. If not
 * deeply equal, then throw.
 *
 * Type parameter can be specified to ensure values under comparison have the
 * same type.
 *
 * Note: This function is based on value equality, but for some cases (such as
 * data that can only be read asynchronously or function properties) value
 * equality is not possible to determine. In such cases, reference equality is
 * used instead, which may cause false negatives for objects such as `Blob`s or
 * `Request`s.
 *
 * @example Usage
 * ```ts ignore
 * import { assertEquals } from "mod.ts";
 *
 * assertEquals("world", "world"); // Doesn't throw
 * assertEquals("hello", "world"); // Throws
 * ```
 * @example Compare `Blob` objects
 * ```ts
 * import { assertEquals } from "mod.ts";
 *
 * const bytes1 = await new Blob(["foo"]).bytes();
 * const bytes2 = await new Blob(["foo"]).bytes();
 *
 * assertEquals(bytes1, bytes2);
 * ```
 *
 * @typeParam T The type of the values to compare. This is usually inferred.
 * @param actual The actual value to compare.
 * @param expected The expected value to compare.
 * @param msg The optional message to display if the assertion fails.
 */
export function assertEquals(actual, expected, msg) {
  if (equal(actual, expected)) {
    return;
  }
  const msgSuffix = msg ? `: ${msg}` : ".";
  let message = `Values are not equal${msgSuffix}`;
  const actualString = format(actual);
  const expectedString = format(expected);
  const stringDiff = (typeof actual === "string") &&
    (typeof expected === "string");
  const diffResult = stringDiff
    ? diffStr(actual, expected)
    : diff(actualString.split("\n"), expectedString.split("\n"));
  const diffMsg = buildMessage(diffResult, { stringDiff }, arguments[3])
    .join("\n");
  message = `${message}\n${diffMsg}`;
  throw new AssertionError(message);
}
