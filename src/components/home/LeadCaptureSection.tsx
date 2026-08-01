import { UnifiedLeadForm } from "@/components/forms/UnifiedLeadForm";
import uzairImage from "@/assets/uzair-walking.jpg";

export const LeadCaptureSection = () => {
  return (
    <section id="lead-form" className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 bg-background" />

      <div className="relative z-10 container-xl px-4 sm:px-6 min-h-screen flex items-center py-16 sm:py-24">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center w-full">
          
          {/* Left - Image (hidden on mobile) */}
          <div className="hidden lg:block relative">
            <div className="relative rounded-sm overflow-hidden border border-border">
              <img
                src={uzairImage}
                alt="Uzair Muhammad - Presale Expert"
                className="w-full aspect-[4/5] object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/25 via-transparent to-transparent" />
            </div>
          </div>

          {/* Right - Form */}
          <div className="max-w-md mx-auto lg:mx-0 w-full">
            <UnifiedLeadForm
              eyebrow="START HERE"
              heading="Get Clear Guidance Before You Buy"
              subheading="Independent, buyer-first advice. A quick conversation to understand your goals — and ensure you don't make a costly mistake."
              buttonText="Let's Chat"
              showTrust={true}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
