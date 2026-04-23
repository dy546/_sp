import { satellites } from '../data/satellites.js';
import { rfSources } from '../data/radiofrequencies.js';
import { countries, cameraFeeds } from '../data/static.js';

let satData = [];
let rfData = [];
let countryData = [];
let cameraData = [];
let initialized = false;

export function getSatellites() { return satData; }
export function getRfSources() { return rfData; }
export function getCountries() { return countryData; }
export function getCameras() { return cameraData; }
export function isInitialized() { return initialized; }

export async function seedData() {
  if (initialized) return;
  satData = satellites;
  rfData = rfSources;
  countryData = countries;
  cameraData = cameraFeeds;
  initialized = true;
  console.log(`Seeded ${satData.length} satellites, ${rfData.length} RF sources, ${countryData.length} countries`);
}
