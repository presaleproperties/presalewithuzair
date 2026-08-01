import { UnifiedLeadForm } from "@/components/forms/UnifiedLeadForm";
import { Clock, Shield, Languages } from "lucide-react";

export const BookingContextSection = () => {
  return (
    <section id="book-section" className="section-y bg-muted/30">
      <div className="container-xl px-4 sm:px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] gap-10 lg:gap-16 items-start">
          {/* Left — context */}
          <div className="lg:sticky lg:top-28">
            <p className="section-label mb-3">Ready to get started?</p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight leading-[1.05]">
              Let's talk strategy.
            </h2>
            <p className="mt-4 text-base text-foreground/70 max-w-md leading-relaxed">
              I'll personally get back to you within 24 hours.
            </p>

            <ul className="mt-6 space-y-3">
              {[
                { icon: Shield, text: "Buyer-side only — I represent buyers, never developers." },
                { icon: Clock, text: "24-hour personal reply, not an auto-responder." },
                { icon: Languages, text: "Contract walkthroughs in English, Punjabi, Hindi & Urdu." },
              ].map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-start gap-3">
                  <Icon className="h-4 w-4 text-primary mt-1 shrink-0" strokeWidth={2.25} />
                  <p className="text-sm text-foreground/80">{text}</p>
                </li>
              ))}
            </ul>

            <div className="hidden lg:flex items-center gap-3 mt-6 pt-5 border-t border-border/60 text-sm text-foreground/70">
              <span className="font-semibold text-foreground">450+ families helped</span>
              <span className="text-foreground/30">·</span>
              <span className="font-semibold text-foreground">$200M+ volume</span>
            </div>
          </div>


          {/* Right — form */}
          <div>
            <UnifiedLeadForm
              variant="card"
              eyebrow=""
              heading=""
              subheading=""
              buttonText="Book a Buyer Strategy Call"
              showTrust={false}
              twoColumn
            />
          </div>
        </div>
      </div>
    </section>
  );
};
