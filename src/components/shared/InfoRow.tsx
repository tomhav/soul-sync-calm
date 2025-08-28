import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";

interface InfoRowProps {
  icon: LucideIcon;
  children: ReactNode;
  className?: string;
  delay?: number;
}

const InfoRow = ({ icon: Icon, children, className = "", delay = 0 }: InfoRowProps) => {
  const animationDelay = delay > 0 ? `card-enter-${delay}` : "card-enter";
  
  return (
    <div className={`flex items-center space-x-3 p-3 rounded-lg bg-card/50 border border-muted/10 ${animationDelay} ${className}`}>
      <Icon className="w-5 h-5 text-primary-gradient flex-shrink-0" />
      <span className="text-sm text-foreground">{children}</span>
    </div>
  );
};

export default InfoRow;