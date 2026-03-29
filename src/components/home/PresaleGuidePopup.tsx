import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, CheckCircle, AlertTriangle, Search, FileText, DollarSign, Building2, FileCheck, Users, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";

const formSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(50),
  lastName: z.string().trim().min(1, "Last name is required").max(50),
  email: z.string().trim().email("Please enter a valid email").max(255),
  phone: z.string().trim().min(10, "Please enter a valid phone number").max(20),
  buyerType: z.string().min(1, "Please select an option"),
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
    lastName: "",
    email: "",
    phone: "",
    buyerType: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  // Show popup after 15 seconds on the page
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
          ...formData,
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
              <div className="p-6 sm:p-8 bg-[hsl(25_15%_10%)] text-white">
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

              {/* Right - Form */}
              <div className="p-6 sm:p-8">
                <h4 className="font-display text-lg font-bold text-foreground mb-1">
                  Get Your Free Copy
                </h4>
                <p className="text-sm text-muted-foreground mb-5">
                  Enter your details below and we'll send it straight to your inbox.
                </p>

                <form onSubmit={handleSubmit} className="space-y-3" autoComplete="on">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="guide-firstName" className="block text-xs font-medium text-foreground mb-1">First Name *</label>
                      <Input
                        id="guide-firstName"
                        name="firstName"
                        placeholder="First"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        className="h-11 text-sm bg-card/50 border-border/50"
                        autoComplete="given-name"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="guide-lastName" className="block text-xs font-medium text-foreground mb-1">Last Name *</label>
                      <Input
                        id="guide-lastName"
                        name="lastName"
                        placeholder="Last"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        className="h-11 text-sm bg-card/50 border-border/50"
                        autoComplete="family-name"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="guide-email" className="block text-xs font-medium text-foreground mb-1">Email *</label>
                    <Input
                      id="guide-email"
                      name="email"
                      type="email"
                      placeholder="you@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="h-11 text-sm bg-card/50 border-border/50"
                      autoComplete="email"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="guide-phone" className="block text-xs font-medium text-foreground mb-1">Phone *</label>
                    <Input
                      id="guide-phone"
                      name="phone"
                      type="tel"
                      placeholder="(604) 555-1234"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="h-11 text-sm bg-card/50 border-border/50"
                      autoComplete="tel"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="guide-buyerType" className="block text-xs font-medium text-foreground mb-1">I am a... *</label>
                    <Select value={formData.buyerType} onValueChange={(v) => setFormData({ ...formData, buyerType: v })}>
                      <SelectTrigger className="h-11 text-sm bg-card/50 border-border/50">
                        <SelectValue placeholder="Select one" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="first-time-buyer">First-Time Buyer</SelectItem>
                        <SelectItem value="investor">Investor</SelectItem>
                        <SelectItem value="upsizer">Upsizer / Downsizer</SelectItem>
                        <SelectItem value="assignment-buyer">Assignment Buyer</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button
                    type="submit"
                    variant="hero"
                    className="w-full h-12 text-sm font-semibold rounded-xl mt-2"
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

                  <p className="text-[11px] text-muted-foreground text-center mt-2">
                    By submitting, you agree to receive communications from us. We respect your privacy.
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
