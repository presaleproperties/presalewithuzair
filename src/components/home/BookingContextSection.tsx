import { UnifiedLeadForm } from "@/components/forms/UnifiedLeadForm";
import { CheckCircle, Clock, Shield, Languages } from "lucide-react";

export const BookingContextSection = () => {
  return (
    <section id="book-section" className="py-16 sm:py-24 bg-background relative overflow-hidden">
      {/* Subtle blue glow effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-[5%] w-32 h-32 md:w-48 md:h-48 rounded-full bg-primary/8 blur-3xl" />
        <div className="absolute bottom-40 right-[10%] w-24 h-24 md:w-40 md:h-40 rounded-full bg-blue-400/6 blur-3xl" />
        <div className="absolute top-1/3 right-[5%] w-28 h-28 md:w-44 md:h-44 rounded-full bg-indigo-400/5 blur-3xl" />
      </div>

      <div className="container-xl px-4 sm:px-6 relative z-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-16 items-start">
          {/* Left — context */}
          <div className="lg:sticky lg:top-28">
            <p className="section-label mb-3 sm:mb-4">Ready to Get Started?</p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground uppercase tracking-tight leading-[1.05]">
              Let's Talk <span className="text-gradient">Strategy.</span>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-foreground/70 max-w-md font-normal normal-case tracking-normal">
              Fill out the form and I'll personally get back to you within 24 hours.
            </p>

            <ul className="mt-8 space-y-4">
              <li className="flex items-start gap-3">
                <div className="mt-0.5 h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Shield className="h-4.5 w-4.5 text-primary" strokeWidth={2} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Buyer-side only</p>
                  <p className="text-sm text-foreground/60">I represent buyers, never developers.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-0.5 h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Clock className="h-4.5 w-4.5 text-primary" strokeWidth={2} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">24-hour response</p>
                  <p className="text-sm text-foreground/60">For serious first-time buyers & investors.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-0.5 h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Languages className="h-4.5 w-4.5 text-primary" strokeWidth={2} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Available in 4 languages</p>
                  <p className="text-sm text-foreground/60">
                    <span className="text-primary font-medium">English</span>,{" "}
                    <span className="text-primary font-medium">Punjabi</span>,{" "}
                    <span className="text-primary font-medium">Hindi</span> &{" "}
                    <span className="text-primary font-medium">Urdu</span>.
                  </p>
                </div>
              </li>
            </ul>

            <div className="hidden lg:flex items-center gap-2 mt-8 pt-6 border-t border-border/50">
              <CheckCircle className="h-4 w-4 text-primary" />
              <p className="text-sm text-foreground/70">
                <span className="font-semibold text-foreground">450+ units sold</span>
                <span className="mx-2 text-foreground/30">·</span>
                <span className="font-semibold text-foreground">$200M+ volume</span>
              </p>
            </div>
          </div>

          {/* Right — form */}
          <div>
            <UnifiedLeadForm
              variant="card"
              eyebrow=""
              heading=""
              subheading=""
              buttonText="Get My Free Strategy Call"
              showTrust={false}
              twoColumn
            />
          </div>
        </div>
      </div>
    </section>
  );
};
