import './MapFilter.css';
import { getCategoryMeta } from '../../utils/categoryStyles';

export default function MapFilter({ filters, activeFilter, onChange, counts }) {
  return (
    <div className="map-filter-panel" role="group" aria-label="Filtrar casos no mapa">
      {filters.map((filter) => {
        const isActive = activeFilter === filter.value;
        const amount = filter.value === 'todos' ? counts.total : (counts[filter.value] ?? 0);
        const meta = filter.value !== 'todos' ? getCategoryMeta(filter.value) : null;

        return (
          <button
            key={filter.value}
            className={`map-filter-btn${isActive ? ' active' : ''}`}
            onClick={() => onChange(filter.value)}
            style={meta ? { '--filter-color': meta.color } : undefined}
          >
            {meta && <span className="map-filter-dot" />}
            <span className="map-filter-label">{filter.label}</span>
            <span className="map-filter-count">{amount}</span>
          </button>
        );
      })}
    </div>
  );
}
