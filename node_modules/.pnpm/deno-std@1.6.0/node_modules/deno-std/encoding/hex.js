// Copyright 2009 The Go Authors. All rights reserved.
// https://github.com/golang/go/blob/master/LICENSE
// Copyright 2018-2026 the Deno authors. MIT license.
// This module is browser compatible.
/**
 * Port of the Go
 * {@link https://github.com/golang/go/blob/go1.12.5/src/encoding/hex/hex.go | encoding/hex}
 * library.
 *
 * ```ts
 * import {
 *   decodeHex,
 *   encodeHex,
 * } from "hex.ts";
 * import { assertEquals } from "../assert/mod.ts";
 *
 * assertEquals(encodeHex("abc"), "616263");
 *
 * assertEquals(
 *   decodeHex("616263"),
 *   new TextEncoder().encode("abc"),
 * );
 * ```
 *
 * @module
 */
import { calcSizeHex, decode, encode } from "./_common16.js";
import { detach } from "./_common-detach.js";
const alphabet = new TextEncoder()
  .encode("0123456789abcdef");
const rAlphabet = new Uint8Array(128).fill(16); // alphabet.length
alphabet.forEach((byte, i) => rAlphabet[byte] = i);
new TextEncoder()
  .encode("ABCDEF")
  .forEach((byte, i) => rAlphabet[byte] = i + 10);
/**
 * Converts data into a hex-encoded string.
 *
 * @param src The data to encode.
 *
 * @returns The hex-encoded string.
 *
 * @example Usage
 * ```ts
 * import { encodeHex } from "hex.ts";
 * import { assertEquals } from "../assert/mod.ts";
 *
 * assertEquals(encodeHex("abc"), "616263");
 * ```
 */
export function encodeHex(src) {
  if (typeof src === "string") {
    src = new TextEncoder().encode(src);
  } else if (src instanceof ArrayBuffer) {
    src = new Uint8Array(src).slice();
  } else {
    src = src.slice();
  }
  const [output, i] = detach(src, calcSizeHex(src.length));
  encode(output, i, 0, alphabet);
  return new TextDecoder().decode(output);
}
/**
 * Decodes the given hex-encoded string. If the input is malformed, an error is
 * thrown.
 *
 * @param src The hex-encoded string to decode.
 *
 * @returns The decoded data.
 *
 * @example Usage
 * ```ts
 * import { decodeHex } from "hex.ts";
 * import { assertEquals } from "../assert/mod.ts";
 *
 * assertEquals(
 *   decodeHex("616263"),
 *   new TextEncoder().encode("abc"),
 * );
 * ```
 */
export function decodeHex(src) {
  const output = new TextEncoder().encode(src);
  // deno-lint-ignore no-explicit-any
  return new Uint8Array(output.buffer
    .transfer(decode(output, 0, 0, rAlphabet)));
}
