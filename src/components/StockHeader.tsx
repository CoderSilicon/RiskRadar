import { Search, Bell, TrendingUp, User, Menu } from "lucide-react";
import { useState } from "react";
import logo from "../../public/favicon.ico";

const NAV_ITEMS = [
  "Markets",
  "Portfolio",
  "News",
  "Watchlist",
  "IPO",
  "Mutual Funds",
];

const StockHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img src={logo} alt="logo" className="w-8 h-8" />
            <div className="flex items-center gap-2 cursor-pointer">
              <span className="text-lg font-bold tracking-tight text-foreground">
                Titan<span className="text-primary">Index</span>
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item, idx) => (
              <a
                key={item}
                href="#"
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors
                  ${
                    idx === 0
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
              >
                {item}
              </a>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <div className="hidden md:flex items-center gap-2 bg-muted rounded-full px-3 py-2 border border-border focus-within:border-primary/50 transition-colors">
              <Search className="w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search stocks, ETFs..."
                className="bg-transparent text-sm outline-none w-44 placeholder:text-muted-foreground/60 text-foreground"
              />
              <kbd className="hidden lg:inline-flex h-5 items-center gap-1 rounded border border-border bg-background px-1.5 font-mono text-[10px] text-muted-foreground">
                ⌘K
              </kbd>
            </div>

            {/* Mobile menu */}
            <button
              className="lg:hidden p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="lg:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-1">
              {NAV_ITEMS.map((item, idx) => (
                <a
                  key={item}
                  href="#"
                  className={`px-4 py-3 text-sm font-medium rounded-md transition-colors
                    ${
                      idx === 0
                        ? "text-primary bg-primary/10"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                >
                  {item}
                </a>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default StockHeader;
