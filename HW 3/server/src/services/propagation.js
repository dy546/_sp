import * as satellite from 'satellite.js';

const TLE_DATA = {
  'sat-001': {
    tle1: '1 25544U 98067A   24112.50000000  .00016717  00000+0  10270-4 0  9001',
    tle2: '2 25544  51.6425 123.4567 0007000 200.0000 160.0000 15.50123456234567'
  },
  'sat-002': {
    tle1: '1 44713U 19029A   24112.50000000  .00001234  00000+0  50000-4 0  9002',
    tle2: '2 44713  53.0000 234.5678 0001500 180.0000 180.0000 15.06412345123456'
  },
  'sat-003': {
    tle1: '1 24876U 97035A   24112.50000000  .00000010  00000+0  10000-4 0  9003',
    tle2: '2 24876  55.0000  45.6789 0001000 270.0000  90.0000  2.00561234123456'
  },
  'sat-004': {
    tle1: '1 41866U 16071A   24112.50000000  .00000005  00000+0  00000+0 0  9004',
    tle2: '2 41866   0.0000  89.0123 0001000 300.0000  60.0000  1.00271234123456'
  },
  'sat-005': {
    tle1: '1 20580U 90037B   24112.50000000  .00001234  00000+0  80000-4 0  9005',
    tle2: '2 20580  28.5000 234.5678 0002500 150.0000 210.0000 15.09512345123456'
  },
  'sat-006': {
    tle1: '1 43013U 17073A   24112.50000000  .00000005  00000+0  00000+0 0  9006',
    tle2: '2 43013  86.4000 180.0000 0002000 200.0000 160.0000 14.34212345123456'
  },
  'sat-007': {
    tle1: '1 39084U 13009A   24112.50000000  .00000010  00000+0  10000-4 0  9007',
    tle2: '2 39084  98.2000 145.0000 0001000  90.0000 270.0000 14.57112345123456'
  },
  'sat-008': {
    tle1: '1 37846U 11053A   24112.50000000  .00000008  00000+0  00000+0 0  9008',
    tle2: '2 37846  55.0000 200.0000 0001000 100.0000 260.0000  2.00561234123456'
  },
  'sat-009': {
    tle1: '1 43566U 18056A   24112.50000000  .00000003  00000+0  00000+0 0  9009',
    tle2: '2 43566   0.0000  75.0000 0001000 280.0000  80.0000  1.00271234123456'
  },
  'sat-010': {
    tle1: '1 41105U 15050A   24112.50000000  .00000006  00000+0  00000+0 0  9010',
    tle2: '2 41105  55.0000 120.0000 0001000 350.0000  10.0000  2.00561234123456'
  },
  'sat-011': {
    tle1: '1 43226U 18012A   24112.50000000  .00000004  00000+0  00000+0 0  9011',
    tle2: '2 43226   0.0000  60.0000 0001000 270.0000  90.0000  1.00271234123456'
  },
  'sat-012': {
    tle1: '1 28492U 04049A   24112.50000000  .00000002  00000+0  00000+0 0  9012',
    tle2: '2 28492   0.0000  30.0000 0001000 200.0000 160.0000  1.00271234123456'
  },
  'sat-013': {
    tle1: '1 26900U 01040A   24112.50000000  .00000001  00000+0  00000+0 0  9013',
    tle2: '2 26900   0.0000  15.0000 0001000 100.0000 260.0000  1.00271234123456'
  },
  'sat-014': {
    tle1: '1 52287U 22033A   24112.50000000  .00000007  00000+0  00000+0 0  9014',
    tle2: '2 52287  97.5000 210.0000 0001000  80.0000 280.0000 15.23412345123456'
  },
  'sat-015': {
    tle1: '1 48274U 21028A   24112.50000000  .00000009  00000+0  00000+0 0  9015',
    tle2: '2 48274  97.8000 165.0000 0001000  70.0000 290.0000 15.12312345123456'
  },
  'sat-016': {
    tle1: '1 45363U 20013A   24112.50000000  .00000003  00000+0  00000+0 0  9016',
    tle2: '2 45363   0.0000  45.0000 0001000 310.0000  50.0000  1.00271234123456'
  },
  'sat-017': {
    tle1: '1 22675U 93009A   24112.50000000  .00000001  00000+0  00000+0 0  9017',
    tle2: '2 22675  98.6000 300.0000 0012000 180.0000 180.0000 14.34212345123456'
  },
  'sat-018': {
    tle1: '1 25338U 98029A   24112.50000000  .00000001  00000+0  00000+0 0  9018',
    tle2: '2 25338  86.0000 270.0000 0005000 200.0000 160.0000 14.00012345123456'
  }
};

export function propagateSatellite(satId, date = new Date()) {
  const tle = TLE_DATA[satId];
  if (!tle) return null;

  const satrec = satellite.twoline2satrec(tle.tle1, tle.tle2);
  const positionAndVelocity = satellite.propagate(satrec, date);

  if (!positionAndVelocity.position) return null;

  const { position } = positionAndVelocity;
  const gmst = satellite.gstime(date);
  const geodetic = satellite.eciToGeodetic(position, gmst);

  const lat = satellite.degreesLat(geodetic.latitude);
  const lng = satellite.degreesLong(geodetic.longitude);
  const alt = geodetic.height;

  return { lat, lng, altitude: alt };
}

export function propagateAllSatellites(date = new Date()) {
  const results = {};
  for (const satId of Object.keys(TLE_DATA)) {
    const pos = propagateSatellite(satId, date);
    if (pos) results[satId] = pos;
  }
  return results;
}

export function getOrbitalPath(satId, minutes = 90, steps = 180) {
  const tle = TLE_DATA[satId];
  if (!tle) return [];

  const satrec = satellite.twoline2satrec(tle.tle1, tle.tle2);
  const now = new Date();
  const path = [];

  for (let i = 0; i < steps; i++) {
    const t = new Date(now.getTime() + (i * minutes * 60 * 1000) / steps);
    const pv = satellite.propagate(satrec, t);
    if (!pv.position) continue;
    const gmst = satellite.gstime(t);
    const geo = satellite.eciToGeodetic(pv.position, gmst);
    path.push({
      lat: satellite.degreesLat(geo.latitude),
      lng: satellite.degreesLong(geo.longitude),
      alt: geo.height
    });
  }

  return path;
}
