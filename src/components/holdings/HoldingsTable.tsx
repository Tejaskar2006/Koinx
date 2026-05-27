import { useMemo, useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { useHarvestingStore } from '../../store/harvestingStore';
import { formatCurrency, formatHolding, formatCompactCurrency } from '../../utils/calculations';
import { TableRowSkeleton } from '../ui/SkeletonLoader';
import { EmptyState } from '../ui/StateComponents';
import type { Holding, SortField, SortDirection } from '../../types';

const isHoldingSelected = (ids: Record<string, boolean>, id: string) => Boolean(ids[id]);

// ============================================================
// Coin Image with Fallback
// ============================================================

function CoinImage({ src, symbol }: { src: string; symbol: string }) {
  const [error, setError] = useState(false);
  if (error) {
    return <div className="coin-fallback">{symbol[0]}</div>;
  }
  return (
    <img src={src} alt={symbol} className="coin-img" onError={() => setError(true)} />
  );
}

// ============================================================
// Sort Icon
// ============================================================

function SortIcon({
  field,
  activeField,
  direction,
}: {
  field: SortField;
  activeField: SortField;
  direction: SortDirection;
}) {
  if (activeField !== field) return <ArrowUpDown className="h-3 w-3" style={{ color: '#94a3b8' }} />;
  return direction === 'asc'
    ? <ArrowUp className="h-3 w-3" style={{ color: '#0052fe' }} />
    : <ArrowDown className="h-3 w-3" style={{ color: '#0052fe' }} />;
}

// ============================================================
// Holding Row — matches spec columns exactly
// ============================================================

interface HoldingRowProps {
  holding: Holding;
  isSelected: boolean;
  onToggle: (id: string) => void;
  index: number;
}

function HoldingRow({ holding, isSelected, onToggle, index }: HoldingRowProps) {
  const stcgPositive = holding.stcg.gain >= 0;
  const ltcgPositive = holding.ltcg.gain >= 0;

  return (
    <motion.tr
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: index * 0.04 }}
      onClick={() => onToggle(holding.id)}
      className={`holdings-row${isSelected ? ' row-selected' : ''}`}
    >
      {/* ── Checkbox ── */}
      <td className="td-checkbox">
        <div className={`row-checkbox${isSelected ? ' checked' : ''}`}>
          {isSelected && (
            <svg className="h-2.5 w-2.5" fill="none" viewBox="0 0 12 12" style={{ color: '#fff' }}>
              <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </div>
      </td>

      {/* ── Asset: logo + name + symbol ── */}
      <td className="td-asset">
        <div className="asset-cell">
          <CoinImage src={holding.logoUrl} symbol={holding.coinSymbol} />
          <div>
            <div className="asset-name">{holding.coinName}</div>
            <div className="asset-symbol">{holding.coinSymbol}</div>
          </div>
        </div>
      </td>

      {/* ── Holdings / Avg Buy Price ── */}
      <td className="td-holdings">
        <div className="cell-primary">
          {formatHolding(holding.totalHolding, holding.holdingSymbol)}
        </div>
        <div className="cell-secondary">
          <span className="has-tooltip">
            {formatCompactCurrency(holding.avgBuyPrice)}/{holding.holdingSymbol}
            <span className="tooltip-box">
              Avg Buy Price: {formatCurrency(holding.avgBuyPrice)}/{holding.holdingSymbol}
            </span>
          </span>
        </div>
      </td>

      {/* ── Current Price ── */}
      <td className="td-price">
        <div className="cell-primary">
          <span className="has-tooltip">
            {formatCompactCurrency(holding.currentPrice)}
            <span className="tooltip-box">
              Current Price: {formatCurrency(holding.currentPrice)}
            </span>
          </span>
        </div>
      </td>

      {/* ── Short-Term Gain (stcg.gain + stcg.balance) ── */}
      <td className="td-gain">
        <div className={stcgPositive ? 'gain-positive' : 'gain-negative'}>
          <span className="has-tooltip">
            {stcgPositive ? '+' : '-'}{formatCompactCurrency(Math.abs(holding.stcg.gain))}
            <span className="tooltip-box">
              {stcgPositive ? '+' : '-'}{formatCurrency(Math.abs(holding.stcg.gain))}
            </span>
          </span>
        </div>
        <div className="cell-secondary">{holding.stcg.balance}</div>
      </td>

      {/* ── Long-Term Gain (ltcg.gain + ltcg.balance) ── */}
      <td className="td-gain">
        <div className={ltcgPositive ? 'gain-positive' : 'gain-negative'}>
          <span className="has-tooltip">
            {ltcgPositive ? '+' : '-'}{formatCompactCurrency(Math.abs(holding.ltcg.gain))}
            <span className="tooltip-box">
              {ltcgPositive ? '+' : '-'}{formatCurrency(Math.abs(holding.ltcg.gain))}
            </span>
          </span>
        </div>
        <div className="cell-secondary">{holding.ltcg.balance}</div>
      </td>

      {/* ── Amount to Sell (totalHolding when selected, dash when not) ── */}
      <td className="td-sell">
        <AnimatePresence mode="wait">
          {isSelected ? (
            <motion.span
              key="sell-amount"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.15 }}
              className="amount-to-sell"
            >
              {formatHolding(holding.totalHolding, holding.holdingSymbol)}
            </motion.span>
          ) : (
            <motion.span
              key="sell-dash"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.1 }}
              className="amount-dash"
            >
              —
            </motion.span>
          )}
        </AnimatePresence>
      </td>
    </motion.tr>
  );
}

