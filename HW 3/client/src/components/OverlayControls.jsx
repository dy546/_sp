import React from 'react';

export default function OverlayControls({ overlays, onToggle }) {
  return (
    <div className="overlay-controls">
      <button
        className={`overlay-btn ${overlays.satellites ? 'active' : ''}`}
        onClick={() => onToggle('satellites')}
      >
        Satellites
      </button>
      <button
        className={`overlay-btn ${overlays.rf ? 'active' : ''}`}
        onClick={() => onToggle('rf')}
      >
        Radio Freq
      </button>
      <button
        className={`overlay-btn ${overlays.heatmap ? 'active' : ''}`}
        onClick={() => onToggle('heatmap')}
      >
        Heatmap
      </button>
      <button
        className={`overlay-btn ${overlays.labels ? 'active' : ''}`}
        onClick={() => onToggle('labels')}
      >
        Labels
      </button>
      <button
        className={`overlay-btn ${overlays.cameras ? 'active' : ''}`}
        onClick={() => onToggle('cameras')}
      >
        Live Cams
      </button>
    </div>
  );
}
