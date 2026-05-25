import './StreetViewModal.css';

export default function StreetViewModal({ caseItem, onClose }) {
  if (!caseItem) return null;

  // Se o caso fornecer um link embed específico, usa-o (ex.: Street View embed)
  // Caso contrário monta uma URL genérica por lat/lng que tenta abrir o Street View
  const src = caseItem.streetViewEmbedUrl
    ? caseItem.streetViewEmbedUrl
    : `https://maps.google.com/maps?q=${caseItem.latitude},${caseItem.longitude}&layer=c&z=18&output=embed`;

  return (
    <div
      className="streetview-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={`Street View — ${caseItem.title}`}
      onClick={onClose}
    >
      <div className="streetview-modal" onClick={(e) => e.stopPropagation()}>
        <div className="streetview-header">
          <div className="streetview-header-text">
            <span className="streetview-pin">📍</span>
            <div>
              <h3>{caseItem.title}</h3>
              <p>{caseItem.city}, {caseItem.state} &mdash; {caseItem.year}</p>
            </div>
          </div>
          <button
            className="streetview-close"
            onClick={onClose}
            aria-label="Fechar Street View"
          >
            ✕
          </button>
        </div>

        <iframe
          title={`Street View — ${caseItem.title}`}
          src={src}
          width="100%"
          height="480"
          style={{ border: 0, display: 'block' }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />

        <p className="streetview-note">
          Powered by Google Maps &nbsp;&bull;&nbsp; Se o Street View não estiver disponível nesta
          localização, o mapa regular é exibido no lugar.
        </p>
      </div>
    </div>
  );
}
