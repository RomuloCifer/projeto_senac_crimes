import './Hero.css';

export default function Hero({ onExplore }) {
  return (
    <section className="hero-screen">
      <div className="hero-atmosphere" aria-hidden="true">
        <span className="hero-particle hp1" />
        <span className="hero-particle hp2" />
        <span className="hero-particle hp3" />
        <span className="hero-particle hp4" />
        <span className="hero-particle hp5" />
        <span className="hero-particle hp6" />
        <span className="hero-smoke smoke-a" />
        <span className="hero-smoke smoke-b" />
      </div>

      <div className="hero-content">
        <p className="eyebrow">Arquivos Classificados</p>
        <h1>Brasil Obscuro</h1>
        <p className="hero-copy">Explore histórias obscuras escondidas pelo Brasil.</p>
        <button type="button" className="primary-button" onClick={onExplore}>
          Explorar mapa
        </button>
      </div>
    </section>
  );
}
