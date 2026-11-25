import { NativeTemporal } from "../chunks/root.js";

import { create$2 as create$1, fromFields$1, fromString$2 as fromString$1, withCalendar$1, withFields$1, withPlainTime$1, dayOfWeek$1, daysInWeek$1, weekOfYear$1, yearOfWeek$1, dayOfYear$1, daysInMonth$1, daysInYear$1, monthsInYear$1, inLeapYear$1, add$2 as add$1, subtract$2 as subtract$1, diff$2 as diff$1, equals$2 as equals$1, compare$2 as compare$1, createFormat$1, toLocaleString$2 as toLocaleString$1, toString$2 as toString$1, toBasicString$2 as toBasicString$1, toZonedDateTime as toZonedDateTime$1, toPlainDate$1, toPlainTime$1, toTemporal$2 as toTemporal$1, withDayOfYear$1, withDayOfMonth$1, withDayOfWeek$1, withWeekOfYear$1, addYears$1, addMonths$1, addWeeks$1, addDays$1, addHours$2 as addHours$1, addMinutes$2 as addMinutes$1, addSeconds$2 as addSeconds$1, addMilliseconds$2 as addMilliseconds$1, addMicroseconds$2 as addMicroseconds$1, addNanoseconds$2 as addNanoseconds$1, subtractYears$1, subtractMonths$1, subtractWeeks$1, subtractDays$1, subtractHours$2 as subtractHours$1, subtractMinutes$2 as subtractMinutes$1, subtractSeconds$2 as subtractSeconds$1, subtractMilliseconds$2 as subtractMilliseconds$1, subtractMicroseconds$2 as subtractMicroseconds$1, subtractNanoseconds$2 as subtractNanoseconds$1, roundToYear$1, roundToMonth$1, roundToWeek$1, roundToDay$1, roundToHour$2 as roundToHour$1, roundToMinute$2 as roundToMinute$1, roundToSecond$2 as roundToSecond$1, roundToMillisecond$2 as roundToMillisecond$1, roundToMicrosecond$2 as roundToMicrosecond$1, startOfYear$1, startOfMonth$1, startOfWeek$1, startOfDay$1, startOfHour$1, startOfMinute$1, startOfSecond$1, startOfMillisecond$1, startOfMicrosecond$1, endOfYear$1, endOfMonth$1, endOfWeek$1, endOfDay$1, endOfHour$1, endOfMinute$1, endOfSecond$1, endOfMillisecond$1, endOfMicrosecond$1, diffYears$1, diffMonths$1, diffWeeks$1, diffDays$1, diffHours$2 as diffHours$1, diffMinutes$2 as diffMinutes$1, diffSeconds$2 as diffSeconds$1, diffMilliseconds$2 as diffMilliseconds$1, diffMicroseconds$2 as diffMicroseconds$1, diffNanoseconds$2 as diffNanoseconds$1 } from "../chunks/funcApi-native.js";

