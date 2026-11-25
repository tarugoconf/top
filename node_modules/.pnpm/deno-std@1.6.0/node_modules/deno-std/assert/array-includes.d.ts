/** An array-like object (`Array`, `Uint8Array`, `NodeList`, etc.) that is not a string */
export type ArrayLikeArg<T> = ArrayLike<T> & object;
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
export declare function assertArrayIncludes<T>(
  actual: ArrayLikeArg<T>,
  expected: ArrayLikeArg<T>,
  msg?: string,
): void;
