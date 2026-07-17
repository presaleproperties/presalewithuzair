import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { readFunctionError } from "@/lib/functionError";

const formSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(60),
  lastName: z.string().trim().min(1, "Last name is required").max(60),
  email: z.string().trim().email("Please enter a valid email").max(255),
  phone: z.string().trim().min(10, "Please enter a valid phone number").max(20),
  buyerType: z.string().min(1, "Please select an option"),
  budget: z.string().min(1, "Please select a budget range"),
  timeline: z.string().min(1, "Please select your timeline"),
  leadSource: z.string().min(1, "Please let us know how you found us"),
});


type FormData = z.infer<typeof formSchema>;

const budgetOptions = [
  { value: "under-500k", label: "Under $500K" },
  { value: "500k-750k", label: "$500K – $750K" },
  { value: "750k-1m", label: "$750K – $1M" },
  { value: "1m-1.5m", label: "$1M – $1.5M" },
  { value: "over-1.5m", label: "Over $1.5M" },
  { value: "not-sure", label: "Not sure yet" },
];

const timelineOptions = [
  { value: "asap", label: "ASAP / ready now" },
  { value: "1-3-months", label: "1–3 months" },
  { value: "3-6-months", label: "3–6 months" },
  { value: "6-12-months", label: "6–12 months" },
  { value: "just-researching", label: "Just researching" },
];

const leadSources = [
  { value: "instagram", label: "Instagram" },
  { value: "tiktok", label: "TikTok" },
  { value: "youtube", label: "YouTube" },
  { value: "referral", label: "Referral / Friend" },
  { value: "google", label: "Google Search" },
  { value: "other", label: "Other" },
];

const getTrackingData = () => {
  const params = new URLSearchParams(window.location.search);
  return {
    utmSource: params.get("utm_source"),
    utmMedium: params.get("utm_medium"),
    utmCampaign: params.get("utm_campaign"),
    utmTerm: params.get("utm_term"),
    utmContent: params.get("utm_content"),
    referrer: document.referrer || null,
    landingPage: window.location.pathname,
  };
};

interface UnifiedLeadFormProps {
  /** Heading above the form */
  heading?: string;
  /** Subheading / description */
  subheading?: string;
  /** Eyebrow label */
  eyebrow?: string;
  /** Submit button text */
  buttonText?: string;
  /** Visual variant */
  variant?: "default" | "card" | "inline" | "dark";
  /** Show trust indicators below the button */
  showTrust?: boolean;
  /** Pre-select buyer type */
  defaultBuyerType?: string;
  /** Class name override for wrapper */
  className?: string;
  /** Render select fields in two columns on sm+ */
  twoColumn?: boolean;
}

