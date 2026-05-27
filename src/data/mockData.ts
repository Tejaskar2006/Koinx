import type { Holding, CapitalGainsResponse, HoldingsResponse } from '../types';

// ============================================================
// Mock Holdings Data
// Net gain = stcg.gain + ltcg.gain
// Assets marked have net negative gain → harvesting them REDUCES tax (savings banner shows)
// Assets marked  have net positive gain  → harvesting them INCREASES tax (no savings banner)
// ============================================================

export const MOCK_HOLDINGS: Holding[] = [
  {
    // Net = -27206.89 + 2400.15 = -24806.74 saves tax
    id: 'bitcoin',
    coin: 'Bitcoin',
    coinName: 'Bitcoin',
    coinSymbol: 'BTC',
    logoUrl: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png',
    totalHolding: 0.63776,
    holdingSymbol: 'BTC',
    avgBuyPrice: 2353009,
    currentPrice: 8680932,
    totalCurrentValue: 55356.85,
    stcg: { gain: -27206.89, balance: '0.338 BTC' },
    ltcg: { gain: 2400.15, balance: '0.300 BTC' },
  },
  {
    // Net = +55320.15 + 8239.29 = +63559  increases tax
    id: 'ethereum',
    coin: 'Ethereum',
    coinName: 'Ethereum',
    coinSymbol: 'ETH',
    logoUrl: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png',
    totalHolding: 5.6736,
    holdingSymbol: 'ETH',
    avgBuyPrice: 135269,
    currentPrice: 164291,
    totalCurrentValue: 9324.21,
    stcg: { gain: 55320.15, balance: '2.332 ETH' },
    ltcg: { gain: 8239.29, balance: '3.245 ETH' },
  },
  {
    // Net = -3800 + -1500 = -5300 saves tax
    id: 'tether',
    coin: 'Tether',
    coinName: 'Tether',
    coinSymbol: 'USDT',
    logoUrl: 'https://assets.coingecko.com/coins/images/325/large/Tether.png',
    totalHolding: 3096.54,
    holdingSymbol: 'USDT',
    avgBuyPrice: 85,
    currentPrice: 95,
    totalCurrentValue: 3142.21,
    stcg: { gain: -3800.0, balance: '2011.23 USDT' },
    ltcg: { gain: -1500.0, balance: '902.47 USDT' },
  },
  {
    // Net = -9200 + -4750.5 = -13950 saves tax
    id: 'solana',
    coin: 'Solana',
    coinName: 'Solana',
    coinSymbol: 'SOL',
    logoUrl: 'https://assets.coingecko.com/coins/images/4128/large/solana.png',
    totalHolding: 42.5,
    holdingSymbol: 'SOL',
    avgBuyPrice: 6500,
    currentPrice: 12750,
    totalCurrentValue: 7324.56,
    stcg: { gain: -9200.0, balance: '22.1 SOL' },
    ltcg: { gain: -4750.5, balance: '20.4 SOL' },
  },
  {
    // Net = -1200 + 2400 = +1200  increases tax
    id: 'polygon',
    coin: 'Polygon',
    coinName: 'Polygon',
    coinSymbol: 'MATIC',
    logoUrl: 'https://assets.coingecko.com/coins/images/4713/large/matic-token-icon.png',
    totalHolding: 2210,
    holdingSymbol: 'MATIC',
    avgBuyPrice: 145,
    currentPrice: 215,
    totalCurrentValue: 4672.12,
    stcg: { gain: -1200.0, balance: '802 MATIC' },
    ltcg: { gain: 2400.0, balance: '1402 MATIC' },
  },
  {
    // Net = -5400 + -1100 = -6500 saves tax
    id: 'cardano',
    coin: 'Cardano',
    coinName: 'Cardano',
    coinSymbol: 'ADA',
    logoUrl: 'https://assets.coingecko.com/coins/images/975/large/cardano.png',
    totalHolding: 12000,
    holdingSymbol: 'ADA',
    avgBuyPrice: 28,
    currentPrice: 45,
    totalCurrentValue: 6480.0,
    stcg: { gain: -5400.0, balance: '6500 ADA' },
    ltcg: { gain: -1100.0, balance: '5500 ADA' },
  },
  {
    // Net = -850 + 1600 = +750  increases tax
    id: 'ripple',
    coin: 'XRP',
    coinName: 'XRP',
    coinSymbol: 'XRP',
    logoUrl: 'https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png',
    totalHolding: 8500,
    holdingSymbol: 'XRP',
    avgBuyPrice: 42,
    currentPrice: 67,
    totalCurrentValue: 5695.0,
    stcg: { gain: -850.0, balance: '3800 XRP' },
    ltcg: { gain: 1600.0, balance: '4700 XRP' },
  },
  {
    // Net = -4850.25 + 3200.45 = -1649.80 saves tax
    id: 'binancecoin',
    coin: 'BNB',
    coinName: 'BNB',
    coinSymbol: 'BNB',
    logoUrl: 'https://assets.coingecko.com/coins/images/825/large/binance-coin-logo.png',
    totalHolding: 15.4,
    holdingSymbol: 'BNB',
    avgBuyPrice: 24500,
    currentPrice: 42000,
    totalCurrentValue: 7850.32,
    stcg: { gain: -4850.25, balance: '6.2 BNB' },
    ltcg: { gain: 3200.45, balance: '9.2 BNB' },
  },
  {
    // Net = +850.15 + -420.3 = +429  increases tax
    id: 'dogecoin',
    coin: 'Dogecoin',
    coinName: 'Dogecoin',
    coinSymbol: 'DOGE',
    logoUrl: 'https://assets.coingecko.com/coins/images/3258/large/dogecoin.png',
    totalHolding: 14500,
    holdingSymbol: 'DOGE',
    avgBuyPrice: 6.5,
    currentPrice: 12.8,
    totalCurrentValue: 2210.45,
    stcg: { gain: 850.15, balance: '6500 DOGE' },
    ltcg: { gain: -420.3, balance: '8000 DOGE' },
  },
  {
    // Net = +420.5 + -150.1 = +270  increases tax
    id: 'chainlink',
    coin: 'Chainlink',
    coinName: 'Chainlink',
    coinSymbol: 'LINK',
    logoUrl: 'https://assets.coingecko.com/coins/images/877/large/chainlink-link-logo.png',
    totalHolding: 120.5,
    holdingSymbol: 'LINK',
    avgBuyPrice: 650,
    currentPrice: 1250,
    totalCurrentValue: 1850.21,
    stcg: { gain: 420.5, balance: '50 LINK' },
    ltcg: { gain: -150.1, balance: '70.5 LINK' },
  },
  {
    // Net = -230.15 + 680.9 = +450  increases tax
    id: 'avalanche-2',
    coin: 'Avalanche',
    coinName: 'Avalanche',
    coinSymbol: 'AVAX',
    logoUrl: 'https://assets.coingecko.com/coins/images/12559/large/Avalanche_Circle_RedBlock_Trans.png',
    totalHolding: 35.8,
    holdingSymbol: 'AVAX',
    avgBuyPrice: 1200,
    currentPrice: 2450,
    totalCurrentValue: 1240.56,
    stcg: { gain: -230.15, balance: '15 AVAX' },
    ltcg: { gain: 680.9, balance: '20.8 AVAX' },
  },
  {
    // Net = +290.4 + -120.5 = +169  increases tax
    id: 'uniswap',
    coin: 'Uniswap',
    coinName: 'Uniswap',
    coinSymbol: 'UNI',
    logoUrl: 'https://assets.coingecko.com/coins/images/12504/large/uniswap-uni.png',
    totalHolding: 180.4,
    holdingSymbol: 'UNI',
    avgBuyPrice: 350,
    currentPrice: 620,
    totalCurrentValue: 1150.89,
    stcg: { gain: 290.4, balance: '80.4 UNI' },
    ltcg: { gain: -120.5, balance: '100 UNI' },
  },
  {
    // Net = -4310.2 + 850.5 = -3459.70 saves tax
    id: 'litecoin',
    coin: 'Litecoin',
    coinName: 'Litecoin',
    coinSymbol: 'LTC',
    logoUrl: 'https://assets.coingecko.com/coins/images/2/large/litecoin.png',
    totalHolding: 18.5,
    holdingSymbol: 'LTC',
    avgBuyPrice: 4500,
    currentPrice: 6800,
    totalCurrentValue: 1480.12,
    stcg: { gain: -4310.2, balance: '8.5 LTC' },
    ltcg: { gain: 850.5, balance: '10 LTC' },
  },
  {
    // Net = -2960.2 + -180.4 = -3140.60 saves tax
    id: 'polkadot',
    coin: 'Polkadot',
    coinName: 'Polkadot',
    coinSymbol: 'DOT',
    logoUrl: 'https://assets.coingecko.com/coins/images/12171/large/polkadot.png',
    totalHolding: 240.5,
    holdingSymbol: 'DOT',
    avgBuyPrice: 280,
    currentPrice: 480,
    totalCurrentValue: 1320.45,
    stcg: { gain: -2960.2, balance: '100.5 DOT' },
    ltcg: { gain: -180.4, balance: '140 DOT' },
  },
  {
    // Net = +320.15 + -110.4 = +209  increases tax
    id: 'shiba-inu',
    coin: 'Shiba Inu',
    coinName: 'Shiba Inu',
    coinSymbol: 'SHIB',
    logoUrl: 'https://assets.coingecko.com/coins/images/11939/large/shiba.png',
    totalHolding: 45000000,
    holdingSymbol: 'SHIB',
    avgBuyPrice: 0.00065,
    currentPrice: 0.0018,
    totalCurrentValue: 980.56,
    stcg: { gain: 320.15, balance: '20000000 SHIB' },
    ltcg: { gain: -110.4, balance: '25000000 SHIB' },
  },
];

// ============================================================
// Mock Capital Gains Data (exact from spec)
// ============================================================

export const MOCK_CAPITAL_GAINS: CapitalGainsResponse = {
  capitalGains: {
    stcg: {
      profits: 70200.88,
      losses: 1548.53,
    },
    ltcg: {
      profits: 5020,
      losses: 3050,
    },
  },
};

// Simulated API delay
const delay = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

// ============================================================
// Mock API: getHoldings
// ============================================================

export async function getHoldings(): Promise<HoldingsResponse> {
  await delay(1000);

  // Simulate rare random error (disabled for stable demo)
  // if (Math.random() < 0.05) throw new Error('Failed to fetch holdings');

  return { holdings: MOCK_HOLDINGS };
}

// ============================================================
// Mock API: getCapitalGains
// ============================================================

export async function getCapitalGains(): Promise<CapitalGainsResponse> {
  await delay(1000);

  // Simulate rare random error (disabled for stable demo)
  // if (Math.random() < 0.05) throw new Error('Failed to fetch capital gains');

  return MOCK_CAPITAL_GAINS;
}
