import { NativeTemporal } from "./chunks/root.js";

import { Temporal as Temporal$1, IntlExtended, toTemporalInstant as toTemporalInstant$1 } from "./chunks/classApi-basic.js";

const Temporal = NativeTemporal || Temporal$1;

const IntlExport = NativeTemporal ? Intl : IntlExtended;

const toTemporalInstant = NativeTemporal ? Date.prototype.toTemporalInstant : toTemporalInstant$1;

export { IntlExport as Intl, Temporal, toTemporalInstant };
