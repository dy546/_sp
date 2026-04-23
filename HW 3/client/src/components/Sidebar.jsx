import React from 'react';
import FilterBar from './FilterBar';

export default function Sidebar({ activeTab, onTabChange, satellites, rfSources, onObjectClick, filters, onFilterChange }) {
  const items = activeTab === 'satellites' ? satellites : rfSources;

  return (
    <div className="sidebar">
      <div className="sidebar-tabs">
        <button
          className={`sidebar-tab ${activeTab === 'satellites' ? 'active' : ''}`}
          onClick={() => onTabChange('satellites')}
        >
          Satellites ({satellites.length})
        </button>
        <button
          className={`sidebar-tab ${activeTab === 'rf' ? 'active' : ''}`}
          onClick={() => onTabChange('rf')}
        >
          Radio Freq ({rfSources.length})
        </button>
      </div>
      <FilterBar filters={filters} onFilterChange={onFilterChange} activeTab={activeTab} />
      <div className="sidebar-content">
        {items.length === 0 && (
          <div style={{ padding: 16, textAlign: 'center', color: 'var(--text-muted)', fontSize: 12 }}>
            No results found
          </div>
        )}
        {items.map(item => (
          <div key={item.id} className="card" onClick={() => onObjectClick(item)}>
            <div className="card-header">
              <div>
                <div className="card-title">{item.name || item.band}</div>
                <div className="card-subtitle">
                  {item.country} | {item.owner?.slice(0, 40)}
                </div>
              </div>
              {item.status && (
                <span className={`badge badge-${item.status}`}>{item.status}</span>
              )}
              {item.orbitType && (
                <span className={`badge badge-${item.orbitType}`}>{item.orbitType}</span>
              )}
            </div>
            <div className="card-body">
              {item.type && <div>Type: {item.type}</div>}
              {item.altitude && <div>Altitude: {item.altitude.toLocaleString()} km</div>}
              {item.service && <div>Service: {item.service}</div>}
              {item.freqStart !== undefined && (
                <div>Frequency: {item.freqStart}-{item.freqEnd} {item.unit}</div>
              )}
              {item.activeStations !== undefined && (
                <div>Active Stations: {item.activeStations.toLocaleString()}</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
