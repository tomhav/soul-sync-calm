import AppShell from "@/components/layout/AppShell";
import TopAppBar from "@/components/layout/TopAppBar";
import GlowCard from "@/components/shared/GlowCard";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Play, BookOpen, FileEdit, BarChart3, Timer, Home, Target, FileText, Settings as SettingsIcon } from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const [greeting, setGreeting] = useState("");
  const [greetingIcon, setGreetingIcon] = useState("🌅");
  const [inProgressPlan] = useState(false); // This would come from state management
  const [hasHistory] = useState(false); // This would come from state management

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting("Good morning");
      setGreetingIcon("🌅");
    } else if (hour < 17) {
      setGreeting("Good afternoon");
      setGreetingIcon("☀️");
    } else {
      setGreeting("Good evening");
      setGreetingIcon("🌙");
    }
  }, []);

  const dashboardCards = inProgressPlan ? [
    {
      icon: Play,
      title: "Continue session",
      description: "Resume your wellness plan",
      action: () => navigate('/plan'),
      illustration: "man at laptop"
    },
    {
      icon: Timer,
      title: "Focused time",
      description: "Start a 10-minute reset",
      action: () => navigate('/plan'),
      illustration: "stopwatch"
    },
    {
      icon: BarChart3,
      title: "History",
      description: "View your progress",
      action: () => navigate('/history'),
      illustration: "line graph"
    },
    {
      icon: FileEdit,
      title: "Notes",
      description: "Draft a gentle message",
      action: () => navigate('/notes'),
      illustration: "envelope"
    }
  ] : [
    {
      icon: BookOpen,
      title: "Check-in",
      description: "How are you feeling today?",
      action: () => navigate('/check-in'),
      illustration: "runner"
    },
    {
      icon: Target,
      title: "Focused time",
      description: "Start your wellness plan",
      action: () => navigate('/plan'),
      illustration: "stopwatch"
    },
    {
      icon: FileText,
      title: "Notes",
      description: "Draft a message",
      action: () => navigate('/notes'),
      illustration: "envelope"
    },
    {
      icon: BarChart3,
      title: "History",
      description: hasHistory ? "View your logs" : "No logs yet. Start by checking in.",
      action: () => navigate('/history'),
      illustration: "line graph"
    }
  ];

  const tabItems = [
    { icon: Home, label: "Home", path: "/dashboard", active: true },
    { icon: Target, label: "Plan", path: "/plan" },
    { icon: FileText, label: "Notes", path: "/notes" },
    { icon: SettingsIcon, label: "Settings", path: "/settings" }
  ];

  const BottomNav = () => (
    <div className="bg-card/95 backdrop-blur-sm border-t border-muted/20">
      <div className="flex items-center justify-around py-2">
        {tabItems.map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`flex flex-col items-center space-y-1 p-3 rounded-lg transition-colors ${
              item.active 
                ? "text-primary-gradient" 
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span className="text-xs">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <AppShell
      bottomNav={<BottomNav />}
    >
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-2xl font-semibold text-foreground">
              {greeting} {greetingIcon}
            </h1>
            <div className="w-6 h-6 bg-gradient-to-r from-primary-gradient to-primary-gradient-end rounded-full glow-teal aura-pulse"></div>
          </div>
        </div>
      </div>

      {/* Dashboard Cards */}
      <div className="space-y-4">
        {dashboardCards.map((card, index) => (
          <GlowCard 
            key={index} 
            delay={index + 1} 
            onClick={card.action}
            illustration={
              <div className="w-12 h-12 bg-muted/10 rounded-lg flex items-center justify-center">
                <card.icon className="w-6 h-6 text-primary-gradient" />
              </div>
            }
          >
            <div className="flex items-center space-x-4">
              <div className="flex-1 space-y-1">
                <h3 className="font-medium text-foreground">{card.title}</h3>
                <p className="text-sm text-muted-foreground">{card.description}</p>
              </div>
            </div>
          </GlowCard>
        ))}
      </div>
    </AppShell>
  );
};

export default Dashboard;