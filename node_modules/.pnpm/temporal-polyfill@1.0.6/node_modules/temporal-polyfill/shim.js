import { createPropDescriptors } from "./chunks/internal.js";

import { NativeTemporal } from "./chunks/root.js";

import { Temporal, DateTimeFormat, toTemporalInstant } from "./chunks/classApi-basic.js";

function installImplementation() {
  Object.defineProperties(globalThis, createPropDescriptors({
    Temporal: Temporal
  })), Object.defineProperties(Intl, createPropDescriptors({
    DateTimeFormat: DateTimeFormat
  })), Object.defineProperties(Date.prototype, createPropDescriptors({
    toTemporalInstant: toTemporalInstant
  }));
}

function install() {
  NativeTemporal || installImplementation();
}

export { install, installImplementation };