// ============================================================
// Holdings Table
// ============================================================

interface HoldingsTableProps {
  isLoading: boolean;
  isError: boolean;
  holdings?: Holding[];
}

const ROWS_VISIBLE_DEFAULT = 4;

export function HoldingsTable({ isLoading, isError, holdings = [] }: HoldingsTableProps) {
  const selectedHoldingIds = useHarvestingStore((s) => s.selectedHoldingIds);
  const searchQuery = useHarvestingStore((s) => s.searchQuery);
  const showAll = useHarvestingStore((s) => s.showAll);
  const sortField = useHarvestingStore((s) => s.sortField);
  const sortDirection = useHarvestingStore((s) => s.sortDirection);
  const toggleHolding = useHarvestingStore((s) => s.toggleHolding);
  const clearAllHoldings = useHarvestingStore((s) => s.clearAllHoldings);
  const setSearchQuery = useHarvestingStore((s) => s.setSearchQuery);
  const setShowAll = useHarvestingStore((s) => s.setShowAll);
  const toggleSort = useHarvestingStore((s) => s.toggleSort);
  const setSelectedHoldingIds = useHarvestingStore((s) => s.setSelectedHoldingIds);

  // ── Filter & Sort ──────────────────────────────────────────
  const filteredHoldings = useMemo(() => {
    let result = [...holdings];
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (h) => h.coinName.toLowerCase().includes(q) || h.coinSymbol.toLowerCase().includes(q)
      );
    }
    if (sortField !== 'none') {
      result.sort((a, b) => {
        if (sortField === 'name') {
          return sortDirection === 'asc'
            ? a.coinName.localeCompare(b.coinName)
            : b.coinName.localeCompare(a.coinName);
        }
        let valA = 0, valB = 0;
        if (sortField === 'stcg') { valA = a.stcg.gain; valB = b.stcg.gain; }
        else if (sortField === 'ltcg') { valA = a.ltcg.gain; valB = b.ltcg.gain; }
        else if (sortField === 'value') { valA = a.totalCurrentValue; valB = b.totalCurrentValue; }
        return sortDirection === 'asc' ? valA - valB : valB - valA;
      });
    }
    return result;
  }, [holdings, searchQuery, sortField, sortDirection]);

  const visibleHoldings = useMemo(
    () => (showAll ? filteredHoldings : filteredHoldings.slice(0, ROWS_VISIBLE_DEFAULT)),
    [filteredHoldings, showAll]
  );

  // ── Selection state ────────────────────────────────────────
  const selectedCount = Object.keys(selectedHoldingIds).length;
  const isAllSelected = filteredHoldings.length > 0 && selectedCount === filteredHoldings.length;
  const isIndeterminate = selectedCount > 0 && selectedCount < filteredHoldings.length;

  const handleSelectAll = useCallback(() => {
    if (isAllSelected || isIndeterminate) {
      clearAllHoldings();
    } else {
      const all: Record<string, boolean> = {};
      filteredHoldings.forEach((h) => { all[h.id] = true; });
      setSelectedHoldingIds(all);
    }
  }, [isAllSelected, isIndeterminate, filteredHoldings, clearAllHoldings, setSelectedHoldingIds]);

  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value),
    [setSearchQuery]
  );

  // ── Render ─────────────────────────────────────────────────
  return (
    <section className="holdings-section">
      {/* Header row: title + search */}
      <div className="holdings-header">
        <h2 className="holdings-title">Holdings</h2>
        <div className="search-wrap">
          <Search className="search-icon" />
          <input
            type="text"
            placeholder="Search holdings..."
            value={searchQuery}
            onChange={handleSearch}
            className="search-input"
          />
        </div>
      </div>

      {/* Table */}
      <div className="holdings-table-wrap">
        <div className="holdings-table-scroll">
          <table className="holdings-table">
            <thead>
              <tr>
                {/* Select-all checkbox */}
                <th className="th-checkbox">
                  <div
                    onClick={handleSelectAll}
                    className={`row-checkbox${isAllSelected ? ' checked' : isIndeterminate ? ' indeterminate' : ''}`}
                    style={{ cursor: 'pointer' }}
                    role="checkbox"
                    aria-checked={isAllSelected ? true : isIndeterminate ? 'mixed' : false}
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && handleSelectAll()}
                  >
                    {(isAllSelected || isIndeterminate) && (
                      <svg className="h-2.5 w-2.5" fill="none" viewBox="0 0 12 12" style={{ color: '#fff' }}>
                        {isAllSelected ? (
                          <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                        ) : (
                          <path d="M2 6h8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                        )}
                      </svg>
                    )}
                  </div>
                </th>

                {/* Asset */}
                <th>
                  <button className="th-sort-btn" onClick={() => toggleSort('name')}>
                    Asset
                    <SortIcon field="name" activeField={sortField} direction={sortDirection} />
                  </button>
                </th>

                {/* Holdings / Avg Buy Price */}
                <th>
                  <div className="th-two-line">
                    <span>Holdings</span>
                    <span className="th-sub">Avg Buy Price</span>
                  </div>
                </th>

                {/* Current Price */}
                <th>
                  <button className="th-sort-btn" onClick={() => toggleSort('value')}>
                    Current Price
                    <SortIcon field="value" activeField={sortField} direction={sortDirection} />
                  </button>
                </th>

                {/* Short-Term Gain */}
                <th>
                  <button className="th-sort-btn" onClick={() => toggleSort('stcg')}>
                    Short-Term Gain
                    <SortIcon field="stcg" activeField={sortField} direction={sortDirection} />
                  </button>
                </th>

                {/* Long-Term Gain */}
                <th>
                  <button className="th-sort-btn" onClick={() => toggleSort('ltcg')}>
                    Long-Term Gain
                    <SortIcon field="ltcg" activeField={sortField} direction={sortDirection} />
                  </button>
                </th>

                {/* Amount to Sell */}
                <th className="th-sell">Amount to Sell</th>
              </tr>
            </thead>

            <tbody>
              {isLoading ? (
                Array.from({ length: ROWS_VISIBLE_DEFAULT }).map((_, i) => <TableRowSkeleton key={i} />)
              ) : isError ? (
                <tr>
                  <td
                    colSpan={7}
                    style={{ padding: '3rem', textAlign: 'center', color: '#dc2626', fontSize: '0.875rem', fontWeight: 600 }}
                  >
                    Failed to load holdings. Please try again.
                  </td>
                </tr>
              ) : filteredHoldings.length === 0 ? (
                <EmptyState />
              ) : (
                <AnimatePresence mode="popLayout">
                  {visibleHoldings.map((holding, index) => (
                    <HoldingRow
                      key={holding.id}
                      holding={holding}
                      isSelected={isHoldingSelected(selectedHoldingIds, holding.id)}
                      onToggle={toggleHolding}
                      index={index}
                    />
                  ))}
                </AnimatePresence>
              )}
            </tbody>
          </table>
        </div>

        {/* View All / Collapse footer */}
        {!isLoading && !isError && filteredHoldings.length > ROWS_VISIBLE_DEFAULT && (
          <div className="view-all-footer">
            <button onClick={() => setShowAll(!showAll)} className="btn-view-all">
              {showAll ? 'Collapse' : `View all ${filteredHoldings.length} assets`}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
