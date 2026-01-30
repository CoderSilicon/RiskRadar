import { PieChart, ShieldCheck,  ArrowUpRight } from "lucide-react";
import { ThreatData } from "./ThreatPopup";
import SuspiciousLink from "./SuspiciousLink";

interface PortfolioWidgetProps {
  threatData: ThreatData;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onMouseMove: (e: React.MouseEvent) => void;
  setPopupData: (data: ThreatData) => void;
}

const PortfolioWidget = ({
  threatData,
  onMouseEnter,
  onMouseLeave,
  onMouseMove,
  setPopupData,
}: PortfolioWidgetProps) => {
  return (
    <div className="space-y-4">
      {/* Portfolio Value */}
      <div className="stock-card p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <PieChart className="w-5 h-5 text-primary" />
            <h3 className="text-sm font-semibold text-foreground">Your Portfolio</h3>
          </div>
          <span className="text-xs text-stock-up font-medium flex items-center gap-0.5">
            <ArrowUpRight className="w-3 h-3" />
            +12.4% MTD
          </span>
        </div>

        <div className="text-center py-6 bg-muted/30 rounded-xl border border-border">
          <p className="text-3xl font-bold font-mono-numbers text-foreground">
            ₹24,86,432<span className="text-primary">.18</span>
          </p>
          <p className="text-xs text-muted-foreground mt-2 font-mono uppercase tracking-wider">
            Total Value • Updated Just Now
          </p>
        </div>

        <button className="w-full mt-4 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground border border-border hover:border-primary/50 rounded-lg transition-all">
          View Full Portfolio
        </button>
      </div>

      {/* Security Notice - Hidden trigger */}
      <div className="stock-card p-5 border-primary/20">
        <div className="flex items-center gap-2 mb-3">
          <ShieldCheck className="w-5 h-5 text-stock-up" />
          <h4 className="text-sm font-semibold text-foreground">Security Notice</h4>
        </div>
        
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
          For enhanced account protection and to comply with new RBI guidelines, please{" "}
          <SuspiciousLink
            text="verify your KYC details"
            threatData={threatData}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onMouseMove={onMouseMove}
            setPopupData={setPopupData}
          />{" "}
          in your account settings. This process takes less than 2 minutes.
        </p>

        <button
          className="w-full py-2.5 text-sm font-semibold bg-muted hover:bg-muted/80 text-foreground rounded-lg transition-all"
          onMouseEnter={() => {
            setPopupData(threatData);
            onMouseEnter();
          }}
          onMouseLeave={onMouseLeave}
          onMouseMove={onMouseMove}
          onClick={(e) => e.preventDefault()}
        >
          Complete Verification
        </button>
      </div>
    </div>
  );
};

export default PortfolioWidget;
