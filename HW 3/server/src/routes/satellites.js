import { Router } from 'express';
import { getSatellites } from '../services/seedData.js';

export const satelliteRouter = Router();

satelliteRouter.get('/', (req, res) => {
  const { status, country, orbitType, type, search } = req.query;
  let sats = getSatellites();
  if (status) sats = sats.filter(s => s.status === status);
  if (country) sats = sats.filter(s => s.country.toLowerCase() === country.toLowerCase());
  if (orbitType) sats = sats.filter(s => s.orbitType === orbitType);
  if (type) sats = sats.filter(s => s.type.toLowerCase() === type.toLowerCase());
  if (search) {
    const q = search.toLowerCase();
    sats = sats.filter(s => s.name.toLowerCase().includes(q) || s.owner.toLowerCase().includes(q) || s.id.includes(q));
  }
  res.json(sats);
});

satelliteRouter.get('/:id', (req, res) => {
  const sat = getSatellites().find(s => s.id === req.params.id);
  if (!sat) return res.status(404).json({ error: 'Satellite not found' });
  res.json(sat);
});

satelliteRouter.get('/stats/summary', (req, res) => {
  const sats = getSatellites();
  res.json({
    total: sats.length,
    active: sats.filter(s => s.status === 'active').length,
    inactive: sats.filter(s => s.status === 'inactive').length,
    byCountry: sats.reduce((acc, s) => { acc[s.country] = (acc[s.country] || 0) + 1; return acc; }, {}),
    byOrbit: sats.reduce((acc, s) => { acc[s.orbitType] = (acc[s.orbitType] || 0) + 1; return acc; }, {}),
    byType: sats.reduce((acc, s) => { acc[s.type] = (acc[s.type] || 0) + 1; return acc; }, {})
  });
});
