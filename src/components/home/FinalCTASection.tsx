import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Users } from "lucide-react";
import uzairExpoImage from "@/assets/uzair-expo-speaking.jpg";

export const FinalCTASection = () => {
  const navigate = useNavigate();
  
  const handleBookClick = () => {
    navigate("/book");
  };

  return (
    <section className="py-16 sm:py-24 bg-background relative overflow-hidden">
      {/* Background with subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />
      
      {/* Colorful bokeh effects at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-[50%] pointer-events-none">
        <div className="absolute bottom-10 left-[10%] w-32 h-32 md:w-48 md:h-48 rounded-full bg-pink-500/20 blur-3xl" />
        <div className="absolute bottom-20 right-[15%] w-28 h-28 md:w-40 md:h-40 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="absolute bottom-0 left-[40%] w-24 h-24 md:w-36 md:h-36 rounded-full bg-purple-500/15 blur-2xl" />
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
          <div className="relative mx-auto max-w-sm sm:max-w-md">
            <div className="aspect-square rounded-full overflow-hidden border-4 border-primary/30 shadow-2xl">
              <img
                src={uzairExpoImage}
                alt="Uzair Muhammad speaking at Vancouver Presale Expo"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
