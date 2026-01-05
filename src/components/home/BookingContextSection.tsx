import { CheckCircle, XCircle } from "lucide-react";
import Cal from "@calcom/embed-react";

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
    <section className="py-16 sm:py-24 bg-background">
      <div className="container-xl px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10 sm:mb-16">
            <p className="section-label mb-3 sm:mb-4">Is This Right For You?</p>
            <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-bold text-foreground uppercase tracking-tight">
              Before You <span className="text-gradient">Book a Call</span>
            </h2>
            <p className="mt-3 sm:mt-4 text-sm sm:text-base text-foreground/70 max-w-2xl mx-auto font-normal normal-case tracking-normal">
              I work with a select number of buyers to ensure proper guidance. Please review to see if we're a good fit.
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
                  This is a good fit if you...
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
                  This may not be a fit if you...
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

          {/* Embedded Cal.com Calendar */}
          <div className="max-w-4xl mx-auto rounded-xl overflow-hidden border border-border bg-card h-[450px] sm:h-[600px]">
            <Cal
              calLink="presalewithuzair/meeting"
              style={{ width: "100%", height: "100%", overflow: "scroll" }}
              config={{
                layout: "month_view",
                theme: "dark",
              }}
            />
          </div>
          
          <p className="text-xs sm:text-sm text-muted-foreground mt-4 text-center">
            Limited weekly availability. Serious inquiries only.
          </p>
        </div>
      </div>
    </section>
  );
};
