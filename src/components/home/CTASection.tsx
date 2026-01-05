import { Button } from "@/components/ui/button";
import { Mail, Search } from "lucide-react";
import expoImage from "@/assets/expo.jpg";
import { useCalendly } from "@/hooks/useCalendly";

export const CTASection = () => {
  const { openCalendly } = useCalendly();

  return (
    <section className="py-24 bg-card relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 opacity-20">
        <img
          src={expoImage}
          alt="Vancouver Presale Expo"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-card via-card/95 to-card/80" />

      <div className="container-xl relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <p className="section-label mb-4">Ready to Invest?</p>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Connect with <span className="text-gradient">Uzair</span>
          </h2>
          <p className="text-xl text-foreground/80 mb-10">
            Book a 1-on-1 call to discuss your real estate goals and discover exclusive presale opportunities in Vancouver.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="hero" 
              size="xl" 
              className="gap-2 w-full sm:w-auto"
              onClick={() => openCalendly()}
            >
              <Mail className="h-5 w-5" />
              Book a Discovery Call
            </Button>
            <a href="https://presaleproperties.com" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="xl" className="gap-2 w-full sm:w-auto">
                <Search className="h-5 w-5" />
                Search Presale Projects
              </Button>
            </a>
          </div>

          {/* Community Info */}
          <div className="mt-16 p-8 bg-background/50 backdrop-blur-sm rounded-2xl border border-border">
            <h3 className="font-display text-xl font-semibold text-foreground mb-3">
              Community Leader
            </h3>
            <p className="text-foreground/70 max-w-2xl mx-auto">
              Uzair is the founder of Vancouver's Largest Presale Expo for real estate agents and developers. 
              The Vancouver Presale Expo 2024 was a launchpad for groundbreaking presale projects and 
              invaluable training for 1,000+ realtors.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
