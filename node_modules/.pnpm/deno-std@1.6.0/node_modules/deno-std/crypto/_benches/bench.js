#!/usr/bin/env -S deno bench
// Copyright 2018-2026 the Deno authors. MIT license.
import { crypto as stdCrypto } from "../mod.js";
import nodeCrypto from "node:crypto";
const webCrypto = globalThis.crypto;
const BENCHMARKED_DIGEST_ALGORITHM_NAMES = [
  "SHA-256",
  "SHA-512",
  "BLAKE3",
  "FNV32A",
  "FNV64A",
];
const WEB_CRYPTO_DIGEST_ALGORITHM_NAMES = [
  "SHA-1",
  "SHA-256",
  "SHA-384",
  "SHA-512",
];
const NODE_CRYPTO_DIGEST_ALGORITHM_NAMES = [
  "MD4",
  "MD5",
  "RIPEMD-160",
  "SHA-1",
  "SHA-224",
  "SHA-256",
  "SHA-384",
  "SHA-512",
];
for (
  const [length, humanLength] of [
    [64, "64 B"],
    [262_144, "256 KiB"],
    [4_194_304, "4 MiB"],
    [67_108_864, "64 MiB"],
    [524_291_328, "512 MiB"],
  ]
) {
  const buffer = new Uint8Array(length);
  for (let i = 0; i < length; i++) {
    buffer[i] = (i + (i % 13) + (i % 31)) % 256;
  }
  for (const name of BENCHMARKED_DIGEST_ALGORITHM_NAMES) {
    Deno.bench({
      group: `digesting ${humanLength}`,
      name: `${name} from std/crypto Wasm digesting ${humanLength}`,
      async fn() {
        await stdCrypto.subtle.digest(name, [buffer]);
      },
    });
    if (WEB_CRYPTO_DIGEST_ALGORITHM_NAMES.includes(name)) {
      Deno.bench({
        group: `digesting ${humanLength}`,
        name: `${name} from runtime WebCrypto digesting ${humanLength}`,
        async fn() {
          await webCrypto.subtle.digest(name, buffer);
        },
      });
    }
    if (NODE_CRYPTO_DIGEST_ALGORITHM_NAMES.includes(name)) {
      const nodeName = name.replace("-", "").toLowerCase();
      Deno.bench({
        group: `digesting ${humanLength}`,
        name: `${name} from runtime node:crypto digesting ${humanLength}`,
        fn() {
          nodeCrypto.createHash(nodeName).update(buffer).digest();
        },
      });
    }
  }
}
