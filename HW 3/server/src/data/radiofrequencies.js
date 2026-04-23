export const rfSources = [
  {
    id: 'rf-001', country: 'USA', band: 'FM', freqStart: 88, freqEnd: 108, unit: 'MHz',
    service: 'Broadcasting', allocation: 'Commercial & Public Radio',
    licenseInfo: 'FCC Part 73', power: '100W-100kW',
    owner: 'Various (Clear Channel, NPR, etc.)',
    activeStations: 15234, lastUpdated: '2024-01-15',
    coordinates: { lat: 38.9, lng: -77.0 }
  },
  {
    id: 'rf-002', country: 'USA', band: 'UHF TV', freqStart: 470, freqEnd: 698, unit: 'MHz',
    service: 'Broadcasting', allocation: 'Digital Television',
    licenseInfo: 'FCC Part 73', power: '1kW-1MW',
    owner: 'Various (NBC, CBS, ABC, Fox, etc.)',
    activeStations: 1789, lastUpdated: '2024-02-20',
    coordinates: { lat: 40.7, lng: -74.0 }
  },
  {
    id: 'rf-003', country: 'USA', band: 'Cellular 4G/5G', freqStart: 600, freqEnd: 700, unit: 'MHz',
    service: 'Mobile', allocation: 'Cellular Communications',
    licenseInfo: 'FCC Part 27', power: '10W-100W',
    owner: 'Verizon, AT&T, T-Mobile, US Cellular',
    activeStations: 142000, lastUpdated: '2024-03-01',
    coordinates: { lat: 37.8, lng: -122.4 }
  },
  {
    id: 'rf-004', country: 'USA', band: 'Wi-Fi', freqStart: 2400, freqEnd: 2483.5, unit: 'MHz',
    service: 'Data', allocation: 'ISM Band / Wi-Fi',
    licenseInfo: 'FCC Part 15 (unlicensed)', power: '100mW-1W',
    owner: 'Unlicensed (public)',
    activeStations: 500000000, lastUpdated: '2024-01-01',
    coordinates: { lat: 39.0, lng: -98.0 }
  },
  {
    id: 'rf-005', country: 'USA', band: '5G mmWave', freqStart: 24000, freqEnd: 40000, unit: 'MHz',
    service: 'Mobile', allocation: '5G Millimeter Wave',
    licenseInfo: 'FCC Part 30', power: '1W-10W',
    owner: 'Verizon, AT&T, T-Mobile',
    activeStations: 85000, lastUpdated: '2024-03-15',
    coordinates: { lat: 34.0, lng: -118.2 }
  },
  {
    id: 'rf-006', country: 'UK', band: 'DAB', freqStart: 174, freqEnd: 240, unit: 'MHz',
    service: 'Broadcasting', allocation: 'Digital Audio Broadcasting',
    licenseInfo: 'Ofcom', power: '1kW-10kW',
    owner: 'BBC, Global Radio, Bauer Media',
    activeStations: 523, lastUpdated: '2024-02-01',
    coordinates: { lat: 51.5, lng: -0.1 }
  },
  {
    id: 'rf-007', country: 'Japan', band: 'ISDB-T', freqStart: 470, freqEnd: 710, unit: 'MHz',
    service: 'Broadcasting', allocation: 'Digital Terrestrial TV',
    licenseInfo: 'MIC Japan', power: '1kW-50kW',
    owner: 'NHK, Nippon TV, TV Asahi, etc.',
    activeStations: 12500, lastUpdated: '2024-01-20',
    coordinates: { lat: 35.7, lng: 139.7 }
  },
  {
    id: 'rf-008', country: 'Germany', band: 'DVB-T2', freqStart: 470, freqEnd: 790, unit: 'MHz',
    service: 'Broadcasting', allocation: 'Digital Terrestrial TV',
    licenseInfo: 'Bundesnetzagentur', power: '1kW-100kW',
    owner: 'ARD, ZDF, RTL, ProSiebenSat.1',
    activeStations: 620, lastUpdated: '2024-02-10',
    coordinates: { lat: 52.5, lng: 13.4 }
  },
  {
    id: 'rf-009', country: 'Russia', band: 'VHF TV', freqStart: 48.5, freqEnd: 230, unit: 'MHz',
    service: 'Broadcasting', allocation: 'Analog & Digital TV',
    licenseInfo: 'Roskomnadzor', power: '1kW-100kW',
    owner: 'VGTRK, Channel One, NTV',
    activeStations: 9800, lastUpdated: '2024-01-10',
    coordinates: { lat: 55.8, lng: 37.6 }
  },
  {
    id: 'rf-010', country: 'China', band: 'DTMB', freqStart: 470, freqEnd: 870, unit: 'MHz',
    service: 'Broadcasting', allocation: 'Digital Terrestrial TV',
    licenseInfo: 'NRTA', power: '1kW-50kW',
    owner: 'CCTV, provincial broadcasters',
    activeStations: 25000, lastUpdated: '2024-02-28',
    coordinates: { lat: 39.9, lng: 116.4 }
  },
  {
    id: 'rf-011', country: 'India', band: 'FM', freqStart: 88, freqEnd: 108, unit: 'MHz',
    service: 'Broadcasting', allocation: 'FM Radio',
    licenseInfo: 'Ministry of Information & Broadcasting', power: '100W-20kW',
    owner: 'All India Radio, private FM operators',
    activeStations: 1500, lastUpdated: '2024-03-05',
    coordinates: { lat: 28.6, lng: 77.2 }
  },
  {
    id: 'rf-012', country: 'Brazil', band: 'UHF TV', freqStart: 470, freqEnd: 698, unit: 'MHz',
    service: 'Broadcasting', allocation: 'Digital TV (ISDB-Tb)',
    licenseInfo: 'ANATEL', power: '1kW-50kW',
    owner: 'Globo, SBT, Record, Band',
    activeStations: 3200, lastUpdated: '2024-01-25',
    coordinates: { lat: -23.5, lng: -46.6 }
  },
  {
    id: 'rf-013', country: 'Australia', band: 'DAB+', freqStart: 174, freqEnd: 230, unit: 'MHz',
    service: 'Broadcasting', allocation: 'Digital Radio',
    licenseInfo: 'ACMA', power: '1kW-10kW',
    owner: 'ABC, SBS, Commercial Radio Australia',
    activeStations: 120, lastUpdated: '2024-02-15',
    coordinates: { lat: -33.9, lng: 151.2 }
  },
  {
    id: 'rf-014', country: 'France', band: 'TNT', freqStart: 470, freqEnd: 694, unit: 'MHz',
    service: 'Broadcasting', allocation: 'Digital Terrestrial TV',
    licenseInfo: 'ARCOM', power: '1kW-100kW',
    owner: 'TF1, France Télévisions, M6, Canal+',
    activeStations: 1671, lastUpdated: '2024-03-01',
    coordinates: { lat: 48.9, lng: 2.3 }
  },
  {
    id: 'rf-015', country: 'Canada', band: 'Cellular LTE', freqStart: 700, freqEnd: 800, unit: 'MHz',
    service: 'Mobile', allocation: 'Cellular Communications',
    licenseInfo: 'ISED Canada', power: '10W-100W',
    owner: 'Rogers, Bell, Telus',
    activeStations: 45000, lastUpdated: '2024-02-20',
    coordinates: { lat: 43.7, lng: -79.4 }
  },
  {
    id: 'rf-016', country: 'South Korea', band: '5G NR', freqStart: 3500, freqEnd: 3700, unit: 'MHz',
    service: 'Mobile', allocation: '5G Communications',
    licenseInfo: 'MSIT Korea', power: '10W-100W',
    owner: 'SK Telecom, KT, LG U+',
    activeStations: 175000, lastUpdated: '2024-03-10',
    coordinates: { lat: 37.6, lng: 127.0 }
  },
  {
    id: 'rf-017', country: 'Saudi Arabia', band: 'AM', freqStart: 0.531, freqEnd: 1.602, unit: 'MHz',
    service: 'Broadcasting', allocation: 'AM Radio',
    licenseInfo: 'CITC', power: '10kW-1MW',
    owner: 'Saudi Broadcasting Authority',
    activeStations: 45, lastUpdated: '2024-01-05',
    coordinates: { lat: 24.7, lng: 46.7 }
  },
  {
    id: 'rf-018', country: 'Nigeria', band: 'FM', freqStart: 88, freqEnd: 108, unit: 'MHz',
    service: 'Broadcasting', allocation: 'FM Radio',
    licenseInfo: 'NBC', power: '100W-10kW',
    owner: 'Federal Radio Corporation, private stations',
    activeStations: 350, lastUpdated: '2024-02-28',
    coordinates: { lat: 6.5, lng: 3.4 }
  },
  {
    id: 'rf-019', country: 'International', band: 'Maritime VHF', freqStart: 156, freqEnd: 174, unit: 'MHz',
    service: 'Maritime', allocation: 'Maritime Mobile Service',
    licenseInfo: 'ITU RR Appendix 18', power: '1W-25W',
    owner: 'International Maritime Organization',
    activeStations: 500000, lastUpdated: '2024-01-01',
    coordinates: { lat: 0, lng: 0 }
  },
  {
    id: 'rf-020', country: 'USA', band: 'Aviation VHF', freqStart: 118, freqEnd: 137, unit: 'MHz',
    service: 'Aviation', allocation: 'Aeronautical Mobile',
    licenseInfo: 'FCC Part 87 / ICAO', power: '5W-50W',
    owner: 'FAA, airlines, general aviation',
    activeStations: 15000, lastUpdated: '2024-02-01',
    coordinates: { lat: 25, lng: -80 }
  },
  {
    id: 'rf-021', country: 'USA', band: 'Public Safety', freqStart: 150, freqEnd: 174, unit: 'MHz',
    service: 'Public Safety', allocation: 'Land Mobile',
    licenseInfo: 'FCC Part 90', power: '1W-100W',
    owner: 'Police, Fire, EMS, municipal agencies',
    activeStations: 250000, lastUpdated: '2024-03-01',
    coordinates: { lat: 40, lng: -75 }
  },
  {
    id: 'rf-022', country: 'International', band: 'Amateur HF', freqStart: 1.8, freqEnd: 29.7, unit: 'MHz',
    service: 'Amateur', allocation: 'Amateur Radio Service',
    licenseInfo: 'ITU RR / National licenses', power: '10W-1.5kW',
    owner: 'Licensed amateur radio operators worldwide',
    activeStations: 3000000, lastUpdated: '2024-01-01',
    coordinates: { lat: 0, lng: 0 }
  },
  {
    id: 'rf-023', country: 'International', band: 'GNSS L1', freqStart: 1559, freqEnd: 1610, unit: 'MHz',
    service: 'Navigation', allocation: 'Radionavigation-Satellite',
    licenseInfo: 'ITU RR / National allocations', power: '25W-50W (space)',
    owner: 'GPS (US), Galileo (EU), BeiDou (CN), GLONASS (RU)',
    activeStations: 80, lastUpdated: '2024-03-15',
    coordinates: { lat: 0, lng: 0 }
  },
  {
    id: 'rf-024', country: 'USA', band: 'Shortwave', freqStart: 5.9, freqEnd: 26.1, unit: 'MHz',
    service: 'Broadcasting', allocation: 'International Broadcasting',
    licenseInfo: 'FCC Part 73 / ITU', power: '10kW-500kW',
    owner: 'Voice of America, Radio Free Asia, WWCR, etc.',
    activeStations: 250, lastUpdated: '2024-01-10',
    coordinates: { lat: 38.9, lng: -77.0 }
  },
  {
    id: 'rf-025', country: 'Japan', band: 'Wi-Fi 6E', freqStart: 5925, freqEnd: 6425, unit: 'MHz',
    service: 'Data', allocation: 'Unlicensed / Wi-Fi 6E',
    licenseInfo: 'MIC Japan', power: '100mW-1W',
    owner: 'Unlicensed (public)',
    activeStations: 5000000, lastUpdated: '2024-02-15',
    coordinates: { lat: 35.7, lng: 139.7 }
  },
  {
    id: 'rf-026', country: 'Germany', band: 'LTE 800', freqStart: 791, freqEnd: 862, unit: 'MHz',
    service: 'Mobile', allocation: 'Cellular Communications',
    licenseInfo: 'Bundesnetzagentur', power: '10W-100W',
    owner: 'Deutsche Telekom, Vodafone, Telefónica',
    activeStations: 38000, lastUpdated: '2024-02-28',
    coordinates: { lat: 52.5, lng: 13.4 }
  },
  {
    id: 'rf-027', country: 'Brazil', band: 'FM', freqStart: 88, freqEnd: 108, unit: 'MHz',
    service: 'Broadcasting', allocation: 'FM Radio',
    licenseInfo: 'ANATEL', power: '100W-100kW',
    owner: 'Globo, Bandeirantes, Jovem Pan, etc.',
    activeStations: 4500, lastUpdated: '2024-01-20',
    coordinates: { lat: -23.5, lng: -46.6 }
  },
  {
    id: 'rf-028', country: 'India', band: '4G LTE', freqStart: 2300, freqEnd: 2400, unit: 'MHz',
    service: 'Mobile', allocation: 'Broadband Wireless Access',
    licenseInfo: 'DoT India', power: '10W-100W',
    owner: 'Reliance Jio, Airtel, Vi, BSNL',
    activeStations: 650000, lastUpdated: '2024-03-05',
    coordinates: { lat: 28.6, lng: 77.2 }
  },
  {
    id: 'rf-029', country: 'Australia', band: '5G mmWave', freqStart: 26000, freqEnd: 28000, unit: 'MHz',
    service: 'Mobile', allocation: '5G Millimeter Wave',
    licenseInfo: 'ACMA', power: '1W-10W',
    owner: 'Telstra, Optus, TPG Telecom',
    activeStations: 5000, lastUpdated: '2024-03-10',
    coordinates: { lat: -33.9, lng: 151.2 }
  },
  {
    id: 'rf-030', country: 'South Africa', band: 'DVB-T2', freqStart: 470, freqEnd: 694, unit: 'MHz',
    service: 'Broadcasting', allocation: 'Digital Terrestrial TV',
    licenseInfo: 'ICASA', power: '1kW-50kW',
    owner: 'SABC, e.tv, M-Net',
    activeStations: 180, lastUpdated: '2024-02-01',
    coordinates: { lat: -26.2, lng: 28.0 }
  },
  {
    id: 'rf-031', country: 'South Africa', band: 'FM', freqStart: 88, freqEnd: 108, unit: 'MHz',
    service: 'Broadcasting', allocation: 'FM Radio',
    licenseInfo: 'ICASA', power: '100W-10kW',
    owner: 'SABC, Primedia, Kagiso Media',
    activeStations: 280, lastUpdated: '2024-01-15',
    coordinates: { lat: -26.2, lng: 28.0 }
  },
  {
    id: 'rf-032', country: 'Mexico', band: 'UHF TV', freqStart: 470, freqEnd: 698, unit: 'MHz',
    service: 'Broadcasting', allocation: 'Digital TV',
    licenseInfo: 'IFT', power: '1kW-100kW',
    owner: 'Televisa, TV Azteca, Imagen TV',
    activeStations: 1200, lastUpdated: '2024-02-10',
    coordinates: { lat: 19.4, lng: -99.1 }
  },
  {
    id: 'rf-033', country: 'Mexico', band: 'Cellular', freqStart: 850, freqEnd: 1900, unit: 'MHz',
    service: 'Mobile', allocation: 'Cellular Communications',
    licenseInfo: 'IFT', power: '10W-100W',
    owner: 'América Móvil, AT&T Mexico, Telefónica',
    activeStations: 55000, lastUpdated: '2024-03-01',
    coordinates: { lat: 19.4, lng: -99.1 }
  },
  {
    id: 'rf-034', country: 'Indonesia', band: 'FM', freqStart: 88, freqEnd: 108, unit: 'MHz',
    service: 'Broadcasting', allocation: 'FM Radio',
    licenseInfo: 'Kominfo', power: '100W-20kW',
    owner: 'RRI, private radio networks',
    activeStations: 1200, lastUpdated: '2024-01-25',
    coordinates: { lat: -6.2, lng: 106.8 }
  },
  {
    id: 'rf-035', country: 'Turkey', band: 'DVB-T2', freqStart: 470, freqEnd: 790, unit: 'MHz',
    service: 'Broadcasting', allocation: 'Digital Terrestrial TV',
    licenseInfo: 'BTK', power: '1kW-50kW',
    owner: 'TRT, Show TV, Kanal D, ATV',
    activeStations: 450, lastUpdated: '2024-02-15',
    coordinates: { lat: 41.0, lng: 28.9 }
  },
  {
    id: 'rf-036', country: 'Argentina', band: 'FM', freqStart: 88, freqEnd: 108, unit: 'MHz',
    service: 'Broadcasting', allocation: 'FM Radio',
    licenseInfo: 'ENACOM', power: '100W-25kW',
    owner: 'Radio Nacional, private broadcasters',
    activeStations: 1800, lastUpdated: '2024-01-20',
    coordinates: { lat: -34.6, lng: -58.4 }
  },
  {
    id: 'rf-037', country: 'Egypt', band: 'FM', freqStart: 88, freqEnd: 108, unit: 'MHz',
    service: 'Broadcasting', allocation: 'FM Radio',
    licenseInfo: 'NTRA', power: '100W-10kW',
    owner: 'ERTU, private stations',
    activeStations: 200, lastUpdated: '2024-02-05',
    coordinates: { lat: 30.0, lng: 31.2 }
  },
  {
    id: 'rf-038', country: 'Thailand', band: 'DVB-T2', freqStart: 470, freqEnd: 790, unit: 'MHz',
    service: 'Broadcasting', allocation: 'Digital Terrestrial TV',
    licenseInfo: 'NBTC', power: '1kW-50kW',
    owner: 'Thai PBS, Channel 3, Channel 7, One31',
    activeStations: 320, lastUpdated: '2024-02-20',
    coordinates: { lat: 13.8, lng: 100.5 }
  },
  {
    id: 'rf-039', country: 'International', band: 'CB Radio', freqStart: 26.965, freqEnd: 27.405, unit: 'MHz',
    service: 'Amateur', allocation: 'Citizens Band Radio',
    licenseInfo: 'FCC Part 95 / National', power: '4W-12W',
    owner: 'Unlicensed (public)',
    activeStations: 5000000, lastUpdated: '2024-01-01',
    coordinates: { lat: 0, lng: 0 }
  },
  {
    id: 'rf-040', country: 'International', band: 'Satellite C-band', freqStart: 3700, freqEnd: 4200, unit: 'MHz',
    service: 'Data', allocation: 'Fixed-Satellite Service',
    licenseInfo: 'ITU RR / FCC Part 25', power: '10W-100W (space)',
    owner: 'Intelsat, SES, Eutelsat, etc.',
    activeStations: 450, lastUpdated: '2024-03-01',
    coordinates: { lat: 0, lng: 0 }
  },
  {
    id: 'rf-041', country: 'USA', band: 'NOAA APT', freqStart: 137.1, freqEnd: 137.9125, unit: 'MHz',
    service: 'Data', allocation: 'Meteorological Satellite',
    licenseInfo: 'ITU RR / NOAA', power: '5W-10W (space)',
    owner: 'NOAA',
    activeStations: 3, lastUpdated: '2024-01-01',
    coordinates: { lat: 38.9, lng: -77.0 }
  },
  {
    id: 'rf-042', country: 'International', band: 'ISS Amateur', freqStart: 145.8, freqEnd: 146.0, unit: 'MHz',
    service: 'Amateur', allocation: 'Amateur-Satellite Service',
    licenseInfo: 'ITU RR / ARISS', power: '5W-25W',
    owner: 'ARISS (Amateur Radio on ISS)',
    activeStations: 1, lastUpdated: '2024-03-15',
    coordinates: { lat: 0, lng: 0 }
  },
  {
    id: 'rf-043', country: 'Russia', band: 'GLONASS L1', freqStart: 1598.0625, freqEnd: 1605.375, unit: 'MHz',
    service: 'Navigation', allocation: 'Radionavigation-Satellite',
    licenseInfo: 'ITU RR / Russian Federation', power: '25W-50W (space)',
    owner: 'Russian Aerospace Forces',
    activeStations: 24, lastUpdated: '2024-02-01',
    coordinates: { lat: 55.8, lng: 37.6 }
  },
  {
    id: 'rf-044', country: 'China', band: 'BeiDou B1', freqStart: 1559.052, freqEnd: 1591.788, unit: 'MHz',
    service: 'Navigation', allocation: 'Radionavigation-Satellite',
    licenseInfo: 'ITU RR / China', power: '25W-50W (space)',
    owner: 'CNSA',
    activeStations: 30, lastUpdated: '2024-02-15',
    coordinates: { lat: 39.9, lng: 116.4 }
  },
  {
    id: 'rf-045', country: 'EU', band: 'Galileo E1', freqStart: 1559, freqEnd: 1591, unit: 'MHz',
    service: 'Navigation', allocation: 'Radionavigation-Satellite',
    licenseInfo: 'ITU RR / European Union', power: '25W-50W (space)',
    owner: 'European Space Agency / GSA',
    activeStations: 24, lastUpdated: '2024-03-01',
    coordinates: { lat: 48.9, lng: 2.3 }
  },
  {
    id: 'rf-046', country: 'India', band: 'NavIC L5', freqStart: 1164, freqEnd: 1189, unit: 'MHz',
    service: 'Navigation', allocation: 'Radionavigation-Satellite',
    licenseInfo: 'ITU RR / India', power: '25W-50W (space)',
    owner: 'ISRO',
    activeStations: 7, lastUpdated: '2024-01-20',
    coordinates: { lat: 28.6, lng: 77.2 }
  },
  {
    id: 'rf-047', country: 'Japan', band: 'QZSS L1', freqStart: 1575.42, freqEnd: 1575.42, unit: 'MHz',
    service: 'Navigation', allocation: 'Radionavigation-Satellite',
    licenseInfo: 'ITU RR / Japan', power: '25W-50W (space)',
    owner: 'JAXA / Cabinet Office',
    activeStations: 4, lastUpdated: '2024-02-10',
    coordinates: { lat: 35.7, lng: 139.7 }
  },
  {
    id: 'rf-048', country: 'International', band: 'Space Research S-band', freqStart: 2200, freqEnd: 2290, unit: 'MHz',
    service: 'Data', allocation: 'Space Research / Space Operations',
    licenseInfo: 'ITU RR', power: '1W-100W (space)',
    owner: 'NASA, ESA, CNSA, etc.',
    activeStations: 50, lastUpdated: '2024-01-01',
    coordinates: { lat: 0, lng: 0 }
  },
  {
    id: 'rf-049', country: 'International', band: 'Deep Space X-band', freqStart: 8400, freqEnd: 8450, unit: 'MHz',
    service: 'Data', allocation: 'Deep Space Communications',
    licenseInfo: 'ITU RR / NASA DSN', power: '1W-20W (space)',
    owner: 'NASA JPL, ESA, Roscosmos',
    activeStations: 10, lastUpdated: '2024-01-01',
    coordinates: { lat: 0, lng: 0 }
  },
  {
    id: 'rf-050', country: 'International', band: 'Starlink Ku-band', freqStart: 10700, freqEnd: 12700, unit: 'MHz',
    service: 'Data', allocation: 'Non-Geostationary FSS',
    licenseInfo: 'FCC Part 25 / ITU RR', power: '1W-10W (space)',
    owner: 'SpaceX',
    activeStations: 5000, lastUpdated: '2024-03-15',
    coordinates: { lat: 0, lng: 0 }
  }
];
