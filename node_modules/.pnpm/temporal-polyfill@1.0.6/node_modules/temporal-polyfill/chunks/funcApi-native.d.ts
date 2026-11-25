import { PlainTimeRecord, PlainDateTimeRecord, PlainDateRecord, ZonedDateTimeRecord, InstantRecord } from './funcApi.js';

type NativePlainTimeRecord = InstanceType<typeof NativePlainTimeRecord> & PlainTimeRecord;
declare const NativePlainTimeRecord: {
    new (): {
        toJSON(): string;
        valueOf(): never;
    };
} & (new () => {
    toJSON(): string;
    valueOf(): never;
} & {
    readonly hour: any;
    readonly minute: any;
    readonly second: any;
    readonly millisecond: any;
    readonly microsecond: any;
    readonly nanosecond: any;
});

type NativePlainDateTimeRecord = InstanceType<typeof NativePlainDateTimeRecord> & PlainDateTimeRecord;
declare const NativePlainDateTimeRecord: {
    new (): {
        readonly calendarId: string;
        toJSON(): string;
        valueOf(): never;
    };
} & (new () => {
    readonly calendarId: string;
    toJSON(): string;
    valueOf(): never;
} & {
    readonly year: any;
    readonly era?: any;
    readonly eraYear?: any;
    readonly month: any;
    readonly monthCode: any;
    readonly day: any;
} & {
    readonly hour: any;
    readonly minute: any;
    readonly second: any;
    readonly millisecond: any;
    readonly microsecond: any;
    readonly nanosecond: any;
});

type NativePlainDateRecord = InstanceType<typeof NativePlainDateRecord> & PlainDateRecord;
declare const NativePlainDateRecord: {
    new (): {
        readonly calendarId: string;
        toJSON(): string;
        valueOf(): never;
    };
} & (new () => {
    readonly calendarId: string;
    toJSON(): string;
    valueOf(): never;
} & {
    readonly year: any;
    readonly era?: any;
    readonly eraYear?: any;
    readonly month: any;
    readonly monthCode: any;
    readonly day: any;
});

type NativeZonedDateTimeRecord = InstanceType<typeof NativeZonedDateTimeRecord> & ZonedDateTimeRecord;
declare const NativeZonedDateTimeRecord: {
    new (): {
        readonly calendarId: string;
        readonly timeZoneId: string;
        readonly epochMilliseconds: number;
        readonly epochNanoseconds: bigint;
        toJSON(): string;
        valueOf(): never;
    };
} & (new () => {
    readonly calendarId: string;
    readonly timeZoneId: string;
    readonly epochMilliseconds: number;
    readonly epochNanoseconds: bigint;
    toJSON(): string;
    valueOf(): never;
} & {
    readonly year: any;
    readonly era?: any;
    readonly eraYear?: any;
    readonly month: any;
    readonly monthCode: any;
    readonly day: any;
} & {
    readonly hour: any;
    readonly minute: any;
    readonly second: any;
    readonly millisecond: any;
    readonly microsecond: any;
    readonly nanosecond: any;
});

type NativeInstantRecord = InstanceType<typeof NativeInstantRecord> & InstantRecord;
declare const NativeInstantRecord: {
    new (): {
        readonly epochMilliseconds: number;
        readonly epochNanoseconds: bigint;
        toJSON(): string;
        valueOf(): never;
    };
};

declare function instant(): NativeInstantRecord;
declare function zonedDateTimeISO(timeZoneId?: string): NativeZonedDateTimeRecord;
declare function plainDateTimeISO(timeZoneId?: string): NativePlainDateTimeRecord;
declare function plainDateISO(timeZoneId?: string): NativePlainDateRecord;
declare function plainTimeISO(timeZoneId?: string): NativePlainTimeRecord;

export { instant, plainDateISO, plainDateTimeISO, plainTimeISO, zonedDateTimeISO };
