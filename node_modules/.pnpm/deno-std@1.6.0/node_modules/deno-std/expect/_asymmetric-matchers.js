// Copyright 2018-2026 the Deno authors. MIT license.
// deno-lint-ignore-file no-explicit-any
import { getCustomEqualityTesters } from "./_custom-equality-tester.js";
import { equal } from "./_equal.js";
export class AsymmetricMatcher {
  value;
  inverse;
  constructor(value, inverse = false) {
    this.value = value;
    this.inverse = inverse;
  }
}
export class Anything extends AsymmetricMatcher {
  equals(other) {
    return other !== null && other !== undefined;
  }
}
export function anything() {
  return new Anything();
}
export class Any extends AsymmetricMatcher {
  constructor(value) {
    if (value === undefined) {
      throw new TypeError("Expected a constructor function");
    }
    super(value);
  }
  equals(other) {
    if (typeof other === "object") {
      return other instanceof this.value;
    } else {
      if (this.value === Number) {
        return typeof other === "number";
      }
      if (this.value === String) {
        return typeof other === "string";
      }
      if (this.value === Number) {
        return typeof other === "number";
      }
      if (this.value === Function) {
        return typeof other === "function";
      }
      if (this.value === Boolean) {
        return typeof other === "boolean";
      }
      if (this.value === BigInt) {
        return typeof other === "bigint";
      }
      if (this.value === Symbol) {
        return typeof other === "symbol";
      }
    }
    return false;
  }
}
export function any(c) {
  return new Any(c);
}
export class ArrayContaining extends AsymmetricMatcher {
  constructor(arr, inverse = false) {
    super(arr, inverse);
  }
  equals(other) {
    const res = Array.isArray(other) &&
      this.value.every((e) =>
        other.some((another) =>
          equal(e, another, { customTesters: getCustomEqualityTesters() })
        )
      );
    return this.inverse ? !res : res;
  }
}
export function arrayContaining(c) {
  return new ArrayContaining(c);
}
export function arrayNotContaining(c) {
  return new ArrayContaining(c, true);
}
export class CloseTo extends AsymmetricMatcher {
  #precision;
  constructor(num, precision = 2) {
    super(num);
    this.#precision = precision;
  }
  equals(other) {
    if (typeof other !== "number") {
      return false;
    }
    if (
      (this.value === Number.POSITIVE_INFINITY &&
        other === Number.POSITIVE_INFINITY) ||
      (this.value === Number.NEGATIVE_INFINITY &&
        other === Number.NEGATIVE_INFINITY)
    ) {
      return true;
    }
    return Math.abs(this.value - other) < Math.pow(10, -this.#precision) / 2;
  }
}
export function closeTo(num, numDigits) {
  return new CloseTo(num, numDigits);
}
export class StringContaining extends AsymmetricMatcher {
  constructor(str, inverse = false) {
    super(str, inverse);
  }
  equals(other) {
    const res = typeof other !== "string" ? false : other.includes(this.value);
    return this.inverse ? !res : res;
  }
}
export function stringContaining(str) {
  return new StringContaining(str);
}
export function stringNotContaining(str) {
  return new StringContaining(str, true);
}
export class StringMatching extends AsymmetricMatcher {
  constructor(pattern, inverse = false) {
    super(new RegExp(pattern), inverse);
  }
  equals(other) {
    const res = typeof other !== "string" ? false : this.value.test(other);
    return this.inverse ? !res : res;
  }
}
export function stringMatching(pattern) {
  return new StringMatching(pattern);
}
export function stringNotMatching(pattern) {
  return new StringMatching(pattern, true);
}
export class ObjectContaining extends AsymmetricMatcher {
  constructor(obj, inverse = false) {
    super(obj, inverse);
  }
  equals(other) {
    const keys = Object.keys(this.value);
    let res = true;
    for (const key of keys) {
      if (
        !Object.hasOwn(other, key) ||
        !equal(this.value[key], other[key])
      ) {
        res = false;
      }
    }
    return this.inverse ? !res : res;
  }
}
export function objectContaining(obj) {
  return new ObjectContaining(obj);
}
export function objectNotContaining(obj) {
  return new ObjectContaining(obj, true);
}
