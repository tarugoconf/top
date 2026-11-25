// Copyright 2018-2026 the Deno authors. MIT license.
// This module is browser compatible.
/**
 * Provides tools for working with
 * {@link https://code.visualstudio.com/docs/languages/json#_json-with-comments | JSONC}
 * (JSON with comments).
 *
 * Currently, this module only provides a means of parsing JSONC. JSONC
 * serialization is not yet supported.
 *
 * ```ts
 * import { parse } from "mod.ts";
 * import { assertEquals } from "../assert/mod.ts";
 *
 * assertEquals(parse('{"foo": "bar", } // comment'), { foo: "bar" });
 * assertEquals(parse('{"foo": "bar", } /* comment *\/'), { foo: "bar" });
 * ```
 *
 * @module
 */
export * from "./parse.js";
