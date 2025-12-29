import { AlertTriangle } from "lucide-react";

const realities = [
  {
    title: "Presales are not guaranteed wins",
    description: "Markets change. Projects get delayed. Values can decline. A good strategy accounts for all scenarios — not just the best case.",
  },
  {
    title: "Assignments are not always possible",
    description: "Many projects restrict or prohibit assignments. Some require developer approval with significant fees. Know before you buy.",
  },
  {
    title: "Completion timelines are estimates",
    description: "Developers can delay by months or years. Your financial planning must account for extended timelines and carrying costs.",
  },
  {
    title: "Not all presales are good investments",
    description: "Over 80% of presale projects don't meet strict investment criteria. Just because it's 'presale' doesn't mean it's a deal.",
  },
  {
    title: "Past performance doesn't guarantee future results",
    description: "The Vancouver market has been strong, but cycles exist. Strategy matters more than timing the market perfectly.",
  },
];

export const RiskRealitySection = () => {
  return (
    <section className="py-16 sm:py-24 bg-card">
      <div className="container-xl px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-destructive/30 bg-destructive/5 mb-3 sm:mb-4">
              <AlertTriangle className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-destructive" />
              <span className="text-xs sm:text-sm font-medium text-destructive">Important Disclosure</span>
            </div>
            <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-bold text-foreground">
              Presale <span className="text-gradient">Realities</span>
            </h2>
            <p className="mt-3 sm:mt-4 text-sm sm:text-base text-foreground/70 max-w-2xl mx-auto">
              Honest expectations build trust. Here's what every presale buyer and investor should understand.
            </p>
          </div>

          <div className="space-y-3 sm:space-y-4">
            {realities.map((item, index) => (
              <div
                key={index}
                className="p-4 sm:p-6 bg-background rounded-lg sm:rounded-xl border border-border"
              >
                <h3 className="font-semibold text-sm sm:text-base text-foreground mb-1.5 sm:mb-2">{item.title}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 sm:mt-12 p-5 sm:p-8 bg-primary/5 rounded-xl sm:rounded-2xl border border-primary/10 text-center">
            <p className="text-sm sm:text-lg text-foreground/80 max-w-2xl mx-auto leading-relaxed">
              "I'd rather lose a client to honesty than gain one through hype. Presales can be incredibly profitable — but only with the right project, the right terms, and the right expectations."
            </p>
            <p className="text-xs sm:text-sm text-primary mt-3 sm:mt-4">— Uzair Muhammad</p>
          </div>
        </div>
      </div>
    </section>
  );
};
