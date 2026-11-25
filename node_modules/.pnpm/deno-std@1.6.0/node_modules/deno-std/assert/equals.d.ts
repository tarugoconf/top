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
export declare function assertEquals<T>(
  actual: T,
  expected: T,
  msg?: string,
): void;
