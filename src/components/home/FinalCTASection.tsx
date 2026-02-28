import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";
import uzairExpoImage from "@/assets/uzair-expo-speaking.jpg";

export const FinalCTASection = () => {
  const handleBookClick = () => {
    document.getElementById('book-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="dark-section py-16 sm:py-24 bg-background relative overflow-hidden">
      {/* Background with subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-transparent" />
      
      {/* Refined gold depth effects */}
      <div className="absolute bottom-0 left-0 right-0 h-[50%] pointer-events-none">
        <div className="absolute bottom-10 left-[10%] w-40 h-40 md:w-64 md:h-64 rounded-full bg-primary/8 blur-3xl" />
        <div className="absolute bottom-20 right-[15%] w-32 h-32 md:w-48 md:h-48 rounded-full bg-primary/6 blur-3xl" />
      </div>
      
      <div className="container-xl relative z-10 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* Community Leader Badge */}
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6">
            <Users className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Community Leader</span>
          </div>
          
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
            <span className="text-foreground">Founder,</span>{" "}
            <span className="text-gradient">Vancouver Presale Expo</span>
          </h2>
          
          <p className="text-base sm:text-lg text-muted-foreground mb-4 max-w-2xl mx-auto">
            The Vancouver Presale Expo is the largest annual gathering for real estate agents and developers 
            in the presale space — a launchpad for groundbreaking projects and invaluable training for 1,000+ realtors.
          </p>
          
          <p className="text-sm text-muted-foreground/70 mb-8 max-w-xl mx-auto italic">
            Get guidance from the same expert who educates the industry.
          </p>

          <Button 
            variant="hero"
            size="xl"
            className="rounded-full px-10 py-7 text-base font-semibold mb-10 shadow-lg"
            onClick={handleBookClick}
          >
            Book a Discovery Call
          </Button>

          {/* Uzair Expo Image */}
          <a 
            href="https://vancouverpresaleexpo.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="relative mx-auto max-w-sm sm:max-w-md block group"
          >
            <div className="aspect-square rounded-full overflow-hidden border-4 border-primary/30 shadow-2xl transition-all duration-300 group-hover:border-primary group-hover:scale-105">
              <img
                src={uzairExpoImage}
                alt="Uzair Muhammad speaking at Vancouver Presale Expo"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <p className="text-xs text-primary mt-4 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
              Visit vancouverpresaleexpo.com →
            </p>
          </a>
        </div>
      </div>
    </section>
  );
};
