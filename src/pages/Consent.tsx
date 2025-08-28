import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Shield, Database, Download, Heart } from "lucide-react";
import heroConsent from "@/assets/hero-consent.jpg";

const Consent = () => {
  const navigate = useNavigate();
  const [agreed, setAgreed] = useState(false);
  const [reminders, setReminders] = useState(true);
  const [lateNightDetection, setLateNightDetection] = useState(true);

  const handleContinue = () => {
    if (agreed) {
      // Log consent accept event
      console.log('quietload.consent_accept', { 
        reminders, 
        late_night_detection: lateNightDetection,
        timestamp: Date.now() 
      });
      navigate('/sign-choice');
    }
  };

  const assurances = [
    { icon: Database, text: "Data stored locally on your device" },
    { icon: Download, text: "Export or delete your data anytime" },
    { icon: Heart, text: "Access to helplines always visible" },
    { icon: Shield, text: "Not a diagnostic tool - for wellness only" }
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-8">
      <div className="w-full max-w-sm mx-auto space-y-8">
        
        {/* Hero */}
        <div className="text-center space-y-4">
          <div className="flex justify-center mb-6">
            <img 
              src={heroConsent} 
              alt="Glowing orb with aura"
              className="w-24 h-24 object-cover rounded-full glow-teal aura-pulse"
            />
          </div>
          
          <div className="space-y-2">
            <h1 className="text-2xl font-semibold text-foreground">
              Before we begin
            </h1>
            <p className="text-muted-foreground">
              Your privacy, your choice.
            </p>
          </div>
        </div>

        {/* Assurances */}
        <div className="space-y-4">
          {assurances.map((assurance, index) => (
            <div key={index} className={`flex items-center space-x-3 p-3 rounded-lg bg-card/50 border border-muted/10 card-enter card-enter-${index + 1}`}>
              <assurance.icon className="w-5 h-5 text-primary-gradient flex-shrink-0" />
              <span className="text-sm text-foreground">{assurance.text}</span>
            </div>
          ))}
        </div>

        {/* Agreement Checkbox */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <Checkbox 
              id="agreement" 
              checked={agreed}
              onCheckedChange={(checked) => setAgreed(checked as boolean)}
              className="border-muted-foreground"
            />
            <Label htmlFor="agreement" className="text-sm text-foreground leading-relaxed">
              I understand and agree to these terms
            </Label>
          </div>
        </div>

        {/* Preferences */}
        <div className="space-y-4 p-4 rounded-lg bg-card/30 border border-muted/10">
          <h3 className="text-sm font-medium text-foreground">Preferences</h3>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="reminders" className="text-sm text-muted-foreground">
              Enable gentle reminders
            </Label>
            <Switch 
              id="reminders"
              checked={reminders}
              onCheckedChange={setReminders}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="late-night" className="text-sm text-muted-foreground">
              Detect late-night use
            </Label>
            <Switch 
              id="late-night"
              checked={lateNightDetection}
              onCheckedChange={setLateNightDetection}
            />
          </div>
        </div>

        {/* CTA */}
        <Button 
          variant="hero" 
          size="lg" 
          className="w-full"
          onClick={handleContinue}
          disabled={!agreed}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default Consent;