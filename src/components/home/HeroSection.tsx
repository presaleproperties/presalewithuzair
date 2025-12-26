import { Button } from "@/components/ui/button";
import { Phone, ArrowRight, Building2, TrendingUp, Award } from "lucide-react";
import heroImage from "@/assets/uzair-hero.jpeg";

export const HeroSection = () => {
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
                <span className="text-sm font-medium text-primary">Vancouver's Top Presale Expert</span>
              </div>
              
              <h1 className="font-display text-5xl sm:text-6xl xl:text-7xl font-bold leading-[1.05] animate-fade-up delay-100">
                <span className="text-foreground">UZAIR</span><br />
                <span className="text-gradient">MUHAMMAD</span>
              </h1>

              <p className="text-lg sm:text-xl text-muted-foreground max-w-lg animate-fade-up delay-200">
                Specializing in presale condos and new construction in Vancouver. 
                Your trusted partner for smart real estate investments.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-up delay-300">
              <a
                href="https://wa.me/17782313592?text=Hi%20Uzair%2C%20I%27m%20interested%20in%20presale%20and%20would%20like%20to%20discuss%20further..."
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="hero" size="xl" className="gap-2 w-full sm:w-auto">
                  <Phone className="h-5 w-5" />
                  Book A Call
                </Button>
              </a>
              <Button variant="outline" size="xl" className="w-full sm:w-auto gap-2 group" asChild>
                <a href="#about">
                  Learn More
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-border/50 animate-fade-up delay-400">
              <div className="text-center sm:text-left">
                <p className="text-2xl sm:text-3xl font-display font-bold text-gradient">300+</p>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">Presale Units Sold</p>
              </div>
              <div className="text-center sm:text-left">
                <p className="text-2xl sm:text-3xl font-display font-bold text-gradient">$200M+</p>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">In Volume</p>
              </div>
              <div className="text-center sm:text-left">
                <p className="text-2xl sm:text-3xl font-display font-bold text-gradient">$500K+</p>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">Buyer's Credit</p>
              </div>
              <div className="text-center sm:text-left">
                <p className="text-2xl sm:text-3xl font-display font-bold text-gradient">$26M+</p>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">In Assignments</p>
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

              {/* Floating badges */}
              <div className="absolute -left-4 top-1/4 bg-card/95 backdrop-blur-sm border border-border rounded-xl p-4 shadow-xl animate-fade-up delay-500">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Building2 className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Presale Expert</p>
                    <p className="font-semibold text-foreground">4+ Years</p>
                  </div>
                </div>
              </div>

              <div className="absolute -right-4 bottom-1/4 bg-card/95 backdrop-blur-sm border border-border rounded-xl p-4 shadow-xl animate-fade-up delay-600">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Completion Rate</p>
                    <p className="font-semibold text-foreground">99%</p>
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
