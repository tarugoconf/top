// Low-Level
export const expectedPositive = (entityName, num) => `Non-positive ${entityName}: ${num}`;
export const expectedFinite = (entityName, num) => `Non-finite ${entityName}: ${num}`;
export const forbiddenBigIntToNumber = (entityName) => `Cannot convert bigint to ${entityName}`;
export const invalidObject = 'Invalid object';
export const numberOutOfRange = (entityName, val, min, max) => invalidEntity(entityName, val) + `; must be between ${min}-${max}`;
// Entity/Fields/Bags
export const invalidEntity = (fieldName, val) => `Invalid ${fieldName}: ${val}`;
// Calendar
export const unsupportedWeekNumbers = 'Calendar week operations forbidden';
// Rounding
export const nonOneRoundingIncrement = 'Non-1 roundingIncrement not allowed';
// Options
export const invalidOverflowOption = 'Invalid overflow option';
