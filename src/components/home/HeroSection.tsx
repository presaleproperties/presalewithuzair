import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Home, TrendingUp } from "lucide-react";
import heroImage from "@/assets/uzair-hero.jpeg";

type AudienceType = "buyer" | "investor";

const heroContent = {
  buyer: {
    label: "PRESALE EXPERT",
    headlinePart1: "BUY YOUR FIRST",
    headlinePart2: "PRESALE CONDO",
    headlineAccent: "WITHOUT GETTING",
    headlineAccent2: "BURNED",
    subheadlineBold: "I help first-time buyers in BC",
    subheadlineNormal: " secure the right presale condo with low deposits, clear guidance, and zero pressure — so you don't make costly mistakes.",
    description: "Get expert guidance on pricing, deposits, and developer reputation. Navigate the presale process with confidence.",
    cta: "Work With Me",
    microTrust: "Free • No obligation • Built for first-time buyers",
  },
  investor: {
    label: "PRESALE EXPERT",
    headlinePart1: "SECURE THE",
    headlinePart2: "RIGHT PRESALE",
    headlineAccent: "BEFORE THE",
    headlineAccent2: "PUBLIC",
    subheadlineBold: "I help investors",
    subheadlineNormal: " identify under-market presale opportunities with early access, pricing strategy, and a clear long-term exit plan — not hype.",
    description: "Get the exact strategies and frameworks that drive smart presale investment decisions with insider access.",
    cta: "Work With Me",
    microTrust: "Free • Data-driven • Investor-focused",
  },
};

