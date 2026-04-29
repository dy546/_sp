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
    id: 'iss-hd', name: 'ISS HDEV Camera (NASA)', type: 'space',
    url: 'https://www.youtube-nocookie.com/embed/zPH5KtjJFaQ?autoplay=1&mute=1',
    description: 'HD Earth Viewing from ISS (HDEV experiment)',
    source: 'NASA', status: 'active'
  },
  {
    id: 'iss-sd', name: 'ISS 4K Camera (Sen)', type: 'space',
    url: 'https://www.youtube-nocookie.com/embed/fO9e9jnhYK8?autoplay=1&mute=1',
    description: 'Live Earth view from ISS by Sen',
    source: 'Sen', status: 'active'
  },
  {
    id: 'iss-yt', name: 'ISS SD Camera (NASA)', type: 'space',
    url: 'https://www.youtube-nocookie.com/embed/sWasdbDVNvc?autoplay=1&mute=1',
    description: 'Official NASA ISS live stream on YouTube',
    source: 'NASA', status: 'active'
  }
];
