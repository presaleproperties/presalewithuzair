import { CheckCircle, XCircle } from "lucide-react";
import uzairImage from "@/assets/uzair-walking.jpg";

const forYou = [
  "Are seriously considering a presale purchase",
  "Want clear guidance on risks, pricing, and contracts",
  "Prefer honest advice over sales pressure",
];

const notForYou = [
  "Are just browsing or early-stage researching",
  "Are looking only for the cheapest option",
  "Expect developer-style incentives or promotions",
];

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
          {/* Header */}
          <div className="text-center mb-10 sm:mb-16">
            <p className="section-label mb-3 sm:mb-4">Is This Right For You?</p>
            <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-bold text-foreground uppercase tracking-tight">
              Before You <span className="text-gradient">Book a Call</span>
            </h2>
            <p className="mt-3 sm:mt-4 text-sm sm:text-base text-foreground/70 max-w-2xl mx-auto font-normal normal-case tracking-normal">
              I work with a select number of buyers to ensure proper guidance. Please review to see if we're a good fit.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Left Column - Image + Fit Criteria */}
            <div className="space-y-6">
              {/* Image */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl hidden sm:block">
                <img
                  src={uzairImage}
                  alt="Uzair Muhammad - Presale Expert"
                  className="w-full aspect-[4/5] object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
              </div>

              {/* Fit Criteria - Side by side on desktop, stacked on mobile */}
              <div className="grid sm:grid-cols-2 gap-4">
                {/* For You */}
                <div className="bg-card rounded-xl border border-border p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="p-1.5 rounded-lg bg-primary/10">
                      <CheckCircle className="h-4 w-4 text-primary" />
                    </div>
                    <h3 className="font-display text-sm font-bold text-foreground">
                      Good fit if you...
                    </h3>
                  </div>
                  <ul className="space-y-2">
                    {forYou.map((item, index) => (
                      <li key={index} className="flex items-start gap-2 text-xs text-foreground/80">
                        <CheckCircle className="h-3.5 w-3.5 text-primary flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Not For You */}
                <div className="bg-card rounded-xl border border-border p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="p-1.5 rounded-lg bg-destructive/10">
                      <XCircle className="h-4 w-4 text-destructive" />
                    </div>
                    <h3 className="font-display text-sm font-bold text-foreground">
                      Not a fit if you...
                    </h3>
                  </div>
                  <ul className="space-y-2">
                    {notForYou.map((item, index) => (
                      <li key={index} className="flex items-start gap-2 text-xs text-foreground/80">
                        <XCircle className="h-3.5 w-3.5 text-muted-foreground/50 flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Right Column - Calendly Calendar */}
            <div className="space-y-4">
              <div className="rounded-xl overflow-hidden border border-border bg-card h-[500px] sm:h-[600px] lg:h-[700px]">
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
                <p className="text-xs sm:text-sm text-foreground/70">
                  Consultations available in <span className="text-primary font-medium">English</span>, <span className="text-primary font-medium">Punjabi</span>, <span className="text-primary font-medium">Hindi</span> & <span className="text-primary font-medium">Urdu</span>
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground mt-2">
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
