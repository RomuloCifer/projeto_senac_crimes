import './MapFloatingCard.css';

export default function MapFloatingCard({ item, onClose, onStreetView }) {
  if (!item) return null;

  return (
    <div className="floating-card" role="dialog" aria-label={item.title}>
      {/* Brilho de fundo decorativo */}
      <div className="floating-card-glow" aria-hidden="true" />

      <button
        className="floating-card-close"
        onClick={onClose}
        aria-label="Fechar card"
      >
        ✕
      </button>

      <div className="floating-card-tag">{item.category}</div>

      <h3 className="floating-card-title">{item.title}</h3>

      <p className="floating-card-location">
        <span className="floating-card-dot" aria-hidden="true" />
        {item.city}, {item.state} &mdash; {item.year}
      </p>

      <p className="floating-card-desc">{item.description}</p>

      <div className="floating-card-actions">
        <button className="floating-card-btn outline">Investigar</button>
        <button className="floating-card-btn filled" onClick={() => onStreetView(item)}>
          📍 Ver no Street View
        </button>
      </div>
    </div>
  );
}
