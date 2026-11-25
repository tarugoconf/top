/**
 * Determines whether a string is a valid
 * {@link https://www.rfc-editor.org/rfc/rfc9562.html#section-5.5 | UUIDv5}.
 *
 * @param id UUID value.
 *
 * @returns `true` if the string is a valid UUIDv5, otherwise `false`.
 *
 * @example Usage
 * ```ts
 * import { validate } from "v5.ts";
 * import { assert, assertFalse } from "../assert/mod.ts";
 *
 * assert(validate("7af94e2b-4dd9-50f0-9c9a-8a48519bdef0"));
 * assertFalse(validate(crypto.randomUUID()));
 * ```
 */
export declare function validate(id: string): boolean;
/**
 * Generates a
 * {@link https://www.rfc-editor.org/rfc/rfc9562.html#section-5.5 | UUIDv5}.
 *
 * @param namespace The namespace to use, encoded as a UUID.
 * @param data The data to hash to calculate the SHA-1 digest for the UUID.
 *
 * @returns A UUIDv5 string.
 *
 * @throws {TypeError} If the namespace is not a valid UUID.
 *
 * @example Usage
 * ```ts
 * import { NAMESPACE_URL } from "constants.ts";
 * import { generate, validate } from "v5.ts";
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
