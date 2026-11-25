/**
 * Utility functions for media types (MIME types).
 *
 * This API is inspired by the GoLang {@linkcode https://pkg.go.dev/mime | mime}
 * package and {@link https://github.com/jshttp/mime-types | jshttp/mime-types},
 * and is designed to integrate and improve the APIs from
 * {@link https://deno.land/x/media_types | x/media_types}.
 *
 * The `vendor` folder contains copy of the
 * {@link https://github.com/jshttp/mime-types | jshttp/mime-db} `db.json` file,
 * along with its license.
 *
 * ```ts
 * import { contentType, allExtensions, getCharset } from "mod.ts";
 * import { assertEquals } from "../assert/mod.ts";
 *
 * assertEquals(allExtensions("application/json"), ["json", "map"]);
 *
 * assertEquals(contentType(".json"), "application/json; charset=UTF-8");
 *
 * assertEquals(getCharset("text/plain"), "UTF-8");
 * ```
 *
 * @module
 */
export * from "./content-type.ts";
export * from "./extension.ts";
export * from "./all-extensions.ts";
export * from "./format-media-type.ts";
export * from "./get-charset.ts";
export * from "./parse-media-type.ts";
export * from "./type-by-extension.ts";
