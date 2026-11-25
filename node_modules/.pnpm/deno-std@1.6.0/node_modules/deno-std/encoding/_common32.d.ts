import type { Uint8Array_ } from "./_types.ts";
export type { Uint8Array_ };
export declare const padding: number;
export declare const alphabet: Record<Base32Alphabet, Uint8Array>;
export declare const rAlphabet: Record<Base32Alphabet, Uint8Array>;
/**
 * Options for encoding and decoding base32 strings.
 */
export interface Base32Options {
  /** The base32 alphabet. Defaults to "base32" */
  alphabet?: Base32Alphabet;
}
/**
 * The base32 alphabets.
 */
export type Base32Alphabet = "base32" | "base32hex" | "base32crockford";
/**
 * Calculate the output size needed to encode a given input size for
 * {@linkcode encodeIntoBase32}.
 *
 * @param rawSize The size of the input buffer.
 * @returns The size of the output buffer.
 *
 * @example Basic Usage
 * ```ts
 * import { assertEquals } from "../assert/mod.ts";
 * import { calcSizeBase32 } from "unstable-base32.ts";
 *
 * assertEquals(calcSizeBase32(1), 8);
 * ```
 */
export declare function calcSizeBase32(rawSize: number): number;
export declare function encode(
  buffer: Uint8Array_,
  i: number,
  o: number,
  alphabet: Uint8Array,
  padding: number,
): number;
export declare function decode(
  buffer: Uint8Array_,
  i: number,
  o: number,
  alphabet: Uint8Array,
  padding: number,
): number;
