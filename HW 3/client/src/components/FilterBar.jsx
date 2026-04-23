import React from 'react';

export default function FilterBar({ filters, onFilterChange, activeTab }) {
  return (
    <div className="filter-bar">
      <select
        className="filter-select"
        value={filters.status || ''}
        onChange={e => onFilterChange('status', e.target.value)}
      >
        <option value="">All Status</option>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>
      {activeTab === 'satellites' && (
        <>
          <select
            className="filter-select"
            value={filters.orbitType || ''}
            onChange={e => onFilterChange('orbitType', e.target.value)}
          >
            <option value="">All Orbits</option>
            <option value="LEO">LEO</option>
            <option value="MEO">MEO</option>
            <option value="GEO">GEO</option>
            <option value="HEO">HEO</option>
          </select>
          <select
            className="filter-select"
            value={filters.type || ''}
            onChange={e => onFilterChange('type', e.target.value)}
          >
            <option value="">All Types</option>
            <option value="Communications">Communications</option>
            <option value="Navigation">Navigation</option>
            <option value="Earth Observation">Earth Observation</option>
            <option value="Weather">Weather</option>
            <option value="Reconnaissance">Reconnaissance</option>
            <option value="Space Station">Space Station</option>
            <option value="Telescope">Telescope</option>
          </select>
        </>
      )}
      {activeTab === 'rf' && (
        <>
          <select
            className="filter-select"
            value={filters.service || ''}
            onChange={e => onFilterChange('service', e.target.value)}
          >
            <option value="">All Services</option>
            <option value="Broadcasting">Broadcasting</option>
            <option value="Mobile">Mobile</option>
            <option value="Data">Data</option>
            <option value="Navigation">Navigation</option>
            <option value="Amateur">Amateur</option>
            <option value="Maritime">Maritime</option>
            <option value="Aviation">Aviation</option>
            <option value="Public Safety">Public Safety</option>
          </select>
        </>
      )}
    </div>
  );
}
