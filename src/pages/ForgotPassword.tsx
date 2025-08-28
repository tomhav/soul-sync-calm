import AppShell from "@/components/layout/AppShell";
import TopAppBar from "@/components/layout/TopAppBar";  
import PrimaryCTA from "@/components/shared/PrimaryCTA";
import SecondaryLink from "@/components/shared/SecondaryLink";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { Key } from "lucide-react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // This would integrate with Supabase auth.resetPasswordForEmail
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSent(true);
      toast.success("Reset link sent to your email");
    } catch (error) {
      toast.error("Error sending reset link");
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <AppShell
        topBar={<TopAppBar title="Check your email" />}
      >
        <div className="text-center space-y-6">
          <div className="w-20 h-20 bg-gradient-to-r from-primary-gradient to-primary-gradient-end rounded-full flex items-center justify-center mx-auto glow-teal">
            <Key className="w-8 h-8 text-primary-foreground" />
          </div>
          
          <div className="space-y-2">
            <h1 className="text-2xl font-semibold text-foreground">
              Check your email
            </h1>
            <p className="text-muted-foreground">
              We've sent password reset instructions to {email}
            </p>
          </div>
          
          <PrimaryCTA onClick={() => {}}>
            <Link to="/sign-in" className="block w-full">
              Back to Sign In
            </Link>
          </PrimaryCTA>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell
      topBar={<TopAppBar title="Reset Password" />}
    >
      {/* Hero */}
      <div className="text-center space-y-4">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-gradient-to-r from-primary-gradient to-primary-gradient-end rounded-full flex items-center justify-center glow-teal aura-pulse">
            <Key className="w-8 h-8 text-primary-foreground" />
          </div>
        </div>
        
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold text-foreground">
            Reset Password
          </h1>
          <p className="text-muted-foreground">
            Enter your email to receive reset instructions
          </p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleResetPassword} className="space-y-6">
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

        <PrimaryCTA type="submit" loading={loading}>
          {loading ? "Sending..." : "Send Reset Link"}
        </PrimaryCTA>
      </form>

      {/* Link */}
      <div className="text-center">
        <SecondaryLink to="/sign-in">
          Back to Sign In
        </SecondaryLink>
      </div>
    </AppShell>
  );
};

export default ForgotPassword;