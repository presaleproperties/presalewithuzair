import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, CheckCircle, AlertTriangle, Search, FileText, DollarSign, Building2, FileCheck, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";

const formSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(50),
  email: z.string().trim().email("Please enter a valid email").max(255),
});

type FormData = z.infer<typeof formSchema>;

const guidePoints = [
  { icon: AlertTriangle, text: "Hidden contract clauses that cost buyers $50K+" },
  { icon: Search, text: "Developer red flags most buyers overlook" },
  { icon: FileText, text: "Deposit traps & assignment restriction risks" },
  { icon: DollarSign, text: "GST, PTT & closing costs nobody warns you about" },
  { icon: Building2, text: "Completion delay loopholes developers use" },
  { icon: FileCheck, text: "What the sales centre won't tell you" },
  { icon: Users, text: "Why you need YOUR own agent — not theirs" },
];

export const PresaleGuidePopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    email: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const dismissed = sessionStorage.getItem("presale-guide-dismissed");
    if (dismissed) return;

    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 15000);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem("presale-guide-dismissed", "true");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validation = formSchema.safeParse(formData);
    if (!validation.success) {
      toast({
        title: "Please check your information",
        description: validation.error.errors[0].message,
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const params = new URLSearchParams(window.location.search);
      const { error } = await supabase.functions.invoke("capture-lead", {
        body: {
          firstName: formData.firstName,
          lastName: "",
          email: formData.email,
          phone: "not-provided",
          buyerType: "first-time-buyer",
          leadSource: "presale-guide-popup",
          utmSource: params.get("utm_source"),
          utmMedium: params.get("utm_medium"),
          utmCampaign: params.get("utm_campaign"),
          utmTerm: params.get("utm_term"),
          utmContent: params.get("utm_content"),
          referrer: document.referrer || null,
          landingPage: window.location.pathname,
        },
      });

      if (error) throw new Error(error.message || "Failed to submit");

      setIsSuccess(true);
    } catch (err) {
      console.error("Form submission error:", err);
      toast({
        title: "Something went wrong",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Floating CTA Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-destructive text-destructive-foreground px-5 py-3 rounded-xl shadow-2xl hover:scale-105 transition-transform duration-200 flex items-center gap-2 font-semibold text-sm animate-bounce-subtle"
        aria-label="Download free presale guide"
      >
        <AlertTriangle className="h-4 w-4" />
        Free Presale Guide
      </button>

      <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
        <DialogContent className="sm:max-w-[900px] p-0 gap-0 overflow-hidden border-border/50 bg-background max-h-[90vh] overflow-y-auto">
          <DialogTitle className="sr-only">Download Free Presale Guide</DialogTitle>
          
          {isSuccess ? (
            <div className="p-8 sm:p-12 text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/20 flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-3">
                Check Your Inbox!
              </h3>
              <p className="text-muted-foreground mb-6">
                Your guide is on its way. Keep an eye out for an email from us.
              </p>
              <Button variant="hero" onClick={handleClose} className="rounded-xl">
                Close
              </Button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2">
              {/* Left - Content */}
              <div className="p-6 sm:p-8 bg-[hsl(var(--sidebar-background))] text-white">
                <p className="text-amber-400 font-bold tracking-[0.15em] text-xs mb-3 uppercase">
                  Free Guide
                </p>
                <h3 className="font-display text-xl sm:text-2xl font-bold mb-2 leading-tight">
                  7 Costly Mistakes Presale Buyers Make
                </h3>
                <p className="text-white/70 text-sm mb-6">
                  Most buyers don't find out until it's too late. This guide tells you exactly what to watch for before you sign anything.
                </p>

                <div className="space-y-3">
                  <p className="text-white/50 text-xs font-semibold uppercase tracking-wider">What's inside</p>
                  {guidePoints.map((point, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <point.icon className="h-4 w-4 text-amber-400 mt-0.5 shrink-0" />
                      <span className="text-white/85 text-sm">{point.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right - Form (simplified) */}
              <div className="p-6 sm:p-8 flex flex-col justify-center">
                <h4 className="font-display text-lg font-bold text-foreground mb-1">
                  Get Your Free Copy
                </h4>
                <p className="text-sm text-muted-foreground mb-6">
                  Just your name and email — we'll send it right over.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4" autoComplete="on">
                  <div>
                    <Input
                      id="guide-firstName"
                      name="firstName"
                      placeholder="Your first name"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="h-12 text-base bg-card/50 border-border/50"
                      autoComplete="given-name"
                      required
                    />
                  </div>

                  <div>
                    <Input
                      id="guide-email"
                      name="email"
                      type="email"
                      placeholder="Your email address"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="h-12 text-base bg-card/50 border-border/50"
                      autoComplete="email"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="hero"
                    className="w-full h-12 text-base font-semibold rounded-xl"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        Sending...
                      </>
                    ) : (
                      "Send Me the Guide →"
                    )}
                  </Button>

                  <p className="text-[11px] text-muted-foreground text-center">
                    No spam. Unsubscribe anytime.
                  </p>
                </form>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
