import React, { useState, useEffect } from 'react';
import { fetchAnalysisLinks } from '../services/api';

export default function DetailPanel({ object, onClose }) {
  const [links, setLinks] = useState(null);
  const isSatellite = !!object.currentPosition;

  useEffect(() => {
    if (isSatellite) {
      fetchAnalysisLinks(object.id).then(setLinks).catch(() => {});
    }
  }, [object.id, isSatellite]);

  return (
    <div className="detail-panel">
      <div className="detail-header">
        <div>
          <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>
            {object.name || object.band}
          </div>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>
            {object.id} | {object.country}
          </div>
        </div>
        <button className="detail-close" onClick={onClose}>✕</button>
      </div>

      <div className="detail-body">
        {isSatellite ? (
          <SatelliteDetail satellite={object} links={links} />
        ) : (
          <RFDetail rf={object} />
        )}
      </div>
    </div>
  );
}

function SatelliteDetail({ satellite, links }) {
  return (
    <>
      <div className="detail-section">
        <div className="detail-section-title">Satellite Information</div>
        <div className="detail-row">
          <span className="detail-label">Name</span>
          <span className="detail-value">{satellite.name}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">NORAD ID</span>
          <span className="detail-value" style={{ fontFamily: 'var(--font-mono)' }}>{satellite.noradId}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Country</span>
          <span className="detail-value">{satellite.country}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Owner</span>
          <span className="detail-value">{satellite.owner}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Type</span>
          <span className="detail-value">{satellite.type}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Status</span>
          <span className="detail-value">
            <span className={`badge badge-${satellite.status}`}>{satellite.status}</span>
          </span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Purpose</span>
          <span className="detail-value">{satellite.purpose}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Manufacturer</span>
          <span className="detail-value">{satellite.manufacturer}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Launch Date</span>
          <span className="detail-value">{satellite.launchDate}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Mass</span>
          <span className="detail-value">{satellite.mass?.toLocaleString()} kg</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Dimensions</span>
          <span className="detail-value">{satellite.dimensions}</span>
        </div>
      </div>

      <div className="detail-section">
        <div className="detail-section-title">Orbital Parameters</div>
        <div className="detail-row">
          <span className="detail-label">Orbit Type</span>
          <span className="detail-value">
            <span className={`badge badge-${satellite.orbitType}`}>{satellite.orbitType}</span>
          </span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Altitude</span>
          <span className="detail-value">{satellite.altitude?.toLocaleString()} km</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Inclination</span>
          <span className="detail-value">{satellite.inclination}°</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Period</span>
          <span className="detail-value">{satellite.period} min</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Apogee</span>
          <span className="detail-value">{satellite.apogee?.toLocaleString()} km</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Perigee</span>
          <span className="detail-value">{satellite.perigee?.toLocaleString()} km</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Velocity</span>
          <span className="detail-value">{satellite.velocity} km/s</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Position</span>
          <span className="detail-value" style={{ fontFamily: 'var(--font-mono)', fontSize: 10 }}>
            {satellite.currentPosition?.lat.toFixed(2)}°, {satellite.currentPosition?.lng.toFixed(2)}°
          </span>
        </div>
      </div>

      {satellite.frequencies?.length > 0 && (
        <div className="detail-section">
          <div className="detail-section-title">Radio Frequencies</div>
          <table className="freq-table">
            <thead>
              <tr>
                <th>Band</th>
                <th>Frequency</th>
                <th>Use</th>
              </tr>
            </thead>
            <tbody>
              {satellite.frequencies.map((f, i) => (
                <tr key={i}>
                  <td>{f.band}</td>
                  <td style={{ fontFamily: 'var(--font-mono)' }}>{f.freq}</td>
                  <td>{f.use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {satellite.history?.length > 0 && (
        <div className="detail-section">
          <div className="detail-section-title">Timeline</div>
          <div className="timeline">
            {satellite.history.map((h, i) => (
              <div key={i} className="timeline-item">
                <span className="timeline-date">{h.date}</span>
                <span className="timeline-event">{h.event}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {satellite.notes && (
        <div className="detail-section">
          <div className="detail-section-title">Notes</div>
          <div style={{ fontSize: 12, color: 'var(--accent-orange)', padding: '4px 0' }}>
            {satellite.notes}
          </div>
        </div>
      )}

      {links && links.relatedRfSources?.length > 0 && (
        <div className="detail-section">
          <div className="detail-section-title">Linked RF Sources ({links.linkCount})</div>
          {links.relatedRfSources.slice(0, 5).map(rf => (
            <div key={rf.id} style={{ fontSize: 11, padding: '4px 0', color: 'var(--text-secondary)' }}>
              {rf.band} - {rf.service} ({rf.freqStart}-{rf.freqEnd} {rf.unit})
            </div>
          ))}
        </div>
      )}

      {satellite.liveFeedUrl && (
        <div className="detail-section">
          <div className="detail-section-title">Live Feed</div>
          <div className="live-feed">
            <div className="live-indicator">
              <div className="live-dot" />
              <span>Stream Available</span>
            </div>
            <a
              href={satellite.liveFeedUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              style={{ textDecoration: 'none' }}
            >
              Open Live Stream
            </a>
          </div>
        </div>
      )}
    </>
  );
}

function RFDetail({ rf }) {
  const getBandColor = (band) => {
    const colors = {
      'FM': '#ff8800', 'AM': '#ff6600', 'UHF': '#ffcc00',
      'Cellular': '#8844ff', 'Wi-Fi': '#00ff88', '5G': '#4a7aff',
      'DAB': '#00d4ff', 'ISDB': '#ff3355', 'DVB': '#aa44ff',
      'DTMB': '#00ccaa', 'TNT': '#ff8800', 'VHF': '#ff6600',
      'Amateur': '#00ff88', 'Maritime': '#4a7aff', 'Aviation': '#00d4ff',
      'GNSS': '#8844ff', 'Public Safety': '#ff3355', 'Shortwave': '#ffcc00',
      'Starlink': '#00d4ff', 'Radar': '#ff3355', 'Satellite': '#8844ff'
    };
    const key = Object.keys(colors).find(k => band.toLowerCase().includes(k.toLowerCase()));
    return colors[key] || '#4a7aff';
  };

  const normalizeFreq = (freq, unit) => unit === 'kHz' ? freq / 1000 : unit === 'GHz' ? freq * 1000 : freq;
  const freqStartMHz = normalizeFreq(rf.freqStart, rf.unit);
  const freqEndMHz = normalizeFreq(rf.freqEnd, rf.unit);
  const maxMHz = 100000;

  const toPercent = (mhz) => Math.max(0, Math.min(100, (Math.log10(mhz + 1) / Math.log10(maxMHz + 1)) * 100));
  const left = toPercent(freqStartMHz);
  const width = Math.max(2, toPercent(freqEndMHz) - left);
  const color = getBandColor(rf.band);

  const ticks = [
    { label: '0 Hz', mhz: 0 },
    { label: '100 kHz', mhz: 0.1 },
    { label: '10 MHz', mhz: 10 },
    { label: '1 GHz', mhz: 1000 },
    { label: '100 GHz', mhz: 100000 }
  ];

  const formatFreq = (mhz) => {
    if (mhz >= 1000) return `${(mhz / 1000).toFixed(1)} GHz`;
    if (mhz >= 1) return `${mhz.toFixed(0)} MHz`;
    return `${(mhz * 1000).toFixed(0)} kHz`;
  };

  return (
    <>
      <div className="detail-section">
        <div className="detail-section-title">Frequency Information</div>
        <div className="detail-row">
          <span className="detail-label">Band</span>
          <span className="detail-value">{rf.band}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Country</span>
          <span className="detail-value">{rf.country}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Service</span>
          <span className="detail-value">{rf.service}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Allocation</span>
          <span className="detail-value">{rf.allocation}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Frequency Range</span>
          <span className="detail-value" style={{ fontFamily: 'var(--font-mono)' }}>
            {rf.freqStart} - {rf.freqEnd} {rf.unit}
          </span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Power</span>
          <span className="detail-value">{rf.power}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Active Stations</span>
          <span className="detail-value">{rf.activeStations?.toLocaleString()}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Last Updated</span>
          <span className="detail-value">{rf.lastUpdated}</span>
        </div>
      </div>

      <div className="detail-section">
        <div className="detail-section-title">License & Ownership</div>
        <div className="detail-row">
          <span className="detail-label">License</span>
          <span className="detail-value">{rf.licenseInfo}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Owner</span>
          <span className="detail-value">{rf.owner}</span>
        </div>
      </div>

      <div className="detail-section">
        <div className="detail-section-title">Spectrum Visualization</div>
        <div className="spectrum-chart">
          <div
            className="spectrum-fill"
            style={{
              left: `${left}%`,
              width: `${width}%`,
              background: color
            }}
          />
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', alignItems: 'center',
            padding: '0 8px', zIndex: 1,
            pointerEvents: 'none'
          }}>
            <span style={{
              fontSize: 10, fontWeight: 700, fontFamily: 'var(--font-mono)',
              color: '#fff', textShadow: '0 1px 3px rgba(0,0,0,0.7)',
              whiteSpace: 'nowrap'
            }}>
              {formatFreq(freqStartMHz)} – {formatFreq(freqEndMHz)}
            </span>
          </div>
        </div>
        <div style={{ position: 'relative', height: 14, marginTop: 4 }}>
          {ticks.map((t, i) => (
            <span key={i} style={{
              position: 'absolute',
              left: `${toPercent(t.mhz)}%`,
              transform: 'translateX(-50%)',
              fontSize: 9, fontFamily: 'var(--font-mono)',
              color: i === 0 || i === ticks.length - 1 ? 'var(--text-muted)' : 'var(--text-muted)',
              opacity: 0.7
            }}>
              {t.label}
            </span>
          ))}
        </div>
        <div style={{ position: 'relative', height: 4, marginBottom: 4 }}>
          {ticks.map((t, i) => (
            <span key={i} style={{
              position: 'absolute',
              left: `${toPercent(t.mhz)}%`,
              width: 1, height: 4,
              background: 'var(--text-muted)',
              opacity: 0.5
            }} />
          ))}
        </div>
      </div>
    </>
  );
}
