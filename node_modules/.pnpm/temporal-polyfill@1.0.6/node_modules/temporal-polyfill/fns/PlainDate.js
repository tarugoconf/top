import { NativeTemporal } from "../chunks/root.js";

import { create$3 as create$1, fromFields$2 as fromFields$1, fromString$3 as fromString$1, dayOfWeek$2 as dayOfWeek$1, daysInWeek$2 as daysInWeek$1, weekOfYear$2 as weekOfYear$1, yearOfWeek$2 as yearOfWeek$1, dayOfYear$2 as dayOfYear$1, daysInMonth$2 as daysInMonth$1, daysInYear$2 as daysInYear$1, monthsInYear$2 as monthsInYear$1, inLeapYear$2 as inLeapYear$1, withFields$2 as withFields$1, withCalendar$2 as withCalendar$1, add$3 as add$1, subtract$3 as subtract$1, diff$3 as diff$1, equals$3 as equals$1, compare$3 as compare$1, createFormat$2 as createFormat$1, toLocaleString$3 as toLocaleString$1, toString$3 as toString$1, toBasicString$3 as toBasicString$1, toZonedDateTime$1, toPlainDateTime$1, toPlainYearMonth as toPlainYearMonth$1, toPlainMonthDay as toPlainMonthDay$1, toTemporal$3 as toTemporal$1, withDayOfYear$2 as withDayOfYear$1, withDayOfMonth$2 as withDayOfMonth$1, withDayOfWeek$2 as withDayOfWeek$1, withWeekOfYear$2 as withWeekOfYear$1, addYears$2 as addYears$1, addMonths$2 as addMonths$1, addWeeks$2 as addWeeks$1, addDays$2 as addDays$1, subtractYears$2 as subtractYears$1, subtractMonths$2 as subtractMonths$1, subtractWeeks$2 as subtractWeeks$1, subtractDays$2 as subtractDays$1, roundToYear$2 as roundToYear$1, roundToMonth$2 as roundToMonth$1, roundToWeek$2 as roundToWeek$1, startOfYear$2 as startOfYear$1, startOfMonth$2 as startOfMonth$1, startOfWeek$2 as startOfWeek$1, endOfYear$2 as endOfYear$1, endOfMonth$2 as endOfMonth$1, endOfWeek$2 as endOfWeek$1, diffYears$2 as diffYears$1, diffMonths$2 as diffMonths$1, diffWeeks$2 as diffWeeks$1, diffDays$2 as diffDays$1 } from "../chunks/funcApi-native.js";

import { create$3 as create$2, fromFields$2, fromString$3 as fromString$2, dayOfWeek$2, daysInWeek$2, weekOfYear$2, yearOfWeek$2, dayOfYear$2, daysInMonth$2, daysInYear$2, monthsInYear$2, inLeapYear$2, withFields$2, withCalendar$2, add$3 as add$2, subtract$3 as subtract$2, diff$3 as diff$2, equals$3 as equals$2, compare$3 as compare$2, createFormat$2, toLocaleString$3 as toLocaleString$2, toString$3 as toString$2, toBasicString$3 as toBasicString$2, toZonedDateTime$1 as toZonedDateTime$2, toPlainDateTime$1 as toPlainDateTime$2, toPlainYearMonth as toPlainYearMonth$2, toPlainMonthDay as toPlainMonthDay$2, toTemporal$3 as toTemporal$2, withDayOfYear$2, withDayOfMonth$2, withDayOfWeek$2, withWeekOfYear$2, addYears$2, addMonths$2, addWeeks$2, addDays$2, subtractYears$2, subtractMonths$2, subtractWeeks$2, subtractDays$2, roundToYear$2, roundToMonth$2, roundToWeek$2, startOfYear$2, startOfMonth$2, startOfWeek$2, endOfYear$2, endOfMonth$2, endOfWeek$2, diffYears$2, diffMonths$2, diffWeeks$2, diffDays$2 } from "../chunks/funcApi-shim.js";

import { isPlainDateRecord } from "../chunks/funcApi.js";

const isRecord = isPlainDateRecord;

const create = NativeTemporal ? create$1 : create$2;

const fromFields = NativeTemporal ? fromFields$1 : fromFields$2;

const fromString = NativeTemporal ? fromString$1 : fromString$2;

const dayOfWeek = NativeTemporal ? dayOfWeek$1 : dayOfWeek$2;

