import { Router } from 'express';
import { getRfSources } from '../services/seedData.js';

export const rfRouter = Router();

rfRouter.get('/', (req, res) => {
  const { country, band, service, search } = req.query;
  let rf = getRfSources();
  if (country) rf = rf.filter(r => r.country.toLowerCase() === country.toLowerCase());
  if (band) rf = rf.filter(r => r.band.toLowerCase().includes(band.toLowerCase()));
  if (service) rf = rf.filter(r => r.service.toLowerCase() === service.toLowerCase());
  if (search) {
    const q = search.toLowerCase();
    rf = rf.filter(r => r.band.toLowerCase().includes(q) || r.owner.toLowerCase().includes(q) || r.country.toLowerCase().includes(q));
  }
  res.json(rf);
});

rfRouter.get('/:id', (req, res) => {
  const rf = getRfSources().find(r => r.id === req.params.id);
  if (!rf) return res.status(404).json({ error: 'RF source not found' });
  res.json(rf);
});

rfRouter.get('/stats/summary', (req, res) => {
  const rf = getRfSources();
  res.json({
    total: rf.length,
    byCountry: rf.reduce((acc, r) => { acc[r.country] = (acc[r.country] || 0) + 1; return acc; }, {}),
    byBand: rf.reduce((acc, r) => { acc[r.band] = (acc[r.band] || 0) + 1; return acc; }, {}),
    byService: rf.reduce((acc, r) => { acc[r.service] = (acc[r.service] || 0) + 1; return acc; }, {}),
    totalActiveStations: rf.reduce((acc, r) => acc + (r.activeStations || 0), 0)
  });
});
