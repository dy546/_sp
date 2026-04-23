import React, { useEffect, useRef, useState, useCallback } from 'react';
import L from 'leaflet';
import { fetchPropagationPositions, fetchOrbitalPath } from '../services/api';

const SAT_COLORS = {
  active: '#00d4ff',
  inactive: '#ff3355'
};

const RF_COLORS = [
  '#ff8800', '#ffcc00', '#8844ff', '#00ff88', '#4a7aff',
  '#ff3355', '#00d4ff', '#ff6600', '#aa44ff', '#00ccaa'
];

export default function MapView({ satellites, rfSources, overlays, onObjectClick, selectedObject }) {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const satLayer = useRef(null);
  const rfLayer = useRef(null);
  const pathLayer = useRef(null);
  const heatLayer = useRef(null);
  const labelLayer = useRef(null);
  const animFrameRef = useRef(null);
  const [propagatedPositions, setPropagatedPositions] = useState({});
  const [orbitalPaths, setOrbitalPaths] = useState({});

  useEffect(() => {
    if (mapInstance.current) return;

    mapInstance.current = L.map('map', {
      center: [20, 0],
      zoom: 2,
      zoomControl: true,
      attributionControl: false
    });

    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 19
    }).addTo(mapInstance.current);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      mapInstance.current?.remove();
      mapInstance.current = null;
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const data = await fetchPropagationPositions();
        setPropagatedPositions(data.positions || {});
      } catch (e) {}
    }, 5000);
    fetchPropagationPositions().then(d => setPropagatedPositions(d.positions || {})).catch(() => {});
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!overlays.satellites) return;
    const loadPaths = async () => {
      const paths = {};
      for (const sat of satellites) {
        try {
          const data = await fetchOrbitalPath(sat.id);
          if (data.path) paths[sat.id] = data.path;
        } catch (e) {}
      }
      setOrbitalPaths(paths);
    };
    loadPaths();
  }, [satellites, overlays.satellites]);

  useEffect(() => {
    const map = mapInstance.current;
    if (!map) return;

    if (satLayer.current) map.removeLayer(satLayer.current);
    if (rfLayer.current) map.removeLayer(rfLayer.current);
    if (pathLayer.current) map.removeLayer(pathLayer.current);
    if (heatLayer.current) map.removeLayer(heatLayer.current);
    if (labelLayer.current) map.removeLayer(labelLayer.current);

    const satMarkers = [];
    const rfMarkers = [];
    const pathPolylines = [];
    const heatPoints = [];
    const labelMarkers = [];

    if (overlays.satellites) {
      satellites.forEach(sat => {
        const pos = propagatedPositions[sat.id] || sat.currentPosition;
        if (!pos) return;
        const color = SAT_COLORS[sat.status] || SAT_COLORS.active;
        const icon = L.divIcon({
          className: '',
          html: `<div style="
            width: 10px; height: 10px; border-radius: 50%;
            background: ${color}; border: 2px solid ${color};
            box-shadow: 0 0 8px ${color}44;
            ${sat.status === 'inactive' ? 'opacity: 0.5;' : ''}
          "></div>`,
          iconSize: [14, 14],
          iconAnchor: [7, 7]
        });
        const marker = L.marker([pos.lat, pos.lng], { icon })
          .bindPopup(`
            <div style="font-family: sans-serif; min-width: 180px;">
              <div style="font-weight: 700; font-size: 13px; margin-bottom: 4px; color: #e0e0f0;">${sat.name}</div>
              <div style="font-size: 11px; color: #8888aa;">
                ${sat.country} | ${sat.type}<br/>
                Alt: ${Math.round(pos.altitude || sat.altitude)} km | ${sat.orbitType}<br/>
                Owner: ${sat.owner?.slice(0, 50)}
              </div>
              <div style="margin-top: 6px;">
                <span style="
                  display: inline-block; padding: 2px 8px; border-radius: 10px;
                  font-size: 10px; font-weight: 600; text-transform: uppercase;
                  background: ${sat.status === 'active' ? 'rgba(0,255,136,0.15)' : 'rgba(255,51,85,0.15)'};
                  color: ${sat.status === 'active' ? '#00ff88' : '#ff3355'};
                ">${sat.status}</span>
              </div>
            </div>
          `, { closeButton: true, className: 'custom-popup' });
        marker.on('click', () => onObjectClick(sat));
        satMarkers.push(marker);

        if (overlays.labels) {
          const labelIcon = L.divIcon({
            className: '',
            html: `<div style="
              color: ${color}; font-size: 9px; font-weight: 600;
              text-shadow: 0 0 4px #000, 0 0 8px #000;
              white-space: nowrap; font-family: monospace;
            ">${sat.name}</div>`,
            iconSize: [0, 0],
            iconAnchor: [0, 16]
          });
          labelMarkers.push(L.marker([pos.lat, pos.lng], { icon: labelIcon }));
        }

        if (overlays.heatmap) {
          heatPoints.push([pos.lat, pos.lng, 0.3]);
        }

        const path = orbitalPaths[sat.id];
        if (path && path.length > 1) {
          const latlngs = path.map(p => [p.lat, p.lng]);
          const polyline = L.polyline(latlngs, {
            color: color,
            opacity: 0.3,
            weight: 1,
            dashArray: '4, 8'
          });
          pathPolylines.push(polyline);
        }
      });
    }

    if (overlays.rf) {
      rfSources.forEach((rf, i) => {
        const pos = rf.coordinates;
        if (!pos) return;
        const color = RF_COLORS[i % RF_COLORS.length];
        const icon = L.divIcon({
          className: '',
          html: `<div style="
            width: 8px; height: 8px;
            background: ${color}; border: 2px solid ${color};
            box-shadow: 0 0 6px ${color}44;
            transform: rotate(45deg);
          "></div>`,
          iconSize: [12, 12],
          iconAnchor: [6, 6]
        });
        const marker = L.marker([pos.lat, pos.lng], { icon })
          .bindPopup(`
            <div style="font-family: sans-serif; min-width: 180px;">
              <div style="font-weight: 700; font-size: 13px; margin-bottom: 4px; color: #e0e0f0;">${rf.band}</div>
              <div style="font-size: 11px; color: #8888aa;">
                ${rf.country} | ${rf.service}<br/>
                ${rf.freqStart}-${rf.freqEnd} ${rf.unit}<br/>
                Stations: ${rf.activeStations?.toLocaleString() || 'N/A'}
              </div>
            </div>
          `, { closeButton: true });
        marker.on('click', () => onObjectClick(rf));
        rfMarkers.push(marker);

        if (overlays.labels) {
          const labelIcon = L.divIcon({
            className: '',
            html: `<div style="
              color: ${color}; font-size: 8px; font-weight: 600;
              text-shadow: 0 0 4px #000, 0 0 8px #000;
              white-space: nowrap; font-family: monospace;
            ">${rf.band}</div>`,
            iconSize: [0, 0],
            iconAnchor: [0, 14]
          });
          labelMarkers.push(L.marker([pos.lat, pos.lng], { icon: labelIcon }));
        }

        if (overlays.heatmap) {
          heatPoints.push([pos.lat, pos.lng, 0.5]);
        }
      });
    }

    satLayer.current = L.layerGroup(satMarkers).addTo(map);
    rfLayer.current = L.layerGroup(rfMarkers).addTo(map);
    pathLayer.current = L.layerGroup(pathPolylines).addTo(map);
    labelLayer.current = L.layerGroup(labelMarkers).addTo(map);

    if (overlays.heatmap && heatPoints.length > 0) {
      try {
        const heat = L.heatLayer(heatPoints, {
          radius: 25,
          blur: 15,
          maxZoom: 10,
          max: 1.0,
          gradient: { 0.0: '#4a7aff', 0.5: '#00d4ff', 0.8: '#00ff88', 1.0: '#ff8800' }
        });
        heatLayer.current = heat.addTo(map);
      } catch (e) {
        console.warn('Heatmap not available:', e);
      }
    }
  }, [satellites, rfSources, overlays, onObjectClick, propagatedPositions, orbitalPaths]);

  useEffect(() => {
    if (!selectedObject || !mapInstance.current) return;
    const pos = propagatedPositions[selectedObject.id] || selectedObject.currentPosition || selectedObject.coordinates;
    if (pos) {
      mapInstance.current.setView([pos.lat, pos.lng], 5, { animate: true });
    }
  }, [selectedObject, propagatedPositions]);

  return <div id="map" className="map-container" />;
}
