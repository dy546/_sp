import React, { useEffect, useRef } from 'react';
import { fetchOrbitalPath } from '../services/api';

const SAT_COLORS = { active: '#00d4ff', inactive: '#ff3355' };
const RF_COLORS = ['#ff8800','#ffcc00','#8844ff','#00ff88','#4a7aff','#ff3355','#00d4ff','#ff6600','#aa44ff','#00ccaa'];

export default function MapView({ satellites, rfSources, overlays, onObjectClick, selectedObject }) {
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const satLayerRef = useRef(null);
  const satLabelLayerRef = useRef(null);
  const rfLayerRef = useRef(null);
  const rfLabelLayerRef = useRef(null);
  const heatLayerRef = useRef(null);
  const pathLayerRef = useRef(null);
  const orbitalPathsRef = useRef({});
  const initRef = useRef(false);

  useEffect(() => {
    if (!containerRef.current || initRef.current) return;
    const L = window.L;
    if (!L) return;
    initRef.current = true;

    const map = L.map(containerRef.current, {
      center: [20, 0], zoom: 2,
      zoomControl: false, attributionControl: false,
      minZoom: 2, maxZoom: 8
    });

    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 8
    }).addTo(map);

    setTimeout(() => { map.invalidateSize(); }, 100);
    window.addEventListener('resize', () => map.invalidateSize());

    mapRef.current = map;
    satLayerRef.current = L.layerGroup().addTo(map);
    satLabelLayerRef.current = L.layerGroup().addTo(map);
    rfLayerRef.current = L.layerGroup().addTo(map);
    rfLabelLayerRef.current = L.layerGroup().addTo(map);
    pathLayerRef.current = L.layerGroup().addTo(map);

    return () => {
      map.remove();
      mapRef.current = null;
      initRef.current = false;
    };
  }, []);

  useEffect(() => {
    const L = window.L;
    const map = mapRef.current;
    if (!map || !L || !satLayerRef.current || !satLabelLayerRef.current) return;

    satLayerRef.current.clearLayers();
    satLabelLayerRef.current.clearLayers();

    satellites.forEach(sat => {
      const pos = sat.currentPosition;
      if (!pos) return;

      const color = SAT_COLORS[sat.status] || SAT_COLORS.active;
      const isActive = sat.status !== 'inactive';

      const marker = L.circleMarker([pos.lat, pos.lng], {
        radius: 7, color, weight: 2,
        fillColor: color,
        fillOpacity: isActive ? 0.6 : 0.2,
        opacity: isActive ? 1 : 0.4
      });
      marker.bindPopup(`<div style="font-family:sans-serif;min-width:180px;color:#e0e0f0;"><div style="font-weight:700;font-size:13px;margin-bottom:4px;">${sat.name}</div><div style="font-size:11px;color:#888;">${sat.country} | ${sat.type}<br/>Alt: ${Math.round(sat.altitude||0)} km | ${sat.orbitType}</div></div>`, { closeButton: true });
      marker.on('click', () => onObjectClick(sat));
      satLayerRef.current.addLayer(marker);

      const label = L.marker([pos.lat, pos.lng], {
        icon: L.divIcon({
          className: '',
          html: `<div style="color:${color};font-size:9px;font-weight:600;text-shadow:0 0 4px #000;white-space:nowrap;font-family:monospace;pointer-events:none;">${sat.name}</div>`,
          iconSize: [0, 0], iconAnchor: [0, 16]
        })
      });
      satLabelLayerRef.current.addLayer(label);
    });
  }, [satellites, onObjectClick]);

  useEffect(() => {
    const L = window.L;
    if (!L) return;
    const map = mapRef.current;
    if (!map || !pathLayerRef.current) return;

    pathLayerRef.current.clearLayers();

    const pending = satellites.map(async sat => {
      const sid = sat.id;
      if (orbitalPathsRef.current[sid]) {
        const path = orbitalPathsRef.current[sid];
        if (path.length > 0) {
          const color = SAT_COLORS[sat.status] || SAT_COLORS.active;
          pathLayerRef.current.addLayer(L.polyline(path, {
            color, dashArray: '5 10', weight: 1.2, opacity: 0.3, interactive: false
          }));
        }
        return;
      }

      try {
        const res = await fetchOrbitalPath(sid, 90, 90);
        if (res && res.path && res.path.length > 0) {
          const path = res.path.map(p => [p.lat, p.lng]);
          orbitalPathsRef.current[sid] = path;
          const color = SAT_COLORS[sat.status] || SAT_COLORS.active;
          pathLayerRef.current.addLayer(L.polyline(path, {
            color, dashArray: '5 10', weight: 1.2, opacity: 0.3, interactive: false
          }));
        }
      } catch (e) {}
    });

    Promise.all(pending).catch(() => {});
  }, [satellites]);

  useEffect(() => {
    const L = window.L;
    const map = mapRef.current;
    if (!map || !L) return;

    if (satLayerRef.current) {
      overlays.satellites ? map.addLayer(satLayerRef.current) : map.removeLayer(satLayerRef.current);
    }
    if (satLabelLayerRef.current) {
      overlays.satellites && overlays.labels ? map.addLayer(satLabelLayerRef.current) : map.removeLayer(satLabelLayerRef.current);
    }
    if (rfLayerRef.current) {
      overlays.rf ? map.addLayer(rfLayerRef.current) : map.removeLayer(rfLayerRef.current);
    }
    if (rfLabelLayerRef.current) {
      overlays.rf && overlays.labels ? map.addLayer(rfLabelLayerRef.current) : map.removeLayer(rfLabelLayerRef.current);
    }
    if (heatLayerRef.current) {
      overlays.heatmap ? map.addLayer(heatLayerRef.current) : map.removeLayer(heatLayerRef.current);
    }
    if (pathLayerRef.current) {
      overlays.satellites ? map.addLayer(pathLayerRef.current) : map.removeLayer(pathLayerRef.current);
    }
  }, [overlays]);

  useEffect(() => {
    const L = window.L;
    const map = mapRef.current;
    if (!map || !L || !rfLayerRef.current || !rfLabelLayerRef.current) return;

    rfLayerRef.current.clearLayers();
    rfLabelLayerRef.current.clearLayers();

    rfSources.forEach((rf, i) => {
      const pos = rf.coordinates;
      if (!pos) return;
      const color = RF_COLORS[i % RF_COLORS.length];

      const marker = L.marker([pos.lat, pos.lng], {
        icon: L.divIcon({
          className: '',
          html: `<div style="width:8px;height:8px;background:${color};border:2px solid ${color};transform:rotate(45deg);cursor:pointer;"></div>`,
          iconSize: [14, 14], iconAnchor: [7, 7]
        })
      });
      marker.bindPopup(`<div style="font-family:sans-serif;min-width:180px;color:#e0e0f0;"><div style="font-weight:700;font-size:13px;margin-bottom:4px;">${rf.band}</div><div style="font-size:11px;color:#888;">${rf.country} | ${rf.service}<br/>${rf.freqStart}-${rf.freqEnd} ${rf.unit}<br/>Stations: ${(rf.activeStations||0).toLocaleString()}</div></div>`, { closeButton: true });
      marker.on('click', () => onObjectClick(rf));
      rfLayerRef.current.addLayer(marker);

      rfLabelLayerRef.current.addLayer(L.marker([pos.lat, pos.lng], {
        icon: L.divIcon({
          className: '',
          html: `<div style="color:${color};font-size:8px;font-weight:600;text-shadow:0 0 4px #000;white-space:nowrap;font-family:monospace;pointer-events:none;">${rf.band}</div>`,
          iconSize: [0, 0], iconAnchor: [0, 14]
        })
      }));
    });
  }, [rfSources, onObjectClick]);

  useEffect(() => {
    const L = window.L;
    const map = mapRef.current;
    if (!map || !L) return;

    if (heatLayerRef.current) {
      map.removeLayer(heatLayerRef.current);
      heatLayerRef.current = null;
    }

    if (!overlays.heatmap || !L.heatLayer) return;

    const heatPoints = [];
    if (overlays.satellites) {
      satellites.forEach(sat => {
        const pos = sat.currentPosition;
        if (pos) heatPoints.push([pos.lat, pos.lng, 0.3]);
      });
    }
    if (overlays.rf) {
      rfSources.forEach(rf => {
        const pos = rf.coordinates;
        if (pos) heatPoints.push([pos.lat, pos.lng, 0.5]);
      });
    }

    if (heatPoints.length > 0) {
      heatLayerRef.current = L.heatLayer(heatPoints, {
        radius: 25, blur: 15, maxZoom: 8, max: 1.0,
        gradient: { 0.0: '#4a7aff', 0.5: '#00d4ff', 0.8: '#00ff88', 1.0: '#ff8800' }
      }).addTo(map);
    }
  }, [overlays.heatmap, overlays.satellites, overlays.rf, satellites, rfSources]);

  useEffect(() => {
    if (!selectedObject || !mapRef.current) return;
    const pos = selectedObject.currentPosition || selectedObject.coordinates;
    if (pos) mapRef.current.setView([pos.lat, pos.lng], 4, { animate: true });
  }, [selectedObject]);

  return <div ref={containerRef} style={{ width: '100%', height: '100%' }} />;
}
