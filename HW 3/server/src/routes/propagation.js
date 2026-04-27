import { Router } from 'express';
import { propagateAllSatellites, getOrbitalPath } from '../services/propagation.js';

export const propagationRouter = Router();

propagationRouter.get('/positions', (req, res) => {
  const positions = propagateAllSatellites();
  res.json({ timestamp: new Date().toISOString(), positions });
});

propagationRouter.get('/path/:satId', (req, res) => {
  const { satId } = req.params;
  const min = Math.max(1, Math.min(1440, parseInt(req.query.minutes) || 90));
  const stp = Math.max(2, Math.min(500, parseInt(req.query.steps) || 180));
  const path = getOrbitalPath(satId, min, stp);
  if (!path.length) return res.status(404).json({ error: 'Satellite not found or no path generated' });
  res.json({ satId, path });
});
