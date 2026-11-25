import { Temporal } from 'temporal-spec';

type LocalesArg = string | string[];

type RelativeToOptions<RA> = {
    relativeTo?: RA | undefined;
};
type DurationRoundingOptions<RA> = Omit<Temporal.DurationRoundingOptions, 'relativeTo'> & RelativeToOptions<RA>;
type DurationTotalOptions<RA> = Pick<Temporal.DurationTotalOptions, 'unit'> & RelativeToOptions<RA>;
type InstantStringTimeZoneDisplayOptions = Omit<Temporal.InstantToStringOptions, 'timeZone'> & {
    timeZone?: string | undefined;
};

interface EraYearFields {
    era: string;
    eraYear: number;
}
type YearFields = Partial<EraYearFields> & {
    year: number;
};
interface MonthFields {
    monthCode: string;
    month: number;
}
interface DayFields {
    day: number;
}
type YearMonthFields = YearFields & MonthFields;
type DateFields = YearMonthFields & DayFields;
type MonthDayFields = MonthFields & DayFields;
interface TimeFields {
    hour: number;
    microsecond: number;
    millisecond: number;
    minute: number;
    nanosecond: number;
    second: number;
}
type DateTimeFields = DateFields & TimeFields;
type EraYearOrYear = EraYearFields | {
    year: number;
};

interface DurationDateFields {
    days: number;
    weeks: number;
    months: number;
    years: number;
}
interface DurationTimeFields {
    nanoseconds: number;
    microseconds: number;
    milliseconds: number;
    seconds: number;
    minutes: number;
    hours: number;
}
type DurationFields = DurationDateFields & DurationTimeFields;

declare function getCurrentTimeZoneId(): string;

export { type DateFields, type DateTimeFields, type DayFields, type DurationFields, type DurationRoundingOptions, type DurationTotalOptions, type EraYearOrYear, type InstantStringTimeZoneDisplayOptions, type LocalesArg, type MonthDayFields, type RelativeToOptions, type TimeFields, type YearMonthFields, getCurrentTimeZoneId };
