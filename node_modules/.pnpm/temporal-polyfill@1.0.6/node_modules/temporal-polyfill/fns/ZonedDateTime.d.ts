import { Temporal } from 'temporal-spec';
import { DateTimeFields, LocalesArg } from '../chunks/internal.js';
import { ZonedDateTimeFields, CalendarRecord, ZonedDateTimeRecord, PlainTimeRecord, DurationRecord, OverflowOptions, InstantRecord, PlainDateTimeRecord, PlainDateRecord, RoundingMode, RoundingMathOptions } from '../chunks/funcApi.js';


type FromFields = ZonedDateTimeFields<CalendarRecord>;
type FromOptions = Temporal.ZonedDateTimeFromOptions;
type WithFields = Partial<DateTimeFields>;
type WithOptions = Temporal.ZonedDateTimeFromOptions;
type DiffOptions = Temporal.RoundingOptionsWithLargestUnit<Temporal.DateUnit | Temporal.TimeUnit>;
type ToStringOptions = Temporal.ZonedDateTimeToStringOptions;
type TransitionOptions = Temporal.TransitionOptions;
type TransitionDirection = Temporal.TransitionOptions['direction'];
declare const create: (epochNanoseconds: bigint, timeZoneId: string, calendar?: CalendarRecord) => ZonedDateTimeRecord;
declare const isRecord: (arg: unknown) => arg is ZonedDateTimeRecord;
declare const fromFields: (fields: FromFields, options?: FromOptions) => ZonedDateTimeRecord;
declare const fromString: (s: string, getCalendar: (calendarId: string) => CalendarRecord, options?: FromOptions) => ZonedDateTimeRecord;
declare const withFields: (record: ZonedDateTimeRecord, mod: WithFields, options?: WithOptions) => ZonedDateTimeRecord;
declare const withCalendar: (record: ZonedDateTimeRecord, calendarRecord: CalendarRecord) => ZonedDateTimeRecord;
declare const withTimeZone: (record: ZonedDateTimeRecord, timeZoneId: string) => ZonedDateTimeRecord;
declare const withPlainTime: (record: ZonedDateTimeRecord, plainTimeRecord?: PlainTimeRecord) => ZonedDateTimeRecord;
declare const offsetNanoseconds: (record: ZonedDateTimeRecord) => number;
declare const offset: (record: ZonedDateTimeRecord) => string;
declare const dayOfWeek: (record: ZonedDateTimeRecord) => number;
declare const daysInWeek: (record: ZonedDateTimeRecord) => number;
declare const weekOfYear: (record: ZonedDateTimeRecord) => number | undefined;
declare const yearOfWeek: (record: ZonedDateTimeRecord) => number | undefined;
declare const dayOfYear: (record: ZonedDateTimeRecord) => number;
declare const daysInMonth: (record: ZonedDateTimeRecord) => number;
declare const daysInYear: (record: ZonedDateTimeRecord) => number;
declare const monthsInYear: (record: ZonedDateTimeRecord) => number;
declare const inLeapYear: (record: ZonedDateTimeRecord) => boolean;
declare const hoursInDay: (record: ZonedDateTimeRecord) => number;
declare const toString: (record: ZonedDateTimeRecord, options?: ToStringOptions) => string;
declare const toBasicString: (record: ZonedDateTimeRecord) => string;
declare const add: (record: ZonedDateTimeRecord, duration: DurationRecord, options?: OverflowOptions) => ZonedDateTimeRecord;
declare const subtract: (record: ZonedDateTimeRecord, duration: DurationRecord, options?: OverflowOptions) => ZonedDateTimeRecord;
declare const diff: (record: ZonedDateTimeRecord, otherRecord: ZonedDateTimeRecord, options?: DiffOptions) => DurationRecord;
declare const startOfDay: (record: ZonedDateTimeRecord) => ZonedDateTimeRecord;
declare const getTimeZoneTransition: {
    (record: ZonedDateTimeRecord, direction: TransitionDirection): ZonedDateTimeRecord | null;
    (record: ZonedDateTimeRecord, options: TransitionOptions): ZonedDateTimeRecord | null;
};
declare const equals: (record: ZonedDateTimeRecord, otherRecord: ZonedDateTimeRecord) => boolean;
declare const compare: (record: ZonedDateTimeRecord, otherRecord: ZonedDateTimeRecord) => number;
declare const toLocaleString: (record: ZonedDateTimeRecord, locales?: LocalesArg, options?: Intl.DateTimeFormatOptions) => string;
declare const toInstant: (record: ZonedDateTimeRecord) => InstantRecord;
declare const toPlainDateTime: (record: ZonedDateTimeRecord) => PlainDateTimeRecord;
declare const toPlainDate: (record: ZonedDateTimeRecord) => PlainDateRecord;
declare const toPlainTime: (record: ZonedDateTimeRecord) => PlainTimeRecord;
declare const toTemporal: (record: ZonedDateTimeRecord) => Temporal.ZonedDateTime;
declare const withDayOfYear: (record: ZonedDateTimeRecord, value: number, options?: OverflowOptions) => ZonedDateTimeRecord;
declare const withDayOfMonth: (record: ZonedDateTimeRecord, value: number, options?: OverflowOptions) => ZonedDateTimeRecord;
declare const withDayOfWeek: (record: ZonedDateTimeRecord, value: number, options?: OverflowOptions) => ZonedDateTimeRecord;
declare const withWeekOfYear: (record: ZonedDateTimeRecord, value: number, options?: OverflowOptions) => ZonedDateTimeRecord;
declare const addYears: (record: ZonedDateTimeRecord, value: number, options?: OverflowOptions) => ZonedDateTimeRecord;
declare const addMonths: (record: ZonedDateTimeRecord, value: number, options?: OverflowOptions) => ZonedDateTimeRecord;
declare const addWeeks: (record: ZonedDateTimeRecord, value: number, options?: OverflowOptions) => ZonedDateTimeRecord;
declare const addDays: (record: ZonedDateTimeRecord, value: number, options?: OverflowOptions) => ZonedDateTimeRecord;
declare const addHours: (record: ZonedDateTimeRecord, value: number, options?: OverflowOptions) => ZonedDateTimeRecord;
declare const addMinutes: (record: ZonedDateTimeRecord, value: number, options?: OverflowOptions) => ZonedDateTimeRecord;
declare const addSeconds: (record: ZonedDateTimeRecord, value: number, options?: OverflowOptions) => ZonedDateTimeRecord;
declare const addMilliseconds: (record: ZonedDateTimeRecord, value: number, options?: OverflowOptions) => ZonedDateTimeRecord;
declare const addMicroseconds: (record: ZonedDateTimeRecord, value: number, options?: OverflowOptions) => ZonedDateTimeRecord;
declare const addNanoseconds: (record: ZonedDateTimeRecord, value: number, options?: OverflowOptions) => ZonedDateTimeRecord;
declare const subtractYears: (record: ZonedDateTimeRecord, value: number, options?: OverflowOptions) => ZonedDateTimeRecord;
declare const subtractMonths: (record: ZonedDateTimeRecord, value: number, options?: OverflowOptions) => ZonedDateTimeRecord;
declare const subtractWeeks: (record: ZonedDateTimeRecord, value: number, options?: OverflowOptions) => ZonedDateTimeRecord;
declare const subtractDays: (record: ZonedDateTimeRecord, value: number, options?: OverflowOptions) => ZonedDateTimeRecord;
declare const subtractHours: (record: ZonedDateTimeRecord, value: number, options?: OverflowOptions) => ZonedDateTimeRecord;
declare const subtractMinutes: (record: ZonedDateTimeRecord, value: number, options?: OverflowOptions) => ZonedDateTimeRecord;
declare const subtractSeconds: (record: ZonedDateTimeRecord, value: number, options?: OverflowOptions) => ZonedDateTimeRecord;
declare const subtractMilliseconds: (record: ZonedDateTimeRecord, value: number, options?: OverflowOptions) => ZonedDateTimeRecord;
declare const subtractMicroseconds: (record: ZonedDateTimeRecord, value: number, options?: OverflowOptions) => ZonedDateTimeRecord;
declare const subtractNanoseconds: (record: ZonedDateTimeRecord, value: number, options?: OverflowOptions) => ZonedDateTimeRecord;
declare const roundToYear: {
    (record: ZonedDateTimeRecord): ZonedDateTimeRecord;
    (record: ZonedDateTimeRecord, roundingMode: RoundingMode): ZonedDateTimeRecord;
    (record: ZonedDateTimeRecord, options: RoundingMathOptions): ZonedDateTimeRecord;
};
declare const roundToMonth: {
    (record: ZonedDateTimeRecord): ZonedDateTimeRecord;
    (record: ZonedDateTimeRecord, roundingMode: RoundingMode): ZonedDateTimeRecord;
    (record: ZonedDateTimeRecord, options: RoundingMathOptions): ZonedDateTimeRecord;
};
declare const roundToWeek: {
    (record: ZonedDateTimeRecord): ZonedDateTimeRecord;
    (record: ZonedDateTimeRecord, roundingMode: RoundingMode): ZonedDateTimeRecord;
    (record: ZonedDateTimeRecord, options: RoundingMathOptions): ZonedDateTimeRecord;
};
declare const roundToDay: {
    (record: ZonedDateTimeRecord): ZonedDateTimeRecord;
    (record: ZonedDateTimeRecord, roundingMode: RoundingMode): ZonedDateTimeRecord;
    (record: ZonedDateTimeRecord, options: RoundingMathOptions): ZonedDateTimeRecord;
};
declare const roundToHour: {
    (record: ZonedDateTimeRecord): ZonedDateTimeRecord;
    (record: ZonedDateTimeRecord, roundingMode: RoundingMode): ZonedDateTimeRecord;
    (record: ZonedDateTimeRecord, options: RoundingMathOptions): ZonedDateTimeRecord;
};
declare const roundToMinute: {
    (record: ZonedDateTimeRecord): ZonedDateTimeRecord;
    (record: ZonedDateTimeRecord, roundingMode: RoundingMode): ZonedDateTimeRecord;
    (record: ZonedDateTimeRecord, options: RoundingMathOptions): ZonedDateTimeRecord;
};
declare const roundToSecond: {
    (record: ZonedDateTimeRecord): ZonedDateTimeRecord;
    (record: ZonedDateTimeRecord, roundingMode: RoundingMode): ZonedDateTimeRecord;
    (record: ZonedDateTimeRecord, options: RoundingMathOptions): ZonedDateTimeRecord;
};
declare const roundToMillisecond: {
    (record: ZonedDateTimeRecord): ZonedDateTimeRecord;
    (record: ZonedDateTimeRecord, roundingMode: RoundingMode): ZonedDateTimeRecord;
    (record: ZonedDateTimeRecord, options: RoundingMathOptions): ZonedDateTimeRecord;
};
declare const roundToMicrosecond: {
    (record: ZonedDateTimeRecord): ZonedDateTimeRecord;
    (record: ZonedDateTimeRecord, roundingMode: RoundingMode): ZonedDateTimeRecord;
    (record: ZonedDateTimeRecord, options: RoundingMathOptions): ZonedDateTimeRecord;
};
declare const startOfYear: (record: ZonedDateTimeRecord) => ZonedDateTimeRecord;
declare const startOfMonth: (record: ZonedDateTimeRecord) => ZonedDateTimeRecord;
declare const startOfWeek: (record: ZonedDateTimeRecord) => ZonedDateTimeRecord;
declare const startOfHour: (record: ZonedDateTimeRecord) => ZonedDateTimeRecord;
declare const startOfMinute: (record: ZonedDateTimeRecord) => ZonedDateTimeRecord;
declare const startOfSecond: (record: ZonedDateTimeRecord) => ZonedDateTimeRecord;
declare const startOfMillisecond: (record: ZonedDateTimeRecord) => ZonedDateTimeRecord;
declare const startOfMicrosecond: (record: ZonedDateTimeRecord) => ZonedDateTimeRecord;
declare const endOfYear: (record: ZonedDateTimeRecord) => ZonedDateTimeRecord;
declare const endOfMonth: (record: ZonedDateTimeRecord) => ZonedDateTimeRecord;
declare const endOfWeek: (record: ZonedDateTimeRecord) => ZonedDateTimeRecord;
declare const endOfDay: (record: ZonedDateTimeRecord) => ZonedDateTimeRecord;
declare const endOfHour: (record: ZonedDateTimeRecord) => ZonedDateTimeRecord;
declare const endOfMinute: (record: ZonedDateTimeRecord) => ZonedDateTimeRecord;
declare const endOfSecond: (record: ZonedDateTimeRecord) => ZonedDateTimeRecord;
declare const endOfMillisecond: (record: ZonedDateTimeRecord) => ZonedDateTimeRecord;
declare const endOfMicrosecond: (record: ZonedDateTimeRecord) => ZonedDateTimeRecord;
declare const diffYears: {
    (record0: ZonedDateTimeRecord, record1: ZonedDateTimeRecord): number;
    (record0: ZonedDateTimeRecord, record1: ZonedDateTimeRecord, roundingMode: RoundingMode): number;
    (record0: ZonedDateTimeRecord, record1: ZonedDateTimeRecord, options: RoundingMathOptions): number;
};
declare const diffMonths: {
    (record0: ZonedDateTimeRecord, record1: ZonedDateTimeRecord): number;
    (record0: ZonedDateTimeRecord, record1: ZonedDateTimeRecord, roundingMode: RoundingMode): number;
    (record0: ZonedDateTimeRecord, record1: ZonedDateTimeRecord, options: RoundingMathOptions): number;
};
declare const diffWeeks: {
    (record0: ZonedDateTimeRecord, record1: ZonedDateTimeRecord): number;
    (record0: ZonedDateTimeRecord, record1: ZonedDateTimeRecord, roundingMode: RoundingMode): number;
    (record0: ZonedDateTimeRecord, record1: ZonedDateTimeRecord, options: RoundingMathOptions): number;
};
declare const diffDays: {
    (record0: ZonedDateTimeRecord, record1: ZonedDateTimeRecord): number;
    (record0: ZonedDateTimeRecord, record1: ZonedDateTimeRecord, roundingMode: RoundingMode): number;
    (record0: ZonedDateTimeRecord, record1: ZonedDateTimeRecord, options: RoundingMathOptions): number;
};
declare const diffHours: {
    (record0: ZonedDateTimeRecord, record1: ZonedDateTimeRecord): number;
    (record0: ZonedDateTimeRecord, record1: ZonedDateTimeRecord, roundingMode: RoundingMode): number;
    (record0: ZonedDateTimeRecord, record1: ZonedDateTimeRecord, options: RoundingMathOptions): number;
};
declare const diffMinutes: {
    (record0: ZonedDateTimeRecord, record1: ZonedDateTimeRecord): number;
    (record0: ZonedDateTimeRecord, record1: ZonedDateTimeRecord, roundingMode: RoundingMode): number;
    (record0: ZonedDateTimeRecord, record1: ZonedDateTimeRecord, options: RoundingMathOptions): number;
};
declare const diffSeconds: {
    (record0: ZonedDateTimeRecord, record1: ZonedDateTimeRecord): number;
    (record0: ZonedDateTimeRecord, record1: ZonedDateTimeRecord, roundingMode: RoundingMode): number;
    (record0: ZonedDateTimeRecord, record1: ZonedDateTimeRecord, options: RoundingMathOptions): number;
};
declare const diffMilliseconds: {
    (record0: ZonedDateTimeRecord, record1: ZonedDateTimeRecord): number;
    (record0: ZonedDateTimeRecord, record1: ZonedDateTimeRecord, roundingMode: RoundingMode): number;
    (record0: ZonedDateTimeRecord, record1: ZonedDateTimeRecord, options: RoundingMathOptions): number;
};
declare const diffMicroseconds: {
    (record0: ZonedDateTimeRecord, record1: ZonedDateTimeRecord): number;
    (record0: ZonedDateTimeRecord, record1: ZonedDateTimeRecord, roundingMode: RoundingMode): number;
    (record0: ZonedDateTimeRecord, record1: ZonedDateTimeRecord, options: RoundingMathOptions): number;
};
declare const diffNanoseconds: {
    (record0: ZonedDateTimeRecord, record1: ZonedDateTimeRecord): number;
    (record0: ZonedDateTimeRecord, record1: ZonedDateTimeRecord, roundingMode: RoundingMode): number;
    (record0: ZonedDateTimeRecord, record1: ZonedDateTimeRecord, options: RoundingMathOptions): number;
};

