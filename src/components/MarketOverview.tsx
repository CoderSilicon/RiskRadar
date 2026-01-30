import { TrendingUp, TrendingDown, BarChart3 } from "lucide-react";

const MARKET_DATA = [
  { label: "NIFTY 50", val: "24,836.10", chg: "+0.45%", up: true, subLabel: "NSE" },
  { label: "SENSEX", val: "81,455.40", chg: "+0.52%", up: true, subLabel: "BSE" },
  { label: "NIFTY BANK", val: "51,127.80", chg: "-0.18%", up: false, subLabel: "NSE" },
  { label: "NIFTY IT", val: "41,892.35", chg: "+1.24%", up: true, subLabel: "NSE" },
];

const MarketOverview = () => {
  return (
    <section className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <BarChart3 className="w-5 h-5 text-primary" />
        <h2 className="text-sm font-semibold text-foreground uppercase tracking-wide">
          Market Overview
        </h2>
        <span className="flex items-center gap-1 ml-auto text-xs text-muted-foreground">
          <span className="w-2 h-2 rounded-full bg-stock-up animate-pulse-subtle" />
          Live
        </span>
      </div>
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {MARKET_DATA.map((m, i) => (
          <div
            key={i}
            className="stock-card p-4 cursor-pointer group"
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="text-xs text-muted-foreground font-medium">
                  {m.subLabel}
                </p>
                <p className="text-sm font-semibold text-foreground">
                  {m.label}
                </p>
              </div>
              <div className={`p-1.5 rounded-md ${m.up ? 'bg-stock-up/10' : 'bg-stock-down/10'}`}>
                {m.up ? (
                  <TrendingUp className="w-4 h-4 text-stock-up" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-stock-down" />
                )}
              </div>
            </div>
            <p className="text-xl font-bold font-mono-numbers text-foreground">
              {m.val}
            </p>
            <p className={`text-sm font-semibold font-mono-numbers mt-1 ${m.up ? 'text-stock-up' : 'text-stock-down'}`}>
              {m.chg}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MarketOverview;
