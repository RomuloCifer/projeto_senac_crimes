import { useEffect, useMemo, useState } from 'react';
import './LoadingScreen.css';

const INTRO_LINES = [
  'Inicializando arquivos...',
  'Acessando registros...',
  'Localizando ocorrencias...',
];

export default function LoadingScreen() {
  const [step, setStep] = useState(0);
  const [typedCount, setTypedCount] = useState(0);

  useEffect(() => {
    const linesTimer = window.setInterval(() => {
      setStep((current) => (current < INTRO_LINES.length - 1 ? current + 1 : current));
    }, 820);

    return () => window.clearInterval(linesTimer);
  }, []);

  useEffect(() => {
    const currentText = INTRO_LINES[step];
    setTypedCount(0);

    const typingTimer = window.setInterval(() => {
      setTypedCount((count) => {
        if (count >= currentText.length) {
          window.clearInterval(typingTimer);
          return count;
        }
        return count + 1;
      });
    }, 26);

    return () => window.clearInterval(typingTimer);
  }, [step]);

  const visibleLines = useMemo(() => INTRO_LINES.slice(0, step), [step]);
  const activeLine = INTRO_LINES[step].slice(0, typedCount);

  return (
    <section className="loading-screen" aria-live="polite" aria-busy="true">
      <div className="loading-terminal" role="status" aria-label="Carregando arquivos classificados">
        <p className="terminal-title">Arquivos classificados carregando...</p>

        <div className="terminal-body">
          {visibleLines.map((line) => (
            <p key={line} className="terminal-line is-done">&gt; {line}</p>
          ))}

          <p className="terminal-line is-active">
            &gt; {activeLine}
            <span className="terminal-cursor" aria-hidden="true">|</span>
          </p>
        </div>
      </div>
    </section>
  );
}
