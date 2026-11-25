import * as errorMessages from './errorMessages.js';
import { startOfMonth, startOfWeek, startOfYear } from './startOf.js';
import { normalizeOptions } from './utils.js';
export function roundToYear(date, options) {
    const start = startOfYear(date);
    const duration = start.until(date, normalizeRoundingOptions('year', options));
    return start.add(duration);
}
export function roundToMonth(date, options) {
    const start = startOfMonth(date);
    const duration = start.until(date, normalizeRoundingOptions('month', options));
    return start.add(duration);
}
export function roundToWeek(date, options) {
    const start = startOfWeek(date);
    const duration = start.until(date, normalizeRoundingOptions('week', options));
    return start.add(duration);
}
export const roundToDay = ((date, options) => date.round(getNativeRoundOptions('day', options)));
export const roundToHour = ((date, options) => date.round(getNativeRoundOptions('hour', options)));
export const roundToMinute = ((date, options) => date.round(getNativeRoundOptions('minute', options)));
export const roundToSecond = ((date, options) => date.round(getNativeRoundOptions('second', options)));
export const roundToMillisecond = ((date, options) => date.round(getNativeRoundOptions('millisecond', options)));
export const roundToMicrosecond = ((date, options) => date.round(getNativeRoundOptions('microsecond', options)));
function getNativeRoundOptions(forcedUnit, options) {
    return {
        ...(typeof options === 'string'
            ? { roundingMode: options }
            : normalizeOptions(options)),
        smallestUnit: forcedUnit,
    };
}
function normalizeRoundingOptions(forcedUnit, options) {
    // Accept a bare roundingMode string as shorthand for { roundingMode }.
    const normOptions = typeof options === 'string'
        ? { roundingMode: options }
        : normalizeOptions(options);
    // This is just for units >day
    if (normOptions.roundingIncrement && normOptions.roundingIncrement !== 1) {
        throw new RangeError(errorMessages.nonOneRoundingIncrement);
    }
    return {
        roundingMode: 'halfExpand',
        ...normOptions,
        smallestUnit: forcedUnit,
    };
}
