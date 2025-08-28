import { Link } from "react-router-dom";
import { ReactNode } from "react";

interface SecondaryLinkProps {
  children: ReactNode;
  to?: string;
  onClick?: () => void;
  className?: string;
}

const SecondaryLink = ({ children, to, onClick, className = "" }: SecondaryLinkProps) => {
  const baseClasses = "text-sm text-muted-foreground hover:text-foreground transition-colors underline decoration-muted-foreground hover:decoration-foreground underline-offset-2";
  
  if (to) {
    return (
      <Link to={to} className={`${baseClasses} ${className}`}>
        {children}
      </Link>
    );
  }
  
  return (
    <button onClick={onClick} className={`${baseClasses} ${className}`}>
      {children}
    </button>
  );
};

export default SecondaryLink;