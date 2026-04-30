import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import { satelliteRouter } from './routes/satellites.js';
import { rfRouter } from './routes/radiofrequencies.js';
import { countryRouter } from './routes/countries.js';
import { cameraRouter } from './routes/cameras.js';
import { analysisRouter } from './routes/analysis.js';
import { propagationRouter } from './routes/propagation.js';
import { seedData } from './services/seedData.js';
import { propagateAllSatellites } from './services/propagation.js';

const app = express();
const server = createServer(app);
const wss = new WebSocketServer({ server });

const ALLOWED_ORIGINS = process.env.NODE_ENV === 'production'
  ? ['https://client-gamma-ecru.vercel.app']
  : ['http://localhost:5173'];

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

wss.on('connection', (ws) => {
  console.log('WebSocket client connected');

  ws.isAlive = true;
  ws.on('pong', () => { ws.isAlive = true; });

  const interval = setInterval(() => {
    if (ws.readyState === ws.OPEN) {
      const positions = propagateAllSatellites();
      ws.send(JSON.stringify({
        type: 'positions',
        timestamp: new Date().toISOString(),
        data: positions
      }));
    }
  }, 5000);
  ws.on('close', () => {
    clearInterval(interval);
    console.log('WebSocket client disconnected');
  });
});

const pingInterval = setInterval(() => {
  wss.clients.forEach((ws) => {
    if (ws.isAlive === false) {
      ws.terminate();
      return;
    }
    ws.isAlive = false;
    ws.ping();
  });
}, 30000);

wss.on('close', () => {
  clearInterval(pingInterval);
});

const PORT = process.env.PORT || 3001;

function shutdown() {
  console.log('Shutting down gracefully...');
  wss.clients.forEach((ws) => {
    ws.close(1001, 'Server shutting down');
  });
  wss.close(() => {
    server.close(() => {
      process.exit(0);
    });
  });
}

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);

seedData().then(() => {
  server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
