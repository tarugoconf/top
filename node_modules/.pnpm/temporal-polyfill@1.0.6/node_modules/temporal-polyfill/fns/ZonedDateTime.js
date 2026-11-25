import { NativeTemporal } from "../chunks/root.js";

import { create$1, fromFields as fromFields$1, fromString$1, withFields as withFields$1, withCalendar as withCalendar$1, withTimeZone as withTimeZone$1, withPlainTime as withPlainTime$1, offsetNanoseconds as offsetNanoseconds$1, offset as offset$1, dayOfWeek as dayOfWeek$1, daysInWeek as daysInWeek$1, weekOfYear as weekOfYear$1, yearOfWeek as yearOfWeek$1, dayOfYear as dayOfYear$1, daysInMonth as daysInMonth$1, daysInYear as daysInYear$1, monthsInYear as monthsInYear$1, inLeapYear as inLeapYear$1, hoursInDay as hoursInDay$1, toString$1, toBasicString$1, add$1, subtract$1, diff$1, startOfDay as startOfDay$1, getTimeZoneTransition as getTimeZoneTransition$1, equals$1, compare$1, toLocaleString$1, toInstant as toInstant$1, toPlainDateTime as toPlainDateTime$1, toPlainDate as toPlainDate$1, toPlainTime as toPlainTime$1, toTemporal$1, withDayOfYear as withDayOfYear$1, withDayOfMonth as withDayOfMonth$1, withDayOfWeek as withDayOfWeek$1, withWeekOfYear as withWeekOfYear$1, addYears as addYears$1, addMonths as addMonths$1, addWeeks as addWeeks$1, addDays as addDays$1, addHours$1, addMinutes$1, addSeconds$1, addMilliseconds$1, addMicroseconds$1, addNanoseconds$1, subtractYears as subtractYears$1, subtractMonths as subtractMonths$1, subtractWeeks as subtractWeeks$1, subtractDays as subtractDays$1, subtractHours$1, subtractMinutes$1, subtractSeconds$1, subtractMilliseconds$1, subtractMicroseconds$1, subtractNanoseconds$1, roundToYear as roundToYear$1, roundToMonth as roundToMonth$1, roundToWeek as roundToWeek$1, roundToDay as roundToDay$1, roundToHour$1, roundToMinute$1, roundToSecond$1, roundToMillisecond$1, roundToMicrosecond$1, startOfYear as startOfYear$1, startOfMonth as startOfMonth$1, startOfWeek as startOfWeek$1, startOfHour as startOfHour$1, startOfMinute as startOfMinute$1, startOfSecond as startOfSecond$1, startOfMillisecond as startOfMillisecond$1, startOfMicrosecond as startOfMicrosecond$1, endOfYear as endOfYear$1, endOfMonth as endOfMonth$1, endOfWeek as endOfWeek$1, endOfDay as endOfDay$1, endOfHour as endOfHour$1, endOfMinute as endOfMinute$1, endOfSecond as endOfSecond$1, endOfMillisecond as endOfMillisecond$1, endOfMicrosecond as endOfMicrosecond$1, diffYears as diffYears$1, diffMonths as diffMonths$1, diffWeeks as diffWeeks$1, diffDays as diffDays$1, diffHours$1, diffMinutes$1, diffSeconds$1, diffMilliseconds$1, diffMicroseconds$1, diffNanoseconds$1 } from "../chunks/funcApi-native.js";

