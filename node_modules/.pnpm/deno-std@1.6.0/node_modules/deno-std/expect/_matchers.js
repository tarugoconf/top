// Copyright 2018-2026 the Deno authors. MIT license.
import { assertNotStrictEquals } from "../assert/not-strict-equals.js";
import { assertStrictEquals } from "../assert/strict-equals.js";
import { assertInstanceOf } from "../assert/instance-of.js";
import { assertIsError } from "./_assert-is-error.js";
import { assertNotInstanceOf } from "../assert/not-instance-of.js";
import { assertMatch } from "../assert/match.js";
import { assertNotMatch } from "../assert/not-match.js";
import { AssertionError } from "../assert/assertion-error.js";
import { buildMessage } from "../internal/build-message.js";
import { diff } from "../internal/diff.js";
import { diffStr } from "../internal/diff-str.js";
import { assertEquals } from "./_assert-equals.js";
import { assertNotEquals } from "./_assert-not-equals.js";
import { equal } from "./_equal.js";
import { format } from "../internal/format.js";
import { getMockCalls } from "./_mock-util.js";
import { inspectArg, inspectArgs } from "./_inspect-args.js";
import {
  buildEqualOptions,
  getObjectSubset,
  iterableEquality,
  subsetEquality,
} from "./_utils.js";
import {
  buildEqualErrorMessage,
  buildNotEqualErrorMessage,
} from "./_build-message.js";
import {
  escapeStringForJs,
  getInlineCallSite,
  getIsUpdate,
  getState,
  getTestFileFromStack,
  pushInlineUpdate,
  registerInlineTeardown,
  serialize,
  SnapshotContext,
} from "./_snapshot-state.js";
export function toBe(context, expect) {
  if (context.isNot) {
    assertNotStrictEquals(context.value, expect, context.customMessage);
  } else {
    assertStrictEquals(context.value, expect, context.customMessage);
  }
}
export function toEqual(context, expected) {
  const v = context.value;
  const e = expected;
  const equalsOptions = buildEqualOptions({
    ...context,
    customTesters: [
      ...context.customTesters,
      iterableEquality,
    ],
  });
  if (context.isNot) {
    assertNotEquals(v, e, equalsOptions);
  } else {
    assertEquals(v, e, equalsOptions);
  }
}
export function toStrictEqual(context, expected) {
  const equalsOptions = buildEqualOptions({
    ...context,
    strictCheck: true,
    customTesters: [
      ...context.customTesters,
      iterableEquality,
    ],
  });
  if (context.isNot) {
    assertNotEquals(context.value, expected, equalsOptions);
  } else {
    assertEquals(context.value, expected, equalsOptions);
  }
}
export function toBeCloseTo(context, expected, numDigits = 2) {
  if (numDigits < 0) {
    throw new Error(
      "toBeCloseTo second argument must be a non-negative integer. Got " +
        numDigits,
    );
  }
  const tolerance = 0.5 * Math.pow(10, -numDigits);
  const value = Number(context.value);
  const pass = Math.abs(expected - value) < tolerance;
  if (context.isNot) {
    if (pass) {
      const defaultMessage =
        `Expected the value ${value} not to be close to ${expected} (using ${numDigits} digits), but it is`;
      throw new AssertionError(
        context.customMessage
          ? `${context.customMessage}: ${defaultMessage}`
          : defaultMessage,
      );
    }
  } else {
    if (!pass) {
      const defaultMessage =
        `Expected the value ${value} to be close to ${expected} (using ${numDigits} digits), but it is not`;
      throw new AssertionError(
        context.customMessage
          ? `${context.customMessage}: ${defaultMessage}`
          : defaultMessage,
      );
    }
  }
}
export function toBeDefined(context) {
  if (context.isNot) {
    assertStrictEquals(context.value, undefined, context.customMessage);
  } else {
    assertNotStrictEquals(context.value, undefined, context.customMessage);
  }
}
export function toBeUndefined(context) {
  if (context.isNot) {
    assertNotStrictEquals(context.value, undefined, context.customMessage);
  } else {
    assertStrictEquals(context.value, undefined, context.customMessage);
  }
}
export function toBeFalsy(context) {
  const isFalsy = !(context.value);
  if (context.isNot) {
    if (isFalsy) {
      const defaultMessage = `Expected ${context.value} to NOT be falsy`;
      throw new AssertionError(
        context.customMessage
          ? `${context.customMessage}: ${defaultMessage}`
          : defaultMessage,
      );
    }
  } else {
    if (!isFalsy) {
      const defaultMessage = `Expected ${context.value} to be falsy`;
      throw new AssertionError(
        context.customMessage
          ? `${context.customMessage}: ${defaultMessage}`
          : defaultMessage,
      );
    }
  }
}
export function toBeTruthy(context) {
  const isTruthy = !!(context.value);
  if (context.isNot) {
    if (isTruthy) {
      const defaultMessage = `Expected ${context.value} to NOT be truthy`;
      throw new AssertionError(
        context.customMessage
          ? `${context.customMessage}: ${defaultMessage}`
          : defaultMessage,
      );
    }
  } else {
    if (!isTruthy) {
      const defaultMessage = `Expected ${context.value} to be truthy`;
      throw new AssertionError(
        context.customMessage
          ? `${context.customMessage}: ${defaultMessage}`
          : defaultMessage,
      );
    }
  }
}
export function toBeGreaterThanOrEqual(context, expected) {
  const isGreaterOrEqual = Number(context.value) >= Number(expected);
  if (context.isNot) {
    if (isGreaterOrEqual) {
      const defaultMessage =
        `Expected ${context.value} to NOT be greater than or equal ${expected}`;
      throw new AssertionError(
        context.customMessage
          ? `${context.customMessage}: ${defaultMessage}`
          : defaultMessage,
      );
    }
  } else {
    if (!isGreaterOrEqual) {
      const defaultMessage =
        `Expected ${context.value} to be greater than or equal ${expected}`;
      throw new AssertionError(
        context.customMessage
          ? `${context.customMessage}: ${defaultMessage}`
          : defaultMessage,
      );
    }
  }
}
export function toBeGreaterThan(context, expected) {
  const isGreater = Number(context.value) > Number(expected);
  if (context.isNot) {
    if (isGreater) {
      const defaultMessage =
        `Expected ${context.value} to NOT be greater than ${expected}`;
      throw new AssertionError(
        context.customMessage
          ? `${context.customMessage}: ${defaultMessage}`
          : defaultMessage,
      );
    }
  } else {
    if (!isGreater) {
      const defaultMessage =
        `Expected ${context.value} to be greater than ${expected}`;
      throw new AssertionError(
        context.customMessage
          ? `${context.customMessage}: ${defaultMessage}`
          : defaultMessage,
      );
    }
  }
}
export function toBeInstanceOf(context, expected) {
  if (context.isNot) {
    assertNotInstanceOf(context.value, expected);
  } else {
    assertInstanceOf(context.value, expected);
  }
}
export function toBeLessThanOrEqual(context, expected) {
  const isLower = Number(context.value) <= Number(expected);
  if (context.isNot) {
    if (isLower) {
      const defaultMessage =
        `Expected ${context.value} to NOT be lower than or equal ${expected}`;
      throw new AssertionError(
        context.customMessage
          ? `${context.customMessage}: ${defaultMessage}`
          : defaultMessage,
      );
    }
  } else {
    if (!isLower) {
      const defaultMessage =
        `Expected ${context.value} to be lower than or equal ${expected}`;
      throw new AssertionError(
        context.customMessage
          ? `${context.customMessage}: ${defaultMessage}`
          : defaultMessage,
      );
    }
  }
}
export function toBeLessThan(context, expected) {
  const isLower = Number(context.value) < Number(expected);
  if (context.isNot) {
    if (isLower) {
      const defaultMessage =
        `Expected ${context.value} to NOT be lower than ${expected}`;
      throw new AssertionError(
        context.customMessage
          ? `${context.customMessage}: ${defaultMessage}`
          : defaultMessage,
      );
    }
  } else {
    if (!isLower) {
      const defaultMessage =
        `Expected ${context.value} to be lower than ${expected}`;
      throw new AssertionError(
        context.customMessage
          ? `${context.customMessage}: ${defaultMessage}`
          : defaultMessage,
      );
    }
  }
}
export function toBeNaN(context) {
  const equalsOptions = buildEqualOptions(context);
  if (context.isNot) {
    assertNotEquals(isNaN(Number(context.value)), true, {
      ...equalsOptions,
      msg: equalsOptions.msg || `Expected ${context.value} to not be NaN`,
    });
  } else {
    assertEquals(isNaN(Number(context.value)), true, {
      ...equalsOptions,
      msg: equalsOptions.msg || `Expected ${context.value} to be NaN`,
    });
  }
}
export function toBeNull(context) {
  if (context.isNot) {
    assertNotStrictEquals(
      context.value,
      null,
      context.customMessage || `Expected ${context.value} to not be null`,
    );
  } else {
    assertStrictEquals(
      context.value,
      null,
      context.customMessage || `Expected ${context.value} to be null`,
    );
  }
}
export function toHaveLength(context, expected) {
  const { value } = context;
  // deno-lint-ignore no-explicit-any
  const maybeLength = value?.length;
  const hasLength = maybeLength === expected;
  if (context.isNot) {
    if (hasLength) {
      const defaultMessage =
        `Expected value not to have length ${expected}, but it does`;
      throw new AssertionError(
        context.customMessage
          ? `${context.customMessage}: ${defaultMessage}`
          : defaultMessage,
      );
    }
  } else {
    if (!hasLength) {
      const defaultMessage =
        `Expected value to have length ${expected}, but it does not: the value has length ${maybeLength}`;
      throw new AssertionError(
        context.customMessage
          ? `${context.customMessage}: ${defaultMessage}`
          : defaultMessage,
      );
    }
  }
}
export function toHaveProperty(context, propName, v) {
  const { value } = context;
  let propPath = [];
  if (Array.isArray(propName)) {
    propPath = propName;
  } else {
    propPath = propName.split(".");
  }
  // deno-lint-ignore no-explicit-any
  let current = value;
  while (true) {
    if (current === undefined || current === null) {
      break;
    }
    if (propPath.length === 0) {
      break;
    }
    const prop = propPath.shift();
    current = current[prop];
  }
  let hasProperty;
  if (v) {
    hasProperty = current !== undefined && propPath.length === 0 &&
      equal(current, v, context);
  } else {
    hasProperty = current !== undefined && propPath.length === 0;
  }
  let ofValue = "";
  if (v) {
    ofValue = ` of the value ${inspectArg(v)}`;
  }
  if (context.isNot) {
    if (hasProperty) {
      const defaultMessage = `Expected the value not to have the property ${
        propPath.join(".")
      }${ofValue}, but it does`;
      throw new AssertionError(
        context.customMessage
          ? `${context.customMessage}: ${defaultMessage}`
          : defaultMessage,
      );
    }
  } else {
    if (!hasProperty) {
      const defaultMessage = `Expected the value to have the property ${
        propPath.join(".")
      }${ofValue}, but it does not`;
      throw new AssertionError(
        context.customMessage
          ? `${context.customMessage}: ${defaultMessage}`
          : defaultMessage,
      );
    }
  }
}
export function toContain(context, expected) {
  // deno-lint-ignore no-explicit-any
  const doesContain = context.value?.includes?.(expected);
  const fmtValue = format(context.value);
  const fmtExpected = format(expected);
  if (context.isNot) {
    if (doesContain) {
      const defaultMessage =
        `The value ${fmtValue} contains the expected item ${fmtExpected}`;
      throw new AssertionError(
        context.customMessage
          ? `${context.customMessage}: ${defaultMessage}`
          : defaultMessage,
      );
    }
  } else {
    if (!doesContain) {
      const defaultMessage =
        `The value ${fmtValue} doesn't contain the expected item ${fmtExpected}`;
      throw new AssertionError(
        context.customMessage
          ? `${context.customMessage}: ${defaultMessage}`
          : defaultMessage,
      );
    }
  }
}
export function toContainEqual(context, expected) {
  const { value } = context;
  assertIsIterable(value);
  let doesContain = false;
  for (const item of value) {
    if (equal(item, expected, context)) {
      doesContain = true;
      break;
    }
  }
  const prettyStringify = (js) =>
    JSON.stringify(js, null, "\t")
      .replace(/\"|\n|\t/g, "")
      .slice(0, 100);
  const fmtValue = prettyStringify(context.value);
  const fmtExpected = prettyStringify(expected);
  if (context.isNot) {
    if (doesContain) {
      const defaultMessage = `The value contains the expected item:
Value: ${fmtValue}
Expected: ${fmtExpected}`;
      throw new AssertionError(
        context.customMessage
          ? `${context.customMessage}: ${defaultMessage}`
          : defaultMessage,
      );
    }
  } else {
    if (!doesContain) {
      const defaultMessage = `The value doesn't contain the expected item:
Value: ${fmtValue}
Expected: ${fmtExpected}`;
      throw new AssertionError(
        context.customMessage
          ? `${context.customMessage}: ${defaultMessage}`
          : defaultMessage,
      );
    }
  }
}
// deno-lint-ignore no-explicit-any
function assertIsIterable(value) {
  if (value == null) {
    throw new AssertionError("The value is null or undefined");
  }
  if (typeof value[Symbol.iterator] !== "function") {
    throw new AssertionError("The value is not iterable");
  }
}
export function toMatch(context, expected) {
  if (context.isNot) {
    assertNotMatch(String(context.value), expected, context.customMessage);
  } else {
    assertMatch(String(context.value), expected, context.customMessage);
  }
}
export function toMatchObject(context, expected) {
  const received = context.value;
  const defaultMsg = "Received value must be an object";
  if (typeof received !== "object" || received === null) {
    throw new AssertionError(
      context.customMessage
        ? `${context.customMessage}: ${defaultMsg}`
        : defaultMsg,
    );
  }
  if (typeof expected !== "object" || expected === null) {
    throw new AssertionError(
      context.customMessage
        ? `${context.customMessage}: ${defaultMsg}`
        : defaultMsg,
    );
  }
  const pass = equal(received, expected, {
    strictCheck: false,
    customTesters: [
      ...context.customTesters,
      iterableEquality,
      subsetEquality,
    ],
  });
  const triggerError = () => {
    if (context.isNot) {
      const defaultMessage = buildNotEqualErrorMessage(received, expected);
      throw new AssertionError(
        context.customMessage
          ? `${context.customMessage}: ${defaultMessage}`
          : defaultMessage,
      );
    } else {
      const subset = getObjectSubset(received, expected, context.customTesters);
      // toMatchObject is a subset check, not equality. Override the default
      // "Values are not equal." headline so the failure message describes
      // what actually went wrong (see #6999).
      const defaultMessage = buildEqualErrorMessage(subset, expected, {
        summary: "Object does not match the expected pattern.",
      });
      throw new AssertionError(
        context.customMessage
          ? `${context.customMessage}: ${defaultMessage}`
          : defaultMessage,
      );
    }
  };
  if (context.isNot && pass || !context.isNot && !pass) {
    triggerError();
  }
}
export function toHaveBeenCalled(context) {
  const calls = getMockCalls(context.value);
  const hasBeenCalled = calls.length > 0;
  if (context.isNot) {
    if (hasBeenCalled) {
      const defaultMessage =
        `Expected mock function not to be called, but it was called ${calls.length} time(s)`;
      throw new AssertionError(
        context.customMessage
          ? `${context.customMessage}: ${defaultMessage}`
          : defaultMessage,
      );
    }
  } else {
    if (!hasBeenCalled) {
      const defaultMessage =
        "Expected mock function to be called, but it was not called";
      throw new AssertionError(
        context.customMessage
          ? `${context.customMessage}: ${defaultMessage}`
          : defaultMessage,
      );
    }
  }
}
export function toHaveBeenCalledTimes(context, expected) {
  const calls = getMockCalls(context.value);
  if (context.isNot) {
    if (calls.length === expected) {
      const defaultMessage =
        `Expected mock function not to be called ${expected} time(s), but it was`;
      throw new AssertionError(
        context.customMessage
          ? `${context.customMessage}: ${defaultMessage}`
          : defaultMessage,
      );
    }
  } else {
    if (calls.length !== expected) {
      const defaultMessage =
        `Expected mock function to be called ${expected} time(s), but it was called ${calls.length} time(s)`;
      throw new AssertionError(
        context.customMessage
          ? `${context.customMessage}: ${defaultMessage}`
          : defaultMessage,
      );
    }
  }
}
export function toHaveBeenCalledWith(context, ...expected) {
  const calls = getMockCalls(context.value);
  const hasBeenCalled = calls.some((call) => equal(call.args, expected));
  if (context.isNot) {
    if (hasBeenCalled) {
      const defaultMessage = `Expected mock function not to be called with ${
        inspectArgs(expected)
      }, but it was`;
      throw new AssertionError(
        context.customMessage
          ? `${context.customMessage}: ${defaultMessage}`
          : defaultMessage,
      );
    }
  } else {
    if (!hasBeenCalled) {
      let otherCalls = "";
      if (calls.length > 0) {
        otherCalls = `\n  Other calls:\n     ${
          calls.map((call) => inspectArgs(call.args)).join("\n    ")
        }`;
      }
      const defaultMessage = `Expected mock function to be called with ${
        inspectArgs(expected)
      }, but it was not.${otherCalls}`;
      throw new AssertionError(
        context.customMessage
          ? `${context.customMessage}: ${defaultMessage}`
          : defaultMessage,
      );
    }
  }
}
export function toHaveBeenLastCalledWith(context, ...expected) {
  const calls = getMockCalls(context.value);
  const hasBeenCalled = calls.length > 0 &&
    equal(calls.at(-1)?.args, expected);
  if (context.isNot) {
    if (hasBeenCalled) {
      const defaultMessage =
        `Expected mock function not to be last called with ${
          inspectArgs(expected)
        }, but it was`;
      throw new AssertionError(
        context.customMessage
          ? `${context.customMessage}: ${defaultMessage}`
          : defaultMessage,
      );
    }
  } else {
    if (!hasBeenCalled) {
      const lastCall = calls.at(-1);
      if (!lastCall) {
        const defaultMessage = `Expected mock function to be last called with ${
          inspectArgs(expected)
        }, but it was not`;
        throw new AssertionError(
          context.customMessage
            ? `${context.customMessage}: ${defaultMessage}`
            : defaultMessage,
        );
      } else {
        const defaultMessage = `Expected mock function to be last called with ${
          inspectArgs(expected)
        }, but it was last called with ${inspectArgs(lastCall.args)}`;
        throw new AssertionError(
          context.customMessage
            ? `${context.customMessage}: ${defaultMessage}`
            : defaultMessage,
        );
      }
    }
  }
}
export function toHaveBeenNthCalledWith(context, nth, ...expected) {
  if (nth < 1) {
    throw new Error(`nth must be greater than 0: received ${nth}`);
  }
  const calls = getMockCalls(context.value);
  const callIndex = nth - 1;
  const hasBeenCalled = calls.length > callIndex &&
    equal(calls[callIndex]?.args, expected);
  if (context.isNot) {
    if (hasBeenCalled) {
      const defaultMessage =
        `Expected the n-th call (n=${nth}) of mock function is not with ${
          inspectArgs(expected)
        }, but it was`;
      throw new AssertionError(
        context.customMessage
          ? `${context.customMessage}: ${defaultMessage}`
          : defaultMessage,
      );
    }
  } else {
    if (!hasBeenCalled) {
      const nthCall = calls[callIndex];
      if (!nthCall) {
        const defaultMessage =
          `Expected the n-th call (n=${nth}) of mock function is with ${
            inspectArgs(expected)
          }, but the n-th call does not exist`;
        throw new AssertionError(
          context.customMessage
            ? `${context.customMessage}: ${defaultMessage}`
            : defaultMessage,
        );
      } else {
        const defaultMessage =
          `Expected the n-th call (n=${nth}) of mock function is with ${
            inspectArgs(expected)
          }, but it was with ${inspectArgs(nthCall.args)}`;
        throw new AssertionError(
          context.customMessage
            ? `${context.customMessage}: ${defaultMessage}`
            : defaultMessage,
        );
      }
    }
  }
}
export function toHaveReturned(context) {
  const calls = getMockCalls(context.value);
  const returned = calls.filter((call) => call.returns);
  if (context.isNot) {
    if (returned.length > 0) {
      const defaultMessage =
        `Expected the mock function to not have returned, but it returned ${returned.length} times`;
      throw new AssertionError(
        context.customMessage
          ? `${context.customMessage}: ${defaultMessage}`
          : defaultMessage,
      );
    }
  } else {
    if (returned.length === 0) {
      const defaultMessage =
        `Expected the mock function to have returned, but it did not return`;
      throw new AssertionError(
        context.customMessage
          ? `${context.customMessage}: ${defaultMessage}`
          : defaultMessage,
      );
    }
  }
}
export function toHaveReturnedTimes(context, expected) {
  const calls = getMockCalls(context.value);
  const returned = calls.filter((call) => call.returns);
  if (context.isNot) {
    if (returned.length === expected) {
      const defaultMessage =
        `Expected the mock function to not have returned ${expected} times, but it returned ${returned.length} times`;
      throw new AssertionError(
        context.customMessage
          ? `${context.customMessage}: ${defaultMessage}`
          : defaultMessage,
      );
    }
  } else {
    if (returned.length !== expected) {
      const defaultMessage =
        `Expected the mock function to have returned ${expected} times, but it returned ${returned.length} times`;
      throw new AssertionError(
        context.customMessage
          ? `${context.customMessage}: ${defaultMessage}`
          : defaultMessage,
      );
    }
  }
}
export function toHaveReturnedWith(context, expected) {
  const calls = getMockCalls(context.value);
  const returned = calls.filter((call) => call.returns);
  const returnedWithExpected = returned.some((call) =>
    equal(call.returned, expected)
  );
  if (context.isNot) {
    if (returnedWithExpected) {
      const defaultMessage =
        `Expected the mock function to not have returned with ${
          inspectArg(expected)
        }, but it did`;
      throw new AssertionError(
        context.customMessage
          ? `${context.customMessage}: ${defaultMessage}`
          : defaultMessage,
      );
    }
  } else {
    if (!returnedWithExpected) {
      const defaultMessage =
        `Expected the mock function to have returned with ${
          inspectArg(expected)
        }, but it did not`;
      throw new AssertionError(
        context.customMessage
          ? `${context.customMessage}: ${defaultMessage}`
          : defaultMessage,
      );
    }
  }
}
export function toHaveLastReturnedWith(context, expected) {
  const calls = getMockCalls(context.value);
  const returned = calls.filter((call) => call.returns);
  const lastReturnedWithExpected = returned.length > 0 &&
    equal(returned.at(-1)?.returned, expected);
  if (context.isNot) {
    if (lastReturnedWithExpected) {
      const defaultMessage =
        `Expected the mock function to not have last returned with ${
          inspectArg(expected)
        }, but it did`;
      throw new AssertionError(
        context.customMessage
          ? `${context.customMessage}: ${defaultMessage}`
          : defaultMessage,
      );
    }
  } else {
    if (!lastReturnedWithExpected) {
      const defaultMessage =
        `Expected the mock function to have last returned with ${
          inspectArg(expected)
        }, but it did not`;
      throw new AssertionError(
        context.customMessage
          ? `${context.customMessage}: ${defaultMessage}`
          : defaultMessage,
      );
    }
  }
}
export function toHaveNthReturnedWith(context, nth, expected) {
  if (nth < 1) {
    throw new Error(`nth(${nth}) must be greater than 0`);
  }
  const calls = getMockCalls(context.value);
  const returned = calls.filter((call) => call.returns);
  const returnIndex = nth - 1;
  const maybeNthReturned = returned[returnIndex];
  const nthReturnedWithExpected = maybeNthReturned &&
    equal(maybeNthReturned.returned, expected);
  if (context.isNot) {
    if (nthReturnedWithExpected) {
      const defaultMessage =
        `Expected the mock function to not have n-th (n=${nth}) returned with ${
          inspectArg(expected)
        }, but it did`;
      throw new AssertionError(
        context.customMessage
          ? `${context.customMessage}: ${defaultMessage}`
          : defaultMessage,
      );
    }
  } else {
    if (!nthReturnedWithExpected) {
      const defaultMessage =
        `Expected the mock function to have n-th (n=${nth}) returned with ${
          inspectArg(expected)
        }, but it did not`;
      throw new AssertionError(
        context.customMessage
          ? `${context.customMessage}: ${defaultMessage}`
          : defaultMessage,
      );
    }
  }
}
export function toThrow(
  context,
  // deno-lint-ignore no-explicit-any
  expected,
) {
  if (typeof context.value === "function") {
    try {
      context.value = context.value();
    } catch (err) {
      context.value = err;
    }
  }
  let expectClass = undefined;
  let expectMessage = undefined;
  if (expected instanceof Error) {
    expectClass = expected.constructor;
    expectMessage = expected.message;
  }
  if (expected instanceof Function) {
    expectClass = expected;
  }
  if (typeof expected === "string" || expected instanceof RegExp) {
    expectMessage = expected;
  }
  if (context.isNot) {
    let isError = false;
    try {
      assertIsError(
        context.value,
        expectClass,
        expectMessage,
        context.customMessage,
      );
      isError = true;
      const defaultMessage = `Expected to NOT throw ${expected}`;
      throw new AssertionError(
        context.customMessage
          ? `${context.customMessage}: ${defaultMessage}`
          : defaultMessage,
      );
    } catch (e) {
      if (isError) {
        throw e;
      }
      return;
    }
  }
  return assertIsError(
    context.value,
    expectClass,
    expectMessage,
    context.customMessage,
  );
}
/**
 * Parses an overloaded `(propertyMatchers?, stringArg?)` argument list.
 * Both `toMatchSnapshot` and `toMatchInlineSnapshot` accept an optional
 * property-matchers object followed by an optional string argument.
 */
function parseSnapshotArgs(first, second) {
  if (typeof first === "string") {
    return { propertyMatchers: undefined, stringArg: first };
  }
  if (typeof first === "object" && first !== null) {
    return { propertyMatchers: first, stringArg: second };
  }
  return { propertyMatchers: undefined, stringArg: undefined };
}
/**
 * Validates property matchers against the actual value and returns the
 * value to serialize (with asymmetric matchers replaced by their string
 * representations).
 */
function applyPropertyMatchers(context, propertyMatchers, matcherName) {
  if (typeof context.value !== "object" || context.value === null) {
    throw new AssertionError(
      `Property matchers can only be used with object values in ${matcherName}`,
    );
  }
  const pass = equal(context.value, propertyMatchers, {
    strictCheck: false,
    customTesters: [
      ...context.customTesters,
      iterableEquality,
      subsetEquality,
    ],
  });
  if (!pass) {
    throw new AssertionError(
      buildEqualErrorMessage(context.value, propertyMatchers, {
        msg: `${matcherName}: Property matchers did not match`,
      }),
    );
  }
  return replaceAsymmetricMatchers(context.value, propertyMatchers);
}
/** Throws a diff-based assertion error comparing two snapshot strings. */
function throwSnapshotMismatch(actual, expected, label, updateHint) {
  const stringDiff = !actual.includes("\n");
  const diffResult = stringDiff
    ? diffStr(actual, expected)
    : diff(actual.split("\n"), expected.split("\n"));
  const diffMsg = buildMessage(diffResult, { stringDiff }).join("\n");
  throw new AssertionError(
    `${label} does not match:\n${diffMsg}\n` +
      `To update ${label.toLowerCase()}s, run:\n` +
      `    ${updateHint}\n`,
  );
}
/**
 * Compares a value against a stored snapshot file.
 *
 * @experimental
 */
export function toMatchSnapshot(context, propertyMatchersOrHint, maybeHint) {
  if (context.isNot) {
    throw new AssertionError("Snapshot matchers do not support `.not`");
  }
  const { propertyMatchers, stringArg: hint } = parseSnapshotArgs(
    propertyMatchersOrHint,
    maybeHint,
  );
  // Determine test file path
  const state = getState();
  const testFilePath = state.testPath ?? getTestFileFromStack();
  if (!testFilePath) {
    throw new Error(
      "toMatchSnapshot: Unable to determine test file path. " +
        "Set it using expect.setState({ testPath: import.meta.url }).",
    );
  }
  // Determine test name
  const testName = state.currentTestName;
  if (!testName) {
    throw new Error(
      "toMatchSnapshot: Unable to determine test name. " +
        "Set it using expect.setState({ currentTestName: '<test name>' }).",
    );
  }
  // Build the snapshot key: "testName: hint count" or "testName count"
  const snapshotName = hint ? `${testName}: ${hint}` : testName;
  const snapshotCtx = SnapshotContext.fromTestFile(testFilePath);
  const count = snapshotCtx.getCount(snapshotName);
  const key = `${snapshotName} ${count}`;
  const valueToSerialize = propertyMatchers
    ? applyPropertyMatchers(context, propertyMatchers, "toMatchSnapshot")
    : context.value;
  const actualSnapshot = serialize(valueToSerialize);
  snapshotCtx.pushToUpdateQueue(key);
  if (getIsUpdate()) {
    // Update mode: write new snapshot
    snapshotCtx.registerTeardown();
    const existing = snapshotCtx.getSnapshot(key);
    if (actualSnapshot !== existing) {
      snapshotCtx.updateSnapshot(key, actualSnapshot);
    }
  } else {
    // Assert mode: compare with existing snapshot
    if (!snapshotCtx.hasSnapshot(key)) {
      throw new AssertionError(
        `Missing snapshot: ${key}\n` +
          "To create snapshots, run:\n" +
          "    deno test --allow-read --allow-write [files]... -- --update\n",
      );
    }
    const expectedSnapshot = snapshotCtx.getSnapshot(key);
    if (actualSnapshot !== expectedSnapshot) {
      throwSnapshotMismatch(
        actualSnapshot,
        expectedSnapshot,
        "Snapshot",
        "deno test --allow-read --allow-write [files]... -- --update",
      );
    }
  }
}
/**
 * Compares a value against an inline snapshot string embedded in the test file.
 *
 * @experimental
 */
export function toMatchInlineSnapshot(
  context,
  propertyMatchersOrSnapshot,
  maybeSnapshot,
) {
  if (context.isNot) {
    throw new AssertionError("Snapshot matchers do not support `.not`");
  }
  const { propertyMatchers, stringArg: inlineSnapshot } = parseSnapshotArgs(
    propertyMatchersOrSnapshot,
    maybeSnapshot,
  );
  const valueToSerialize = propertyMatchers
    ? applyPropertyMatchers(context, propertyMatchers, "toMatchInlineSnapshot")
    : context.value;
  const actualSnapshot = serialize(valueToSerialize);
  // Strip leading/trailing newlines from the inline snapshot template literal
  let trimmedInlineSnapshot = inlineSnapshot;
  if (
    trimmedInlineSnapshot !== undefined &&
    trimmedInlineSnapshot.startsWith("\n") &&
    trimmedInlineSnapshot.endsWith("\n")
  ) {
    trimmedInlineSnapshot = trimmedInlineSnapshot.slice(1, -1);
  }
  if (trimmedInlineSnapshot === undefined) {
    // No inline snapshot provided - queue update to insert it
    if (!getIsUpdate()) {
      throw new AssertionError(
        "Missing inline snapshot argument. To create inline snapshots, run:\n" +
          "    deno test --allow-read --allow-write [files]... -- --update\n",
      );
    }
    const callSite = getInlineCallSite(toMatchInlineSnapshot);
    if (callSite) {
      callSite.actualSnapshot = "`" + escapeStringForJs(actualSnapshot) + "`";
      pushInlineUpdate(callSite);
      registerInlineTeardown();
    }
  } else if (actualSnapshot !== trimmedInlineSnapshot) {
    if (getIsUpdate()) {
      // Update mode - queue replacement
      const callSite = getInlineCallSite(toMatchInlineSnapshot);
      if (callSite) {
        callSite.actualSnapshot = "`" + escapeStringForJs(actualSnapshot) +
          "`";
        pushInlineUpdate(callSite);
        registerInlineTeardown();
      }
    } else {
      throwSnapshotMismatch(
        actualSnapshot,
        trimmedInlineSnapshot,
        "Inline snapshot",
        "deno test --allow-read --allow-write [files]... -- --update",
      );
    }
  }
}
/**
 * Recursively replaces values in `obj` with their asymmetric matcher
 * string representations where `matchers` contains an asymmetric matcher.
 */
function replaceAsymmetricMatchers(
  obj,
  // deno-lint-ignore no-explicit-any
  matchers,
) {
  const result = { ...obj };
  for (const key of Object.keys(matchers)) {
    const matcher = matchers[key];
    if (
      matcher !== null &&
      typeof matcher === "object" &&
      typeof matcher.asymmetricMatch === "function"
    ) {
      // Replace with the matcher's string representation
      result[key] = matcher.toString();
    } else if (
      typeof matcher === "object" && matcher !== null &&
      typeof obj[key] === "object" && obj[key] !== null &&
      !Array.isArray(matcher)
    ) {
      // Recurse into nested objects
      result[key] = replaceAsymmetricMatchers(obj[key], matcher);
    }
  }
  return result;
}
