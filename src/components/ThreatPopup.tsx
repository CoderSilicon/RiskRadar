import { forwardRef } from "react";
import { AlertTriangle, Skull, CheckCircle } from "lucide-react";

export interface ThreatData {
  status: string;
  score: string;
  dest: string;
  flag: string;
  isDanger: boolean;
  type: "danger" | "warning" | "safe";
}

interface ThreatPopupProps {
  data: ThreatData;
}

const ThreatPopup = forwardRef<HTMLDivElement, ThreatPopupProps>(
  ({ data }, ref) => {
    const getThemeColors = () => {
      switch (data.type) {
        case "danger":
          return {
            gradient: "bg-cyber-danger",
            text: "text-cyber-danger",
            border: "border-cyber-danger/50",
            bgAccent: "bg-cyber-danger/10",
            icon: <Skull className="w-5 h-5" />,
          };
        case "warning":
          return {
            gradient: "from-cyber-warning via-amber-500 to-orange-600",
            text: "text-cyber-warning",
            border: "border-cyber-warning/50",
            bgAccent: "bg-cyber-warning/10",
            icon: <AlertTriangle className="w-5 h-5" />,
          };
        case "safe":
          return {
            gradient: "from-cyber-safe via-teal-400 to-cyan-500",
            text: "text-cyber-safe",
            border: "border-cyber-safe/50",
            bgAccent: "bg-cyber-safe/10",
            icon: <CheckCircle className="w-5 h-5" />,
          };
      }
    };

    const theme = getThemeColors();

    return (
      <div
        ref={ref}
        style={{ display: "none" }}
        className="fixed top-0 left-0 pointer-events-none opacity-0 z-[100] w-[320px]"
      >
        {/* Minimal styled container */}
        <div
          className={`bg-zinc-950 ${theme.border} border-b border-l border-r cyber-grid relative`}
        >
          {/* Top accent bar with gradient */}
          <div className={`h-1.5 w-full bg-gradient-to-r ${theme.gradient}`} />

          {/* Header */}
          <div className="px-5 pt-4 pb-3 border-b border-zinc-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-cyber uppercase tracking-[0.25em] text-white">
                  Threat Analysis
                </span>
              </div>
              <div className={`${theme.text}`}>{theme.icon}</div>
            </div>
          </div>

          {/* Main content */}
          <div className="p-5 space-y-4">
            {/* Status and Score */}
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground/60 mb-1">
                  Classification
                </p>
                <h3
                  className={`text-lg font-cyber font-bold uppercase tracking-tight ${theme.text}`}
                >
                  {data.status.replace("_", " ")}
                </h3>
              </div>
              <div className="text-right">
                <p className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground/60 mb-1">
                  Risk Score
                </p>
                <p className={`text-2xl font-cyber font-black ${theme.text}`}>
                  {data.score}
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="relative h-[1px]">
              <div
                className={`absolute inset-0 bg-gradient-to-r from-transparent ${theme.text.replace("text-", "via-")}/30 to-transparent`}
              />
            </div>

            {/* Destination */}
            <div>
              <p className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground/60 mb-2">
                Destination URL
              </p>
              <div
                className={` border-white border p-3 font-mono text-[11px] break-all text-white`}
              >
                {data.dest}
              </div>
            </div>

            {/* Flag indicator */}
            <div
              className={`flex items-center gap-3 p-3 `}
            >
              <div
                className={`w-2.5 h-2.5 ${theme.text.replace("text-", "bg-")}`}
              />
              <div>
                <p className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground/50">
                  Detection Flag
                </p>
                <p
                  className={`text-[11px] font-cyber font-bold uppercase tracking-tight ${theme.text}`}
                >
                  {data.flag.replace(/_/g, " ")}
                </p>
              </div>
            </div>
          </div>

          {/* Bottom accent */}
          <div
            className={`h-0.5 w-full bg-gradient-to-r ${theme.gradient} opacity-50`}
          />
        </div>
      </div>
    );
  },
);

ThreatPopup.displayName = "ThreatPopup";

export default ThreatPopup;
