import { CalendarRecord } from '../chunks/funcApi.js';




declare const getISO: () => CalendarRecord;
declare const getGregory: () => CalendarRecord;
declare const getBuddhist: () => CalendarRecord;
declare const getChinese: () => CalendarRecord;
declare const getCoptic: () => CalendarRecord;
declare const getDangi: () => CalendarRecord;
declare const getEthiopic: () => CalendarRecord;
declare const getEthiopicAmeteAlem: () => CalendarRecord;
declare const getHebrew: () => CalendarRecord;
declare const getIndian: () => CalendarRecord;
declare const getJapanese: () => CalendarRecord;
declare const getIslamicCivil: () => CalendarRecord;
declare const getIslamicTabular: () => CalendarRecord;
declare const getIslamicUmmAlQura: () => CalendarRecord;
declare const getPersian: () => CalendarRecord;
declare const getROC: () => CalendarRecord;
declare function getBasic(rawCalendarId: string): CalendarRecord;
declare function getAny(rawCalendarId: string): CalendarRecord;
declare function getExotic(rawCalendarId: string): CalendarRecord;

export { CalendarRecord as Record, getAny, getBasic, getBuddhist, getChinese, getCoptic, getDangi, getEthiopic, getEthiopicAmeteAlem, getExotic, getGregory, getHebrew, getISO, getIndian, getIslamicCivil, getIslamicTabular, getIslamicUmmAlQura, getJapanese, getPersian, getROC };
