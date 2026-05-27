import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { formatCurrency } from '../../utils/calculations';
import type { CapitalGains } from '../../types';

// ============================================================
// Pre-Harvesting Card — uses App.css centralized classes
// ============================================================

interface PreHarvestingCardProps {
  capitalGains: CapitalGains;
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

export function PreHarvestingCard({ capitalGains }: PreHarvestingCardProps) {
  const { stcg, ltcg } = capitalGains;

  const stcgNet = useMemo(() => stcg.profits - stcg.losses, [stcg]);
  const ltcgNet = useMemo(() => ltcg.profits - ltcg.losses, [ltcg]);
  const realisedCapitalGains = useMemo(() => stcgNet + ltcgNet, [stcgNet, ltcgNet]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="card card-pre"
    >
      <h2 className="card-title">Pre Harvesting</h2>

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
            <GainRow label="Profits"          stcgValue={stcg.profits} ltcgValue={ltcg.profits} />
            <GainRow label="Losses"           stcgValue={stcg.losses}  ltcgValue={ltcg.losses}  isNegative />
            <GainRow label="Net Capital Gains" stcgValue={stcgNet}       ltcgValue={ltcgNet}       isBold />
          </tbody>
        </table>
      </div>

      <div className="card-footer">
        <span className="card-footer-label">Realised Capital Gains:</span>
        <span className="card-footer-value">
          {realisedCapitalGains < 0 && '- '}
          {formatCurrency(Math.abs(realisedCapitalGains))}
        </span>
      </div>
    </motion.div>
  );
}
