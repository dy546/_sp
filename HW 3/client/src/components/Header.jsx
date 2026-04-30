import React from 'react';

export default function Header({ searchQuery, onSearch, theme, onToggleTheme }) {
  return (
    <header className="header">
      <div className="header-left">
        <div className="logo">
          <span>Satellite & Radio Frequency intelligence</span>
        </div>
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
        <button className="theme-toggle" onClick={onToggleTheme} title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}>
          {theme === 'dark' ? '\u2600' : '\u263D'}
        </button>
        <span style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
          {new Date().toISOString().replace('T', ' ').slice(0, 19)}
        </span>
      </div>
    </header>
  );
}
