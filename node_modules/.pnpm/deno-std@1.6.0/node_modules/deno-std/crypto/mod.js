// Copyright 2018-2026 the Deno authors. MIT license.
// This module is browser compatible.
/**
 * Extensions to the
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API | Web Crypto}
 * supporting additional encryption APIs, but also delegating to the built-in
 * APIs when possible.
 *
 * ```ts no-assert
 * import { crypto } from "crypto.ts";
 *
 * const message = "Hello, Deno!";
 * const encoder = new TextEncoder();
 * const data = encoder.encode(message);
 *
 * await crypto.subtle.digest("BLAKE3", data);
 * ```
 *
 * @module
 */
export * from "./aes-gcm.js";
export * from "./crypto.js";
export * from "./timing-safe-equal.js";
