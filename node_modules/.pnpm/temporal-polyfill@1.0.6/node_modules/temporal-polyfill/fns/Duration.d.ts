import { Temporal } from 'temporal-spec';
import { DurationFields, DurationRoundingOptions, DurationTotalOptions as DurationTotalOptions$1, RelativeToOptions as RelativeToOptions$1, LocalesArg } from '../chunks/internal.js';
import { RelativeToRecord, ZonedDateTimeRecord, PlainDateTimeRecord, PlainDateRecord, DurationRecord } from '../chunks/funcApi.js';


type FromFields = Partial<DurationFields>;
type WithFields = Partial<DurationFields>;
type ToStringOptions = Temporal.DurationToStringOptions;
type RoundingUnit = Temporal.PluralizeUnit<'day' | Temporal.TimeUnit>;
type RoundingOptions = DurationRoundingOptions<RelativeTo>;
type TotalUnit = Temporal.PluralizeUnit<'day' | Temporal.TimeUnit>;
type DurationTotalOptions = DurationTotalOptions$1<RelativeTo>;
type RelativeToOptions = RelativeToOptions$1<RelativeTo>;
type RelativeTo = RelativeToRecord<ZonedDateTimeRecord, PlainDateTimeRecord, PlainDateRecord>;
declare const create: (years?: number, months?: number, weeks?: number, days?: number, hours?: number, minutes?: number, seconds?: number, milliseconds?: number, microseconds?: number, nanoseconds?: number) => DurationRecord;
declare const isRecord: (arg: unknown) => arg is DurationRecord;
declare const fromFields: (fields: FromFields) => DurationRecord;
declare const fromString: (s: string) => DurationRecord;
declare const sign: (duration: DurationRecord) => number;
declare const blank: (duration: DurationRecord) => boolean;
declare const withFields: (duration: DurationRecord, mod: WithFields) => DurationRecord;
declare const negated: (duration: DurationRecord) => DurationRecord;
declare const abs: (duration: DurationRecord) => DurationRecord;
declare const add: (duration: DurationRecord, otherDuration: DurationRecord) => DurationRecord;
declare const subtract: (duration: DurationRecord, otherDuration: DurationRecord) => DurationRecord;
declare const round: {
    (duration: DurationRecord, unit: RoundingUnit): DurationRecord;
    (duration: DurationRecord, options: RoundingOptions): DurationRecord;
};
declare const total: {
    (duration: DurationRecord, unit: TotalUnit): number;
    (duration: DurationRecord, options: DurationTotalOptions): number;
};
declare const compare: (duration: DurationRecord, otherDuration: DurationRecord, options?: RelativeToOptions) => number;
declare const toLocaleString: (duration: DurationRecord, locales?: LocalesArg, options?: Intl.DateTimeFormatOptions) => string;
declare const toString: (duration: DurationRecord, options?: ToStringOptions) => string;
declare const toBasicString: (duration: DurationRecord) => string;
declare const toTemporal: (duration: DurationRecord) => Temporal.Duration;

export { type DurationTotalOptions, type FromFields, DurationRecord as Record, type RelativeToOptions, type RoundingOptions, type RoundingUnit, type ToStringOptions, type TotalUnit, type WithFields, abs, add, blank, compare, create, fromFields, fromString, isRecord, negated, round, sign, subtract, toBasicString, toLocaleString, toString, toTemporal, total, withFields };
