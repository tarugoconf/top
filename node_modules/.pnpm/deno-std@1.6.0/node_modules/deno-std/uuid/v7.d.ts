/**
 * Determines whether a string is a valid
 * {@link https://www.rfc-editor.org/rfc/rfc9562.html#section-5.7 | UUIDv7}.
 *
 * @param id UUID value.
 *
 * @returns `true` if the string is a valid UUIDv7, otherwise `false`.
 *
 * @example Usage
 * ```ts
 * import { validate } from "v7.ts";
 * import { assert, assertFalse } from "../assert/mod.ts";
 *
 * assert(validate("017f22e2-79b0-7cc3-98c4-dc0c0c07398f"));
 * assertFalse(validate("fac8c1e0-ad1a-4204-a0d0-8126ae84495d"));
 * ```
 */
export declare function validate(id: string): boolean;
/**
 * Generates a {@link https://www.rfc-editor.org/rfc/rfc9562.html#section-5.7 | UUIDv7}.
 *
 * All bits after the 48-bit timestamp are random, so UUIDs generated within
 * the same millisecond do not sort in generation order: this implementation
 * uses none of the optional monotonicity methods of
 * {@link https://www.rfc-editor.org/rfc/rfc9562.html#section-6.2 | RFC 9562 section 6.2}.
 *
 * @throws {RangeError} If the timestamp is not an integer between 0 and
 * 2**48 - 1, the maximum value representable in the UUIDv7 timestamp field.
 *
 * @param timestamp Unix Epoch timestamp in milliseconds.
 *
 * @returns Returns a UUIDv7 string
 *
 * @example Usage
 * ```ts
 * import { generate, validate } from "v7.ts";
 * import { assert } from "../assert/mod.ts";
 *
 * const uuid = generate();
 * assert(validate(uuid));
 * ```
 */
export declare function generate(timestamp?: number): string;
/**
 * Extracts the timestamp from a UUIDv7.
 *
 * @param uuid UUIDv7 string to extract the timestamp from.
 * @returns Returns the timestamp in milliseconds.
 *
 * @throws {TypeError} If the UUID is not a valid UUIDv7.
 *
 * @example Usage
 * ```ts
 * import { extractTimestamp } from "v7.ts";
 * import { assertEquals } from "../assert/mod.ts";
 *
 * const uuid = "017f22e2-79b0-7cc3-98c4-dc0c0c07398f";
 * const timestamp = extractTimestamp(uuid);
 * assertEquals(timestamp, 1645557742000);
 * ```
 */
export declare function extractTimestamp(uuid: string): number;
