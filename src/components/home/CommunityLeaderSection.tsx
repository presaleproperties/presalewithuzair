import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import expoImage from "@/assets/expo.jpg";

export const CommunityLeaderSection = () => {
  return (
    <section className="py-24 bg-card">
      <div className="container-xl">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="section-label mb-4">Community Impact</p>
            <h2 className="font-display text-4xl font-bold text-foreground mb-6">
              Community <span className="text-gradient">Leader</span>
            </h2>
            <p className="text-foreground/80 leading-relaxed mb-6">
              Uzair is on a mission to revolutionize presales, give back, and share his formula 
              for success to enable and motivate other real estate agents.
            </p>
            <p className="text-foreground/80 leading-relaxed mb-8">
              He is the founder of Vancouver's Largest Presale Expo for real estate agents and 
              developers. Vancouver Presale Expo 2024 was a launchpad for groundbreaking presale 
              projects and invaluable training for 1,000+ realtors.
            </p>
            <Button variant="outline" size="lg" className="gap-2" asChild>
              <a href="https://vancouverpresaleexpo.com/" target="_blank" rel="noopener noreferrer">
                Learn About the Expo
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
          </div>

          <div className="image-reveal rounded-2xl overflow-hidden">
            <img
              src={expoImage}
              alt="Vancouver Presale Expo"
              className="w-full h-[500px] object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
