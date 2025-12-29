import { Button } from "@/components/ui/button";
import { Phone, ArrowRight, Clock } from "lucide-react";
import { useCalendly } from "@/hooks/useCalendly";

export const FinalCTASection = () => {
  const { openCalendly } = useCalendly();

  return (
    <section className="py-16 sm:py-24 bg-background relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />
      
      <div className="container-xl relative z-10 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 sm:mb-6">
            Talk to a Presale Specialist <span className="text-gradient">Before You Commit.</span>
          </h2>
          <p className="text-base sm:text-xl text-foreground/80 mb-6 sm:mb-8 max-w-2xl mx-auto">
            Presales are complex. Disclosure documents are dense. Deposits are significant. 
            Get expert guidance before you sign anything.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-6 sm:mb-8">
            <Button 
              variant="hero" 
              size="xl" 
              className="gap-2 w-full sm:w-auto text-sm sm:text-base h-12 sm:h-14"
              onClick={openCalendly}
            >
              <Phone className="h-4 w-4 sm:h-5 sm:w-5" />
              Book a Presale Strategy Call
            </Button>
            <Button variant="outline" size="xl" className="gap-2 group w-full sm:w-auto text-sm sm:text-base h-12 sm:h-14" asChild>
              <a href="https://presaleproperties.com" target="_blank" rel="noopener noreferrer">
                Search Presale Projects
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
          </div>

          <div className="inline-flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
            <Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            <span>Limited weekly strategy calls. Serious inquiries only.</span>
          </div>
        </div>
      </div>
    </section>
  );
};
