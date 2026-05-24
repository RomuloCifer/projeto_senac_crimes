import { getCategoryMeta } from '../../utils/categoryStyles';
import './MapFloatingCard.css';

export default function MapFloatingCard({ item, onClose, onInvestigate, onStreetView, isImmersive = false }) {
  if (!item) return null;
  const meta = getCategoryMeta(item.category);

  return (
    <div className={`floating-card${isImmersive ? ' immersive' : ''}`} role="dialog" aria-label={item.title}>
      {/* Brilho de fundo decorativo */}
      <div className="floating-card-glow" aria-hidden="true" />

      <button
        className="floating-card-close"
        onClick={onClose}
        aria-label="Fechar card"
      >
        ✕
      </button>

      <div
        className="floating-card-tag"
        style={{ color: meta.color, borderColor: `color-mix(in srgb, ${meta.color} 35%, transparent)` }}
      >
        {meta.label}
      </div>

      <h3 className="floating-card-title">{item.title}</h3>

      <p className="floating-card-location">
        <span className="floating-card-dot" aria-hidden="true" />
        {item.city}, {item.state} &mdash; {item.year}
      </p>

      <p className="floating-card-desc">{item.description}</p>

      <div className="floating-card-actions">
        <button className="floating-card-btn outline" onClick={() => onInvestigate(item)}>Investigar</button>
        <button className="floating-card-btn filled" onClick={() => onStreetView(item)}>
          📍 Ver no Street View
        </button>
      </div>
    </div>
  );
}
