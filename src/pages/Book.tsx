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
  Star, 
  Quote,
  DollarSign,
  Calendar,
  MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useHapticFeedback } from "@/hooks/useHapticFeedback";
import { useCalCom } from "@/hooks/useCalCom";
import logo from "@/assets/logo.png";
import uzairPhoto from "@/assets/uzair-headshot.jpeg";

type LeadType = "buy-presale" | "sell-assignment" | "paid-advice";

type FormData = {
  firstName: string;
  phone: string;
  email: string;
  leadType: LeadType | "";
  timeline: string;
  problemDescription: string;
};

const leadTypeOptions = [
  { 
    value: "buy-presale" as LeadType, 
    label: "I want to buy a Presale", 
    subtext: "Condos, townhomes & more",
    emoji: "🏠",
    showBadge: false 
  },
  { 
    value: "sell-assignment" as LeadType, 
    label: "I want to sell an Assignment", 
    subtext: "Get help assigning your contract",
    emoji: "🔄",
    showBadge: false 
  },
  { 
    value: "paid-advice" as LeadType, 
    label: "I need Expert Advice", 
    subtext: "Investment or contract help",
    emoji: "💡",
    showBadge: true,
    price: "$250" 
  },
];

const GOOGLE_REVIEWS_URL = "https://share.google/qgUTcQF2kOnjBBPr7";

const testimonials = [
  { name: "Michelle K.", quote: "Uzair made my first presale purchase completely stress-free!", type: "Buyer" },
  { name: "Ray S.", quote: "His market knowledge saved me from a bad investment.", type: "Investor" },
  { name: "Anish P.", quote: "Honest advice that actually helped me make the right decision.", type: "Buyer" },
];

const buyTimelineOptions = [
  { value: "ready-now", label: "Ready to buy now", emoji: "🚀" },
  { value: "within-3-months", label: "Under 3 months", emoji: "📅" },
  { value: "just-browsing", label: "Just looking", emoji: "🔍", isDisqualifying: true },
];

