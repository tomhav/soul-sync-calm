import AppShell from "@/components/layout/AppShell";
import TopAppBar from "@/components/layout/TopAppBar";
import PrimaryCTA from "@/components/shared/PrimaryCTA";
import SecondaryLink from "@/components/shared/SecondaryLink";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";

const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }
    
    setLoading(true);
    
    try {
      // This would integrate with Supabase auth
      // For now, simulate sign up
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      navigate('/dashboard');
      toast.success("Account created successfully!");
    } catch (error) {
      toast.error("Error creating account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppShell
      topBar={<TopAppBar title="Create Account" />}
    >
      {/* Hero */}
      <div className="text-center space-y-4">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-gradient-to-r from-primary-gradient to-primary-gradient-end rounded-full glow-teal aura-pulse"></div>
        </div>
        
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold text-foreground">
            Create Account
          </h1>
          <p className="text-muted-foreground">
            Join your wellness journey
          </p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSignUp} className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-foreground">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-input border-muted/30 focus:border-primary/50 text-foreground"
              placeholder="Enter your email"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium text-foreground">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-input border-muted/30 focus:border-primary/50 text-foreground"
              placeholder="Create a password"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-sm font-medium text-foreground">
              Confirm Password
            </Label>
            <Input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="bg-input border-muted/30 focus:border-primary/50 text-foreground"
              placeholder="Confirm your password"
              required
            />
          </div>
        </div>

        <PrimaryCTA type="submit" loading={loading}>
          {loading ? "Creating Account..." : "Create Account"}
        </PrimaryCTA>
      </form>

      {/* Link */}
      <div className="text-center">
        <div className="text-sm">
          <span className="text-muted-foreground">Already have an account? </span>
          <Link 
            to="/sign-in"
            className="text-primary-gradient hover:underline font-medium"
          >
            Sign in
          </Link>
        </div>
      </div>
    </AppShell>
  );
};

export default SignUp;