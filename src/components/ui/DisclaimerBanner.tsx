import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Info, ChevronUp, ChevronDown } from 'lucide-react';

// ============================================================
// Important Notes Disclaimer Banner — uses App.css classes
// ============================================================

const NOTES = [
  'Tax-loss harvesting is currently not allowed under Indian tax regulations. Please consult your tax advisor before making any decisions.',
  'Tax harvesting does not apply to derivatives or futures. These are handled separately as business income under tax rules.',
  'Price and market value data is fetched from Coingecko, not from individual exchanges. As a result, values may slightly differ from the ones on your exchange.',
  "Some countries do not have a short-term / long-term bifurcation. For now, we are calculating everything as long-term.",
  'Only realized losses are considered for harvesting. Unrealized losses in held assets are not counted.',
];

export function DisclaimerBanner() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="disclaimer-wrap">
      <div className="disclaimer-card">
        {/* Toggle Header */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="disclaimer-toggle"
          aria-expanded={isOpen}
          aria-label="Toggle important notes"
        >
          <div className="disclaimer-toggle-left">
            <div className="disclaimer-icon-bg">
              <Info className="h-4 w-4" style={{ color: '#0052fe' }} />
            </div>
            <span className="disclaimer-title">Important Notes &amp; Disclaimers</span>
          </div>
          {isOpen
            ? <ChevronUp className="disclaimer-chevron h-4 w-4" />
            : <ChevronDown className="disclaimer-chevron h-4 w-4" />
          }
        </button>

        {/* Collapsible Content */}
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              style={{ overflow: 'hidden' }}
            >
              <div className="disclaimer-body">
                <ul className="disclaimer-list">
                  {NOTES.map((note, i) => (
                    <li key={i} className="disclaimer-item">
                      <span className="disclaimer-bullet">•</span>
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
