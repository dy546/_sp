export const countries = [
  { code: 'US', name: 'United States', region: 'North America', population: 331900000, rfRegulator: 'FCC' },
  { code: 'UK', name: 'United Kingdom', region: 'Europe', population: 67330000, rfRegulator: 'Ofcom' },
  { code: 'JP', name: 'Japan', region: 'Asia', population: 125700000, rfRegulator: 'MIC' },
  { code: 'DE', name: 'Germany', region: 'Europe', population: 83200000, rfRegulator: 'Bundesnetzagentur' },
  { code: 'RU', name: 'Russia', region: 'Europe/Asia', population: 144100000, rfRegulator: 'Roskomnadzor' },
  { code: 'CN', name: 'China', region: 'Asia', population: 1412000000, rfRegulator: 'NRTA' },
  { code: 'IN', name: 'India', region: 'Asia', population: 1408000000, rfRegulator: 'MIB' },
  { code: 'BR', name: 'Brazil', region: 'South America', population: 214300000, rfRegulator: 'ANATEL' },
  { code: 'AU', name: 'Australia', region: 'Oceania', population: 26140000, rfRegulator: 'ACMA' },
  { code: 'FR', name: 'France', region: 'Europe', population: 67800000, rfRegulator: 'ARCOM' },
  { code: 'CA', name: 'Canada', region: 'North America', population: 38250000, rfRegulator: 'CRTC/ISED' },
  { code: 'KR', name: 'South Korea', region: 'Asia', population: 51780000, rfRegulator: 'KCC/MSIT' },
  { code: 'SA', name: 'Saudi Arabia', region: 'Middle East', population: 36410000, rfRegulator: 'CITC' },
  { code: 'NG', name: 'Nigeria', region: 'Africa', population: 223800000, rfRegulator: 'NBC' },
  { code: 'ZA', name: 'South Africa', region: 'Africa', population: 60410000, rfRegulator: 'ICASA' },
  { code: 'MX', name: 'Mexico', region: 'North America', population: 128900000, rfRegulator: 'IFT' },
  { code: 'ID', name: 'Indonesia', region: 'Asia', population: 277500000, rfRegulator: 'Kominfo' },
  { code: 'TR', name: 'Turkey', region: 'Europe/Asia', population: 85200000, rfRegulator: 'BTK' },
  { code: 'AR', name: 'Argentina', region: 'South America', population: 45810000, rfRegulator: 'ENACOM' },
  { code: 'EG', name: 'Egypt', region: 'Africa', population: 110000000, rfRegulator: 'NTRA' },
  { code: 'TH', name: 'Thailand', region: 'Asia', population: 71800000, rfRegulator: 'NBTC' },
  { code: 'EU', name: 'European Union', region: 'Europe', population: 447700000, rfRegulator: 'ECC/CEPT' },
  { code: 'INT', name: 'International', region: 'Global', population: 8000000000, rfRegulator: 'ITU' }
];

export const cameraFeeds = [
  {
    id: 'cam-001', name: 'ISS Live Camera', type: 'space',
    url: 'https://www.nasa.gov/multimedia/nasatv/index.html',
    description: 'Live video feed from the International Space Station',
    source: 'NASA', status: 'active'
  },
  {
    id: 'cam-002', name: 'GOES-16 Earth View', type: 'satellite',
    url: 'https://www.star.nesdis.noaa.gov/GOES/index.php',
    description: 'Full disk Earth imagery from GOES-16',
    source: 'NOAA', status: 'active'
  },
  {
    id: 'cam-003', name: 'SOHO Solar Observatory', type: 'observatory',
    url: 'https://soho.nascom.nasa.gov/data/realtime-images.html',
    description: 'Real-time solar imagery from SOHO spacecraft',
    source: 'NASA/ESA', status: 'active'
  },
  {
    id: 'cam-004', name: 'EarthCam Network', type: 'terrestrial',
    url: 'https://www.earthcam.com/',
    description: 'Global network of terrestrial webcams',
    source: 'EarthCam', status: 'active'
  },
  {
    id: 'cam-005', name: 'HD Earth from ISS', type: 'space',
    url: 'https://www.youtube.com/watch?v=86YLFOog4GM',
    description: 'High definition Earth view from ISS cameras',
    source: 'NASA', status: 'active'
  }
];
