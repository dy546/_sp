import React from 'react';

export default function Header({ searchQuery, onSearch }) {
  return (
    <header className="header">
      <div className="header-left">
        <div className="logo">
          <div className="logo-icon">S</div>
          <span>Satellite & RF</span>
        </div>
        <span style={{ fontSize: 10, color: 'var(--text-muted)', letterSpacing: 1 }}>
          SATELLITE & RF INTELLIGENCE
        </span>
      </div>
      <div className="header-center">
        <input
          className="search-input"
          type="text"
          placeholder="Search satellites, frequencies, owners..."
          value={searchQuery}
          onChange={e => onSearch(e.target.value)}
        />
      </div>
      <div className="header-right">
        <span style={{ fontSize: 10, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
          {new Date().toISOString().replace('T', ' ').slice(0, 19)}Z
        </span>
        <div className="live-indicator" style={{ margin: 0 }}>
          <div className="live-dot" />
          <span style={{ fontSize: 10 }}>LIVE</span>
        </div>
      </div>
    </header>
  );
}
