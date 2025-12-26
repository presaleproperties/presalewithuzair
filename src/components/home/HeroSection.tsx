import { Button } from "@/components/ui/button";
import { Phone, ChevronDown } from "lucide-react";
import heroImage from "@/assets/uzair-hero.jpeg";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Uzair Muhammad - Vancouver's Top Presale Expert"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 hero-overlay" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-xl pt-32 pb-20">
        <div className="max-w-3xl">
          <p className="section-label animate-fade-up mb-4">Vancouver's Top Presale Expert</p>
          
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground leading-[1.1] animate-fade-up delay-100">
            UZAIR<br />
            <span className="text-gradient">MUHAMMAD</span>
          </h1>

          <p className="mt-6 text-xl text-foreground/80 max-w-xl animate-fade-up delay-200">
            Specializing in presale condos and new construction in Vancouver. 
            Over $150M in presale sales and 300+ units sold.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-10 animate-fade-up delay-300">
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
            <Button variant="outline" size="xl" className="w-full sm:w-auto" asChild>
              <a href="#about">Learn More</a>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mt-16 animate-fade-up delay-400">
            <div className="stat-card">
              <p className="text-3xl sm:text-4xl font-display font-bold text-gradient">300+</p>
              <p className="text-sm text-muted-foreground mt-1">Units Sold</p>
            </div>
            <div className="stat-card">
              <p className="text-3xl sm:text-4xl font-display font-bold text-gradient">$150M+</p>
              <p className="text-sm text-muted-foreground mt-1">In Presale Sales</p>
            </div>
            <div className="stat-card col-span-2 sm:col-span-1">
              <p className="text-3xl sm:text-4xl font-display font-bold text-gradient">$500K+</p>
              <p className="text-sm text-muted-foreground mt-1">Buyer's Credit</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <a href="#about" className="text-foreground/60 hover:text-primary transition-colors">
          <ChevronDown className="h-8 w-8" />
        </a>
      </div>
    </section>
  );
};
