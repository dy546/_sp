import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import { satelliteRouter } from './routes/satellites.js';
import { rfRouter } from './routes/radiofrequencies.js';
import { countryRouter } from './routes/countries.js';
import { cameraRouter } from './routes/cameras.js';
import { analysisRouter } from './routes/analysis.js';
import { propagationRouter } from './routes/propagation.js';
import { seedData } from './services/seedData.js';

const app = express();
const server = createServer(app);
const wss = new WebSocketServer({ server });

app.use(cors());
app.use(express.json());

app.use('/api/satellites', satelliteRouter);
app.use('/api/rf', rfRouter);
app.use('/api/countries', countryRouter);
app.use('/api/cameras', cameraRouter);
app.use('/api/analysis', analysisRouter);
app.use('/api/propagation', propagationRouter);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

wss.on('connection', (ws) => {
  console.log('WebSocket client connected');
  const interval = setInterval(() => {
    if (ws.readyState === ws.OPEN) {
      ws.send(JSON.stringify({
        type: 'positions',
        timestamp: new Date().toISOString(),
        data: {}
      }));
    }
  }, 5000);
  ws.on('close', () => {
    clearInterval(interval);
    console.log('WebSocket client disconnected');
  });
});

const PORT = process.env.PORT || 3001;

seedData().then(() => {
  server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
