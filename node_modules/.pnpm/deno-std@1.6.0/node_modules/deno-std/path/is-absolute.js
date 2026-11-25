// Copyright 2018-2026 the Deno authors. MIT license.
// This module is browser compatible.
import { isWindows } from "../internal/os.js";
import { isAbsolute as posixIsAbsolute } from "./posix/is-absolute.js";
import { isAbsolute as windowsIsAbsolute } from "./windows/is-absolute.js";
/**
 * Verifies whether provided path is absolute.
 *
 * @example Usage
 * ```ts
 * import { isAbsolute } from "is-absolute.ts";
 * import { assert, assertFalse } from "../assert/mod.ts";
 *
 * if (Deno.build.os === "windows") {
 *   assert(isAbsolute("C:\\home\\foo"));
 *   assertFalse(isAbsolute("home\\foo"));
 * } else {
 *   assert(isAbsolute("/home/foo"));
 *   assertFalse(isAbsolute("home/foo"));
 * }
 * ```
 *
 * @param path Path to be verified as absolute.
 * @returns `true` if path is absolute, `false` otherwise
 */
export function isAbsolute(path) {
  return isWindows ? windowsIsAbsolute(path) : posixIsAbsolute(path);
}
