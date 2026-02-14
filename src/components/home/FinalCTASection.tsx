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
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />
      
      {/* Colorful bokeh effects at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-[50%] pointer-events-none">
        <div className="absolute bottom-10 left-[10%] w-32 h-32 md:w-48 md:h-48 rounded-full bg-amber-500/20 blur-3xl" />
        <div className="absolute bottom-20 right-[15%] w-28 h-28 md:w-40 md:h-40 rounded-full bg-yellow-500/15 blur-3xl" />
        <div className="absolute bottom-0 left-[40%] w-24 h-24 md:w-36 md:h-36 rounded-full bg-orange-400/15 blur-2xl" />
      </div>
      
      <div className="container-xl relative z-10 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* Community Leader Badge */}
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6">
            <Users className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Community Leader</span>
          </div>
          
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-foreground mb-6 uppercase tracking-tight leading-tight">
            <span className="text-foreground">FOUNDER,</span>{" "}
            <span className="text-gradient">VANCOUVER PRESALE EXPO</span>
          </h2>
          
          <p className="text-base sm:text-lg text-muted-foreground mb-4 max-w-2xl mx-auto">
            The Vancouver Presale Expo is the largest annual gathering for real estate agents and developers 
            in the presale space — a launchpad for groundbreaking projects and invaluable training for 1,000+ realtors.
          </p>
          
          <p className="text-sm text-muted-foreground/70 mb-8 max-w-xl mx-auto italic">
            Get guidance from the same expert who educates the industry.
          </p>

          <Button 
            variant="outline"
            size="xl"
            className="rounded-full border-2 border-foreground/80 text-foreground bg-transparent hover:bg-foreground hover:text-background px-10 py-7 text-base font-semibold mb-10"
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