import { create$2, fromFields$1 as fromFields$2, fromString$2, withCalendar$1 as withCalendar$2, withFields$1 as withFields$2, withPlainTime$1 as withPlainTime$2, dayOfWeek$1 as dayOfWeek$2, daysInWeek$1 as daysInWeek$2, weekOfYear$1 as weekOfYear$2, yearOfWeek$1 as yearOfWeek$2, dayOfYear$1 as dayOfYear$2, daysInMonth$1 as daysInMonth$2, daysInYear$1 as daysInYear$2, monthsInYear$1 as monthsInYear$2, inLeapYear$1 as inLeapYear$2, add$2, subtract$2, diff$2, equals$2, compare$2, createFormat$1 as createFormat$2, toLocaleString$2, toString$2, toBasicString$2, toZonedDateTime as toZonedDateTime$2, toPlainDate$1 as toPlainDate$2, toPlainTime$1 as toPlainTime$2, toTemporal$2, withDayOfYear$1 as withDayOfYear$2, withDayOfMonth$1 as withDayOfMonth$2, withDayOfWeek$1 as withDayOfWeek$2, withWeekOfYear$1 as withWeekOfYear$2, addYears$1 as addYears$2, addMonths$1 as addMonths$2, addWeeks$1 as addWeeks$2, addDays$1 as addDays$2, addHours$2, addMinutes$2, addSeconds$2, addMilliseconds$2, addMicroseconds$2, addNanoseconds$2, subtractYears$1 as subtractYears$2, subtractMonths$1 as subtractMonths$2, subtractWeeks$1 as subtractWeeks$2, subtractDays$1 as subtractDays$2, subtractHours$2, subtractMinutes$2, subtractSeconds$2, subtractMilliseconds$2, subtractMicroseconds$2, subtractNanoseconds$2, roundToYear$1 as roundToYear$2, roundToMonth$1 as roundToMonth$2, roundToWeek$1 as roundToWeek$2, roundToDay$1 as roundToDay$2, roundToHour$2, roundToMinute$2, roundToSecond$2, roundToMillisecond$2, roundToMicrosecond$2, startOfYear$1 as startOfYear$2, startOfMonth$1 as startOfMonth$2, startOfWeek$1 as startOfWeek$2, startOfDay$1 as startOfDay$2, startOfHour$1 as startOfHour$2, startOfMinute$1 as startOfMinute$2, startOfSecond$1 as startOfSecond$2, startOfMillisecond$1 as startOfMillisecond$2, startOfMicrosecond$1 as startOfMicrosecond$2, endOfYear$1 as endOfYear$2, endOfMonth$1 as endOfMonth$2, endOfWeek$1 as endOfWeek$2, endOfDay$1 as endOfDay$2, endOfHour$1 as endOfHour$2, endOfMinute$1 as endOfMinute$2, endOfSecond$1 as endOfSecond$2, endOfMillisecond$1 as endOfMillisecond$2, endOfMicrosecond$1 as endOfMicrosecond$2, diffYears$1 as diffYears$2, diffMonths$1 as diffMonths$2, diffWeeks$1 as diffWeeks$2, diffDays$1 as diffDays$2, diffHours$2, diffMinutes$2, diffSeconds$2, diffMilliseconds$2, diffMicroseconds$2, diffNanoseconds$2 } from "../chunks/funcApi-shim.js";

import { isPlainDateTimeRecord } from "../chunks/funcApi.js";

const create = NativeTemporal ? create$1 : create$2;

const isRecord = isPlainDateTimeRecord;

const fromFields = NativeTemporal ? fromFields$1 : fromFields$2;

const fromString = NativeTemporal ? fromString$1 : fromString$2;

const withCalendar = NativeTemporal ? withCalendar$1 : withCalendar$2;

const withFields = NativeTemporal ? withFields$1 : withFields$2;

const withPlainTime = NativeTemporal ? withPlainTime$1 : withPlainTime$2;

const dayOfWeek = NativeTemporal ? dayOfWeek$1 : dayOfWeek$2;

const daysInWeek = NativeTemporal ? daysInWeek$1 : daysInWeek$2;

const weekOfYear = NativeTemporal ? weekOfYear$1 : weekOfYear$2;

const yearOfWeek = NativeTemporal ? yearOfWeek$1 : yearOfWeek$2;

const dayOfYear = NativeTemporal ? dayOfYear$1 : dayOfYear$2;

const daysInMonth = NativeTemporal ? daysInMonth$1 : daysInMonth$2;

const daysInYear = NativeTemporal ? daysInYear$1 : daysInYear$2;

const monthsInYear = NativeTemporal ? monthsInYear$1 : monthsInYear$2;

const inLeapYear = NativeTemporal ? inLeapYear$1 : inLeapYear$2;

const add = NativeTemporal ? add$1 : add$2;

const subtract = NativeTemporal ? subtract$1 : subtract$2;

const diff = NativeTemporal ? diff$1 : diff$2;

const equals = NativeTemporal ? equals$1 : equals$2;

const compare = NativeTemporal ? compare$1 : compare$2;