export { type DiffOptions, type FromFields, type FromOptions, ZonedDateTimeRecord as Record, type ToStringOptions, type TransitionDirection, type TransitionOptions, type WithFields, type WithOptions, add, addDays, addHours, addMicroseconds, addMilliseconds, addMinutes, addMonths, addNanoseconds, addSeconds, addWeeks, addYears, compare, create, dayOfWeek, dayOfYear, daysInMonth, daysInWeek, daysInYear, diff, diffDays, diffHours, diffMicroseconds, diffMilliseconds, diffMinutes, diffMonths, diffNanoseconds, diffSeconds, diffWeeks, diffYears, endOfDay, endOfHour, endOfMicrosecond, endOfMillisecond, endOfMinute, endOfMonth, endOfSecond, endOfWeek, endOfYear, equals, fromFields, fromString, getTimeZoneTransition, hoursInDay, inLeapYear, isRecord, monthsInYear, offset, offsetNanoseconds, roundToDay, roundToHour, roundToMicrosecond, roundToMillisecond, roundToMinute, roundToMonth, roundToSecond, roundToWeek, roundToYear, startOfDay, startOfHour, startOfMicrosecond, startOfMillisecond, startOfMinute, startOfMonth, startOfSecond, startOfWeek, startOfYear, subtract, subtractDays, subtractHours, subtractMicroseconds, subtractMilliseconds, subtractMinutes, subtractMonths, subtractNanoseconds, subtractSeconds, subtractWeeks, subtractYears, toBasicString, toInstant, toLocaleString, toPlainDate, toPlainDateTime, toPlainTime, toString, toTemporal, weekOfYear, withCalendar, withDayOfMonth, withDayOfWeek, withDayOfYear, withFields, withPlainTime, withTimeZone, withWeekOfYear, yearOfWeek };
