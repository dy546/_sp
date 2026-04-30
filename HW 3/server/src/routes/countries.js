import { Router } from 'express';
import { getCountries } from '../services/seedData.js';

export const countryRouter = Router();

countryRouter.get('/', (req, res) => {
  res.json(getCountries());
});

countryRouter.get('/:code', (req, res) => {
  const country = getCountries().find(c => c.code.toLowerCase() === req.params.code.toLowerCase());
  if (!country) return res.status(404).json({ error: 'Country not found' });
  res.json(country);
});
