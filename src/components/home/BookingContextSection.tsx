import { Quote } from "lucide-react";
import uzairImage from "@/assets/uzair-walking.jpg";

export const BookingContextSection = () => {
  return (
    <section id="book-section" className="py-16 sm:py-24 bg-background relative overflow-hidden">
      {/* Colorful bokeh effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-[5%] w-32 h-32 md:w-48 md:h-48 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="absolute bottom-40 right-[10%] w-24 h-24 md:w-40 md:h-40 rounded-full bg-pink-500/20 blur-3xl" />
        <div className="absolute top-1/3 right-[5%] w-28 h-28 md:w-44 md:h-44 rounded-full bg-purple-500/15 blur-3xl" />
      </div>

      <div className="container-xl px-4 sm:px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Testimonial Quote */}
          <div className="max-w-3xl mx-auto mb-12 sm:mb-16">
            <div className="relative bg-card/50 backdrop-blur-sm rounded-2xl border border-border p-6 sm:p-8">
              <Quote className="absolute top-4 left-4 sm:top-6 sm:left-6 h-8 w-8 sm:h-10 sm:w-10 text-primary/20" />
              <blockquote className="relative z-10 text-center">
                <p className="text-base sm:text-lg lg:text-xl text-foreground/90 italic leading-relaxed">
                  "Uzair told me not to buy two projects I was excited about — and saved me from major issues. That kind of honesty is rare. He genuinely cares about getting you the right deal, not just any deal."
                </p>
                <footer className="mt-4 sm:mt-6">
                  <p className="text-sm sm:text-base font-semibold text-foreground">Anish K.</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">First-Time Buyer, Surrey</p>
                </footer>
              </blockquote>
            </div>
          </div>

          {/* Header */}
          <div className="text-center mb-10 sm:mb-12">
            <p className="section-label mb-3 sm:mb-4">Ready to Get Started?</p>
            <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-bold text-foreground uppercase tracking-tight">
              Book a <span className="text-gradient">Discovery Call</span>
            </h2>
            <p className="mt-3 sm:mt-4 text-sm sm:text-base text-foreground/70 max-w-2xl mx-auto font-normal normal-case tracking-normal">
              A quick conversation to understand your goals and see if we're a good fit.
            </p>
          </div>

          {/* Mobile: Calendar only */}
          <div className="lg:hidden space-y-4">
            {/* Calendly Calendar - Full viewport height on mobile */}
            <div className="rounded-xl overflow-hidden border border-border bg-card h-[calc(100vh-120px)] min-h-[500px]">
              <iframe
                src="https://calendly.com/meetuzair/30min?hide_gdpr_banner=1&background_color=0a0a0a&text_color=ffffff&primary_color=d4a853"
                width="100%"
                height="100%"
                frameBorder="0"
                title="Schedule a meeting with Uzair"
                style={{ border: 'none' }}
              />
            </div>
            
            <div className="text-center">
              <p className="text-xs text-foreground/70">
                Consultations available in <span className="text-primary font-medium">English</span>, <span className="text-primary font-medium">Punjabi</span>, <span className="text-primary font-medium">Hindi</span> & <span className="text-primary font-medium">Urdu</span>
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                Limited weekly availability. Serious inquiries only.
              </p>
            </div>
          </div>

          {/* Desktop: Side by side layout */}
          <div className="hidden lg:grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Column - Image */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={uzairImage}
                alt="Uzair Muhammad - Presale Expert"
                className="w-full aspect-[4/5] object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
            </div>

            {/* Right Column - Calendly Calendar */}
            <div className="space-y-4">
              <div className="rounded-xl overflow-hidden border border-border bg-card h-[700px]">
                <iframe
                  src="https://calendly.com/meetuzair/30min?hide_gdpr_banner=1&background_color=0a0a0a&text_color=ffffff&primary_color=d4a853"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  title="Schedule a meeting with Uzair"
                  style={{ border: 'none' }}
                />
              </div>
              
              <div className="text-center">
                <p className="text-sm text-foreground/70">
                  Consultations available in <span className="text-primary font-medium">English</span>, <span className="text-primary font-medium">Punjabi</span>, <span className="text-primary font-medium">Hindi</span> & <span className="text-primary font-medium">Urdu</span>
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Limited weekly availability. Serious inquiries only.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
