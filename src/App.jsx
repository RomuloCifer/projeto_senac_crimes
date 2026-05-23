import { useEffect, useMemo, useState } from 'react';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import MapView from './components/MapView/MapView';
import CategoryFilters from './components/CategoryFilters/CategoryFilters';
import CaseList from './components/CaseList/CaseList';
import CaseModal from './components/CaseModal/CaseModal';
import LoadingScreen from './components/LoadingScreen/LoadingScreen';
import AboutSection from './components/AboutSection/AboutSection';
import StreetViewModal from './components/StreetViewModal/StreetViewModal';
import { CASES } from './data/cases';
import { FILTERS } from './utils/categoryStyles';
import './App.css';

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
  const [streetViewCase, setStreetViewCase] = useState(null);
  const [showLanding, setShowLanding] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isImmersive, setIsImmersive] = useState(true);

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

  const handleExplore = () => {
    setIsLoading(true);
  };

  const handleFilterChange = (nextFilter) => {
    setActiveFilter(nextFilter);
    setSelectedCase(null);
  };

  return (
    <div className={`app-shell ${isImmersive ? 'immersive' : ''}`}>
      {showLanding ? (
        isLoading ? (
          <LoadingScreen />
        ) : (
          <Hero onExplore={handleExplore} />
        )
      ) : (
        <>
          <Header
            isImmersive={isImmersive}
            onToggleImmersive={() => setIsImmersive((current) => !current)}
          />

          <CategoryFilters
            filters={FILTERS}
            activeFilter={activeFilter}
            onChange={handleFilterChange}
            counts={categoryCounts}
          />

          <main className="main-layout">
            <MapView
              cases={visibleCases}
              selectedCaseId={selectedCase?.id}
              onSelectCase={setSelectedCase}
              onStreetView={setStreetViewCase}
            />

            <CaseList
              cases={visibleCases}
              selectedCaseId={selectedCase?.id}
              onSelectCase={setSelectedCase}
            />
          </main>

          <AboutSection />
          <CaseModal item={selectedCase} onClose={() => setSelectedCase(null)} />
          <StreetViewModal caseItem={streetViewCase} onClose={() => setStreetViewCase(null)} />
        </>
      )}
    </div>
  );
}