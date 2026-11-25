import { NativeTemporal } from "../chunks/root.js";

import { create$6 as create$1, fromFields$5 as fromFields$1, fromString$6 as fromString$1, withFields$5 as withFields$1, equals$6 as equals$1, createFormat$5 as createFormat$1, toLocaleString$6 as toLocaleString$1, toString$6 as toString$1, toBasicString$6 as toBasicString$1, toPlainDate$3 as toPlainDate$1, toTemporal$6 as toTemporal$1 } from "../chunks/funcApi-native.js";

import { create$6 as create$2, fromFields$5 as fromFields$2, fromString$6 as fromString$2, withFields$5 as withFields$2, equals$6 as equals$2, createFormat$5 as createFormat$2, toLocaleString$6 as toLocaleString$2, toString$6 as toString$2, toBasicString$6 as toBasicString$2, toPlainDate$3 as toPlainDate$2, toTemporal$6 as toTemporal$2 } from "../chunks/funcApi-shim.js";

import { isPlainMonthDayRecord } from "../chunks/funcApi.js";

const create = NativeTemporal ? create$1 : create$2;

const isRecord = isPlainMonthDayRecord;

const fromFields = NativeTemporal ? fromFields$1 : fromFields$2;

const fromString = NativeTemporal ? fromString$1 : fromString$2;

const withFields = NativeTemporal ? withFields$1 : withFields$2;

const equals = NativeTemporal ? equals$1 : equals$2;

const createFormat = NativeTemporal ? createFormat$1 : createFormat$2;

const toLocaleString = NativeTemporal ? toLocaleString$1 : toLocaleString$2;

const toString = NativeTemporal ? toString$1 : toString$2;

const toBasicString = NativeTemporal ? toBasicString$1 : toBasicString$2;

const toPlainDate = NativeTemporal ? toPlainDate$1 : toPlainDate$2;

const toTemporal = NativeTemporal ? toTemporal$1 : toTemporal$2;

export { create, createFormat, equals, fromFields, fromString, isRecord, toBasicString, toLocaleString, toPlainDate, toString, toTemporal, withFields };
