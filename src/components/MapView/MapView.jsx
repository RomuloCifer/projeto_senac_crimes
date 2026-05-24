import { useEffect, useMemo } from 'react';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { getCategoryMeta } from '../../utils/categoryStyles';
import MapFloatingCard from '../MapFloatingCard/MapFloatingCard';
import MapFilter from '../MapFilter/MapFilter';
import './MapView.css';

const BRAZIL_CENTER = [-15.78, -47.93];
const BRAZIL_ZOOM = 4;

function toRad(value) {
  return (value * Math.PI) / 180;
}

function hexToRgb(hex) {
  const cleaned = hex.replace('#', '').trim();
  const normalized = cleaned.length === 3
    ? cleaned.split('').map((c) => c + c).join('')
    : cleaned;

  if (normalized.length !== 6) return null;

  const value = Number.parseInt(normalized, 16);
  if (Number.isNaN(value)) return null;

  return {
    r: (value >> 16) & 255,
    g: (value >> 8) & 255,
    b: value & 255,
  };
}

function rgbaFromHex(hex, alpha) {
  const rgb = hexToRgb(hex);
  if (!rgb) return `rgba(124, 140, 255, ${alpha})`;
  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;
}

function darkenHex(hex, ratio = 0.42) {
  const rgb = hexToRgb(hex);
  if (!rgb) return '#1E2230';
  const clamp = (v) => Math.max(0, Math.min(255, Math.round(v * ratio)));
  const toHex = (v) => clamp(v).toString(16).padStart(2, '0');
  return `#${toHex(rgb.r)}${toHex(rgb.g)}${toHex(rgb.b)}`;
}

