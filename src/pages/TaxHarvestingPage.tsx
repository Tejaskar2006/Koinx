import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { useHoldings, useCapitalGains } from '../hooks/useHarvestingData';
import { useHarvestingStore } from '../store/harvestingStore';
import { PreHarvestingCard } from '../components/cards/PreHarvestingCard';
import { AfterHarvestingCard } from '../components/cards/AfterHarvestingCard';
import { HoldingsTable } from '../components/holdings/HoldingsTable';
import { DisclaimerBanner } from '../components/ui/DisclaimerBanner';
import { CardSkeleton } from '../components/ui/SkeletonLoader';
import { ErrorState } from '../components/ui/StateComponents';
import type { Holding } from '../types';

// ============================================================
// Tax Harvesting Page — uses App.css centralized classes
// ============================================================

export function TaxHarvestingPage() {
  const holdingsQuery = useHoldings();
  const capitalGainsQuery = useCapitalGains();

  const [selectedHoldings, setSelectedHoldings] = useState<Holding[]>([]);
  const selectedIds = useHarvestingStore((s) => s.selectedHoldingIds);

  const [showHowItWorks, setShowHowItWorks] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (holdingsQuery.data?.holdings) {
      const selected = holdingsQuery.data.holdings.filter((h) => selectedIds[h.id]);
      setSelectedHoldings(selected);
    }
  }, [holdingsQuery.data?.holdings, selectedIds]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setShowHowItWorks(false);
      }
    }

    if (showHowItWorks) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showHowItWorks]);

  const handleRetry = () => {
    holdingsQuery.refetch();
    capitalGainsQuery.refetch();
  };

  return (
    <main className="page-container">
      {/* Page Title */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="page-title-row"
      >
        <h1 className="page-title">Tax Optimisation</h1>
        <div className="how-it-works-wrapper">
          <button
            ref={buttonRef}
            className="btn-how-it-works"
            aria-label="How it works"
            onClick={() => setShowHowItWorks((prev) => !prev)}
          >
            How it works?
          </button>
          
          <AnimatePresence>
            {showHowItWorks && (
              <motion.div
                ref={popoverRef}
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.15, ease: 'easeOut' }}
                style={{ x: '-50%' }}
                className="how-it-works-popover"
              >
                <div className="popover-arrow" />
                <ul className="popover-list">
                  <li>See your capital gains for FY 2024-25 in the left card</li>
                  <li>Check boxes for assets you plan on selling to reduce your tax liability</li>
                  <li>Instantly see your updated tax liability in the right card</li>
                </ul>
                <p className="popover-pro-tip">
                  <strong>Pro tip:</strong> Experiment with different combinations of your holdings to optimize your tax liability
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Disclaimer Banner */}
      <DisclaimerBanner />

      {/* Summary Cards */}
      {capitalGainsQuery.isError ? (
        <ErrorState message="Failed to load capital gains data." onRetry={handleRetry} />
      ) : capitalGainsQuery.isLoading || !capitalGainsQuery.data?.capitalGains ? (
        <div className="cards-row">
          <div className="card-col"><CardSkeleton /></div>
          <div className="card-col"><CardSkeleton /></div>
        </div>
      ) : (
        <div className="cards-row">
          <div className="card-col">
            <PreHarvestingCard capitalGains={capitalGainsQuery.data.capitalGains} />
          </div>
          <div className="card-col">
            <AfterHarvestingCard
              capitalGains={capitalGainsQuery.data.capitalGains}
              selectedHoldings={selectedHoldings}
            />
          </div>
        </div>
      )}

      {/* Holdings Table */}
      <HoldingsTable
        isLoading={holdingsQuery.isLoading}
        isError={holdingsQuery.isError}
        holdings={holdingsQuery.data?.holdings}
      />
    </main>
  );
}
