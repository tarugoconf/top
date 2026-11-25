import type { db } from "./_db.ts";
/** MIME-types database. */
export type DB = typeof db;
/** Maps content types to their corresponding file extensions. */
export type ContentTypeToExtension = {
  [K in keyof DB]: DB[K] extends {
    "extensions": readonly string[];
  } ? DB[K]["extensions"][number]
    : never;
};
/** Known extension or type. Used in {@linkcode contentType}. */
export type KnownExtensionOrType =
  | keyof ContentTypeToExtension
  | ContentTypeToExtension[keyof ContentTypeToExtension]
  | `.${ContentTypeToExtension[keyof ContentTypeToExtension]}`;
/**
 * Returns the full `Content-Type` or `Content-Disposition` header value for the
 * given extension or media type.
 *
 * The function will treat the `extensionOrType` as a media type when it
 * contains a `/`, otherwise it will process it as an extension, with or without
 * the leading `.`.
 *
 * Returns `undefined` if unable to resolve the media type.
 *
 * @typeParam T Type of the extension or media type to resolve.
 *
 * @param extensionOrType The extension or media type to resolve.
 *
 * @returns The full `Content-Type` or `Content-Disposition` header value, or
 * `undefined` if unable to resolve the media type.
 *
 * @example Usage
 * ```ts
 * import { contentType } from "content-type.ts";
 * import { assertEquals } from "../assert/mod.ts";
 *
 * assertEquals(contentType(".json"), "application/json; charset=UTF-8");
 * assertEquals(contentType("text/html"), "text/html; charset=UTF-8");
 * assertEquals(contentType("text/html; charset=UTF-8"), "text/html; charset=UTF-8");
 * assertEquals(contentType("txt"), "text/plain; charset=UTF-8");
 * assertEquals(contentType("foo"), undefined);
 * assertEquals(contentType("file.json"), undefined);
 * ```
 */
export declare function contentType<
  T extends (string & {}) | KnownExtensionOrType,
>(
  extensionOrType: T,
): Lowercase<T> extends KnownExtensionOrType ? string : string | undefined;
