/**
 * Options for {@linkcode stringify}.
 */
export interface StringifyOptions {
  /**
   * Define if the keys should be aligned or not.
   *
   * @default {false}
   */
  keyAlignment?: boolean;
}
/**
 * Converts an object to a {@link https://toml.io | TOML} string.
 *
 * @example Usage
 * ```ts
 * import { stringify } from "stringify.ts";
 * import { assertEquals } from "../assert/mod.ts";
 *
 * const obj = {
 *   title: "TOML Example",
 *   owner: {
 *     name: "Bob",
 *     bio: "Bob is a cool guy",
 *  }
 * };
 * const tomlString = stringify(obj);
 * assertEquals(tomlString, `title = "TOML Example"\n\n[owner]\nname = "Bob"\nbio = "Bob is a cool guy"\n`);
 * ```
 * @param obj Source object
 * @param options Options for stringifying.
 * @returns TOML string
 */
export declare function stringify(
  obj: Record<string, unknown>,
  options?: StringifyOptions,
): string;
