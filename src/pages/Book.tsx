import { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, Calendar, CheckCircle, User, Phone, Mail, Target, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import logo from "@/assets/logo.png";

type FormData = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  intent: string;
  preferredTime: string;
};

const intentOptions = [
  { value: "first-time-buyer", label: "First-Time Buyer", emoji: "🏠" },
  { value: "investor", label: "Investor", emoji: "📈" },
  { value: "upgrading", label: "Upgrading Home", emoji: "⬆️" },
  { value: "exploring", label: "Just Exploring", emoji: "🔍" },
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
    lastName: "",
    phone: "",
    email: "",
    intent: "",
    preferredTime: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const totalSteps = 5;

  const validateStep = (): boolean => {
    switch (step) {
      case 0:
        return formData.firstName.trim().length >= 2 && formData.lastName.trim().length >= 2;
      case 1:
        return /^\d{10,}$/.test(formData.phone.replace(/\D/g, ''));
      case 2:
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
      case 3:
        return formData.intent !== "";
      case 4:
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
        // Swipe left - go next
        handleNext();
      } else if (diff < 0 && step > 0) {
        // Swipe right - go back
        handleBack();
      }
    }
    
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase.functions.invoke('capture-lead', {
        body: {
          firstName: formData.firstName.trim(),
          lastName: formData.lastName.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          buyerType: formData.intent,
          leadSource: "social-media-booking",
        }
      });

      if (error) throw error;

      setIsSuccess(true);
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

  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isSuccess]);

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
        <Helmet>
          <title>Booking Confirmed | Presale with Uzair</title>
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
          <h1 className="text-3xl font-bold text-foreground mb-3">You're All Set!</h1>
          <p className="text-muted-foreground text-lg mb-2">
            I'll reach out within 24 hours to confirm your appointment.
          </p>
          <p className="text-muted-foreground text-sm">
            Preferred time: <span className="text-primary font-medium">{timeOptions.find(t => t.value === formData.preferredTime)?.label}</span>
          </p>
        </motion.div>
      </div>
    );
  }

  const renderStepContent = () => {
    const slideVariants = {
      enter: (dir: number) => ({ x: dir > 0 ? 100 : -100, opacity: 0 }),
      center: { x: 0, opacity: 1 },
      exit: (dir: number) => ({ x: dir > 0 ? -100 : 100, opacity: 0 }),
    };

    switch (step) {
      case 0:
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
            <div className="text-center mb-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
                <User className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">What's your name?</h2>
              <p className="text-muted-foreground mt-2">Let's get to know each other</p>
            </div>
            <div className="space-y-4">
              <Input
                type="text"
                placeholder="First name"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                onKeyDown={handleKeyDown}
                className="h-14 text-lg bg-card border-border focus:border-primary text-foreground placeholder:text-muted-foreground"
                autoFocus
              />
              <Input
                type="text"
                placeholder="Last name"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                onKeyDown={handleKeyDown}
                className="h-14 text-lg bg-card border-border focus:border-primary text-foreground placeholder:text-muted-foreground"
              />
            </div>
          </motion.div>
        );

      case 1:
        return (
          <motion.div
            key="phone"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
                <Phone className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">Your phone number</h2>
              <p className="text-muted-foreground mt-2">Best way to reach you</p>
            </div>
            <Input
              type="tel"
              placeholder="(604) 123-4567"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              onKeyDown={handleKeyDown}
              className="h-14 text-lg bg-card border-border focus:border-primary text-foreground placeholder:text-muted-foreground"
              autoFocus
            />
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            key="email"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
                <Mail className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">Your email</h2>
              <p className="text-muted-foreground mt-2">For appointment confirmation</p>
            </div>
            <Input
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              onKeyDown={handleKeyDown}
              className="h-14 text-lg bg-card border-border focus:border-primary text-foreground placeholder:text-muted-foreground"
              autoFocus
            />
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            key="intent"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
                <Target className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">What brings you here?</h2>
              <p className="text-muted-foreground mt-2">Help me prepare for our call</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {intentOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setFormData({ ...formData, intent: option.value })}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                    formData.intent === option.value
                      ? "border-primary bg-primary/10"
                      : "border-border bg-card hover:border-primary/50"
                  }`}
                >
                  <span className="text-2xl mb-2 block">{option.emoji}</span>
                  <span className="text-foreground font-medium text-sm">{option.label}</span>
                </button>
              ))}
            </div>
          </motion.div>
        );

      case 4:
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
            <div className="text-center mb-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
                <Clock className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">Best time to call?</h2>
              <p className="text-muted-foreground mt-2">I'll work around your schedule</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {timeOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setFormData({ ...formData, preferredTime: option.value })}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 text-left ${
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

  return (
    <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl" />
      </div>
      <Helmet>
        <title>Book a Call | Presale with Uzair</title>
        <meta name="description" content="Book a free consultation to discuss presale opportunities in Metro Vancouver. Get honest advice before you buy." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      {/* Header */}
      <div className="p-4 flex items-center justify-center">
        <img src={logo} alt="Presale with Uzair" className="h-10" />
      </div>

      {/* Progress Bar */}
      <div className="px-6 mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">Step {step + 1} of {totalSteps}</span>
          <span className="text-sm text-primary font-medium">{Math.round(((step + 1) / totalSteps) * 100)}%</span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-primary"
            initial={{ width: 0 }}
            animate={{ width: `${((step + 1) / totalSteps) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Form Content */}
      <div 
        className="flex-1 px-6 touch-pan-y"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <AnimatePresence mode="wait" custom={direction}>
          {renderStepContent()}
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="p-6 pb-8 space-y-3">
        <Button
          onClick={handleNext}
          disabled={!validateStep() || isSubmitting}
          className="w-full h-14 text-lg font-semibold bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
              />
              Booking...
            </span>
          ) : step === totalSteps - 1 ? (
            <span className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Book My Call
            </span>
          ) : (
            <span className="flex items-center gap-2">
              Continue
              <ChevronRight className="w-5 h-5" />
            </span>
          )}
        </Button>

        {step > 0 && (
          <Button
            variant="ghost"
            onClick={handleBack}
            className="w-full h-12 text-muted-foreground hover:text-foreground"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back
          </Button>
        )}
      </div>
    </div>
  );
};

export default Book;
