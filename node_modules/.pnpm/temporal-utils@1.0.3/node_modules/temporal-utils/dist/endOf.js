import { startOfHour, startOfMicrosecond, startOfMillisecond, startOfMinute, startOfMonth, startOfSecond, startOfWeek, startOfYear, } from './startOf.js';
import { nanoInHour, nanoInMicro, nanoInMilli, nanoInMinute, nanoInSec, } from './utils.js';
export function endOfYear(date) {
    return startOfYear(date)
        .add({ years: 1 })
        .subtract(date.day === undefined
        ? { months: 1 }
        : date
            .nanosecond !== undefined
            ? { nanoseconds: 1 }
            : { days: 1 });
}
export function endOfMonth(date) {
    return startOfMonth(date)
        .add({ months: 1 })
        .subtract(date.nanosecond !==
        undefined
        ? { nanoseconds: 1 }
        : { days: 1 });
}
export function endOfWeek(date) {
    return startOfWeek(date)
        .add({ weeks: 1 })
        .subtract(date.nanosecond !==
        undefined
        ? { nanoseconds: 1 }
        : { days: 1 });
}
export function endOfDay(date) {
    if (date.withPlainTime) {
        return date
            .withPlainTime()
            .add({ days: 1 })
            .subtract({ nanoseconds: 1 });
    }
    return date; // in case PlainDate passed in, not moved to next day
}
export function endOfHour(date) {
    return startOfHour(date).add({ nanoseconds: nanoInHour - 1 });
}
export function endOfMinute(date) {
    return startOfMinute(date).add({ nanoseconds: nanoInMinute - 1 });
}
export function endOfSecond(date) {
    return startOfSecond(date).add({ nanoseconds: nanoInSec - 1 });
}
export function endOfMillisecond(date) {
    return startOfMillisecond(date).add({
        nanoseconds: nanoInMilli - 1,
    });
}
export function endOfMicrosecond(date) {
    return startOfMicrosecond(date).add({
        nanoseconds: nanoInMicro - 1,
    });
}
