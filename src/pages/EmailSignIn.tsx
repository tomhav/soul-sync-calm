import AppShell from "@/components/layout/AppShell";
import TopAppBar from "@/components/layout/TopAppBar";
import PrimaryCTA from "@/components/shared/PrimaryCTA";
import SecondaryLink from "@/components/shared/SecondaryLink";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";

const EmailSignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // This would integrate with Supabase auth
      // For now, simulate sign in
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Log successful sign in
      console.log('quietload.signin_success', { email });
      
      navigate('/dashboard');
      toast.success("Welcome back!");
    } catch (error) {
      toast.error("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppShell
      topBar={<TopAppBar title="Welcome back" />}
    >
      {/* Hero */}
      <div className="text-center space-y-4">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-gradient-to-r from-primary-gradient to-primary-gradient-end rounded-full glow-teal aura-pulse"></div>
        </div>
        
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold text-foreground">
            Welcome back
          </h1>
          <p className="text-muted-foreground">
            Sign in to sync your progress
          </p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSignIn} className="space-y-6">
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
              placeholder="Enter your password"
              required
            />
          </div>
        </div>

        <PrimaryCTA type="submit" loading={loading}>
          {loading ? "Signing in..." : "Sign In"}
        </PrimaryCTA>
      </form>

      {/* Links */}
      <div className="text-center space-y-4">
        <SecondaryLink to="/forgot-password">
          Forgot password?
        </SecondaryLink>
        
        <div className="text-sm">
          <span className="text-muted-foreground">Don't have an account? </span>
          <Link 
            to="/sign-up"
            className="text-primary-gradient hover:underline font-medium"
          >
            Sign up
          </Link>
        </div>
      </div>
    </AppShell>
  );
};

export default EmailSignIn;