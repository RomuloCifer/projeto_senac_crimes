import './Header.css';

export default function Header({ isImmersive, onToggleImmersive }) {
  return (
    <header className="app-header">
      <div>
        <p className="eyebrow">Arquivos Classificados</p>
        <h1>Brasil Obscuro</h1>
        <p className="subtitle">Explore historias obscuras escondidas pelo Brasil.</p>
      </div>

      <button className="ghost-button" type="button" onClick={onToggleImmersive}>
        {isImmersive ? '↙ Reduzir mapa' : '⛶ Expandir mapa'}
      </button>
    </header>
  );
}
