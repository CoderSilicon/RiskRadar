import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { FileText, Newspaper } from "lucide-react";

import StockHeader from "@/components/StockHeader";
import MarketOverview from "@/components/MarketOverview";
import TrendingStocks from "@/components/TrendingStocks";
import PortfolioWidget from "@/components/PortfolioWidget";
import NewsCard from "@/components/NewsCard";
import TickerTape from "@/components/TickerTape";
import ThreatPopup, { ThreatData } from "@/components/ThreatPopup";
import SuspiciousLink from "@/components/SuspiciousLink";

gsap.registerPlugin(useGSAP);

// Threat data configurations
const THREAT_DATA: Record<'danger' | 'warning' | 'safe', ThreatData> = {
  danger: {
    status: "CRITICAL_THREAT",
    score: "98%",
    dest: "https://global-refund-portal.support/auth",
    flag: "MALICIOUS_REDIRECT",
    isDanger: true,
    type: 'danger',
  },
  warning: {
    status: "SUSPICIOUS_ACTIVITY",
    score: "65%",
    dest: "https://instant-verify-portal.io/auth",
    flag: "UNUSUAL_PATTERN",
    isDanger: true,
    type: 'warning',
  },
  safe: {
    status: "VERIFIED_SAFE",
    score: "12%",
    dest: "https://titan-index.com/dashboard",
    flag: "NO_ISSUES_DETECTED",
    isDanger: false,
    type: 'safe',
  },
};

// News articles with hidden suspicious links
const NEWS_ARTICLES = [
  {
    title: "Nifty 50 Surges Past 24,800 Mark Amid Strong FII Inflows",
    excerpt: "The benchmark index gained 0.45% in today's session, led by strong performance in IT and banking sectors. Foreign institutional investors have been net buyers for the fifth consecutive session. Analysts recommend investors to",
    time: "2 hours ago",
    category: "Market Update",
    suspiciousLink: { text: "review their portfolio allocation", threatData: THREAT_DATA.danger },
  },
  {
    title: "RBI Monetary Policy: Key Takeaways for Stock Market Investors",
    excerpt: "The Reserve Bank of India maintained its repo rate at 6.5% for the eighth consecutive meeting. This decision was widely expected by market participants. To optimize your investment strategy,",
    time: "4 hours ago",
    category: "Policy",
    suspiciousLink: { text: "update your investment preferences", threatData: THREAT_DATA.warning },
  },
  {
    title: "Tech Stocks Rally: NVIDIA and Microsoft Lead Global Markets",
    excerpt: "Technology stocks continued their upward trajectory as AI-related companies posted strong quarterly results. The sector has gained over 25% year-to-date, outperforming all other major indices.",
    time: "6 hours ago",
    category: "Global",
  },
  {
    title: "IPO Update: Three New Listings Expected Next Week",
    excerpt: "The primary market remains active with three companies set to launch their initial public offerings. Retail investors can access exclusive early allocation by completing their",
    time: "8 hours ago",
    category: "IPO",
    suspiciousLink: { text: "account verification process", threatData: THREAT_DATA.danger },
  },
];

