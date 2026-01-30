import { Clock, TrendingUp, ExternalLink } from "lucide-react";
import { ThreatData } from "./ThreatPopup";
import SuspiciousLink from "./SuspiciousLink";

interface NewsCardProps {
  title: string;
  excerpt: string;
  time: string;
  category: string;
  suspiciousLink?: {
    text: string;
    threatData: ThreatData;
  };
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onMouseMove: (e: React.MouseEvent) => void;
  setPopupData: (data: ThreatData) => void;
}

const NewsCard = ({
  title,
  excerpt,
  time,
  category,
  suspiciousLink,
  onMouseEnter,
  onMouseLeave,
  onMouseMove,
  setPopupData,
}: NewsCardProps) => {
  return (
    <article className="stock-card p-5 group">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1 px-2 py-0.5  text-primary text-xs font-medium">
              <TrendingUp className="w-3 h-3" />
              {category}
            </span>
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="w-3 h-3" />
              {time}
            </span>
          </div>
          
          <h3 className="text-base font-semibold text-foreground mb-2 line-clamp-2 transition-colors">
            {title}
          </h3>
          
          <p className="text-sm text-muted-foreground leading-relaxed">
            {excerpt}
            {suspiciousLink && (
              <>
                {" "}
                <SuspiciousLink
                  text={suspiciousLink.text}
                  threatData={suspiciousLink.threatData}
                  onMouseEnter={onMouseEnter}
                  onMouseLeave={onMouseLeave}
                  onMouseMove={onMouseMove}
                  setPopupData={setPopupData}
                />
              </>
            )}
          </p>
        </div>
        
        <button className="flex-shrink-0 p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-colors opacity-0 group-hover:opacity-100">
          <ExternalLink className="w-4 h-4" />
        </button>
      </div>
    </article>
  );
};

export default NewsCard;
