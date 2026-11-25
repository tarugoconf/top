/**
 * Extensions to the
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API | Web Crypto API}
 * supporting additional encryption APIs, but also delegating to the built-in
 * APIs when possible.
 *
 * Provides additional digest algorithms that are not part of the WebCrypto
 * standard as well as a `subtle.digest` and `subtle.digestSync` methods.
 *
 * The {@linkcode KeyStack} export implements the {@linkcode KeyRing} interface
 * for managing rotatable keys for signing data to prevent tampering, like with
 * HTTP cookies.
 *
 * ## Supported algorithms
 *
 * Here is a list of supported algorithms. If the algorithm name in WebCrypto
 * and Wasm/Rust is the same, this library prefers to use the implementation
 * provided by WebCrypto.
 *
 * Length-adjustable algorithms support the
 * {@linkcode DigestAlgorithmObject.length} option.
 *
 * WebCrypto:
 * - `SHA-384`
 * - `SHA-256` (length-extendable)
 * - `SHA-512` (length-extendable)
 *
 * Wasm/Rust:
 * - `BLAKE2B`
 * - `BLAKE2B-128`
 * - `BLAKE2B-160`
 * - `BLAKE2B-224`
 * - `BLAKE2B-256`
 * - `BLAKE2B-384`
 * - `BLAKE2S`
 * - `BLAKE3` (length-adjustable)
 * - `KECCAK-224`
 * - `KECCAK-256`
 * - `KECCAK-384`
 * - `KECCAK-512`
 * - `SHA-384`
 * - `SHA3-224`
 * - `SHA3-256`
 * - `SHA3-384`
 * - `SHA3-512`
 * - `SHAKE128` (length-adjustable)
 * - `SHAKE256` (length-adjustable)
 * - `TIGER`
 * - `RIPEMD-160` (length-extendable)
 * - `SHA-224` (length-extendable)
 * - `SHA-256` (length-extendable)
 * - `SHA-512` (length-extendable)
 * - `MD4` (length-extendable and collidable)
 * - `MD5` (length-extendable and collidable)
 * - `SHA-1` (length-extendable and collidable)
 * - `FNV32` (non-cryptographic)
 * - `FNV32A` (non-cryptographic)
 * - `FNV64` (non-cryptographic)
 * - `FNV64A` (non-cryptographic)
 *
 * @example
 * ```ts
 * import { crypto } from "mod.ts";
 *
 * // This will delegate to the runtime's WebCrypto implementation.
 * console.log(
 *   new Uint8Array(
 *     await crypto.subtle.digest(
 *       "SHA-384",
 *       new TextEncoder().encode("hello world"),
 *     ),
 *   ),
 * );
 *
 * // This will use a bundled Wasm/Rust implementation.
 * console.log(
 *   new Uint8Array(
 *     await crypto.subtle.digest(
 *       "BLAKE3",
 *       new TextEncoder().encode("hello world"),
 *     ),
 *   ),
 * );
 * ```
 *
 * @example Convert hash to a string
 *
 * ```ts
 * import {
 *   crypto,
 * } from "mod.ts";
 * import { encodeHex } from "../encoding/hex.ts"
 * import { encodeBase64 } from "../encoding/base64.ts"
 *
 * const hash = await crypto.subtle.digest(
 *   "SHA-384",
 *   new TextEncoder().encode("You hear that Mr. Anderson?"),
 * );
 *
 * // Hex encoding
 * console.log(encodeHex(hash));
 *
 * // Or with base64 encoding
 * console.log(encodeBase64(hash));
 * ```
 *
 * @module
 */
import {
  DIGEST_ALGORITHM_NAMES,
  type DigestAlgorithmName,
} from "./_wasm/mod.ts";
export { DIGEST_ALGORITHM_NAMES, type DigestAlgorithmName };
/** Extensions to the web standard `SubtleCrypto` interface. */
export interface StdSubtleCrypto extends SubtleCrypto {
  /**
   * Returns a new `Promise` object that will digest `data` using the specified
   * `AlgorithmIdentifier`.
   */
  digest(
    algorithm: DigestAlgorithm,
    data: BufferSource | AsyncIterable<BufferSource> | Iterable<BufferSource>,
  ): Promise<ArrayBuffer>;
  /**
   * Returns a ArrayBuffer with the result of digesting `data` using the
   * specified `AlgorithmIdentifier`.
   */
  digestSync(
    algorithm: DigestAlgorithm,
    data: BufferSource | Iterable<BufferSource>,
  ): ArrayBuffer;
}
/** Extensions to the Web {@linkcode Crypto} interface. */
export interface StdCrypto extends Crypto {
  /** Extension to the {@linkcode crypto.SubtleCrypto} interface. */
  readonly subtle: StdSubtleCrypto;
}
/**
 * A wrapper for WebCrypto which adds support for additional non-standard
 * algorithms, but delegates to the runtime WebCrypto implementation whenever
 * possible.
 */
declare const stdCrypto: StdCrypto;
/** Extended digest algorithm objects. */
export type DigestAlgorithmObject = {
  name: DigestAlgorithmName;
  length?: number;
};
/**
 * Extended digest algorithms accepted by {@linkcode stdCrypto.subtle.digest}.
 *
 * The `length` option will be ignored for
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest#algorithm | Web Standard algorithms}.
 */
export type DigestAlgorithm = DigestAlgorithmName | DigestAlgorithmObject;
export { stdCrypto as crypto };
