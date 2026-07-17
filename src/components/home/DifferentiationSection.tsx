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
    body: "Presale can be a smart move. It can also be an expensive mistake if you buy the wrong floor plan, the wrong building, the wrong location, or the wrong contract without understanding the risks. My job is to slow the decision down, compare the options, and help you understand what you're really buying — not the polished sales-centre version.",
    feature: true,
  },
  {
    heading: "Talk to me before you register at the sales centre.",
    body: "Once you register directly with a project, your representation options can become more limited depending on that developer's rules. Asking first costs nothing. Undoing it later is harder. If you've already registered, tell me — I'll explain what options may still be open.",
    cta: { to: "/contact", label: "Talk To Uzair First" },
    wide: true,
  },
  {
    heading: "The person showing you the floor plans is paid by the developer.",
    body: "At a presale sales centre, every person in the room is paid by the developer. That's normal, but it means a buyer who walks in alone has no one representing their side of the contract. I only represent buyers. I don't promote or hype projects, and I don't work for developers. Most realtors push every new launch to build relationships with developers; that may help their pipeline, but it does a disservice to buyers. My job is to protect your side of the deal, not to move inventory. For many presale projects my fee is paid through the project's sales structure, so representation usually costs you nothing — I'll confirm exactly how it works on your project before you commit.",
    wide: true,
  },
  {
    heading: "Track record",
    body: (
      <div className="space-y-4">
        <p>
          I've sold 450+ presale units and more than $200M in new construction. I've worked in
          presale exclusively for 5 years and hold a 4.9-star Google rating.
        </p>
        <p>
          I lead{" "}
          <a
            href={PPG_URL}
            target="_blank"
            rel="noopener"
            className="text-primary underline underline-offset-4 hover:text-primary/80"
          >
            The Presale Properties Group
          </a>
          , a team of agents working the Fraser Valley presale market, and I founded the Vancouver
          Presale Expo. I'm a licensed BC REALTOR® under Real Broker and regulated by the BC
          Financial Services Authority.
        </p>
        <p>
          Before real estate, I spent 10 years with the City of Surrey in planning and bylaws.
        </p>
      </div>
    ),
    wide: true,
  },
  {
    heading: "The contract is explained in Punjabi, Hindi, and Urdu — not just English.",
    body: "The buyer usually speaks English. The parents helping with the deposit often don't. And nobody at the sales centre is going to stop and explain a hundred-page disclosure statement in Punjabi, Hindi, or Urdu. I work in all four languages. I sit down with the people actually writing the cheque and walk through the deposit schedule, the completion date, and what the contract really commits them to — in their own language. I was born in Pakistan and raised in Surrey.",
  },
  {
    heading: "BC gives buyers 7 days to cancel. Most buyers spend it doing nothing.",
    body: "The disclosure statement runs over a hundred pages and arrives at the same time as the deposit cheque. During those 7 days you can cancel for any reason. After that, you can't. I read the whole document inside that window: deposit schedule, assignment rights, completion dates, and what happens if the developer is late or changes the plans. I spent 10 years at the City of Surrey in planning and bylaws, so I read the approved plans, not the marketing renderings.",
  },
  {
    heading: "The sticker price isn't the final price.",
    body: "Canada's enhanced First-Time Buyer GST rebate can save up to $50,000 on qualifying new homes under the cap. BC's Newly-Built Home PTT exemption removes property transfer tax on qualifying homes up to $1.1M. Together that's a five-figure difference at closing, and most first-time buyers never find out they qualified. I work out the real number before you commit: GST, PTT, rebates, deposit dates, and what the mortgage will look like at completion in 12 to 36 months.",
  },
  {
    heading: "Sometimes the right move is to wait.",
    body: "Not every presale project is worth buying into. I look at the location, the price per square foot, the floor plan and layout, the builder's track record, and whether the project actually makes sense for your goal. If the numbers don't work, the layout is wrong, the location is weak, or the builder is a risk, I tell buyers to sit this one out. Sitting on the sideline is often how you get the better deal — when the right project launches at the right time. For me it's not about doing a deal. It's about getting the right deal, in the right project, at the right time.",
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
            Eight things every Fraser Valley presale buyer should know before signing — from someone
            who gets paid to protect the buyer, not to sell the project.
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
