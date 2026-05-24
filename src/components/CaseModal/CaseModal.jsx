import { getCategoryMeta } from '../../utils/categoryStyles';
import './CaseModal.css';

export default function CaseModal({ item, onClose }) {
  if (!item) return null;

  const categoryMeta = getCategoryMeta(item.category);

  return (
    <div className="modal-overlay" role="presentation" onClick={onClose}>
      <article
        className="case-modal"
        role="dialog"
        aria-modal="true"
        aria-label={`Detalhes do caso ${item.title}`}
        onClick={(event) => event.stopPropagation()}
      >
        <button type="button" className="close-modal" onClick={onClose}>
          Fechar
        </button>

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
                />
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
}
