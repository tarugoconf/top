import type { ValueType } from "./encode.ts";
/**
 * Decode a value from the {@link https://msgpack.org/ | MessagePack} binary format.
 *
 * If the input is not in valid message pack format, an error will be thrown.
 *
 * @example Usage
 * ```ts
 * import { decode } from "decode.ts";
 * import { assertEquals } from "../assert/mod.ts";
 *
 * const encoded = new Uint8Array([163, 72, 105, 33]);
 *
 * assertEquals(decode(encoded), "Hi!");
 * ```
 *
 * @param data MessagePack binary data.
 * @returns Decoded value from the MessagePack binary data.
 */
export declare function decode(data: Uint8Array): ValueType;
