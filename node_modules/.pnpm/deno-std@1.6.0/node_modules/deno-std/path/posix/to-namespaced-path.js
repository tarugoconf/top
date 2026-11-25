// Copyright 2018-2026 the Deno authors. MIT license.
// This module is browser compatible.
/**
 * Converts a path to a namespaced path. This function returns the path as is on posix.
 *
 * @example Usage
 * ```ts
 * import { toNamespacedPath } from "to-namespaced-path.ts";
 * import { assertEquals } from "../../assert/mod.ts";
 *
 * assertEquals(toNamespacedPath("/home/foo"), "/home/foo");
 * ```
 *
 * @param path The path.
 * @returns The namespaced path.
 */
export function toNamespacedPath(path) {
  // Non-op on posix systems
  return path;
}
