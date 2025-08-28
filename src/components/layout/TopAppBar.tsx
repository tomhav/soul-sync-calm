import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ReactNode } from "react";

interface TopAppBarProps {
  title: string;
  onBack?: () => void;
  rightSlot?: ReactNode;
  className?: string;
}

const TopAppBar = ({ title, onBack, rightSlot, className = "" }: TopAppBarProps) => {
  const navigate = useNavigate();
  
  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  return (
    <header className={`bg-card/95 backdrop-blur-sm border-b border-muted/10 ${className}`}>
      <div className="flex items-center justify-between px-4 py-3 max-w-sm mx-auto">
        {/* Back Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={handleBack}
          className="p-2 hover:bg-muted/10 text-foreground"
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>
        
        {/* Title */}
        <h1 className="text-lg font-semibold text-foreground text-center flex-1 mx-2 truncate">
          {title}
        </h1>
        
        {/* Right Slot */}
        <div className="w-9 h-9 flex items-center justify-center">
          {rightSlot}
        </div>
      </div>
    </header>
  );
};

export default TopAppBar;