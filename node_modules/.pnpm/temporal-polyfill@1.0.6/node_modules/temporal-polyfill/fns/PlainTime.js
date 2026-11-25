import { NativeTemporal } from "../chunks/root.js";

import { create$4 as create$1, fromFields$3 as fromFields$1, fromString$4 as fromString$1, withFields$3 as withFields$1, add$4 as add$1, subtract$4 as subtract$1, diff$4 as diff$1, equals$4 as equals$1, compare$4 as compare$1, createFormat$3 as createFormat$1, toLocaleString$4 as toLocaleString$1, toString$4 as toString$1, toBasicString$4 as toBasicString$1, toTemporal$4 as toTemporal$1, addHours$3 as addHours$1, addMinutes$3 as addMinutes$1, addSeconds$3 as addSeconds$1, addMilliseconds$3 as addMilliseconds$1, addMicroseconds$3 as addMicroseconds$1, addNanoseconds$3 as addNanoseconds$1, subtractHours$3 as subtractHours$1, subtractMinutes$3 as subtractMinutes$1, subtractSeconds$3 as subtractSeconds$1, subtractMilliseconds$3 as subtractMilliseconds$1, subtractMicroseconds$3 as subtractMicroseconds$1, subtractNanoseconds$3 as subtractNanoseconds$1, roundToHour$3 as roundToHour$1, roundToMinute$3 as roundToMinute$1, roundToSecond$3 as roundToSecond$1, roundToMillisecond$3 as roundToMillisecond$1, roundToMicrosecond$3 as roundToMicrosecond$1, startOfHour$2 as startOfHour$1, startOfMinute$2 as startOfMinute$1, startOfSecond$2 as startOfSecond$1, startOfMillisecond$2 as startOfMillisecond$1, startOfMicrosecond$2 as startOfMicrosecond$1, endOfHour$2 as endOfHour$1, endOfMinute$2 as endOfMinute$1, endOfSecond$2 as endOfSecond$1, endOfMillisecond$2 as endOfMillisecond$1, endOfMicrosecond$2 as endOfMicrosecond$1, diffHours$3 as diffHours$1, diffMinutes$3 as diffMinutes$1, diffSeconds$3 as diffSeconds$1, diffMilliseconds$3 as diffMilliseconds$1, diffMicroseconds$3 as diffMicroseconds$1, diffNanoseconds$3 as diffNanoseconds$1 } from "../chunks/funcApi-native.js";

import { create$4 as create$2, fromFields$3 as fromFields$2, fromString$4 as fromString$2, withFields$3 as withFields$2, add$4 as add$2, subtract$4 as subtract$2, diff$4 as diff$2, equals$4 as equals$2, compare$4 as compare$2, createFormat$3 as createFormat$2, toLocaleString$4 as toLocaleString$2, toString$4 as toString$2, toBasicString$4 as toBasicString$2, toTemporal$4 as toTemporal$2, addHours$3 as addHours$2, addMinutes$3 as addMinutes$2, addSeconds$3 as addSeconds$2, addMilliseconds$3 as addMilliseconds$2, addMicroseconds$3 as addMicroseconds$2, addNanoseconds$3 as addNanoseconds$2, subtractHours$3 as subtractHours$2, subtractMinutes$3 as subtractMinutes$2, subtractSeconds$3 as subtractSeconds$2, subtractMilliseconds$3 as subtractMilliseconds$2, subtractMicroseconds$3 as subtractMicroseconds$2, subtractNanoseconds$3 as subtractNanoseconds$2, roundToHour$3 as roundToHour$2, roundToMinute$3 as roundToMinute$2, roundToSecond$3 as roundToSecond$2, roundToMillisecond$3 as roundToMillisecond$2, roundToMicrosecond$3 as roundToMicrosecond$2, startOfHour$2, startOfMinute$2, startOfSecond$2, startOfMillisecond$2, startOfMicrosecond$2, endOfHour$2, endOfMinute$2, endOfSecond$2, endOfMillisecond$2, endOfMicrosecond$2, diffHours$3 as diffHours$2, diffMinutes$3 as diffMinutes$2, diffSeconds$3 as diffSeconds$2, diffMilliseconds$3 as diffMilliseconds$2, diffMicroseconds$3 as diffMicroseconds$2, diffNanoseconds$3 as diffNanoseconds$2 } from "../chunks/funcApi-shim.js";

import { isPlainTimeRecord } from "../chunks/funcApi.js";

const create = NativeTemporal ? create$1 : create$2;

const isRecord = isPlainTimeRecord;

const fromFields = NativeTemporal ? fromFields$1 : fromFields$2;

const fromString = NativeTemporal ? fromString$1 : fromString$2;

const withFields = NativeTemporal ? withFields$1 : withFields$2;

const add = NativeTemporal ? add$1 : add$2;

const subtract = NativeTemporal ? subtract$1 : subtract$2;

const diff = NativeTemporal ? diff$1 : diff$2;

const equals = NativeTemporal ? equals$1 : equals$2;

const compare = NativeTemporal ? compare$1 : compare$2;

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

const startOfHour = NativeTemporal ? startOfHour$1 : startOfHour$2;

const startOfMinute = NativeTemporal ? startOfMinute$1 : startOfMinute$2;

const startOfSecond = NativeTemporal ? startOfSecond$1 : startOfSecond$2;

const startOfMillisecond = NativeTemporal ? startOfMillisecond$1 : startOfMillisecond$2;

const startOfMicrosecond = NativeTemporal ? startOfMicrosecond$1 : startOfMicrosecond$2;

const endOfHour = NativeTemporal ? endOfHour$1 : endOfHour$2;

const endOfMinute = NativeTemporal ? endOfMinute$1 : endOfMinute$2;

const endOfSecond = NativeTemporal ? endOfSecond$1 : endOfSecond$2;

const endOfMillisecond = NativeTemporal ? endOfMillisecond$1 : endOfMillisecond$2;

const endOfMicrosecond = NativeTemporal ? endOfMicrosecond$1 : endOfMicrosecond$2;

const diffHours = NativeTemporal ? diffHours$1 : diffHours$2;

const diffMinutes = NativeTemporal ? diffMinutes$1 : diffMinutes$2;

const diffSeconds = NativeTemporal ? diffSeconds$1 : diffSeconds$2;

const diffMilliseconds = NativeTemporal ? diffMilliseconds$1 : diffMilliseconds$2;

const diffMicroseconds = NativeTemporal ? diffMicroseconds$1 : diffMicroseconds$2;

const diffNanoseconds = NativeTemporal ? diffNanoseconds$1 : diffNanoseconds$2;

export { add, addHours, addMicroseconds, addMilliseconds, addMinutes, addNanoseconds, addSeconds, compare, create, createFormat, diff, diffHours, diffMicroseconds, diffMilliseconds, diffMinutes, diffNanoseconds, diffSeconds, endOfHour, endOfMicrosecond, endOfMillisecond, endOfMinute, endOfSecond, equals, fromFields, fromString, isRecord, roundToHour, roundToMicrosecond, roundToMillisecond, roundToMinute, roundToSecond, startOfHour, startOfMicrosecond, startOfMillisecond, startOfMinute, startOfSecond, subtract, subtractHours, subtractMicroseconds, subtractMilliseconds, subtractMinutes, subtractNanoseconds, subtractSeconds, toBasicString, toLocaleString, toString, toTemporal, withFields };
