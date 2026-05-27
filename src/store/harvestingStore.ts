import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { enableMapSet } from 'immer';
import type { Holding, CapitalGains } from '../types';

// Enable immer support for Map and Set data structures
enableMapSet();

// ============================================================
// Store State Interface
// ============================================================

interface HarvestingState {
  // Data
  holdings: Holding[];
  capitalGains: CapitalGains | null;

  // Selection — use a plain Record<string, boolean> for immer compatibility
  selectedHoldingIds: Record<string, boolean>;

  // UI State
  searchQuery: string;
  showAll: boolean;
  sortField: 'stcg' | 'ltcg' | 'name' | 'value' | 'none';
  sortDirection: 'asc' | 'desc';

  // Actions
  setHoldings: (holdings: Holding[]) => void;
  setCapitalGains: (capitalGains: CapitalGains) => void;
  toggleHolding: (id: string) => void;
  selectAllHoldings: () => void;
  clearAllHoldings: () => void;
  setSelectedHoldingIds: (ids: Record<string, boolean>) => void;
  setSearchQuery: (query: string) => void;
  setShowAll: (show: boolean) => void;
  toggleSort: (field: HarvestingState['sortField']) => void;
}

// ============================================================
// Zustand Store
// ============================================================

export const useHarvestingStore = create<HarvestingState>()(
  immer((set) => ({
    // Initial state
    holdings: [],
    capitalGains: null,
    selectedHoldingIds: {},
    searchQuery: '',
    showAll: false,
    sortField: 'none',
    sortDirection: 'desc',

    // Set holdings from API
    setHoldings: (holdings) =>
      set((state) => {
        state.holdings = holdings;
      }),

    // Set capital gains from API
    setCapitalGains: (capitalGains) =>
      set((state) => {
        state.capitalGains = capitalGains;
      }),

    // Toggle individual holding selection
    toggleHolding: (id) =>
      set((state) => {
        if (state.selectedHoldingIds[id]) {
          delete state.selectedHoldingIds[id];
        } else {
          state.selectedHoldingIds[id] = true;
        }
      }),

    // Select all holdings
    selectAllHoldings: () =>
      set((state) => {
        const all: Record<string, boolean> = {};
        state.holdings.forEach((h) => { all[h.id] = true; });
        state.selectedHoldingIds = all;
      }),

    // Clear all selections
    clearAllHoldings: () =>
      set((state) => {
        state.selectedHoldingIds = {};
      }),

    // Set a specific selection map (used by select-all with external data)
    setSelectedHoldingIds: (ids) =>
      set((state) => {
        state.selectedHoldingIds = ids;
      }),

    // Search query
    setSearchQuery: (query) =>
      set((state) => {
        state.searchQuery = query;
      }),

    // Show all toggle
    setShowAll: (show) =>
      set((state) => {
        state.showAll = show;
      }),

    // Toggle sort with direction cycling
    toggleSort: (field) =>
      set((state) => {
        if (state.sortField === field) {
          state.sortDirection = state.sortDirection === 'desc' ? 'asc' : 'desc';
        } else {
          state.sortField = field;
          state.sortDirection = 'desc';
        }
      }),
  }))
);

// ============================================================
// Derived selectors (used with useMemo in components)
// ============================================================

export const selectSelectedHoldings = (state: HarvestingState): Holding[] =>
  state.holdings.filter((h) => state.selectedHoldingIds[h.id]);

export const selectIsAllSelected = (state: HarvestingState): boolean =>
  state.holdings.length > 0 &&
  Object.keys(state.selectedHoldingIds).length === state.holdings.length;

export const selectIsIndeterminate = (state: HarvestingState): boolean => {
  const count = Object.keys(state.selectedHoldingIds).length;
  return count > 0 && count < state.holdings.length;
};
