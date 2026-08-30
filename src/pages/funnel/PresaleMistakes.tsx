import { FunnelPage, RelatedLinks, type FunnelFAQ } from "@/components/FunnelPage";
import { BuyerRepTable } from "@/components/BuyerRepTable";

const faqs: FunnelFAQ[] = [
  {
    question: "What's the biggest presale mistake?",
    answer:
      "Making the project decision before understanding the full financial and contractual commitment.",
  },
  {
    question: "Should I read the disclosure statement?",
    answer:
      "Yes, and you should obtain appropriate legal advice if you need help understanding your rights or obligations.",
  },
  {
    question: "Why does the floor plan matter so much?",
    answer:
      "Because you're eventually living in, renting or reselling the actual space — not the rendering.",
  },
  {
    question: "Why do I need an exit plan?",
    answer: "Because life can change during a multi-year completion timeline.",
  },
];

const PresaleMistakes = () => (
  <FunnelPage
    path="/presale-mistakes-fraser-valley"
    title="7 Presale Mistakes Fraser Valley Buyers Make"
    description="Seven common mistakes to avoid when evaluating a presale condo or townhome in the Fraser Valley."
    h1="7 Presale Mistakes That Happen Before the Keys."
    eyebrow="Buyer Beware"
    breadcrumbName="Presale Mistakes Fraser Valley"
    intro="I've helped 450+ families purchase new homes. The mistakes I worry about aren't usually dramatic. They're small assumptions made early that become expensive problems later. Here are seven worth avoiding."
    faqs={faqs}
  >
    <h2>Mistake 1 — Falling in love with the project before comparing the market</h2>
    <p>
      The presentation centre only needs you to compare its floor plans. You should compare its project against the market.
    </p>

    <h2>Mistake 2 — Confusing the sales team with your own advisor</h2>
    <p>
      The development's sales team has a different role from someone advising you as the buyer. Understand the difference.
    </p>

    <BuyerRepTable />

    <h2>Mistake 3 — Treating the disclosure information like paperwork</h2>
    <p>
      The disclosure material helps explain what you're actually buying. Read it carefully and obtain legal advice when appropriate.
    </p>

    <h2>Mistake 4 — Assuming you'll always be able to sell the contract before completion</h2>
    <p>
      Assignment rules vary by project. If flexibility matters, understand the provisions before you commit.
    </p>

    <h2>Mistake 5 — Buying a bad floor plan because the price looks good</h2>
    <p>
      Discounted wasted square footage is still wasted square footage. The home has to function after the marketing campaign ends.
    </p>

    <h2>Mistake 6 — Planning for the first deposit instead of the entire timeline</h2>
    <p>
      Map every deposit, likely closing cost and eventual financing requirement before signing.
    </p>

    <h2>Mistake 7 — Having no Plan B</h2>
    <p>
      What happens if you move? Change jobs? Have a child? Rates change? The market changes? A strong purchase should leave you with options.
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
