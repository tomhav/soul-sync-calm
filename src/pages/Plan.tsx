import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Play, Pause, Square, Check, Footprints, Wind, Droplets, Moon } from "lucide-react";

interface ActionItem {
  id: string;
  title: string;
  duration: string;
  icon: any;
  type: 'walk' | 'breathe' | 'hydrate' | 'winddown';
  started: boolean;
  completed: boolean;
  startTime?: number;
}

const Plan = () => {
  const location = useLocation();
  const checkInData = location.state?.checkInData;
  const [timer, setTimer] = useState(0);
  const [activeTimer, setActiveTimer] = useState<string | null>(null);
  
  // Determine if user is flagged based on check-in data
  const flaggedToday = checkInData && (
    checkInData.sleep_hours < 6.5 || 
    (checkInData.late_night_use && checkInData.pressure)
  );
  
  const [actions, setActions] = useState<ActionItem[]>(() => {
    const baseActions: ActionItem[] = [
      {
        id: 'walk',
        title: 'Walk',
        duration: '10 min',
        icon: Footprints,
        type: 'walk',
        started: false,
        completed: false
      },
      {
        id: 'breathe',
        title: 'Breathe',
        duration: '3 min',
        icon: Wind,
        type: 'breathe',
        started: false,
        completed: false
      },
      {
        id: 'hydrate',
        title: 'Hydrate',
        duration: 'Mark Done',
        icon: Droplets,
        type: 'hydrate',
        started: false,
        completed: false
      }
    ];

    // Add wind-down if flagged streak >= 2 (simulated for demo)
    const flaggedStreak = 2; // This would come from state management
    if (flaggedStreak >= 2) {
      baseActions.push({
        id: 'winddown',
        title: 'Wind-down',
        duration: 'Schedule 22:30',
        icon: Moon,
        type: 'winddown',
        started: false,
        completed: false
      });
    }

    // Put breathe first if flagged today
    if (flaggedToday) {
      const breatheIndex = baseActions.findIndex(a => a.type === 'breathe');
      if (breatheIndex > 0) {
        const breatheAction = baseActions.splice(breatheIndex, 1)[0];
        baseActions.unshift(breatheAction);
      }
    }

    return baseActions;
  });

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (activeTimer) {
      interval = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [activeTimer]);

  const handleActionStart = (actionId: string) => {
    const action = actions.find(a => a.id === actionId);
    if (!action) return;

    setActions(prev => prev.map(a => 
      a.id === actionId 
        ? { ...a, started: true, startTime: Date.now() }
        : a
    ));

    if (action.type !== 'hydrate' && action.type !== 'winddown') {
      setActiveTimer(actionId);
      setTimer(0);
    }

    // Log action start
    console.log(`quietload.action.${action.type}_start`, {
      actionId,
      timestamp: Date.now()
    });
  };

  const handleActionComplete = (actionId: string) => {
    const action = actions.find(a => a.id === actionId);
    if (!action) return;

    setActions(prev => prev.map(a => 
      a.id === actionId 
        ? { ...a, completed: true }
        : a
    ));

    if (activeTimer === actionId) {
      setActiveTimer(null);
      setTimer(0);
    }

    // Log action complete
    console.log(`quietload.action.${action.type}_complete`, {
      actionId,
      duration: action.startTime ? Date.now() - action.startTime : 0,
      timestamp: Date.now()
    });
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-background px-6 py-8">
      <div className="max-w-sm mx-auto space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-semibold text-foreground">
            Your plan for today
          </h1>
          <p className="text-muted-foreground">
            3 small actions to reset your day
          </p>
        </div>

        {/* Action Cards */}
        <div className="space-y-4">
          {actions.map((action, index) => (
            <Card key={action.id} className={`card-enter card-enter-${index + 1}`}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      action.completed 
                        ? "bg-primary/20 text-primary" 
                        : action.started 
                          ? "bg-secondary/20 text-secondary" 
                          : "bg-muted/10 text-muted-foreground"
                    }`}>
                      <action.icon className="w-6 h-6" />
                    </div>
                    
                    <div className="space-y-1">
                      <h3 className="font-medium text-foreground">{action.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {activeTimer === action.id ? formatTime(timer) : action.duration}
                      </p>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    {action.completed ? (
                      <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                        <Check className="w-5 h-5 text-primary" />
                      </div>
                    ) : action.started ? (
                      <>
                        {activeTimer === action.id && (
                          <Button
                            variant="quiet"
                            size="icon"
                            onClick={() => {
                              setActiveTimer(null);
                              setTimer(0);
                            }}
                          >
                            <Pause className="w-4 h-4" />
                          </Button>
                        )}
                        <Button
                          variant="hero"
                          size="icon"
                          onClick={() => handleActionComplete(action.id)}
                        >
                          <Square className="w-4 h-4" />
                        </Button>
                      </>
                    ) : (
                      <Button
                        variant={action.type === 'hydrate' || action.type === 'winddown' ? "violet" : "hero"}
                        size="icon"
                        onClick={() => 
                          action.type === 'hydrate' || action.type === 'winddown' 
                            ? handleActionComplete(action.id)
                            : handleActionStart(action.id)
                        }
                      >
                        {action.type === 'hydrate' || action.type === 'winddown' ? (
                          <Check className="w-4 h-4" />
                        ) : (
                          <Play className="w-4 h-4" />
                        )}
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Progress */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            {actions.filter(a => a.completed).length} of {actions.length} completed
          </p>
        </div>
      </div>
    </div>
  );
};

export default Plan;