// Copyright 2018-2026 the Deno authors. MIT license.
// This module is browser compatible.
import { assertPath } from "../_common/assert-path.js";
import { fromFileUrl } from "./from-file-url.js";
import { normalize } from "./normalize.js";
/**
 * Join all given a sequence of `paths`,then normalizes the resulting path.
 *
 * @example Usage
 * ```ts
 * import { join } from "join.ts";
 * import { assertEquals } from "../../assert/mod.ts";
 *
 * assertEquals(join("/foo", "bar", "baz/asdf", "quux", ".."), "/foo/bar/baz/asdf");
 * assertEquals(join(new URL("file:///foo"), "bar", "baz/asdf", "quux", ".."), "/foo/bar/baz/asdf");
 * ```
 *
 * @example Working with URLs
 * ```ts
 * import { join } from "join.ts";
 * import { assertEquals } from "../../assert/mod.ts";
 *
 * const url = new URL("https://deno.land");
 * url.pathname = join("std", "path", "mod.ts");
 * assertEquals(url.href, "https://deno.land/std/path/mod.ts");
 *
 * url.pathname = join("//std", "path/", "/mod.ts");
 * assertEquals(url.href, "https://deno.land/std/path/mod.ts");
 * ```
 *
 * @param path The path to join. This can be string or file URL.
 * @param paths The paths to join.
 * @returns The joined path.
 */
export function join(path, ...paths) {
  if (path === undefined) {
    return ".";
  }
  if (path instanceof URL) {
    path = fromFileUrl(path);
  }
  paths = path ? [path, ...paths] : paths;
  paths.forEach((path) => assertPath(path));
  const joined = paths.filter((path) => path.length > 0).join("/");
  return joined === "" ? "." : normalize(joined);
}
