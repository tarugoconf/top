import { Temporal } from 'temporal-spec';
import { InstantStringTimeZoneDisplayOptions, LocalesArg } from '../chunks/internal.js';
import { DateTimeFormatLike, InstantRecord, DurationRecord, ZonedDateTimeRecord, RoundingMode, RoundingMathOptions } from '../chunks/funcApi.js';


type Format = DateTimeFormatLike<InstantRecord>;
type DiffOptions = Temporal.RoundingOptionsWithLargestUnit<Temporal.TimeUnit>;
type ToStringOptions = InstantStringTimeZoneDisplayOptions;
declare const create: (epochNanoseconds: bigint) => InstantRecord;
declare const isRecord: (arg: unknown) => arg is InstantRecord;
declare const fromEpochMilliseconds: (epochMilliseconds: number) => InstantRecord;
declare const fromEpochNanoseconds: (epochNanoseconds: bigint) => InstantRecord;
declare const fromString: (s: string) => InstantRecord;
declare const add: (record: InstantRecord, durationRecord: DurationRecord) => InstantRecord;
declare const subtract: (record: InstantRecord, durationRecord: DurationRecord) => InstantRecord;
declare const diff: (record: InstantRecord, otherRecord: InstantRecord, options?: DiffOptions) => DurationRecord;
declare const equals: (record: InstantRecord, otherRecord: InstantRecord) => boolean;
declare const compare: (record: InstantRecord, otherRecord: InstantRecord) => number;
declare const toZonedDateTimeISO: (record: InstantRecord, timeZoneId: string) => ZonedDateTimeRecord;
declare const createFormat: (locales?: LocalesArg, options?: Intl.DateTimeFormatOptions) => Format;
declare const toLocaleString: (record: InstantRecord, locales?: LocalesArg, options?: Intl.DateTimeFormatOptions) => string;
declare const toString: (record: InstantRecord, options?: ToStringOptions) => string;
declare const toBasicString: (record: InstantRecord) => string;
declare const toTemporal: (record: InstantRecord) => Temporal.Instant;
declare const addHours: (record: InstantRecord, hours: number) => InstantRecord;
declare const addMinutes: (record: InstantRecord, minutes: number) => InstantRecord;
declare const addSeconds: (record: InstantRecord, seconds: number) => InstantRecord;
declare const addMilliseconds: (record: InstantRecord, milliseconds: number) => InstantRecord;
declare const addMicroseconds: (record: InstantRecord, microseconds: number) => InstantRecord;
declare const addNanoseconds: (record: InstantRecord, nanoseconds: number) => InstantRecord;
declare const subtractHours: (record: InstantRecord, hours: number) => InstantRecord;
declare const subtractMinutes: (record: InstantRecord, minutes: number) => InstantRecord;
declare const subtractSeconds: (record: InstantRecord, seconds: number) => InstantRecord;
declare const subtractMilliseconds: (record: InstantRecord, milliseconds: number) => InstantRecord;
declare const subtractMicroseconds: (record: InstantRecord, microseconds: number) => InstantRecord;
declare const subtractNanoseconds: (record: InstantRecord, nanoseconds: number) => InstantRecord;
declare const roundToHour: {
    (record: InstantRecord): InstantRecord;
    (record: InstantRecord, roundingMode: RoundingMode): InstantRecord;
    (record: InstantRecord, options: RoundingMathOptions): InstantRecord;
};
declare const roundToMinute: {
    (record: InstantRecord): InstantRecord;
    (record: InstantRecord, roundingMode: RoundingMode): InstantRecord;
    (record: InstantRecord, options: RoundingMathOptions): InstantRecord;
};
declare const roundToSecond: {
    (record: InstantRecord): InstantRecord;
    (record: InstantRecord, roundingMode: RoundingMode): InstantRecord;
    (record: InstantRecord, options: RoundingMathOptions): InstantRecord;
};
declare const roundToMillisecond: {
    (record: InstantRecord): InstantRecord;
    (record: InstantRecord, roundingMode: RoundingMode): InstantRecord;
    (record: InstantRecord, options: RoundingMathOptions): InstantRecord;
};
declare const roundToMicrosecond: {
    (record: InstantRecord): InstantRecord;
    (record: InstantRecord, roundingMode: RoundingMode): InstantRecord;
    (record: InstantRecord, options: RoundingMathOptions): InstantRecord;
};
declare const diffHours: {
    (record0: InstantRecord, record1: InstantRecord): number;
    (record0: InstantRecord, record1: InstantRecord, roundingMode: RoundingMode): number;
    (record0: InstantRecord, record1: InstantRecord, options: RoundingMathOptions): number;
};
declare const diffMinutes: {
    (record0: InstantRecord, record1: InstantRecord): number;
    (record0: InstantRecord, record1: InstantRecord, roundingMode: RoundingMode): number;
    (record0: InstantRecord, record1: InstantRecord, options: RoundingMathOptions): number;
};
declare const diffSeconds: {
    (record0: InstantRecord, record1: InstantRecord): number;
    (record0: InstantRecord, record1: InstantRecord, roundingMode: RoundingMode): number;
    (record0: InstantRecord, record1: InstantRecord, options: RoundingMathOptions): number;
};
declare const diffMilliseconds: {
    (record0: InstantRecord, record1: InstantRecord): number;
    (record0: InstantRecord, record1: InstantRecord, roundingMode: RoundingMode): number;
    (record0: InstantRecord, record1: InstantRecord, options: RoundingMathOptions): number;
};
declare const diffMicroseconds: {
    (record0: InstantRecord, record1: InstantRecord): number;
    (record0: InstantRecord, record1: InstantRecord, roundingMode: RoundingMode): number;
    (record0: InstantRecord, record1: InstantRecord, options: RoundingMathOptions): number;
};
declare const diffNanoseconds: {
    (record0: InstantRecord, record1: InstantRecord): number;
    (record0: InstantRecord, record1: InstantRecord, roundingMode: RoundingMode): number;
    (record0: InstantRecord, record1: InstantRecord, options: RoundingMathOptions): number;
};

export { type DiffOptions, type Format, InstantRecord as Record, type ToStringOptions, add, addHours, addMicroseconds, addMilliseconds, addMinutes, addNanoseconds, addSeconds, compare, create, createFormat, diff, diffHours, diffMicroseconds, diffMilliseconds, diffMinutes, diffNanoseconds, diffSeconds, equals, fromEpochMilliseconds, fromEpochNanoseconds, fromString, isRecord, roundToHour, roundToMicrosecond, roundToMillisecond, roundToMinute, roundToSecond, subtract, subtractHours, subtractMicroseconds, subtractMilliseconds, subtractMinutes, subtractNanoseconds, subtractSeconds, toBasicString, toLocaleString, toString, toTemporal, toZonedDateTimeISO };
