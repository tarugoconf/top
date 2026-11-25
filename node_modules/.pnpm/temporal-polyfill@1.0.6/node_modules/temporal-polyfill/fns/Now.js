import { NativeTemporal } from "../chunks/root.js";

import { timeZoneId as timeZoneId$1, instant as instant$1, zonedDateTimeISO as zonedDateTimeISO$1, plainDateTimeISO as plainDateTimeISO$1, plainDateISO as plainDateISO$1, plainTimeISO as plainTimeISO$1 } from "../chunks/funcApi-native.js";

import { timeZoneId as timeZoneId$2, instant as instant$2, zonedDateTimeISO as zonedDateTimeISO$2, plainDateTimeISO as plainDateTimeISO$2, plainDateISO as plainDateISO$2, plainTimeISO as plainTimeISO$2 } from "../chunks/funcApi-shim.js";

const timeZoneId = NativeTemporal ? timeZoneId$1 : timeZoneId$2;

const instant = NativeTemporal ? instant$1 : instant$2;

const zonedDateTimeISO = NativeTemporal ? zonedDateTimeISO$1 : zonedDateTimeISO$2;

const plainDateTimeISO = NativeTemporal ? plainDateTimeISO$1 : plainDateTimeISO$2;

const plainDateISO = NativeTemporal ? plainDateISO$1 : plainDateISO$2;

const plainTimeISO = NativeTemporal ? plainTimeISO$1 : plainTimeISO$2;

export { instant, plainDateISO, plainDateTimeISO, plainTimeISO, timeZoneId, zonedDateTimeISO };
