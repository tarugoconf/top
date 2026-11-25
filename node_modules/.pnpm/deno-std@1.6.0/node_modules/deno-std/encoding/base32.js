// Copyright 2018-2026 the Deno authors. MIT license.
// Copyright (c) 2014 Jameson Little. MIT License.
// This module is browser compatible.
/**
 * Utilities for
 * {@link https://www.rfc-editor.org/rfc/rfc4648.html#section-6 | base32}
 * encoding and decoding.
 *
 * Modified from {@link https://github.com/beatgammit/base64-js}.
 *
 * ```ts
 * import { encodeBase32, decodeBase32 } from "base32.ts";
 * import { assertEquals } from "../assert/mod.ts";
 *
 * assertEquals(encodeBase32("foobar"), "MZXW6YTBOI======");
 *
 * assertEquals(
 *   decodeBase32("MZXW6YTBOI======"),
 *   new TextEncoder().encode("foobar")
 * );
 * ```
 *
 * @module
 */
import { calcSizeBase32, decode, encode } from "./_common32.js";
import { detach } from "./_common-detach.js";
const padding = "=".charCodeAt(0);
const alphabet = new TextEncoder()
  .encode("ABCDEFGHIJKLMNOPQRSTUVWXYZ234567");
const rAlphabet = new Uint8Array(128).fill(32); //alphabet.length
alphabet.forEach((byte, i) => rAlphabet[byte] = i);
/**
 * Converts data into a base32-encoded string.
 *
 * @see {@link https://www.rfc-editor.org/rfc/rfc4648.html#section-6}
 *
 * @param data The data to encode.
 * @returns The base32-encoded string.
 *
 * @example Usage
 * ```ts
 * import { encodeBase32 } from "base32.ts";
 * import { assertEquals } from "../assert/mod.ts";
 *
 * assertEquals(encodeBase32("6c60c0"), "GZRTMMDDGA======");
 * ```
 */
export function encodeBase32(data) {
  if (typeof data === "string") {
    data = new TextEncoder().encode(data);
  } else if (data instanceof ArrayBuffer) {
    data = new Uint8Array(data).slice();
  } else {
    data = data.slice();
  }
  const [output, i] = detach(data, calcSizeBase32(data.length));
  encode(output, i, 0, alphabet, padding);
  return new TextDecoder().decode(output);
}
/**
 * Decodes a base32-encoded string.
 *
 * @see {@link https://www.rfc-editor.org/rfc/rfc4648.html#section-6}
 *
 * @param b32 The base32-encoded string to decode.
 * @returns The decoded data.
 *
 * @example Usage
 * ```ts
 * import { decodeBase32 } from "base32.ts";
 * import { assertEquals } from "../assert/mod.ts";
 *
 * assertEquals(
 *   decodeBase32("GZRTMMDDGA======"),
 *   new TextEncoder().encode("6c60c0"),
 * );
 * ```
 */
export function decodeBase32(b32) {
  const output = new TextEncoder().encode(b32);
  if (output.length % 8) {
    throw new TypeError(
      `Invalid base32 string: length (${output.length}) must be a multiple of 8`,
    );
  }
  // deno-lint-ignore no-explicit-any
  return new Uint8Array(output.buffer
    .transfer(decode(output, 0, 0, rAlphabet, padding)));
}
