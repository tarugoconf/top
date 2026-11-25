// Copyright 2018-2026 the Deno authors. MIT license.
// This module is browser compatible.
/**
 * Utilities for
 * {@link https://www.rfc-editor.org/rfc/rfc4648.html#section-5 | base64url}
 * encoding and decoding.
 *
 * @module
 */
import { calcSizeBase64, decode, encode } from "./_common64.js";
import { detach } from "./_common-detach.js";
const padding = "=".charCodeAt(0);
const alphabet = new TextEncoder()
  .encode("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_");
const rAlphabet = new Uint8Array(128).fill(64); // alphabet.length
alphabet.forEach((byte, i) => rAlphabet[byte] = i);
/**
 * Convert data into a base64url-encoded string.
 *
 * @see {@link https://www.rfc-editor.org/rfc/rfc4648.html#section-5}
 *
 * @param data The data to encode.
 * @returns The base64url-encoded string.
 *
 * @example Usage
 * ```ts
 * import { encodeBase64Url } from "base64url.ts";
 * import { assertEquals } from "../assert/mod.ts";
 *
 * assertEquals(encodeBase64Url("foobar"), "Zm9vYmFy");
 * ```
 */
export function encodeBase64Url(data) {
  if (typeof data === "string") {
    data = new TextEncoder().encode(data);
  } else if (data instanceof ArrayBuffer) {
    data = new Uint8Array(data).slice();
  } else {
    data = data.slice();
  }
  const [output, i] = detach(data, calcSizeBase64(data.length));
  let o = encode(output, i, 0, alphabet, padding);
  o = output.indexOf(padding, o - 2);
  return new TextDecoder().decode(
    // deno-lint-ignore no-explicit-any
    o > 0 ? new Uint8Array(output.buffer.transfer(o)) : output,
  );
}
/**
 * Decodes a given base64url-encoded string.
 *
 * @see {@link https://www.rfc-editor.org/rfc/rfc4648.html#section-5}
 *
 * @param b64url The base64url-encoded string to decode.
 * @returns The decoded data.
 *
 * @example Usage
 * ```ts
 * import { decodeBase64Url } from "base64url.ts";
 * import { assertEquals } from "../assert/mod.ts";
 *
 * assertEquals(
 *   decodeBase64Url("Zm9vYmFy"),
 *   new TextEncoder().encode("foobar")
 * );
 * ```
 */
export function decodeBase64Url(b64url) {
  const output = new TextEncoder().encode(b64url);
  // deno-lint-ignore no-explicit-any
  return new Uint8Array(output.buffer
    .transfer(decode(output, 0, 0, rAlphabet, padding)));
}
