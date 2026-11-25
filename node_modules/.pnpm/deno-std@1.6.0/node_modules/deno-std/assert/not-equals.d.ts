/**
 * Make an assertion that `actual` and `expected` are not equal, deeply.
 * If not then throw.
 *
 * Type parameter can be specified to ensure values under comparison have the same type.
 *
 * Note: This function is based on value equality, but for some cases (such as
 * data that can only be read asynchronously or function properties) value
 * equality is not possible to determine. In such cases, reference equality is
 * used instead, which may cause false negatives for objects such as `Blob`s or
 * `Request`s.
 *
 * @example Usage
 * ```ts ignore
 * import { assertNotEquals } from "mod.ts";
 *
 * assertNotEquals(1, 2); // Doesn't throw
 * assertNotEquals(1, 1); // Throws
 * ```
 *
 * @typeParam T The type of the values to compare.
 * @param actual The actual value to compare.
 * @param expected The expected value to compare.
 * @param msg The optional message to display if the assertion fails.
 */
export declare function assertNotEquals<T>(
  actual: T,
  expected: T,
  msg?: string,
): void;
