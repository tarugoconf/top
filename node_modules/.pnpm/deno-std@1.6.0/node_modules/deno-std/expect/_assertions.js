// Copyright 2018-2026 the Deno authors. MIT license.
import { getAssertionState } from "../internal/assertion-state.js";
const assertionState = getAssertionState();
export function hasAssertions() {
  assertionState.setAssertionCheck(true);
}
export function assertions(num) {
  assertionState.setAssertionCount(num);
}
export function emitAssertionTrigger() {
  assertionState.setAssertionTriggered(true);
  assertionState.updateAssertionTriggerCount();
}
