import AppShell from "@/components/layout/AppShell";
import PrimaryCTA from "@/components/shared/PrimaryCTA";
import SecondaryLink from "@/components/shared/SecondaryLink";
import { useNavigate } from "react-router-dom";
import heroSplash from "@/assets/hero-splash.jpg";

interface SplashProps {
  onPrivacyClick: () => void;
}

const Splash = ({ onPrivacyClick }: SplashProps) => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/consent');
  };

  return (
    <AppShell>
      {/* Hero Section */}
      <div className="text-center space-y-6 flex-1 flex flex-col justify-center">
        <div className="flex justify-center mb-8">
          <img 
            src={heroSplash} 
            alt="Man with headphones in peaceful pose"
            className="w-32 h-32 object-cover rounded-full glow-teal aura-pulse"
          />
        </div>
        
        <div className="space-y-3">
          <h1 className="text-2xl font-bold text-foreground">
            Quiet Load
          </h1>
          <p className="text-muted-foreground">
            Quiet, but not alone.
          </p>
        </div>
      </div>

      {/* CTA Section */}
      <div className="space-y-4">
        <PrimaryCTA onClick={handleGetStarted}>
          Get Started
        </PrimaryCTA>
        
        <div className="text-center">
          <SecondaryLink onClick={onPrivacyClick}>
            Privacy
          </SecondaryLink>
        </div>
      </div>
    </AppShell>
  );
};

export default Splash;