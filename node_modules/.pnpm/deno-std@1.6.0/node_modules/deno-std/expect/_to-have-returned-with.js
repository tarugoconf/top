// Copyright 2018-2026 the Deno authors. MIT license.
import { AssertionError } from "../assert/assertion-error.js";
import { equal } from "../assert/equal.js";
import { getMockCalls } from "./_mock-util.js";
import { inspectArg } from "./_inspect-args.js";
export function toHaveReturnedWith(context, expected) {
  const calls = getMockCalls(context.value);
  const returned = calls.filter((call) => call.returns);
  const returnedWithExpected = returned.some((call) =>
    equal(call.returned, expected)
  );
  if (context.isNot) {
    if (returnedWithExpected) {
      throw new AssertionError(
        `Expected the mock function to not have returned with ${
          inspectArg(expected)
        }, but it did`,
      );
    }
  } else {
    if (!returnedWithExpected) {
      throw new AssertionError(
        `Expected the mock function to have returned with ${
          inspectArg(expected)
        }, but it did not`,
      );
    }
  }
}
