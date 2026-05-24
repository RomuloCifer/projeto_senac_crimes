import { useCallback, useEffect, useMemo, useState } from 'react';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import MapView from './components/MapView/MapView';
import CaseList from './components/CaseList/CaseList';
import CaseModal from './components/CaseModal/CaseModal';
import LoadingScreen from './components/LoadingScreen/LoadingScreen';
import StreetViewModal from './components/StreetViewModal/StreetViewModal';
import { CASES } from './data/cases';
import { FILTERS } from './utils/categoryStyles';
import './AppShell.css';

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

  const categoryCounts = useMemo(() => buildCategoryCounts(CASES), []);

  const visibleCases = useMemo(() => {
    if (activeFilter === 'todos') return CASES;
    return CASES.filter((item) => item.category === activeFilter);
  }, [activeFilter]);

  useEffect(() => {
    if (!isLoading) return undefined;

    const timeoutId = window.setTimeout(() => {
      setIsLoading(false);
      setShowLanding(false);
    }, 1300);

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

          <StreetViewModal caseItem={streetViewCase} onClose={() => setStreetViewCase(null)} />
        </div>
      )}

      <CaseModal item={modalCase} onClose={() => setModalCase(null)} />
    </div>
  );
}