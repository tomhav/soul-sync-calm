import { Button } from "@/components/ui/button";
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
      <div className="min-h-screen flex flex-col items-center justify-center px-6 py-8">
        <div className="w-full max-w-sm mx-auto text-center space-y-6">
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
          
          <Link to="/sign-in">
            <Button variant="hero" size="lg" className="w-full">
              Back to Sign In
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-8">
      <div className="w-full max-w-sm mx-auto space-y-8">
        
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

          <Button 
            type="submit"
            variant="hero" 
            size="lg" 
            className="w-full"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </Button>
        </form>

        {/* Link */}
        <div className="text-center">
          <Link 
            to="/sign-in"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;