import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

interface PrimaryCTAProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
  size?: "sm" | "default" | "lg";
}

const PrimaryCTA = ({ 
  children, 
  onClick, 
  disabled, 
  loading, 
  className = "",
  type = "button",
  size = "lg"
}: PrimaryCTAProps) => {
  return (
    <Button
      type={type}
      variant="hero"
      size={size}
      onClick={onClick}
      disabled={disabled || loading}
      className={`w-full rounded-pill transition-transform duration-[180ms] active:scale-105 ${className}`}
    >
      {loading ? "Loading..." : children}
    </Button>
  );
};

export default PrimaryCTA;