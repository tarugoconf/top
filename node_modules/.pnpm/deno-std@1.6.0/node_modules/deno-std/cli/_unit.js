// Copyright 2018-2026 the Deno authors. MIT license.
const UNIT_RATE_MAP = new Map([
  ["KiB", 2 ** 10],
  ["MiB", 2 ** 20],
  ["GiB", 2 ** 30],
  ["TiB", 2 ** 40],
  ["PiB", 2 ** 50],
  ["EiB", 2 ** 60],
  ["ZiB", 2 ** 70],
  ["YiB", 2 ** 80],
]);
function getUnitEntry(max) {
  let result = ["KiB", 2 ** 10];
  for (const entry of UNIT_RATE_MAP) {
    if (entry[1] > max) {
      break;
    }
    result = entry;
  }
  return result;
}
export function formatUnitFraction(value, max) {
  const [unit, rate] = getUnitEntry(max);
  const currentValue = (value / rate).toFixed(2);
  const maxValue = (max / rate).toFixed(2);
  return `${currentValue}/${maxValue} ${unit}`;
}
