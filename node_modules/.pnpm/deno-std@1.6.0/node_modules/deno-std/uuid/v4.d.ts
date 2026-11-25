/**
 * Determines whether a string is a valid
 * {@link https://www.rfc-editor.org/rfc/rfc9562.html#section-5.4 | UUIDv4}.
 *
 * @param id UUID value.
 *
 * @returns `true` if the UUID is valid UUIDv4, otherwise `false`.
 *
 * @example Usage
 * ```ts
 * import { validate } from "v4.ts";
 * import { assert, assertFalse } from "../assert/mod.ts";
 *
 * assert(validate(crypto.randomUUID()));
 * assertFalse(validate("this-is-not-a-uuid"));
 * ```
 */
export declare function validate(
  id: string,
): id is ReturnType<typeof crypto.randomUUID>;
