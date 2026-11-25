import type { Uint8Array_ } from "./_types.ts";
export type { Uint8Array_ };
/** Options for {@linkcode encryptAesGcm} and {@linkcode decryptAesGcm}. */
export interface AesGcmOptions {
  /** Additional authenticated data. Authenticated but not encrypted. */
  additionalData?: BufferSource;
}
/**
 * Encrypts plaintext using AES-GCM with a random 96-bit nonce.
 *
 * Returns `nonce (12 bytes) || ciphertext || tag (16 bytes)`.
 *
 * @example Usage
 * ```ts
 * import { encryptAesGcm } from "aes-gcm.ts";
 * import { assertNotEquals } from "../assert/mod.ts";
 *
 * const key = await crypto.subtle.generateKey(
 *   { name: "AES-GCM", length: 256 },
 *   false,
 *   ["encrypt", "decrypt"],
 * );
 *
 * const encrypted = await encryptAesGcm(
 *   key,
 *   new TextEncoder().encode("hello world"),
 * );
 *
 * assertNotEquals(encrypted.length, 0);
 * ```
 *
 * @param key The AES-GCM `CryptoKey` to encrypt with.
 * @param plaintext The data to encrypt.
 * @param options Optional additional authenticated data.
 * @returns The concatenated nonce, ciphertext, and authentication tag.
 *
 * @remarks With random nonces, do not encrypt more than ~2^32 messages
 * under the same key. Beyond this limit, nonce collision probability
 * becomes non-negligible.
 *
 * @see {@link https://csrc.nist.gov/pubs/sp/800/38/d/final | NIST SP 800-38D} Section 8.3
 */
export declare function encryptAesGcm(
  key: CryptoKey,
  plaintext: BufferSource,
  options?: AesGcmOptions,
): Promise<Uint8Array_>;
/**
 * Decrypts data produced by {@linkcode encryptAesGcm}.
 *
 * Expects input in the format `nonce (12 bytes) || ciphertext || tag (16 bytes)`.
 *
 * @example Usage
 * ```ts
 * import { decryptAesGcm, encryptAesGcm } from "aes-gcm.ts";
 * import { assertEquals } from "../assert/mod.ts";
 *
 * const key = await crypto.subtle.generateKey(
 *   { name: "AES-GCM", length: 256 },
 *   false,
 *   ["encrypt", "decrypt"],
 * );
 *
 * const plaintext = new TextEncoder().encode("hello world");
 * const encrypted = await encryptAesGcm(key, plaintext);
 *
 * assertEquals(await decryptAesGcm(key, encrypted), plaintext);
 * ```
 *
 * @param key The AES-GCM `CryptoKey` to decrypt with.
 * @param data The wire-format output from {@linkcode encryptAesGcm}: nonce (12 B) || ciphertext || tag (16 B).
 * @param options Optional additional authenticated data (must match what was used during encryption).
 * @returns The decrypted plaintext.
 * @throws {RangeError} If `data` is shorter than 28 bytes (12 nonce + 16 tag).
 * @throws {DOMException} If authentication fails (wrong key, tampered data, or
 * mismatched additional data).
 */
export declare function decryptAesGcm(
  key: CryptoKey,
  data: BufferSource,
  options?: AesGcmOptions,
): Promise<Uint8Array_>;
