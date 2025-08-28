import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  User, 
  Shield, 
  Download, 
  Trash2, 
  FileText, 
  Bell, 
  Moon, 
  Globe, 
  Phone,
  LogOut,
  Cloud
} from "lucide-react";
import { toast } from "sonner";

const Settings = () => {
  const navigate = useNavigate();
  const [isSignedIn] = useState(false); // This would come from auth state
  const [reminders, setReminders] = useState(true);
  const [lateNightDetection, setLateNightDetection] = useState(true);
  const [language, setLanguage] = useState('English');

  const handleSignOut = () => {
    // Handle sign out logic
    toast.success("Signed out successfully");
    navigate('/');
  };

  const handleExportData = () => {
    // Export user data
    toast.success("Data export started");
  };

  const handleDeleteData = () => {
    // Delete user data with confirmation
    if (confirm("Are you sure you want to delete all your data? This cannot be undone.")) {
      toast.success("Data deleted successfully");
      navigate('/');
    }
  };

  const settingSections = [
    {
      title: "Account",
      items: [
        {
          icon: User,
          label: isSignedIn ? "user@example.com" : "Turn on sync",
          description: isSignedIn ? "Manage your account" : "Sign in to sync across devices",
          action: isSignedIn ? undefined : () => navigate('/sign-choice'),
          component: isSignedIn ? (
            <Button variant="quiet" size="sm" onClick={handleSignOut}>
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          ) : (
            <Button variant="hero" size="sm" onClick={() => navigate('/sign-choice')}>
              <Cloud className="w-4 h-4 mr-2" />
              Sign In
            </Button>
          )
        }
      ]
    },
    {
      title: "Privacy & Data",
      items: [
        {
          icon: Download,
          label: "Export Data",
          description: "Download your data",
          action: handleExportData
        },
        {
          icon: Trash2,
          label: "Delete Data",
          description: "Remove all your data",
          action: handleDeleteData,
          destructive: true
        },
        {
          icon: FileText,
          label: "Privacy Policy",
          description: "How we handle your data",
          action: () => {} // This would open privacy modal
        }
      ]
    },
    {
      title: "Preferences",
      items: [
        {
          icon: Bell,
          label: "Reminders",
          description: "Gentle wellness reminders",
          component: (
            <Switch 
              checked={reminders}
              onCheckedChange={setReminders}
            />
          )
        },
        {
          icon: Moon,
          label: "Late-night detection",
          description: "Track device usage patterns",
          component: (
            <Switch 
              checked={lateNightDetection}
              onCheckedChange={setLateNightDetection}
            />
          )
        },
        {
          icon: Globe,
          label: "Language",
          description: language,
          action: () => {
            const newLang = language === 'English' ? 'हिंग्लिश' : 'English';
            setLanguage(newLang);
            toast.success(`Language changed to ${newLang}`);
          }
        }
      ]
    }
  ];

  const helplines = [
    { name: "National Suicide Prevention Lifeline", number: "988" },
    { name: "Crisis Text Line", number: "741741" },
    { name: "SAMHSA National Helpline", number: "1-800-662-4357" }
  ];

  return (
    <div className="min-h-screen bg-background px-6 py-8">
      <div className="max-w-sm mx-auto space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-semibold text-foreground">
            Settings
          </h1>
        </div>

        {/* Settings Sections */}
        {settingSections.map((section, sectionIndex) => (
          <div key={section.title} className="space-y-3">
            <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              {section.title}
            </h2>
            <div className="space-y-2">
              {section.items.map((item, itemIndex) => (
                <Card 
                  key={item.label} 
                  className={`card-enter card-enter-${sectionIndex * 10 + itemIndex + 1} ${
                    item.action ? 'cursor-pointer hover:bg-card/80' : ''
                  }`}
                  onClick={item.action}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          item.destructive 
                            ? 'bg-destructive/10 text-destructive' 
                            : 'bg-muted/10 text-muted-foreground'
                        }`}>
                          <item.icon className="w-5 h-5" />
                        </div>
                        <div className="space-y-1">
                          <p className={`font-medium ${
                            item.destructive ? 'text-destructive' : 'text-foreground'
                          }`}>
                            {item.label}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {item.description}
                          </p>
                        </div>
                      </div>
                      {item.component}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}

        {/* Helplines */}
        <div className="space-y-3">
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            Get Professional Help
          </h2>
          <Card className="card-enter">
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Crisis Helplines</p>
                  <p className="text-sm text-muted-foreground">24/7 support available</p>
                </div>
              </div>
              
              <div className="space-y-2">
                {helplines.map((helpline) => (
                  <div key={helpline.number} className="flex justify-between items-center text-sm">
                    <span className="text-foreground">{helpline.name}</span>
                    <a 
                      href={`tel:${helpline.number}`}
                      className="text-primary font-medium hover:underline"
                    >
                      {helpline.number}
                    </a>
                  </div>
                ))}
              </div>
              
              <p className="text-xs text-muted-foreground mt-3">
                Quiet Load is a wellness tool, not a replacement for professional mental health care.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Settings;