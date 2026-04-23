# Satellite & RF Intelligence Platform

A geospatial intelligence platform for tracking satellites and radio frequency sources worldwide.

## Features

- **Real-time Satellite Tracking** - Orbital propagation using satellite.js with TLE data
- **Interactive Geospatial Map** - Leaflet-based dark map with orbital path lines, heatmap overlay, and labels
- **50 RF Sources** - Radio frequency allocations across 23 countries with spectrum visualization
- **25 Satellites** - Full orbital parameters, frequencies, timeline history, and live feed links
- **Advanced Filtering** - Filter by status, orbit type, satellite type, service type, and search
- **Object Linking** - Analysis endpoints connecting satellites to related RF sources
- **Live Camera Feeds** - ISS, GOES-16, SOHO, EarthCam integration
- **Real-time Updates** - Real-time position updates every 5 seconds

## Tech Stack

- **Frontend**: React 18, Vite, Leaflet, satellite.js
- **Backend**: Node.js, Express, WebSocket, satellite.js
- **Styling**: Custom CSS with dark intelligence theme

## Deployed URLs

| Component | URL |
|-----------|-----|
| **Frontend (Vercel)** | https://client-gamma-ecru.vercel.app |
| **Backend (Render)** | https://satellite-and-radio-frequency-tracer.onrender.com |
| **API Health** | https://satellite-and-radio-frequency-tracer.onrender.com/api/health |

## Quick Start (Local Dev)

```bash
# Start both servers
./start.sh

# Or start individually:
cd server && npm install && node src/index.js
cd client && npm install && npx vite
```

- Frontend: http://localhost:5173
- Backend: http://localhost:3001

## API Endpoints

| Endpoint | Description |
|----------|-------------|
| `GET /api/satellites` | List satellites (filterable) |
| `GET /api/satellites/:id` | Satellite details |
| `GET /api/satellites/stats/summary` | Satellite statistics |
| `GET /api/rf` | List RF sources (filterable) |
| `GET /api/rf/:id` | RF source details |
| `GET /api/rf/stats/summary` | RF statistics |
| `GET /api/countries` | List countries |
| `GET /api/cameras` | Live camera feeds |
| `GET /api/analysis/links/:satId` | Satellite-to-RF links |
| `GET /api/analysis/country/:code` | Country analysis |
| `GET /api/analysis/spectrum-usage` | Spectrum usage summary |
| `GET /api/propagation/positions` | Real-time orbital positions |
| `GET /api/propagation/path/:satId` | Orbital path for a satellite |

## Deployment

### Frontend (Vercel)

```bash
cd client
npx vercel --prod
```

### Backend (Render)

1. Push to GitHub
2. Create a new Web Service on Render
3. Set root directory to `server`
4. Build command: `npm install`
5. Start command: `node src/index.js`

## Data Sources

- Satellite data based on real NORAD catalog entries
- RF spectrum allocations based on ITU RR and national regulatory data
- Orbital propagation using satellite.js with representative TLE sets
