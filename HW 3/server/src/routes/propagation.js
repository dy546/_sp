import { Router } from 'express';
import { propagateAllSatellites, getOrbitalPath } from '../services/propagation.js';

export const propagationRouter = Router();

propagationRouter.get('/positions', (req, res) => {
  const positions = propagateAllSatellites();
  res.json({ timestamp: new Date().toISOString(), positions });
});

propagationRouter.get('/path/:satId', (req, res) => {
  const { satId } = req.params;
  const { minutes = 90, steps = 180 } = req.query;
  const path = getOrbitalPath(satId, parseInt(minutes), parseInt(steps));
  if (!path.length) return res.status(404).json({ error: 'Satellite not found or no path generated' });
  res.json({ satId, path });
});
