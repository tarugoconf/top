/**
 * Return the extension of the path with leading period (".").
 *
 * @example Usage
 * ```ts
 * import { extname } from "extname.ts";
 * import { assertEquals } from "../assert/mod.ts";
 *
 * if (Deno.build.os === "windows") {
 *   assertEquals(extname("C:\\home\\user\\Documents\\image.png"), ".png");
 *   assertEquals(extname(new URL("file:///C:/home/user/Documents/image.png")), ".png");
 * } else {
 *   assertEquals(extname("/home/user/Documents/image.png"), ".png");
 *   assertEquals(extname(new URL("file:///home/user/Documents/image.png")), ".png");
 * }
 * ```
 *
 * @param path Path with extension. When passed as a `URL` instance, its
 * protocol must be `file:`. For other protocols, pass the URL as a string or
 * pass its `pathname` property.
 * @returns The file extension. E.g. returns `.ts` for `file.ts`.
 * @throws {TypeError} If `path` is a `URL` instance whose protocol is not `file:`.
 */
export declare function extname(path: string | URL): string;
