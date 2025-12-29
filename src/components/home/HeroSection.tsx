import { Button } from "@/components/ui/button";
import { Phone, ArrowRight } from "lucide-react";
import heroImage from "@/assets/uzair-hero.jpeg";
import { useCalendly } from "@/hooks/useCalendly";

export const HeroSection = () => {
  const { openCalendly } = useCalendly();
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
              <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-primary/30 bg-primary/5 animate-fade-up">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-xs sm:text-sm font-medium text-primary">Presale Expert | Vancouver & Fraser Valley</span>
              </div>
              
              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-bold leading-[1.15] sm:leading-[1.1] animate-fade-up delay-100">
                <span className="text-foreground">Don't Buy a Presale Until You Know the Real Numbers.</span>
              </h1>

              <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-xl animate-fade-up delay-200">
                Most buyers overpay because they follow hype, hire resale agents, or buy direct from developers. I help you avoid costly mistakes and get insider pricing — <span className="text-primary font-semibold">at $0 cost to you.</span>
              </p>

              {/* Value Props - Conversion Focused */}
              <ul className="space-y-2.5 sm:space-y-3 animate-fade-up delay-250">
                <li className="flex items-start gap-3 text-sm sm:text-base">
                  <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-primary" />
                  </span>
                  <span className="text-foreground"><strong className="text-primary">VIP Access</strong> — Get presale units & pricing before public launch</span>
                </li>
                <li className="flex items-start gap-3 text-sm sm:text-base">
                  <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-primary" />
                  </span>
                  <span className="text-foreground"><strong className="text-primary">Exclusive Incentives</strong> — Negotiate credits, upgrades & deposit terms</span>
                </li>
                <li className="flex items-start gap-3 text-sm sm:text-base">
                  <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-primary" />
                  </span>
                  <span className="text-foreground"><strong className="text-primary">Expert Guidance</strong> — Avoid the 80% of projects that aren't worth it</span>
                </li>
              </ul>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 animate-fade-up delay-300">
              <Button 
                variant="hero" 
                size="xl" 
                className="gap-2 w-full sm:w-auto text-sm sm:text-base h-12 sm:h-14"
                onClick={openCalendly}
              >
                <Phone className="h-4 w-4 sm:h-5 sm:w-5" />
                Book a Presale Strategy Call
              </Button>
              <Button variant="outline" size="xl" className="w-full sm:w-auto gap-2 group text-sm sm:text-base h-12 sm:h-14" asChild>
                <a href="https://presaleproperties.com" target="_blank" rel="noopener noreferrer">
                  Search Presale Projects
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-6 sm:pt-8 border-t border-border/50 animate-fade-up delay-400">
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
            {/* Decorative elements - smaller on mobile */}
            <div className="absolute -top-4 -right-4 w-48 sm:w-72 h-48 sm:h-72 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-8 -left-8 w-32 sm:w-48 h-32 sm:h-48 bg-accent/10 rounded-full blur-2xl" />
            
            {/* Main image container */}
            <div className="relative">
              {/* Border frame - smaller offset on mobile */}
              <div className="absolute inset-0 border-2 border-primary/20 rounded-xl sm:rounded-2xl translate-x-2 translate-y-2 sm:translate-x-4 sm:translate-y-4" />
              
              <div className="relative rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={heroImage}
                  alt="Uzair Muhammad - Vancouver's Top Presale Expert"
                  className="w-full aspect-[4/5] sm:aspect-[4/5] object-cover object-center"
                />
                {/* Image overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
