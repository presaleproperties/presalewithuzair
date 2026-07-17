import type { ReactNode } from "react";
import { Link } from "react-router-dom";

const PPG_URL = "https://presaleproperties.com";

type Block = { heading: string; body: ReactNode; cta?: { to: string; label: string } };

const blocks: Block[] = [
  {
    heading: "Talk to Uzair before registering at the sales centre.",
    body: "Once a buyer registers directly with a project, their representation options can become more limited, depending on that developer's rules. Asking first costs nothing. Undoing it later is harder. If you have already registered, tell Uzair — he will explain what options may still be open.",
    cta: { to: "/contact", label: "Talk To Uzair First" },
  },
  {
    heading: "The person showing the floor plans is paid by the developer.",
    body: "At a presale sales centre, every person in the room is paid by the developer. That is normal, but it means a buyer who walks in alone has no one representing their side of the contract. Uzair only represents buyers. He has never represented a developer. For many presale projects his fee is paid through the project's sales structure, so representation usually costs the buyer nothing — he'll confirm exactly how it works on your project before you commit.",
  },
  {
    heading: "Track record",
    body: (
      <>
        <p>
          Uzair Muhammad has sold 450+ presale units and more than $200M in new construction. He has worked in presale exclusively for 5 years and holds a 4.9 star rating from 36 Google reviews.
        </p>
        <p className="mt-4">
          He leads{" "}
          <a
            href={PPG_URL}
            target="_blank"
            rel="noopener"
            className="text-primary underline underline-offset-4 hover:text-primary/80"
          >
            The Presale Properties Group
          </a>
          , a team of agents working the Fraser Valley presale market, and he founded the Vancouver Presale Expo. He is a licensed BC REALTOR® under Real Broker and regulated by the BC Financial Services Authority.
        </p>
        <p className="mt-4">
          Before real estate, Uzair spent 10 years with the City of Surrey in planning and bylaws.
        </p>
      </>
    ),
  },
  {
    heading: "The deposit is usually a family decision, and the family is often not given the contract in their language.",
    body: "In most Fraser Valley presale purchases, parents help with the deposit. The buyer speaks English. The parents putting up the money often do not. Nobody at the sales centre is going to explain a disclosure statement in Punjabi. Uzair works in Punjabi, Hindi, Urdu and English. He sits down with the whole family and explains the deposit schedule, the completion date and the contract terms to the people actually writing the cheque. He was born in Pakistan and raised in Surrey.",
  },
  {
    heading: "BC gives buyers 7 days to cancel. Most buyers spend it doing nothing.",
    body: "The disclosure statement runs over a hundred pages and arrives at the same time as the deposit cheque. During those 7 days a buyer can cancel for any reason. After that, they cannot. Uzair reads the whole document inside that window: deposit schedule, assignment rights, completion dates, and what happens if the developer is late or changes the plans. He spent 10 years at the City of Surrey in planning and bylaws, so he reads the approved plans, not the marketing renderings.",
  },
  {
    heading: "The sticker price is not the final price.",
    body: "Canada's enhanced First-Time Buyer GST rebate can save up to $50,000 on qualifying new homes under the cap. BC's Newly-Built Home PTT exemption removes property transfer tax on qualifying homes up to $1.1M. Together that is a five-figure difference at closing, and most first-time buyers never find out they qualified. Uzair works out the real number before a buyer commits: GST, PTT, rebates, deposit dates, and what the mortgage will look like at completion in 12 to 36 months.",
  },
  {
    heading: "Sometimes Uzair tells buyers not to buy.",
    body: "Everyone else a presale buyer talks to gets paid only if the sale closes. Uzair has told clients to walk away from projects and lost the commission. Buyer-only representation is what makes that possible.",
  },
];

export const DifferentiationSection = () => {
  return (
    <section className="py-16 sm:py-24 bg-background">
      <div className="container-xl px-4 sm:px-6">
        <div className="max-w-3xl mx-auto space-y-12 sm:space-y-16">
          {blocks.map((block, i) => (
            <article key={i}>
              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground leading-tight mb-4">
                {block.heading}
              </h2>
              {typeof block.body === "string" ? (
                <p className="text-base sm:text-lg text-foreground/70 leading-relaxed">
                  {block.body}
                </p>
              ) : (
                <div className="text-base sm:text-lg text-foreground/70 leading-relaxed">
                  {block.body}
                </div>
              )}
              {block.cta && (
                <div className="mt-5">
                  <Link
                    to={block.cta.to}
                    className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 transition"
                  >
                    {block.cta.label}
                  </Link>
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
