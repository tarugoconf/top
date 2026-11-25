// Copyright 2018-2026 the Deno authors. MIT license.
export const padding = "=".charCodeAt(0);
export const alphabet = {
  base64: new TextEncoder()
    .encode("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"),
  base64url: new TextEncoder()
    .encode("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_"),
};
export const rAlphabet = {
  base64: new Uint8Array(128).fill(64), // alphabet.base64.length
  base64url: new Uint8Array(128).fill(64),
};
alphabet.base64
  .forEach((byte, i) => rAlphabet.base64[byte] = i);
alphabet.base64url
  .forEach((byte, i) => rAlphabet.base64url[byte] = i);
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
export function calcSizeBase64(originalSize) {
  return ((originalSize + 2) / 3 | 0) * 4;
}
export function encode(buffer, i, o, alphabet, padding) {
  i += 2;
  for (; i < buffer.length; i += 3) {
    const x = (buffer[i - 2] << 16) | (buffer[i - 1] << 8) | buffer[i];
    buffer[o++] = alphabet[x >> 18];
    buffer[o++] = alphabet[x >> 12 & 0x3F];
    buffer[o++] = alphabet[x >> 6 & 0x3F];
    buffer[o++] = alphabet[x & 0x3F];
  }
  switch (i) {
    case buffer.length + 1: {
      const x = buffer[i - 2] << 16;
      buffer[o++] = alphabet[x >> 18];
      buffer[o++] = alphabet[x >> 12 & 0x3F];
      buffer[o++] = padding;
      buffer[o++] = padding;
      break;
    }
    case buffer.length: {
      const x = (buffer[i - 2] << 16) | (buffer[i - 1] << 8);
      buffer[o++] = alphabet[x >> 18];
      buffer[o++] = alphabet[x >> 12 & 0x3F];
      buffer[o++] = alphabet[x >> 6 & 0x3F];
      buffer[o++] = padding;
      break;
    }
  }
  return o;
}
export function decode(buffer, i, o, alphabet, padding) {
  for (let x = buffer.length - 2; x < buffer.length; ++x) {
    if (buffer[x] === padding) {
      for (let y = x + 1; y < buffer.length; ++y) {
        if (buffer[y] !== padding) {
          throw new TypeError(
            `Cannot decode input as base64: Invalid character (${
              String.fromCharCode(buffer[y])
            })`,
          );
        }
      }
      buffer = buffer.subarray(0, x);
      break;
    }
  }
  if ((buffer.length - o) % 4 === 1) {
    throw new RangeError(
      `Cannot decode input as base64: Length (${
        buffer.length - o
      }), excluding padding, must not have a remainder of 1 when divided by 4`,
    );
  }
  i += 3;
  for (; i < buffer.length; i += 4) {
    const x = (getByte(buffer[i - 3], alphabet) << 18) |
      (getByte(buffer[i - 2], alphabet) << 12) |
      (getByte(buffer[i - 1], alphabet) << 6) |
      getByte(buffer[i], alphabet);
    buffer[o++] = x >> 16;
    buffer[o++] = x >> 8 & 0xFF;
    buffer[o++] = x & 0xFF;
  }
  switch (i) {
    case buffer.length + 1: {
      const x = (getByte(buffer[i - 3], alphabet) << 18) |
        (getByte(buffer[i - 2], alphabet) << 12);
      buffer[o++] = x >> 16;
      break;
    }
    case buffer.length: {
      const x = (getByte(buffer[i - 3], alphabet) << 18) |
        (getByte(buffer[i - 2], alphabet) << 12) |
        (getByte(buffer[i - 1], alphabet) << 6);
      buffer[o++] = x >> 16;
      buffer[o++] = x >> 8 & 0xFF;
      break;
    }
  }
  return o;
}
function getByte(char, alphabet) {
  const byte = alphabet[char] ?? 64;
  if (byte === 64) { // alphabet.Base64.length
    throw new TypeError(
      `Cannot decode input as base64: Invalid character (${
        String.fromCharCode(char)
      })`,
    );
  }
  return byte;
}
