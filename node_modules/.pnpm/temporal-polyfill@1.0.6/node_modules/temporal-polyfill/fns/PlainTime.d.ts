import { Temporal } from 'temporal-spec';
import { TimeFields, LocalesArg } from '../chunks/internal.js';
import { DateTimeFormatLike, PlainTimeRecord, OverflowOptions, DurationRecord, RoundingMode, RoundingMathOptions } from '../chunks/funcApi.js';


type Format = DateTimeFormatLike<PlainTimeRecord>;
type FromFields = Partial<TimeFields>;
type WithFields = Partial<TimeFields>;
type DiffOptions = Temporal.RoundingOptionsWithLargestUnit<Temporal.TimeUnit>;
type ToStringOptions = Temporal.PlainTimeToStringOptions;
declare const create: (hour?: number, minute?: number, second?: number, millisecond?: number, microsecond?: number, nanosecond?: number) => PlainTimeRecord;
declare const isRecord: (arg: unknown) => arg is PlainTimeRecord;
declare const fromFields: (fields: FromFields, options?: OverflowOptions) => PlainTimeRecord;
declare const fromString: (s: string) => PlainTimeRecord;
declare const withFields: (record: PlainTimeRecord, mod: WithFields, options?: OverflowOptions) => PlainTimeRecord;
declare const add: (record: PlainTimeRecord, duration: DurationRecord) => PlainTimeRecord;
declare const subtract: (record: PlainTimeRecord, duration: DurationRecord) => PlainTimeRecord;
declare const diff: (record: PlainTimeRecord, otherRecord: PlainTimeRecord, options?: DiffOptions) => DurationRecord;
declare const equals: (record: PlainTimeRecord, otherRecord: PlainTimeRecord) => boolean;
declare const compare: (record: PlainTimeRecord, otherRecord: PlainTimeRecord) => number;
declare const createFormat: (locales?: LocalesArg, options?: Intl.DateTimeFormatOptions) => Format;
declare const toLocaleString: (record: PlainTimeRecord, locales?: LocalesArg, options?: Intl.DateTimeFormatOptions) => string;
declare const toString: (record: PlainTimeRecord, options?: ToStringOptions) => string;
declare const toBasicString: (record: PlainTimeRecord) => string;
declare const toTemporal: (record: PlainTimeRecord) => Temporal.PlainTime;
declare const addHours: (record: PlainTimeRecord, hours: number) => PlainTimeRecord;
declare const addMinutes: (record: PlainTimeRecord, minutes: number) => PlainTimeRecord;
declare const addSeconds: (record: PlainTimeRecord, seconds: number) => PlainTimeRecord;
declare const addMilliseconds: (record: PlainTimeRecord, milliseconds: number) => PlainTimeRecord;
declare const addMicroseconds: (record: PlainTimeRecord, microseconds: number) => PlainTimeRecord;
declare const addNanoseconds: (record: PlainTimeRecord, nanoseconds: number) => PlainTimeRecord;
declare const subtractHours: (record: PlainTimeRecord, hours: number) => PlainTimeRecord;
declare const subtractMinutes: (record: PlainTimeRecord, minutes: number) => PlainTimeRecord;
declare const subtractSeconds: (record: PlainTimeRecord, seconds: number) => PlainTimeRecord;
declare const subtractMilliseconds: (record: PlainTimeRecord, milliseconds: number) => PlainTimeRecord;
declare const subtractMicroseconds: (record: PlainTimeRecord, microseconds: number) => PlainTimeRecord;
declare const subtractNanoseconds: (record: PlainTimeRecord, nanoseconds: number) => PlainTimeRecord;
declare const roundToHour: {
    (record: PlainTimeRecord): PlainTimeRecord;
    (record: PlainTimeRecord, roundingMode: RoundingMode): PlainTimeRecord;
    (record: PlainTimeRecord, options: RoundingMathOptions): PlainTimeRecord;
};
declare const roundToMinute: {
    (record: PlainTimeRecord): PlainTimeRecord;
    (record: PlainTimeRecord, roundingMode: RoundingMode): PlainTimeRecord;
    (record: PlainTimeRecord, options: RoundingMathOptions): PlainTimeRecord;
};
declare const roundToSecond: {
    (record: PlainTimeRecord): PlainTimeRecord;
    (record: PlainTimeRecord, roundingMode: RoundingMode): PlainTimeRecord;
    (record: PlainTimeRecord, options: RoundingMathOptions): PlainTimeRecord;
};
declare const roundToMillisecond: {
    (record: PlainTimeRecord): PlainTimeRecord;
    (record: PlainTimeRecord, roundingMode: RoundingMode): PlainTimeRecord;
    (record: PlainTimeRecord, options: RoundingMathOptions): PlainTimeRecord;
};
declare const roundToMicrosecond: {
    (record: PlainTimeRecord): PlainTimeRecord;
    (record: PlainTimeRecord, roundingMode: RoundingMode): PlainTimeRecord;
    (record: PlainTimeRecord, options: RoundingMathOptions): PlainTimeRecord;
};
declare const startOfHour: (record: PlainTimeRecord) => PlainTimeRecord;
declare const startOfMinute: (record: PlainTimeRecord) => PlainTimeRecord;
declare const startOfSecond: (record: PlainTimeRecord) => PlainTimeRecord;
declare const startOfMillisecond: (record: PlainTimeRecord) => PlainTimeRecord;
declare const startOfMicrosecond: (record: PlainTimeRecord) => PlainTimeRecord;
declare const endOfHour: (record: PlainTimeRecord) => PlainTimeRecord;
declare const endOfMinute: (record: PlainTimeRecord) => PlainTimeRecord;
declare const endOfSecond: (record: PlainTimeRecord) => PlainTimeRecord;
declare const endOfMillisecond: (record: PlainTimeRecord) => PlainTimeRecord;
declare const endOfMicrosecond: (record: PlainTimeRecord) => PlainTimeRecord;
declare const diffHours: {
    (record0: PlainTimeRecord, record1: PlainTimeRecord): number;
    (record0: PlainTimeRecord, record1: PlainTimeRecord, roundingMode: RoundingMode): number;
    (record0: PlainTimeRecord, record1: PlainTimeRecord, options: RoundingMathOptions): number;
};
declare const diffMinutes: {
    (record0: PlainTimeRecord, record1: PlainTimeRecord): number;
    (record0: PlainTimeRecord, record1: PlainTimeRecord, roundingMode: RoundingMode): number;
    (record0: PlainTimeRecord, record1: PlainTimeRecord, options: RoundingMathOptions): number;
};
declare const diffSeconds: {
    (record0: PlainTimeRecord, record1: PlainTimeRecord): number;
    (record0: PlainTimeRecord, record1: PlainTimeRecord, roundingMode: RoundingMode): number;
    (record0: PlainTimeRecord, record1: PlainTimeRecord, options: RoundingMathOptions): number;
};
declare const diffMilliseconds: {
    (record0: PlainTimeRecord, record1: PlainTimeRecord): number;
    (record0: PlainTimeRecord, record1: PlainTimeRecord, roundingMode: RoundingMode): number;
    (record0: PlainTimeRecord, record1: PlainTimeRecord, options: RoundingMathOptions): number;
};
declare const diffMicroseconds: {
    (record0: PlainTimeRecord, record1: PlainTimeRecord): number;
    (record0: PlainTimeRecord, record1: PlainTimeRecord, roundingMode: RoundingMode): number;
    (record0: PlainTimeRecord, record1: PlainTimeRecord, options: RoundingMathOptions): number;
};
declare const diffNanoseconds: {
    (record0: PlainTimeRecord, record1: PlainTimeRecord): number;
    (record0: PlainTimeRecord, record1: PlainTimeRecord, roundingMode: RoundingMode): number;
    (record0: PlainTimeRecord, record1: PlainTimeRecord, options: RoundingMathOptions): number;
};

export { type DiffOptions, type Format, type FromFields, PlainTimeRecord as Record, type ToStringOptions, type WithFields, add, addHours, addMicroseconds, addMilliseconds, addMinutes, addNanoseconds, addSeconds, compare, create, createFormat, diff, diffHours, diffMicroseconds, diffMilliseconds, diffMinutes, diffNanoseconds, diffSeconds, endOfHour, endOfMicrosecond, endOfMillisecond, endOfMinute, endOfSecond, equals, fromFields, fromString, isRecord, roundToHour, roundToMicrosecond, roundToMillisecond, roundToMinute, roundToSecond, startOfHour, startOfMicrosecond, startOfMillisecond, startOfMinute, startOfSecond, subtract, subtractHours, subtractMicroseconds, subtractMilliseconds, subtractMinutes, subtractNanoseconds, subtractSeconds, toBasicString, toLocaleString, toString, toTemporal, withFields };
