import { useState, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Header } from './components/ui/Header';
import { TaxHarvestingPage } from './pages/TaxHarvestingPage';
import './App.css';

// ============================================================
// TanStack Query Client
// ============================================================

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

// ============================================================
// Root App Component
// ============================================================

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('koinx-theme');
    if (saved === 'light' || saved === 'dark') return saved;
    return 'light'; // default light theme
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('koinx-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className="app-root">
        <Header theme={theme} onToggleTheme={toggleTheme} />
        <TaxHarvestingPage />
      </div>
    </QueryClientProvider>
  );
}

export default App;
