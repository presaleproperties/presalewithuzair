import { Button } from "@/components/ui/button";
import uzairImage from "@/assets/uzair-expo-speaking.jpg?w=300&format=webp";

export const FinalCTASection = () => {
  const scrollToForm = () => {
    document.getElementById("lead-form")?.scrollIntoView({ 
      behavior: "smooth",
      block: "start"
    });
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
          <p className="text-primary font-bold tracking-[0.15em] text-sm mb-6 uppercase">
            Ready for Your Next Level Game Plan?
          </p>
          
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-foreground mb-6 uppercase tracking-tight leading-tight">
            <span className="text-foreground">LET'S TALK</span>{" "}
            <span className="text-muted-foreground">PRESALE STRATEGY</span>
          </h2>
          
          <p className="text-base sm:text-lg text-muted-foreground mb-4 max-w-2xl mx-auto">
            Get expert guidance on pricing, deposits, developer reputation, and timing. 
            Stop guessing and start investing with confidence.
          </p>
          
          <p className="text-sm text-muted-foreground/70 mb-8 max-w-xl mx-auto italic">
            I work with a limited number of buyers to ensure proper guidance.
          </p>

          <Button 
            variant="outline"
            size="xl"
            className="rounded-full border-2 border-foreground/80 text-foreground bg-transparent hover:bg-foreground hover:text-background px-10 py-7 text-base font-semibold mb-8"
            onClick={scrollToForm}
          >
            Book a Discovery Call
          </Button>

          {/* Uzair Image */}
          <div className="relative mx-auto max-w-xs">
            <div className="aspect-square rounded-full overflow-hidden border-4 border-primary/30 shadow-2xl">
              <img
                src={uzairImage}
                alt="Uzair Muhammad - Presale Expert"
                width={300}
                height={300}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};