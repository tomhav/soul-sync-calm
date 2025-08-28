import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import heroSplash from "@/assets/hero-splash.jpg";

interface SplashProps {
  onPrivacyClick: () => void;
}

const Splash = ({ onPrivacyClick }: SplashProps) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-8 relative overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-card/20" />
      
      {/* Hero Image */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-sm mx-auto">
        <div className="mb-8 relative">
          <img 
            src={heroSplash} 
            alt="Peaceful meditation silhouette"
            className="w-32 h-32 object-cover rounded-full glow-teal aura-pulse"
          />
        </div>

        {/* Brand */}
        <div className="mb-12 space-y-3">
          <h1 className="text-4xl font-bold text-foreground font-inter">
            Quiet Load
          </h1>
          <p className="text-muted-foreground text-lg">
            Quiet, but not alone.
          </p>
        </div>

        {/* CTA */}
        <div className="w-full space-y-4">
          <Button 
            variant="hero" 
            size="lg" 
            className="w-full"
            onClick={() => navigate('/consent')}
          >
            Get Started
          </Button>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-8 left-0 right-0 text-center z-10">
        <button 
          onClick={onPrivacyClick}
          className="text-muted-foreground hover:text-foreground transition-colors underline text-sm"
        >
          Privacy
        </button>
      </div>
    </div>
  );
};

export default Splash;