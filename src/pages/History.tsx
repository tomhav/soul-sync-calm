import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LineChart, Line } from "recharts";

interface DailyEntry {
  date: string;
  mood: number;
  sleepHours: number;
  lateNightUse: boolean;
  pressure: boolean;
  actions: string[];
}

const History = () => {
  // This would come from state management
  const [entries] = useState<DailyEntry[]>([
    {
      date: '2024-01-15',
      mood: 4,
      sleepHours: 7.5,
      lateNightUse: false,
      pressure: false,
      actions: ['walk', 'breathe', 'hydrate']
    },
    {
      date: '2024-01-14',
      mood: 3,
      sleepHours: 6,
      lateNightUse: true,
      pressure: true,
      actions: ['breathe', 'hydrate']
    },
    {
      date: '2024-01-13',
      mood: 5,
      sleepHours: 8,
      lateNightUse: false,
      pressure: false,
      actions: ['walk', 'breathe', 'hydrate', 'winddown']
    }
  ]);

  const moodData = entries.slice(-7).map(entry => ({
    date: new Date(entry.date).toLocaleDateString('en', { weekday: 'short' }),
    mood: entry.mood
  }));

  const sleepData = entries.slice(-7).map(entry => ({
    date: new Date(entry.date).toLocaleDateString('en', { weekday: 'short' }),
    sleep: entry.sleepHours
  }));

  const getMoodEmoji = (mood: number) => {
    const emojis = ['😔', '😟', '😐', '😊', '😄'];
    return emojis[mood - 1] || '😐';
  };

  const getActionBadgeVariant = (action: string) => {
    switch (action) {
      case 'walk': return 'default';
      case 'breathe': return 'secondary';
      case 'hydrate': return 'outline';
      case 'winddown': return 'default';
      default: return 'outline';
    }
  };

  if (entries.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 py-8">
        <div className="text-center space-y-4 max-w-sm">
          <div className="w-20 h-20 bg-muted/10 rounded-full flex items-center justify-center mx-auto">
            <BarChart className="w-10 h-10 text-muted-foreground" />
          </div>
          
          <div className="space-y-2">
            <h1 className="text-2xl font-semibold text-foreground">
              No logs yet
            </h1>
            <p className="text-muted-foreground">
              Start with a quick check-in to see your progress here.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background px-6 py-8">
      <div className="max-w-sm mx-auto space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-semibold text-foreground">
            Your past days
          </h1>
          <p className="text-muted-foreground">
            Mood, sleep, and actions at a glance.
          </p>
        </div>

        {/* Mood Chart */}
        <Card className="card-enter card-enter-1">
          <CardContent className="p-4 space-y-3">
            <h3 className="font-medium text-foreground">7-day mood</h3>
            <div className="h-24">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={moodData}>
                  <XAxis 
                    dataKey="date" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                  />
                  <YAxis hide domain={[1, 5]} />
                  <Line 
                    type="monotone" 
                    dataKey="mood" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                    dot={{ fill: 'hsl(var(--primary))', strokeWidth: 0, r: 3 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Sleep Chart */}
        <Card className="card-enter card-enter-2">
          <CardContent className="p-4 space-y-3">
            <h3 className="font-medium text-foreground">Sleep hours</h3>
            <div className="h-24">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={sleepData}>
                  <XAxis 
                    dataKey="date" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                  />
                  <YAxis hide domain={[0, 12]} />
                  <Bar 
                    dataKey="sleep" 
                    fill="hsl(var(--secondary))" 
                    radius={[2, 2, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Daily Entries */}
        <div className="space-y-3">
          {entries.map((entry, index) => (
            <Card key={entry.date} className={`card-enter card-enter-${index + 3}`}>
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="font-medium text-foreground">
                      {new Date(entry.date).toLocaleDateString('en', { 
                        weekday: 'long',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </p>
                    <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                      <span>Mood: {getMoodEmoji(entry.mood)}</span>
                      <span>Sleep: {entry.sleepHours}h</span>
                    </div>
                  </div>
                </div>

                {/* Status indicators */}
                <div className="flex flex-wrap gap-2">
                  {entry.lateNightUse && (
                    <Badge variant="outline" className="text-xs">
                      Late night use
                    </Badge>
                  )}
                  {entry.pressure && (
                    <Badge variant="outline" className="text-xs">
                      Pressure
                    </Badge>
                  )}
                </div>

                {/* Actions */}
                {entry.actions.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {entry.actions.map((action) => (
                      <Badge 
                        key={action} 
                        variant={getActionBadgeVariant(action)}
                        className="text-xs capitalize"
                      >
                        {action}
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default History;