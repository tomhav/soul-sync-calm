import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Splash from "./pages/Splash";
import Consent from "./pages/Consent";
import SignChoice from "./pages/SignChoice";
import EmailSignIn from "./pages/EmailSignIn";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import CheckIn from "./pages/CheckIn";
import Plan from "./pages/Plan";
import Notes from "./pages/Notes";
import History from "./pages/History";
import Settings from "./pages/Settings";
import PrivacyPolicyModal from "./components/PrivacyPolicyModal";
import { useState } from "react";

const queryClient = new QueryClient();

const App = () => {
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Splash onPrivacyClick={() => setShowPrivacyModal(true)} />} />
            <Route path="/consent" element={<Consent />} />
            <Route path="/sign-choice" element={<SignChoice />} />
            <Route path="/sign-in" element={<EmailSignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/check-in" element={<CheckIn />} />
            <Route path="/plan" element={<Plan />} />
            <Route path="/notes" element={<Notes />} />
            <Route path="/history" element={<History />} />
            <Route path="/settings" element={<Settings />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<Splash onPrivacyClick={() => setShowPrivacyModal(true)} />} />
          </Routes>
          <PrivacyPolicyModal 
            open={showPrivacyModal} 
            onOpenChange={setShowPrivacyModal} 
          />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