const Index = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const popupRef = useRef<HTMLDivElement | null>(null);
  const xSetter = useRef<ReturnType<typeof gsap.quickSetter> | null>(null);
  const ySetter = useRef<ReturnType<typeof gsap.quickSetter> | null>(null);
  
  const [popupData, setPopupData] = useState<ThreatData>(THREAT_DATA.danger);

  const { contextSafe } = useGSAP({ scope: containerRef });

  useEffect(() => {
    if (popupRef.current) {
      xSetter.current = gsap.quickSetter(popupRef.current, "x", "px");
      ySetter.current = gsap.quickSetter(popupRef.current, "y", "px");
    }
  }, []);

  const handleMouseMove = contextSafe((e: React.MouseEvent) => {
    if (!xSetter.current || !ySetter.current) return;
    const offset = 20;
    xSetter.current(e.clientX + offset);
    ySetter.current(e.clientY + offset);
  });

  const handleMouseLeave = contextSafe(() => {
    const popup = popupRef.current;
    if (!popup) return;
    gsap.to(popup, {
      opacity: 0,
      scale: 0.9,
      duration: 0.2,
      ease: "power2.inOut",
      onComplete: () => { popup.style.display = "none"; },
    });
  });

  const handleMouseEnter = contextSafe(() => {
    const popup = popupRef.current;
    if (!popup) return;

    gsap.set(popup, { 
      display: "block",
    });
    
    gsap.to(popup, {
      opacity: 1,
      scale: 1,
      duration: 0.3,
      ease: "back.out(1.2)",
    });
  });

  const getThreatData = (type: 'danger' | 'warning' | 'safe') => THREAT_DATA[type];

  const handleTickerHover = (type: 'danger' | 'warning' | 'safe') => {
    setPopupData(THREAT_DATA[type]);
    handleMouseEnter();
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-background text-foreground">
      {/* Cyberpunk Threat Popup - completely different theme */}
      <ThreatPopup ref={popupRef} data={popupData} />

      {/* Professional Stock Header */}
      <StockHeader />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 pb-20">
        {/* Market Overview */}
        <MarketOverview />

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Content - News & Analysis */}
          <div className="lg:col-span-8 space-y-6">
            {/* Market Analysis Section */}
            <section className=" p-6">
              <div className="flex items-center gap-2 mb-4">
                <FileText className="w-5 h-5 text-primary" />
                <h2 className="text-sm font-semibold text-foreground uppercase tracking-wide">
                  Market Analysis
                </h2>
              </div>

              <div className="prose prose-sm prose-invert max-w-none space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  The Indian equity markets opened on a positive note today, with the Nifty 50 index 
                  climbing above the 24,800 mark for the first time in three weeks. Strong buying interest 
                  was observed across IT, banking, and pharmaceutical sectors, driven by robust quarterly 
                  earnings and positive global cues.
                </p>
                
                <p className="text-muted-foreground leading-relaxed">
                  Foreign institutional investors (FIIs) have maintained their bullish stance, 
                  pouring ₹4,250 crore into Indian equities over the past week. This sustained 
                  inflow has provided a solid floor for the markets. For real-time FII data and 
                  personalized alerts, investors can{" "}
                  <SuspiciousLink
                    text="sync their trading account"
                    threatData={THREAT_DATA.danger}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onMouseMove={handleMouseMove}
                    setPopupData={setPopupData}
                  />{" "}
                  with our institutional-grade analytics platform.
                </p>

                <p className="text-muted-foreground leading-relaxed">
                  Technical indicators suggest the Nifty 50 could test the 25,000 level in the 
                  coming sessions if the current momentum sustains. The RSI on the daily chart 
                  stands at 62, indicating room for further upside. Traders looking to capitalize 
                  on this momentum can{" "}
                  <SuspiciousLink
                    text="activate premium signals"
                    threatData={THREAT_DATA.warning}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onMouseMove={handleMouseMove}
                    setPopupData={setPopupData}
                  />{" "}
                  for priority access to buy/sell recommendations.
                </p>

                <p className="text-muted-foreground leading-relaxed">
                  In the broader markets, mid-cap and small-cap indices outperformed their 
                  large-cap counterparts, gaining 0.8% and 1.2% respectively. The Nifty Bank 
                  index witnessed profit booking near the 51,200 level but found support at 
                  51,000. Sector rotation continues to favor quality stocks with strong earnings 
                  visibility.
                </p>

                <p className="text-muted-foreground leading-relaxed">
                  Looking ahead, market participants will closely monitor the upcoming US Fed 
                  meeting minutes and domestic inflation data. Any hawkish commentary from the 
                  Fed could lead to near-term volatility. To stay updated with breaking market 
                  news and alerts, ensure your{" "}
                  <SuspiciousLink
                    text="notification preferences are updated"
                    threatData={THREAT_DATA.danger}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onMouseMove={handleMouseMove}
                    setPopupData={setPopupData}
                  />
                  {" "}in your account settings.
                </p>
              </div>
            </section>

            {/* News Section */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <Newspaper className="w-5 h-5 text-primary" />
                <h2 className="text-sm font-semibold text-foreground uppercase tracking-wide">
                  Latest News
                </h2>
              </div>

              <div className="space-y-3">
                {NEWS_ARTICLES.map((article, i) => (
                  <NewsCard
                    key={i}
                    {...article}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onMouseMove={handleMouseMove}
                    setPopupData={setPopupData}
                  />
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <TrendingStocks
              getThreatData={getThreatData}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onMouseMove={handleMouseMove}
              setPopupData={setPopupData}
            />

            <PortfolioWidget
              threatData={THREAT_DATA.danger}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onMouseMove={handleMouseMove}
              setPopupData={setPopupData}
            />
          </div>
        </div>
      </main>

      {/* Live Ticker Tape */}
      <TickerTape
        onHover={handleTickerHover}
        onLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
      />
    </div>
  );
};

export default Index;
