import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MapView from './components/MapView';
import DetailPanel from './components/DetailPanel';
import StatsBar from './components/StatsBar';
import OverlayControls from './components/OverlayControls';
import LiveCameras from './components/LiveCameras';
import { fetchSatellites, fetchRfSources, fetchStats } from './services/api';

export default function App() {
  const [satellites, setSatellites] = useState([]);
  const [rfSources, setRfSources] = useState([]);
  const [stats, setStats] = useState(null);
  const [selectedObject, setSelectedObject] = useState(null);
  const [activeTab, setActiveTab] = useState('satellites');
  const [filters, setFilters] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [overlays, setOverlays] = useState({ satellites: true, rf: true, heatmap: false, labels: true, cameras: false });
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  }, []);

  const loadData = useCallback(async () => {
    try {
      const [sats, rf, st] = await Promise.all([
        fetchSatellites(filters),
        fetchRfSources(filters),
        fetchStats()
      ]);
      setSatellites(sats);
      setRfSources(rf);
      setStats(st);
    } catch (err) {
      console.error('Failed to load data:', err);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => { loadData(); }, [loadData]);

  const handleSearch = useCallback((query) => {
    setSearchQuery(query);
    setFilters(prev => ({ ...prev, search: query || undefined }));
  }, []);

  const handleFilterChange = useCallback((key, value) => {
    setFilters(prev => ({ ...prev, [key]: value || undefined }));
  }, []);

  const handleObjectClick = useCallback((obj) => {
    setSelectedObject(obj);
  }, []);

  const handleCloseDetail = useCallback(() => {
    setSelectedObject(null);
  }, []);

  const toggleOverlay = useCallback((key) => {
    setOverlays(prev => ({ ...prev, [key]: !prev[key] }));
  }, []);

  if (loading) {
    return (
      <div className="app-container">
        <Header searchQuery={searchQuery} onSearch={handleSearch} theme={theme} onToggleTheme={toggleTheme} />
        <div className="loading">Initializing intelligence platform...</div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <Header searchQuery={searchQuery} onSearch={handleSearch} theme={theme} onToggleTheme={toggleTheme} />
      <StatsBar stats={stats} />
      <div className="main-content">
        <Sidebar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          satellites={satellites}
          rfSources={rfSources}
          onObjectClick={handleObjectClick}
          filters={filters}
          onFilterChange={handleFilterChange}
        />
        <div className="map-area">
          <MapView
            satellites={satellites}
            rfSources={rfSources}
            overlays={overlays}
            onObjectClick={handleObjectClick}
            selectedObject={selectedObject}
          />
          <OverlayControls overlays={overlays} onToggle={toggleOverlay} />
          {selectedObject && (
            <DetailPanel object={selectedObject} onClose={handleCloseDetail} />
          )}
          <LiveCameras open={overlays.cameras} onClose={() => setOverlays(prev => ({ ...prev, cameras: false }))} />
        </div>
      </div>
    </div>
  );
}
