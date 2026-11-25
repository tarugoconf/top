// Copyright 2018-2026 the Deno authors. MIT license.
/**
 * Utilities for working with the
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/Streams_API | Streams API}.
 *
 * Includes buffering and conversion.
 *
 * ```ts
 * import { toText } from "mod.ts";
 * import { assertEquals } from "../assert/mod.ts";
 *
 * const stream = ReadableStream.from(["Hello, world!"]);
 * const text = await toText(stream);
 *
 * assertEquals(text, "Hello, world!");
 * ```
 *
 * @module
 */
export * from "./batch-stream.js";
export * from "./buffer.js";
export * from "./byte-slice-stream.js";
export * from "./concat-readable-streams.js";
export * from "./delimiter-stream.js";
export * from "./early-zip-readable-streams.js";
export * from "./limited-bytes-transform-stream.js";
export * from "./limited-transform-stream.js";
export * from "./merge-readable-streams.js";
export * from "./text-delimiter-stream.js";
export * from "./text-line-stream.js";
export * from "./to-array-buffer.js";
export * from "./to-blob.js";
export * from "./to-bytes.js";
export * from "./to-json.js";
export * from "./to-text.js";
export * from "./to-transform-stream.js";
export * from "./zip-readable-streams.js";
