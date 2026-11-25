// Copyright 2018-2026 the Deno authors. MIT license.
// This module is browser compatible.
import { isWindows } from "../internal/os.js";
import { join as posixJoin } from "./posix/join.js";
import { join as windowsJoin } from "./windows/join.js";
/**
 * Joins a sequence of paths, then normalizes the resulting path.
 *
 * @example Usage
 * ```ts
 * import { join } from "join.ts";
 * import { assertEquals } from "../assert/mod.ts";
 *
 * if (Deno.build.os === "windows") {
 *   assertEquals(join("C:\\foo", "bar", "baz\\quux", "garply", ".."), "C:\\foo\\bar\\baz\\quux");
 *   assertEquals(join(new URL("file:///C:/foo"), "bar", "baz/asdf", "quux", ".."), "C:\\foo\\bar\\baz\\asdf");
 * } else {
 *   assertEquals(join("/foo", "bar", "baz/quux", "garply", ".."), "/foo/bar/baz/quux");
 *   assertEquals(join(new URL("file:///foo"), "bar", "baz/asdf", "quux", ".."), "/foo/bar/baz/asdf");
 * }
 * ```
 *
 * @param path The path to join. This can be string or file URL.
 * @param paths Paths to be joined and normalized.
 * @returns The joined and normalized path.
 */
export function join(path, ...paths) {
  return isWindows ? windowsJoin(path, ...paths) : posixJoin(path, ...paths);
}
