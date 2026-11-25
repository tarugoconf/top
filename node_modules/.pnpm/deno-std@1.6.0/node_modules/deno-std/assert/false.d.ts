/** Assertion condition for {@linkcode assertFalse}. */
export type Falsy = false | 0 | 0n | "" | null | undefined;
/**
 * Make an assertion, an error will be thrown if `expr` has a truthy value.
 *
 * @example Usage
 * ```ts ignore
 * import { assertFalse } from "mod.ts";
 *
 * assertFalse(false); // Doesn't throw
 * assertFalse(true); // Throws
 * ```
 *
 * @param expr The expression to test.
 * @param msg The optional message to display if the assertion fails.
 * @throws {AssertionError} If `expr` is truthy.
 */
export declare function assertFalse(
  expr: unknown,
  msg?: string,
): asserts expr is Falsy;