export const UnifiedLeadForm = ({
  heading = "Get Clear Guidance Before You Buy",
  subheading = "Independent, buyer-first advice. A quick conversation to understand your goals.",
  eyebrow = "START HERE",
  buttonText = "Let's Chat",
  variant = "default",
  showTrust = true,
  defaultBuyerType = "",
  className = "",
  twoColumn = false,
}: UnifiedLeadFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    buyerType: defaultBuyerType,
    budget: "",
    timeline: "",
    leadSource: "",
  });

  const [trackingData, setTrackingData] = useState(getTrackingData());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const { toast } = useToast();

  useEffect(() => {
    setTrackingData(getTrackingData());

    const checkHash = () => {
      const hash = window.location.hash;
      if (hash === "#lead-form-first-time-buyer") {
        setFormData((prev) => ({ ...prev, buyerType: "first-time-buyer" }));
      } else if (hash === "#lead-form-investor") {
        setFormData((prev) => ({ ...prev, buyerType: "investor" }));
      }
    };
    checkHash();
    window.addEventListener("hashchange", checkHash);
    return () => window.removeEventListener("hashchange", checkHash);
  }, []);

  const updateField = <K extends keyof FormData>(key: K, value: FormData[K]) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    if (fieldErrors[key]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
  };

  const scrollFieldIntoView = (e: React.FocusEvent<HTMLElement>) => {
    // Mobile keyboards cover inputs — nudge them into view after the keyboard opens.
    if (typeof window === "undefined" || window.innerWidth >= 768) return;
    const el = e.currentTarget;
    window.setTimeout(() => {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 300);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validation = formSchema.safeParse(formData);
    if (!validation.success) {
      const errors: Partial<Record<keyof FormData, string>> = {};
      for (const issue of validation.error.errors) {
        const key = issue.path[0] as keyof FormData;
        if (key && !errors[key]) errors[key] = issue.message;
      }
      setFieldErrors(errors);
      // Focus the first invalid field so mobile users see what's wrong.
      const firstKey = Object.keys(errors)[0];
      if (firstKey) {
        const el = document.getElementById(`ulc-${firstKey}`) as HTMLElement | null;
        el?.focus?.();
        el?.scrollIntoView?.({ behavior: "smooth", block: "center" });
      }
      toast({
        title: "Please check your information",
        description: validation.error.errors[0].message,
        variant: "destructive",
      });
      return;
    }

    setFieldErrors({});
    setIsSubmitting(true);

    try {
      const { error } = await supabase.functions.invoke("capture-lead", {
        body: {
          firstName: formData.fullName.split(" ")[0] || formData.fullName,
          lastName: formData.fullName.split(" ").slice(1).join(" ") || "",
          email: formData.email,
          phone: formData.phone,
          buyerType: formData.buyerType,
          budget: formData.budget,
          timeline: formData.timeline,
          leadSource: formData.leadSource,
          ...trackingData,
        },
      });

      if (error) {
        const msg = await readFunctionError(error);
        throw new Error(msg);
      }

      // GA4 conversion event
      try {
        (window as any).gtag?.("event", "generate_lead", {
          landing_page: trackingData.landingPage,
          buyer_type: formData.buyerType,
          budget: formData.budget,
          timeline: formData.timeline,
          lead_source: formData.leadSource,
        });
      } catch {}

      setIsSuccess(true);
      toast({
        title: "Thanks for reaching out!",
        description: "We'll be in touch soon.",
      });
    } catch (err) {
      console.error("Form submission error:", err);
      toast({
        title: "Something went wrong",
        description: err instanceof Error ? err.message : "Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => {
        setIsSuccess(false);
        setFormData({ fullName: "", email: "", phone: "", buyerType: defaultBuyerType, budget: "", timeline: "", leadSource: "" });
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess, defaultBuyerType]);

  if (isSuccess) {
    return (
      <div className={`text-center py-12 ${className}`}>
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/20 flex items-center justify-center">
          <CheckCircle className="h-8 w-8 text-primary" />
        </div>
        <h3 className="font-display text-2xl font-bold text-foreground mb-2">All Set!</h3>
        <p className="text-muted-foreground">You will hear from us soon.</p>
      </div>
    );
  }

  const isDark = variant === "dark";
  const isCard = variant === "card";

  const wrapperClasses = isCard
    ? `bg-card/60 backdrop-blur-sm rounded-2xl border border-border shadow-sm p-5 sm:p-8 lg:p-9 ${className}`
    : className;

  const inputClasses = isDark
    ? "h-12 text-base bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-primary touch-manipulation"
    : "h-12 text-base bg-background border-border/60 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all touch-manipulation";

  const labelClasses = isDark
    ? "block text-xs sm:text-sm font-medium text-white/90 mb-1"
    : "block text-xs sm:text-sm font-medium text-foreground mb-1";

  return (
    <div className={wrapperClasses}>
      {eyebrow && (
        <p className={`font-bold tracking-[0.15em] text-xs sm:text-sm mb-3 ${isDark ? "text-primary" : "text-primary"}`}>
          {eyebrow}
        </p>
      )}
      {heading && (
        <h2 className={`font-display text-2xl sm:text-3xl font-bold tracking-tight mb-3 ${isDark ? "text-white" : "text-foreground"}`}>
          {heading}
        </h2>
      )}
      {subheading && (
        <p className={`text-sm sm:text-base mb-6 ${isDark ? "text-white/70" : "text-muted-foreground"}`}>
          {subheading}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4" autoComplete="on">
        <div className={twoColumn ? "grid grid-cols-1 sm:grid-cols-2 gap-4" : "space-y-4"}>
        <div className={twoColumn ? "sm:col-span-2" : ""}>
          <label htmlFor="ulc-fullName" className={labelClasses}>Full Name *</label>
          <Input
            id="ulc-fullName"
            name="name"
            type="text"
            placeholder="Your full name"
            value={formData.fullName}
            onChange={(e) => updateField("fullName", e.target.value)}
            onFocus={scrollFieldIntoView}
            className={`${inputClasses} ${fieldErrors.fullName ? "border-destructive focus:border-destructive focus:ring-destructive/20" : ""}`}
            autoComplete="name"
            aria-invalid={!!fieldErrors.fullName}
            aria-describedby={fieldErrors.fullName ? "ulc-fullName-error" : undefined}
            required
          />
          {fieldErrors.fullName && (
            <p id="ulc-fullName-error" className="mt-1 text-xs text-destructive">{fieldErrors.fullName}</p>
          )}
        </div>

        <div>
          <label htmlFor="ulc-email" className={labelClasses}>Email *</label>
          <Input
            id="ulc-email"
            name="email"
            type="email"
            inputMode="email"
            placeholder="you@email.com"
            value={formData.email}
            onChange={(e) => updateField("email", e.target.value)}
            onFocus={scrollFieldIntoView}
            className={`${inputClasses} ${fieldErrors.email ? "border-destructive focus:border-destructive focus:ring-destructive/20" : ""}`}
            autoComplete="email"
            aria-invalid={!!fieldErrors.email}
            aria-describedby={fieldErrors.email ? "ulc-email-error" : undefined}
            required
          />
          {fieldErrors.email && (
            <p id="ulc-email-error" className="mt-1 text-xs text-destructive">{fieldErrors.email}</p>
          )}
        </div>

        <div>
          <label htmlFor="ulc-phone" className={labelClasses}>Phone *</label>
          <Input
            id="ulc-phone"
            name="phone"
            type="tel"
            inputMode="tel"
            placeholder="(604) 555-1234"
            value={formData.phone}
            onChange={(e) => updateField("phone", e.target.value)}
            onFocus={scrollFieldIntoView}
            className={`${inputClasses} ${fieldErrors.phone ? "border-destructive focus:border-destructive focus:ring-destructive/20" : ""}`}
            autoComplete="tel"
            aria-invalid={!!fieldErrors.phone}
            aria-describedby={fieldErrors.phone ? "ulc-phone-error" : undefined}
            required
          />
          {fieldErrors.phone && (
            <p id="ulc-phone-error" className="mt-1 text-xs text-destructive">{fieldErrors.phone}</p>
          )}
        </div>

        <div>
          <label htmlFor="ulc-buyerType" className={labelClasses}>I am a... *</label>
          <Select
            value={formData.buyerType}
            onValueChange={(value) => updateField("buyerType", value)}
          >
            <SelectTrigger
              id="ulc-buyerType"
              className={`${inputClasses} ${fieldErrors.buyerType ? "border-destructive" : ""}`}
              aria-invalid={!!fieldErrors.buyerType}
            >
              <SelectValue placeholder="Select one" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="first-time-buyer">First-Time Buyer</SelectItem>
              <SelectItem value="investor">Investor</SelectItem>
              <SelectItem value="seller">Seller</SelectItem>
            </SelectContent>
          </Select>
          {fieldErrors.buyerType && (
            <p className="mt-1 text-xs text-destructive">{fieldErrors.buyerType}</p>
          )}
        </div>

        <div>
          <label htmlFor="ulc-budget" className={labelClasses}>Budget *</label>
          <Select
            value={formData.budget}
            onValueChange={(value) => updateField("budget", value)}
          >
            <SelectTrigger
              id="ulc-budget"
              className={`${inputClasses} ${fieldErrors.budget ? "border-destructive" : ""}`}
              aria-invalid={!!fieldErrors.budget}
            >
              <SelectValue placeholder="Select your budget" />
            </SelectTrigger>
            <SelectContent>
              {budgetOptions.map((b) => (
                <SelectItem key={b.value} value={b.value}>
                  {b.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {fieldErrors.budget && (
            <p className="mt-1 text-xs text-destructive">{fieldErrors.budget}</p>
          )}
        </div>

        <div>
          <label htmlFor="ulc-timeline" className={labelClasses}>When are you looking to buy? *</label>
          <Select
            value={formData.timeline}
            onValueChange={(value) => updateField("timeline", value)}
          >
            <SelectTrigger
              id="ulc-timeline"
              className={`${inputClasses} ${fieldErrors.timeline ? "border-destructive" : ""}`}
              aria-invalid={!!fieldErrors.timeline}
            >
              <SelectValue placeholder="Select your timeline" />
            </SelectTrigger>
            <SelectContent>
              {timelineOptions.map((t) => (
                <SelectItem key={t.value} value={t.value}>
                  {t.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {fieldErrors.timeline && (
            <p className="mt-1 text-xs text-destructive">{fieldErrors.timeline}</p>
          )}
        </div>

        <div>
          <label htmlFor="ulc-leadSource" className={labelClasses}>How did you find me? *</label>
          <Select
            value={formData.leadSource}
            onValueChange={(value) => updateField("leadSource", value)}
          >
            <SelectTrigger
              id="ulc-leadSource"
              className={`${inputClasses} ${fieldErrors.leadSource ? "border-destructive" : ""}`}
              aria-invalid={!!fieldErrors.leadSource}
            >
              <SelectValue placeholder="Select one" />
            </SelectTrigger>
            <SelectContent>
              {leadSources.map((source) => (
                <SelectItem key={source.value} value={source.value}>
                  {source.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {fieldErrors.leadSource && (
            <p className="mt-1 text-xs text-destructive">{fieldErrors.leadSource}</p>
          )}
        </div>
        </div>




        <Button
          type="submit"
          variant="hero"
          size="xl"
          className="w-full h-14 text-base font-semibold rounded-lg mt-4"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin mr-2" />
              Submitting...
            </>
          ) : (
            buttonText
          )}
        </Button>

        {showTrust && (
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 mt-5 pt-4 border-t border-border/30">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <CheckCircle className="h-3.5 w-3.5 text-primary" />
              <span>450+ units sold</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <CheckCircle className="h-3.5 w-3.5 text-primary" />
              <span>5-star Google rating</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <CheckCircle className="h-3.5 w-3.5 text-primary" />
              <span>No obligation</span>
            </div>
          </div>
        )}

        <p className={`text-xs text-center mt-3 ${isDark ? "text-white/50" : "text-muted-foreground"}`}>
          By submitting, you agree to receive communications from us. We respect your privacy.
        </p>
      </form>
    </div>
  );
};
