import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, CheckCircle, Home, TrendingUp, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

type AudienceType = "buyer" | "investor";

const emailSchema = z.string().trim().email({ message: "Please enter a valid email" }).max(255);

const benefits = {
  buyer: [
    "Simple presale buying checklist",
    "5 red flags that cost buyers $50K+",
    "How to pick the right deposit structure",
    "Questions to ask before you sign",
  ],
  investor: [
    "How to calculate real ROI on presales",
    "Assignment clause cheat sheet",
    "When to buy (and when to wait)",
    "Low-deposit strategies that work",
  ],
};

export const LeadCaptureSection = () => {
  const [audience, setAudience] = useState<AudienceType>("buyer");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validation = emailSchema.safeParse(email);
    if (!validation.success) {
      toast({
        title: "Invalid email",
        description: validation.error.errors[0].message,
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call - replace with actual lead capture integration
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    setIsSubmitting(false);
    setIsSuccess(true);
    
    toast({
      title: "You're in!",
      description: "Check your email for the guide.",
    });
  };

  if (isSuccess) {
    return (
      <section id="lead-form" className="py-16 sm:py-24 bg-card">
        <div className="container-xl px-4 sm:px-6">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/20 flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-primary" />
            </div>
            <h2 className="font-display text-2xl sm:text-4xl font-bold text-foreground uppercase tracking-tight mb-4">
              Check Your <span className="text-gradient">Inbox</span>
            </h2>
            <p className="text-foreground/70 mb-6">
              Your free guide is on its way.
            </p>
            <p className="text-sm text-muted-foreground">
              Didn't receive it? Check your spam folder or contact us at info@meetuzair.com
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="lead-form" className="py-16 sm:py-24 bg-card relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-3xl" />
      
      <div className="container-xl px-4 sm:px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10 sm:mb-12">
            <p className="section-label mb-3 sm:mb-4">Free Download</p>
            <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-bold text-foreground uppercase tracking-tight mb-4">
              Get the <span className="text-gradient">Free Guide</span>
            </h2>
            <p className="text-foreground/70 max-w-xl mx-auto">
              The same checklist I use with my clients. Yours free.
            </p>
          </div>

          <div className="bg-background rounded-2xl border border-border p-6 sm:p-10">
            {/* Toggle */}
            <div className="flex justify-center mb-8">
              <div className="inline-flex rounded-full p-1 bg-secondary/50 border border-border/50">
                <button
                  type="button"
                  onClick={() => setAudience("buyer")}
                  className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                    audience === "buyer"
                      ? "bg-primary text-primary-foreground shadow-lg"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Home className="h-4 w-4" />
                  <span className="hidden sm:inline">First-Time Buyer</span>
                  <span className="sm:hidden">Buyer</span>
                </button>
                <button
                  type="button"
                  onClick={() => setAudience("investor")}
                  className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                    audience === "investor"
                      ? "bg-primary text-primary-foreground shadow-lg"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <TrendingUp className="h-4 w-4" />
                  <span>Investor</span>
                </button>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Benefits */}
              <div>
                <h3 className="font-display text-lg sm:text-xl font-bold text-foreground mb-4 uppercase tracking-tight">
                  What You Get
                </h3>
                <ul className="space-y-3">
                  {benefits[audience].map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3 text-sm text-foreground/80">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      {benefit}
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-xs text-muted-foreground">
                  No spam. Unsubscribe anytime.
                </p>
              </div>

              {/* Form */}
              <div>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                      Email Address
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-12 text-base bg-card border-border"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="hero"
                    size="xl"
                    className="w-full gap-2 h-12 sm:h-14"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Get the Free Guide
                        <ArrowRight className="h-5 w-5" />
                      </>
                    )}
                  </Button>

                  <p className="text-center text-xs text-muted-foreground">
                    Free • No obligation • {audience === "buyer" ? "Built for first-time buyers" : "Data-driven for investors"}
                  </p>
                </form>

                {/* Trust indicators */}
                <div className="mt-6 pt-6 border-t border-border">
                  <div className="flex items-center justify-center gap-6 text-xs text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-primary" />
                      300+ Presale Units
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-primary" />
                      $200M+ Closed
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
