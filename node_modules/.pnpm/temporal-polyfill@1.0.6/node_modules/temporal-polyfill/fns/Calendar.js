import { queryExoticCalendarMeta, buddhistMeta, chineseMeta, copticMeta, dangiMeta, ethiopicMeta, ethiopicAmeteAlemMeta, hebrewMeta, indianMeta, japaneseMeta, islamicCivilMeta, islamicTabularMeta, islamicUmmAlQuraMeta, persianMeta, rocMeta, createExoticCalendarGetter } from "../chunks/exoticCalendars.js";

import { memoize, requireString, isoCalendarId, gregoryCalendarId, isoCalendarImpl, gregoryCalendarImpl } from "../chunks/internal.js";

import { createCalendarRecord } from "../chunks/funcApi.js";

const isoCalendarRecord = /*@__PURE__*/ createCalendarRecord(isoCalendarId, () => isoCalendarImpl);

const gregoryCalendarRecord = /*@__PURE__*/ createCalendarRecord(gregoryCalendarId, () => gregoryCalendarImpl);

const getISO = () => isoCalendarRecord;

const getGregory = () => gregoryCalendarRecord;

const getBuddhist = /*@__PURE__*/ createCanonicalGetter(buddhistMeta);

const getChinese = /*@__PURE__*/ createCanonicalGetter(chineseMeta);

const getCoptic = /*@__PURE__*/ createCanonicalGetter(copticMeta);

const getDangi = /*@__PURE__*/ createCanonicalGetter(dangiMeta);

const getEthiopic = /*@__PURE__*/ createCanonicalGetter(ethiopicMeta);

const getEthiopicAmeteAlem = /*@__PURE__*/ createCanonicalGetter(ethiopicAmeteAlemMeta);

const getHebrew = /*@__PURE__*/ createCanonicalGetter(hebrewMeta);

const getIndian = /*@__PURE__*/ createCanonicalGetter(indianMeta);

const getJapanese = /*@__PURE__*/ createCanonicalGetter(japaneseMeta);

const getIslamicCivil = /*@__PURE__*/ createCanonicalGetter(islamicCivilMeta);

const getIslamicTabular = /*@__PURE__*/ createCanonicalGetter(islamicTabularMeta);

const getIslamicUmmAlQura = /*@__PURE__*/ createCanonicalGetter(islamicUmmAlQuraMeta);

const getPersian = /*@__PURE__*/ createCanonicalGetter(persianMeta);

const getROC = /*@__PURE__*/ createCanonicalGetter(rocMeta);

function getBasic(rawCalendarId) {
  const lowerRawCalendarId = requireString(rawCalendarId).toLowerCase();
  return lowerRawCalendarId === isoCalendarId ? isoCalendarRecord : lowerRawCalendarId === gregoryCalendarId ? gregoryCalendarRecord : getOrCreateUnknownRecord(rawCalendarId);
}

function getAny(rawCalendarId) {
  const lowerRawCalendarId = requireString(rawCalendarId).toLowerCase();
  if (lowerRawCalendarId === isoCalendarId) {
    return isoCalendarRecord;
  }
  if (lowerRawCalendarId === gregoryCalendarId) {
    return gregoryCalendarRecord;
  }
  const meta = queryExoticCalendarMeta(lowerRawCalendarId);
  return meta ? getOrCreateFoundRecord(rawCalendarId, meta) : getOrCreateUnknownRecord(rawCalendarId);
}

function getExotic(rawCalendarId) {
  const lowerRawCalendarId = requireString(rawCalendarId).toLowerCase();
  const meta = queryExoticCalendarMeta(lowerRawCalendarId);
  return meta ? getOrCreateFoundRecord(rawCalendarId, meta) : getOrCreateUnknownRecord(rawCalendarId);
}

const getOrCreateFoundRecord = /*@__PURE__*/ memoize((rawCalendarId, meta) => createCalendarRecord(rawCalendarId, createExoticCalendarGetter(meta)));

const getOrCreateUnknownRecord = /*@__PURE__*/ memoize(createCalendarRecord);

function createCanonicalGetter(meta) {
  return () => getOrCreateFoundRecord(meta[0], meta);
}

export { getAny, getBasic, getBuddhist, getChinese, getCoptic, getDangi, getEthiopic, getEthiopicAmeteAlem, getExotic, getGregory, getHebrew, getISO, getIndian, getIslamicCivil, getIslamicTabular, getIslamicUmmAlQura, getJapanese, getPersian, getROC };
