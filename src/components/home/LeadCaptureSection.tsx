import { CalendlyInline } from "@/components/CalendlyInline";
import uzairImage from "@/assets/uzair-walking.jpg";

export const LeadCaptureSection = () => {
  return (
    <section id="book-section" className="relative overflow-hidden bg-background section-y">
      <div className="container-xl px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center w-full">
          {/* Left - Image (hidden on mobile) */}
          <div className="hidden lg:block relative">
            <div className="relative rounded-sm overflow-hidden">
              <img
                src={uzairImage}
                alt="Uzair Muhammad - Presale Expert"
                className="w-full aspect-[4/5] object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/25 via-transparent to-transparent" />
            </div>
          </div>

          {/* Right - Calendly booking */}
          <div className="w-full">
            <p className="section-label mb-3">Start Here</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground tracking-tight leading-[1.05] mb-3">
              Book a 15-minute call.
            </h2>
            <p className="text-base text-foreground/70 leading-relaxed mb-6 max-w-md">
              Independent, buyer-first advice. A quick conversation to understand your goals — before you commit to anything.
            </p>
            <div className="rounded-sm border border-border bg-card p-2 sm:p-4">
              <CalendlyInline />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
