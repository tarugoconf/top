import type { Uint8Array_ } from "./_types.ts";
export type { Uint8Array_ };
export declare const padding: number;
export declare const alphabet: Record<Base64Alphabet, Uint8Array>;
export declare const rAlphabet: Record<Base64Alphabet, Uint8Array>;
/**
 * Options for encoding and decoding base64 strings.
 */
export interface Base64Options {
  /** The base64 alphabet. Defaults to "base64" */
  alphabet?: Base64Alphabet;
}
/**
 * The base64 alphabets.
 */
export type Base64Alphabet = "base64" | "base64url";
/**
 * Calculate the output size needed to encode a given input size for
 * {@linkcode encodeIntoBase64}.
 *
 * @param originalSize The size of the input buffer.
 * @returns The size of the output buffer.
 *
 * @example Basic Usage
 * ```ts
 * import { assertEquals } from "../assert/mod.ts";
 * import { calcSizeBase64 } from "unstable-base64.ts";
 *
 * assertEquals(calcSizeBase64(1), 4);
 * ```
 */
export declare function calcSizeBase64(originalSize: number): number;
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
