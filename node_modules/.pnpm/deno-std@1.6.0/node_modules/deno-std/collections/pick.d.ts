/**
 * Creates a new object by including the specified keys from the provided
 * object.
 *
 * @typeParam T The type of the object.
 * @typeParam K The type of the keys.
 *
 * @param obj The object to pick keys from.
 * @param keys The keys to include in the new object.
 *
 * @returns A new object with the specified keys from the provided object.
 *
 * @example Basic usage
 * ```ts
 * import { pick } from "pick.ts";
 * import { assertEquals } from "../assert/mod.ts";
 *
 * const obj = { a: 5, b: 6, c: 7, d: 8 };
 * const picked = pick(obj, ["a", "c"]);
 *
 * assertEquals(picked, { a: 5, c: 7 });
 * ```
 */
export declare function pick<T extends object, const K extends keyof T>(
  obj: Readonly<T>,
  keys: readonly K[],
): Pick<T, K>;
