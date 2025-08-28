import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

interface SliderTealProps {
  label: string;
  value: number[];
  onChange: (value: number[]) => void;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  className?: string;
}

const SliderTeal = ({ 
  label, 
  value, 
  onChange, 
  min = 0, 
  max = 12, 
  step = 0.5, 
  unit = "h",
  className = "" 
}: SliderTealProps) => {
  return (
    <div className={`space-y-4 ${className}`}>
      <Label className="text-sm font-medium text-foreground">
        {label} ({value[0]}{unit})
      </Label>
      <Slider
        value={value}
        onValueChange={onChange}
        max={max}
        min={min}
        step={step}
        className="w-full"
      />
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>{min}{unit}</span>
        <span>{Math.floor(max/2)}{unit}</span>
        <span>{max}{unit}</span>
      </div>
    </div>
  );
};

export default SliderTeal;