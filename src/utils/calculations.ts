import type { CapitalGains, Holding, NetGains, AfterHarvestingGains } from '../types';

/**
 * Format a number as Indian Rupee currency string
 */
export function formatCurrency(
  amount: number,
  currency: 'INR' | 'USD' = 'INR',
  compact = false
): string {
  if (compact && Math.abs(amount) >= 1000000) {
    const million = amount / 1000000;
    return `₹${million.toFixed(2)}M`;
  }

  const formatted = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency,
    minimumFractionDigits: amount % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(amount);

  return formatted;
}

/**
 * Format a number with sign prefix and USD currency
 */
export function formatCurrencyWithSign(amount: number): string {
  const abs = formatCurrency(Math.abs(amount));
  return amount >= 0 ? `+${abs}` : `-${abs}`;
}

/**
 * Calculate net gains from profits and losses
 */
export function calculateNetGains(profits: number, losses: number): number {
  return profits - losses;
}

/**
 * Calculate pre-harvesting net gains from capital gains data
 */
export function calculatePreHarvestingGains(capitalGains: CapitalGains): NetGains {
  const stcgNet = calculateNetGains(capitalGains.stcg.profits, capitalGains.stcg.losses);
  const ltcgNet = calculateNetGains(capitalGains.ltcg.profits, capitalGains.ltcg.losses);
  const realisedCapitalGains = stcgNet + ltcgNet;

  return { stcgNet, ltcgNet, realisedCapitalGains };
}

/**
 * Calculate after-harvesting gains given selected holdings.
 *
 * Per spec:
 *  - Start from the PRE-harvesting totals (capital gains data from API).
 *  - For EACH selected holding:
 *      If stcg.gain > 0 → subtract it from stcg.profits  (selling reduces unrealised profit)
 *      If stcg.gain < 0 → subtract the absolute value from stcg.losses (harvesting a loss reduces tax)
 *      Same logic for ltcg.
 *
 * The intuition: by selling ("harvesting") an asset you are REALISING its gain/loss.
 * A harvested loss reduces your taxable profits; a harvested gain increases them.
 *
 * Actually, per standard tax-loss harvesting logic:
 *  - Harvesting a LOSS holding → adds that loss to losses column → reduces net gains → saves tax
 *  - Harvesting a GAIN holding → adds that gain to profits column → increases net gains → costs more tax
 *
 * The After Harvesting card starts at pre-harvesting values and adjusts:
 *   If gain > 0  → add to profits (more gain realised)
 *   If gain < 0  → add |gain| to losses (more loss realised = tax saving opportunity)
 */
export function calculateHarvestedGains(
  capitalGains: CapitalGains,
  selectedHoldings: Holding[]
): AfterHarvestingGains {
  // Start from the pre-harvesting baseline
  let stcgProfits = capitalGains.stcg.profits;
  let stcgLosses  = capitalGains.stcg.losses;
  let ltcgProfits = capitalGains.ltcg.profits;
  let ltcgLosses  = capitalGains.ltcg.losses;

  for (const holding of selectedHoldings) {
    // STCG adjustment: add gain to profits bucket, or add loss to losses bucket
    if (holding.stcg.gain > 0) {
      stcgProfits += holding.stcg.gain;
    } else {
      stcgLosses += Math.abs(holding.stcg.gain);
    }

    // LTCG adjustment: same logic
    if (holding.ltcg.gain > 0) {
      ltcgProfits += holding.ltcg.gain;
    } else {
      ltcgLosses += Math.abs(holding.ltcg.gain);
    }
  }

  const stcgNet = stcgProfits - stcgLosses;
  const ltcgNet = ltcgProfits - ltcgLosses;
  const realisedCapitalGains = stcgNet + ltcgNet;

  return {
    stcg: { profits: stcgProfits, losses: stcgLosses },
    ltcg: { profits: ltcgProfits, losses: ltcgLosses },
    stcgNet,
    ltcgNet,
    realisedCapitalGains,
  };
}

/**
 * Calculate how much the user saves by harvesting.
 * Savings = pre-harvesting realised gains − post-harvesting realised gains.
 * Only show a positive number when post < pre (harvesting reduced the tax burden).
 * Returns 0 (not null) when there is no saving, so the UI can always display a value.
 */
export function calculateSavings(
  preRealisedCapitalGains: number,
  postRealisedCapitalGains: number
): number {
  const saving = preRealisedCapitalGains - postRealisedCapitalGains;
  return saving > 0 ? saving : 0;
}

/**
 * Format a coin holding quantity to a human-readable string
 */
export function formatHolding(amount: number, symbol: string, decimals = 4): string {
  return `${amount.toLocaleString('en-IN', { maximumFractionDigits: decimals })} ${symbol}`;
}

/**
 * Format a price value in INR with K/L suffix
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
}

/**
 * Format a currency amount compactly (supporting Lakhs/Crores for INR and Millions/Billions for USD)
 */
export function formatCompactCurrency(
  amount: number,
  currency: 'INR' | 'USD' = 'INR'
): string {
  const isNegative = amount < 0;
  const absVal = Math.abs(amount);
  
  let formatted = '';
  if (currency === 'INR') {
    if (absVal >= 10000000) { // 1 Crore
      formatted = `₹${(absVal / 10000000).toFixed(2)}Cr`;
    } else if (absVal >= 100000) { // 1 Lakh
      formatted = `₹${(absVal / 100000).toFixed(2)}L`;
    } else if (absVal >= 1000) { // 1 Thousand
      formatted = `₹${(absVal / 1000).toFixed(2)}K`;
    } else {
      formatted = formatCurrency(absVal, 'INR');
    }
  } else {
    // USD or other standard Western format
    if (absVal >= 1000000000) { // 1 Billion
      formatted = `$${(absVal / 1000000000).toFixed(2)}B`;
    } else if (absVal >= 1000000) { // 1 Million
      formatted = `$${(absVal / 1000000).toFixed(2)}M`;
    } else if (absVal >= 1000) { // 1 Thousand
      formatted = `$${(absVal / 1000).toFixed(2)}K`;
    } else {
      formatted = formatCurrency(absVal, 'USD');
    }
  }
  
  return isNegative ? `-${formatted}` : formatted;
}
