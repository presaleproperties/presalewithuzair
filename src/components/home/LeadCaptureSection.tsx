import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import uzairImage from "@/assets/uzair-walking.jpg";

const formSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(50),
  lastName: z.string().trim().min(1, "Last name is required").max(50),
  email: z.string().trim().email("Please enter a valid email").max(255),
  phone: z.string().trim().min(10, "Please enter a valid phone number").max(20),
  buyerType: z.string().min(1, "Please select an option"),
  leadSource: z.string().min(1, "Please let us know how you found us"),
});

type FormData = z.infer<typeof formSchema>;

interface TrackingData {
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
  utmTerm: string | null;
  utmContent: string | null;
  referrer: string | null;
  landingPage: string | null;
}

const leadSources = [
  { value: "instagram", label: "Instagram" },
  { value: "tiktok", label: "TikTok" },
  { value: "youtube", label: "YouTube" },
  { value: "referral", label: "Referral / Friend" },
  { value: "google", label: "Google Search" },
  { value: "other", label: "Other" },
];

// Helper to get UTM parameters from URL
const getTrackingData = (): TrackingData => {
  const params = new URLSearchParams(window.location.search);
  return {
    utmSource: params.get('utm_source'),
    utmMedium: params.get('utm_medium'),
    utmCampaign: params.get('utm_campaign'),
    utmTerm: params.get('utm_term'),
    utmContent: params.get('utm_content'),
    referrer: document.referrer || null,
    landingPage: window.location.pathname,
  };
};

export const LeadCaptureSection = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    buyerType: "",
    leadSource: "",
  });
  const [trackingData, setTrackingData] = useState<TrackingData>({
    utmSource: null,
    utmMedium: null,
    utmCampaign: null,
    utmTerm: null,
    utmContent: null,
    referrer: null,
    landingPage: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  // Check for pre-selected buyer type from URL hash and capture tracking data
  useEffect(() => {
    // Capture tracking data on mount
    setTrackingData(getTrackingData());
    
    const checkHash = () => {
      const hash = window.location.hash;
      if (hash === '#lead-form-first-time-buyer') {
        setFormData(prev => ({ ...prev, buyerType: 'first-time-buyer' }));
      } else if (hash === '#lead-form-investor') {
        setFormData(prev => ({ ...prev, buyerType: 'investor' }));
      }
      // Clear hash after processing to keep URL clean
      if (hash.startsWith('#lead-form-')) {
        window.history.replaceState(null, '', window.location.pathname + window.location.search + '#lead-form');
      }
    };
    
    checkHash();
    window.addEventListener('hashchange', checkHash);
    return () => window.removeEventListener('hashchange', checkHash);
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
      const { data, error } = await supabase.functions.invoke('capture-lead', {
        body: {
          ...formData,
          ...trackingData,
        },
      });

      if (error) {
        throw new Error(error.message || 'Failed to submit');
      }

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
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setIsSuccess(false);
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          buyerType: "",
          leadSource: "",
        });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess]);

  if (isSuccess) {
    return (
      <section id="lead-form" className="relative min-h-screen overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-card to-background" />
        
        <div className="relative z-10 container-xl px-4 sm:px-6 min-h-screen flex items-center justify-center">
          <div className="max-w-lg text-center py-16">
            <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-primary/20 flex items-center justify-center">
              <CheckCircle className="h-10 w-10 text-primary" />
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-black text-foreground uppercase tracking-tight mb-4">
              ALL SET!
            </h2>
            <p className="text-lg text-muted-foreground">
              You will hear from us soon.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="lead-form" className="relative min-h-screen overflow-hidden">
      {/* Background with bokeh effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-card/50 to-background" />
      
      {/* Colorful bokeh effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-[5%] w-32 h-32 md:w-48 md:h-48 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="absolute bottom-40 left-[10%] w-24 h-24 md:w-40 md:h-40 rounded-full bg-pink-500/20 blur-3xl" />
        <div className="absolute top-1/3 right-[5%] w-28 h-28 md:w-44 md:h-44 rounded-full bg-purple-500/15 blur-3xl" />
      </div>

      <div className="relative z-10 container-xl px-4 sm:px-6 min-h-screen flex items-center py-16 sm:py-24">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center w-full">
          
          {/* Left - Image (hidden on mobile) */}
          <div className="hidden lg:block relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={uzairImage}
                alt="Uzair Muhammad - Presale Expert"
                className="w-full aspect-[4/5] object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
            </div>
          </div>

          {/* Right - Form */}
          <div className="max-w-md mx-auto lg:mx-0 w-full">
            <p className="text-primary font-bold tracking-[0.15em] text-xs sm:text-sm mb-3">
              START HERE
            </p>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-black text-foreground uppercase tracking-tight mb-3">
              GET CLEAR GUIDANCE <span className="text-muted-foreground">BEFORE YOU BUY</span>
            </h2>
            
            <p className="text-sm sm:text-base text-muted-foreground mb-6">
              <span className="text-foreground font-semibold">Independent, buyer-first advice.</span>{" "}
              A quick conversation to understand your goals — and ensure you don't make a costly mistake.
            </p>

            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4" autoComplete="on">
              {/* Name Row - Side by side on mobile */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="firstName" className="block text-xs sm:text-sm font-medium text-foreground mb-1">
                    First Name *
                  </label>
                  <Input
                    id="firstName"
                    name="firstName"
                    type="text"
                    placeholder="First"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="h-12 text-base bg-card/50 border-border/50 focus:border-primary touch-manipulation"
                    autoComplete="given-name"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-xs sm:text-sm font-medium text-foreground mb-1">
                    Last Name *
                  </label>
                  <Input
                    id="lastName"
                    name="lastName"
                    type="text"
                    placeholder="Last"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="h-12 text-base bg-card/50 border-border/50 focus:border-primary touch-manipulation"
                    autoComplete="family-name"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-foreground mb-1">
                  Email *
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="h-12 text-base bg-card/50 border-border/50 focus:border-primary touch-manipulation"
                  autoComplete="email"
                  required
                />
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-xs sm:text-sm font-medium text-foreground mb-1">
                  Phone *
                </label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="(604) 555-1234"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="h-12 text-base bg-card/50 border-border/50 focus:border-primary touch-manipulation"
                  autoComplete="tel"
                  required
                />
              </div>

              {/* Buyer Type */}
              <div>
                <label htmlFor="buyerType" className="block text-xs sm:text-sm font-medium text-foreground mb-1">
                  I am a... *
                </label>
                <Select
                  value={formData.buyerType}
                  onValueChange={(value) => setFormData({ ...formData, buyerType: value })}
                >
                  <SelectTrigger className="h-12 text-base bg-card/50 border-border/50 focus:border-primary touch-manipulation">
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

              {/* Lead Source - How did you find me */}
              <div>
                <label htmlFor="leadSource" className="block text-xs sm:text-sm font-medium text-foreground mb-1">
                  How did you find me? *
                </label>
                <Select
                  value={formData.leadSource}
                  onValueChange={(value) => setFormData({ ...formData, leadSource: value })}
                >
                  <SelectTrigger className="h-12 text-base bg-card/50 border-border/50 focus:border-primary touch-manipulation">
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

              {/* Submit Button */}
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
                  "Let's Chat"
                )}
              </Button>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 mt-5 pt-4 border-t border-border/30">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <CheckCircle className="h-3.5 w-3.5 text-primary" />
                  <span>350+ clients helped</span>
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

              <p className="text-xs text-muted-foreground text-center mt-3">
                By submitting, you agree to receive communications from us. We respect your privacy.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
