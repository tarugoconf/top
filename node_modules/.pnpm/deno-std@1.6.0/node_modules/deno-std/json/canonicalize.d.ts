import type { JsonValue } from "./types.ts";
import type { Uint8Array_ } from "./_types.ts";
/**
 * Serializes a JSON value to a canonical string per
 * {@link https://www.rfc-editor.org/rfc/rfc8785 | RFC 8785} JSON
 * Canonicalization Scheme (JCS).
 *
 * This produces a deterministic JSON string suitable for hashing or signing,
 * with object keys sorted lexicographically by UTF-16 code units and no
 * whitespace between tokens.
 *
 * Note: The input must be JSON-compatible data. Objects with `toJSON()` methods
 * (like `Date`) should be converted to their JSON representation first.
 *
 * @param value The JSON value to canonicalize.
 * @returns The canonical JSON string.
 *
 * @example Basic usage (RFC 8785 Appendix E inspired)
 * ```ts
 * import { canonicalize } from "canonicalize.ts";
 * import { assertEquals } from "../assert/mod.ts";
 *
 * // Keys are sorted lexicographically, no whitespace between tokens
 * const data = {
 *   time: "2019-01-28T07:45:10Z",
 *   big: "055",
 *   val: 3.5,
 * };
 * assertEquals(canonicalize(data), '{"big":"055","time":"2019-01-28T07:45:10Z","val":3.5}');
 * ```
 *
 * @example Number serialization (RFC 8785 Section 3.2.2.3)
 * ```ts
 * import { canonicalize } from "canonicalize.ts";
 * import { assertEquals } from "../assert/mod.ts";
 *
 * // Numbers follow ECMAScript serialization rules
 * assertEquals(canonicalize(10.0), "10");           // No unnecessary decimals
 * assertEquals(canonicalize(1e21), "1e+21");        // Scientific notation for large
 * assertEquals(canonicalize(0.0000001), "1e-7");    // Scientific notation for small
 * assertEquals(canonicalize(-0), "0");              // Negative zero becomes "0"
 * ```
 *
 * @example Key sorting by UTF-16 code units (RFC 8785 Section 3.2.3)
 * ```ts
 * import { canonicalize } from "canonicalize.ts";
 * import { assertEquals } from "../assert/mod.ts";
 *
 * // Keys sorted by UTF-16 code units: digits < uppercase < lowercase
 * const data = { a: 1, A: 2, "1": 3 };
 * assertEquals(canonicalize(data), '{"1":3,"A":2,"a":1}');
 * ```
 *
 * @throws {TypeError} If the value contains non-finite numbers (Infinity, -Infinity, NaN).
 * @throws {TypeError} If the value contains circular references.
 *
 * @see {@link https://www.rfc-editor.org/rfc/rfc8785 | RFC 8785}
 */
export declare function canonicalize(value: JsonValue): string;
/**
 * Serializes a JSON value to canonical UTF-8 bytes per
 * {@link https://www.rfc-editor.org/rfc/rfc8785 | RFC 8785} JSON
 * Canonicalization Scheme (JCS).
 *
 * This is equivalent to `new TextEncoder().encode(canonicalize(value))` and
 * is provided as a convenience for cryptographic operations that require
 * byte input.
 *
 * @param value The JSON value to canonicalize.
 * @returns The canonical JSON as UTF-8 bytes.
 *
 * @example Creating a verifiable hash
 * ```ts
 * import { canonicalizeToBytes } from "canonicalize.ts";
 * import { encodeHex } from "../encoding/hex.ts";
 * import { assertEquals } from "../assert/mod.ts";
 *
 * async function sha256Hex(data: Uint8Array): Promise<string> {
 *   const hash = await crypto.subtle.digest("SHA-256", data.buffer as ArrayBuffer);
 *   return encodeHex(new Uint8Array(hash));
 * }
 *
 * // Create a deterministic hash of JSON data for verification
 * const payload = { action: "transfer", amount: 100, to: "alice" };
 * const hash = await sha256Hex(canonicalizeToBytes(payload));
 *
 * // Same hash regardless of original key order
 * const reordered = { to: "alice", action: "transfer", amount: 100 };
 * const reorderedHash = await sha256Hex(canonicalizeToBytes(reordered));
 *
 * assertEquals(hash, reorderedHash);
 * ```
 *
 * @throws {TypeError} If the value contains non-finite numbers (Infinity, -Infinity, NaN).
 * @throws {TypeError} If the value contains circular references.
 *
 * @see {@link https://www.rfc-editor.org/rfc/rfc8785 | RFC 8785}
 */
export declare function canonicalizeToBytes(value: JsonValue): Uint8Array_;