export const HeroSection = () => {
  const [audience, setAudience] = useState<AudienceType>("buyer");
  const content = heroContent[audience];

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary/30" />
      
      {/* Colorful bokeh/light effects at bottom - matching Dan Martell style */}
      <div className="absolute bottom-0 left-0 right-0 h-[40%] pointer-events-none">
        {/* Pink/magenta bokeh */}
        <div className="absolute bottom-20 left-[10%] w-32 h-32 md:w-48 md:h-48 rounded-full bg-pink-500/30 blur-3xl" />
        <div className="absolute bottom-40 left-[5%] w-20 h-20 md:w-32 md:h-32 rounded-full bg-pink-400/40 blur-2xl" />
        <div className="absolute bottom-10 left-[20%] w-16 h-16 md:w-24 md:h-24 rounded-full bg-fuchsia-500/30 blur-xl" />
        
        {/* Purple bokeh */}
        <div className="absolute bottom-32 left-[25%] w-24 h-24 md:w-40 md:h-40 rounded-full bg-purple-500/25 blur-3xl" />
        <div className="absolute bottom-16 left-[35%] w-16 h-16 md:w-28 md:h-28 rounded-full bg-violet-400/30 blur-2xl" />
        
        {/* Cyan/teal bokeh */}
        <div className="absolute bottom-24 right-[20%] w-28 h-28 md:w-44 md:h-44 rounded-full bg-cyan-500/25 blur-3xl" />
        <div className="absolute bottom-8 right-[30%] w-20 h-20 md:w-32 md:h-32 rounded-full bg-teal-400/30 blur-2xl" />
        
        {/* Light rays effect */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-t from-cyan-500/10 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 container-xl min-h-screen px-4 sm:px-6">
        {/* Mobile Layout - Stacked like Dan Martell */}
        <div className="lg:hidden flex flex-col min-h-screen pt-20 pb-8">
          {/* Toggle Selector - Mobile */}
          <div className="flex justify-center mb-6 animate-fade-up">
            <div className="inline-flex rounded-full p-1 bg-secondary/50 border border-border/50">
              <button
                onClick={() => setAudience("buyer")}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  audience === "buyer"
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Home className="h-4 w-4" />
                <span>Buyer</span>
              </button>
              <button
                onClick={() => setAudience("investor")}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
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

          {/* Label - Cyan like Dan Martell */}
          <p className="text-primary font-bold tracking-[0.15em] text-sm mb-4 animate-fade-up">
            {content.label}
          </p>
          
          {/* Large Bold Headline - Mobile */}
          <h1 
            key={audience + "-headline"}
            className="font-display text-[2.5rem] leading-[1.05] font-black mb-6 animate-fade-up"
          >
            <span className="text-foreground block">{content.headlinePart1}</span>
            <span className="text-foreground block">{content.headlinePart2}</span>
            <span className="text-muted-foreground block">{content.headlineAccent}</span>
            <span className="text-muted-foreground block">{content.headlineAccent2}</span>
          </h1>

          {/* Subheadline with bold start */}
          <p className="text-base text-muted-foreground mb-4 animate-fade-up">
            <span className="text-foreground font-semibold">{content.subheadlineBold}</span>
            {content.subheadlineNormal}
          </p>

          {/* Description */}
          <p className="text-sm text-muted-foreground mb-8 animate-fade-up">
            {content.description}
          </p>

          {/* CTA Button - Outlined style like Dan Martell */}
          <div className="mb-8 animate-fade-up">
            <Button 
              key={audience + "-cta"}
              variant="outline"
              size="lg"
              className="rounded-full border-2 border-foreground/80 text-foreground bg-transparent hover:bg-foreground hover:text-background px-8 py-6 text-base font-semibold"
              onClick={() => {
                document.getElementById("lead-form")?.scrollIntoView({ 
                  behavior: "smooth",
                  block: "start"
                });
              }}
            >
              {content.cta}
            </Button>
          </div>

          {/* Stats Row - Mobile */}
          <div className="grid grid-cols-2 gap-4 pt-6 border-t border-border/30 mt-auto animate-fade-up">
            <div className="text-center">
              <p className="text-2xl font-display font-bold text-gradient">300+</p>
              <p className="text-xs text-muted-foreground mt-1">Presale Units</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-display font-bold text-gradient">$200M+</p>
              <p className="text-xs text-muted-foreground mt-1">Presales Closed</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-display font-bold text-gradient">$26M+</p>
              <p className="text-xs text-muted-foreground mt-1">Assignments</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-display font-bold text-gradient">4+ Yrs</p>
              <p className="text-xs text-muted-foreground mt-1">Presale Focus</p>
            </div>
          </div>
        </div>

        {/* Desktop Layout - Keep existing side-by-side */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-16 items-center min-h-screen pt-24 pb-16">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              {/* Toggle Selector */}
              <div className="inline-flex rounded-full p-1 bg-secondary/50 border border-border/50 animate-fade-up">
                <button
                  onClick={() => setAudience("buyer")}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                    audience === "buyer"
                      ? "bg-primary text-primary-foreground shadow-lg"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Home className="h-4 w-4" />
                  <span>First-Time Buyer</span>
                </button>
                <button
                  onClick={() => setAudience("investor")}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                    audience === "investor"
                      ? "bg-primary text-primary-foreground shadow-lg"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <TrendingUp className="h-4 w-4" />
                  <span>Investor</span>
                </button>
              </div>

              {/* Label */}
              <p className="text-primary font-bold tracking-[0.15em] text-sm animate-fade-up">
                {content.label}
              </p>
              
              {/* Dynamic Headline */}
              <h1 
                key={audience + "-headline-desktop"}
                className="font-display text-5xl xl:text-6xl font-black leading-[1.1] animate-fade-up"
              >
                <span className="text-foreground">{content.headlinePart1} </span>
                <span className="text-foreground">{content.headlinePart2} </span>
                <span className="text-muted-foreground">{content.headlineAccent} </span>
                <span className="text-muted-foreground">{content.headlineAccent2}</span>
              </h1>

              {/* Dynamic Sub-headline */}
              <p 
                key={audience + "-subheadline-desktop"}
                className="text-lg md:text-xl text-muted-foreground max-w-xl animate-fade-up"
              >
                <span className="text-foreground font-semibold">{content.subheadlineBold}</span>
                {content.subheadlineNormal}
              </p>
            </div>

            {/* CTA Section */}
            <div className="space-y-3 animate-fade-up">
              <Button 
                key={audience + "-cta-desktop"}
                variant="outline"
                size="xl"
                className="gap-2 rounded-full border-2 border-foreground/80 text-foreground bg-transparent hover:bg-foreground hover:text-background px-10 py-7 text-base font-semibold"
                onClick={() => {
                  document.getElementById("lead-form")?.scrollIntoView({ 
                    behavior: "smooth",
                    block: "start"
                  });
                }}
              >
                {content.cta}
              </Button>
              
              {/* Micro-trust */}
              <p 
                key={audience + "-trust-desktop"}
                className="text-sm text-muted-foreground"
              >
                {content.microTrust}
              </p>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-4 gap-4 pt-8 border-t border-border/50 animate-fade-up">
              <div>
                <p className="text-2xl md:text-3xl font-display font-bold text-gradient">300+</p>
                <p className="text-xs text-muted-foreground mt-1">Presale Units</p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-display font-bold text-gradient">$200M+</p>
                <p className="text-xs text-muted-foreground mt-1">Presales Closed</p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-display font-bold text-gradient">$26M+</p>
                <p className="text-xs text-muted-foreground mt-1">Assignments</p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-display font-bold text-gradient">4+ Yrs</p>
                <p className="text-xs text-muted-foreground mt-1">Presale Focus</p>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative animate-fade-up delay-200">
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-accent/10 rounded-full blur-2xl" />
            
            {/* Main image container */}
            <div className="relative">
              <div className="absolute inset-0 border-2 border-primary/20 rounded-2xl translate-x-4 translate-y-4" />
              
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={heroImage}
                  alt="Uzair Muhammad - Vancouver's Top Presale Expert"
                  className="w-full aspect-[4/5] object-cover object-center"
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
