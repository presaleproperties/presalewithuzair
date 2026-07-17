import { Check, X } from "lucide-react";

/**
 * Developer's Sales Rep vs Your Buyer's Agent — reusable comparison table.
 * Embedded on funnel pages that need to explain why buyer-only representation matters.
 */

const rows: { label: string; dev: string; buyer: string }[] = [
  { label: "Who they represent", dev: "The developer", buyer: "You, the buyer" },
  { label: "Who pays them", dev: "The developer", buyer: "The developer's marketing budget" },
  { label: "Whose interest comes first", dev: "Developer's sales targets", buyer: "Your outcome" },
  { label: "Reviews your contract", dev: "No", buyer: "Yes — line by line" },
  { label: "Negotiates your incentives", dev: "No", buyer: "Yes" },
  { label: "Tells you when a project is a bad deal", dev: "No", buyer: "Yes" },
];

interface Props {
  heading?: string;
}

export const BuyerRepTable = ({
  heading = "Developer's Sales Rep vs Your Buyer's Agent",
}: Props) => {
  return (
    <section className="py-12 sm:py-16">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 sm:mb-8">
          <p className="section-label mb-3">Side by Side</p>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-foreground uppercase tracking-tight">
            {heading}
          </h2>
        </div>

        <div className="overflow-hidden rounded-2xl border border-border">
          {/* Header row */}
          <div className="grid grid-cols-3 bg-muted/40">
            <div className="p-3 sm:p-4 text-xs sm:text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              What matters
            </div>
            <div className="p-3 sm:p-4 border-l border-border">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center justify-center h-5 w-5 sm:h-6 sm:w-6 rounded-full bg-muted">
                  <X className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" strokeWidth={3} />
                </span>
                <span className="font-display text-xs sm:text-sm font-bold uppercase text-muted-foreground">
                  Developer's Sales Rep
                </span>
              </div>
            </div>
            <div className="p-3 sm:p-4 border-l border-border bg-primary/5">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center justify-center h-5 w-5 sm:h-6 sm:w-6 rounded-full bg-primary">
                  <Check className="h-3 w-3 sm:h-4 sm:w-4 text-primary-foreground" strokeWidth={3} />
                </span>
                <span className="font-display text-xs sm:text-sm font-bold uppercase text-primary">
                  Your Buyer's Agent
                </span>
              </div>
            </div>
          </div>

          {/* Rows */}
          {rows.map((r, i) => (
            <div
              key={r.label}
              className={`grid grid-cols-3 border-t border-border ${
                i % 2 === 0 ? "bg-background" : "bg-muted/10"
              }`}
            >
              <div className="p-3 sm:p-4 text-xs sm:text-sm font-semibold text-foreground">
                {r.label}
              </div>
              <div className="p-3 sm:p-4 border-l border-border text-xs sm:text-sm text-muted-foreground">
                {r.dev}
              </div>
              <div className="p-3 sm:p-4 border-l border-border bg-primary/5 text-xs sm:text-sm text-foreground font-medium">
                {r.buyer}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
