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

      <div className="relative z-10 container-xl min-h-screen">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-screen pt-24 pb-16">
          
          {/* Left Content */}
          <div className="order-2 lg:order-1 space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 animate-fade-up">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-sm font-medium text-primary">Presale Expert | Vancouver & Fraser Valley</span>
              </div>
              
              <h1 className="font-display text-4xl sm:text-5xl xl:text-6xl font-bold leading-[1.1] animate-fade-up delay-100">
                <span className="text-foreground">I help first-time buyers and investors secure presale condos & townhomes in BC</span>{" "}
                <span className="text-gradient">— strategically and safely.</span>
              </h1>

              <p className="text-lg sm:text-xl text-muted-foreground max-w-xl animate-fade-up delay-200">
                $150M+ in presales | 220+ units | Presale-only specialist across Metro Vancouver & Fraser Valley.
              </p>

              {/* Trust Bullets */}
              <ul className="space-y-2 animate-fade-up delay-250">
                <li className="flex items-center gap-2 text-foreground/80">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span>Presale-only focus (not resale)</span>
                </li>
                <li className="flex items-center gap-2 text-foreground/80">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span>Early access + off-market inventory</span>
                </li>
                <li className="flex items-center gap-2 text-foreground/80">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span>Risk mitigation: deposits, disclosure, assignments</span>
                </li>
              </ul>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-up delay-300">
              <Button 
                variant="hero" 
                size="xl" 
                className="gap-2 w-full sm:w-auto"
                onClick={openCalendly}
              >
                <Phone className="h-5 w-5" />
                Book a Presale Strategy Call
              </Button>
              <Button variant="outline" size="xl" className="w-full sm:w-auto gap-2 group" asChild>
                <a href="https://presaleproperties.com" target="_blank" rel="noopener noreferrer">
                  Search Presale Projects
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-border/50 animate-fade-up delay-400">
              <div className="text-center sm:text-left">
                <p className="text-2xl sm:text-3xl font-display font-bold text-gradient">220+</p>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">Presale Units</p>
              </div>
              <div className="text-center sm:text-left">
                <p className="text-2xl sm:text-3xl font-display font-bold text-gradient">$150M+</p>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">Presales Closed</p>
              </div>
              <div className="text-center sm:text-left">
                <p className="text-2xl sm:text-3xl font-display font-bold text-gradient">$26M+</p>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">Assignments</p>
              </div>
              <div className="text-center sm:text-left">
                <p className="text-2xl sm:text-3xl font-display font-bold text-gradient">4+ Yrs</p>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">Presale Focus</p>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="order-1 lg:order-2 relative animate-fade-up delay-200">
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-accent/10 rounded-full blur-2xl" />
            
            {/* Main image container */}
            <div className="relative">
              {/* Border frame */}
              <div className="absolute inset-0 border-2 border-primary/20 rounded-2xl translate-x-4 translate-y-4" />
              
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={heroImage}
                  alt="Uzair Muhammad - Vancouver's Top Presale Expert"
                  className="w-full aspect-[4/5] object-cover object-center"
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
