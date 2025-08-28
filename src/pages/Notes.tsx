import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Mail, MessageSquare, Phone } from "lucide-react";
import { toast } from "sonner";

interface NoteTemplate {
  id: string;
  title: string;
  content: string;
  editable: boolean;
}

const Notes = () => {
  const [templates, setTemplates] = useState<NoteTemplate[]>([
    {
      id: 'eta',
      title: 'Move ETA',
      content: "Hi, I'm running a bit behind schedule. My new ETA is [TIME]. Thanks for understanding.",
      editable: false
    },
    {
      id: 'boundary',
      title: 'Boundary script',
      content: "I appreciate you thinking of me. I'm not available for [TASK/EVENT] right now, but I can help with [ALTERNATIVE] instead.",
      editable: false
    },
    {
      id: 'review',
      title: 'Swap review slot',
      content: "Could we reschedule our meeting for [NEW TIME]? I'd like to be more present for our discussion.",
      editable: false
    },
    {
      id: 'ptm',
      title: 'PTM nudge',
      content: "Just a gentle reminder about [TOPIC]. When you have a moment, I'd appreciate your thoughts.",
      editable: false
    }
  ]);

  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [editedContent, setEditedContent] = useState('');

  const handleTemplateSelect = (template: NoteTemplate) => {
    setSelectedTemplate(template.id);
    setEditedContent(template.content);
  };

  const handleSendNote = (channel: 'slack' | 'email' | 'whatsapp') => {
    if (!selectedTemplate || !editedContent.trim()) return;

    // Log note sent
    console.log(`quietload.note_sent.${channel}`, {
      templateId: selectedTemplate,
      content: editedContent,
      timestamp: Date.now()
    });

    const channelNames = {
      slack: 'Slack',
      email: 'Email',
      whatsapp: 'WhatsApp'
    };

    // In a real app, this would open the respective app with the message
    toast.success(`Message copied for ${channelNames[channel]}`);
    
    // Copy to clipboard
    navigator.clipboard.writeText(editedContent);
  };

  const channels = [
    { id: 'slack' as const, name: 'Slack', icon: MessageSquare },
    { id: 'email' as const, name: 'Email', icon: Mail },
    { id: 'whatsapp' as const, name: 'WhatsApp', icon: Phone }
  ];

  return (
    <div className="min-h-screen bg-background px-6 py-8">
      <div className="max-w-sm mx-auto space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-gradient-to-r from-primary-gradient to-primary-gradient-end rounded-full flex items-center justify-center mx-auto glow-teal aura-pulse">
            <Mail className="w-8 h-8 text-primary-foreground" />
          </div>
          
          <div className="space-y-2">
            <h1 className="text-2xl font-semibold text-foreground">
              One-tap notes
            </h1>
            <p className="text-muted-foreground">
              Respectful, editable, no oversharing.
            </p>
          </div>
        </div>

        {/* Template Cards */}
        <div className="space-y-3">
          {templates.map((template, index) => (
            <Card 
              key={template.id} 
              className={`card-enter card-enter-${index + 1} cursor-pointer transition-all duration-200 ${
                selectedTemplate === template.id ? 'ring-2 ring-primary/40 bg-primary/5' : 'hover:bg-card/80'
              }`}
              onClick={() => handleTemplateSelect(template)}
            >
              <CardContent className="p-4">
                <div className="space-y-2">
                  <h3 className="font-medium text-foreground">{template.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {template.content}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Edit Area */}
        {selectedTemplate && (
          <Card className="card-enter">
            <CardContent className="p-4 space-y-4">
              <h3 className="font-medium text-foreground">Edit your message</h3>
              <Textarea
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                className="min-h-[100px] bg-input border-muted/30 focus:border-primary/50 text-foreground resize-none"
                placeholder="Type your message..."
              />
              
              {/* Channel Buttons */}
              <div className="grid grid-cols-3 gap-2">
                {channels.map((channel) => (
                  <Button
                    key={channel.id}
                    variant="quiet"
                    size="sm"
                    onClick={() => handleSendNote(channel.id)}
                    className="flex flex-col items-center space-y-1 h-auto p-3"
                  >
                    <channel.icon className="w-4 h-4" />
                    <span className="text-xs">{channel.name}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {!selectedTemplate && (
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Select a template to get started
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notes;