const sellTimelineOptions = [
  { value: "ready-now", label: "Ready to sell now", emoji: "🚀" },
  { value: "within-3-months", label: "Under 3 months", emoji: "📅" },
  { value: "just-browsing", label: "Just looking", emoji: "🔍", isDisqualifying: true },
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
    problemDescription: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isDisqualified, setIsDisqualified] = useState(false);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const { toast } = useToast();
  const haptic = useHapticFeedback();
  const { openCalCom, isCalLoading } = useCalCom();
  const formRef = useRef<HTMLDivElement>(null);

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Check for payment cancel in URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
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
  // Buy/Sell: Intent(0) → Timeline(1) → Contact(2)
  // Paid Advice: Intent(0) → Fee Explanation(1) → Problem(2) → Contact(3)
  const getStepConfig = () => {
    if (formData.leadType === "paid-advice") {
      return { totalSteps: 4, steps: ["intent", "fee-explanation", "problem", "contact"] };
    }
    return { totalSteps: 3, steps: ["intent", "timeline", "contact"] };
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
      case "fee-explanation":
        return true; // Always valid, user just needs to click continue
      case "timeline":
        return formData.timeline !== "";
      case "problem":
        return formData.problemDescription.trim().length >= 10;
      case "contact":
        const validPhone = /^\d{10,}$/.test(formData.phone.replace(/\D/g, ''));
        const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
        const validName = formData.firstName.trim().length >= 2;
        return validPhone && validEmail && validName;
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
    haptic.light();
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
    haptic.medium();
    setFormData({ 
      ...formData, 
      leadType: value, 
      timeline: "", 
      problemDescription: "",
    });
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
            lastName: "",
            email: formData.email.trim(),
            phone: formData.phone.trim(),
            problemDescription: formData.problemDescription.trim(),
          }
        });

        if (error) throw error;
        if (data?.url) {
          window.location.href = data.url;
          return;
        }
      } else {
        // Free lead capture → then open Calendly
        const { error } = await supabase.functions.invoke('capture-lead', {
          body: {
            firstName: formData.firstName.trim(),
            lastName: "",
            email: formData.email.trim(),
            phone: formData.phone.trim(),
            buyerType: formData.leadType,
            leadSource: "social-media-booking",
            timeline: formData.timeline,
          }
        });

        if (error) throw error;

        haptic.success();
        setIsSuccess(true);
        
        // Open Cal.com popup with prefilled data
        setTimeout(() => {
          openCalCom({ 
            name: formData.firstName.trim(), 
            email: formData.email.trim() 
          });
        }, 500);
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

  // Success screen (only for free leads, paid goes to /payment-success)
  if (isSuccess) {
    const whatsappNumber = "16722581100";
    const whatsappMessage = encodeURIComponent("Hi Uzair! I just booked a call through your website and wanted to connect.");
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
    
    return (
      <div className="min-h-screen min-h-[100dvh] bg-background flex flex-col items-center justify-center p-6">
        <Helmet>
          <title>Booking Confirmed | Presale with Uzair</title>
        </Helmet>
        
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="text-center max-w-sm"
        >
          {/* Profile photo */}
          <div className="w-24 h-24 mx-auto mb-5 rounded-full overflow-hidden border-2 border-primary/50 shadow-lg shadow-primary/20">
            <img 
              src={uzairPhoto} 
              alt="Uzair" 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
            <CheckCircle className="w-8 h-8 text-primary" />
          </div>
          
          <h1 className="text-2xl font-bold text-foreground mb-3">You're All Set!</h1>
          
          <p className="text-muted-foreground text-lg mb-2">
            I look forward to speaking with you.
          </p>
          
          <p className="text-sm text-muted-foreground mb-6">
            Pick a time in the Cal.com popup, or use the button below if it didn't open.
          </p>
          
          <Button
            onClick={() => openCalCom({ name: formData.firstName.trim(), email: formData.email.trim() })}
            disabled={isCalLoading}
            className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
          >
            {isCalLoading ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 mr-2 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
                />
                Opening calendar...
              </>
            ) : (
              <>
                <Calendar className="w-5 h-5 mr-2" />
                Pick a time
              </>
            )}
          </Button>
        </motion.div>
      </div>
    );
  }

  // Disqualification screen for browsers
  if (isDisqualified) {
    return (
      <div className="min-h-screen min-h-[100dvh] bg-background flex flex-col items-center justify-center p-6">
        <Helmet>
          <title>Not a Fit Right Now | Presale with Uzair</title>
        </Helmet>
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="text-center max-w-md"
        >
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
            <span className="text-4xl">🤝</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-3">
            Thanks for your honesty!
          </h1>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            I work best with clients who are ready to take action within the next 3 months. 
            When you're ready to get serious about buying or selling, I'd love to help.
          </p>
          <div className="bg-card border border-border rounded-xl p-4 mb-6">
            <p className="text-sm text-foreground font-medium mb-2">In the meantime:</p>
            <p className="text-sm text-muted-foreground">
              Follow me on social media for presale tips, market updates, and insights to help you prepare for when the time is right.
            </p>
          </div>
          <Button
            variant="outline"
            onClick={() => {
              setIsDisqualified(false);
              setStep(0);
              setFormData({
                firstName: "",
                phone: "",
                email: "",
                leadType: "",
                timeline: "",
                problemDescription: "",
              });
            }}
            className="w-full h-12"
          >
            Start Over
          </Button>
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
            className="space-y-3"
          >
            <div className="text-center mb-3">
              <div className="relative w-20 h-20 mx-auto mb-3">
                {/* Pulsing glow ring */}
                <motion.div
                  className="absolute inset-0 rounded-full bg-primary/40 blur-md"
                  animate={{
                    scale: [1, 1.15, 1],
                    opacity: [0.4, 0.7, 0.4],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-primary/50 shadow-lg shadow-primary/30">
                  <img 
                    src={uzairPhoto} 
                    alt="Uzair - Presale Expert" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <h2 className="text-xl font-bold text-foreground mb-1">Book a One-on-One Call</h2>
              <p className="text-muted-foreground text-sm">Select what best describes you</p>
            </div>
            <div className="space-y-2">
              {leadTypeOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleLeadTypeSelect(option.value)}
                  className={`w-full p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                    formData.leadType === option.value
                      ? "border-primary bg-primary/10 scale-[0.98]"
                      : "border-border bg-card hover:border-primary/50 active:scale-[0.98]"
                  }`}
                >
                    <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{option.emoji}</span>
                      <div>
                        <span className="text-foreground font-semibold block">{option.label}</span>
                        <span className="text-muted-foreground text-sm">{option.subtext}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {option.showBadge && option.price && (
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
        const timelineOpts = formData.leadType === "buy-presale" ? buyTimelineOptions : sellTimelineOptions;
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
                {formData.leadType === "buy-presale" ? "What's your timeline?" : "When do you need to sell?"}
              </h2>
              <p className="text-muted-foreground mt-1">This helps me prioritize your needs</p>
            </div>
            <div className="space-y-3">
              {timelineOpts.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    if (option.isDisqualifying) {
                      haptic.error();
                      setIsDisqualified(true);
                    } else {
                      handleOptionSelect("timeline", option.value);
                    }
                  }}
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

      case "fee-explanation":
        return (
          <motion.div
            key="fee-explanation"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="space-y-5"
          >
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center">
                <span className="text-3xl">🤝</span>
              </div>
              <h2 className="text-xl font-bold text-foreground mb-2">Happy to Help!</h2>
              <p className="text-muted-foreground text-sm leading-relaxed">
                I love helping buyers navigate presales and investments.
              </p>
            </div>
            
            <div className="bg-card border border-border rounded-xl p-4 space-y-3">
              <p className="text-foreground text-sm leading-relaxed">
                For personalized advice on <span className="text-primary font-medium">investment strategy</span> or <span className="text-primary font-medium">existing presale purchases</span>, I charge a small consulting fee.
              </p>
              <div className="flex items-center justify-between py-3 px-4 bg-primary/10 rounded-lg">
                <div>
                  <p className="text-foreground font-semibold">30-Minute Advisory Call</p>
                  <p className="text-muted-foreground text-xs">One-on-one expert guidance</p>
                </div>
                <span className="text-2xl font-bold text-primary">$250</span>
              </div>
              <p className="text-muted-foreground text-xs text-center">
                This ensures I can dedicate focused time to your specific situation.
              </p>
            </div>
            
            <Button
              onClick={() => {
                haptic.medium();
                setDirection(1);
                setStep(step + 1);
              }}
              className="w-full h-12 text-base font-semibold bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Sounds Good – Let's Continue
              <ChevronRight className="w-5 h-5 ml-1" />
            </Button>
            
            <p className="text-center text-xs text-muted-foreground">
              Looking to buy or sell instead? <button onClick={() => { setStep(0); setFormData({ ...formData, leadType: "" }); }} className="text-primary underline">Go back</button>
            </p>
          </motion.div>
        );

      case "problem":
        return (
          <motion.div
            key="problem"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="space-y-5"
          >
            <div className="text-center mb-4">
              <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-primary/20 flex items-center justify-center">
                <MessageSquare className="w-7 h-7 text-primary" />
              </div>
              <h2 className="text-xl font-bold text-foreground">How can I help?</h2>
              <p className="text-muted-foreground text-sm mt-1">Tell me about your situation</p>
            </div>
            <div ref={formRef}>
              <Textarea
                placeholder="Examples: I'm reviewing my presale contract and have questions about the deposit structure... I bought a presale last year and want advice on whether to assign or close... I'm considering a presale investment and need guidance..."
                value={formData.problemDescription}
                onChange={(e) => setFormData({ ...formData, problemDescription: e.target.value })}
                onFocus={handleInputFocus}
                className="min-h-[130px] text-base bg-card border-border focus:border-primary text-foreground placeholder:text-muted-foreground resize-none"
                autoFocus
              />
              <p className="text-xs text-muted-foreground mt-2">
                {formData.problemDescription.length < 10 
                  ? `At least ${10 - formData.problemDescription.length} more characters needed`
                  : "✓ Good to go!"}
              </p>
            </div>
          </motion.div>
        );

      case "contact":
        const isPaidPath = formData.leadType === "paid-advice";
        const isNameFilled = formData.firstName.trim().length >= 2;
        const isPhoneFilled = /^\d{10,}$/.test(formData.phone.replace(/\D/g, ''));
        const isEmailFilled = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
        const filledCount = [isNameFilled, isPhoneFilled, isEmailFilled].filter(Boolean).length;
        
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
                <User className="w-7 h-7 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">Almost there!</h2>
              <p className="text-muted-foreground mt-1">
                {isPaidPath ? "Enter your details to continue" : "Enter your details to schedule"}
              </p>
              
              {/* Progress indicator */}
              <div className="flex items-center justify-center gap-2 mt-4">
                {[
                  { filled: isNameFilled, label: "Name" },
                  { filled: isPhoneFilled, label: "Phone" },
                  { filled: isEmailFilled, label: "Email" },
                ].map((field, idx) => (
                  <div key={idx} className="flex items-center gap-1.5">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${
                      field.filled 
                        ? "bg-primary text-primary-foreground" 
                        : "bg-muted text-muted-foreground"
                    }`}>
                      {field.filled ? (
                        <CheckCircle className="w-4 h-4" />
                      ) : (
                        <span className="text-xs font-medium">{idx + 1}</span>
                      )}
                    </div>
                    <span className={`text-xs transition-colors ${field.filled ? "text-primary font-medium" : "text-muted-foreground"}`}>
                      {field.label}
                    </span>
                    {idx < 2 && <div className="w-4 h-px bg-border mx-1" />}
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                {filledCount === 3 ? "✓ All set!" : `${filledCount}/3 complete`}
              </p>
            </div>
            <div className="space-y-3" ref={formRef}>
              <div className="relative">
                <Input
                  type="text"
                  placeholder="First name"
                  name="given-name"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  onKeyDown={handleKeyDown}
                  onFocus={handleInputFocus}
                  className={`h-14 text-lg bg-card border-border focus:border-primary text-foreground placeholder:text-muted-foreground pr-10 ${isNameFilled ? "border-primary/50" : ""}`}
                  autoFocus
                  autoComplete="given-name"
                />
                {isNameFilled && (
                  <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
                )}
              </div>
              <div className="relative">
                <Input
                  type="tel"
                  placeholder="Phone number"
                  name="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  onKeyDown={handleKeyDown}
                  onFocus={handleInputFocus}
                  className={`h-14 text-lg bg-card border-border focus:border-primary text-foreground placeholder:text-muted-foreground pr-10 ${isPhoneFilled ? "border-primary/50" : ""}`}
                  autoComplete="tel"
                />
                {isPhoneFilled && (
                  <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
                )}
              </div>
              <div className="relative">
                <Input
                  type="email"
                  placeholder="Email address"
                  name="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  onKeyDown={handleKeyDown}
                  onFocus={handleInputFocus}
                  className={`h-14 text-lg bg-card border-border focus:border-primary text-foreground placeholder:text-muted-foreground pr-10 ${isEmailFilled ? "border-primary/50" : ""}`}
                  autoComplete="email"
                />
                {isEmailFilled && (
                  <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
                )}
              </div>
            </div>
            
            {isPaidPath && (
              <div className="bg-muted/50 rounded-xl p-4 mt-4">
                <div className="flex items-center gap-3 mb-2">
                  <DollarSign className="w-5 h-5 text-primary" />
                  <span className="font-semibold text-foreground">30-Minute Advisory Call</span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  Next: Secure payment via Stripe
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Total:</span>
                  <span className="text-xl font-bold text-primary">$250 CAD</span>
                </div>
              </div>
            )}
            
            {!isPaidPath && (
              <div className="bg-muted/50 rounded-xl p-4 mt-4">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-primary" />
                  <div>
                    <span className="font-semibold text-foreground block">Free Discovery Call</span>
                    <span className="text-sm text-muted-foreground">Pick your time in Calendly next</span>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        );

      default:
        return null;
    }
  };

  // Determine if we need a Continue button
  const currentStepType = steps[step];
  const isInputStep = currentStepType === "contact" || currentStepType === "problem";
  const showContinueButton = isInputStep;

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
      <div className="pt-3 pb-1 px-6 relative z-10">
        <div className="flex items-center justify-center mb-2">
          <img src={logo} alt="Presale with Uzair" className="h-7" />
        </div>
        {step === 0 && (
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <p className="text-primary font-semibold text-xs uppercase tracking-wide mb-0.5">No Hype. No Pressure.</p>
            <h1 className="text-lg font-bold text-foreground">Just Honest Advice</h1>
          </motion.div>
        )}
      </div>

      {/* Testimonial - Only show on first step */}
      {step === 0 && (
        <div className="px-6 mb-1 relative z-10">
          <a 
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <motion.div 
              className="bg-card/80 backdrop-blur-sm border border-border rounded-xl p-3 active:scale-[0.98] transition-transform"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-start gap-2">
                <div className="flex-shrink-0 w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center">
                  <Quote className="w-3.5 h-3.5 text-primary" />
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
                      <p className="text-xs text-foreground leading-relaxed">
                        "{testimonials[testimonialIndex].quote}"
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs font-medium text-primary">{testimonials[testimonialIndex].name}</span>
                        <span className="text-xs text-muted-foreground">• {testimonials[testimonialIndex].type}</span>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
              <div className="flex items-center justify-center gap-3 mt-2 pt-2 border-t border-border">
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                  <span className="text-xs text-muted-foreground">31+ reviews</span>
                </div>
                <div className="w-px h-3 bg-border" />
                <span className="text-xs text-muted-foreground">300+ clients</span>
                <div className="w-px h-3 bg-border" />
                <span className="text-xs text-primary font-medium">Google →</span>
              </div>
            </motion.div>
          </a>
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
        className="flex-1 px-6 py-2 touch-pan-y relative z-10 overflow-y-auto"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <AnimatePresence mode="wait" custom={direction}>
          {renderStepContent()}
        </AnimatePresence>
      </div>

      {/* Navigation - Only show for input steps (contact/problem) */}
      {showContinueButton && (
        <div className="px-6 pt-4 pb-[calc(env(safe-area-inset-bottom)+1.5rem)] space-y-2 relative z-10 bg-gradient-to-t from-background via-background to-transparent">
          <Button
            onClick={handleNext}
            disabled={!validateStep() || isSubmitting}
            className="w-full h-14 text-lg font-semibold bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25"
          >
            <span className="flex items-center gap-2">
              {isSubmitting ? "Processing..." : currentStepType === "contact" ? (formData.leadType === "paid-advice" ? "Continue to Payment" : "Schedule Your Call") : "Continue"}
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

      {/* Back button for selection steps */}
      {!showContinueButton && step > 0 && (
        <div className="px-6 pb-[calc(env(safe-area-inset-bottom)+1rem)] relative z-10">
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
