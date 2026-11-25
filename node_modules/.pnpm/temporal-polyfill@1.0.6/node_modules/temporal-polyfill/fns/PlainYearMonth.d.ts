import { Temporal } from 'temporal-spec';
import { YearMonthFields, LocalesArg, DayFields } from '../chunks/internal.js';
import { DateTimeFormatLike, PlainYearMonthRecord, CalendarRecord, OverflowOptions, DurationRecord, PlainDateRecord, RoundingMode, RoundingMathOptions } from '../chunks/funcApi.js';


type Format = DateTimeFormatLike<PlainYearMonthRecord>;
type FromFields = Partial<YearMonthFields & {
    calendar: CalendarRecord;
}>;
type WithFields = Partial<YearMonthFields>;
type DiffOptions = Temporal.RoundingOptionsWithLargestUnit<'year' | 'month'>;
type ToStringOptions = Temporal.PlainDateToStringOptions;
declare const create: (isoYear: number, isoMonth: number, calendar?: CalendarRecord, referenceIsoDay?: number) => PlainYearMonthRecord;
declare const isRecord: (arg: unknown) => arg is PlainYearMonthRecord;
declare const fromFields: (fields: FromFields, options?: OverflowOptions) => PlainYearMonthRecord;
declare const fromString: (s: string, getCalendar: (calendarId: string) => CalendarRecord) => PlainYearMonthRecord;
declare const daysInMonth: (record: PlainYearMonthRecord) => number;
declare const daysInYear: (record: PlainYearMonthRecord) => number;
declare const monthsInYear: (record: PlainYearMonthRecord) => number;
declare const inLeapYear: (record: PlainYearMonthRecord) => boolean;
declare const withFields: (record: PlainYearMonthRecord, mod: WithFields, options?: OverflowOptions) => PlainYearMonthRecord;
declare const add: (record: PlainYearMonthRecord, duration: DurationRecord, options?: OverflowOptions) => PlainYearMonthRecord;
declare const subtract: (record: PlainYearMonthRecord, duration: DurationRecord, options?: OverflowOptions) => PlainYearMonthRecord;
declare const diff: (record: PlainYearMonthRecord, otherRecord: PlainYearMonthRecord, options?: DiffOptions) => DurationRecord;
declare const equals: (record: PlainYearMonthRecord, otherRecord: PlainYearMonthRecord) => boolean;
declare const compare: (record: PlainYearMonthRecord, otherRecord: PlainYearMonthRecord) => number;
declare const createFormat: (locales?: LocalesArg, options?: Intl.DateTimeFormatOptions) => Format;
declare const toLocaleString: (record: PlainYearMonthRecord, locales?: LocalesArg, options?: Intl.DateTimeFormatOptions) => string;
declare const toString: (record: PlainYearMonthRecord, options?: ToStringOptions) => string;
declare const toBasicString: (record: PlainYearMonthRecord) => string;
declare const toPlainDate: (record: PlainYearMonthRecord, fields: DayFields) => PlainDateRecord;
declare const toTemporal: (record: PlainYearMonthRecord) => Temporal.PlainYearMonth;
declare const addYears: (record: PlainYearMonthRecord, years: number, options?: OverflowOptions) => PlainYearMonthRecord;
declare const addMonths: (record: PlainYearMonthRecord, months: number, options?: OverflowOptions) => PlainYearMonthRecord;
declare const subtractYears: (record: PlainYearMonthRecord, years: number, options?: OverflowOptions) => PlainYearMonthRecord;
declare const subtractMonths: (record: PlainYearMonthRecord, months: number, options?: OverflowOptions) => PlainYearMonthRecord;
declare const roundToYear: {
    (record: PlainYearMonthRecord): PlainYearMonthRecord;
    (record: PlainYearMonthRecord, roundingMode: RoundingMode): PlainYearMonthRecord;
    (record: PlainYearMonthRecord, options: RoundingMathOptions): PlainYearMonthRecord;
};
declare const startOfYear: (record: PlainYearMonthRecord) => PlainYearMonthRecord;
declare const endOfYear: (record: PlainYearMonthRecord) => PlainYearMonthRecord;
declare const diffYears: {
    (record0: PlainYearMonthRecord, record1: PlainYearMonthRecord): number;
    (record0: PlainYearMonthRecord, record1: PlainYearMonthRecord, roundingMode: RoundingMode): number;
    (record0: PlainYearMonthRecord, record1: PlainYearMonthRecord, options: RoundingMathOptions): number;
};
declare const diffMonths: {
    (record0: PlainYearMonthRecord, record1: PlainYearMonthRecord): number;
    (record0: PlainYearMonthRecord, record1: PlainYearMonthRecord, roundingMode: RoundingMode): number;
    (record0: PlainYearMonthRecord, record1: PlainYearMonthRecord, options: RoundingMathOptions): number;
};

export { type DiffOptions, type Format, type FromFields, PlainYearMonthRecord as Record, type ToStringOptions, type WithFields, add, addMonths, addYears, compare, create, createFormat, daysInMonth, daysInYear, diff, diffMonths, diffYears, endOfYear, equals, fromFields, fromString, inLeapYear, isRecord, monthsInYear, roundToYear, startOfYear, subtract, subtractMonths, subtractYears, toBasicString, toLocaleString, toPlainDate, toString, toTemporal, withFields };
