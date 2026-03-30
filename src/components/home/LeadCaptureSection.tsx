import { UnifiedLeadForm } from "@/components/forms/UnifiedLeadForm";
import uzairImage from "@/assets/uzair-walking.jpg";

export const LeadCaptureSection = () => {
  return (
    <section id="lead-form" className="relative min-h-screen overflow-hidden">
      {/* Background with bokeh effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-card/50 to-background" />
      
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-[5%] w-32 h-32 md:w-48 md:h-48 rounded-full bg-blue-500/15 blur-3xl" />
        <div className="absolute bottom-40 left-[10%] w-24 h-24 md:w-40 md:h-40 rounded-full bg-indigo-500/15 blur-3xl" />
        <div className="absolute top-1/3 right-[5%] w-28 h-28 md:w-44 md:h-44 rounded-full bg-primary/10 blur-3xl" />
      </div>

      <div className="relative z-10 container-xl px-4 sm:px-6 min-h-screen flex items-center py-16 sm:py-24">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center w-full">
          
          {/* Left - Image (hidden on mobile) */}
          <div className="hidden lg:block relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={uzairImage}
                alt="Uzair Muhammad - Presale Expert"
                className="w-full aspect-[4/5] object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
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
