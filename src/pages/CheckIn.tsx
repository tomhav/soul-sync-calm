import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import heroCheckin from "@/assets/hero-checkin.jpg";

const CheckIn = () => {
  const navigate = useNavigate();
  const [mood, setMood] = useState(3);
  const [sleepHours, setSleepHours] = useState([7]);
  const [lateNightUse, setLateNightUse] = useState<boolean | null>(null);
  const [pressureToday, setPressureToday] = useState<boolean | null>(null);

  const handleCreatePlan = () => {
    const checkInData = {
      mood,
      sleep_hours: sleepHours[0],
      late_night_use: lateNightUse,
      pressure: pressureToday,
      date: new Date().toISOString().split('T')[0]
    };

    // Log check-in submission
    console.log('quietload.checkin_submit', checkInData);

    // Navigate to plan with data
    navigate('/plan', { state: { checkInData } });
  };

  const handleSkip = () => {
    navigate('/dashboard');
  };

  const moodEmojis = ['😔', '😟', '😐', '😊', '😄'];
  const moodLabels = ['Very Low', 'Low', 'Neutral', 'Good', 'Great'];

  return (
    <div className="min-h-screen flex flex-col px-6 py-8">
      <div className="flex-1 max-w-sm mx-auto w-full space-y-8">
        
        {/* Hero */}
        <div className="text-center space-y-4">
          <div className="flex justify-center mb-6">
            <img 
              src={heroCheckin} 
              alt="Glowing journal with pen"
              className="w-28 h-28 object-cover rounded-full glow-teal aura-pulse"
            />
          </div>
          
          <div className="space-y-2">
            <h1 className="text-2xl font-semibold text-foreground">
              Today's check-in
            </h1>
            <p className="text-muted-foreground">
              A quick moment to reflect
            </p>
          </div>
        </div>

        {/* Mood */}
        <Card className="card-enter card-enter-1">
          <CardContent className="p-6 space-y-4">
            <Label className="text-sm font-medium text-foreground">How's your mood today?</Label>
            <div className="flex justify-between items-center">
              {moodEmojis.map((emoji, index) => (
                <button
                  key={index}
                  onClick={() => setMood(index + 1)}
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl transition-all duration-200 ${
                    mood === index + 1 
                      ? "bg-primary/20 scale-110 ring-2 ring-primary/40" 
                      : "hover:bg-muted/20 hover:scale-105"
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
            <p className="text-center text-sm text-muted-foreground">
              {moodLabels[mood - 1]}
            </p>
          </CardContent>
        </Card>

        {/* Sleep */}
        <Card className="card-enter card-enter-2">
          <CardContent className="p-6 space-y-4">
            <Label className="text-sm font-medium text-foreground">
              How much sleep did you get? ({sleepHours[0]} hours)
            </Label>
            <Slider
              value={sleepHours}
              onValueChange={setSleepHours}
              max={12}
              min={0}
              step={0.5}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>0h</span>
              <span>6h</span>
              <span>12h</span>
            </div>
          </CardContent>
        </Card>

        {/* Late Night Use */}
        <Card className="card-enter card-enter-3">
          <CardContent className="p-6 space-y-4">
            <Label className="text-sm font-medium text-foreground">
              Did you use devices late into the night?
            </Label>
            <div className="flex space-x-3">
              <Button
                variant={lateNightUse === true ? "hero" : "quiet"}
                size="sm"
                onClick={() => setLateNightUse(true)}
                className="flex-1"
              >
                Yes
              </Button>
              <Button
                variant={lateNightUse === false ? "hero" : "quiet"}
                size="sm"
                onClick={() => setLateNightUse(false)}
                className="flex-1"
              >
                No
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Pressure Today */}
        <Card className="card-enter card-enter-4">
          <CardContent className="p-6 space-y-4">
            <Label className="text-sm font-medium text-foreground">
              Feeling pressured or overwhelmed today?
            </Label>
            <div className="flex space-x-3">
              <Button
                variant={pressureToday === true ? "hero" : "quiet"}
                size="sm"
                onClick={() => setPressureToday(true)}
                className="flex-1"
              >
                Yes
              </Button>
              <Button
                variant={pressureToday === false ? "hero" : "quiet"}
                size="sm"
                onClick={() => setPressureToday(false)}
                className="flex-1"
              >
                No
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Actions */}
      <div className="space-y-3 max-w-sm mx-auto w-full">
        <Button 
          variant="hero" 
          size="lg" 
          className="w-full"
          onClick={handleCreatePlan}
          disabled={lateNightUse === null || pressureToday === null}
        >
          Create today's plan
        </Button>
        <Button 
          variant="quiet" 
          size="lg" 
          className="w-full"
          onClick={handleSkip}
        >
          Skip for now
        </Button>
      </div>
    </div>
  );
};

export default CheckIn;