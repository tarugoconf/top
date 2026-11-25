import { RoundingMathOptions, RoundingMode } from './utils';
type DiffFunc<T extends Temporal.Instant | Temporal.PlainTime | Temporal.PlainYearMonth | Temporal.PlainDate | Temporal.PlainDateTime | Temporal.ZonedDateTime = Temporal.Instant | Temporal.PlainTime | Temporal.PlainYearMonth | Temporal.PlainDate | Temporal.PlainDateTime | Temporal.ZonedDateTime> = {
    (date0: T, date1: T): number;
    (date0: T, date1: T, roundingMode: RoundingMode): number;
    (date0: T, date1: T, options: RoundingMathOptions): number;
};
export declare const diffYears: DiffFunc<Temporal.PlainYearMonth | Temporal.PlainDate | Temporal.PlainDateTime | Temporal.ZonedDateTime>;
export declare const diffMonths: DiffFunc<Temporal.PlainYearMonth | Temporal.PlainDate | Temporal.PlainDateTime | Temporal.ZonedDateTime>;
export declare const diffWeeks: DiffFunc<Temporal.PlainDate | Temporal.PlainDateTime | Temporal.ZonedDateTime>;
export declare const diffDays: DiffFunc<Temporal.PlainDate | Temporal.PlainDateTime | Temporal.ZonedDateTime>;
export declare const diffHours: DiffFunc<Temporal.Instant | Temporal.PlainTime | Temporal.PlainDateTime | Temporal.ZonedDateTime>;
export declare const diffMinutes: DiffFunc<Temporal.Instant | Temporal.PlainTime | Temporal.PlainDateTime | Temporal.ZonedDateTime>;
export declare const diffSeconds: DiffFunc<Temporal.Instant | Temporal.PlainTime | Temporal.PlainDateTime | Temporal.ZonedDateTime>;
export declare const diffMilliseconds: DiffFunc<Temporal.Instant | Temporal.PlainTime | Temporal.PlainDateTime | Temporal.ZonedDateTime>;
export declare const diffMicroseconds: DiffFunc<Temporal.Instant | Temporal.PlainTime | Temporal.PlainDateTime | Temporal.ZonedDateTime>;
export declare const diffNanoseconds: DiffFunc<Temporal.Instant | Temporal.PlainTime | Temporal.PlainDateTime | Temporal.ZonedDateTime>;
export {};
