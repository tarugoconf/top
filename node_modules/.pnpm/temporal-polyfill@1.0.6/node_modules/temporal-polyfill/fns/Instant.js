import { NativeTemporal } from "../chunks/root.js";

import { create as create$1, fromEpochMilliseconds as fromEpochMilliseconds$1, fromEpochNanoseconds as fromEpochNanoseconds$1, fromString as fromString$1, add as add$1, subtract as subtract$1, diff as diff$1, equals as equals$1, compare as compare$1, toZonedDateTimeISO as toZonedDateTimeISO$1, createFormat as createFormat$1, toLocaleString as toLocaleString$1, toString as toString$1, toBasicString as toBasicString$1, toTemporal as toTemporal$1, addHours as addHours$1, addMinutes as addMinutes$1, addSeconds as addSeconds$1, addMilliseconds as addMilliseconds$1, addMicroseconds as addMicroseconds$1, addNanoseconds as addNanoseconds$1, subtractHours as subtractHours$1, subtractMinutes as subtractMinutes$1, subtractSeconds as subtractSeconds$1, subtractMilliseconds as subtractMilliseconds$1, subtractMicroseconds as subtractMicroseconds$1, subtractNanoseconds as subtractNanoseconds$1, roundToHour as roundToHour$1, roundToMinute as roundToMinute$1, roundToSecond as roundToSecond$1, roundToMillisecond as roundToMillisecond$1, roundToMicrosecond as roundToMicrosecond$1, diffHours as diffHours$1, diffMinutes as diffMinutes$1, diffSeconds as diffSeconds$1, diffMilliseconds as diffMilliseconds$1, diffMicroseconds as diffMicroseconds$1, diffNanoseconds as diffNanoseconds$1 } from "../chunks/funcApi-native.js";

import { create as create$2, fromEpochMilliseconds as fromEpochMilliseconds$2, fromEpochNanoseconds as fromEpochNanoseconds$2, fromString as fromString$2, add as add$2, subtract as subtract$2, diff as diff$2, equals as equals$2, compare as compare$2, toZonedDateTimeISO as toZonedDateTimeISO$2, createFormat as createFormat$2, toLocaleString as toLocaleString$2, toString as toString$2, toBasicString as toBasicString$2, toTemporal as toTemporal$2, addHours as addHours$2, addMinutes as addMinutes$2, addSeconds as addSeconds$2, addMilliseconds as addMilliseconds$2, addMicroseconds as addMicroseconds$2, addNanoseconds as addNanoseconds$2, subtractHours as subtractHours$2, subtractMinutes as subtractMinutes$2, subtractSeconds as subtractSeconds$2, subtractMilliseconds as subtractMilliseconds$2, subtractMicroseconds as subtractMicroseconds$2, subtractNanoseconds as subtractNanoseconds$2, roundToHour as roundToHour$2, roundToMinute as roundToMinute$2, roundToSecond as roundToSecond$2, roundToMillisecond as roundToMillisecond$2, roundToMicrosecond as roundToMicrosecond$2, diffHours as diffHours$2, diffMinutes as diffMinutes$2, diffSeconds as diffSeconds$2, diffMilliseconds as diffMilliseconds$2, diffMicroseconds as diffMicroseconds$2, diffNanoseconds as diffNanoseconds$2 } from "../chunks/funcApi-shim.js";

import { isInstantRecord } from "../chunks/funcApi.js";

const create = NativeTemporal ? create$1 : create$2;

const isRecord = isInstantRecord;

const fromEpochMilliseconds = NativeTemporal ? fromEpochMilliseconds$1 : fromEpochMilliseconds$2;

const fromEpochNanoseconds = NativeTemporal ? fromEpochNanoseconds$1 : fromEpochNanoseconds$2;

const fromString = NativeTemporal ? fromString$1 : fromString$2;

const add = NativeTemporal ? add$1 : add$2;

const subtract = NativeTemporal ? subtract$1 : subtract$2;

const diff = NativeTemporal ? diff$1 : diff$2;

const equals = NativeTemporal ? equals$1 : equals$2;

const compare = NativeTemporal ? compare$1 : compare$2;

const toZonedDateTimeISO = NativeTemporal ? toZonedDateTimeISO$1 : toZonedDateTimeISO$2;

const createFormat = NativeTemporal ? createFormat$1 : createFormat$2;

const toLocaleString = NativeTemporal ? toLocaleString$1 : toLocaleString$2;

const toString = NativeTemporal ? toString$1 : toString$2;

const toBasicString = NativeTemporal ? toBasicString$1 : toBasicString$2;

const toTemporal = NativeTemporal ? toTemporal$1 : toTemporal$2;

const addHours = NativeTemporal ? addHours$1 : addHours$2;

const addMinutes = NativeTemporal ? addMinutes$1 : addMinutes$2;

const addSeconds = NativeTemporal ? addSeconds$1 : addSeconds$2;

const addMilliseconds = NativeTemporal ? addMilliseconds$1 : addMilliseconds$2;

const addMicroseconds = NativeTemporal ? addMicroseconds$1 : addMicroseconds$2;

const addNanoseconds = NativeTemporal ? addNanoseconds$1 : addNanoseconds$2;

const subtractHours = NativeTemporal ? subtractHours$1 : subtractHours$2;

const subtractMinutes = NativeTemporal ? subtractMinutes$1 : subtractMinutes$2;

const subtractSeconds = NativeTemporal ? subtractSeconds$1 : subtractSeconds$2;

const subtractMilliseconds = NativeTemporal ? subtractMilliseconds$1 : subtractMilliseconds$2;

const subtractMicroseconds = NativeTemporal ? subtractMicroseconds$1 : subtractMicroseconds$2;

const subtractNanoseconds = NativeTemporal ? subtractNanoseconds$1 : subtractNanoseconds$2;

const roundToHour = NativeTemporal ? roundToHour$1 : roundToHour$2;

const roundToMinute = NativeTemporal ? roundToMinute$1 : roundToMinute$2;

const roundToSecond = NativeTemporal ? roundToSecond$1 : roundToSecond$2;

const roundToMillisecond = NativeTemporal ? roundToMillisecond$1 : roundToMillisecond$2;

const roundToMicrosecond = NativeTemporal ? roundToMicrosecond$1 : roundToMicrosecond$2;

const diffHours = NativeTemporal ? diffHours$1 : diffHours$2;

const diffMinutes = NativeTemporal ? diffMinutes$1 : diffMinutes$2;

const diffSeconds = NativeTemporal ? diffSeconds$1 : diffSeconds$2;

const diffMilliseconds = NativeTemporal ? diffMilliseconds$1 : diffMilliseconds$2;

const diffMicroseconds = NativeTemporal ? diffMicroseconds$1 : diffMicroseconds$2;

const diffNanoseconds = NativeTemporal ? diffNanoseconds$1 : diffNanoseconds$2;

export { add, addHours, addMicroseconds, addMilliseconds, addMinutes, addNanoseconds, addSeconds, compare, create, createFormat, diff, diffHours, diffMicroseconds, diffMilliseconds, diffMinutes, diffNanoseconds, diffSeconds, equals, fromEpochMilliseconds, fromEpochNanoseconds, fromString, isRecord, roundToHour, roundToMicrosecond, roundToMillisecond, roundToMinute, roundToSecond, subtract, subtractHours, subtractMicroseconds, subtractMilliseconds, subtractMinutes, subtractNanoseconds, subtractSeconds, toBasicString, toLocaleString, toString, toTemporal, toZonedDateTimeISO };
