export const satellites = [
  {
    id: 'sat-001', name: 'ISS (ZARYA)', noradId: 25544,
    country: 'International', owner: 'NASA / Roscosmos / JAXA / ESA / CSA',
    type: 'Space Station', status: 'active', launchDate: '1998-11-20',
    orbitType: 'LEO', altitude: 408, inclination: 51.6,
    period: 92.68, apogee: 422, perigee: 418,
    currentPosition: { lat: 0, lng: 0, altitude: 408 },
    velocity: 7.66, mass: 419725, dimensions: '109m x 73m',
    manufacturer: 'Various', purpose: 'Research & International Cooperation',
    imageUrl: 'https://www.nasa.gov/sites/default/files/thumbnails/image/iss.jpg',
    liveFeedUrl: 'https://www.nasa.gov/multimedia/nasatv/index.html',
    frequencies: [
      { band: 'VHF', freq: '143.625 MHz', use: 'Voice (Region 1)' },
      { band: 'UHF', freq: '437.800 MHz', use: 'Packet/APRS' },
      { band: 'S-band', freq: '2.2-2.3 GHz', use: 'Telemetry' },
      { band: 'Ku-band', freq: '12-18 GHz', use: 'Data/Video' }
    ],
    history: [
      { date: '1998-11-20', event: 'Zarya module launched' },
      { date: '1998-12-04', event: 'Unity module docked' },
      { date: '2000-11-02', event: 'First crew arrived' },
      { date: '2021-04-23', event: 'Nauka module added' }
    ]
  },
  {
    id: 'sat-002', name: 'Starlink-1001', noradId: 44713,
    country: 'USA', owner: 'SpaceX',
    type: 'Communications', status: 'active', launchDate: '2019-05-23',
    orbitType: 'LEO', altitude: 550, inclination: 53.0,
    period: 95.6, apogee: 560, perigee: 540,
    currentPosition: { lat: 35, lng: -120, altitude: 550 },
    velocity: 7.59, mass: 260, dimensions: '3.2m x 1.6m',
    manufacturer: 'SpaceX', purpose: 'Global Broadband Internet',
    imageUrl: 'https://www.spacex.com/static/images/backgrounds/starlink.jpg',
    frequencies: [
      { band: 'Ku-band', freq: '10.7-12.7 GHz', use: 'User Downlink' },
      { band: 'Ka-band', freq: '17.8-18.6 GHz', use: 'Gateway Downlink' },
      { band: 'E-band', freq: '71-76 GHz', use: 'Crosslinks' }
    ],
    history: [
      { date: '2019-05-23', event: 'First 60 Starlink satellites launched' },
      { date: '2020-10-27', event: 'Public beta began' }
    ]
  },
  {
    id: 'sat-003', name: 'GPS BIIR-2 (SVN 41)', noradId: 24876,
    country: 'USA', owner: 'United States Space Force',
    type: 'Navigation', status: 'active', launchDate: '1997-07-23',
    orbitType: 'MEO', altitude: 20200, inclination: 55.0,
    period: 718.0, apogee: 20300, perigee: 20100,
    currentPosition: { lat: 40, lng: -100, altitude: 20200 },
    velocity: 3.87, mass: 2032, dimensions: '5.3m x 1.9m',
    manufacturer: 'Lockheed Martin', purpose: 'Global Navigation',
    frequencies: [
      { band: 'L-band', freq: '1575.42 MHz', use: 'L1 C/A' },
      { band: 'L-band', freq: '1227.60 MHz', use: 'L2 P(Y)' },
      { band: 'L-band', freq: '1176.45 MHz', use: 'L5' }
    ],
    history: [
      { date: '1997-07-23', event: 'Launched on Delta II' },
      { date: '1997-08-15', event: 'Set healthy and operational' }
    ]
  },
  {
    id: 'sat-004', name: 'GOES-16 (GOES-R)', noradId: 41866,
    country: 'USA', owner: 'NOAA / NASA',
    type: 'Weather', status: 'active', launchDate: '2016-11-19',
    orbitType: 'GEO', altitude: 35786, inclination: 0.0,
    period: 1436.0, apogee: 35796, perigee: 35776,
    currentPosition: { lat: 0, lng: -75.2, altitude: 35786 },
    velocity: 3.07, mass: 5192, dimensions: '6.1m x 5.6m x 3.9m',
    manufacturer: 'Lockheed Martin', purpose: 'Weather Monitoring',
    imageUrl: 'https://www.goes-r.gov/images/GOES-16_First_Imagery.jpg',
    liveFeedUrl: 'https://www.star.nesdis.noaa.gov/GOES/index.php',
    frequencies: [
      { band: 'L-band', freq: '1675-1695 MHz', use: 'HRIT/EMWIN' },
      { band: 'S-band', freq: '2.2-2.3 GHz', use: 'Telemetry' }
    ],
    history: [
      { date: '2016-11-19', event: 'Launched on Atlas V' },
      { date: '2017-01-15', event: 'First images released' },
      { date: '2017-12-18', event: 'Became operational GOES-East' }
    ]
  },
  {
    id: 'sat-005', name: 'Hubble Space Telescope', noradId: 20580,
    country: 'USA', owner: 'NASA / ESA',
    type: 'Telescope', status: 'active', launchDate: '1990-04-24',
    orbitType: 'LEO', altitude: 540, inclination: 28.5,
    period: 95.4, apogee: 545, perigee: 535,
    currentPosition: { lat: 15, lng: -70, altitude: 540 },
    velocity: 7.59, mass: 11110, dimensions: '13.2m x 4.2m',
    manufacturer: 'Lockheed Martin / Perkin-Elmer', purpose: 'Space Observation',
    imageUrl: 'https://www.nasa.gov/sites/default/files/thumbnails/image/hubble.jpg',
    frequencies: [
      { band: 'S-band', freq: '2.2-2.3 GHz', use: 'Telemetry' },
      { band: 'Ku-band', freq: '12-18 GHz', use: 'Science Data' }
    ],
    history: [
      { date: '1990-04-24', event: 'Launched on STS-31' },
      { date: '1993-12-09', event: 'Servicing Mission 1 (COSTAR fix)' },
      { date: '2009-05-11', event: 'Servicing Mission 4 (final)' }
    ]
  },
  {
    id: 'sat-006', name: 'Iridium NEXT 101', noradId: 43013,
    country: 'USA', owner: 'Iridium Communications',
    type: 'Communications', status: 'active', launchDate: '2017-12-22',
    orbitType: 'LEO', altitude: 780, inclination: 86.4,
    period: 100.4, apogee: 785, perigee: 775,
    currentPosition: { lat: 60, lng: 30, altitude: 780 },
    velocity: 7.46, mass: 860, dimensions: '3.1m x 9.4m x 2.4m',
    manufacturer: 'Thales Alenia Space', purpose: 'Global Satellite Phone & Data',
    frequencies: [
      { band: 'L-band', freq: '1616-1626.5 MHz', use: 'User Links' },
      { band: 'Ka-band', freq: '19.4-19.6 GHz', use: 'Feeder Links' }
    ],
    history: [
      { date: '2017-12-22', event: 'First Iridium NEXT launch' },
      { date: '2019-01-11', event: 'Iridium NEXT constellation complete' }
    ]
  },
  {
    id: 'sat-007', name: 'Sentinel-1A', noradId: 39084,
    country: 'EU', owner: 'European Space Agency',
    type: 'Earth Observation', status: 'active', launchDate: '2014-04-03',
    orbitType: 'LEO', altitude: 693, inclination: 98.2,
    period: 98.6, apogee: 698, perigee: 688,
    currentPosition: { lat: 45, lng: 15, altitude: 693 },
    velocity: 7.55, mass: 2300, dimensions: '3.4m x 1.3m x 1.3m',
    manufacturer: 'Thales Alenia Space', purpose: 'SAR Earth Observation',
    frequencies: [
      { band: 'C-band', freq: '5.405 GHz', use: 'SAR Instrument' },
      { band: 'S-band', freq: '2.2-2.3 GHz', use: 'Telemetry' }
    ],
    history: [
      { date: '2014-04-03', event: 'Launched on Soyuz' },
      { date: '2014-10-06', event: 'Began routine operations' }
    ]
  },
  {
    id: 'sat-008', name: 'GLONASS-M 755', noradId: 37846,
    country: 'Russia', owner: 'Russian Aerospace Forces',
    type: 'Navigation', status: 'active', launchDate: '2011-10-02',
    orbitType: 'MEO', altitude: 19130, inclination: 64.8,
    period: 675.7, apogee: 19160, perigee: 19100,
    currentPosition: { lat: 50, lng: 60, altitude: 19130 },
    velocity: 3.95, mass: 1415, dimensions: '3.7m x 1.7m',
    manufacturer: 'Reshetnev ISS', purpose: 'Global Navigation',
    frequencies: [
      { band: 'L-band', freq: '1602.0 MHz', use: 'L1' },
      { band: 'L-band', freq: '1246.0 MHz', use: 'L2' }
    ],
    history: [
      { date: '2011-10-02', event: 'Launched on Soyuz-2.1b' },
      { date: '2011-10-15', event: 'Commissioned' }
    ]
  },
  {
    id: 'sat-009', name: 'BeiDou-3 M1', noradId: 43566,
    country: 'China', owner: 'China National Space Administration',
    type: 'Navigation', status: 'active', launchDate: '2018-07-29',
    orbitType: 'MEO', altitude: 21528, inclination: 55.0,
    period: 730.0, apogee: 21550, perigee: 21500,
    currentPosition: { lat: 30, lng: 110, altitude: 21528 },
    velocity: 3.83, mass: 1014, dimensions: '2.5m x 1.5m',
    manufacturer: 'CAST', purpose: 'Global Navigation',
    frequencies: [
      { band: 'L-band', freq: '1561.098 MHz', use: 'B1' },
      { band: 'L-band', freq: '1207.14 MHz', use: 'B2' }
    ],
    history: [
      { date: '2018-07-29', event: 'Launched on Long March 3B' },
      { date: '2018-12-27', event: 'Began global service' }
    ]
  },
  {
    id: 'sat-010', name: 'Galileo FOC FM1', noradId: 41105,
    country: 'EU', owner: 'European Space Agency / GSA',
    type: 'Navigation', status: 'active', launchDate: '2015-09-11',
    orbitType: 'MEO', altitude: 23222, inclination: 56.0,
    period: 844.0, apogee: 23250, perigee: 23200,
    currentPosition: { lat: 45, lng: 5, altitude: 23222 },
    velocity: 3.79, mass: 733, dimensions: '2.7m x 1.5m x 1.2m',
    manufacturer: 'OHB System', purpose: 'Global Navigation',
    frequencies: [
      { band: 'L-band', freq: '1575.42 MHz', use: 'E1' },
      { band: 'L-band', freq: '1278.75 MHz', use: 'E6' }
    ],
    history: [
      { date: '2015-09-11', event: 'Launched on Soyuz VS12' },
      { date: '2016-12-15', event: 'Initial services declared' }
    ]
  },
  {
    id: 'sat-011', name: 'Intelsat 35e', noradId: 43226,
    country: 'USA', owner: 'Intelsat',
    type: 'Communications', status: 'active', launchDate: '2018-02-01',
    orbitType: 'GEO', altitude: 35786, inclination: 0.0,
    period: 1436.0, apogee: 35796, perigee: 35776,
    currentPosition: { lat: 0, lng: -34.5, altitude: 35786 },
    velocity: 3.07, mass: 6761, dimensions: '8.9m x 3.7m x 3.7m',
    manufacturer: 'Boeing', purpose: 'Commercial Communications',
    frequencies: [
      { band: 'C-band', freq: '3.7-4.2 GHz', use: 'FSS' },
      { band: 'Ku-band', freq: '10.7-12.7 GHz', use: 'FSS' },
      { band: 'Ka-band', freq: '17.8-20.2 GHz', use: 'BSS' }
    ],
    history: [
      { date: '2018-02-01', event: 'Launched on Ariane 5' },
      { date: '2018-03-15', event: 'Began commercial service' }
    ]
  },
  {
    id: 'sat-012', name: 'Kosmos-2251 (Debris)', noradId: 28492,
    country: 'Russia', owner: 'Russian Aerospace Forces',
    type: 'Communications', status: 'inactive', launchDate: '1993-06-16',
    orbitType: 'LEO', altitude: 790, inclination: 74.0,
    period: 100.8, apogee: 805, perigee: 775,
    currentPosition: { lat: 30, lng: 120, altitude: 790 },
    velocity: 7.45, mass: 900, dimensions: '2.0m x 2.0m',
    manufacturer: 'NPO PM', purpose: 'Military Communications (defunct)',
    notes: 'Destroyed in 2009 collision with Iridium 33. Now tracked as debris field.',
    history: [
      { date: '1993-06-16', event: 'Launched on Kosmos-3M' },
      { date: '2009-02-10', event: 'Collided with Iridium 33' }
    ]
  },
  {
    id: 'sat-013', name: 'Iridium 33 (Debris)', noradId: 26900,
    country: 'USA', owner: 'Iridium Communications',
    type: 'Communications', status: 'inactive', launchDate: '1997-09-14',
    orbitType: 'LEO', altitude: 780, inclination: 86.4,
    period: 100.4, apogee: 785, perigee: 775,
    currentPosition: { lat: -30, lng: -60, altitude: 780 },
    velocity: 7.46, mass: 689, dimensions: '3.1m x 2.4m',
    manufacturer: 'Lockheed Martin', purpose: 'Satellite Phone (defunct)',
    notes: 'Destroyed in 2009 collision with Kosmos-2251. Major debris event.',
    history: [
      { date: '1997-09-14', event: 'Launched on Delta II' },
      { date: '2009-02-10', event: 'Destroyed in collision' }
    ]
  },
  {
    id: 'sat-014', name: 'TerraSAR-X', noradId: 52287,
    country: 'Germany', owner: 'DLR / Airbus Defence and Space',
    type: 'Earth Observation', status: 'active', launchDate: '2007-06-15',
    orbitType: 'LEO', altitude: 514, inclination: 97.4,
    period: 94.8, apogee: 518, perigee: 510,
    currentPosition: { lat: 50, lng: 10, altitude: 514 },
    velocity: 7.62, mass: 1230, dimensions: '5.0m x 2.4m',
    manufacturer: 'EADS Astrium', purpose: 'SAR Earth Observation',
    frequencies: [
      { band: 'X-band', freq: '9.65 GHz', use: 'SAR Instrument' },
      { band: 'S-band', freq: '2.2-2.3 GHz', use: 'Telemetry' }
    ],
    history: [
      { date: '2007-06-15', event: 'Launched on Dnepr rocket' },
      { date: '2008-01-07', event: 'Began operational service' }
    ]
  },
  {
    id: 'sat-015', name: 'Landsat 9', noradId: 48274,
    country: 'USA', owner: 'NASA / USGS',
    type: 'Earth Observation', status: 'active', launchDate: '2021-09-27',
    orbitType: 'LEO', altitude: 705, inclination: 98.2,
    period: 98.9, apogee: 710, perigee: 700,
    currentPosition: { lat: 35, lng: -95, altitude: 705 },
    velocity: 7.54, mass: 2711, dimensions: '3.0m x 3.0m x 8.0m',
    manufacturer: 'Northrop Grumman', purpose: 'Earth Observation & Land Monitoring',
    frequencies: [
      { band: 'X-band', freq: '8.0-8.4 GHz', use: 'Science Data Downlink' },
      { band: 'S-band', freq: '2.2-2.3 GHz', use: 'Telemetry' }
    ],
    history: [
      { date: '2021-09-27', event: 'Launched on Atlas V' },
      { date: '2022-02-10', event: 'Began routine operations' }
    ]
  },
  {
    id: 'sat-016', name: 'Eutelsat 5 West B', noradId: 45363,
    country: 'France', owner: 'Eutelsat',
    type: 'Communications', status: 'active', launchDate: '2019-10-09',
    orbitType: 'GEO', altitude: 35786, inclination: 0.0,
    period: 1436.0, apogee: 35796, perigee: 35776,
    currentPosition: { lat: 0, lng: 5, altitude: 35786 },
    velocity: 3.07, mass: 3200, dimensions: '4.5m x 2.8m x 2.8m',
    manufacturer: 'Airbus Defence and Space', purpose: 'Commercial Communications',
    frequencies: [
      { band: 'Ku-band', freq: '10.7-12.7 GHz', use: 'FSS' },
      { band: 'C-band', freq: '3.7-4.2 GHz', use: 'FSS' }
    ],
    history: [
      { date: '2019-10-09', event: 'Launched on Ariane 5' },
      { date: '2019-11-15', event: 'Began commercial service' }
    ]
  },
  {
    id: 'sat-017', name: 'NOAA 15', noradId: 22675,
    country: 'USA', owner: 'NOAA',
    type: 'Weather', status: 'active', launchDate: '1998-05-13',
    orbitType: 'LEO', altitude: 807, inclination: 98.7,
    period: 101.2, apogee: 812, perigee: 802,
    currentPosition: { lat: 60, lng: -150, altitude: 807 },
    velocity: 7.43, mass: 2232, dimensions: '4.2m x 1.9m',
    manufacturer: 'Lockheed Martin', purpose: 'Weather Monitoring',
    frequencies: [
      { band: 'VHF', freq: '137.62 MHz', use: 'APT (Automatic Picture Transmission)' },
      { band: 'L-band', freq: '1698.0 MHz', use: 'HRPT' }
    ],
    history: [
      { date: '1998-05-13', event: 'Launched on Titan II' },
      { date: '1998-06-01', event: 'Began operational service' }
    ]
  },
  {
    id: 'sat-018', name: 'Envisat (Defunct)', noradId: 25338,
    country: 'EU', owner: 'European Space Agency',
    type: 'Earth Observation', status: 'inactive', launchDate: '2002-03-01',
    orbitType: 'LEO', altitude: 790, inclination: 98.5,
    period: 100.9, apogee: 795, perigee: 785,
    currentPosition: { lat: 45, lng: 90, altitude: 790 },
    velocity: 7.45, mass: 8211, dimensions: '10.5m x 4.6m x 4.6m',
    manufacturer: 'EADS Astrium', purpose: 'Environmental Monitoring',
    notes: 'Largest civilian Earth observation satellite. Contact lost April 2012. Remains in orbit as debris.',
    history: [
      { date: '2002-03-01', event: 'Launched on Ariane 5' },
      { date: '2012-04-08', event: 'Contact unexpectedly lost' }
    ]
  },
  {
    id: 'sat-019', name: 'OneWeb 0001', noradId: 47958,
    country: 'UK', owner: 'OneWeb / Eutelsat',
    type: 'Communications', status: 'active', launchDate: '2019-02-27',
    orbitType: 'LEO', altitude: 1200, inclination: 87.9,
    period: 109.4, apogee: 1210, perigee: 1190,
    currentPosition: { lat: 55, lng: -10, altitude: 1200 },
    velocity: 7.32, mass: 147.5, dimensions: '1.0m x 0.5m x 0.5m',
    manufacturer: 'Airbus Defence and Space', purpose: 'Global Broadband Internet',
    frequencies: [
      { band: 'Ku-band', freq: '10.7-12.7 GHz', use: 'User Downlink' },
      { band: 'Ka-band', freq: '17.8-18.6 GHz', use: 'Gateway Downlink' }
    ],
    history: [
      { date: '2019-02-27', event: 'First six OneWeb satellites launched' },
      { date: '2020-12-18', event: 'OneWeb emerged from Chapter 11' }
    ]
  },
  {
    id: 'sat-020', name: 'Tiangong Space Station', noradId: 54216,
    country: 'China', owner: 'China Manned Space Agency',
    type: 'Space Station', status: 'active', launchDate: '2021-04-29',
    orbitType: 'LEO', altitude: 390, inclination: 41.5,
    period: 91.5, apogee: 395, perigee: 385,
    currentPosition: { lat: 20, lng: 110, altitude: 390 },
    velocity: 7.68, mass: 66000, dimensions: '37.0m x 14.0m',
    manufacturer: 'CAST', purpose: 'Research & Space Exploration',
    frequencies: [
      { band: 'VHF', freq: '143.625 MHz', use: 'Voice' },
      { band: 'UHF', freq: '437.800 MHz', use: 'Data' },
      { band: 'S-band', freq: '2.2-2.3 GHz', use: 'Telemetry' }
    ],
    history: [
      { date: '2021-04-29', event: 'Tianhe core module launched' },
      { date: '2022-07-24', event: 'Wentian lab module docked' },
      { date: '2022-10-31', event: 'Mengtian lab module docked' }
    ]
  },
  {
    id: 'sat-021', name: 'Jason-3', noradId: 41240,
    country: 'USA', owner: 'NOAA / NASA / CNES / EUMETSAT',
    type: 'Earth Observation', status: 'active', launchDate: '2016-01-17',
    orbitType: 'LEO', altitude: 1336, inclination: 66.0,
    period: 112.4, apogee: 1340, perigee: 1332,
    currentPosition: { lat: 25, lng: -150, altitude: 1336 },
    velocity: 7.26, mass: 553, dimensions: '3.8m x 1.8m',
    manufacturer: 'Thales Alenia Space', purpose: 'Ocean Surface Topography',
    frequencies: [
      { band: 'C-band', freq: '5.3 GHz', use: 'Altimeter' },
      { band: 'S-band', freq: '2.2-2.3 GHz', use: 'Telemetry' }
    ],
    history: [
      { date: '2016-01-17', event: 'Launched on Falcon 9' },
      { date: '2016-03-01', event: 'Began operational service' }
    ]
  },
  {
    id: 'sat-022', name: 'XMM-Newton', noradId: 25989,
    country: 'EU', owner: 'European Space Agency',
    type: 'Telescope', status: 'active', launchDate: '1999-12-10',
    orbitType: 'HEO', altitude: 114000, inclination: 40.0,
    period: 2880.0, apogee: 114000, perigee: 7000,
    currentPosition: { lat: 30, lng: 60, altitude: 40000 },
    velocity: 1.45, mass: 3800, dimensions: '10.8m x 3.8m',
    manufacturer: 'EADS Astrium', purpose: 'X-ray Astronomy',
    frequencies: [
      { band: 'S-band', freq: '2.2-2.3 GHz', use: 'Telemetry' },
      { band: 'X-band', freq: '8.0-8.4 GHz', use: 'Science Data' }
    ],
    history: [
      { date: '1999-12-10', event: 'Launched on Ariane 5' },
      { date: '2000-01-15', event: 'Began science operations' }
    ]
  },
  {
    id: 'sat-023', name: 'RADARSAT Constellation Mission', noradId: 44301,
    country: 'Canada', owner: 'Canadian Space Agency',
    type: 'Earth Observation', status: 'active', launchDate: '2019-06-12',
    orbitType: 'LEO', altitude: 600, inclination: 97.8,
    period: 96.5, apogee: 605, perigee: 595,
    currentPosition: { lat: 55, lng: -100, altitude: 600 },
    velocity: 7.57, mass: 1430, dimensions: '4.0m x 2.0m',
    manufacturer: 'MDA Corporation', purpose: 'SAR Earth Observation',
    frequencies: [
      { band: 'C-band', freq: '5.405 GHz', use: 'SAR Instrument' },
      { band: 'S-band', freq: '2.2-2.3 GHz', use: 'Telemetry' }
    ],
    history: [
      { date: '2019-06-12', event: 'Launched on Falcon 9' },
      { date: '2019-09-01', event: 'Began operational service' }
    ]
  },
  {
    id: 'sat-024', name: 'SkySat 1', noradId: 42980,
    country: 'USA', owner: 'Planet Labs',
    type: 'Earth Observation', status: 'active', launchDate: '2016-09-16',
    orbitType: 'LEO', altitude: 450, inclination: 97.0,
    period: 93.5, apogee: 455, perigee: 445,
    currentPosition: { lat: 40, lng: -80, altitude: 450 },
    velocity: 7.64, mass: 110, dimensions: '0.6m x 0.6m x 0.9m',
    manufacturer: 'Planet Labs / Skybox Imaging', purpose: 'High-Resolution Earth Imaging',
    frequencies: [
      { band: 'X-band', freq: '8.0-8.4 GHz', use: 'Image Downlink' },
      { band: 'S-band', freq: '2.2-2.3 GHz', use: 'Telemetry' }
    ],
    history: [
      { date: '2016-09-16', event: 'Launched on Vega rocket' },
      { date: '2016-10-01', event: 'Began commercial imaging' }
    ]
  },
  {
    id: 'sat-025', name: 'GSAT-30', noradId: 45465,
    country: 'India', owner: 'ISRO',
    type: 'Communications', status: 'active', launchDate: '2020-01-17',
    orbitType: 'GEO', altitude: 35786, inclination: 0.0,
    period: 1436.0, apogee: 35796, perigee: 35776,
    currentPosition: { lat: 0, lng: 83, altitude: 35786 },
    velocity: 3.07, mass: 3357, dimensions: '3.6m x 2.8m x 2.8m',
    manufacturer: 'ISRO', purpose: 'Communications & DTH',
    frequencies: [
      { band: 'Ku-band', freq: '10.7-12.7 GHz', use: 'FSS/DTH' },
      { band: 'C-band', freq: '3.7-4.2 GHz', use: 'FSS' }
    ],
    history: [
      { date: '2020-01-17', event: 'Launched on Ariane 5' },
      { date: '2020-02-15', event: 'Began commercial service' }
    ]
  },
  {
    id: 'sat-026', name: 'KH-11 Kennen (USA-224)', noradId: 37348,
    country: 'USA', owner: 'NRO / US Space Force',
    type: 'Reconnaissance', status: 'active', launchDate: '2011-01-20',
    orbitType: 'LEO', altitude: 270, inclination: 97.9,
    period: 89.9, apogee: 450, perigee: 250,
    currentPosition: { lat: 33, lng: 44, altitude: 270 },
    velocity: 7.72, mass: 19600, dimensions: '19.5m x 3.0m',
    manufacturer: 'Lockheed Martin', purpose: 'Optical Reconnaissance',
    frequencies: [
      { band: 'X-band', freq: '8.0-8.4 GHz', use: 'Image Downlink' },
      { band: 'S-band', freq: '2.2-2.3 GHz', use: 'Telemetry' }
    ],
    history: [
      { date: '2011-01-20', event: 'Launched on Delta IV Heavy' },
      { date: '2011-03-01', event: 'Declared operational' }
    ]
  },
  {
    id: 'sat-027', name: 'Landsat 9', noradId: 49260,
    country: 'USA', owner: 'NASA / USGS',
    type: 'Earth Observation', status: 'active', launchDate: '2021-09-27',
    orbitType: 'LEO', altitude: 705, inclination: 98.2,
    period: 99.1, apogee: 710, perigee: 700,
    currentPosition: { lat: 42, lng: -105, altitude: 705 },
    velocity: 7.50, mass: 2711, dimensions: '4.6m x 3.0m',
    manufacturer: 'Northrop Grumman', purpose: 'Land Imaging',
    frequencies: [
      { band: 'X-band', freq: '8.2 GHz', use: 'Science Data' },
      { band: 'S-band', freq: '2.2 GHz', use: 'TTC&C' }
    ],
    history: [
      { date: '2021-09-27', event: 'Launched on Atlas V' },
      { date: '2021-10-31', event: 'First light images released' }
    ]
  },
  {
    id: 'sat-028', name: 'Envisat', noradId: 27386,
    country: 'ESA', owner: 'European Space Agency',
    type: 'Earth Observation', status: 'inactive', launchDate: '2002-03-01',
    orbitType: 'LEO', altitude: 782, inclination: 98.6,
    period: 100.6, apogee: 790, perigee: 774,
    currentPosition: { lat: -15, lng: 140, altitude: 782 },
    velocity: 7.45, mass: 8211, dimensions: '26m x 10m x 5m',
    manufacturer: 'Airbus Defence and Space', purpose: 'Environmental Monitoring',
    notes: 'Contact lost April 2012. Now a major space debris item.',
    frequencies: [
      { band: 'S-band', freq: '2.2-2.3 GHz', use: 'Telemetry' },
      { band: 'X-band', freq: '8.0-8.4 GHz', use: 'Science Data' },
      { band: 'Ka-band', freq: '26.5-40 GHz', use: 'Payload Data' }
    ],
    history: [
      { date: '2002-03-01', event: 'Launched on Ariane 5' },
      { date: '2012-04-08', event: 'Communication suddenly lost' }
    ]
  },
  {
    id: 'sat-029', name: 'Himawari-9', noradId: 41836,
    country: 'Japan', owner: 'Japan Meteorological Agency',
    type: 'Weather', status: 'active', launchDate: '2016-11-02',
    orbitType: 'GEO', altitude: 35786, inclination: 0.0,
    period: 1436.0, apogee: 35796, perigee: 35776,
    currentPosition: { lat: 0, lng: 140.7, altitude: 35786 },
    velocity: 3.07, mass: 3500, dimensions: '5.2m x 2.8m x 2.8m',
    manufacturer: 'Mitsubishi Electric', purpose: 'Weather Monitoring (Asia-Pacific)',
    frequencies: [
      { band: 'S-band', freq: '2.2-2.3 GHz', use: 'Telemetry/Command' },
      { band: 'Ka-band', freq: '18.1-18.4 GHz', use: 'Data Transmission' }
    ],
    history: [
      { date: '2016-11-02', event: 'Launched on H-IIA' },
      { date: '2017-03-01', event: 'Began operational service' }
    ]
  },
  {
    id: 'sat-030', name: 'SARah-1', noradId: 51851,
    country: 'Germany', owner: 'Bundeswehr / DLR',
    type: 'Reconnaissance', status: 'active', launchDate: '2022-06-18',
    orbitType: 'LEO', altitude: 745, inclination: 98.4,
    period: 99.5, apogee: 750, perigee: 740,
    currentPosition: { lat: 52, lng: 13, altitude: 745 },
    velocity: 7.48, mass: 2200, dimensions: '4.5m x 2.5m',
    manufacturer: 'Airbus Defence and Space', purpose: 'SAR Radar Reconnaissance',
    frequencies: [
      { band: 'X-band', freq: '9.6 GHz', use: 'SAR Payload' },
      { band: 'S-band', freq: '2.2 GHz', use: 'TTC&C' }
    ],
    history: [
      { date: '2022-06-18', event: 'Launched on Falcon 9' },
      { date: '2022-09-01', event: 'Declared operational' }
    ]
  },
  {
    id: 'sat-031', name: 'QZS-1R (Michibiki)', noradId: 49336,
    country: 'Japan', owner: 'JAXA / Cabinet Office',
    type: 'Navigation', status: 'active', launchDate: '2021-10-26',
    orbitType: 'HEO', altitude: 36000, inclination: 43.0,
    period: 1436.0, apogee: 38950, perigee: 32618,
    currentPosition: { lat: 35, lng: 139, altitude: 36000 },
    velocity: 3.07, mass: 4100, dimensions: '6.2m x 2.8m',
    manufacturer: 'Mitsubishi Electric', purpose: 'QZSS Regional Navigation',
    frequencies: [
      { band: 'L-band', freq: '1575.42 MHz', use: 'L1C/A' },
      { band: 'L-band', freq: '1278.75 MHz', use: 'L6' },
      { band: 'L-band', freq: '1176.45 MHz', use: 'L5' }
    ],
    history: [
      { date: '2021-10-26', event: 'Launched on H-IIA' },
      { date: '2022-02-01', event: 'Began operational service' }
    ]
  },
  {
    id: 'sat-032', name: 'PlanetScope (Flock 4x)', noradId: 47601,
    country: 'USA', owner: 'Planet Labs',
    type: 'Earth Observation', status: 'active', launchDate: '2021-01-24',
    orbitType: 'LEO', altitude: 525, inclination: 97.5,
    period: 95.3, apogee: 530, perigee: 520,
    currentPosition: { lat: -30, lng: 25, altitude: 525 },
    velocity: 7.60, mass: 5, dimensions: '0.1m x 0.1m x 0.3m',
    manufacturer: 'Planet Labs', purpose: 'Daily Earth Imaging Constellation',
    frequencies: [
      { band: 'X-band', freq: '8.0-8.5 GHz', use: 'Payload Data' },
      { band: 'UHF', freq: '401 MHz', use: 'Telemetry' }
    ],
    history: [
      { date: '2021-01-24', event: 'Flock 4x batch launched on Falcon 9' },
      { date: '2021-02-15', event: 'Constellation fully operational' }
    ]
  },
  {
    id: 'sat-033', name: 'COSMO-SkyMed 2nd Gen', noradId: 51125,
    country: 'Italy', owner: 'ASI / Italian MoD',
    type: 'Reconnaissance', status: 'active', launchDate: '2022-01-31',
    orbitType: 'LEO', altitude: 619, inclination: 97.86,
    period: 97.1, apogee: 625, perigee: 613,
    currentPosition: { lat: 42, lng: 12, altitude: 619 },
    velocity: 7.55, mass: 2230, dimensions: '4.2m x 2.1m',
    manufacturer: 'Thales Alenia Space', purpose: 'Dual-Use SAR Imaging',
    frequencies: [
      { band: 'X-band', freq: '9.6 GHz', use: 'SAR Payload' },
      { band: 'S-band', freq: '2.2-2.3 GHz', use: 'TTC&C' }
    ],
    history: [
      { date: '2022-01-31', event: 'Launched on Falcon 9' },
      { date: '2022-04-15', event: 'Began operational service' }
    ]
  },
  {
    id: 'sat-034', name: 'Tiangong Space Station', noradId: 54216,
    country: 'China', owner: 'CNSA / CMSA',
    type: 'Space Station', status: 'active', launchDate: '2021-04-29',
    orbitType: 'LEO', altitude: 390, inclination: 41.5,
    period: 92.2, apogee: 400, perigee: 380,
    currentPosition: { lat: 30, lng: 110, altitude: 390 },
    velocity: 7.68, mass: 22000, dimensions: '55.6m x 39.2m',
    manufacturer: 'CAST', purpose: 'Research & Space Station Operations',
    frequencies: [
      { band: 'S-band', freq: '2.2-2.3 GHz', use: 'Telemetry/TV' },
      { band: 'Ka-band', freq: '18-30 GHz', use: 'Data Relay' },
      { band: 'VHF', freq: '143 MHz', use: 'Voice/Beacon' }
    ],
    history: [
      { date: '2021-04-29', event: 'Tianhe core module launched' },
      { date: '2022-10-31', event: 'Mengtian lab module docked' },
      { date: '2023-05-30', event: 'First crew to expanded station' }
    ]
  },
  {
    id: 'sat-035', name: 'AEHF-6 (USA-298)', noradId: 45465,
    country: 'USA', owner: 'US Space Force',
    type: 'Communications', status: 'active', launchDate: '2020-03-26',
    orbitType: 'GEO', altitude: 35786, inclination: 4.0,
    period: 1436.0, apogee: 35796, perigee: 35776,
    currentPosition: { lat: 0, lng: -30, altitude: 35786 },
    velocity: 3.07, mass: 6168, dimensions: '9.8m x 3.0m',
    manufacturer: 'Lockheed Martin', purpose: 'Hardened Strategic Communications',
    frequencies: [
      { band: 'EHF/SHF', freq: '44 GHz', use: 'Uplink' },
      { band: 'SHF', freq: '20 GHz', use: 'Downlink' }
    ],
    history: [
      { date: '2020-03-26', event: 'Launched on Atlas V' },
      { date: '2020-06-15', event: 'Declared operational' }
    ]
  },
  {
    id: 'sat-036', name: 'Sentinel-3B', noradId: 43437,
    country: 'ESA', owner: 'ESA / EUMETSAT',
    type: 'Earth Observation', status: 'active', launchDate: '2018-04-25',
    orbitType: 'LEO', altitude: 815, inclination: 98.65,
    period: 101.0, apogee: 820, perigee: 810,
    currentPosition: { lat: 50, lng: -5, altitude: 815 },
    velocity: 7.45, mass: 1150, dimensions: '3.9m x 1.3m x 1.3m',
    manufacturer: 'Thales Alenia Space', purpose: 'Ocean & Land Monitoring',
    frequencies: [
      { band: 'X-band', freq: '8.1 GHz', use: 'Science Data' },
      { band: 'S-band', freq: '2.2 GHz', use: 'TT&C' }
    ],
    history: [
      { date: '2018-04-25', event: 'Launched on Rockot' },
      { date: '2018-07-15', event: 'Began operational service' }
    ]
  },
  {
    id: 'sat-037', name: 'ALOS-4 (Daichi-4)', noradId: 60086,
    country: 'Japan', owner: 'JAXA',
    type: 'Earth Observation', status: 'active', launchDate: '2024-07-01',
    orbitType: 'LEO', altitude: 628, inclination: 97.9,
    period: 97.4, apogee: 635, perigee: 621,
    currentPosition: { lat: 36, lng: 138, altitude: 628 },
    velocity: 7.55, mass: 2120, dimensions: '10.0m x 4.0m',
    manufacturer: 'Mitsubishi Electric', purpose: 'L-band SAR Earth Observation',
    frequencies: [
      { band: 'L-band', freq: '1.2 GHz', use: 'SAR Payload' },
      { band: 'X-band', freq: '8.2 GHz', use: 'Data Downlink' }
    ],
    history: [
      { date: '2024-07-01', event: 'Launched on H3 rocket' },
      { date: '2024-09-01', event: 'First images released' }
    ]
  },
  {
    id: 'sat-038', name: 'Eutelsat Konnect VHTS', noradId: 51590,
    country: 'France', owner: 'Eutelsat',
    type: 'Communications', status: 'active', launchDate: '2022-09-07',
    orbitType: 'GEO', altitude: 35786, inclination: 0.0,
    period: 1436.0, apogee: 35796, perigee: 35776,
    currentPosition: { lat: 0, lng: -7, altitude: 35786 },
    velocity: 3.07, mass: 6400, dimensions: '8.8m x 3.5m',
    manufacturer: 'Thales Alenia Space', purpose: 'Very High Throughput Broadband',
    frequencies: [
      { band: 'Ka-band', freq: '17.8-20.2 GHz', use: 'User Downlink' },
      { band: 'Ka-band', freq: '27.5-30.0 GHz', use: 'User Uplink' }
    ],
    history: [
      { date: '2022-09-07', event: 'Launched on Ariane 5' },
      { date: '2023-01-15', event: 'Began commercial service' }
    ]
  },
  {
    id: 'sat-039', name: 'NROL-91 (Orion 11)', noradId: 53465,
    country: 'USA', owner: 'NRO',
    type: 'Reconnaissance', status: 'active', launchDate: '2022-11-12',
    orbitType: 'GEO', altitude: 35786, inclination: 8.0,
    period: 1436.0, apogee: 35800, perigee: 35780,
    currentPosition: { lat: 0, lng: 45, altitude: 35786 },
    velocity: 3.07, mass: 5200, dimensions: '7.5m x 3.0m',
    manufacturer: 'Lockheed Martin', purpose: 'Signals Intelligence (SIGINT)',
    frequencies: [
      { band: 'SHF', freq: '12-18 GHz', use: 'SIGINT Collection' },
      { band: 'S-band', freq: '2.2-2.3 GHz', use: 'TTC&C' }
    ],
    history: [
      { date: '2022-11-12', event: 'Launched on Atlas V' },
      { date: '2023-02-01', event: 'Declared operational' }
    ]
  },
  {
    id: 'sat-040', name: 'O3b mPOWER (1-3)', noradId: 54682,
    country: 'UK', owner: 'SES',
    type: 'Communications', status: 'active', launchDate: '2023-04-28',
    orbitType: 'MEO', altitude: 8062, inclination: 0.0,
    period: 287.9, apogee: 8070, perigee: 8055,
    currentPosition: { lat: 5, lng: -140, altitude: 8062 },
    velocity: 5.34, mass: 1700, dimensions: '3.2m x 2.0m x 2.0m',
    manufacturer: 'Boeing', purpose: 'High-Throughput MEO Broadband',
    frequencies: [
      { band: 'Ka-band', freq: '17.7-20.2 GHz', use: 'Downlink' },
      { band: 'Ka-band', freq: '27.5-30.0 GHz', use: 'Uplink' }
    ],
    history: [
      { date: '2023-04-28', event: 'First batch launched on Falcon 9' },
      { date: '2023-08-01', event: 'Began commercial service' }
    ]
  },
  {
    id: 'sat-041', name: 'RISAT-2BR1', noradId: 44857,
    country: 'India', owner: 'ISRO / DRDO',
    type: 'Reconnaissance', status: 'active', launchDate: '2019-12-11',
    orbitType: 'LEO', altitude: 576, inclination: 37.0,
    period: 96.2, apogee: 580, perigee: 570,
    currentPosition: { lat: 20, lng: 78, altitude: 576 },
    velocity: 7.57, mass: 628, dimensions: '2.8m x 1.5m',
    manufacturer: 'ISRO', purpose: 'X-band SAR Reconnaissance',
    frequencies: [
      { band: 'X-band', freq: '9.6 GHz', use: 'SAR Payload' },
      { band: 'S-band', freq: '2.2 GHz', use: 'Telemetry' }
    ],
    history: [
      { date: '2019-12-11', event: 'Launched on PSLV' },
      { date: '2020-01-30', event: 'First SAR images received' }
    ]
  },
  {
    id: 'sat-042', name: 'ICESat-2', noradId: 43613,
    country: 'USA', owner: 'NASA',
    type: 'Earth Observation', status: 'active', launchDate: '2018-09-15',
    orbitType: 'LEO', altitude: 496, inclination: 92.0,
    period: 94.6, apogee: 500, perigee: 492,
    currentPosition: { lat: -85, lng: -60, altitude: 496 },
    velocity: 7.62, mass: 1514, dimensions: '3.6m x 2.5m',
    manufacturer: 'Northrop Grumman', purpose: 'Ice Sheet Elevation Measurement',
    frequencies: [
      { band: 'S-band', freq: '2.2 GHz', use: 'Telemetry/Command' },
      { band: 'X-band', freq: '8.0-8.5 GHz', use: 'Science Data' }
    ],
    history: [
      { date: '2018-09-15', event: 'Launched on Delta II (final flight)' },
      { date: '2018-10-03', event: 'First laser fired successfully' }
    ]
  },
  {
    id: 'sat-043', name: 'HawkEye 360 (Cluster 8)', noradId: 56176,
    country: 'USA', owner: 'HawkEye 360',
    type: 'Reconnaissance', status: 'active', launchDate: '2023-01-03',
    orbitType: 'LEO', altitude: 510, inclination: 97.5,
    period: 95.0, apogee: 515, perigee: 505,
    currentPosition: { lat: 38, lng: -77, altitude: 510 },
    velocity: 7.60, mass: 15, dimensions: '0.3m x 0.2m x 0.1m',
    manufacturer: 'HawkEye 360', purpose: 'RF Geolocation Intelligence',
    frequencies: [
      { band: 'VHF/UHF', freq: '30-3000 MHz', use: 'RF Sensing' },
      { band: 'S-band', freq: '2.2 GHz', use: 'Telemetry' }
    ],
    history: [
      { date: '2023-01-03', event: 'Cluster 8 launched on Falcon 9' },
      { date: '2023-02-15', event: 'Began RF mapping operations' }
    ]
  },
  {
    id: 'sat-044', name: 'GLONASS-K2 (Kosmos 2569)', noradId: 55546,
    country: 'Russia', owner: 'Roscosmos / VKS',
    type: 'Navigation', status: 'active', launchDate: '2023-08-07',
    orbitType: 'MEO', altitude: 19100, inclination: 64.8,
    period: 675.7, apogee: 19150, perigee: 19050,
    currentPosition: { lat: 55, lng: 37, altitude: 19100 },
    velocity: 3.95, mass: 1645, dimensions: '2.7m x 3.0m',
    manufacturer: 'ISS Reshetnev', purpose: 'Global Navigation (GLONASS)',
    frequencies: [
      { band: 'L-band', freq: '1602.0 MHz', use: 'L1' },
      { band: 'L-band', freq: '1246.0 MHz', use: 'L2' },
      { band: 'L-band', freq: '1202.025 MHz', use: 'L3' }
    ],
    history: [
      { date: '2023-08-07', event: 'Launched on Soyuz-2.1b' },
      { date: '2023-10-01', event: 'Commissioned into GLONASS constellation' }
    ]
  },
  {
    id: 'sat-045', name: 'Amazonas Nexus', noradId: 55507,
    country: 'Spain', owner: 'Hispasat',
    type: 'Communications', status: 'active', launchDate: '2023-02-07',
    orbitType: 'GEO', altitude: 35786, inclination: 0.0,
    period: 1436.0, apogee: 35796, perigee: 35776,
    currentPosition: { lat: 0, lng: -61, altitude: 35786 },
    velocity: 3.07, mass: 4500, dimensions: '5.3m x 2.5m',
    manufacturer: 'Thales Alenia Space', purpose: 'Ku-band HTS for Americas',
    frequencies: [
      { band: 'Ku-band', freq: '10.7-12.7 GHz', use: 'FSS' },
      { band: 'Ka-band', freq: '17.7-20.2 GHz', use: 'Gateway' }
    ],
    history: [
      { date: '2023-02-07', event: 'Launched on Falcon 9' },
      { date: '2023-05-01', event: 'Began commercial service' }
    ]
  },
  {
    id: 'sat-046', name: 'EROS-C3', noradId: 54708,
    country: 'Israel', owner: 'ImageSat International',
    type: 'Reconnaissance', status: 'active', launchDate: '2022-12-30',
    orbitType: 'LEO', altitude: 500, inclination: 97.3,
    period: 94.7, apogee: 505, perigee: 495,
    currentPosition: { lat: 31, lng: 35, altitude: 500 },
    velocity: 7.61, mass: 400, dimensions: '2.5m x 1.2m',
    manufacturer: 'Israel Aerospace Industries', purpose: 'Very High Resolution Imaging',
    frequencies: [
      { band: 'X-band', freq: '8.0-8.4 GHz', use: 'Image Download' },
      { band: 'S-band', freq: '2.2 GHz', use: 'TT&C' }
    ],
    history: [
      { date: '2022-12-30', event: 'Launched on Falcon 9' },
      { date: '2023-02-01', event: 'First images delivered' }
    ]
  },
  {
    id: 'sat-047', name: 'TJS-13 (Communication Tech)', noradId: 60033,
    country: 'China', owner: 'PLA Strategic Support Force',
    type: 'Communications', status: 'active', launchDate: '2024-01-23',
    orbitType: 'GEO', altitude: 35786, inclination: 0.5,
    period: 1436.0, apogee: 35796, perigee: 35776,
    currentPosition: { lat: 0, lng: 105, altitude: 35786 },
    velocity: 3.07, mass: 5100, dimensions: '6.5m x 2.8m',
    manufacturer: 'CAST', purpose: 'Secure Military Communications Testbed',
    frequencies: [
      { band: 'Ka-band', freq: '26-40 GHz', use: 'Secure Data' },
      { band: 'X-band', freq: '8.0-8.4 GHz', use: 'Command' }
    ],
    history: [
      { date: '2024-01-23', event: 'Launched on Long March 7A' },
      { date: '2024-03-01', event: 'Declared experimental operational' }
    ]
  },
  {
    id: 'sat-048', name: 'NISAR', noradId: 58888,
    country: 'USA/India', owner: 'NASA / ISRO',
    type: 'Earth Observation', status: 'active', launchDate: '2024-03-30',
    orbitType: 'LEO', altitude: 747, inclination: 98.4,
    period: 99.5, apogee: 752, perigee: 742,
    currentPosition: { lat: 12, lng: 79, altitude: 747 },
    velocity: 7.48, mass: 2800, dimensions: '9.0m x 2.7m',
    manufacturer: 'NASA JPL / ISRO', purpose: 'L+S Band SAR Earth Science',
    frequencies: [
      { band: 'L-band', freq: '1.25 GHz', use: 'SAR (NASA)' },
      { band: 'S-band', freq: '3.2 GHz', use: 'SAR (ISRO)' },
      { band: 'Ka-band', freq: '26 GHz', use: 'Data Downlink' }
    ],
    history: [
      { date: '2024-03-30', event: 'Launched on GSLV Mk II' },
      { date: '2024-06-01', event: 'First joint science observations' }
    ]
  },
  {
    id: 'sat-049', name: 'IRNSS-1J (NVS-02)', noradId: 55599,
    country: 'India', owner: 'ISRO',
    type: 'Navigation', status: 'active', launchDate: '2023-05-29',
    orbitType: 'GEO', altitude: 35786, inclination: 29.0,
    period: 1436.0, apogee: 35796, perigee: 35776,
    currentPosition: { lat: 0, lng: 83, altitude: 35786 },
    velocity: 3.07, mass: 2232, dimensions: '3.0m x 2.4m',
    manufacturer: 'ISRO', purpose: 'NavIC Regional Navigation',
    frequencies: [
      { band: 'L-band', freq: '1176.45 MHz', use: 'L5' },
      { band: 'S-band', freq: '2492.028 MHz', use: 'S-band' }
    ],
    history: [
      { date: '2023-05-29', event: 'Launched on GSLV Mk II' },
      { date: '2023-08-01', event: 'Joined NavIC constellation' }
    ]
  },
  {
    id: 'sat-050', name: 'GOSAT-GW', noradId: 59000,
    country: 'Japan', owner: 'JAXA / MOE / NIES',
    type: 'Earth Observation', status: 'active', launchDate: '2024-05-28',
    orbitType: 'LEO', altitude: 666, inclination: 98.1,
    period: 98.0, apogee: 670, perigee: 662,
    currentPosition: { lat: 35, lng: 140, altitude: 666 },
    velocity: 7.53, mass: 2600, dimensions: '5.0m x 2.0m x 2.5m',
    manufacturer: 'Mitsubishi Electric', purpose: 'Greenhouse Gas Monitoring',
    frequencies: [
      { band: 'X-band', freq: '8.0-8.5 GHz', use: 'Science Data' },
      { band: 'S-band', freq: '2.2 GHz', use: 'TTC&C' }
    ],
    history: [
      { date: '2024-05-28', event: 'Launched on H-IIA' },
      { date: '2024-08-01', event: 'First atmospheric measurements' }
    ]
  }
];
