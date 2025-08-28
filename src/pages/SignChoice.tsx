import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Smartphone, Mail } from "lucide-react";
import heroSignin from "@/assets/hero-signin.jpg";

const SignChoice = () => {
  const navigate = useNavigate();

  const handleLocalFirst = () => {
    // Navigate directly to dashboard for local-first experience
    navigate('/dashboard');
  };

  const handleSignIn = () => {
    navigate('/sign-in');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-8">
      <div className="w-full max-w-sm mx-auto space-y-8">
        
        {/* Hero */}
        <div className="text-center space-y-4">
          <div className="flex justify-center mb-6">
            <img 
              src={heroSignin} 
              alt="Man breathing with orbiting orbs"
              className="w-32 h-32 object-cover rounded-full glow-teal aura-pulse"
            />
          </div>
        </div>

        {/* Local-first option */}
        <Card className="card-enter card-enter-1">
          <CardContent className="p-6 text-center space-y-4">
            <div className="w-12 h-12 bg-gradient-to-r from-primary-gradient to-primary-gradient-end rounded-full flex items-center justify-center mx-auto glow-teal">
              <Smartphone className="w-6 h-6 text-primary-foreground" />
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-foreground">Continue without account</h3>
              <p className="text-sm text-muted-foreground">
                Keep everything local to your device. No sign-up required.
              </p>
            </div>
            <Button 
              variant="hero" 
              size="lg" 
              className="w-full"
              onClick={handleLocalFirst}
            >
              Start Now
            </Button>
          </CardContent>
        </Card>

        {/* Divider */}
        <div className="flex items-center space-x-4">
          <div className="flex-1 h-px bg-muted/30"></div>
          <span className="text-sm text-muted-foreground">or</span>
          <div className="flex-1 h-px bg-muted/30"></div>
        </div>

        {/* Sign in option */}
        <Card className="card-enter card-enter-2">
          <CardContent className="p-6 text-center space-y-4">
            <div className="w-12 h-12 bg-card border border-secondary/40 rounded-full flex items-center justify-center mx-auto glow-violet">
              <Mail className="w-6 h-6 text-secondary" />
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-foreground">Sign in with Email</h3>
              <p className="text-sm text-muted-foreground">
                Sync across devices and backup your progress.
              </p>
            </div>
            <Button 
              variant="violet" 
              size="lg" 
              className="w-full"
              onClick={handleSignIn}
            >
              Sign In
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SignChoice;