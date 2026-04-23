import { Router } from 'express';
import { getCameras } from '../services/seedData.js';

export const cameraRouter = Router();

cameraRouter.get('/', (req, res) => {
  res.json(getCameras());
});
