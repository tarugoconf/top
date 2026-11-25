/**
 * Determines whether the UUID is the
 * {@link https://www.rfc-editor.org/rfc/rfc4122#section-4.1.7 | nil UUID}.
 *
 * @param id UUID value.
 *
 * @returns `true` if the UUID is the nil UUID, otherwise `false`.
 *
 * @example Usage
 * ```ts
 * import { isNil } from "mod.ts";
 * import { assert, assertFalse } from "../assert/mod.ts";
 *
 * assert(isNil("00000000-0000-0000-0000-000000000000"));
 * assertFalse(isNil(crypto.randomUUID()));
 * ```
 */
export declare function isNil(id: string): boolean;
/**
 * Determines whether a string is a valid UUID.
 *
 * @param uuid UUID value.
 *
 * @returns `true` if the string is a valid UUID, otherwise `false`.
 *
 * @example Usage
 * ```ts
 * import { validate } from "mod.ts";
 * import { assert, assertFalse } from "../assert/mod.ts";
 *
 * assert(validate("6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b"));
 * assertFalse(validate("not a UUID"));
 * ```
 */
export declare function validate(uuid: string): boolean;
/**
 * Detect RFC version of a UUID.
 *
 * @param uuid UUID value.
 *
 * @returns The RFC version of the UUID.
 *
 * @example Usage
 * ```ts
 * import { version } from "mod.ts";
 * import { assertEquals } from "../assert/mod.ts";
 *
 * assertEquals(version("d9428888-122b-11e1-b85c-61cd3cbb3210"), 1);
 * assertEquals(version("6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b"), 4);
 * ```
 */
export declare function version(uuid: string): number;
