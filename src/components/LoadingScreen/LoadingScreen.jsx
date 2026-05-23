export default function LoadingScreen() {
  return (
    <section className="loading-screen" aria-live="polite" aria-busy="true">
      <div className="loading-ring" />
      <p>Carregando arquivos classificados...</p>
    </section>
  );
}
