interface TickerTapeProps {
  onHover: (type: 'danger' | 'warning' | 'safe') => void;
  onLeave: () => void;
  onMouseMove: (e: React.MouseEvent) => void;
}

const TICKER_DATA = [
  { symbol: "RELIANCE", price: "2,894.50", change: "+1.2%", up: true },
  { symbol: "TCS", price: "4,156.80", change: "+0.8%", up: true },
  { symbol: "HDFC", price: "1,648.25", change: "-0.3%", up: false },
  { symbol: "INFY", price: "1,892.40", change: "+2.1%", up: true },
  { symbol: "ITC", price: "478.15", change: "+0.5%", up: true },
  { symbol: "ICICI", price: "1,245.60", change: "-0.2%", up: false },
  { symbol: "SBIN", price: "812.35", change: "+1.8%", up: true },
  { symbol: "BHARTIARTL", price: "1,678.90", change: "+0.9%", up: true },
  { symbol: "WIPRO", price: "542.20", change: "-0.4%", up: false },
  { symbol: "HCLTECH", price: "1,823.45", change: "+1.5%", up: true },
];

const TickerTape = ({ onHover, onLeave, onMouseMove }: TickerTapeProps) => {
  return (
    <footer className="fixed bottom-0 w-full bg-card border-t border-border z-50 overflow-hidden">
      <div className="flex animate-ticker whitespace-nowrap py-2.5 gap-8">
        {/* Duplicate for seamless loop */}
        {[...TICKER_DATA, ...TICKER_DATA].map((ticker, i) => (
          <div
            key={i}
            className="flex items-center gap-2 px-4 text-sm cursor-pointer hover:opacity-80 transition-opacity"
            onMouseEnter={() => {
              // Hidden trigger - occasionally trigger threat popup on certain stocks
              if (ticker.symbol === 'HDFC' || ticker.symbol === 'ICICI') {
                onHover('warning');
              }
            }}
            onMouseLeave={onLeave}
            onMouseMove={onMouseMove}
          >
            <span className="font-semibold text-foreground">{ticker.symbol}</span>
            <span className="font-mono-numbers text-muted-foreground">₹{ticker.price}</span>
            <span className={`font-mono-numbers font-medium ${ticker.up ? 'text-stock-up' : 'text-stock-down'}`}>
              {ticker.change}
            </span>
          </div>
        ))}
      </div>
    </footer>
  );
};

export default TickerTape;
