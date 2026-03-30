import { Button } from "@/components/ui/button";
import uzairExpoImage from "@/assets/uzair-expo-speaking.jpg";

export const FinalCTASection = () => {
  const handleBookClick = () => {
    document.getElementById('book-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-20 sm:py-28 bg-background relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/6 blur-[120px]" />
      </div>

      <div className="container-xl relative z-10 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-[1.2fr_1fr] gap-10 lg:gap-16 items-center">
          
          {/* Image */}
          <a
            href="https://vancouverpresaleexpo.com"
            target="_blank"
            rel="noopener noreferrer"
            className="block group mx-auto lg:mx-0 max-w-xs sm:max-w-sm"
          >
            <div className="aspect-[3/4] rounded-2xl overflow-hidden border border-border/40 shadow-xl transition-transform duration-300 group-hover:scale-[1.02]">
              <img
                src={uzairExpoImage}
                alt="Uzair Muhammad speaking at Vancouver Presale Expo"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <p className="text-xs text-muted-foreground mt-3 text-center font-medium group-hover:text-foreground transition-colors">
              vancouverpresaleexpo.com ↗
            </p>
          </a>

          {/* Content */}
          <div className="text-center lg:text-left">
            <p className="text-primary font-bold tracking-[0.15em] text-xs sm:text-sm mb-3">
              COMMUNITY LEADER
            </p>

            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-foreground tracking-tight leading-tight mb-5">
              Founder, Vancouver{" "}
              <span className="text-gradient">Presale Expo</span>
            </h2>

            <p className="text-base sm:text-lg text-muted-foreground mb-4 max-w-lg mx-auto lg:mx-0">
              The largest annual gathering for real estate agents and developers in the presale space — training 1,000+ realtors and launching groundbreaking projects.
            </p>

            <p className="text-sm text-muted-foreground/70 mb-8 max-w-md mx-auto lg:mx-0 italic">
              Get guidance from the same expert who educates the industry.
            </p>

            <Button
              variant="outline"
              size="lg"
              className="rounded-full border-2 border-foreground/80 text-foreground bg-transparent hover:bg-foreground hover:text-background px-8 py-6 text-base font-semibold"
              onClick={handleBookClick}
            >
              Work With Uzair
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
