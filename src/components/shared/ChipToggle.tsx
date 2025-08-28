import { Button } from "@/components/ui/button";

interface ChipToggleProps {
  value: boolean | null;
  onChange: (value: boolean) => void;
  yesLabel?: string;
  noLabel?: string;
  className?: string;
}

const ChipToggle = ({ 
  value, 
  onChange, 
  yesLabel = "Yes", 
  noLabel = "No", 
  className = "" 
}: ChipToggleProps) => {
  return (
    <div className={`flex space-x-3 ${className}`}>
      <Button
        variant={value === true ? "hero" : "quiet"}
        size="sm"
        onClick={() => onChange(true)}
        className="flex-1"
      >
        {yesLabel}
      </Button>
      <Button
        variant={value === false ? "hero" : "quiet"}
        size="sm"
        onClick={() => onChange(false)}
        className="flex-1"
      >
        {noLabel}
      </Button>
    </div>
  );
};

export default ChipToggle;