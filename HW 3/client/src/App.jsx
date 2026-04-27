import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MapView from './components/MapView';
import DetailPanel from './components/DetailPanel';
import FilterBar from './components/FilterBar';
import StatsBar from './components/StatsBar';
import OverlayControls from './components/OverlayControls';
import { fetchSatellites, fetchRfSources, fetchStats } from './services/api';

export default function App() {
  const [satellites, setSatellites] = useState([]);
  const [rfSources, setRfSources] = useState([]);
  const [stats, setStats] = useState(null);
  const [selectedObject, setSelectedObject] = useState(null);
  const [activeTab, setActiveTab] = useState('satellites');
  const [filters, setFilters] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [overlays, setOverlays] = useState({ satellites: true, rf: true, heatmap: false, labels: true });
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    const apiBase = import.meta.env.VITE_API_URL || '';
    let wsUrl;
    if (apiBase) {
      wsUrl = apiBase.replace(/^https?/, 'ws');
    } else {
      wsUrl = `ws://${window.location.hostname}:3001`;
    }
    let ws;
    try {
      ws = new WebSocket(wsUrl);
      ws.onmessage = (event) => {
        try {
          const msg = JSON.parse(event.data);
          if (msg.type === 'positions') {
            if (msg.data && Object.keys(msg.data).length > 0) {
              window.__wsPositions = msg.data;
            }
          }
        } catch (e) {}
      };
    } catch (e) {}
    return () => ws?.close();
  }, []);

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
        <Header searchQuery={searchQuery} onSearch={handleSearch} />
        <div className="loading">Initializing intelligence platform...</div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <Header searchQuery={searchQuery} onSearch={handleSearch} />
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
        </div>
      </div>
    </div>
  );
}
