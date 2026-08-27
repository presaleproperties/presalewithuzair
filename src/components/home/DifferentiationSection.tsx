import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { useReveal } from "@/hooks/useReveal";

const PPG_URL = "https://presaleproperties.com";

type Block = {
  heading: string;
  body: ReactNode;
  cta?: { to: string; label: string };
  feature?: boolean;
  wide?: boolean;
};

const blocks: Block[] = [
  {
    heading:
      "A beautiful presentation centre doesn't tell you whether a project is a good buy.",
    body: (
      <>
        Presale can be a great fit for the right buyer. But the decision should be based on more
        than renderings, incentives and a floor plan that looks good on paper. I help you compare
        the project against your budget, timeline and goals — including the location, developer,
        deposit schedule, completion timing, floor plan and nearby alternatives. The goal isn't to
        find a project to buy. It's to find a project worth buying.
      </>
    ),
    feature: true,
  },
  {
    heading: "I represent the buyer's interests.",
    body: (
      <div className="space-y-4">
        <p>
          The people selling a development have one job: sell that development. My job is
          different. I help you evaluate the options from your side and tell you what I actually
          think.
        </p>
        <p>
          I've helped <strong>450+ families</strong> purchase more than{" "}
          <strong>$200M in new homes</strong>. Before real estate, I spent{" "}
          <strong>10 years</strong> working with the <strong>City of Surrey</strong> in planning
          and bylaws. Today I lead{" "}
          <a
            href={PPG_URL}
            target="_blank"
            rel="noopener"
            className="text-foreground underline underline-offset-4 decoration-foreground/30 transition-colors duration-300 hover:decoration-foreground"
          >
            The Presale Properties Group
          </a>{" "}
          and founded the <strong>Vancouver Presale Expo</strong>.
        </p>
        <p>
          I also work in <strong>English, Punjabi, Hindi and Urdu</strong>, so everyone involved in
          the decision can understand what they're committing to.
        </p>
        <p>
          If you're considering a project, talk to me before registering directly with the sales
          centre. Representation rules can vary by development.
        </p>
      </div>
    ),
    cta: { to: "/call", label: "Talk To Uzair First" },
    wide: true,
  },
  {
    heading:
      "Understand the project, the terms and the real numbers before you commit.",
    body: (
      <div className="space-y-4">
        <p>
          A presale decision has more moving parts than the advertised purchase price. I help
          buyers work through the <strong>deposit schedule</strong>,{" "}
          <strong>completion timing</strong>, <strong>assignment provisions</strong>,{" "}
          <strong>incentives</strong> and other important purchase terms in plain language.
        </p>
        <p>
          We also look at the full financial picture: deposits, potential GST, closing costs,
          financing at completion and whether the purchase still makes sense if circumstances
          change.
        </p>
        <p>
          When professional legal, tax or lending advice is needed, I make sure you know which
          questions to take to your lawyer, accountant or lender. And if I don't think a project
          fits your goal, I'll tell you.
        </p>
      </div>
    ),
    wide: true,
  },
];

export const DifferentiationSection = () => {
  useReveal();
  const feature = blocks.find((b) => b.feature)!;
  const rest = blocks.filter((b) => !b.feature);

  return (
    <section className="section-y bg-muted/40">
      <div className="container-xl px-4 sm:px-6">
        {/* Section header */}
        <div className="max-w-3xl mb-12 sm:mb-16 reveal">
          <p className="section-label mb-5">Why Uzair</p>
          <h2 className="h-section text-foreground">
            The project has a sales team. You should have someone looking at it from your side.
          </h2>
          <p className="lede mt-5 max-w-2xl">
            Three things I want every presale buyer to understand before making a decision.
          </p>
        </div>

        {/* Featured statement — asymmetric quote-style card */}
        <article className="reveal relative mb-5 sm:mb-6 rounded-sm bg-foreground text-background overflow-hidden focus-within:ring-2 focus-within:ring-foreground/40 focus-within:ring-offset-2 focus-within:ring-offset-background">
          <div className="relative grid lg:grid-cols-[auto_1fr] gap-6 lg:gap-12 p-8 sm:p-12 lg:p-16">
            <div className="flex lg:flex-col items-center gap-3">
              <span className="text-[0.6875rem] font-semibold tracking-[0.22em] uppercase text-background/45">01</span>
            </div>
            <div>
              <h3 className="font-display text-2xl sm:text-3xl lg:text-[2.25rem] font-bold tracking-tight leading-[1.1] text-background">
                {feature.heading}
              </h3>
              <p className="mt-6 text-base sm:text-lg text-background/75 leading-relaxed max-w-3xl">
                {feature.body}
              </p>
            </div>
          </div>
        </article>

        {/* Bento grid of remaining blocks */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">
          {rest.map((block, i) => {
            const number = String(i + 2).padStart(2, "0");
            return (
              <article
                key={number}
                className={`group reveal relative rounded-sm bg-card border border-border p-7 sm:p-9 hover-lift focus-within:ring-2 focus-within:ring-foreground/30 focus-within:ring-offset-2 focus-within:ring-offset-background ${
                  block.wide ? "lg:col-span-2" : ""
                }`}
              >
                <div className="flex items-center gap-4 mb-4 sm:mb-5">
                  <span className="text-[0.6875rem] font-semibold tracking-[0.22em] uppercase text-foreground/40">{number}</span>
                  
                </div>
                <h3 className="h-card text-foreground mb-4">
                  {block.heading}
                </h3>
                {typeof block.body === "string" ? (
                  <p className="lede">
                    {block.body}
                  </p>
                ) : (
                  <div className="lede">
                    {block.body}
                  </div>
                )}
                {block.cta && (
                  <div className="mt-6">
                    <Link
                      to={block.cta.to}
                      className="group/cta inline-flex items-center gap-2.5 rounded-sm bg-foreground px-6 py-3 text-sm font-semibold text-background transition-colors duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                    >
                      {block.cta.label}
                      <span aria-hidden className="transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/cta:translate-x-1">→</span>
                    </Link>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