import { create$1 as create$2, fromFields as fromFields$2, fromString$1 as fromString$2, withFields as withFields$2, withCalendar as withCalendar$2, withTimeZone as withTimeZone$2, withPlainTime as withPlainTime$2, offsetNanoseconds as offsetNanoseconds$2, offset as offset$2, dayOfWeek as dayOfWeek$2, daysInWeek as daysInWeek$2, weekOfYear as weekOfYear$2, yearOfWeek as yearOfWeek$2, dayOfYear as dayOfYear$2, daysInMonth as daysInMonth$2, daysInYear as daysInYear$2, monthsInYear as monthsInYear$2, inLeapYear as inLeapYear$2, hoursInDay as hoursInDay$2, toString$1 as toString$2, toBasicString$1 as toBasicString$2, add$1 as add$2, subtract$1 as subtract$2, diff$1 as diff$2, startOfDay as startOfDay$2, getTimeZoneTransition as getTimeZoneTransition$2, equals$1 as equals$2, compare$1 as compare$2, toLocaleString$1 as toLocaleString$2, toInstant as toInstant$2, toPlainDateTime as toPlainDateTime$2, toPlainDate as toPlainDate$2, toPlainTime as toPlainTime$2, toTemporal$1 as toTemporal$2, withDayOfYear as withDayOfYear$2, withDayOfMonth as withDayOfMonth$2, withDayOfWeek as withDayOfWeek$2, withWeekOfYear as withWeekOfYear$2, addYears as addYears$2, addMonths as addMonths$2, addWeeks as addWeeks$2, addDays as addDays$2, addHours$1 as addHours$2, addMinutes$1 as addMinutes$2, addSeconds$1 as addSeconds$2, addMilliseconds$1 as addMilliseconds$2, addMicroseconds$1 as addMicroseconds$2, addNanoseconds$1 as addNanoseconds$2, subtractYears as subtractYears$2, subtractMonths as subtractMonths$2, subtractWeeks as subtractWeeks$2, subtractDays as subtractDays$2, subtractHours$1 as subtractHours$2, subtractMinutes$1 as subtractMinutes$2, subtractSeconds$1 as subtractSeconds$2, subtractMilliseconds$1 as subtractMilliseconds$2, subtractMicroseconds$1 as subtractMicroseconds$2, subtractNanoseconds$1 as subtractNanoseconds$2, roundToYear as roundToYear$2, roundToMonth as roundToMonth$2, roundToWeek as roundToWeek$2, roundToDay as roundToDay$2, roundToHour$1 as roundToHour$2, roundToMinute$1 as roundToMinute$2, roundToSecond$1 as roundToSecond$2, roundToMillisecond$1 as roundToMillisecond$2, roundToMicrosecond$1 as roundToMicrosecond$2, startOfYear as startOfYear$2, startOfMonth as startOfMonth$2, startOfWeek as startOfWeek$2, startOfHour as startOfHour$2, startOfMinute as startOfMinute$2, startOfSecond as startOfSecond$2, startOfMillisecond as startOfMillisecond$2, startOfMicrosecond as startOfMicrosecond$2, endOfYear as endOfYear$2, endOfMonth as endOfMonth$2, endOfWeek as endOfWeek$2, endOfDay as endOfDay$2, endOfHour as endOfHour$2, endOfMinute as endOfMinute$2, endOfSecond as endOfSecond$2, endOfMillisecond as endOfMillisecond$2, endOfMicrosecond as endOfMicrosecond$2, diffYears as diffYears$2, diffMonths as diffMonths$2, diffWeeks as diffWeeks$2, diffDays as diffDays$2, diffHours$1 as diffHours$2, diffMinutes$1 as diffMinutes$2, diffSeconds$1 as diffSeconds$2, diffMilliseconds$1 as diffMilliseconds$2, diffMicroseconds$1 as diffMicroseconds$2, diffNanoseconds$1 as diffNanoseconds$2 } from "../chunks/funcApi-shim.js";

import { isZonedDateTimeRecord } from "../chunks/funcApi.js";

const create = NativeTemporal ? create$1 : create$2;

const isRecord = isZonedDateTimeRecord;

const fromFields = NativeTemporal ? fromFields$1 : fromFields$2;

const fromString = NativeTemporal ? fromString$1 : fromString$2;

const withFields = NativeTemporal ? withFields$1 : withFields$2;

const withCalendar = NativeTemporal ? withCalendar$1 : withCalendar$2;

