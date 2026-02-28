import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

interface MidPageCTAProps {
  quote?: string;
  clientName?: string;
  clientRole?: string;
  clientPhoto?: string;
}

export const MidPageCTA = ({ quote, clientName, clientRole, clientPhoto }: MidPageCTAProps) => {
  const handleBookClick = () => {
    document.getElementById('book-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="dark-section relative py-16 sm:py-24 overflow-hidden">
      {/* Navy ambient background */}
      <div className="absolute inset-0 bg-background" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-primary/6 blur-[100px]" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-primary/4 blur-[80px]" />
      </div>

      <div className="container-xl relative z-10 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* 5-star rating */}
          <div className="flex justify-center gap-1 mb-6 sm:mb-8">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-5 w-5 sm:h-6 sm:w-6 fill-primary text-primary" />
            ))}
          </div>

          {/* Quote */}
          {quote && (
            <blockquote className="mb-8 sm:mb-10">
              <p className="font-display text-2xl sm:text-3xl lg:text-4xl leading-snug text-foreground">
                "{quote}"
              </p>
            </blockquote>
          )}

          {/* Client attribution */}
          {(clientName || clientPhoto) && (
            <div className="flex items-center justify-center gap-4 mb-8 sm:mb-10">
              {clientPhoto && (
                <img
                  src={clientPhoto}
                  alt={clientName || "Client"}
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover border-2 border-primary/30"
                />
              )}
              <div className="text-left">
                {clientName && (
                  <p className="text-base sm:text-lg font-semibold text-foreground">{clientName}</p>
                )}
                {clientRole && (
                  <p className="text-sm text-muted-foreground">{clientRole}</p>
                )}
              </div>
            </div>
          )}

          {/* CTA */}
          <Button
            variant="hero"
            size="lg"
            className="rounded-full px-8 py-6 text-base font-semibold shadow-lg"
            onClick={handleBookClick}
          >
            Book a Discovery Call
          </Button>
        </div>
      </div>
    </section>
  );
};