const daysInWeek = NativeTemporal ? daysInWeek$1 : daysInWeek$2;

const weekOfYear = NativeTemporal ? weekOfYear$1 : weekOfYear$2;

const yearOfWeek = NativeTemporal ? yearOfWeek$1 : yearOfWeek$2;

const dayOfYear = NativeTemporal ? dayOfYear$1 : dayOfYear$2;

const daysInMonth = NativeTemporal ? daysInMonth$1 : daysInMonth$2;

const daysInYear = NativeTemporal ? daysInYear$1 : daysInYear$2;

const monthsInYear = NativeTemporal ? monthsInYear$1 : monthsInYear$2;

const inLeapYear = NativeTemporal ? inLeapYear$1 : inLeapYear$2;

const withFields = NativeTemporal ? withFields$1 : withFields$2;

const withCalendar = NativeTemporal ? withCalendar$1 : withCalendar$2;

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

const toPlainDateTime = NativeTemporal ? toPlainDateTime$1 : toPlainDateTime$2;

const toPlainYearMonth = NativeTemporal ? toPlainYearMonth$1 : toPlainYearMonth$2;

const toPlainMonthDay = NativeTemporal ? toPlainMonthDay$1 : toPlainMonthDay$2;

const toTemporal = NativeTemporal ? toTemporal$1 : toTemporal$2;

const withDayOfYear = NativeTemporal ? withDayOfYear$1 : withDayOfYear$2;

const withDayOfMonth = NativeTemporal ? withDayOfMonth$1 : withDayOfMonth$2;

const withDayOfWeek = NativeTemporal ? withDayOfWeek$1 : withDayOfWeek$2;

const withWeekOfYear = NativeTemporal ? withWeekOfYear$1 : withWeekOfYear$2;

const addYears = NativeTemporal ? addYears$1 : addYears$2;

const addMonths = NativeTemporal ? addMonths$1 : addMonths$2;

const addWeeks = NativeTemporal ? addWeeks$1 : addWeeks$2;

const addDays = NativeTemporal ? addDays$1 : addDays$2;

const subtractYears = NativeTemporal ? subtractYears$1 : subtractYears$2;

const subtractMonths = NativeTemporal ? subtractMonths$1 : subtractMonths$2;

const subtractWeeks = NativeTemporal ? subtractWeeks$1 : subtractWeeks$2;

const subtractDays = NativeTemporal ? subtractDays$1 : subtractDays$2;

const roundToYear = NativeTemporal ? roundToYear$1 : roundToYear$2;

const roundToMonth = NativeTemporal ? roundToMonth$1 : roundToMonth$2;

const roundToWeek = NativeTemporal ? roundToWeek$1 : roundToWeek$2;

const startOfYear = NativeTemporal ? startOfYear$1 : startOfYear$2;

const startOfMonth = NativeTemporal ? startOfMonth$1 : startOfMonth$2;

const startOfWeek = NativeTemporal ? startOfWeek$1 : startOfWeek$2;

const endOfYear = NativeTemporal ? endOfYear$1 : endOfYear$2;

const endOfMonth = NativeTemporal ? endOfMonth$1 : endOfMonth$2;

const endOfWeek = NativeTemporal ? endOfWeek$1 : endOfWeek$2;

const diffYears = NativeTemporal ? diffYears$1 : diffYears$2;

const diffMonths = NativeTemporal ? diffMonths$1 : diffMonths$2;

const diffWeeks = NativeTemporal ? diffWeeks$1 : diffWeeks$2;

const diffDays = NativeTemporal ? diffDays$1 : diffDays$2;

export { add, addDays, addMonths, addWeeks, addYears, compare, create, createFormat, dayOfWeek, dayOfYear, daysInMonth, daysInWeek, daysInYear, diff, diffDays, diffMonths, diffWeeks, diffYears, endOfMonth, endOfWeek, endOfYear, equals, fromFields, fromString, inLeapYear, isRecord, monthsInYear, roundToMonth, roundToWeek, roundToYear, startOfMonth, startOfWeek, startOfYear, subtract, subtractDays, subtractMonths, subtractWeeks, subtractYears, toBasicString, toLocaleString, toPlainDateTime, toPlainMonthDay, toPlainYearMonth, toString, toTemporal, toZonedDateTime, weekOfYear, withCalendar, withDayOfMonth, withDayOfWeek, withDayOfYear, withFields, withWeekOfYear, yearOfWeek };
