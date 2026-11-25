import type { Uint8Array_ } from "./_types.ts";
export type { Uint8Array_ };
/**
 * Value types that can be encoded to MessagePack.
 */
export type ValueType =
  | number
  | bigint
  | string
  | boolean
  | null
  | Uint8Array
  | readonly ValueType[]
  | ValueMap;
/**
 * Value map that can be encoded to MessagePack.
 */
export interface ValueMap {
  /** Value map entry */
  [index: string | number]: ValueType;
}
/**
 * Encode a value to {@link https://msgpack.org/ | MessagePack} binary format.
 *
 * @example Usage
 * ```ts
 * import { encode } from "encode.ts";
 * import { assertEquals } from "../assert/mod.ts";
 *
 * const obj = {
 *   str: "deno",
 *   arr: [1, 2, 3],
 *   map: {
 *     foo: "bar"
 *   }
 * }
 *
 * const encoded = encode(obj);
 *
 * assertEquals(encoded.length, 31);
 * ```
 *
 * @param object Value to encode to MessagePack binary format.
 * @returns Encoded MessagePack binary data.
 */
export declare function encode(object: ValueType): Uint8Array_;