const createFormat = NativeTemporal ? createFormat$1 : createFormat$2;

const toLocaleString = NativeTemporal ? toLocaleString$1 : toLocaleString$2;

const toString = NativeTemporal ? toString$1 : toString$2;

const toBasicString = NativeTemporal ? toBasicString$1 : toBasicString$2;

const toZonedDateTime = NativeTemporal ? toZonedDateTime$1 : toZonedDateTime$2;

const toPlainDate = NativeTemporal ? toPlainDate$1 : toPlainDate$2;

const toPlainTime = NativeTemporal ? toPlainTime$1 : toPlainTime$2;

const toTemporal = NativeTemporal ? toTemporal$1 : toTemporal$2;

const withDayOfYear = NativeTemporal ? withDayOfYear$1 : withDayOfYear$2;

const withDayOfMonth = NativeTemporal ? withDayOfMonth$1 : withDayOfMonth$2;

const withDayOfWeek = NativeTemporal ? withDayOfWeek$1 : withDayOfWeek$2;

const withWeekOfYear = NativeTemporal ? withWeekOfYear$1 : withWeekOfYear$2;

const addYears = NativeTemporal ? addYears$1 : addYears$2;

const addMonths = NativeTemporal ? addMonths$1 : addMonths$2;

const addWeeks = NativeTemporal ? addWeeks$1 : addWeeks$2;

const addDays = NativeTemporal ? addDays$1 : addDays$2;

const addHours = NativeTemporal ? addHours$1 : addHours$2;

const addMinutes = NativeTemporal ? addMinutes$1 : addMinutes$2;

const addSeconds = NativeTemporal ? addSeconds$1 : addSeconds$2;

const addMilliseconds = NativeTemporal ? addMilliseconds$1 : addMilliseconds$2;

const addMicroseconds = NativeTemporal ? addMicroseconds$1 : addMicroseconds$2;

const addNanoseconds = NativeTemporal ? addNanoseconds$1 : addNanoseconds$2;

const subtractYears = NativeTemporal ? subtractYears$1 : subtractYears$2;

const subtractMonths = NativeTemporal ? subtractMonths$1 : subtractMonths$2;

const subtractWeeks = NativeTemporal ? subtractWeeks$1 : subtractWeeks$2;

const subtractDays = NativeTemporal ? subtractDays$1 : subtractDays$2;

const subtractHours = NativeTemporal ? subtractHours$1 : subtractHours$2;

const subtractMinutes = NativeTemporal ? subtractMinutes$1 : subtractMinutes$2;

const subtractSeconds = NativeTemporal ? subtractSeconds$1 : subtractSeconds$2;

const subtractMilliseconds = NativeTemporal ? subtractMilliseconds$1 : subtractMilliseconds$2;

const subtractMicroseconds = NativeTemporal ? subtractMicroseconds$1 : subtractMicroseconds$2;

const subtractNanoseconds = NativeTemporal ? subtractNanoseconds$1 : subtractNanoseconds$2;

const roundToYear = NativeTemporal ? roundToYear$1 : roundToYear$2;

const roundToMonth = NativeTemporal ? roundToMonth$1 : roundToMonth$2;

const roundToWeek = NativeTemporal ? roundToWeek$1 : roundToWeek$2;

const roundToDay = NativeTemporal ? roundToDay$1 : roundToDay$2;

const roundToHour = NativeTemporal ? roundToHour$1 : roundToHour$2;

const roundToMinute = NativeTemporal ? roundToMinute$1 : roundToMinute$2;

const roundToSecond = NativeTemporal ? roundToSecond$1 : roundToSecond$2;

const roundToMillisecond = NativeTemporal ? roundToMillisecond$1 : roundToMillisecond$2;

const roundToMicrosecond = NativeTemporal ? roundToMicrosecond$1 : roundToMicrosecond$2;

const startOfYear = NativeTemporal ? startOfYear$1 : startOfYear$2;

const startOfMonth = NativeTemporal ? startOfMonth$1 : startOfMonth$2;

