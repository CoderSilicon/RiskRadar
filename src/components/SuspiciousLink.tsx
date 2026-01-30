import { ThreatData } from "./ThreatPopup";

interface SuspiciousLinkProps {
  text: string;
  threatData: ThreatData;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onMouseMove: (e: React.MouseEvent) => void;
  setPopupData: (data: ThreatData) => void;
  children?: React.ReactNode; // Add this line
}

const SuspiciousLink = ({
  text,
  threatData,
  onMouseEnter,
  onMouseLeave,
  onMouseMove,
  setPopupData,
  children, // Add this line
}: SuspiciousLinkProps) => {
  return (
    <a
      href="#"
      className="text-primary hover:text-primary/80 underline underline-offset-2 decoration-primary/40 hover:decoration-primary/80 transition-colors"
      onClick={(e) => e.preventDefault()}
      onMouseEnter={() => {
        setPopupData(threatData);
        onMouseEnter();
      }}
      onMouseLeave={onMouseLeave}
      onMouseMove={onMouseMove}
    >
      {text}
      {children} {/* Add this line to render children */}
    </a>
  );
};

export default SuspiciousLink;
