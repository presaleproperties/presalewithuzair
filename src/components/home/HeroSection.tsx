import { Button } from "@/components/ui/button";
import { Phone, ArrowRight } from "lucide-react";
import heroImage from "@/assets/uzair-hero.jpeg";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center bg-background overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_80%,hsl(var(--primary)/0.05)_0%,transparent_50%)]" />
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_20%,hsl(var(--accent)/0.05)_0%,transparent_50%)]" />
      </div>

      <div className="relative z-10 container-xl py-20 lg:py-0">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-screen lg:min-h-0 lg:py-32">
          {/* Content */}
          <div className="order-2 lg:order-1 pt-20 lg:pt-0">
            <p className="section-label animate-fade-up mb-4">Vancouver's Top Presale Expert</p>
            
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground leading-[1.1] animate-fade-up delay-100">
              Uzair<br />
              <span className="text-gradient">Muhammad</span>
            </h1>

            <p className="mt-6 text-lg lg:text-xl text-muted-foreground max-w-lg animate-fade-up delay-200">
              Specializing in presale condos and new construction in Vancouver. 
              Over $150M in presale sales and 300+ units sold.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-10 animate-fade-up delay-300">
              <a
                href="https://wa.me/17782313592?text=Hi%20Uzair%2C%20I%27m%20interested%20in%20presale%20and%20would%20like%20to%20discuss%20further..."
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="lg" className="gap-2 w-full sm:w-auto text-base px-8">
                  <Phone className="h-5 w-5" />
                  Book A Call
                </Button>
              </a>
              <Button variant="outline" size="lg" className="w-full sm:w-auto text-base px-8 gap-2" asChild>
                <a href="#about">
                  Learn More
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-14 animate-fade-up delay-400">
              <div className="stat-card">
                <p className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-gradient">300+</p>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">Units Sold</p>
              </div>
              <div className="stat-card">
                <p className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-gradient">$150M+</p>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">In Presale Sales</p>
              </div>
              <div className="stat-card">
                <p className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-gradient">$500K+</p>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">Buyer's Credit</p>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="order-1 lg:order-2 relative animate-fade-up delay-200">
            <div className="relative">
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 border-2 border-primary/20 rounded-2xl" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary/5 rounded-2xl" />
              
              {/* Main image */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={heroImage}
                  alt="Uzair Muhammad - Vancouver's Top Presale Expert"
                  className="w-full h-auto object-cover aspect-[4/5] lg:aspect-[3/4]"
                />
                {/* Subtle overlay at bottom for depth */}
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-foreground/10 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
