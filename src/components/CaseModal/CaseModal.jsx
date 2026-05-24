import { useState, useEffect, useCallback } from 'react';
import { getCategoryMeta } from '../../utils/categoryStyles';
import './CaseModal.css';

export default function CaseModal({ item, onClose }) {
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const goTo = useCallback((index) => {
    if (!item?.images) return;
    if (index >= 0 && index < item.images.length) setLightboxIndex(index);
  }, [item]);

  // Teclado: Escape fecha, setas navegam
  useEffect(() => {
    if (lightboxIndex === null) return;
    function handleKey(e) {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') goTo(lightboxIndex + 1);
      if (e.key === 'ArrowLeft')  goTo(lightboxIndex - 1);
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightboxIndex, closeLightbox, goTo]);

  // Reseta o lightbox ao trocar de caso
  useEffect(() => {
    setLightboxIndex(null);
  }, [item]);

  if (!item) return null;
  const categoryMeta = getCategoryMeta(item.category);

  return (
    <>
    <div className="modal-overlay" role="presentation" onClick={onClose}>
      <article
        className="case-modal"
        role="dialog"
        aria-modal="true"
        aria-label={`Detalhes do caso ${item.title}`}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="modal-header">
          <button type="button" className="close-modal" onClick={onClose}>
            Fechar
          </button>
        </div>

        <div className="modal-image-wrap">
          <img src={item.imageUrl} alt={item.title} className="modal-image" />
        </div>

        <h3>{item.title}</h3>
        <p className="modal-category" style={{ color: categoryMeta.color }}>
          {categoryMeta.label}
        </p>

        <p className="modal-meta">
          {item.city}/{item.state} - {item.year}
        </p>
        <p>{item.description}</p>

        <div className="curiosity-box">
          <h4>Curiosidade</h4>
          <p>{item.curiosity}</p>
        </div>

        {item.canVisit && (
          <div className="modal-visit-box">
            <h4>Pode visitar?</h4>
            <p>{item.canVisit}</p>
          </div>
        )}

        {item.images?.length > 0 && (
          <div className="modal-gallery">
            <h4>Fotos</h4>
            <div className="modal-gallery-scroll">
              {item.images.map((src, i) => (
                <img
                  key={src}
                  src={src}
                  alt={`${item.title} — foto ${i + 1}`}
                  className="modal-gallery-img"
                  onClick={() => setLightboxIndex(i)}
                />
              ))}
            </div>
          </div>
        )}
      </article>
    </div>

    {/* ── Lightbox ──────────────────────────────────────────── */}
    {lightboxIndex !== null && item.images?.length > 0 && (
      <div
        className="lightbox-overlay"
        role="dialog"
        aria-modal="true"
        aria-label="Visualizar foto"
        onClick={closeLightbox}
      >
        <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
          <button className="lightbox-close" onClick={closeLightbox} aria-label="Fechar">✕</button>

          <button
            className="lightbox-arrow left"
            onClick={() => goTo(lightboxIndex - 1)}
            disabled={lightboxIndex === 0}
            aria-label="Foto anterior"
          >
            ‹
          </button>

          <img
            src={item.images[lightboxIndex]}
            alt={`${item.title} — foto ${lightboxIndex + 1}`}
            className="lightbox-img"
          />

          <button
            className="lightbox-arrow right"
            onClick={() => goTo(lightboxIndex + 1)}
            disabled={lightboxIndex === item.images.length - 1}
            aria-label="Próxima foto"
          >
            ›
          </button>

          <p className="lightbox-counter">{lightboxIndex + 1} / {item.images.length}</p>
        </div>
      </div>
    )}
  </>
  );
}
