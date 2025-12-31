import { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronRight, 
  ChevronLeft, 
  CheckCircle, 
  User, 
  Phone, 
  Mail, 
  Clock, 
  Star, 
  Quote,
  Home,
  ArrowRightLeft,
  MessageCircle,
  DollarSign,
  Calendar
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import logo from "@/assets/logo.png";

type LeadType = "buy-presale" | "sell-assignment" | "paid-advice";

type FormData = {
  firstName: string;
  phone: string;
  email: string;
  leadType: LeadType | "";
  timeline: string;
  budget: string;
  preferredTime: string;
};

const leadTypeOptions = [
  { 
    value: "buy-presale" as LeadType, 
    label: "I want to buy a Presale", 
    subtext: "Condos, townhomes & more",
    emoji: "🏠",
    isFree: true 
  },
  { 
    value: "sell-assignment" as LeadType, 
    label: "I want to sell an Assignment", 
    subtext: "Get help assigning your contract",
    emoji: "🔄",
    isFree: true 
  },
  { 
    value: "paid-advice" as LeadType, 
    label: "I need expert advice", 
    subtext: "30-min strategy call",
    emoji: "💡",
    isFree: false,
    price: "$250" 
  },
];

const testimonials = [
  { name: "Michelle K.", quote: "Uzair made my first presale purchase completely stress-free!", type: "Buyer" },
  { name: "Ray S.", quote: "His market knowledge saved me from a bad investment.", type: "Investor" },
  { name: "Anish P.", quote: "Honest advice that actually helped me make the right decision.", type: "Buyer" },
];

const timelineOptions = [
  { value: "ready-now", label: "Ready Now", emoji: "🚀" },
  { value: "within-6-months", label: "Within 6 Months", emoji: "📅" },
  { value: "just-exploring", label: "Just Exploring", emoji: "🔍" },
];

const budgetOptions = [
  { value: "under-500k", label: "Under $500K", emoji: "💰" },
  { value: "500k-750k", label: "$500K - $750K", emoji: "💎" },
  { value: "750k-1m", label: "$750K - $1M", emoji: "🏆" },
  { value: "1m-plus", label: "$1M+", emoji: "👑" },
];

const timeOptions = [
  { value: "morning", label: "Morning", sub: "9am - 12pm", emoji: "🌅" },
  { value: "afternoon", label: "Afternoon", sub: "12pm - 5pm", emoji: "☀️" },
  { value: "evening", label: "Evening", sub: "5pm - 8pm", emoji: "🌙" },
  { value: "weekend", label: "Weekend", sub: "Flexible", emoji: "📅" },
];

const SWIPE_THRESHOLD = 50;

const Book = () => {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    phone: "",
    email: "",
    leadType: "",
    timeline: "",
    budget: "",
    preferredTime: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isPaidSuccess, setIsPaidSuccess] = useState(false);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const { toast } = useToast();
  const formRef = useRef<HTMLDivElement>(null);

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Check for payment success/cancel in URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('success') === 'true') {
      setIsPaidSuccess(true);
      setIsSuccess(true);
      // Clean up URL
      window.history.replaceState({}, '', '/book');
    }
    if (params.get('canceled') === 'true') {
      toast({
        title: "Payment Cancelled",
        description: "Your consultation booking was not completed.",
        variant: "destructive",
      });
      window.history.replaceState({}, '', '/book');
    }
  }, [toast]);

  // Steps vary based on lead type
  // Buy/Sell: Intent(0) → Timeline(1) → Budget(2) → Name(3) → Contact(4) → Time(5)
  // Paid Advice: Intent(0) → Name(1) → Contact(2) → Payment
  const getStepConfig = () => {
    if (formData.leadType === "paid-advice") {
      return { totalSteps: 3, steps: ["intent", "name", "contact"] };
    }
    return { totalSteps: 6, steps: ["intent", "timeline", "budget", "name", "contact", "time"] };
  };

  const { totalSteps, steps } = getStepConfig();

  // Rotate testimonials every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const validateStep = (): boolean => {
    const currentStep = steps[step];
    switch (currentStep) {
      case "intent":
        return formData.leadType !== "";
      case "timeline":
        return formData.timeline !== "";
      case "budget":
        return formData.budget !== "";
      case "name":
        return formData.firstName.trim().length >= 2;
      case "contact":
        const validPhone = /^\d{10,}$/.test(formData.phone.replace(/\D/g, ''));
        const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
        return validPhone && validEmail;
      case "time":
        return formData.preferredTime !== "";
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (validateStep()) {
      if (step < totalSteps - 1) {
        setDirection(1);
        setStep(step + 1);
      } else {
        handleSubmit();
      }
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setDirection(-1);
      setStep(step - 1);
    }
  };

  // Auto-advance for selection steps
  const handleOptionSelect = (field: keyof FormData, value: string, autoAdvance = true) => {
    setFormData({ ...formData, [field]: value });
    if (autoAdvance) {
      setTimeout(() => {
        if (step < totalSteps - 1) {
          setDirection(1);
          setStep(step + 1);
        } else {
          handleSubmit();
        }
      }, 300);
    }
  };

  const handleLeadTypeSelect = (value: LeadType) => {
    setFormData({ ...formData, leadType: value, timeline: "", budget: "", preferredTime: "" });
    setTimeout(() => {
      setDirection(1);
      setStep(1);
    }, 300);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    
    if (Math.abs(diff) > SWIPE_THRESHOLD) {
      if (diff > 0 && validateStep()) {
        handleNext();
      } else if (diff < 0 && step > 0) {
        handleBack();
      }
    }
    
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      if (formData.leadType === "paid-advice") {
        // Redirect to Stripe checkout
        const { data, error } = await supabase.functions.invoke('create-advice-payment', {
          body: {
            firstName: formData.firstName.trim(),
            lastName: "", // No longer collecting
            email: formData.email.trim(),
            phone: formData.phone.trim(),
            timeline: formData.timeline,
            budget: formData.budget,
          }
        });

        if (error) throw error;
        if (data?.url) {
          window.location.href = data.url;
          return;
        }
      } else {
        // Free lead capture
        const { error } = await supabase.functions.invoke('capture-lead', {
          body: {
            firstName: formData.firstName.trim(),
            lastName: "", // No longer collecting
            email: formData.email.trim(),
            phone: formData.phone.trim(),
            buyerType: formData.leadType,
            leadSource: "social-media-booking",
            timeline: formData.timeline,
            budget: formData.budget,
          }
        });

        if (error) throw error;
        setIsSuccess(true);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Something went wrong",
        description: "Please try again or call us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && validateStep()) {
      handleNext();
    }
  };

  // Scroll form into view when keyboard opens
  const handleInputFocus = () => {
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 300);
  };

  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isSuccess]);

  // Success screen
  if (isSuccess) {
    return (
      <div className="min-h-screen min-h-[100dvh] bg-background flex flex-col items-center justify-center p-6">
        <Helmet>
          <title>{isPaidSuccess ? "Payment Confirmed" : "Booking Confirmed"} | Presale with Uzair</title>
        </Helmet>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="text-center"
        >
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-primary/20 flex items-center justify-center">
            <CheckCircle className="w-12 h-12 text-primary" />
          </div>
          {isPaidSuccess ? (
            <>
              <h1 className="text-3xl font-bold text-foreground mb-3">Payment Confirmed!</h1>
              <p className="text-muted-foreground text-lg mb-2">
                Your consultation is booked.
              </p>
              <p className="text-muted-foreground text-sm">
                I'll reach out within 24 hours to schedule our call.
              </p>
            </>
          ) : (
            <>
              <h1 className="text-3xl font-bold text-foreground mb-3">You're All Set!</h1>
              <p className="text-muted-foreground text-lg mb-2">
                I'll reach out within 24 hours to discuss your {formData.leadType === "buy-presale" ? "presale search" : "assignment"}.
              </p>
              <p className="text-muted-foreground text-sm">
                Preferred time: <span className="text-primary font-medium">{timeOptions.find(t => t.value === formData.preferredTime)?.label}</span>
              </p>
            </>
          )}
        </motion.div>
      </div>
    );
  }

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 100 : -100, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -100 : 100, opacity: 0 }),
  };

  const renderStepContent = () => {
    const currentStep = steps[step];

    switch (currentStep) {
      case "intent":
        return (
          <motion.div
            key="intent"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-foreground mb-2">How can I help?</h2>
              <p className="text-muted-foreground">Select what best describes you</p>
            </div>
            <div className="space-y-3">
              {leadTypeOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleLeadTypeSelect(option.value)}
                  className={`w-full p-5 rounded-xl border-2 transition-all duration-200 text-left ${
                    formData.leadType === option.value
                      ? "border-primary bg-primary/10 scale-[0.98]"
                      : "border-border bg-card hover:border-primary/50 active:scale-[0.98]"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className="text-3xl">{option.emoji}</span>
                      <div>
                        <span className="text-foreground font-semibold text-lg block">{option.label}</span>
                        <span className="text-muted-foreground text-sm">{option.subtext}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {option.isFree ? (
                        <span className="text-xs bg-green-500/20 text-green-600 px-2.5 py-1 rounded-full font-medium">FREE</span>
                      ) : (
                        <span className="text-xs bg-primary/20 text-primary px-2.5 py-1 rounded-full font-medium">{option.price}</span>
                      )}
                      <ChevronRight className="w-5 h-5 text-muted-foreground" />
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        );

      case "timeline":
        return (
          <motion.div
            key="timeline"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="text-center mb-6">
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
                <Calendar className="w-7 h-7 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">
                {formData.leadType === "buy-presale" ? "When are you looking to buy?" : "When do you need to sell?"}
              </h2>
              <p className="text-muted-foreground mt-1">This helps me find the right options</p>
            </div>
            <div className="space-y-3">
              {timelineOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleOptionSelect("timeline", option.value)}
                  className={`w-full p-4 rounded-xl border-2 transition-all duration-200 flex items-center gap-4 ${
                    formData.timeline === option.value
                      ? "border-primary bg-primary/10 scale-[0.98]"
                      : "border-border bg-card hover:border-primary/50 active:scale-[0.98]"
                  }`}
                >
                  <span className="text-2xl">{option.emoji}</span>
                  <span className="text-foreground font-medium">{option.label}</span>
                </button>
              ))}
            </div>
          </motion.div>
        );

      case "budget":
        return (
          <motion.div
            key="budget"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="text-center mb-6">
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
                <DollarSign className="w-7 h-7 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">
                {formData.leadType === "buy-presale" ? "What's your budget range?" : "What's your assignment value?"}
              </h2>
              <p className="text-muted-foreground mt-1">Helps me match you with the right projects</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {budgetOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleOptionSelect("budget", option.value)}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 text-center active:scale-[0.97] ${
                    formData.budget === option.value
                      ? "border-primary bg-primary/10"
                      : "border-border bg-card hover:border-primary/50"
                  }`}
                >
                  <span className="text-2xl mb-1 block">{option.emoji}</span>
                  <span className="text-foreground font-medium text-sm">{option.label}</span>
                </button>
              ))}
            </div>
          </motion.div>
        );

      case "name":
        return (
          <motion.div
            key="name"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="text-center mb-6">
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
                <User className="w-7 h-7 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">Nice to meet you!</h2>
              <p className="text-muted-foreground mt-1">What should I call you?</p>
            </div>
            <div ref={formRef}>
              <Input
                type="text"
                placeholder="Your first name"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                onKeyDown={handleKeyDown}
                onFocus={handleInputFocus}
                className="h-14 text-lg bg-card border-border focus:border-primary text-foreground placeholder:text-muted-foreground text-center"
                autoFocus
                autoComplete="given-name"
              />
            </div>
          </motion.div>
        );

      case "contact":
        const isPaidPath = formData.leadType === "paid-advice";
        return (
          <motion.div
            key="contact"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="text-center mb-6">
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
                <Mail className="w-7 h-7 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">Great, {formData.firstName}!</h2>
              <p className="text-muted-foreground mt-1">How can I reach you?</p>
            </div>
            <div className="space-y-3" ref={formRef}>
              <Input
                type="tel"
                placeholder="Phone number"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                onKeyDown={handleKeyDown}
                onFocus={handleInputFocus}
                className="h-14 text-lg bg-card border-border focus:border-primary text-foreground placeholder:text-muted-foreground"
                autoFocus
                autoComplete="tel"
              />
              <Input
                type="email"
                placeholder="Email address"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                onKeyDown={handleKeyDown}
                onFocus={handleInputFocus}
                className="h-14 text-lg bg-card border-border focus:border-primary text-foreground placeholder:text-muted-foreground"
                autoComplete="email"
              />
            </div>
            {isPaidPath && (
              <div className="bg-muted/50 rounded-xl p-4 mt-4">
                <div className="flex items-center gap-3 mb-2">
                  <DollarSign className="w-5 h-5 text-primary" />
                  <span className="font-semibold text-foreground">30-Minute Strategy Call</span>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  You'll be redirected to secure payment after this step.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground text-sm">Consultation Fee</span>
                  <span className="text-foreground font-bold text-lg">$250 CAD</span>
                </div>
              </div>
            )}
          </motion.div>
        );

      case "time":
        return (
          <motion.div
            key="time"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="text-center mb-6">
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
                <Clock className="w-7 h-7 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">Best time to call?</h2>
              <p className="text-muted-foreground mt-1">I'll work around your schedule</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {timeOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleOptionSelect("preferredTime", option.value)}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 text-left active:scale-[0.97] ${
                    formData.preferredTime === option.value
                      ? "border-primary bg-primary/10"
                      : "border-border bg-card hover:border-primary/50"
                  }`}
                >
                  <span className="text-2xl mb-1 block">{option.emoji}</span>
                  <span className="text-foreground font-medium text-sm block">{option.label}</span>
                  <span className="text-muted-foreground text-xs">{option.sub}</span>
                </button>
              ))}
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  // Determine if we need a Continue button (input steps only)
  const currentStepType = steps[step];
  const isInputStep = currentStepType === "name" || currentStepType === "contact";
  const showContinueButton = isInputStep;

  // Custom button text for paid advice path
  const getButtonText = () => {
    if (formData.leadType === "paid-advice" && currentStepType === "contact") {
      return "Continue to Payment";
    }
    return "Continue";
  };

  return (
    <div className="min-h-screen min-h-[100dvh] bg-background flex flex-col relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl" />
      </div>
      <Helmet>
        <title>Book a Call | Presale with Uzair</title>
        <meta name="description" content="Book a free consultation to discuss presale opportunities in Metro Vancouver. Get honest advice before you buy or sell." />
        <meta name="robots" content="noindex, nofollow" />
        <meta name="viewport" content="width=device-width, initial-scale=1, interactive-widget=resizes-content" />
      </Helmet>

      {/* Header */}
      <div className="pt-4 pb-2 px-6 relative z-10">
        <div className="flex items-center justify-center mb-4">
          <img src={logo} alt="Presale with Uzair" className="h-8" />
        </div>
        {step === 0 && (
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <p className="text-primary font-semibold text-sm uppercase tracking-wide mb-1">No Hype. No Pressure.</p>
            <h1 className="text-xl font-bold text-foreground">Just Honest Advice</h1>
          </motion.div>
        )}
      </div>

      {/* Testimonial - Only show on first step */}
      {step === 0 && (
        <div className="px-6 mb-2 relative z-10">
          <motion.div 
            className="bg-card/80 backdrop-blur-sm border border-border rounded-xl p-4"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                <Quote className="w-4 h-4 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={testimonialIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-sm text-foreground leading-relaxed">
                      "{testimonials[testimonialIndex].quote}"
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs font-medium text-primary">{testimonials[testimonialIndex].name}</span>
                      <span className="text-xs text-muted-foreground">• {testimonials[testimonialIndex].type}</span>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
            <div className="flex items-center justify-center gap-4 mt-3 pt-3 border-t border-border">
              <div className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                <span className="text-xs text-muted-foreground">31+ 5-star reviews</span>
              </div>
              <div className="w-px h-3 bg-border" />
              <span className="text-xs text-muted-foreground">300+ clients</span>
            </div>
          </motion.div>
        </div>
      )}

      {/* Progress Bar - Show after first step */}
      {step > 0 && (
        <div className="px-6 py-3 relative z-10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-muted-foreground">Step {step + 1} of {totalSteps}</span>
            <span className="text-xs text-primary font-medium">{Math.round(((step + 1) / totalSteps) * 100)}%</span>
          </div>
          <div className="h-1.5 bg-muted rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-primary"
              initial={{ width: 0 }}
              animate={{ width: `${((step + 1) / totalSteps) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      )}

      {/* Form Content */}
      <div 
        className="flex-1 px-6 py-4 touch-pan-y relative z-10"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <AnimatePresence mode="wait" custom={direction}>
          {renderStepContent()}
        </AnimatePresence>
      </div>

      {/* Navigation - Only show for input steps */}
      {showContinueButton && (
        <div className="p-6 pb-8 space-y-3 relative z-10 bg-gradient-to-t from-background via-background to-transparent">
          <Button
            onClick={handleNext}
            disabled={!validateStep() || isSubmitting}
            className="w-full h-14 text-lg font-semibold bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            <span className="flex items-center gap-2">
              {isSubmitting ? "Processing..." : getButtonText()}
              {!isSubmitting && <ChevronRight className="w-5 h-5" />}
            </span>
          </Button>

          {step > 0 && (
            <Button
              variant="ghost"
              onClick={handleBack}
              className="w-full h-10 text-muted-foreground hover:text-foreground"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Back
            </Button>
          )}
        </div>
      )}

      {/* Back button for selection steps (not first step) */}
      {!showContinueButton && step > 0 && (
        <div className="p-6 pb-8 relative z-10">
          <Button
            variant="ghost"
            onClick={handleBack}
            className="w-full h-10 text-muted-foreground hover:text-foreground"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back
          </Button>
        </div>
      )}

      {/* Loading overlay */}
      {isSubmitting && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-10 h-10 border-3 border-primary border-t-transparent rounded-full"
          />
        </div>
      )}
    </div>
  );
};

export default Book;
