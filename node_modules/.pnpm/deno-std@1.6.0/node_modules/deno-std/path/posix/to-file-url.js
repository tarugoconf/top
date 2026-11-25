// Copyright 2018-2026 the Deno authors. MIT license.
// This module is browser compatible.
import { encodeWhitespace } from "../_common/to-file-url.js";
import { isAbsolute } from "./is-absolute.js";
/**
 * Converts a path string to a file URL.
 *
 * @example Usage
 * ```ts
 * import { toFileUrl } from "to-file-url.ts";
 * import { assertEquals } from "../../assert/mod.ts";
 *
 * assertEquals(toFileUrl("/home/foo"), new URL("file:///home/foo"));
 * assertEquals(toFileUrl("/home/foo bar"), new URL("file:///home/foo%20bar"));
 * assertEquals(toFileUrl("//foo/bar"), new URL("file:///foo/bar"));
 * ```
 *
 * @param path The path to convert.
 * @returns The file URL.
 */
export function toFileUrl(path) {
  if (!isAbsolute(path)) {
    throw new TypeError(`Path must be absolute: received "${path}"`);
  }
  const url = new URL("file:///");
  url.pathname = encodeWhitespace(
    path.replace(/^\/+/, "/").replace(/%/g, "%25").replace(/\\/g, "%5C"),
  );
  return url;
}
