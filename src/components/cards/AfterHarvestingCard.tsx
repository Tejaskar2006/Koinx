import { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  formatCurrency,
  calculateHarvestedGains,
  calculateSavings,
} from '../../utils/calculations';
import type { CapitalGains, Holding } from '../../types';

// ============================================================
// After Harvesting Card — uses App.css centralized classes
// ============================================================

interface AfterHarvestingCardProps {
  capitalGains: CapitalGains;
  selectedHoldings: Holding[];
}

function GainRow({
  label,
  stcgValue,
  ltcgValue,
  isNegative,
  isBold,
}: {
  label: string;
  stcgValue: number;
  ltcgValue: number;
  isNegative?: boolean;
  isBold?: boolean;
}) {
  return (
    <tr className={isBold ? 'card-row-bold' : ''}>
      <td>
        <span className="card-row-label">{label}</span>
      </td>
      <td>
        <span className="card-row-value">
          {isNegative ? '- ' : ''}{formatCurrency(Math.abs(stcgValue))}
        </span>
      </td>
      <td>
        <span className="card-row-value">
          {isNegative ? '- ' : ''}{formatCurrency(Math.abs(ltcgValue))}
        </span>
      </td>
    </tr>
  );
}

export function AfterHarvestingCard({ capitalGains, selectedHoldings }: AfterHarvestingCardProps) {
  const afterGains = useMemo(
    () => calculateHarvestedGains(capitalGains, selectedHoldings),
    [capitalGains, selectedHoldings]
  );

  const preRealisedGains = useMemo(
    () =>
      capitalGains.stcg.profits -
      capitalGains.stcg.losses +
      (capitalGains.ltcg.profits - capitalGains.ltcg.losses),
    [capitalGains]
  );

  const savings = useMemo(
    () => calculateSavings(preRealisedGains, afterGains.realisedCapitalGains),
    [preRealisedGains, afterGains.realisedCapitalGains]
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut', delay: 0.1 }}
      className="card card-after"
    >
      <h2 className="card-title">After Harvesting</h2>

      <div style={{ overflowX: 'auto' }}>
        <table className="card-table">
          <thead>
            <tr>
              <th style={{ width: '50%' }} />
              <th>Short-term</th>
              <th>Long-term</th>
            </tr>
          </thead>
          <tbody>
            <GainRow label="Profits"          stcgValue={afterGains.stcg.profits} ltcgValue={afterGains.ltcg.profits} />
            <GainRow label="Losses"           stcgValue={afterGains.stcg.losses}  ltcgValue={afterGains.ltcg.losses}  isNegative />
            <GainRow label="Net Capital Gains" stcgValue={afterGains.stcgNet}       ltcgValue={afterGains.ltcgNet}       isBold />
          </tbody>
        </table>
      </div>

      <div className="card-footer">
        <span className="card-footer-label">Effective Capital Gains:</span>
        <motion.span
          key={afterGains.realisedCapitalGains}
          initial={{ opacity: 0.6, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="card-footer-value"
        >
          {afterGains.realisedCapitalGains < 0 && '- '}
          {formatCurrency(Math.abs(afterGains.realisedCapitalGains))}
        </motion.span>
      </div>

      {/* Savings Banner — only shown when harvesting actually saves money */}
      <AnimatePresence>
        {savings > 0 && (
          <motion.div
            key="savings-banner"
            initial={{ opacity: 0, y: 8, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: 8, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <div className="savings-banner">
              🎉 You are going to save upto{' '}
              <span className="savings-amount">{formatCurrency(savings)}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
