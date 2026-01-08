import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Shield, TrendingUp, Users, Star, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import logoImage from "@/assets/logo.png";
import headshotImage from "@/assets/uzair-headshot.jpeg";
import anishPhoto from "@/assets/testimonials/anish.jpg";
import baldeepPhoto from "@/assets/testimonials/baldeep.jpg";
import rehmanPhoto from "@/assets/testimonials/rehman.jpg";
import monaPhoto from "@/assets/testimonials/mona.jpg";
import rayPhoto from "@/assets/testimonials/ray.jpg";

// Landing Page Content
const content = {
  headline: "Work With",
  headlineAccent: "Uzair.",
  subheadline: "BC's trusted presale expert for condo & townhome buyers.",
  ctaPrimary: "Get A Free Call",
  ctaSecondary: "Get A Free Call",
};

const LandingPage = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({ email: "", phone: "" });
  const { toast } = useToast();
  
  // Parse URL params for form prefill
  const urlParams = new URLSearchParams(window.location.search);
  
  const [formData, setFormData] = useState({
    firstName: urlParams.get("firstName") || urlParams.get("name")?.split(" ")[0] || "",
    lastName: urlParams.get("lastName") || urlParams.get("name")?.split(" ").slice(1).join(" ") || "",
    email: urlParams.get("email") || "",
    phone: urlParams.get("phone") || "",
    buyerType: urlParams.get("type") || "",
    hasAgent: "",
    propertyType: "",
    priceRange: "",
  });

  // Validation functions
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    // Remove all non-digits
    const digitsOnly = phone.replace(/\D/g, "");
    // Valid if 10-11 digits (with or without country code)
    return digitsOnly.length >= 10 && digitsOnly.length <= 11;
  };

  const handleEmailChange = (value: string) => {
    setFormData({ ...formData, email: value });
    if (value && !validateEmail(value)) {
      setErrors((prev) => ({ ...prev, email: "Please enter a valid email" }));
    } else {
      setErrors((prev) => ({ ...prev, email: "" }));
    }
  };

  const handlePhoneChange = (value: string) => {
    // Format phone as user types
    const digitsOnly = value.replace(/\D/g, "");
    let formatted = digitsOnly;
    if (digitsOnly.length >= 6) {
      formatted = `(${digitsOnly.slice(0, 3)}) ${digitsOnly.slice(3, 6)}-${digitsOnly.slice(6, 10)}`;
    } else if (digitsOnly.length >= 3) {
      formatted = `(${digitsOnly.slice(0, 3)}) ${digitsOnly.slice(3)}`;
    }
    setFormData({ ...formData, phone: formatted });
    
    if (digitsOnly.length > 0 && !validatePhone(digitsOnly)) {
      setErrors((prev) => ({ ...prev, phone: "Enter 10 digit phone number" }));
    } else {
      setErrors((prev) => ({ ...prev, phone: "" }));
    }
  };

  // Auto-advance when buyer type is selected
  const handleBuyerTypeSelect = (value: string) => {
    setFormData({ ...formData, buyerType: value });
    setTimeout(() => setStep(2), 300);
  };

  // Auto-advance when agent status is selected
  const handleAgentSelect = (value: string) => {
    setFormData({ ...formData, hasAgent: value });
    setTimeout(() => setStep(3), 300);
  };

  // Auto-advance when property type is selected
  const handlePropertyTypeSelect = (value: string) => {
    setFormData({ ...formData, propertyType: value });
  };

  // Auto-advance when price range is selected
  const handlePriceRangeSelect = (value: string) => {
    setFormData((prev) => ({ ...prev, priceRange: value }));
    setTimeout(() => setStep(4), 300);
  };

  // Reset form when dialog closes
  const handleDialogChange = (open: boolean) => {
    setIsFormOpen(open);
    if (!open) {
      setTimeout(() => {
        setStep(1);
        setIsSuccess(false);
      }, 300);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Final validation before submit
    const emailValid = validateEmail(formData.email);
    const phoneValid = validatePhone(formData.phone);
    
    if (!emailValid) {
      setErrors((prev) => ({ ...prev, email: "Please enter a valid email" }));
    }
    if (!phoneValid) {
      setErrors((prev) => ({ ...prev, phone: "Enter 10 digit phone number" }));
    }
    
    if (!emailValid || !phoneValid) {
      toast({
        title: "Please check your info",
        description: "Email or phone number is not correct.",
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
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          buyerType: formData.buyerType,
          hasAgent: formData.hasAgent,
          budget: formData.priceRange || undefined,
          timeline: formData.propertyType || undefined,
          leadSource: "landing-page",
          utmSource: params.get("utm_source") || undefined,
          utmMedium: params.get("utm_medium") || undefined,
          utmCampaign: params.get("utm_campaign") || undefined,
          utmTerm: params.get("utm_term") || undefined,
          utmContent: params.get("utm_content") || undefined,
          referrer: document.referrer || undefined,
          landingPage: window.location.pathname + window.location.search,
        },
      });

      if (error) throw error;

      setIsSuccess(true);
      toast({
        title: "You're all set!",
        description: "We'll be in touch within 24 hours.",
      });
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please try again or call us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const benefits = [
    {
      icon: Shield,
      title: "Save Money",
      description: "Uzair helps you avoid bad deals. 330+ presales reviewed.",
    },
    {
      icon: TrendingUp,
      title: "Best Units First",
      description: "Get early access before public launch.",
    },
    {
      icon: Users,
      title: "Trusted by Families",
      description: "100+ South Asian families helped.",
    },
  ];

  const testimonials = [
    {
      name: "Anish",
      text: "As first-time buyers, we were nervous, but Uzair made everything clear and stress-free. He helped us find the perfect home for our family.",
      rating: 5,
      photo: anishPhoto,
    },
    {
      name: "Baldeep",
      text: "Uzair made our home-selling process seamless. He took the time to understand our needs and continues to support us. His professionalism is unmatched.",
      rating: 5,
      photo: baldeepPhoto,
    },
    {
      name: "Rehman",
      text: "Uzair is very blunt, honest, and straight to the point. He doesn't beat around the bush. I truly respect his work ethic.",
      rating: 5,
      photo: rehmanPhoto,
    },
    {
      name: "Mona",
      text: "Uzair is a very honest realtor who always puts his clients first. We've been working with him for years. I would advise anyone to work with him.",
      rating: 5,
      photo: monaPhoto,
    },
    {
      name: "Ray",
      text: "Now I see why he's called the presale expert. His transparency and guidance helped our family find our first home in just two weeks.",
      rating: 5,
      photo: rayPhoto,
    },
  ];

  return (
    <>
      <Helmet>
        <title>Free Presale Strategy Session | Uzair Presales</title>
        <meta
          name="description"
          content="Book your free presale strategy session. Get expert guidance on Vancouver presale condos from BC's #1 presale specialist."
        />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">

        {/* Minimal Header */}
        <header className="py-6 px-4 border-b border-white/5">
          <div className="max-w-6xl mx-auto flex justify-center">
            <img src={logoImage} alt="Uzair Presales" className="h-10" />
          </div>
        </header>

        {/* Hero Section */}
        <section className="px-4 pt-8 pb-16 md:pt-16 md:pb-24">
          <div className="max-w-4xl mx-auto text-center">
            {/* Language Badge - Prominent */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mb-6"
            >
              <span className="inline-flex items-center gap-2 bg-primary/20 text-primary px-4 py-2 rounded-full text-sm font-medium">
                🗣️ ਪੰਜਾਬੀ • हिंदी • اردو • English
              </span>
            </motion.div>

            {/* Headshot */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <img 
                src={headshotImage} 
                alt="Uzair - Presale Specialist" 
                className="w-24 h-24 md:w-28 md:h-28 rounded-full mx-auto object-cover border-4 border-primary/30 shadow-lg shadow-primary/20"
              />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight mb-4"
              style={{ fontFamily: "Raleway, sans-serif" }}
            >
              {content.headline}
              <br />
              <span className="text-primary">{content.headlineAccent}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-xl md:text-2xl text-slate-300 mb-8"
            >
              {content.subheadline}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col items-center gap-3"
            >
              <Button
                size="lg"
                onClick={() => setIsFormOpen(true)}
                className="bg-primary hover:bg-primary/90 text-primary-foreground text-xl px-10 py-7 rounded-full shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all"
              >
                <Phone className="mr-2 w-5 h-5" /> {content.ctaPrimary}
              </Button>
              <span className="text-primary text-sm font-medium">⚡ Same day call back</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 flex flex-wrap justify-center gap-4 text-slate-400 text-sm"
            >
              <span className="bg-slate-800/50 px-3 py-1 rounded-full">✓ 330+ Families Helped</span>
              <span className="bg-slate-800/50 px-3 py-1 rounded-full">✓ $1M+ Saved</span>
              <span className="bg-slate-800/50 px-3 py-1 rounded-full">✓ 100% Free Advice</span>
            </motion.div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="px-4 py-16 bg-slate-900/50 border-y border-white/5">
          <div className="max-w-6xl mx-auto">
            <h2
              className="text-3xl md:text-4xl font-bold text-center text-white mb-4"
              style={{ fontFamily: "Raleway, sans-serif" }}
            >
              Why Work With Uzair?
            </h2>
            <p className="text-slate-400 text-center mb-12 max-w-2xl mx-auto">
              He speaks your language. He understands your needs.
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-primary/30 transition-colors"
                >
                  <div className="w-14 h-14 bg-primary/20 rounded-xl flex items-center justify-center mb-6">
                    <benefit.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{benefit.title}</h3>
                  <p className="text-slate-400">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Social Proof Section */}
        <section className="px-4 py-16">
          <div className="max-w-6xl mx-auto">
            <h2
              className="text-3xl md:text-4xl font-bold text-center text-white mb-12"
              style={{ fontFamily: "Raleway, sans-serif" }}
            >
              Happy Clients 💬
            </h2>
            <p className="text-slate-400 text-lg mt-2">from social media</p>

            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
                >
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-slate-300 mb-4">"{testimonial.text}"</p>
                  <div className="flex items-center gap-3">
                    <img 
                      src={testimonial.photo} 
                      alt={testimonial.name}
                      className="w-10 h-10 rounded-full object-cover border-2 border-primary/30"
                    />
                    <p className="font-semibold text-white">{testimonial.name}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="px-4 py-16 bg-slate-900/50 border-y border-white/5">
          <div className="max-w-4xl mx-auto">
            <h2
              className="text-3xl md:text-4xl font-bold text-center text-white mb-12"
              style={{ fontFamily: "Raleway, sans-serif" }}
            >
              3 Easy Steps
            </h2>

            <div className="space-y-8">
              {[
                { step: "1", title: "Request A Call", description: "Fill the form. Takes 30 seconds." },
                { step: "2", title: "You Talk", description: "Uzair calls you. Discuss your needs." },
                { step: "3", title: "Find Your Home", description: "He helps you get the best deal." },
              ].map((item, index) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex gap-6 items-start"
                >
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-xl flex-shrink-0 shadow-lg shadow-primary/25">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                    <p className="text-slate-400">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="px-4 py-20 bg-gradient-to-b from-slate-900 to-slate-950">
          <div className="max-w-4xl mx-auto text-center">
            <h2
              className="text-3xl md:text-5xl font-bold text-white mb-6"
              style={{ fontFamily: "Raleway, sans-serif" }}
            >
              Ready To Talk? 🏠
            </h2>
            <p className="text-xl text-slate-300 mb-10">
              Free call. No pressure. Uzair's here to help.
            </p>
            <Button
              size="lg"
              onClick={() => setIsFormOpen(true)}
              className="bg-primary hover:bg-primary/90 text-primary-foreground text-xl px-10 py-7 rounded-full shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all"
            >
              <Phone className="mr-2 w-5 h-5" /> {content.ctaSecondary}
            </Button>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-4 bg-slate-950 border-t border-white/5 text-center">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} Uzair Presales • Vancouver's Presale Expert
          </p>
        </footer>
      </div>

      <Dialog open={isFormOpen} onOpenChange={handleDialogChange}>
        <DialogContent className="sm:max-w-md bg-slate-900 border-white/10 overflow-hidden">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-white text-center">
              {isSuccess ? "You're All Set! 🎉" : "Request A Callback"}
            </DialogTitle>
            {!isSuccess && (
              <p className="text-slate-400 text-center text-sm mt-1">Available in English, Punjabi, Urdu & Hindi</p>
            )}
          </DialogHeader>

          {isSuccess ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-6"
            >
              <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <p className="text-slate-300 mb-2">
                We'll call you back same day!
              </p>
              <p className="text-slate-400 text-sm mb-6">
                In the meantime, explore what we can do for you.
              </p>
              <div className="flex flex-col gap-3">
                <Button 
                  onClick={() => window.location.href = "/"}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-5 rounded-full"
                >
                  Visit Our Website <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
                <Button 
                  onClick={() => handleDialogChange(false)} 
                  variant="ghost" 
                  className="text-slate-400 hover:text-white hover:bg-white/5"
                >
                  Close
                </Button>
              </div>
            </motion.div>
          ) : (
            <div className="pt-2 min-h-[320px]">
              {/* Progress indicator */}
              <div className="flex justify-center gap-2 mb-6">
                {[1, 2, 3, 4].map((s) => (
                  <motion.div
                    key={s}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      s <= step ? "bg-primary w-8" : "bg-slate-700 w-4"
                    }`}
                    animate={{ width: s <= step ? 32 : 16 }}
                  />
                ))}
              </div>

              {/* Step 1: Buyer Type */}
              <motion.div
                initial={false}
                animate={{ 
                  opacity: step === 1 ? 1 : 0,
                  x: step === 1 ? 0 : -20,
                  display: step === 1 ? "block" : "none"
                }}
                transition={{ duration: 0.2 }}
              >
                <p className="text-white text-lg font-medium text-center mb-4">I am a... 👋</p>
                <div className="flex flex-col gap-3">
                  {[
                    { value: "first-time-buyer", label: "🏠 First-Time Buyer" },
                    { value: "investor", label: "📈 Investor" },
                    { value: "assignment-seller", label: "💰 Selling My Presale" },
                  ].map((option) => (
                    <motion.button
                      key={option.value}
                      type="button"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleBuyerTypeSelect(option.value)}
                      className={`p-4 rounded-xl border text-left transition-all ${
                        formData.buyerType === option.value
                          ? "bg-primary/20 border-primary text-white"
                          : "bg-slate-800/50 border-white/10 text-slate-300 hover:border-white/30"
                      }`}
                    >
                      {option.label}
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              {/* Step 2: Agent Status */}
              <motion.div
                initial={false}
                animate={{ 
                  opacity: step === 2 ? 1 : 0,
                  x: step === 2 ? 0 : step < 2 ? 20 : -20,
                  display: step === 2 ? "block" : "none"
                }}
                transition={{ duration: 0.2 }}
              >
                <p className="text-white text-lg font-medium text-center mb-4">Do you have a realtor?</p>
                <div className="flex flex-col gap-3">
                  {[
                    { value: "no", label: "❌ No" },
                    { value: "yes", label: "✅ Yes" },
                  ].map((option) => (
                    <motion.button
                      key={option.value}
                      type="button"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleAgentSelect(option.value)}
                      className={`p-4 rounded-xl border text-left transition-all ${
                        formData.hasAgent === option.value
                          ? "bg-primary/20 border-primary text-white"
                          : "bg-slate-800/50 border-white/10 text-slate-300 hover:border-white/30"
                      }`}
                    >
                      {option.label}
                    </motion.button>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="mt-4 text-slate-500 text-sm hover:text-slate-300 transition-colors w-full text-center"
                >
                  ← Back
                </button>
              </motion.div>

              {/* Step 3: Property Type & Price Range */}
              <motion.div
                initial={false}
                animate={{ 
                  opacity: step === 3 ? 1 : 0,
                  x: step === 3 ? 0 : step < 3 ? 20 : -20,
                  display: step === 3 ? "block" : "none"
                }}
                transition={{ duration: 0.2 }}
              >
                <p className="text-white text-lg font-medium text-center mb-4">What do you want? 🏢</p>
                
                {/* Property Type */}
                <div className="mb-4">
                  <p className="text-slate-400 text-sm mb-2">Type</p>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { value: "condo", label: "🏢 Condo" },
                      { value: "townhome", label: "🏘️ Townhome" },
                    ].map((option) => (
                      <motion.button
                        key={option.value}
                        type="button"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handlePropertyTypeSelect(option.value)}
                        className={`p-4 rounded-xl border text-center transition-all ${
                          formData.propertyType === option.value
                            ? "bg-primary/20 border-primary text-white"
                            : "bg-slate-800/50 border-white/10 text-slate-300 hover:border-white/30"
                        }`}
                      >
                        {option.label}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <p className="text-slate-400 text-sm mb-2">Budget 💵</p>
                  <div className="flex flex-col gap-2">
                    {[
                      { value: "under-500k", label: "Under $500K" },
                      { value: "500k-750k", label: "$500K - $750K" },
                      { value: "750k-1m", label: "$750K - $1M" },
                      { value: "1m-plus", label: "$1M+" },
                    ].map((option) => (
                      <motion.button
                        key={option.value}
                        type="button"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          if (formData.propertyType) {
                            handlePriceRangeSelect(option.value);
                          }
                        }}
                        disabled={!formData.propertyType}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          formData.priceRange === option.value
                            ? "bg-primary/20 border-primary text-white"
                            : formData.propertyType
                              ? "bg-slate-800/50 border-white/10 text-slate-300 hover:border-white/30"
                              : "bg-slate-800/30 border-white/5 text-slate-500 cursor-not-allowed"
                        }`}
                      >
                        {option.label}
                      </motion.button>
                    ))}
                  </div>
                  {!formData.propertyType && (
                    <p className="text-slate-500 text-xs mt-2 text-center">Select a property type first</p>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="mt-4 text-slate-500 text-sm hover:text-slate-300 transition-colors w-full text-center"
                >
                  ← Back
                </button>
              </motion.div>

              {/* Step 4: Contact Info */}
              <motion.div
                initial={false}
                animate={{ 
                  opacity: step === 4 ? 1 : 0,
                  x: step === 4 ? 0 : 20,
                  display: step === 4 ? "block" : "none"
                }}
                transition={{ duration: 0.2 }}
              >
                <p className="text-white text-lg font-medium text-center mb-4">Your Info 📞</p>
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <Input
                      required
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      placeholder="First name"
                      autoComplete="given-name"
                      className="bg-slate-800 border-white/10 text-white placeholder:text-slate-500 h-12"
                    />
                    <Input
                      required
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      placeholder="Last name"
                      autoComplete="family-name"
                      className="bg-slate-800 border-white/10 text-white placeholder:text-slate-500 h-12"
                    />
                  </div>
                  <div>
                    <Input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => handleEmailChange(e.target.value)}
                      placeholder="Email address"
                      autoComplete="email"
                      className={`bg-slate-800 border-white/10 text-white placeholder:text-slate-500 h-12 ${
                        errors.email ? "border-red-500 focus-visible:ring-red-500" : ""
                      }`}
                    />
                    {errors.email && (
                      <p className="text-red-400 text-xs mt-1">⚠️ {errors.email}</p>
                    )}
                  </div>
                  <div>
                    <Input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => handlePhoneChange(e.target.value)}
                      placeholder="(604) 555-1234"
                      autoComplete="tel"
                      className={`bg-slate-800 border-white/10 text-white placeholder:text-slate-500 h-12 ${
                        errors.phone ? "border-red-500 focus-visible:ring-red-500" : ""
                      }`}
                    />
                    {errors.phone && (
                      <p className="text-red-400 text-xs mt-1">⚠️ {errors.phone}</p>
                    )}
                  </div>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 rounded-full text-lg shadow-lg shadow-primary/25 mt-2"
                  >
                    {isSubmitting ? (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center gap-2"
                      >
                        <motion.div 
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                          className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                        />
                        Submitting...
                      </motion.span>
                    ) : (
                      <>Request A Callback</>
                    )}
                  </Button>
                  <p className="text-xs text-slate-500 text-center">
                    No spam. We respect your privacy.
                  </p>
                </form>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="mt-2 text-slate-500 text-sm hover:text-slate-300 transition-colors w-full text-center"
                >
                  ← Back
                </button>
              </motion.div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default LandingPage;
