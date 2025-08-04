// src/stations.js

import stationData from './data/stations.json';

// Extract station names and sort A→Z
export const stations = stationData
  .map(station => station.stationName)
  .sort((a, b) => a.localeCompare(b));
