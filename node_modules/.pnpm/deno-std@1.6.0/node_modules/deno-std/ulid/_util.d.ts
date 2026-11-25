/** Type for a ULID generator function. */
export type ULID = (seedTime?: number) => string;
export declare const ENCODING = "0123456789ABCDEFGHJKMNPQRSTVWXYZ";
export declare const ENCODING_LEN: number;
export declare const TIME_MAX: number;
export declare const TIME_LEN = 10;
export declare const RANDOM_LEN = 16;
export declare const ULID_LEN: number;
export declare function encodeTime(timestamp: number): string;
export declare function encodeRandom(): string;
export declare function incrementBase32(str: string): string;
/** Generates a monotonically increasing ULID. */
export declare function monotonicFactory(
  encodeRand?: typeof encodeRandom,
): ULID;
