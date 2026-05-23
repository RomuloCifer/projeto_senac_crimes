import { getCategoryMeta } from '../../utils/categoryStyles';

export default function CaseList({ cases, selectedCaseId, onSelectCase }) {
  return (
    <aside className="case-list-panel" aria-label="Lista de casos">
      <div className="case-list-header">
        <h2>Casos</h2>
        <p>{cases.length} encontrados</p>
      </div>

      <ul className="case-list">
        {cases.map((item) => {
          const meta = getCategoryMeta(item.category);
          const isActive = selectedCaseId === item.id;
          return (
            <li key={item.id}>
              <button
                type="button"
                className={`case-list-item ${isActive ? 'active' : ''}`}
                onClick={() => onSelectCase(item)}
              >
                <span className="category-dot" style={{ backgroundColor: meta.color }} />
                <span className="item-main">
                  <strong>{item.title}</strong>
                  <small>{item.city}/{item.state} - {item.year}</small>
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
