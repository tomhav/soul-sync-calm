import { Card, CardContent } from "@/components/ui/card";
import { ReactNode } from "react";

interface GlowCardProps {
  children: ReactNode;
  onClick?: () => void;
  illustration?: ReactNode;
  glowType?: "teal" | "violet" | "none";
  className?: string;
  delay?: number;
}

const GlowCard = ({ 
  children, 
  onClick, 
  illustration, 
  glowType = "teal", 
  className = "",
  delay = 0
}: GlowCardProps) => {
  const glowClass = glowType === "teal" ? "glow-teal" : glowType === "violet" ? "glow-violet" : "";
  const animationDelay = delay > 0 ? `card-enter-${delay}` : "card-enter";
  
  return (
    <Card 
      className={`${animationDelay} ${glowClass} cursor-pointer hover:scale-[1.02] transition-all duration-200 border border-muted/20 ${className}`}
      onClick={onClick}
    >
      <CardContent className="p-6">
        {illustration && (
          <div className="flex justify-center mb-4">
            {illustration}
          </div>
        )}
        {children}
      </CardContent>
    </Card>
  );
};

export default GlowCard;