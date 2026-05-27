# KoinX — Tax Loss Harvesting Dashboard

> A production-quality, recruiter-impressive fintech dashboard to help crypto investors minimize capital gains tax through strategic tax-loss harvesting.

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

---

## 📸 Screenshots

> _Add screenshots here after first run_

| Dark Dashboard | After Harvesting |
|---|---|
| `[screenshot-pre.png]` | `[screenshot-post.png]` |

---

## ✨ Features

- **Real-time Capital Gains Calculation** — Instantly computes net STCG, LTCG, and total realised capital gains
- **Dynamic After-Harvesting Preview** — Select holdings to see post-harvest gains update in real-time
- **Animated Tax Savings Banner** — Displays estimated savings with smooth Framer Motion animations
- **Full Holdings Table** — 7 mock crypto assets with coin logos, search, sort, and select-all
- **Skeleton Loading States** — Professional pulse loaders during 1-second API simulations
- **Error & Empty States** — Graceful handling with retry functionality
- **Collapsible Disclaimer Banner** — Animated important notes section
- **Responsive Design** — Cards stack vertically on mobile; table scrolls horizontally
- **Sticky Table Header** — Always-visible column headers while scrolling
- **View All / Collapse** — Shows 5 rows by default, expandable
- **Glassmorphism Effects** — Modern frosted-glass styling on cards and overlays
- **SEO Optimized** — Meta tags, OG tags, Inter font, semantic HTML

---

## 🛠 Tech Stack

| Category | Technology |
|---|---|
| Framework | React 19 + TypeScript 6 |
| Build Tool | Vite 8 |
| Styling | Tailwind CSS v4 |
| Component Library | Shadcn/UI (Radix primitives) |
| Data Fetching | TanStack Query v5 |
| State Management | Zustand v5 + Immer |
| Icons | Lucide React |
| Animations | Framer Motion 12 |
| Utilities | clsx + tailwind-merge |

---

## 🚀 Getting Started

### Prerequisites

- Node.js ≥ 18.x
- npm ≥ 9.x

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/koinx-tax-harvesting.git
cd koinx-tax-harvesting

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

---

## 📁 Folder Structure

```
src/
├── api/                  # (reserved for real API clients)
├── components/
│   ├── cards/
│   │   ├── PreHarvestingCard.tsx    # Dark-themed pre-harvest summary
│   │   └── AfterHarvestingCard.tsx  # Blue gradient post-harvest summary
│   ├── holdings/
│   │   └── HoldingsTable.tsx        # Full holdings table with all features
│   └── ui/
│       ├── Header.tsx               # Sticky navbar with KoinX branding
│       ├── DisclaimerBanner.tsx     # Collapsible important notes
│       ├── SkeletonLoader.tsx       # Loading skeleton components
│       └── StateComponents.tsx      # Error & empty states
├── data/
│   └── mockData.ts                 # Mock holdings data + API functions
├── hooks/
│   └── useHarvestingData.ts        # TanStack Query hooks (syncs to Zustand)
├── lib/
│   └── utils.ts                    # Tailwind cn() utility
├── pages/
│   └── TaxHarvestingPage.tsx       # Main page orchestrating all components
├── store/
│   └── harvestingStore.ts          # Zustand store with Immer
├── types/
│   └── index.ts                    # All TypeScript interfaces
└── utils/
    └── calculations.ts             # formatCurrency, calculateNetGains, etc.
```

---

## 📊 Business Logic

### Capital Gains Formula

```
netSTCG = stcg.profits - stcg.losses
netLTCG = ltcg.profits - ltcg.losses
realisedCapitalGains = netSTCG + netLTCG
```

### After-Harvesting Adjustment

For each selected holding:
- If `stcg.gain > 0` → add to `stcg.profits`
- Else → add `|stcg.gain|` to `stcg.losses`
- Same logic for LTCG

### Savings Display

```
savings = preHarvestingRealised - postHarvestingRealised
// Only shown if savings > 0
```

---

## 🎯 Assumptions

1. **Mock APIs** simulate a 1-second delay; replace with real API endpoints in `src/api/`
2. **Holdings data** is derived from the KoinX assignment specification with 7 assets
3. **Tax rate** is not factored into the savings estimate — it shows raw gain reduction
4. **INR currency** formatting uses `en-IN` locale
5. **All values** are in Indian Rupees (₹) to match Indian tax context
6. **STCG/LTCG** are treated as independent gain categories; cross-category offsetting is not calculated

---

## 🌐 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

Or connect your GitHub repo at [vercel.com](https://vercel.com) — the `vercel.json` SPA config is included.

### Netlify

```bash
# Build
npm run build

# Deploy dist/ folder
netlify deploy --prod --dir=dist
```

Or connect your GitHub repo — the `netlify.toml` config handles redirects automatically.

---

## 🔧 Environment Variables

Create a `.env.local` file for custom configuration:

```env
VITE_APP_TITLE=KoinX Tax Harvesting
VITE_API_BASE_URL=https://api.koinx.com
```

---

## 📄 License

MIT © KoinX 2024
