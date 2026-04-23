const API_BASE = import.meta.env.VITE_API_URL || '/api';

async function apiFetch(path) {
  const res = await fetch(`${API_BASE}${path}`);
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

export function fetchSatellites(filters = {}) {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([k, v]) => { if (v) params.set(k, v); });
  const qs = params.toString();
  return apiFetch(`/satellites${qs ? '?' + qs : ''}`);
}

export function fetchSatellite(id) {
  return apiFetch(`/satellites/${id}`);
}

export function fetchRfSources(filters = {}) {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([k, v]) => { if (v) params.set(k, v); });
  const qs = params.toString();
  return apiFetch(`/rf${qs ? '?' + qs : ''}`);
}

export function fetchRfSource(id) {
  return apiFetch(`/rf/${id}`);
}

export function fetchStats() {
  return Promise.all([
    apiFetch('/satellites/stats/summary'),
    apiFetch('/rf/stats/summary')
  ]).then(([satStats, rfStats]) => ({ satellites: satStats, rf: rfStats }));
}

export function fetchCountries() {
  return apiFetch('/countries');
}

export function fetchCameras() {
  return apiFetch('/cameras');
}

export function fetchAnalysisLinks(satelliteId) {
  return apiFetch(`/analysis/links/${satelliteId}`);
}

export function fetchCountryAnalysis(country) {
  return apiFetch(`/analysis/country/${country}`);
}

export function fetchSpectrumUsage() {
  return apiFetch('/analysis/spectrum-usage');
}

export function fetchPropagationPositions() {
  return apiFetch('/propagation/positions');
}

export function fetchOrbitalPath(satId, minutes = 90, steps = 180) {
  return apiFetch(`/propagation/path/${satId}?minutes=${minutes}&steps=${steps}`);
}
