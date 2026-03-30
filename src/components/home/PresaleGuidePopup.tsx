import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, CheckCircle, Download, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";

const formSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(50),
  email: z.string().trim().email("Please enter a valid email").max(255),
});

type FormData = z.infer<typeof formSchema>;

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
        className="fixed bottom-6 right-6 z-40 bg-primary text-primary-foreground px-4 py-3 rounded-xl shadow-2xl hover:scale-105 transition-transform duration-200 flex items-center gap-2 font-semibold text-sm animate-bounce-subtle"
        aria-label="Download free presale guide"
      >
        <AlertTriangle className="h-4 w-4" />
        Free Guide
      </button>

      <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
        <DialogContent className="sm:max-w-md p-0 gap-0 overflow-hidden border-border/50 bg-background rounded-2xl">
          <DialogTitle className="sr-only">Download Free Presale Guide</DialogTitle>

          {isSuccess ? (
            <div className="p-8 text-center">
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
                <CheckCircle className="h-7 w-7 text-primary" />
              </div>
              <h3 className="font-display text-2xl font-bold text-foreground mb-2">
                Check Your Inbox!
              </h3>
              <p className="text-muted-foreground text-sm mb-5">
                Your guide is on its way.
              </p>
              <Button variant="hero" onClick={handleClose} className="rounded-xl">
                Done
              </Button>
            </div>
          ) : (
            <div className="p-6 sm:p-8">
              {/* Compact header */}
              <div className="mb-5">
                <p className="text-primary font-bold tracking-[0.12em] text-[11px] mb-2 uppercase">
                  Free Guide
                </p>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-foreground leading-tight mb-2">
                  7 Costly Mistakes Presale Buyers Make
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Avoid contract traps, hidden costs & developer red flags — get the checklist before you sign.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-3" autoComplete="on">
                <Input
                  id="guide-firstName"
                  name="firstName"
                  placeholder="First name"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="h-12 text-base"
                  autoComplete="given-name"
                  required
                />

                <Input
                  id="guide-email"
                  name="email"
                  type="email"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="h-12 text-base"
                  autoComplete="email"
                  required
                />

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
                    "Send Me the Guide"
                  )}
                </Button>

                <p className="text-[11px] text-muted-foreground text-center">
                  No spam. Unsubscribe anytime.
                </p>
              </form>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
