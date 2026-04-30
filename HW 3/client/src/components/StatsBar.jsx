import React from 'react';

export default function StatsBar({ stats }) {
  if (!stats) return null;
  const { satellites, rf } = stats;
  return (
    <div className="stats-bar">
      <div className="stat-item">
        Satellites: <span className="stat-value">{satellites.total}</span>
        <span style={{ color: 'var(--accent-green)' }}>({satellites.active} active)</span>
        <span style={{ color: 'var(--accent-red)' }}>({satellites.inactive} inactive)</span>
      </div>
      <div className="stat-item">
        RF Sources: <span className="stat-value">{rf.total}</span>
      </div>
      <div className="stat-item">
        Active Stations: <span className="stat-value">{rf.totalActiveStations?.toLocaleString() || 0}</span>
      </div>
      <div className="stat-item">
        Countries: <span className="stat-value">{Object.keys(satellites.byCountry || {}).length}</span>
      </div>
    </div>
  );
}
