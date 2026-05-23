import { MapContainer, TileLayer, CircleMarker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { getCategoryMeta } from '../../utils/categoryStyles';
import MapFloatingCard from '../MapFloatingCard/MapFloatingCard';
import MapFilter from '../MapFilter/MapFilter';
import './MapView.css';

const BRAZIL_CENTER = [-15.78, -47.93];
const BRAZIL_ZOOM = 4;

export default function MapView({ cases, selectedCaseId, onSelectCase, onInvestigate, onStreetView, isImmersive, onToggleImmersive, filters, activeFilter, onFilterChange, categoryCounts }) {
  const activeCase = cases.find((c) => c.id === selectedCaseId) ?? null;
  const mapHeight = isImmersive ? 'calc(100vh - 16px)' : '540px';

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

          {cases.map((item) => {
            const meta = getCategoryMeta(item.category);
            const isActive = selectedCaseId === item.id;
            return (
              <CircleMarker
                key={item.id}
                center={[item.latitude, item.longitude]}
                radius={isActive ? 13 : 9}
                pathOptions={{
                  fillColor: meta.color,
                  fillOpacity: 0.92,
                  color: '#ffffff',
                  weight: isActive ? 3 : 2,
                }}
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
        onClose={() => onSelectCase(null)}        onInvestigate={onInvestigate}        onStreetView={onStreetView}
        isImmersive={isImmersive}
      />
    </section>
  );
}
