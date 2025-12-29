import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Calendar, CheckCircle } from "lucide-react";
import { z } from "zod";

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: {
        url: string;
        prefill?: {
          name?: string;
          email?: string;
          customAnswers?: Record<string, string>;
        };
        pageSettings?: {
          backgroundColor?: string;
          hideEventTypeDetails?: boolean;
          hideLandingPageDetails?: boolean;
          primaryColor?: string;
          textColor?: string;
          hideGdprBanner?: boolean;
        };
      }) => void;
    };
  }
}

const CALENDLY_URL = "https://calendly.com/meetuzair/30min";

const agentFormSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  phone: z.string().trim().min(1, "Phone number is required").max(20, "Phone must be less than 20 characters"),
  brokerage: z.string().trim().max(100, "Brokerage name must be less than 100 characters").optional(),
  experience: z.string().min(1, "Please select your experience level"),
  presaleExperience: z.string().min(1, "Please select your presale experience"),
  interest: z.string().min(1, "Please select what you're interested in"),
  message: z.string().trim().max(1000, "Message must be less than 1000 characters").optional(),
});

type AgentFormData = z.infer<typeof agentFormSchema>;

const isMobileDevice = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  ) || window.innerWidth < 768;
};

export const AgentContactForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<Partial<AgentFormData>>({});
  const [errors, setErrors] = useState<Partial<Record<keyof AgentFormData, string>>>({});

  useEffect(() => {
    // Load Calendly CSS
    const existingLink = document.querySelector('link[href*="calendly.com/assets/external/widget.css"]');
    if (!existingLink) {
      const link = document.createElement("link");
      link.href = "https://assets.calendly.com/assets/external/widget.css";
      link.rel = "stylesheet";
      document.head.appendChild(link);
    }

    // Load Calendly JS
    const existingScript = document.querySelector('script[src*="calendly.com/assets/external/widget.js"]');
    if (!existingScript) {
      const script = document.createElement("script");
      script.src = "https://assets.calendly.com/assets/external/widget.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const openCalendlyWithPrefill = useCallback((data: AgentFormData) => {
    const isMobile = isMobileDevice();
    
    if (window.Calendly) {
      window.Calendly.initPopupWidget({
        url: CALENDLY_URL,
        prefill: {
          name: data.name,
          email: data.email,
          customAnswers: {
            a1: data.phone,
            a2: `Brokerage: ${data.brokerage || "Not specified"} | Experience: ${data.experience} | Presale Experience: ${data.presaleExperience} | Interest: ${data.interest}${data.message ? ` | Message: ${data.message}` : ""}`,
          },
        },
        pageSettings: {
          backgroundColor: "0c0a09",
          primaryColor: "d4a853",
          textColor: "fafaf9",
          hideGdprBanner: true,
          hideEventTypeDetails: isMobile,
          hideLandingPageDetails: isMobile,
        },
      });
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = agentFormSchema.safeParse(formData);
    
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof AgentFormData, string>> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as keyof AgentFormData] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);

    // Brief delay for UX
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Open Calendly with prefilled data
    openCalendlyWithPrefill(result.data);

    setIsSubmitting(false);
    setIsSubmitted(true);
    toast({
      title: "Form submitted!",
      description: "Schedule your call with Uzair.",
    });
  };

  if (isSubmitted) {
    return (
      <div className="bg-card rounded-2xl border border-border p-8 text-center">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="h-8 w-8 text-primary" />
        </div>
        <h3 className="font-display text-xl font-bold text-foreground mb-2">Thank You!</h3>
        <p className="text-muted-foreground mb-4">
          Your inquiry has been submitted. Connect with Uzair on WhatsApp to continue the conversation.
        </p>
        <Button variant="outline" onClick={() => setIsSubmitted(false)}>
          Submit Another Inquiry
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-card rounded-2xl border border-border p-8 space-y-6">
      <div className="text-center mb-6">
        <h3 className="font-display text-2xl font-bold text-foreground mb-2">Start Your Presale Journey</h3>
        <p className="text-muted-foreground">Tell us about yourself and your goals</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name *</Label>
          <Input
            id="name"
            placeholder="Your name"
            value={formData.name || ""}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className={errors.name ? "border-destructive" : ""}
          />
          {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@email.com"
            value={formData.email || ""}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className={errors.email ? "border-destructive" : ""}
          />
          {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number *</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="+1 (xxx) xxx-xxxx"
            value={formData.phone || ""}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className={errors.phone ? "border-destructive" : ""}
          />
          {errors.phone && <p className="text-xs text-destructive">{errors.phone}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="brokerage">Brokerage</Label>
          <Input
            id="brokerage"
            placeholder="Your brokerage name"
            value={formData.brokerage || ""}
            onChange={(e) => setFormData({ ...formData, brokerage: e.target.value })}
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Time in Real Estate *</Label>
          <Select
            value={formData.experience}
            onValueChange={(value) => setFormData({ ...formData, experience: value })}
          >
            <SelectTrigger className={errors.experience ? "border-destructive" : ""}>
              <SelectValue placeholder="Select experience" />
            </SelectTrigger>
            <SelectContent className="bg-card border border-border z-50">
              <SelectItem value="0-1">Less than 1 year</SelectItem>
              <SelectItem value="1-2">1-2 years</SelectItem>
              <SelectItem value="2-5">2-5 years</SelectItem>
              <SelectItem value="5+">5+ years</SelectItem>
            </SelectContent>
          </Select>
          {errors.experience && <p className="text-xs text-destructive">{errors.experience}</p>}
        </div>

        <div className="space-y-2">
          <Label>Presale Experience *</Label>
          <Select
            value={formData.presaleExperience}
            onValueChange={(value) => setFormData({ ...formData, presaleExperience: value })}
          >
            <SelectTrigger className={errors.presaleExperience ? "border-destructive" : ""}>
              <SelectValue placeholder="Select presale experience" />
            </SelectTrigger>
            <SelectContent className="bg-card border border-border z-50">
              <SelectItem value="0">No presale experience</SelectItem>
              <SelectItem value="1-5">1-5 presale units</SelectItem>
              <SelectItem value="5-10">5-10 presale units</SelectItem>
              <SelectItem value="10+">10+ presale units</SelectItem>
            </SelectContent>
          </Select>
          {errors.presaleExperience && <p className="text-xs text-destructive">{errors.presaleExperience}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label>What are you interested in? *</Label>
        <Select
          value={formData.interest}
          onValueChange={(value) => setFormData({ ...formData, interest: value })}
        >
          <SelectTrigger className={errors.interest ? "border-destructive" : ""}>
            <SelectValue placeholder="Select your interest" />
          </SelectTrigger>
          <SelectContent className="bg-card border border-border z-50">
            <SelectItem value="academy">Vancouver Presale Academy (Fall 2025)</SelectItem>
            <SelectItem value="mentorship">1-on-1 Mentorship</SelectItem>
            <SelectItem value="workshop">Workshop or Group Training</SelectItem>
            <SelectItem value="inventory">Access to Presale Inventory</SelectItem>
            <SelectItem value="other">Other / General Inquiry</SelectItem>
          </SelectContent>
        </Select>
        {errors.interest && <p className="text-xs text-destructive">{errors.interest}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Additional Message (Optional)</Label>
        <Textarea
          id="message"
          placeholder="Tell us more about your goals or questions..."
          value={formData.message || ""}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          rows={3}
        />
      </div>

      <Button type="submit" variant="hero" size="lg" className="w-full gap-2" disabled={isSubmitting}>
        <Calendar className="h-4 w-4" />
        {isSubmitting ? "Submitting..." : "Submit & Schedule a Call"}
      </Button>

      <p className="text-xs text-muted-foreground text-center">
        After submitting, you'll be able to schedule a call with Uzair.
      </p>
    </form>
  );
};
