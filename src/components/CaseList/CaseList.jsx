import { useEffect, useRef, useState } from 'react';
import { getCategoryMeta } from '../../utils/categoryStyles';
import './CaseList.css';

function briefText(text, maxLength = 84) {
  if (!text) return '';
  const normalized = text.replace(/\s+/g, ' ').trim();
  if (normalized.length <= maxLength) return normalized;
  return `${normalized.slice(0, maxLength - 1).trimEnd()}...`;
}

export default function CaseList({ cases, selectedCaseId, onSelectCase }) {
  const listRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollState = () => {
    const el = listRef.current;
    if (!el) return;

    const maxScrollLeft = el.scrollWidth - el.clientWidth;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < maxScrollLeft - 4);
  };

  useEffect(() => {
    updateScrollState();

    const el = listRef.current;
    if (!el) return undefined;

    const handleScroll = () => updateScrollState();
    const handleResize = () => updateScrollState();
    el.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    return () => {
      el.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [cases]);

  const scrollByCards = (direction) => {
    const el = listRef.current;
    if (!el) return;

    el.scrollBy({
      left: direction * 280,
      behavior: 'smooth',
    });
  };

  return (
    <aside className="case-list-panel" aria-label="Lista de casos">
      <div className="case-list-header">
        <h2>Casos</h2>
        <div className="case-list-header-actions">
          <p>{cases.length} {cases.length === 1 ? 'encontrado' : 'encontrados'}</p>

          <div className="case-list-nav" aria-label="Navegacao dos casos">
            <button
              type="button"
              className="case-nav-btn"
              onClick={() => scrollByCards(-1)}
              disabled={!canScrollLeft}
              aria-label="Mover para a esquerda"
            >
              &lt;
            </button>

            <button
              type="button"
              className="case-nav-btn"
              onClick={() => scrollByCards(1)}
              disabled={!canScrollRight}
              aria-label="Mover para a direita"
            >
              &gt;
            </button>
          </div>
        </div>
      </div>

      <ul className="case-list" ref={listRef}>
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
                <div className="card-thumb-wrap">
                  <img src={item.imageUrl} alt={item.title} className="card-thumb" loading="lazy" />
                  <span className="category-dot" style={{ backgroundColor: meta.color }} aria-hidden="true" />
                </div>

                <span className="item-main">
                  <strong>{item.title}</strong>
                  <small>{item.city}/{item.state}</small>
                  <span className="item-desc">{briefText(item.description)}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