const withTimeZone = NativeTemporal ? withTimeZone$1 : withTimeZone$2;

const withPlainTime = NativeTemporal ? withPlainTime$1 : withPlainTime$2;

const offsetNanoseconds = NativeTemporal ? offsetNanoseconds$1 : offsetNanoseconds$2;

const offset = NativeTemporal ? offset$1 : offset$2;

const dayOfWeek = NativeTemporal ? dayOfWeek$1 : dayOfWeek$2;

const daysInWeek = NativeTemporal ? daysInWeek$1 : daysInWeek$2;

const weekOfYear = NativeTemporal ? weekOfYear$1 : weekOfYear$2;

const yearOfWeek = NativeTemporal ? yearOfWeek$1 : yearOfWeek$2;

const dayOfYear = NativeTemporal ? dayOfYear$1 : dayOfYear$2;

const daysInMonth = NativeTemporal ? daysInMonth$1 : daysInMonth$2;

const daysInYear = NativeTemporal ? daysInYear$1 : daysInYear$2;

const monthsInYear = NativeTemporal ? monthsInYear$1 : monthsInYear$2;

const inLeapYear = NativeTemporal ? inLeapYear$1 : inLeapYear$2;

const hoursInDay = NativeTemporal ? hoursInDay$1 : hoursInDay$2;

const toString = NativeTemporal ? toString$1 : toString$2;

const toBasicString = NativeTemporal ? toBasicString$1 : toBasicString$2;

const add = NativeTemporal ? add$1 : add$2;

const subtract = NativeTemporal ? subtract$1 : subtract$2;

const diff = NativeTemporal ? diff$1 : diff$2;

const startOfDay = NativeTemporal ? startOfDay$1 : startOfDay$2;

const getTimeZoneTransition = NativeTemporal ? getTimeZoneTransition$1 : getTimeZoneTransition$2;

const equals = NativeTemporal ? equals$1 : equals$2;

const compare = NativeTemporal ? compare$1 : compare$2;

const toLocaleString = NativeTemporal ? toLocaleString$1 : toLocaleString$2;

const toInstant = NativeTemporal ? toInstant$1 : toInstant$2;

const toPlainDateTime = NativeTemporal ? toPlainDateTime$1 : toPlainDateTime$2;

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

export { add, addDays, addHours, addMicroseconds, addMilliseconds, addMinutes, addMonths, addNanoseconds, addSeconds, addWeeks, addYears, compare, create, dayOfWeek, dayOfYear, daysInMonth, daysInWeek, daysInYear, diff, diffDays, diffHours, diffMicroseconds, diffMilliseconds, diffMinutes, diffMonths, diffNanoseconds, diffSeconds, diffWeeks, diffYears, endOfDay, endOfHour, endOfMicrosecond, endOfMillisecond, endOfMinute, endOfMonth, endOfSecond, endOfWeek, endOfYear, equals, fromFields, fromString, getTimeZoneTransition, hoursInDay, inLeapYear, isRecord, monthsInYear, offset, offsetNanoseconds, roundToDay, roundToHour, roundToMicrosecond, roundToMillisecond, roundToMinute, roundToMonth, roundToSecond, roundToWeek, roundToYear, startOfDay, startOfHour, startOfMicrosecond, startOfMillisecond, startOfMinute, startOfMonth, startOfSecond, startOfWeek, startOfYear, subtract, subtractDays, subtractHours, subtractMicroseconds, subtractMilliseconds, subtractMinutes, subtractMonths, subtractNanoseconds, subtractSeconds, subtractWeeks, subtractYears, toBasicString, toInstant, toLocaleString, toPlainDate, toPlainDateTime, toPlainTime, toString, toTemporal, weekOfYear, withCalendar, withDayOfMonth, withDayOfWeek, withDayOfYear, withFields, withPlainTime, withTimeZone, withWeekOfYear, yearOfWeek };
