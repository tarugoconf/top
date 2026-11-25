/**
 * Utilities for working with POSIX-formatted paths.
 *
 * This module also provides some functions that help when working with URLs.
 * See the documentation for examples.
 *
 * Codes in the examples uses POSIX path but it automatically use Windows path
 * on Windows. Use methods under `posix` or `win32` object instead to handle non
 * platform specific path like:
 *
 * ```ts
 * import { fromFileUrl } from "from-file-url.ts";
 * import { assertEquals } from "../../assert/mod.ts";
 *
 * assertEquals(fromFileUrl("file:///home/foo"), "/home/foo");
 * ```
 *
 * @module
 */
export * from "./basename.ts";
export * from "./constants.ts";
export * from "./dirname.ts";
export * from "./extname.ts";
export * from "./format.ts";
export * from "./from-file-url.ts";
export * from "./is-absolute.ts";
export * from "./join.ts";
export * from "./normalize.ts";
export * from "./parse.ts";
export * from "./relative.ts";
export * from "./resolve.ts";
export * from "./to-file-url.ts";
export * from "./to-namespaced-path.ts";
export * from "./common.ts";
export * from "../types.ts";
export * from "./glob-to-regexp.ts";
export * from "./is-glob.ts";
export * from "./join-globs.ts";
export * from "./normalize-glob.ts";
