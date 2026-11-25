import type { Range } from "./types.ts";
/**
 * Does a deep check on the object to determine if its a valid range.
 *
 * Objects with extra fields are still considered valid if they have at
 * least the correct fields.
 *
 * Adds a type assertion if true.
 *
 * @example Usage
 * ```ts
 * import { isRange } from "is-range.ts";
 * import { assert } from "../assert/mod.ts";
 *
 * const range = [[{ major: 1, minor: 2, patch: 3 }]];
 * assert(isRange(range));
 * assert(!isRange({}));
 * ```
 * @param value The value to check if its a valid Range
 * @returns True if its a valid Range otherwise false.
 */
export declare function isRange(value: unknown): value is Range;
