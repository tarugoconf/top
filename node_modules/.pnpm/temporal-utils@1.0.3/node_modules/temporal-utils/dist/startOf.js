import { withDayOfWeek } from './with.js';
const zeroTimeFields = {
    hour: 0,
    minute: 0,
    second: 0,
    millisecond: 0,
    microsecond: 0,
    nanosecond: 0,
};
export function startOfYear(date) {
    if (date.day === undefined) {
        return date.with({ month: 1 });
    }
    return date.with({
        month: 1,
        day: 1,
        ...zeroTimeFields,
    });
}
export function startOfMonth(date) {
    return date.with({
        day: 1,
        ...zeroTimeFields,
    });
}
export function startOfWeek(date) {
    const movedDate = withDayOfWeek(date, 1);
    return movedDate
        .withPlainTime
        ? movedDate.withPlainTime()
        : movedDate;
}
export function startOfDay(dateTime) {
    if (dateTime.withPlainTime) {
        return dateTime.withPlainTime();
    }
    return dateTime; // in case PlainDate passed in, no error
}
export function startOfHour(dateTime) {
    return dateTime.with({
        minute: 0,
        second: 0,
        millisecond: 0,
        microsecond: 0,
        nanosecond: 0,
    });
}
export function startOfMinute(dateTime) {
    return dateTime.with({
        second: 0,
        millisecond: 0,
        microsecond: 0,
        nanosecond: 0,
    });
}
export function startOfSecond(dateTime) {
    return dateTime.with({
        millisecond: 0,
        microsecond: 0,
        nanosecond: 0,
    });
}
export function startOfMillisecond(dateTime) {
    return dateTime.with({
        microsecond: 0,
        nanosecond: 0,
    });
}
export function startOfMicrosecond(dateTime) {
    return dateTime.with({
        nanosecond: 0,
    });
}
