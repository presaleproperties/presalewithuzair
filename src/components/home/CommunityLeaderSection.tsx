import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import expoImage from "@/assets/expo.jpg";

export const CommunityLeaderSection = () => {
  return (
    <section className="py-16 sm:py-24 bg-card">
      <div className="container-xl px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16 items-center">
          <div>
            <p className="section-label mb-3 sm:mb-4">Community Impact</p>
            <h2 className="font-display text-2xl sm:text-4xl font-bold text-foreground mb-4 sm:mb-6">
              Community <span className="text-gradient">Leader</span>
            </h2>
            <p className="text-sm sm:text-base text-foreground/80 leading-relaxed mb-4 sm:mb-6">
              Uzair is on a mission to revolutionize presales, give back, and share his formula 
              for success to enable and motivate other real estate agents.
            </p>
            <p className="text-sm sm:text-base text-foreground/80 leading-relaxed mb-6 sm:mb-8">
              He is the founder of Vancouver's Largest Presale Expo for real estate agents and 
              developers. Vancouver Presale Expo 2024 was a launchpad for groundbreaking presale 
              projects and invaluable training for 1,000+ realtors.
            </p>
            <Button variant="outline" size="lg" className="gap-2 w-full sm:w-auto h-11 sm:h-12" asChild>
              <a href="https://vancouverpresaleexpo.com/" target="_blank" rel="noopener noreferrer">
                Learn About the Expo
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
          </div>

          <div className="image-reveal rounded-xl sm:rounded-2xl overflow-hidden">
            <img
              src={expoImage}
              alt="Vancouver Presale Expo"
              className="w-full h-[300px] sm:h-[400px] lg:h-[500px] object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
