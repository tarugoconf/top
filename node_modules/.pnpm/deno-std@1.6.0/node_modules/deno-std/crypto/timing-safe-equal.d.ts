/**
 * When checking the values of cryptographic hashes are equal, default
 * comparisons can be susceptible to timing based attacks, where attacker is
 * able to find out information about the host system by repeatedly checking
 * response times to equality comparisons of values.
 *
 * It is likely some form of timing safe equality will make its way to the
 * WebCrypto standard (see:
 * {@link https://github.com/w3c/webcrypto/issues/270 | w3c/webcrypto#270}), but until
 * that time, `timingSafeEqual()` is provided.
 *
 * Note: This is a best-effort constant-time comparison implemented in
 * JavaScript. The V8 JIT compiler does not provide formal constant-time
 * guarantees, and inputs backed by `SharedArrayBuffer` are susceptible to
 * concurrent modification during comparison.
 *
 * @example Usage
 * ```ts
 * import { timingSafeEqual } from "timing-safe-equal.ts";
 * import { assert } from "../assert/mod.ts";
 *
 * const a = await crypto.subtle.digest(
 *   "SHA-384",
 *   new TextEncoder().encode("hello world"),
 * );
 * const b = await crypto.subtle.digest(
 *   "SHA-384",
 *   new TextEncoder().encode("hello world"),
 * );
 *
 * assert(timingSafeEqual(a, b));
 * ```
 *
 * @param a The first value to compare.
 * @param b The second value to compare.
 * @returns `true` if the values are equal, otherwise `false`.
 * @throws {TypeError} If the byte lengths of the two buffers are not equal.
 */
export declare function timingSafeEqual(
  a: ArrayBufferView | ArrayBufferLike,
  b: ArrayBufferView | ArrayBufferLike,
): boolean;
