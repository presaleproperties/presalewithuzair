import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Home, TrendingUp } from "lucide-react";
import heroImage from "@/assets/uzair-hero.jpeg";

type AudienceType = "buyer" | "investor";

const heroContent = {
  buyer: {
    headline: "Buy Your First Presale Condo — Without Overpaying or Getting Burned",
    subheadline: "I help first-time buyers in BC secure the right presale condo with low deposits, clear guidance, and zero pressure — so you don't make costly mistakes.",
    cta: "Get the Free Presale Buyer Guide",
    microTrust: "Free • No obligation • Built for first-time buyers",
  },
  investor: {
    headline: "Secure the Right Presale Condo Before the Public Gets Access",
    subheadline: "I help investors identify under-market presale opportunities with early access, pricing strategy, and a clear long-term exit plan — not hype.",
    cta: "Get the Presale Investment Guide",
    microTrust: "Free • Data-driven • Investor-focused",
  },
};

export const HeroSection = () => {
  const [audience, setAudience] = useState<AudienceType>("buyer");
  const content = heroContent[audience];

  return (
    <section className="relative min-h-screen">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary/30" />
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `linear-gradient(hsl(var(--primary) / 0.3) 1px, transparent 1px),
                          linear-gradient(90deg, hsl(var(--primary) / 0.3) 1px, transparent 1px)`,
        backgroundSize: '60px 60px'
      }} />

      <div className="relative z-10 container-xl min-h-screen px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-16 items-center min-h-screen pt-20 sm:pt-24 pb-8 sm:pb-16">
          
          {/* Left Content */}
          <div className="order-2 lg:order-1 space-y-5 sm:space-y-8">
            <div className="space-y-4 sm:space-y-6">
              
              {/* Toggle Selector */}
              <div className="inline-flex rounded-full p-1 bg-secondary/50 border border-border/50 animate-fade-up">
                <button
                  onClick={() => setAudience("buyer")}
                  className={`flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
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
                  onClick={() => setAudience("investor")}
                  className={`flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                    audience === "investor"
                      ? "bg-primary text-primary-foreground shadow-lg"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <TrendingUp className="h-4 w-4" />
                  <span>Investor</span>
                </button>
              </div>
              
              {/* Dynamic Headline */}
              <h1 
                key={audience + "-headline"}
                className="font-display text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-bold leading-[1.15] sm:leading-[1.1] animate-fade-up"
              >
                <span className="text-foreground">{content.headline}</span>
              </h1>

              {/* Dynamic Sub-headline */}
              <p 
                key={audience + "-subheadline"}
                className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-xl animate-fade-up"
              >
                {content.subheadline}
              </p>
            </div>

            {/* CTA Section */}
            <div className="space-y-3 animate-fade-up">
              <Button 
                key={audience + "-cta"}
                variant="hero" 
                size="xl" 
                className="gap-2 w-full sm:w-auto text-sm sm:text-base h-12 sm:h-14"
                asChild
              >
                <a href="#lead-form">
                  {content.cta}
                  <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
                </a>
              </Button>
              
              {/* Micro-trust */}
              <p 
                key={audience + "-trust"}
                className="text-xs sm:text-sm text-muted-foreground"
              >
                {content.microTrust}
              </p>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-6 sm:pt-8 border-t border-border/50 animate-fade-up">
              <div className="text-center sm:text-left">
                <p className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-gradient">300+</p>
                <p className="text-xs text-muted-foreground mt-0.5 sm:mt-1">Presale Units</p>
              </div>
              <div className="text-center sm:text-left">
                <p className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-gradient">$200M+</p>
                <p className="text-xs text-muted-foreground mt-0.5 sm:mt-1">Presales Closed</p>
              </div>
              <div className="text-center sm:text-left">
                <p className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-gradient">$26M+</p>
                <p className="text-xs text-muted-foreground mt-0.5 sm:mt-1">Assignments</p>
              </div>
              <div className="text-center sm:text-left">
                <p className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-gradient">4+ Yrs</p>
                <p className="text-xs text-muted-foreground mt-0.5 sm:mt-1">Presale Focus</p>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="order-1 lg:order-2 relative animate-fade-up delay-200">
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-48 sm:w-72 h-48 sm:h-72 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-8 -left-8 w-32 sm:w-48 h-32 sm:h-48 bg-accent/10 rounded-full blur-2xl" />
            
            {/* Main image container */}
            <div className="relative">
              <div className="absolute inset-0 border-2 border-primary/20 rounded-xl sm:rounded-2xl translate-x-2 translate-y-2 sm:translate-x-4 sm:translate-y-4" />
              
              <div className="relative rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={heroImage}
                  alt="Uzair Muhammad - Vancouver's Top Presale Expert"
                  className="w-full aspect-[4/5] sm:aspect-[4/5] object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
