import * as errorMessages from './errorMessages.js';
import { normalizeNumberInRange, toIntegerWithTrunc } from './utils.js';
const isoCalendarId = 'iso8601';
export function withDayOfYear(date, dayOfYear, options) {
    const normDayOfYear = normalizeNumberInRange(toIntegerWithTrunc(dayOfYear), 1, date.daysInYear, options);
    return date.add({
        days: normDayOfYear - date.dayOfYear,
    });
}
export function withDayOfWeek(date, dayOfWeek, options) {
    const normDayOfWeek = normalizeNumberInRange(toIntegerWithTrunc(dayOfWeek), 1, date.daysInWeek, options);
    return date.add({
        days: normDayOfWeek - date.dayOfWeek,
    });
}
export function withWeekOfYear(date, weekOfYear, options) {
    if (date.calendarId !== isoCalendarId) {
        throw new RangeError(errorMessages.unsupportedWeekNumbers);
    }
    const currentWeekOfYear = date.weekOfYear;
    const currentYearOfWeek = date.yearOfWeek;
    const normWeekOfYear = normalizeNumberInRange(toIntegerWithTrunc(weekOfYear), 1, computeIsoWeeksInYear(currentYearOfWeek), options);
    return date.add({
        weeks: normWeekOfYear - currentWeekOfYear,
    });
}
// Week Number Utils
// TODO: make DRY with temporal-polyfill
function computeIsoWeeksInYear(year) {
    const y0DayOfWeek = computeIsoDayOfWeek(year, 1, 1);
    return y0DayOfWeek === 4 || (y0DayOfWeek === 3 && computeIsoInLeapYear(year))
        ? 53
        : 52;
}
function computeIsoDayOfWeek(year, month, day) {
    const legacyDate = new Date(0);
    legacyDate.setUTCHours(0, 0, 0, 0);
    legacyDate.setUTCFullYear(year, month - 1, day);
    const dayOfWeek = legacyDate.getUTCDay();
    return dayOfWeek || 7;
}
function computeIsoInLeapYear(year) {
    return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
}
