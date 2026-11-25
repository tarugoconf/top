/**
 * Determines whether a string is a valid
 * {@link https://www.rfc-editor.org/rfc/rfc9562.html#section-5.3 | UUIDv3}.
 *
 * @param id UUID value.
 *
 * @returns `true` if the string is a valid UUIDv3, otherwise `false`.
 *
 * @example Usage
 * ```ts
 * import { validate } from "v3.ts";
 * import { assert, assertFalse } from "../assert/mod.ts";
 *
 * assert(validate("22fe6191-c161-3d86-a432-a81f343eda08"));
 * assertFalse(validate("this-is-not-a-uuid"));
 * ```
 */
export declare function validate(id: string): boolean;
/**
 * Generates a
 * {@link https://www.rfc-editor.org/rfc/rfc9562.html#section-5.3 | UUIDv3}.
 *
 * @param namespace The namespace to use, encoded as a UUID.
 * @param data The data to hash to calculate the MD5 digest for the UUID.
 *
 * @returns A UUIDv3 string.
 *
 * @throws {TypeError} If the namespace is not a valid UUID.
 *
 * @example Usage
 * ```ts
 * import { NAMESPACE_URL } from "constants.ts";
 * import { generate, validate } from "v3.ts";
 * import { assert } from "../assert/mod.ts";
 *
 * const data = new TextEncoder().encode("python.org");
 * const uuid = await generate(NAMESPACE_URL, data);
 *
 * assert(validate(uuid));
 * ```
 */
export declare function generate(
  namespace: string,
  data: Uint8Array,
): Promise<string>;
