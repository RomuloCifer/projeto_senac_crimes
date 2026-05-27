import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import MapView from './components/MapView/MapView';
import CaseList from './components/CaseList/CaseList';
import SoundControl from './components/SoundControl/SoundControl';
import CaseModal from './components/CaseModal/CaseModal';
import LoadingScreen from './components/LoadingScreen/LoadingScreen';
import StreetViewModal from './components/StreetViewModal/StreetViewModal';
import SeoStructuredData from './components/SeoStructuredData/SeoStructuredData';
import { CASES } from './data/cases';
import { FILTERS } from './utils/categoryStyles';
import './AppShell.css';

const SOUND_SOURCES = {
  ambient: '/sounds/ambiente.mp3',
  music: '/sounds/musica.mpeg',
  grito: null,
};

function createLoopingAudio(src) {
  if (!src) return null;

  const audio = new Audio(src);
  audio.loop = true;
  audio.preload = 'auto';
  audio.crossOrigin = 'anonymous';
  return audio;
}

function buildCategoryCounts(items) {
  return items.reduce(
    (acc, item) => {
      acc[item.category] = (acc[item.category] ?? 0) + 1;
      acc.total += 1;
      return acc;
    },
    { total: 0 }
  );
}

export default function App() {
  const [activeFilter, setActiveFilter] = useState('todos');
  const [selectedCase, setSelectedCase] = useState(null);
  const [modalCase, setModalCase] = useState(null);
  const [streetViewCase, setStreetViewCase] = useState(null);
  const [showLanding, setShowLanding] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isImmersive, setIsImmersive] = useState(false);
  const [ambientVolume, setAmbientVolume] = useState(50);
  const [musicVolume, setMusicVolume] = useState(60);
  const [gritoVolume, setGritoVolume] = useState(80);
  const [hasAudioStart, setHasAudioStart] = useState(false);
  const audioRefs = useRef({
    ambient: null,
    music: null,
    grito: null,
  });

  const categoryCounts = useMemo(() => buildCategoryCounts(CASES), []);

  useEffect(() => {
    audioRefs.current.ambient = createLoopingAudio(SOUND_SOURCES.ambient);
    audioRefs.current.music = createLoopingAudio(SOUND_SOURCES.music);
    audioRefs.current.grito = createLoopingAudio(SOUND_SOURCES.grito);

    const startAudio = () => {
      setHasAudioStart(true);
    };

    window.addEventListener('pointerdown', startAudio, { once: true });
    window.addEventListener('keydown', startAudio, { once: true });

    return () => {
      window.removeEventListener('pointerdown', startAudio);
      window.removeEventListener('keydown', startAudio);

      Object.values(audioRefs.current).forEach((audio) => {
        if (!audio) return;
        audio.pause();
        audio.src = '';
      });
    };
  }, []);

  useEffect(() => {
    const tracks = [
      ['ambient', ambientVolume],
      ['music', musicVolume],
      ['grito', gritoVolume],
    ];

    tracks.forEach(([key, volume]) => {
      const audio = audioRefs.current[key];
      if (!audio) return;

      audio.volume = Math.max(0, Math.min(1, volume / 100));
      if (volume <= 0) {
        audio.pause();
        return;
      }

      if (!hasAudioStart) return;

      const playPromise = audio.play();
      if (playPromise && typeof playPromise.catch === 'function') {
        playPromise.catch(() => {
          // ignore autoplay block until the next user gesture
        });
      }
    });
  }, [ambientVolume, gritoVolume, hasAudioStart, musicVolume]);

  const visibleCases = useMemo(() => {
    if (activeFilter === 'todos') return CASES;
    return CASES.filter((item) => item.category === activeFilter);
  }, [activeFilter]);

  useEffect(() => {
    if (!isLoading) return undefined;

    const timeoutId = window.setTimeout(() => {
      setIsLoading(false);
      setShowLanding(false);
    }, 2800);

    return () => window.clearTimeout(timeoutId);
  }, [isLoading]);

  const handleToggleImmersive = useCallback(() => setIsImmersive((v) => !v), []);
  const handleExplore = useCallback(() => setIsLoading(true), []);
  const handleFilterChange = useCallback((nextFilter) => {
    setActiveFilter(nextFilter);
    setSelectedCase(null);
  }, []);

  return (
    <div className={`app-shell${modalCase ? ' has-cinematic-modal' : ''}`}>
      <SeoStructuredData cases={CASES} />

      {showLanding ? (
        isLoading ? (
          <LoadingScreen />
        ) : (
          <Hero onExplore={handleExplore} />
        )
      ) : (
        <div className="app-main-stage">
          <Header
            isImmersive={isImmersive}
            onToggleImmersive={handleToggleImmersive}
          />

          <MapView
            cases={visibleCases}
            selectedCaseId={selectedCase?.id}
            onSelectCase={setSelectedCase}
            onInvestigate={setModalCase}
            onStreetView={setStreetViewCase}
            isImmersive={isImmersive}
            onToggleImmersive={handleToggleImmersive}
            filters={FILTERS}
            activeFilter={activeFilter}
            onFilterChange={handleFilterChange}
            categoryCounts={categoryCounts}
          />

          <CaseList
            cases={visibleCases}
            selectedCaseId={selectedCase?.id}
            onSelectCase={setSelectedCase}
          />

          {/* Barra de controles de som (após os cards) */}
          <div className="sound-controls-container">
            <div className="sound-controls-inner">
              <SoundControl type="music" label="Música" initialVolume={60} onVolumeChange={setMusicVolume} />
              <SoundControl type="ambient" label="Ambiente" initialVolume={50} onVolumeChange={setAmbientVolume} />
              <SoundControl type="grito" label="Grito" initialVolume={80} onVolumeChange={setGritoVolume} />
            </div>
          </div>

          <StreetViewModal caseItem={streetViewCase} onClose={() => setStreetViewCase(null)} />
        </div>
      )}

      <CaseModal item={modalCase} onClose={() => setModalCase(null)} />
    </div>
  );
}