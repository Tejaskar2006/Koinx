// ============================================================
// Types & Interfaces
// ============================================================

export interface GainLoss {
  gain: number;
  balance: string;
}

export interface Holding {
  id: string;
  coin: string;
  coinName: string;
  coinSymbol: string;
  logoUrl: string;
  totalHolding: number;
  holdingSymbol: string;
  avgBuyPrice: number;
  currentPrice: number;
  totalCurrentValue: number;
  stcg: GainLoss;
  ltcg: GainLoss;
}

export interface StcgLtcg {
  profits: number;
  losses: number;
}

export interface CapitalGains {
  stcg: StcgLtcg;
  ltcg: StcgLtcg;
}

export interface CapitalGainsResponse {
  capitalGains: CapitalGains;
}

export interface HoldingsResponse {
  holdings: Holding[];
}

export interface NetGains {
  stcgNet: number;
  ltcgNet: number;
  realisedCapitalGains: number;
}

export interface AfterHarvestingGains {
  stcg: StcgLtcg;
  ltcg: StcgLtcg;
  stcgNet: number;
  ltcgNet: number;
  realisedCapitalGains: number;
}

export type SortField = 'stcg' | 'ltcg' | 'name' | 'value' | 'none';
export type SortDirection = 'asc' | 'desc';