const startOfWeek = NativeTemporal ? startOfWeek$1 : startOfWeek$2;

const startOfDay = NativeTemporal ? startOfDay$1 : startOfDay$2;

const startOfHour = NativeTemporal ? startOfHour$1 : startOfHour$2;

const startOfMinute = NativeTemporal ? startOfMinute$1 : startOfMinute$2;

const startOfSecond = NativeTemporal ? startOfSecond$1 : startOfSecond$2;

const startOfMillisecond = NativeTemporal ? startOfMillisecond$1 : startOfMillisecond$2;

const startOfMicrosecond = NativeTemporal ? startOfMicrosecond$1 : startOfMicrosecond$2;

const endOfYear = NativeTemporal ? endOfYear$1 : endOfYear$2;

const endOfMonth = NativeTemporal ? endOfMonth$1 : endOfMonth$2;

const endOfWeek = NativeTemporal ? endOfWeek$1 : endOfWeek$2;

const endOfDay = NativeTemporal ? endOfDay$1 : endOfDay$2;

const endOfHour = NativeTemporal ? endOfHour$1 : endOfHour$2;

const endOfMinute = NativeTemporal ? endOfMinute$1 : endOfMinute$2;

const endOfSecond = NativeTemporal ? endOfSecond$1 : endOfSecond$2;

const endOfMillisecond = NativeTemporal ? endOfMillisecond$1 : endOfMillisecond$2;

const endOfMicrosecond = NativeTemporal ? endOfMicrosecond$1 : endOfMicrosecond$2;

const diffYears = NativeTemporal ? diffYears$1 : diffYears$2;

const diffMonths = NativeTemporal ? diffMonths$1 : diffMonths$2;

const diffWeeks = NativeTemporal ? diffWeeks$1 : diffWeeks$2;

const diffDays = NativeTemporal ? diffDays$1 : diffDays$2;

const diffHours = NativeTemporal ? diffHours$1 : diffHours$2;

const diffMinutes = NativeTemporal ? diffMinutes$1 : diffMinutes$2;

const diffSeconds = NativeTemporal ? diffSeconds$1 : diffSeconds$2;

const diffMilliseconds = NativeTemporal ? diffMilliseconds$1 : diffMilliseconds$2;

const diffMicroseconds = NativeTemporal ? diffMicroseconds$1 : diffMicroseconds$2;

const diffNanoseconds = NativeTemporal ? diffNanoseconds$1 : diffNanoseconds$2;

export { add, addDays, addHours, addMicroseconds, addMilliseconds, addMinutes, addMonths, addNanoseconds, addSeconds, addWeeks, addYears, compare, create, createFormat, dayOfWeek, dayOfYear, daysInMonth, daysInWeek, daysInYear, diff, diffDays, diffHours, diffMicroseconds, diffMilliseconds, diffMinutes, diffMonths, diffNanoseconds, diffSeconds, diffWeeks, diffYears, endOfDay, endOfHour, endOfMicrosecond, endOfMillisecond, endOfMinute, endOfMonth, endOfSecond, endOfWeek, endOfYear, equals, fromFields, fromString, inLeapYear, isRecord, monthsInYear, roundToDay, roundToHour, roundToMicrosecond, roundToMillisecond, roundToMinute, roundToMonth, roundToSecond, roundToWeek, roundToYear, startOfDay, startOfHour, startOfMicrosecond, startOfMillisecond, startOfMinute, startOfMonth, startOfSecond, startOfWeek, startOfYear, subtract, subtractDays, subtractHours, subtractMicroseconds, subtractMilliseconds, subtractMinutes, subtractMonths, subtractNanoseconds, subtractSeconds, subtractWeeks, subtractYears, toBasicString, toLocaleString, toPlainDate, toPlainTime, toString, toTemporal, toZonedDateTime, weekOfYear, withCalendar, withDayOfMonth, withDayOfWeek, withDayOfYear, withFields, withPlainTime, withWeekOfYear, yearOfWeek };
