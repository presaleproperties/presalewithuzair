import { FunnelPage, RelatedLinks, type FunnelFAQ } from "@/components/FunnelPage";

const faqs: FunnelFAQ[] = [
  {
    question: "What are the actual steps to buy a Fraser Valley presale?",
    answer:
      "Register early with me for VIP access, shortlist 2–3 projects that match your budget, secure your unit at the private VIP event before public launch, then use the 7-day rescission window to complete contract review, disclosure statement review and financing pre-qualification. I run every step with you.",
  },
  {
    question: "When should I actually call you?",
    answer:
      "Before you talk to any presentation centre. Once you register with a developer, that developer's sales rep gets credited as your representative and I can't step in without a fight. Call me first — even if you don't buy through me, you'll know the questions to ask.",
  },
  {
    question: "How do deposits work on a Fraser Valley presale?",
    answer:
      "Most developers ask for 15–20% staged over 12–24 months. In softer windows we negotiate 10% ladders on select projects. You'll typically pay 5% at signing, another 5% at 30–90 days, and the rest at pre-set milestones. I confirm the full deposit ladder in writing before you sign.",
  },
  {
    question: "What is the 7-day rescission window?",
    answer:
      "BC law gives you seven days after signing to walk away with no penalty. Use it. That's the window I use to review the disclosure statement, run financing, and pressure-test the contract. If anything looks wrong, we cancel — clean, no cost.",
  },
  {
    question: "Do I have to pay GST on a presale?",
    answer:
      "Yes — new construction is subject to 5% GST. There's a partial GST New Housing Rebate for homes under certain price thresholds if the home will be your principal residence. I'll walk you through whether you qualify and how the rebate is applied to your closing.",
  },
];

const BuyPresaleFraserValley = () => (
  <FunnelPage
    path="/buy-presale-fraser-valley"
    title="How to Buy a Presale in the Fraser Valley (With Uzair)"
    description="I'm Uzair — buyer-only presale specialist. Step-by-step guide to buying a presale condo in Surrey, Langley, Abbotsford and the Fraser Valley: deposits, rescission, GST and timing."
    h1="How to Buy a Presale in the Fraser Valley (With Uzair)"
    eyebrow="How To Buy"
    breadcrumbName="How to Buy a Presale in the Fraser Valley"
    intro="I'm Uzair Muhammad, buyer-only presale specialist for the Fraser Valley. Buying a presale isn't like buying resale — the deposit ladder, rescission window, GST rules and disclosure statement all move on the developer's schedule, not yours. Here's the step-by-step I run with every buyer, and exactly when in the process you should call me — before you set foot in a presentation centre."
    faqs={faqs}
  >
    <h2>My step-by-step for buying a Fraser Valley presale</h2>
    <p>
      Step one: we talk before you register anywhere. Step two: I build you a shortlist of 2–3 projects that actually fit your budget, timeline and exit plan. Step three: VIP allocation event — you pick your unit at pre-public pricing with incentives that don't reach the public launch. Step four: 7-day rescission — contract review, disclosure statement, financing. Step five: staged deposits and completion.
    </p>

    <h2>Deposits — what to expect</h2>
    <p>
      Fraser Valley developers typically ask for 15–20% staged over 12–24 months. On a $600,000 condo, that's often 5% at signing, another 5% within 30–90 days, and the balance at construction milestones. I flag every deposit date in writing so nothing surprises you at 30, 60 or 90 days.
    </p>

    <h2>Rescission — the 7-day window that matters</h2>
    <p>
      BC law gives you seven days after signing to walk away without penalty. That window exists for a reason: it's when your realtor and lawyer review the contract, the disclosure statement and the deposit protection. If I spot something ugly, we cancel — clean, no cost. Buyers who skip this step are the ones who call me a year later with problems.
    </p>

    <h2>GST and the New Housing Rebate</h2>
    <p>
      Presales are new construction, so 5% GST applies on top of the purchase price. If the home will be your principal residence and it's under the current price cap, you may qualify for the partial GST New Housing Rebate. I walk you through the calculation before you commit.
    </p>

    <h2>When to call me — before the sales centre</h2>
    <p>
      Once you register with a developer, their sales rep is credited as your representative. That's the single biggest mistake I see. Call me first — even a five-minute call protects your right to independent buyer-only representation on any presale in the Fraser Valley.
    </p>

    <RelatedLinks
      links={[
        { to: "/presale-mistakes-fraser-valley", label: "Presale Mistakes I See Fraser Valley Buyers Make" },
        { to: "/buyer-representation-presale-fraser-valley", label: "Do You Need Your Own Realtor for a Presale?" },
        { to: "/new-to-presale-start-here", label: "New to Presale? Start Here" },
      ]}
    />
  </FunnelPage>
);

export default BuyPresaleFraserValley;
