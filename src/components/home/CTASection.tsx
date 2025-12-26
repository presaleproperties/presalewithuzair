import { Button } from "@/components/ui/button";
import { Phone, MessageCircle } from "lucide-react";
import expoImage from "@/assets/expo.jpg";

export const CTASection = () => {
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
            <a
              href="https://wa.me/17782313592?text=Hi%20Uzair%2C%20I%27m%20interested%20in%20presale%20and%20would%20like%20to%20discuss%20further..."
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="hero" size="xl" className="gap-2 w-full sm:w-auto">
                <MessageCircle className="h-5 w-5" />
                Chat on WhatsApp
              </Button>
            </a>
            <a href="tel:+17782313592">
              <Button variant="outline" size="xl" className="gap-2 w-full sm:w-auto">
                <Phone className="h-5 w-5" />
                Call Now
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
