import { ArrowUpRight, ArrowDownRight, Flame } from "lucide-react";
import { ThreatData } from "./ThreatPopup";
import SuspiciousLink from "./SuspiciousLink";
import { on } from "events";

interface Stock {
  symbol: string;
  name: string;
  price: string;
  change: string;
  up: boolean;
  volume: string;
  threatType?: 'danger' | 'warning' | 'safe';
}

const STOCKS: Stock[] = [
  { symbol: "NVDA", name: "NVIDIA Corp", price: "$148.25", change: "+4.2%", up: true, volume: "52.3M", threatType: 'danger' },
  { symbol: "SMCI", name: "Super Micro", price: "$920.44", change: "+12.5%", up: true, volume: "18.7M", threatType: 'warning' },
  { symbol: "TSLA", name: "Tesla Inc", price: "$274.22", change: "-0.8%", up: false, volume: "98.2M", threatType: 'safe' },
  { symbol: "AAPL", name: "Apple Inc", price: "$192.10", change: "+0.4%", up: true, volume: "45.1M" },
  { symbol: "MSFT", name: "Microsoft", price: "$425.22", change: "+0.9%", up: true, volume: "22.8M", threatType: 'danger' },
  { symbol: "AMZN", name: "Amazon", price: "$180.12", change: "-0.3%", up: false, volume: "38.4M" },
];

interface TrendingStocksProps {
  getThreatData: (type: 'danger' | 'warning' | 'safe') => ThreatData;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onMouseMove: (e: React.MouseEvent) => void;
  setPopupData: (data: ThreatData) => void;
}

const TrendingStocks = ({
  getThreatData,
  onMouseEnter,
  onMouseLeave,
  onMouseMove,
  setPopupData,
}: TrendingStocksProps) => {
  const handleStockClick = (stock: Stock) => {
    if (stock.threatType) {
      setPopupData(getThreatData(stock.threatType));
      onMouseEnter();
    }
  };

  return (
    <div className="stock-card p-5">
      <div className="flex items-center gap-2 mb-4">
        <Flame className="w-5 h-5 text-destructive" />
        <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">
          Trending Stocks
        </h3>
      </div>

      <div className="space-y-3">
        {STOCKS.map((stock) => (
          <div key={stock.symbol} className="flex items-center justify-between">
          <SuspiciousLink
            key={stock.symbol}
            text={stock.symbol}
            onMouseEnter={onMouseEnter}
            threatData={stock.threatType ? getThreatData(stock.threatType) : getThreatData('safe')}
            onMouseLeave={onMouseLeave}
            onMouseMove={onMouseMove}
            setPopupData={setPopupData}
          >
          </SuspiciousLink>
          
            <div className="flex-1 ml-3">
              <p className="text-sm font-medium text-foreground">{stock.name}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-mono-numbers text-foreground">{stock.price}</p>
              <p
                className={`text-xs font-mono-numbers flex items-center justify-end ${
                  stock.up ? "text-stock-up" : "text-stock-down"
                }`}
              >
                {stock.up ? (
                  <ArrowUpRight className="w-3 h-3 inline-block mr-0.5" />
                ) : (
                  <ArrowDownRight className="w-3 h-3 inline-block mr-0.5" />
                )}
                {stock.change}
              </p>
            </div>  
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingStocks;
