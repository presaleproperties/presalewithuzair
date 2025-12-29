import { Button } from "@/components/ui/button";
import { Phone, CheckCircle, XCircle } from "lucide-react";
import { useCalendly } from "@/hooks/useCalendly";

const forYou = [
  "You're serious about buying a presale in the next 6-12 months",
  "You're an investor looking to add presales to your portfolio",
  "You're a developer seeking launch or advisory support",
  "You're a realtor wanting to better serve presale clients",
];

const notForYou = [
  "You're just casually browsing with no timeline",
  "You're looking for resale properties only",
  "You want someone to tell you what to buy without discussion",
  "You're not ready to have an honest conversation about budget and goals",
];

export const BookingContextSection = () => {
  const { openCalendly } = useCalendly();

  return (
    <section className="py-16 sm:py-24 bg-background">
      <div className="container-xl px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10 sm:mb-16">
            <p className="section-label mb-3 sm:mb-4">Schedule a Call</p>
            <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-bold text-foreground uppercase tracking-tight">
              Before You <span className="text-gradient">Book</span>
            </h2>
            <p className="mt-3 sm:mt-4 text-sm sm:text-base text-foreground/70 max-w-2xl mx-auto font-normal normal-case tracking-normal">
              Strategy calls are limited. Please review this information to ensure we're a good fit.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-5 sm:gap-8 mb-8 sm:mb-12">
            {/* For You */}
            <div className="bg-card rounded-xl sm:rounded-2xl border border-border p-5 sm:p-8">
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <div className="p-1.5 sm:p-2 rounded-lg bg-primary/10">
                  <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                </div>
                <h3 className="font-display text-base sm:text-lg font-bold text-foreground">
                  This call is for you if...
                </h3>
              </div>
              <ul className="space-y-2.5 sm:space-y-3">
                {forYou.map((item, index) => (
                  <li key={index} className="flex items-start gap-2 sm:gap-3 text-xs sm:text-sm text-foreground/80">
                    <CheckCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Not For You */}
            <div className="bg-card rounded-xl sm:rounded-2xl border border-border p-5 sm:p-8">
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <div className="p-1.5 sm:p-2 rounded-lg bg-destructive/10">
                  <XCircle className="h-4 w-4 sm:h-5 sm:w-5 text-destructive" />
                </div>
                <h3 className="font-display text-base sm:text-lg font-bold text-foreground">
                  This call is NOT for you if...
                </h3>
              </div>
              <ul className="space-y-2.5 sm:space-y-3">
                {notForYou.map((item, index) => (
                  <li key={index} className="flex items-start gap-2 sm:gap-3 text-xs sm:text-sm text-foreground/80">
                    <XCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground/50 flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>


          {/* CTA */}
          <div className="text-center">
            <Button
              variant="hero"
              size="xl"
              className="gap-2 w-full sm:w-auto text-sm sm:text-base h-12 sm:h-14"
              onClick={openCalendly}
            >
              <Phone className="h-4 w-4 sm:h-5 sm:w-5" />
              Book a Presale Strategy Call
            </Button>
            <p className="text-xs sm:text-sm text-muted-foreground mt-3 sm:mt-4">
              Limited weekly availability. Serious inquiries only.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
