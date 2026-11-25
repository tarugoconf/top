import { NativeTemporal } from "../chunks/root.js";

import { create$5 as create$1, fromFields$4 as fromFields$1, fromString$5 as fromString$1, daysInMonth$3 as daysInMonth$1, daysInYear$3 as daysInYear$1, monthsInYear$3 as monthsInYear$1, inLeapYear$3 as inLeapYear$1, withFields$4 as withFields$1, add$5 as add$1, subtract$5 as subtract$1, diff$5 as diff$1, equals$5 as equals$1, compare$5 as compare$1, createFormat$4 as createFormat$1, toLocaleString$5 as toLocaleString$1, toString$5 as toString$1, toBasicString$5 as toBasicString$1, toPlainDate$2 as toPlainDate$1, toTemporal$5 as toTemporal$1, addYears$3 as addYears$1, addMonths$3 as addMonths$1, subtractYears$3 as subtractYears$1, subtractMonths$3 as subtractMonths$1, roundToYear$3 as roundToYear$1, startOfYear$3 as startOfYear$1, endOfYear$3 as endOfYear$1, diffYears$3 as diffYears$1, diffMonths$3 as diffMonths$1 } from "../chunks/funcApi-native.js";

import { create$5 as create$2, fromFields$4 as fromFields$2, fromString$5 as fromString$2, daysInMonth$3 as daysInMonth$2, daysInYear$3 as daysInYear$2, monthsInYear$3 as monthsInYear$2, inLeapYear$3 as inLeapYear$2, withFields$4 as withFields$2, add$5 as add$2, subtract$5 as subtract$2, diff$5 as diff$2, equals$5 as equals$2, compare$5 as compare$2, createFormat$4 as createFormat$2, toLocaleString$5 as toLocaleString$2, toString$5 as toString$2, toBasicString$5 as toBasicString$2, toPlainDate$2, toTemporal$5 as toTemporal$2, addYears$3 as addYears$2, addMonths$3 as addMonths$2, subtractYears$3 as subtractYears$2, subtractMonths$3 as subtractMonths$2, roundToYear$3 as roundToYear$2, startOfYear$3 as startOfYear$2, endOfYear$3 as endOfYear$2, diffYears$3 as diffYears$2, diffMonths$3 as diffMonths$2 } from "../chunks/funcApi-shim.js";

import { isPlainYearMonthRecord } from "../chunks/funcApi.js";

const create = NativeTemporal ? create$1 : create$2;

const isRecord = isPlainYearMonthRecord;

const fromFields = NativeTemporal ? fromFields$1 : fromFields$2;

const fromString = NativeTemporal ? fromString$1 : fromString$2;

const daysInMonth = NativeTemporal ? daysInMonth$1 : daysInMonth$2;

const daysInYear = NativeTemporal ? daysInYear$1 : daysInYear$2;

const monthsInYear = NativeTemporal ? monthsInYear$1 : monthsInYear$2;

const inLeapYear = NativeTemporal ? inLeapYear$1 : inLeapYear$2;

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

const toPlainDate = NativeTemporal ? toPlainDate$1 : toPlainDate$2;

const toTemporal = NativeTemporal ? toTemporal$1 : toTemporal$2;

const addYears = NativeTemporal ? addYears$1 : addYears$2;

const addMonths = NativeTemporal ? addMonths$1 : addMonths$2;

const subtractYears = NativeTemporal ? subtractYears$1 : subtractYears$2;

const subtractMonths = NativeTemporal ? subtractMonths$1 : subtractMonths$2;

const roundToYear = NativeTemporal ? roundToYear$1 : roundToYear$2;

const startOfYear = NativeTemporal ? startOfYear$1 : startOfYear$2;

const endOfYear = NativeTemporal ? endOfYear$1 : endOfYear$2;

const diffYears = NativeTemporal ? diffYears$1 : diffYears$2;

const diffMonths = NativeTemporal ? diffMonths$1 : diffMonths$2;

export { add, addMonths, addYears, compare, create, createFormat, daysInMonth, daysInYear, diff, diffMonths, diffYears, endOfYear, equals, fromFields, fromString, inLeapYear, isRecord, monthsInYear, roundToYear, startOfYear, subtract, subtractMonths, subtractYears, toBasicString, toLocaleString, toPlainDate, toString, toTemporal, withFields };
