import { useState, useEffect, useRef } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, CheckCircle, Download, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { readFunctionError } from "@/lib/functionError";

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
    const handleOpen = () => setIsOpen(true);
    window.addEventListener("open-presale-guide", handleOpen);
    return () => window.removeEventListener("open-presale-guide", handleOpen);
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

      // Trigger immediate PDF download
      const link = document.createElement("a");
      link.href = "/downloads/The-7-Costly-Mistakes-Presale-Buyers-Make.pdf";
      link.download = "7-Costly-Mistakes-Presale-Buyers-Make.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
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
      <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>

        <DialogContent className="sm:max-w-md p-0 gap-0 overflow-hidden border-border/50 bg-background rounded-2xl max-h-[85vh] overflow-y-auto fixed top-[5vh] sm:top-[50%] translate-y-0 sm:-translate-y-1/2 [&>button]:top-3 [&>button]:right-3">
          <DialogTitle className="sr-only">Download Free Presale Guide</DialogTitle>

          {isSuccess ? (
            <div className="p-8 text-center">
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
                <CheckCircle className="h-7 w-7 text-primary" />
              </div>
              <h3 className="font-display text-2xl font-bold text-foreground mb-2">
                Your Guide Is Ready!
              </h3>
              <p className="text-muted-foreground text-sm mb-5">
                Your download should start automatically. If not, click below.
              </p>
              <a
                href="/downloads/The-7-Costly-Mistakes-Presale-Buyers-Make.pdf"
                download="7-Costly-Mistakes-Presale-Buyers-Make.pdf"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity mb-3"
              >
                <Download className="h-4 w-4" />
                Download Guide
              </a>
              <br />
              <Button variant="ghost" onClick={handleClose} className="rounded-xl text-muted-foreground">
                Close
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
                  onFocus={(e) => setTimeout(() => e.target.scrollIntoView({ behavior: 'smooth', block: 'center' }), 300)}
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
                  onFocus={(e) => setTimeout(() => e.target.scrollIntoView({ behavior: 'smooth', block: 'center' }), 300)}
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
