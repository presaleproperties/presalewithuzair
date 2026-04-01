import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";

const formSchema = z.object({
  fullName: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  phone: z.string().trim().min(10, "Please enter a valid phone number").max(20),
  buyerType: z.string().min(1, "Please select an option"),
  leadSource: z.string().min(1, "Please let us know how you found us"),
});

type FormData = z.infer<typeof formSchema>;

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
}: UnifiedLeadFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    buyerType: defaultBuyerType,
    leadSource: "",
  });
  const [trackingData, setTrackingData] = useState(getTrackingData());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
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
      const { error } = await supabase.functions.invoke("capture-lead", {
        body: {
          firstName: formData.fullName.split(" ")[0] || formData.fullName,
          lastName: formData.fullName.split(" ").slice(1).join(" ") || "",
          email: formData.email,
          phone: formData.phone,
          buyerType: formData.buyerType,
          leadSource: formData.leadSource,
          ...trackingData,
        },
      });

      if (error) throw new Error(error.message || "Failed to submit");

      setIsSuccess(true);
      toast({
        title: "Thanks for reaching out!",
        description: "We'll be in touch soon.",
      });
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

  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => {
        setIsSuccess(false);
        setFormData({ fullName: "", email: "", phone: "", buyerType: defaultBuyerType, leadSource: "" });
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
    ? `bg-card/50 backdrop-blur-sm rounded-2xl border border-border p-6 sm:p-10 ${className}`
    : className;

  const inputClasses = isDark
    ? "h-12 text-base bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-primary touch-manipulation"
    : "h-12 text-base bg-card/50 border-border/50 focus:border-primary touch-manipulation";

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

      <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4" autoComplete="on">
        <div>
          <label htmlFor="ulc-fullName" className={labelClasses}>Full Name *</label>
          <Input
            id="ulc-fullName"
            name="name"
            type="text"
            placeholder="Your full name"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            className={inputClasses}
            autoComplete="name"
            required
          />
        </div>

        <div>
          <label htmlFor="ulc-email" className={labelClasses}>Email *</label>
          <Input
            id="ulc-email"
            name="email"
            type="email"
            placeholder="you@email.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className={inputClasses}
            autoComplete="email"
            required
          />
        </div>

        <div>
          <label htmlFor="ulc-phone" className={labelClasses}>Phone *</label>
          <Input
            id="ulc-phone"
            name="phone"
            type="tel"
            placeholder="(604) 555-1234"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className={inputClasses}
            autoComplete="tel"
            required
          />
        </div>

        <div>
          <label htmlFor="ulc-buyerType" className={labelClasses}>I am a... *</label>
          <Select
            value={formData.buyerType}
            onValueChange={(value) => setFormData({ ...formData, buyerType: value })}
          >
            <SelectTrigger className={inputClasses}>
              <SelectValue placeholder="Select one" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="first-time-buyer">First-Time Buyer</SelectItem>
              <SelectItem value="investor">Investor</SelectItem>
              <SelectItem value="seller">Seller</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label htmlFor="ulc-leadSource" className={labelClasses}>How did you find me? *</label>
          <Select
            value={formData.leadSource}
            onValueChange={(value) => setFormData({ ...formData, leadSource: value })}
          >
            <SelectTrigger className={inputClasses}>
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
              <span>400+ units sold</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <CheckCircle className="h-3.5 w-3.5 text-primary" />
              <span>5-star reviews</span>
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
