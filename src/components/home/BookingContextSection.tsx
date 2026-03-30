import { UnifiedLeadForm } from "@/components/forms/UnifiedLeadForm";

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
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-10">
            <p className="section-label mb-3 sm:mb-4">Ready to Get Started?</p>
            <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-bold text-foreground uppercase tracking-tight">
              Let's Talk <span className="text-gradient">Strategy.</span>
            </h2>
            <p className="mt-3 sm:mt-4 text-sm sm:text-base text-foreground/70 max-w-2xl mx-auto font-normal normal-case tracking-normal">
              Fill out the form below and I'll personally get back to you within 24 hours.
            </p>
            <ul className="mt-3 text-xs sm:text-sm text-foreground/70 space-y-1">
              <li>For serious first-time buyers & investors only.</li>
              <li>
                Consultations available in{" "}
                <span className="text-primary font-medium">English</span>,{" "}
                <span className="text-primary font-medium">Punjabi</span>,{" "}
                <span className="text-primary font-medium">Hindi</span> &{" "}
                <span className="text-primary font-medium">Urdu</span>.
              </li>
            </ul>
          </div>

          {/* Form */}
          <div className="max-w-2xl mx-auto">
            <UnifiedLeadForm
              variant="card"
              eyebrow=""
              heading=""
              subheading=""
              buttonText="Get My Free Strategy Call"
              showTrust={true}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
