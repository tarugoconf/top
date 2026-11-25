// Copyright 2018-2026 the Deno authors. MIT license.
// This module is browser compatible.
import { isWindows } from "../internal/os.js";
import { normalize as posixNormalize } from "./posix/normalize.js";
import { normalize as windowsNormalize } from "./windows/normalize.js";
/**
 * Normalize the path, resolving `'..'` and `'.'` segments.
 *
 * Note: Resolving these segments does not necessarily mean that all will be
 * eliminated. A `'..'` at the top-level will be preserved, and an empty path is
 * canonically `'.'`.
 *
 * @example Usage
 * ```ts
 * import { normalize } from "normalize.ts";
 * import { assertEquals } from "../assert/mod.ts";
 *
 * if (Deno.build.os === "windows") {
 *   assertEquals(normalize("C:\\foo\\bar\\..\\baz\\quux"), "C:\\foo\\baz\\quux");
 *   assertEquals(normalize(new URL("file:///C:/foo/bar/../baz/quux")), "C:\\foo\\baz\\quux");
 * } else {
 *   assertEquals(normalize("/foo/bar/../baz/quux"), "/foo/baz/quux");
 *   assertEquals(normalize(new URL("file:///foo/bar/../baz/quux")), "/foo/baz/quux");
 * }
 * ```
 *
 * @param path Path to be normalized
 * @returns The normalized path.
 */
export function normalize(path) {
  return isWindows ? windowsNormalize(path) : posixNormalize(path);
}
