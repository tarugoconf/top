// Copyright 2018-2026 the Deno authors. MIT license.
const customEqualityTesters = [];
export function addCustomEqualityTesters(newTesters) {
  if (!Array.isArray(newTesters)) {
    throw new TypeError(
      `customEqualityTester expects an array of Testers. But got ${typeof newTesters}`,
    );
  }
  customEqualityTesters.push(...newTesters);
}
export function getCustomEqualityTesters() {
  return customEqualityTesters;
}
