import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet';
import { useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import { getCategoryMeta } from '../../utils/categoryStyles';

// Centraliza o mapa no caso selecionado
function FlyToSelected({ cases, selectedCaseId }) {
  const map = useMap();
  useEffect(() => {
    const found = cases.find((c) => c.id === selectedCaseId);
    if (found) {
      map.flyTo([found.latitude, found.longitude], 13, { duration: 1.2 });
    }
  }, [selectedCaseId, cases, map]);
  return null;
}

export default function MapView({ cases, selectedCaseId, onSelectCase, onStreetView }) {
  return (
    <section className="map-panel">
      <div className="map-title-row">
        <h2>Mapa Interativo</h2>
        <p>Brasil — mapa real &bull; clique num pin para Street View</p>
      </div>

      <div className="map-surface leaflet-wrap">
        <MapContainer
          center={[-15.78, -47.93]}
          zoom={4}
          minZoom={4}
          maxBounds={[[-34.0, -74.0], [5.5, -32.0]]}
          maxBoundsViscosity={1.0}
          style={{ height: '560px', width: '100%', borderRadius: '16px' }}
          scrollWheelZoom
        >
          {/* Tiles escuros CartoDB — combina com o tema do projeto */}
          <TileLayer
            attribution='&copy; <a href="https://carto.com/attributions">CARTO</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          />

          <FlyToSelected cases={cases} selectedCaseId={selectedCaseId} />

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
              >
                <Popup className="dark-popup">
                  <div className="leaflet-popup-inner">
                    <strong>{item.title}</strong>
                    <span>{item.city}, {item.state} &mdash; {item.year}</span>
                    <button
                      className="streetview-btn"
                      onClick={() => onStreetView(item)}
                    >
                      📍 Ver no Street View
                    </button>
                  </div>
                </Popup>
              </CircleMarker>
            );
          })}
        </MapContainer>
      </div>
    </section>
  );
}