function escapeHtml(text) {
  return String(text)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function createWaveIcon(item, meta, isActive) {
  const safeTitle = escapeHtml(item.title);
  const darkColor = darkenHex(meta.color, 0.36);
  const glowColor = rgbaFromHex(meta.color, 0.38);
  const waveColor = rgbaFromHex(meta.color, 0.26);
  const waveSoftColor = rgbaFromHex(meta.color, 0.14);

  return L.divIcon({
    className: 'case-wave-icon',
    iconSize: [52, 52],
    iconAnchor: [26, 26],
    html: `
      <div
        class="case-wave-marker${isActive ? ' is-active' : ''}"
        style="--marker-color:${meta.color};--marker-color-dark:${darkColor};--marker-glow:${glowColor};--marker-wave:${waveColor};--marker-wave-soft:${waveSoftColor};"
        aria-label="${safeTitle}"
      >
        <span class="wave wave-1" aria-hidden="true"></span>
        <span class="wave wave-2" aria-hidden="true"></span>
        <span class="marker-core" aria-hidden="true"></span>
      </div>
    `,
  });
}

function metersToLatLngOffset(baseLat, meters, angleRad) {
  const metersPerDegLat = 111320;
  const metersPerDegLng = 111320 * Math.max(Math.cos(toRad(baseLat)), 0.2);

  return {
    dLat: (Math.sin(angleRad) * meters) / metersPerDegLat,
    dLng: (Math.cos(angleRad) * meters) / metersPerDegLng,
  };
}

function buildDisplayCases(items) {
  const proximityThresholdKm = 2.2;
  const stepMeters = 220;
  const maxPerRing = 6;

  const groups = [];

  for (const item of items) {
    let targetGroup = null;

    for (const group of groups) {
      const dLatKm = (item.latitude - group.centerLat) * 111;
      const dLngKm = (item.longitude - group.centerLng) * 111 * Math.max(Math.cos(toRad(group.centerLat)), 0.2);
      const distanceKm = Math.hypot(dLatKm, dLngKm);

      if (distanceKm <= proximityThresholdKm) {
        targetGroup = group;
        break;
      }
    }

    if (!targetGroup) {
      targetGroup = {
        centerLat: item.latitude,
        centerLng: item.longitude,
        count: 0,
      };
      groups.push(targetGroup);
    }

    const indexInGroup = targetGroup.count;
    targetGroup.count += 1;

    if (indexInGroup === 0) {
      item.displayLatitude = item.latitude;
      item.displayLongitude = item.longitude;
      item.isDisplaced = false;
      continue;
    }

    const ring = Math.floor((indexInGroup - 1) / maxPerRing) + 1;
    const positionInRing = (indexInGroup - 1) % maxPerRing;
    const angleRad = (positionInRing / maxPerRing) * Math.PI * 2;
    const offsetMeters = ring * stepMeters;
    const offset = metersToLatLngOffset(item.latitude, offsetMeters, angleRad);

    item.displayLatitude = item.latitude + offset.dLat;
    item.displayLongitude = item.longitude + offset.dLng;
    item.isDisplaced = true;
  }

  return items;
}

function MapResizeHandler({ isImmersive }) {
  const map = useMap();

  useEffect(() => {
    const invalidate = () => map.invalidateSize({ pan: false });
    const firstPass = window.setTimeout(invalidate, 0);
    const secondPass = window.setTimeout(invalidate, 200);
    const thirdPass = window.setTimeout(invalidate, 420);

    const container = map.getContainer();
    const observer = new ResizeObserver(() => invalidate());
    observer.observe(container);

    const onWindowResize = () => invalidate();
    window.addEventListener('resize', onWindowResize);

    return () => {
      window.clearTimeout(firstPass);
      window.clearTimeout(secondPass);
      window.clearTimeout(thirdPass);
      observer.disconnect();
      window.removeEventListener('resize', onWindowResize);
    };
  }, [isImmersive, map]);

  return null;
}

export default function MapView({ cases, selectedCaseId, onSelectCase, onInvestigate, onStreetView, isImmersive, onToggleImmersive, filters, activeFilter, onFilterChange, categoryCounts }) {
  const activeCase = cases.find((c) => c.id === selectedCaseId) ?? null;
  const mapHeight = isImmersive ? '100%' : '540px';
  const displayCases = useMemo(() => buildDisplayCases(cases.map((item) => ({ ...item }))), [cases]);

  return (
    <section className={`map-panel${isImmersive ? ' immersive' : ''}`}>
      {!isImmersive && (
        <div className="map-title-row">
          <h2>Mapa Interativo</h2>
          <p>Brasil — clique num pin para ver o caso</p>
        </div>
      )}

      <div className="map-surface leaflet-wrap">
        <MapContainer
          center={BRAZIL_CENTER}
          zoom={BRAZIL_ZOOM}
          minZoom={BRAZIL_ZOOM}
          maxBounds={[[-34.0, -74.0], [5.5, -32.0]]}
          maxBoundsViscosity={1.0}
          style={{ height: mapHeight, width: '100%', borderRadius: 'inherit' }}
          scrollWheelZoom={isImmersive}
        >
          <TileLayer
            attribution='&copy; <a href="https://carto.com/attributions">CARTO</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          />

          <MapResizeHandler isImmersive={isImmersive} />

          {displayCases.map((item) => {
            const meta = getCategoryMeta(item.category);
            const isActive = selectedCaseId === item.id;
            return (
              <Marker
                key={item.id}
                position={[item.displayLatitude, item.displayLongitude]}
                icon={createWaveIcon(item, meta, isActive)}
                zIndexOffset={isActive ? 1200 : 800}
                eventHandlers={{ click: () => onSelectCase(item) }}
              />
            );
          })}
        </MapContainer>

        {isImmersive && (
          <button className="immersive-exit-btn" onClick={onToggleImmersive}>
            ✕ Sair
          </button>
        )}

        <MapFilter
          filters={filters}
          activeFilter={activeFilter}
          onChange={onFilterChange}
          counts={categoryCounts}
        />
      </div>

      <MapFloatingCard
        item={activeCase}
        onClose={() => onSelectCase(null)} onInvestigate={onInvestigate} onStreetView={onStreetView}
        isImmersive={isImmersive}
      />
    </section>
  );
}
