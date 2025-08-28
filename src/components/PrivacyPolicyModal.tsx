import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface PrivacyPolicyModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PrivacyPolicyModal = ({ open, onOpenChange }: PrivacyPolicyModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm mx-auto max-h-[80vh] bg-card border border-muted/20">
        <DialogHeader className="space-y-3">
          <DialogTitle className="text-xl font-semibold text-foreground">
            Privacy Policy
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            How Quiet Load protects your data
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="max-h-[50vh] pr-4">
          <div className="space-y-4 text-sm text-foreground">
            <section className="space-y-2">
              <h3 className="font-medium">Local-First Approach</h3>
              <p className="text-muted-foreground">
                Quiet Load stores your data locally on your device by default. Your mood logs, 
                sleep data, and personal notes never leave your phone unless you choose to 
                sign up for cloud sync.
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="font-medium">Data Collection</h3>
              <p className="text-muted-foreground">
                We collect only what you provide: mood ratings, sleep hours, and wellness 
                action completions. No location data, contacts, or other personal information 
                is accessed.
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="font-medium">Cloud Sync (Optional)</h3>
              <p className="text-muted-foreground">
                If you choose to create an account, your data is encrypted and stored securely. 
                You can export or delete your data at any time from Settings.
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="font-medium">No Third-Party Sharing</h3>
              <p className="text-muted-foreground">
                We never share, sell, or analyze your personal wellness data. Quiet Load 
                is a private space for your mental health journey.
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="font-medium">Analytics</h3>
              <p className="text-muted-foreground">
                We collect minimal, anonymized usage statistics to improve the app experience. 
                No personal wellness data is included in analytics.
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="font-medium">Your Rights</h3>
              <p className="text-muted-foreground">
                You have full control over your data. Export, delete, or move your information 
                at any time. No questions asked.
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="font-medium">Not Medical Advice</h3>
              <p className="text-muted-foreground">
                Quiet Load is a wellness tool, not a medical device. Always consult 
                professionals for mental health concerns.
              </p>
            </section>
          </div>
        </ScrollArea>

        <div className="flex justify-center pt-4">
          <Button 
            variant="hero" 
            onClick={() => onOpenChange(false)}
            className="rounded-pill"
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PrivacyPolicyModal;