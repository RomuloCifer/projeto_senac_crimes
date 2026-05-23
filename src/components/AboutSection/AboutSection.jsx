import './AboutSection.css';

export default function AboutSection() {
  return (
    <section className="about-panel" aria-label="Sobre o projeto">
      <h2>Sobre</h2>
      <p>
        O projeto apresenta historias obscuras do Brasil em formato visual para estudo e divulgacao
        cultural. O foco do MVP e validar navegacao, filtros e exploracao dos casos.
      </p>
      <p>
        Tecnologias: React + Vite + Leaflet. O mapa interativo permite navegar pelo Brasil e filtrar
        casos por categoria.
      </p>
      <p>
        Divisao sugerida do grupo: dados e curadoria, desenvolvimento front-end, design de interface e
        revisao de conteudo historico.
      </p>
    </section>
  );
}
