import { NativeTemporal } from "../chunks/root.js";

import { create$7 as create$1, fromFields$6 as fromFields$1, fromString$7 as fromString$1, sign as sign$1, blank as blank$1, withFields$6 as withFields$1, negated as negated$1, abs as abs$1, add$6 as add$1, subtract$6 as subtract$1, round as round$1, total as total$1, compare$6 as compare$1, toLocaleString$7 as toLocaleString$1, toString$7 as toString$1, toBasicString$7 as toBasicString$1, toTemporal$7 as toTemporal$1 } from "../chunks/funcApi-native.js";

import { create$7 as create$2, fromFields$6 as fromFields$2, fromString$7 as fromString$2, sign as sign$2, blank as blank$2, withFields$6 as withFields$2, negated as negated$2, abs as abs$2, add$6 as add$2, subtract$6 as subtract$2, round as round$2, total as total$2, compare$6 as compare$2, toLocaleString$7 as toLocaleString$2, toString$7 as toString$2, toBasicString$7 as toBasicString$2, toTemporal$7 as toTemporal$2 } from "../chunks/funcApi-shim.js";

import { isDurationRecord } from "../chunks/funcApi.js";

const create = NativeTemporal ? create$1 : create$2;

const isRecord = isDurationRecord;

const fromFields = NativeTemporal ? fromFields$1 : fromFields$2;

const fromString = NativeTemporal ? fromString$1 : fromString$2;

const sign = NativeTemporal ? sign$1 : sign$2;

const blank = NativeTemporal ? blank$1 : blank$2;

const withFields = NativeTemporal ? withFields$1 : withFields$2;

const negated = NativeTemporal ? negated$1 : negated$2;

const abs = NativeTemporal ? abs$1 : abs$2;

const add = NativeTemporal ? add$1 : add$2;

const subtract = NativeTemporal ? subtract$1 : subtract$2;

const round = NativeTemporal ? round$1 : round$2;

const total = NativeTemporal ? total$1 : total$2;

const compare = NativeTemporal ? compare$1 : compare$2;

const toLocaleString = NativeTemporal ? toLocaleString$1 : toLocaleString$2;

const toString = NativeTemporal ? toString$1 : toString$2;

const toBasicString = NativeTemporal ? toBasicString$1 : toBasicString$2;

const toTemporal = NativeTemporal ? toTemporal$1 : toTemporal$2;

export { abs, add, blank, compare, create, fromFields, fromString, isRecord, negated, round, sign, subtract, toBasicString, toLocaleString, toString, toTemporal, total, withFields };
