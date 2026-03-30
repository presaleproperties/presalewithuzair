import { useState, useEffect } from "react";
import { Quote, Send, CheckCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import anishPhoto from "@/assets/testimonials/anish.jpg";
import adamPhoto from "@/assets/testimonials/adam.jpg";
import rayPhoto from "@/assets/testimonials/ray.jpg";

const testimonials = [
  {
    quote: "As first-time buyers, we were nervous, but Uzair made everything clear, manageable, and stress-free. He took the time to understand what we wanted, explained every step thoroughly, and never once rushed us.",
    name: "Anish",
    type: "First-Time Buyer",
    photo: anishPhoto,
  },
  {
    quote: "Uzair helped me with my investment property and made sure I got the best deal. He's straightforward, knows the market, and will tell you directly if a project isn't right. No fluff, no hype — just honesty and expertise.",
    name: "Adam",
    type: "Investor",
    photo: adamPhoto,
  },
  {
    quote: "Now I see why he's called the presale expert. Uzair's relationships with developers helped us secure the best unit in the building at an incredible price. His transparency and guidance helped our family find our first home in just two weeks.",
    name: "Ray",
    type: "First-Time Buyer",
    photo: rayPhoto,
  },
];

const buyerTypes = [
  { value: "first-time-buyer", label: "First-Time Buyer" },
  { value: "investor", label: "Investor" },
  { value: "seller", label: "Seller" },
];

const contactMethods = [
  { value: "phone", label: "Phone Call" },
  { value: "whatsapp", label: "WhatsApp" },
  { value: "email", label: "Email" },
];

const preferredTimes = [
  { value: "morning", label: "Morning (9am–12pm)" },
  { value: "afternoon", label: "Afternoon (12pm–5pm)" },
  { value: "evening", label: "Evening (5pm–8pm)" },
  { value: "flexible", label: "I'm flexible" },
];

export const BookingContextSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    buyerType: "",
    contactMethod: "",
    preferredTime: "",
    notes: "",
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        setIsAnimating(false);
      }, 300);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const currentTestimonial = testimonials[currentIndex];

  const getUtmParams = () => {
    const urlParams = new URLSearchParams(window.location.search);
    return {
      utmSource: urlParams.get("utm_source") || undefined,
      utmMedium: urlParams.get("utm_medium") || undefined,
      utmCampaign: urlParams.get("utm_campaign") || undefined,
      utmTerm: urlParams.get("utm_term") || undefined,
      utmContent: urlParams.get("utm_content") || undefined,
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.fullName || !form.email || !form.phone || !form.buyerType) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);

    try {
      const utm = getUtmParams();
      const { error } = await supabase.functions.invoke("capture-lead", {
        body: {
          firstName: form.fullName.split(" ")[0] || form.fullName,
          lastName: form.fullName.split(" ").slice(1).join(" ") || "",
          email: form.email,
          phone: form.phone,
          buyerType: form.buyerType,
          leadSource: form.contactMethod ? `preferred-${form.contactMethod}` : "website-form",
          preferredCallTime: form.preferredTime || undefined,
          timeline: form.notes || undefined,
          landingPage: window.location.pathname,
          referrer: document.referrer || undefined,
          ...utm,
        },
      });

      if (error) throw error;

      setIsSubmitted(true);
      toast.success("Got it! Uzair will be in touch shortly.");
    } catch (err) {
      console.error("Form submission error:", err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <section id="book-section" className="py-16 sm:py-24 bg-background relative overflow-hidden">
      {/* Subtle blue glow effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-[5%] w-32 h-32 md:w-48 md:h-48 rounded-full bg-primary/8 blur-3xl" />
        <div className="absolute bottom-40 right-[10%] w-24 h-24 md:w-40 md:h-40 rounded-full bg-blue-400/6 blur-3xl" />
        <div className="absolute top-1/3 right-[5%] w-28 h-28 md:w-44 md:h-44 rounded-full bg-indigo-400/5 blur-3xl" />
      </div>

      <div className="container-xl px-4 sm:px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Rotating Testimonial Quotes */}
          <div className="max-w-3xl mx-auto mb-12 sm:mb-16">
            <div className="relative bg-card/50 backdrop-blur-sm rounded-2xl border border-border p-6 sm:p-8 min-h-[220px] sm:min-h-[240px]">
              <Quote className="absolute top-4 left-4 sm:top-6 sm:left-6 h-8 w-8 sm:h-10 sm:w-10 text-primary/20" />
              <blockquote
                className={`relative z-10 text-center transition-opacity duration-300 ${isAnimating ? "opacity-0" : "opacity-100"}`}
              >
                <div className="flex justify-center mb-4">
                  <img
                    src={currentTestimonial.photo}
                    alt={currentTestimonial.name}
                    className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover border-2 border-primary/30"
                  />
                </div>
                <p className="text-base sm:text-lg lg:text-xl text-foreground/90 italic leading-relaxed">
                  "{currentTestimonial.quote}"
                </p>
                <footer className="mt-4 sm:mt-6">
                  <p className="text-sm sm:text-base font-semibold text-foreground">{currentTestimonial.name}</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">{currentTestimonial.type}</p>
                </footer>
              </blockquote>

              <div className="flex justify-center gap-2 mt-4 sm:mt-6">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setIsAnimating(true);
                      setTimeout(() => {
                        setCurrentIndex(index);
                        setIsAnimating(false);
                      }, 300);
                    }}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? "bg-primary w-6"
                        : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                    }`}
                    aria-label={`View testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Header */}
          <div className="text-center mb-8 sm:mb-10">
            <p className="section-label mb-3 sm:mb-4">Ready to Get Started?</p>
            <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-bold text-foreground uppercase tracking-tight">
              Let's Talk <span className="text-gradient">Strategy.</span>
            </h2>
            <p className="mt-3 sm:mt-4 text-sm sm:text-base text-foreground/70 max-w-2xl mx-auto font-normal normal-case tracking-normal">
              Fill out the form below and I'll personally get back to you within 24 hours.
            </p>
            <ul className="mt-3 text-xs sm:text-sm text-foreground/70 space-y-1">
              <li>For serious first-time buyers & investors only.</li>
              <li>
                Consultations available in{" "}
                <span className="text-primary font-medium">English</span>,{" "}
                <span className="text-primary font-medium">Punjabi</span>,{" "}
                <span className="text-primary font-medium">Hindi</span> &{" "}
                <span className="text-primary font-medium">Urdu</span>.
              </li>
            </ul>
          </div>

          {/* Form */}
          <div className="max-w-2xl mx-auto">
            {isSubmitted ? (
              <div className="text-center py-16 px-6 bg-card/50 backdrop-blur-sm rounded-2xl border border-border">
                <CheckCircle className="h-16 w-16 text-primary mx-auto mb-6" />
                <h3 className="font-display text-2xl font-bold text-foreground mb-3">
                  You're All Set!
                </h3>
                <p className="text-foreground/70 max-w-md mx-auto">
                  Thanks for reaching out. Uzair will personally review your info and get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-card/50 backdrop-blur-sm rounded-2xl border border-border p-6 sm:p-10 space-y-6"
              >
                {/* Name Row */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-foreground font-medium">
                      First Name <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="firstName"
                      placeholder="Your first name"
                      value={form.firstName}
                      onChange={(e) => updateField("firstName", e.target.value)}
                      required
                      maxLength={100}
                      className="bg-background border-border"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-foreground font-medium">
                      Last Name
                    </Label>
                    <Input
                      id="lastName"
                      placeholder="Your last name"
                      value={form.lastName}
                      onChange={(e) => updateField("lastName", e.target.value)}
                      maxLength={100}
                      className="bg-background border-border"
                    />
                  </div>
                </div>

                {/* Contact Row */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-foreground font-medium">
                      Email <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={form.email}
                      onChange={(e) => updateField("email", e.target.value)}
                      required
                      maxLength={255}
                      className="bg-background border-border"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-foreground font-medium">
                      Phone Number <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="(604) 555-1234"
                      value={form.phone}
                      onChange={(e) => updateField("phone", e.target.value)}
                      required
                      maxLength={20}
                      className="bg-background border-border"
                    />
                  </div>
                </div>

                {/* Buyer Type */}
                <div className="space-y-2">
                  <Label className="text-foreground font-medium">
                    I am a... <span className="text-destructive">*</span>
                  </Label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {buyerTypes.map((type) => (
                      <button
                        key={type.value}
                        type="button"
                        onClick={() => updateField("buyerType", type.value)}
                        className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all border ${
                          form.buyerType === type.value
                            ? "bg-primary text-primary-foreground border-primary"
                            : "bg-background text-foreground/70 border-border hover:border-primary/50 hover:text-foreground"
                        }`}
                      >
                        {type.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Preferred Contact Method */}
                <div className="space-y-2">
                  <Label className="text-foreground font-medium">
                    Preferred way to connect
                  </Label>
                  <div className="flex flex-wrap gap-2">
                    {contactMethods.map((method) => (
                      <button
                        key={method.value}
                        type="button"
                        onClick={() => updateField("contactMethod", method.value)}
                        className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all border ${
                          form.contactMethod === method.value
                            ? "bg-primary text-primary-foreground border-primary"
                            : "bg-background text-foreground/70 border-border hover:border-primary/50 hover:text-foreground"
                        }`}
                      >
                        {method.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Preferred Time */}
                <div className="space-y-2">
                  <Label className="text-foreground font-medium">
                    Best time to reach you
                  </Label>
                  <div className="grid grid-cols-2 gap-2">
                    {preferredTimes.map((time) => (
                      <button
                        key={time.value}
                        type="button"
                        onClick={() => updateField("preferredTime", time.value)}
                        className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all border ${
                          form.preferredTime === time.value
                            ? "bg-primary text-primary-foreground border-primary"
                            : "bg-background text-foreground/70 border-border hover:border-primary/50 hover:text-foreground"
                        }`}
                      >
                        {time.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Notes */}
                <div className="space-y-2">
                  <Label htmlFor="notes" className="text-foreground font-medium">
                    Tell me briefly what you're looking for
                  </Label>
                  <Textarea
                    id="notes"
                    placeholder="e.g., Looking for a 2BR presale in Surrey under $600K, closing in 2026..."
                    value={form.notes}
                    onChange={(e) => updateField("notes", e.target.value)}
                    maxLength={1000}
                    rows={3}
                    className="bg-background border-border resize-none"
                  />
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full py-6 text-base font-semibold rounded-xl"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-5 w-5" />
                      Get My Free Strategy Call
                    </>
                  )}
                </Button>

                <p className="text-center text-xs text-muted-foreground">
                  No spam. No pressure. Just a real conversation about your goals.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
