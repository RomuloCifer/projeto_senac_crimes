import './Hero.css';

export default function Hero({ onExplore }) {
  return (
    <section className="hero-screen">
      <p className="eyebrow">Arquivos Classificados</p>
      <h1>Brasil Obscuro</h1>
      <p className="hero-copy">Explore histórias obscuras escondidas pelo Brasil.</p>
      <button type="button" className="primary-button" onClick={onExplore}>
        Explorar mapa
      </button>
    </section>
  );
}
