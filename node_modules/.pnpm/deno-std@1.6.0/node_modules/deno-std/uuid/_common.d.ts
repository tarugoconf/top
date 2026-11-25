/**
 * Converts the byte array to a UUID string
 * @param bytes Used to convert Byte to Hex
 */
export declare function bytesToUuid(bytes: number[] | Uint8Array): string;
/**
 * Converts a string to a byte array by converting the hex value to a number.
 * @param uuid Value that gets converted.
 */
export declare function uuidToBytes(uuid: string): Uint8Array;
