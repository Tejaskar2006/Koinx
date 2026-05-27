import { Sun, Moon } from 'lucide-react';

// ============================================================
// App Header / Navbar — uses App.css centralized classes
// ============================================================

interface HeaderProps {
  theme?: 'light' | 'dark';
  onToggleTheme?: () => void;
}

export function Header({ theme = 'light', onToggleTheme }: HeaderProps) {
  return (
    <header className="app-header">
      <div className="app-header-inner">
        {/* Logo */}
        <a href="/" className="app-logo">
          <span className="logo-koin">Koin</span>
          <span className="logo-x">X</span>
          <span className="logo-sup">®</span>
        </a>

        {/* Nav
        <nav className="app-nav">
          <a href="#" className="nav-link">Portfolio</a>
          <a href="#" className="nav-link">Tax Reports</a>
          <a href="#" className="nav-link active">Tax Harvesting</a>
          <a href="#" className="nav-link">Help</a> */}
        {/* </nav> */}

        {/* CTA Actions with Theme Toggle */}
        <div className="app-header-actions">
          {/* <button className="btn-docs">
            <ExternalLink className="h-4 w-4" />
            Docs
          </button> */}

          <button
            className="btn-theme-toggle"
            onClick={onToggleTheme}
            aria-label="Toggle Theme"
            title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
          >
            {theme === 'light' ? (
              <Moon className="h-4 w-4" style={{ color: '#475569' }} />
            ) : (
              <Sun className="h-4 w-4" style={{ color: '#e2e8f0' }} />
            )}
          </button>

          {/* <button className="btn-connect-wallet">
            Connect Wallet
          </button> */}
        </div>
      </div>
    </header>
  );
}
