import type { ReactNode } from "react";
import { Link } from "react-router-dom";

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
      "The sales centre is built to sell the project. I'm here to help you decide if it's actually right for you.",
    body: (
      <>
        Presale can be a smart move. It can also be an expensive mistake if you buy the wrong{" "}
        <strong>floor plan</strong>, <strong>building</strong>, <strong>location</strong>, or{" "}
        <strong>contract</strong> without understanding the risks. My job is to slow the decision
        down, compare the options, and help you understand what you're really buying — not the
        polished sales-centre version.
      </>
    ),
    feature: true,
  },
  {
    heading: "I represent buyers, not developers.",
    body: (
      <div className="space-y-4">
        <p>
          At the sales centre, everyone in the room is paid by the <strong>developer</strong>. That
          leaves the buyer without anyone on their side of the <strong>contract</strong>. I only
          represent <strong>buyers</strong>. I don't hype projects and I don't chase{" "}
          <strong>developer relationships</strong> at your expense.
        </p>
        <p>
          I've sold <strong>450+ presale units</strong> and more than{" "}
          <strong>$200M in new construction</strong>. I lead{" "}
          <a
            href={PPG_URL}
            target="_blank"
            rel="noopener"
            className="text-primary underline underline-offset-4 hover:text-primary/80"
          >
            The Presale Properties Group
          </a>{" "}
          and founded the <strong>Vancouver Presale Expo</strong>. I'm a licensed{" "}
          <strong>BC REALTOR®</strong> under <strong>Real Broker</strong>. Before real estate, I spent{" "}
          <strong>10 years</strong> with the <strong>City of Surrey</strong> in planning and bylaws. I
          also work in <strong>Punjabi, Hindi, and Urdu</strong>, so the people writing the cheque
          can understand the contract in their own language.
        </p>
        <p>
          Talk to me before you <strong>register</strong> at a sales centre — once you register
          directly, your representation options can become more limited.
        </p>
      </div>
    ),
    cta: { to: "/contact", label: "Talk To Uzair First" },
    wide: true,
  },
  {
    heading:
      "I help you understand the contract, the real numbers, and whether a project is worth waiting for.",
    body: (
      <div className="space-y-4">
        <p>
          I help you understand the <strong>disclosure statement</strong> in plain language: what
          the <strong>deposit schedule</strong>, <strong>completion date</strong>,{" "}
          <strong>assignment rights</strong>, and <strong>developer delays</strong> actually mean for
          you.
        </p>
        <p>
          I walk you through the <strong>real cost of ownership</strong> — deposits, mortgage at
          completion, and closing costs — so you see the full picture before you decide.
        </p>
        <p>
          I compare projects on <strong>location</strong>, <strong>price per square foot</strong>,{" "}
          <strong>builder track record</strong>, <strong>floor plan</strong>, and fit for your{" "}
          <strong>goal</strong>. If the numbers don't work or the project is wrong for you, I'll tell
          you to wait. The right deal in the right project beats any deal.
        </p>
      </div>
    ),
    wide: true,
  },
];

export const DifferentiationSection = () => {
  const feature = blocks.find((b) => b.feature)!;
  const rest = blocks.filter((b) => !b.feature);

  return (
    <section className="section-y bg-muted/40 border-y border-border">
      <div className="container-xl px-4 sm:px-6">
        {/* Section header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <p className="section-label mb-3 sm:mb-4">Why Uzair</p>
          <h2 className="h-section text-foreground">
            I represent your side of the deal.
          </h2>
          <p className="lede mt-5 max-w-2xl">
            Three things every Fraser Valley presale buyer should know before signing — from
            someone who gets paid to protect the buyer, not to sell the project.
          </p>
        </div>

        {/* Featured statement — asymmetric quote-style card */}
        <article className="relative mb-6 sm:mb-8 rounded-2xl bg-foreground text-background overflow-hidden shadow-card transition-all duration-300 hover:shadow-glow focus-within:ring-2 focus-within:ring-primary/50 focus-within:ring-offset-2 focus-within:ring-offset-background">
          <div className="absolute inset-0 opacity-[0.04]" aria-hidden>
            <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-primary blur-3xl" />
          </div>
          <div className="relative grid lg:grid-cols-[auto_1fr] gap-6 lg:gap-12 p-8 sm:p-12 lg:p-16">
            <div className="flex lg:flex-col items-center gap-3">
              <span className="eyebrow text-primary-foreground/60">01</span>
              <span className="hidden lg:block h-16 w-px bg-background/20" />
              <span className="lg:hidden h-px w-16 bg-background/20 self-center" />
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {rest.map((block, i) => {
            const number = String(i + 2).padStart(2, "0");
            return (
              <article
                key={number}
                className={`group relative rounded-2xl bg-card border border-border p-7 sm:p-9 shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:shadow-card hover:border-primary/40 focus-within:ring-2 focus-within:ring-primary/50 focus-within:ring-offset-2 focus-within:ring-offset-background focus-within:border-primary/40 ${
                  block.wide ? "lg:col-span-2" : ""
                }`}
              >
                <div className="flex items-center gap-4 mb-4 sm:mb-5">
                  <span className="eyebrow">{number}</span>
                  <span className="h-px flex-1 bg-border" />
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
                      className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                    >
                      {block.cta.label}
                      <span aria-hidden>→</span>
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
