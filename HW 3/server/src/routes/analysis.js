import { Router } from 'express';
import { getSatellites, getRfSources } from '../services/seedData.js';

export const analysisRouter = Router();

analysisRouter.get('/links/:satelliteId', (req, res) => {
  const sat = getSatellites().find(s => s.id === req.params.satelliteId);
  if (!sat) return res.status(404).json({ error: 'Satellite not found' });
  const relatedRf = getRfSources().filter(rf => {
    if (sat.country === 'International' || rf.country === 'International') return false;
    return sat.country === rf.country;
  });
  res.json({
    satellite: sat,
    relatedRfSources: relatedRf,
    linkCount: relatedRf.length
  });
});

analysisRouter.get('/country/:country', (req, res) => {
  const country = req.params.country;
  const sats = getSatellites().filter(s => s.country.toLowerCase() === country.toLowerCase());
  const rf = getRfSources().filter(r => r.country.toLowerCase() === country.toLowerCase());
  res.json({
    country,
    satellites: sats,
    rfSources: rf,
    satelliteCount: sats.length,
    rfCount: rf.length
  });
});

analysisRouter.get('/spectrum-usage', (req, res) => {
  const rf = getRfSources();
  const spectrumByBand = rf.reduce((acc, r) => {
    const band = r.band.split(' ')[0];
    if (!acc[band]) acc[band] = { count: 0, totalStations: 0, countries: new Set() };
    acc[band].count++;
    acc[band].totalStations += r.activeStations || 0;
    acc[band].countries.add(r.country);
    return acc;
  }, {});
  Object.values(spectrumByBand).forEach(b => b.countries = Array.from(b.countries));
  res.json(spectrumByBand);
});
