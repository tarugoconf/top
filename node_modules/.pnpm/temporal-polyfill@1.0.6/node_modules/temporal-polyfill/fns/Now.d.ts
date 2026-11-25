import { getCurrentTimeZoneId } from '../chunks/internal.js';
import { instant as instant$1, zonedDateTimeISO as zonedDateTimeISO$1, plainDateTimeISO as plainDateTimeISO$1, plainDateISO as plainDateISO$1, plainTimeISO as plainTimeISO$1 } from '../chunks/funcApi-native.js';




declare const timeZoneId: typeof getCurrentTimeZoneId;
declare const instant: typeof instant$1;
declare const zonedDateTimeISO: typeof zonedDateTimeISO$1;
declare const plainDateTimeISO: typeof plainDateTimeISO$1;
declare const plainDateISO: typeof plainDateISO$1;
declare const plainTimeISO: typeof plainTimeISO$1;

export { instant, plainDateISO, plainDateTimeISO, plainTimeISO, timeZoneId, zonedDateTimeISO };
