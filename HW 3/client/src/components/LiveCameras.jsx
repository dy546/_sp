import React, { useEffect, useState } from 'react';
import { fetchCameras } from '../services/api';

export default function LiveCameras({ open, onClose }) {
  const [feeds, setFeeds] = useState([]);

  useEffect(() => {
    fetchCameras().then(setFeeds).catch(() => {});
  }, []);

  if (!open) return null;

  return (
    <div className="live-cameras-panel">
      <div className="detail-header">
        <div>
          <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>
            ISS Live Cameras
          </div>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>
            {feeds.length} feeds available
          </div>
        </div>
        <button className="detail-close" onClick={onClose}>✕</button>
      </div>

      <div className="detail-body">
        {feeds.map(feed => (
          <div key={feed.id} className="detail-section" style={{ marginBottom: 12 }}>
            <div className="detail-section-title">{feed.name}</div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 6 }}>
              {feed.description}
            </div>
            <iframe
              src={feed.url}
              title={feed.name}
              width="100%"
              height="180"
              style={{
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius)',
                background: '#000'
              }}
              allowFullScreen
              allow="autoplay; encrypted-media"
            />
          </div>
        ))}
        {feeds.length === 0 && (
          <div style={{ fontSize: 12, color: 'var(--text-muted)', textAlign: 'center', padding: 16 }}>
            Loading cameras...
          </div>
        )}
      </div>
    </div>
  );
}
