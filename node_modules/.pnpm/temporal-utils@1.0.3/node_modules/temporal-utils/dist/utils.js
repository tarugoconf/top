import * as errorMessages from './errorMessages.js';
export const nanoInMicro = 1_000;
export const nanoInMilli = 1_000_000;
export const nanoInSec = 1_000_000_000;
export const nanoInMinute = 60_000_000_000;
export const nanoInHour = 3_600_000_000_000;
export function normalizeOptions(options) {
    if (options === undefined) {
        return Object.create(null);
    }
    return requireObjectLike(options);
}
export function toFiniteNumber(arg, entityName = 'number') {
    if (typeof arg === 'bigint') {
        throw new TypeError(errorMessages.forbiddenBigIntToNumber(entityName));
    }
    arg = Number(arg);
    if (!Number.isFinite(arg)) {
        throw new RangeError(errorMessages.expectedFinite(entityName, arg));
    }
    return arg;
}
export function toIntegerWithTrunc(arg, entityName) {
    return Math.trunc(toFiniteNumber(arg, entityName)) || 0; // ensure no -0
}
export function toPositiveIntegerWithTruncation(arg, entityName) {
    return requireNumberIsPositive(toIntegerWithTrunc(arg, entityName), entityName);
}
/*
Already known to be number.
*/
export function requireNumberIsPositive(num, entityName = 'number') {
    if (num <= 0) {
        throw new RangeError(errorMessages.expectedPositive(entityName, num));
    }
    return num;
}
/*
min/max are inclusive
*/
export function constrainToRange(num, min, max) {
    return Math.min(Math.max(num, min), max);
}
export function isObjectLike(arg) {
    return arg !== null && (typeof arg === 'object' || typeof arg === 'function');
}
export function requireObjectLike(arg) {
    if (!isObjectLike(arg)) {
        throw new TypeError(errorMessages.invalidObject);
    }
    return arg;
}
// Options-bag-parsing-adjacent
// ----------------------------
/*
Already known to be number
*/
export function normalizeNumberInRange(num, min, max, // inclusive
options) {
    const clamped = constrainToRange(num, min, max);
    if (normalizeOverflow(options) === 'reject' && num !== clamped) {
        throw new RangeError(errorMessages.numberOutOfRange('number', num, min, max));
    }
    return clamped;
}
/*
Match Temporal's field overflow shape without depending on the polyfill's
internal option readers. Undefined defaults to constrain; explicit reject asks
for exact in-range input.
*/
function normalizeOverflow(options) {
    options = normalizeOptions(options);
    const overflow = options.overflow;
    if (overflow === undefined) {
        return 'constrain';
    }
    if (overflow === 'constrain' || overflow === 'reject') {
        return overflow;
    }
    throw new RangeError(errorMessages.invalidOverflowOption);
}
