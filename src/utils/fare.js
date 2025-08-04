// src/utils/fare.js

// Static fare table you provided (prices in £)
const stationFares = {
  "York":                  { single: 15.60, return: 18.45, firstSingle: 23.00, firstReturn: 32.50 },
  "Bradford Interchange":  { single:  5.80, return:  6.70 },
  "Manchester Piccadilly": { single: 23.20, return: 28.50, firstSingle: 35.30, firstReturn: 39.50 },
  "Doncaster":             { single:  8.20, return:  9.80, firstSingle: 17.30, firstReturn: 21.50 },
  "Ilkley":                { single:  6.80, return:  7.70 },
  "London Kings Cross":    { single: 73.20, return: 88.50, firstSingle:135.30, firstReturn:149.50 },
  "Edinburgh":             { single: 72.50, return: 85.50, firstSingle:125.30, firstReturn:139.50 },
  "Liverpool":             { single: 28.20, return: 29.80, firstSingle: 47.30, firstReturn: 51.50 },
  "Wakefield Westgate":    { single:  3.80, return:  4.70 },
  "Huddersfield":          { single:  6.80, return:  7.70 },
  "Burley Park":           { single:  3.20, return:  4.00 },
  "Headingley":            { single:  3.20, return:  4.00 },
  "New Pudsey":            { single:  3.20, return:  4.00 },
  "Glasgow":               { single: 75.20, return: 85.80, firstSingle:135.30, firstReturn:150.50 },
  "Newcastle":             { single: 55.20, return: 65.80, firstSingle: 95.50, firstReturn:115.50 },
  "Harrogate":             { single: 10.80, return: 12.70 },
  "Ripon":                 { single: 10.80, return: 12.70 },
  "Keighley":              { single:  6.80, return:  7.70 },
  "Birmingham":            { single: 65.20, return: 75.80, firstSingle:135.30, firstReturn:150.50 },
  "Bristol":               { single: 83.20, return: 95.50, firstSingle:135.30, firstReturn:149.50 },
  "Bournemouth":           { single:103.20, return:125.50, firstSingle:205.30, firstReturn:229.50 },
  "Bath Spa":              { single: 73.20, return: 88.50, firstSingle:135.30, firstReturn:149.50 },
  "Middlesbrough":         { single: 43.20, return: 52.50, firstSingle: 75.30, firstReturn: 89.50 },
  "Blackpool North":       { single: 23.20, return: 32.50, firstSingle: 65.30, firstReturn: 79.50 },
  "Sheffield":             { single: 14.20, return: 17.50, firstSingle: 25.30, firstReturn: 35.50 },
  "Leicester":             { single: 65.20, return: 75.80, firstSingle:135.30, firstReturn:150.50 },
  "Nottingham":            { single: 19.20, return: 22.50, firstSingle: 35.30, firstReturn: 43.50 },
  "Castleford":            { single:  5.80, return:  6.70 },
  "Pontefract Tanshelf":   { single:  5.80, return:  6.70 },
  "Aberdeen":              { single: 75.20, return: 85.80, firstSingle:135.30, firstReturn:150.50 },
  "Hull":                  { single: 19.20, return: 22.50, firstSingle: 35.30, firstReturn: 43.50 },
  "Dewsbury":              { single:  5.20, return:  5.80, firstSingle: 15.30, firstReturn: 18.50 },
  "Halifax":               { single:  5.80, return:  6.70 }
};

// Default fallback for stations not listed
const DEFAULT = { single: 6.50, return: 8.10 };

// If a station belongs to one of these cities, map it to the canonical key:
const cityOverrides = [
  { match: /^lon/i, key: "London Kings Cross" },
  { match: /^manchester/i, key: "Manchester Piccadilly" },
  { match: /^liverpool/i, key: "Liverpool" },
  { match: /^blackpool/i, key: "Blackpool North" }
];

/**
 * Normalize a raw station name into the fare table’s key.
 */
function normalize(station) {
  for (const { match, key } of cityOverrides) {
    if (match.test(station)) {
      return key;
    }
  }
  // otherwise use the station name as given
  return station;
}

export function getStandardSingle(station) {
  const key = normalize(station);
  const fare = stationFares[key]?.single ?? DEFAULT.single;
  return fare.toFixed(2);
}

export function getStandardReturn(station) {
  const key = normalize(station);
  const fare = stationFares[key]?.return ?? DEFAULT.return;
  return fare.toFixed(2);
}

export function getFirstClassSingle(station) {
  const key = normalize(station);
  // firstSingle may not exist, fallback to standard single
  const fare =
    stationFares[key]?.firstSingle
    ?? stationFares[key]?.single
    ?? DEFAULT.single;
  return fare.toFixed(2);
}

export function getFirstClassReturn(station) {
  const key = normalize(station);
  // firstReturn may not exist, fallback to standard return
  const fare =
    stationFares[key]?.firstReturn
    ?? stationFares[key]?.return
    ?? DEFAULT.return;
  return fare.toFixed(2);
}
