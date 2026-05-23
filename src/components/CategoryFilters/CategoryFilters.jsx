import { getCategoryMeta } from '../../utils/categoryStyles';
import './CategoryFilters.css';

export default function CategoryFilters({ filters, activeFilter, onChange, counts }) {
  return (
    <section className="filter-bar" aria-label="Filtros de categoria">
      {filters.map((filter) => {
        const isActive = activeFilter === filter.value;
        const amount = filter.value === 'todos' ? counts.total : counts[filter.value] ?? 0;
        const categoryMeta = getCategoryMeta(filter.value);

        return (
          <button
            key={filter.value}
            type="button"
            className={`filter-chip ${isActive ? 'active' : ''}`}
            onClick={() => onChange(filter.value)}
            style={filter.value === 'todos' ? undefined : { '--chip-color': categoryMeta.color }}
          >
            {filter.label} ({amount})
          </button>
        );
      })}
    </section>
  );
}
