/**
 * Determines whether a string is a valid
 * {@link https://www.rfc-editor.org/rfc/rfc9562.html#section-5.1 | UUIDv1}.
 *
 * @param id UUID value.
 *
 * @returns `true` if the string is a valid UUIDv1, otherwise `false`.
 *
 * @example Usage
 * ```ts
 * import { validate } from "v1.ts";
 * import { assert, assertFalse } from "../assert/mod.ts";
 *
 * assert(validate("ea71fc60-a713-11ee-af61-8349da24f689"));
 * assertFalse(validate("fac8c1e0-ad1a-4204-a0d0-8126ae84495d"));
 * ```
 */
export declare function validate(id: string): boolean;
/** Options for {@linkcode generate}. */
export interface GenerateOptions {
  /**
   * An array of 6 bytes that represents a 48-bit IEEE 802 MAC address.
   *
   * @see {@link https://www.rfc-editor.org/rfc/rfc4122#section-4.1.6}
   */
  node?: number[];
  /**
   * A 14-bit value used to avoid duplicates that could arise when the clock is
   * set backwards in time or if the node ID changes (0 - 16383).
   *
   * @see {@link https://www.rfc-editor.org/rfc/rfc4122#section-4.1.5}
   */
  clockseq?: number;
  /**
   * The number of milliseconds since the Unix epoch (January 1, 1970).
   *
   * @see {@link https://www.rfc-editor.org/rfc/rfc4122#section-4.1.4}
   */
  msecs?: number;
  /**
   * The number of nanoseconds to add to {@linkcode GenerateOptions.msecs}
   * (0 - 10,000).
   *
   * @see {@link https://www.rfc-editor.org/rfc/rfc4122#section-4.1.4}
   */
  nsecs?: number;
  /** An array of 16 random bytes (0 - 255). */
  random?: number[];
  /**
   * A function that returns an array of 16 random bytes (0 - 255).
   * Alternative to {@linkcode GenerateOptions.random}.
   */
  rng?: () => number[];
}
/**
 * Generates a
 * {@link https://www.rfc-editor.org/rfc/rfc9562.html#section-5.1 | UUIDv1}.
 *
 * @param options Can use RFC time sequence values as overwrites.
 *
 * @returns Returns a UUIDv1 string.
 *
 * @example Usage
 * ```ts
 * import { generate, validate } from "v1.ts";
 * import { assert } from "../assert/mod.ts";
 *
 * const options = {
 *   node: [0x01, 0x23, 0x45, 0x67, 0x89, 0xab],
 *   clockseq: 0x1234,
 *   msecs: new Date("2011-11-01").getTime(),
 *   nsecs: 5678,
 * };
 *
 * const uuid = generate(options);
 * assert(validate(uuid));
 * ```
 */
export declare function generate(options?: GenerateOptions): string;
