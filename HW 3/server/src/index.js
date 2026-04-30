import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { satelliteRouter } from './routes/satellites.js';
import { rfRouter } from './routes/radiofrequencies.js';
import { countryRouter } from './routes/countries.js';
import { cameraRouter } from './routes/cameras.js';
import { analysisRouter } from './routes/analysis.js';
import { propagationRouter } from './routes/propagation.js';
import { seedData } from './services/seedData.js';

const app = express();

const ALLOWED_ORIGINS = process.env.NODE_ENV === 'production'
  ? ['https://client-gamma-ecru.vercel.app']
  : ['http://localhost:5173', 'http://127.0.0.1:5173'];

app.use(cors({
  origin: ALLOWED_ORIGINS
}));
app.use(helmet({
  contentSecurityPolicy: false
}));
app.use(express.json({ limit: '1mb' }));

const apiLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests' }
});

const propagationLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many propagation requests' }
});

app.use('/api', apiLimiter);
app.use('/api/propagation', propagationLimiter);

app.use('/api/satellites', satelliteRouter);
app.use('/api/rf', rfRouter);
app.use('/api/countries', countryRouter);
app.use('/api/cameras', cameraRouter);
app.use('/api/analysis', analysisRouter);
app.use('/api/propagation', propagationRouter);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

const PORT = process.env.PORT || 3001;

seedData().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Seeded satellites and RF sources ready`);
  });
});
