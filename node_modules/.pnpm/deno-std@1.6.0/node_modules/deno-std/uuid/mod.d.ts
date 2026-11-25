/**
 * Generators and validators for
 * {@link https://www.rfc-editor.org/rfc/rfc9562.html | RFC 9562} UUIDs for
 * versions v1, v3, v4, v5, v6 and v7.
 *
 * Use the built-in
 * {@linkcode https://developer.mozilla.org/en-US/docs/Web/API/Crypto/randomUUID | crypto.randomUUID()}
 * function instead of this package, if you only need to generate v4 UUIDs.
 *
 * Based on {@linkcode https://www.npmjs.com/package/uuid | npm:uuid}.
 *
 * ```ts
 * import { v5, NAMESPACE_DNS, NIL_UUID } from "mod.ts";
 * import { assert, assertFalse } from "../assert/mod.ts";
 *
 * const data = new TextEncoder().encode("deno.land");
 * const uuid = await v5.generate(NAMESPACE_DNS, data);
 *
 * assert(v5.validate(uuid));
 * assertFalse(v5.validate(NIL_UUID));
 * ```
 *
 * @module
 */
export * from "./common.ts";
export * from "./constants.ts";
import { generate as generateV1, validate as validateV1 } from "./v1.ts";
import { generate as generateV3, validate as validateV3 } from "./v3.ts";
import { validate as validateV4 } from "./v4.ts";
import { generate as generateV5, validate as validateV5 } from "./v5.ts";
import {
  extractTimestamp as extractTimestampV7,
  generate as generateV7,
  validate as validateV7,
} from "./v7.ts";
/**
 * Generator and validator for
 * {@link https://www.rfc-editor.org/rfc/rfc9562.html#section-5.1 | UUIDv1}.
 *
 * @example Usage
 * ```ts
 * import { v1 } from "mod.ts";
 * import { assert } from "../assert/mod.ts";
 *
 * const uuid = v1.generate();
 * assert(v1.validate(uuid));
 * ```
 */
export declare const v1: {
  generate: typeof generateV1;
  validate: typeof validateV1;
};
/**
 * Generator and validator for
 * {@link https://www.rfc-editor.org/rfc/rfc9562.html#section-5.3 | UUIDv3}.
 *
 * @example Usage
 * ```ts
 * import { v3, NAMESPACE_DNS } from "mod.ts";
 * import { assert } from "../assert/mod.ts";
 *
 * const data = new TextEncoder().encode("deno.land");
 * const uuid = await v3.generate(NAMESPACE_DNS, data);
 * assert(v3.validate(uuid));
 * ```
 */
export declare const v3: {
  generate: typeof generateV3;
  validate: typeof validateV3;
};
/**
 * Validator for
 * {@link https://www.rfc-editor.org/rfc/rfc9562.html#section-5.4 | UUIDv4}.
 *
 * @example Usage
 * ```ts
 * import { v4 } from "mod.ts";
 * import { assert } from "../assert/mod.ts";
 *
 * const uuid = crypto.randomUUID();
 * assert(v4.validate(uuid));
 * ```
 */
export declare const v4: {
  validate: typeof validateV4;
};
/**
 * Generator and validator for
 * {@link https://www.rfc-editor.org/rfc/rfc9562.html#section-5.5 | UUIDv5}.
 *
 * @example Usage
 * ```ts
 * import { v5, NAMESPACE_DNS } from "mod.ts";
 * import { assert } from "../assert/mod.ts";
 *
 * const data = new TextEncoder().encode("deno.land");
 * const uuid = await v5.generate(NAMESPACE_DNS, data);
 * assert(v5.validate(uuid));
 * ```
 */
export declare const v5: {
  generate: typeof generateV5;
  validate: typeof validateV5;
};
/**
 * Generator and validator for
 * {@link https://www.rfc-editor.org/rfc/rfc9562.html#section-5.7 | UUIDv7}
 *
 * @example Usage
 * ```ts
 * import { v7 } from "mod.ts";
 * import { assert, assertEquals } from "../assert/mod.ts";
 *
 * const TIMESTAMP = 1527897600000;
 * const uuid = v7.generate(TIMESTAMP); // optional timestamp, otherwise defaults to Date.now();
 * assert(v7.validate(uuid));
 * assertEquals(v7.extractTimestamp(uuid), TIMESTAMP);
 * ```
 */
export declare const v7: {
  generate: typeof generateV7;
  validate: typeof validateV7;
  extractTimestamp: typeof extractTimestampV7;
};
