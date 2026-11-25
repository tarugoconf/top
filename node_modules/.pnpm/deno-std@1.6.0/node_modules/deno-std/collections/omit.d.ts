/**
 * Creates a new object by excluding the specified keys from the provided object.
 *
 * @typeParam T The type of the object.
 * @typeParam K The type of the keys to omit.
 *
 * @param obj The object to omit keys from.
 * @param keys The keys to omit from the object.
 *
 * @returns A new object with the specified keys omitted.
 *
 * @example Basic usage
 * ```ts
 * import { omit } from "omit.ts";
 * import { assertEquals } from "../assert/mod.ts";
 *
 * const obj = { a: 5, b: 6, c: 7, d: 8 };
 * const omitted = omit(obj, ["a", "c"]);
 *
 * assertEquals(omitted, { b: 6, d: 8 });
 * ```
 */
export declare function omit<T extends object, K extends keyof T>(
  obj: Readonly<T>,
  keys: readonly K[],
): Omit<T, K>;
