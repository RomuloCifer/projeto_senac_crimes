import { getCategoryMeta } from '../../utils/categoryStyles';

const BRAZIL_BOUNDS = {
  minLat: -34,
  maxLat: 6,
  minLng: -74,
  maxLng: -32,
};

function toMapPosition(latitude, longitude) {
  const x = ((longitude - BRAZIL_BOUNDS.minLng) / (BRAZIL_BOUNDS.maxLng - BRAZIL_BOUNDS.minLng)) * 100;
  const y = (1 - (latitude - BRAZIL_BOUNDS.minLat) / (BRAZIL_BOUNDS.maxLat - BRAZIL_BOUNDS.minLat)) * 100;

  return {
    left: `${Math.min(Math.max(x, 3), 97)}%`,
    top: `${Math.min(Math.max(y, 4), 96)}%`,
  };
}

export default function MapView({ cases, selectedCaseId, onSelectCase }) {
  return (
    <section className="map-panel">
      <div className="map-title-row">
        <h2>Mapa Interativo</h2>
        <p>Centro: Brasil (preparado para Leaflet na Parte 2)</p>
      </div>

      <div className="map-surface" role="application" aria-label="Mapa de casos obscuros do Brasil">
        <div className="map-grid" />
        {cases.map((item) => {
          const meta = getCategoryMeta(item.category);
          const isActive = selectedCaseId === item.id;
          return (
            <button
              key={item.id}
              type="button"
              className={`map-marker ${isActive ? 'active' : ''}`}
              style={{ ...toMapPosition(item.latitude, item.longitude), '--marker-color': meta.color }}
              onClick={() => onSelectCase(item)}
              title={`${item.title} - ${meta.label}`}
            >
              <span className="sr-only">Abrir caso {item.title}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
