/**
 * Returns an element if and only if that element is the only one matching the
 * given condition. Returns `undefined` otherwise.
 *
 * @typeParam T The type of the elements in the input array.
 *
 * @param array The array to find a single element in.
 * @param predicate The function to test each element for a condition. The
 * function receives the element and its index.
 *
 * @returns The single element that matches the given condition or `undefined`
 * if there are zero or more than one matching elements.
 *
 * @example Basic usage
 * ```ts
 * import { findSingle } from "find-single.ts";
 * import { assertEquals } from "../assert/mod.ts";
 *
 * const bookings = [
 *   { month: "January", active: false },
 *   { month: "March", active: false },
 *   { month: "June", active: true },
 * ];
 * const activeBooking = findSingle(bookings, (booking) => booking.active);
 * const inactiveBooking = findSingle(bookings, (booking) => !booking.active);
 *
 * assertEquals(activeBooking, { month: "June", active: true });
 * assertEquals(inactiveBooking, undefined); // There are two applicable items
 * ```
 *
 * @example Using the index parameter
 * ```ts
 * import { findSingle } from "find-single.ts";
 * import { assertEquals } from "../assert/mod.ts";
 *
 * const array = [9, 12, 13];
 * const result = findSingle(array, (_, index) => index === 1);
 *
 * assertEquals(result, 12);
 * ```
 */
export declare function findSingle<T>(
  array: Iterable<T>,
  predicate: (el: T, index: number) => boolean,
): T | undefined;
