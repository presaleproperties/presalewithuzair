import { FunnelPage, RelatedLinks, type FunnelFAQ } from "@/components/FunnelPage";
import { BuyerRepTable } from "@/components/BuyerRepTable";

const faqs: FunnelFAQ[] = [
  {
    question: "What's the #1 presale mistake you see in the Fraser Valley?",
    answer:
      "Registering with the developer's sales centre before hiring your own realtor. The moment you register, that sales rep is credited as your representative — and they work for the developer, not you. Call an independent buyer's agent first, even if it's a five-minute call.",
  },
  {
    question: "Isn't the sales-centre rep just there to help me?",
    answer:
      "They're a licensed professional, but their loyalty and paycheque come from the developer. Their job is to sell you what the developer needs to sell — not to tell you that the floor plan is inefficient, the deposit ladder is aggressive, or a better project is launching next month.",
  },
  {
    question: "Why does the disclosure statement matter so much?",
    answer:
      "The Disclosure Statement is the legal document that reveals deposit protection, assignment fees, occupancy dates, cost overruns, and material changes. Skipping it is how buyers get surprised by 2–3% assignment fees, delayed completions, or clauses that block them from selling before completion.",
  },
  {
    question: "What's the deal with GST and deposit timing?",
    answer:
      "GST (5%) is charged at completion, not at signing — and the New Housing Rebate only applies to principal residences under a price cap. Deposits are staged, but interest-free financing on them isn't automatic. Buyers who don't map deposit dates and GST cash-flow end up short at closing.",
  },
  {
    question: "How do I know if a floor plan is actually bad?",
    answer:
      "Bad floor plans have wasted square footage — long entry hallways, bedrooms opening into living rooms, unusable bump-outs. They price the same per square foot but sell for less at resale. I compare every shortlisted floor plan against resale comps before I let a buyer sign.",
  },
];

const PresaleMistakes = () => (
  <FunnelPage
    path="/presale-mistakes-fraser-valley"
    title="Presale Mistakes I See Fraser Valley Buyers Make"
    description="I'm Uzair — buyer-only presale specialist. The Fraser Valley presale mistakes I see most: registering with developers first, skipping disclosure, bad floor plans, no exit plan."
    h1="Presale Mistakes I See Fraser Valley Buyers Make"
    eyebrow="Buyer Beware"
    breadcrumbName="Presale Mistakes Fraser Valley"
    intro="I'm Uzair Muhammad, and I've helped 450+ buyers close on presales in the Fraser Valley. The same mistakes come up over and over — and they cost real money. Here are the ones I see most: registering with the developer first, trusting the sales-centre rep, skipping the disclosure statement, ignoring assignment and rescission clauses, choosing a bad floor plan, mismanaging GST and deposit timing, and buying without an exit plan."
    faqs={faqs}
  >
    <h2>Mistake 1 — Registering with the developer first</h2>
    <p>
      The single most expensive presale mistake in the Fraser Valley. The moment you register with the sales centre, their in-house rep is credited as your representative. You just gave away your right to independent representation — for free. Call an independent buyer's agent first, even if it's a five-minute conversation.
    </p>

    <h2>Mistake 2 — Trusting the sales-centre rep</h2>
    <p>
      The rep at the presentation centre is licensed, professional and pleasant. Their paycheque still comes from the developer. Their job is to sell you the units the developer needs to move — not tell you that a competing project two blocks away is better priced.
    </p>

    <BuyerRepTable />

    <h2>Mistake 3 — Skipping the disclosure statement</h2>
    <p>
      The Disclosure Statement is where the ugly clauses live: assignment fees (often 1–3%), lifting restrictions, deposit protection details, right to change floor plans, occupancy dates. Skipping it during the 7-day rescission window is how buyers get blindsided a year later.
    </p>

    <h2>Mistake 4 — Ignoring assignment and rescission clauses</h2>
    <p>
      Assignment is your exit strategy — the ability to sell the contract before completion. Some contracts allow it at 50% deposit paid, some ban it entirely, some charge 3%. If you don't know your assignment rights before you sign, you don't have an exit plan.
    </p>

    <h2>Mistake 5 — Bad floor plans</h2>
    <p>
      Bad floor plans have wasted square footage, awkward bedroom placement, and no meaningful storage. They price the same per square foot as good plans but consistently under-perform on resale. I compare every shortlisted plan against resale comps before I recommend it.
    </p>

    <h2>Mistake 6 — GST and deposit-timing surprises</h2>
    <p>
      GST is 5% at completion, and the New Housing Rebate is capped. Deposits are staged, not one lump sum, but every date is a hard date. Buyers who don't map GST cash-flow and deposit milestones end up scrambling.
    </p>

    <h2>Mistake 7 — No exit plan</h2>
    <p>
      Every presale needs an exit plan: assignment, hold and rent, or move in and sell resale. If you don't know which one applies to you before you sign, you're guessing with $600,000 of contract value.
    </p>

    <RelatedLinks
      links={[
        { to: "/buyer-representation-presale-fraser-valley", label: "Do You Need Your Own Realtor for a Presale?" },
        { to: "/best-presale-realtor-fraser-valley", label: "Best Presale Realtor in the Fraser Valley" },
        { to: "/buy-presale-fraser-valley", label: "How to Buy a Presale in the Fraser Valley" },
      ]}
    />
  </FunnelPage>
);

export default PresaleMistakes;
