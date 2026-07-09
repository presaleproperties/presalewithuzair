import { FunnelPage, RelatedLinks, type FunnelFAQ } from "@/components/FunnelPage";

const faqs: FunnelFAQ[] = [
  {
    question: "Are Fraser Valley presales still a good investment in 2026?",
    answer:
      "Selectively — yes. The Surrey–Langley SkyTrain corridor and well-located Coquitlam and Burnaby South projects still show strong fundamentals. Weaker Abbotsford towers priced above resale don't. I underwrite each project on rental demand, deposit terms and projected completion pricing before recommending anything.",
  },
  {
    question: "Which cities and unit types do you actually recommend?",
    answer:
      "For appreciation I favour Surrey City Centre, Fleetwood and Willoughby along the SkyTrain corridor. For cash-flow I look at 1-bed + den layouts in the $500K–$650K range with strong rental fundamentals. Family investors often do better with well-designed 2-bed townhomes than small condos.",
  },
  {
    question: "What kind of rental demand exists in the Fraser Valley?",
    answer:
      "Strong. Surrey City Centre benefits from SFU Surrey, the hospital expansion and SkyTrain — vacancy rates run tight. Langley Willoughby draws families and long-term tenants. I always compare a project's projected rents against holding costs before I let an investor sign.",
  },
  {
    question: "How do assignment sales and exit strategy actually work?",
    answer:
      "Assignment lets you sell the contract before completion — great in a rising market. Fees typically run 1–3%, with lifting clauses that control when you can list. I review the assignment clause before you sign, so your exit strategy is contractually real, not just a hope.",
  },
  {
    question: "When would you tell me NOT to buy a presale?",
    answer:
      "When the numbers don't work — presale price above resale comps, deposit ladder too aggressive for your income, or a project priced on future SkyTrain hype that's five years out. I lose deals telling buyers to walk away, but that's the job. Better to lose a deal than lose a deposit.",
  },
];

const InvestmentAdvice = () => (
  <FunnelPage
    path="/fraser-valley-presale-investment-advice"
    title="Fraser Valley Presale Investment Advice (2026)"
    description="I'm Uzair — buyer-only presale specialist. Honest Fraser Valley presale investment advice: which cities, rental demand, assignment strategy, and when NOT to buy. No hype."
    h1="Fraser Valley Presale Investment Advice"
    eyebrow="Investor View"
    breadcrumbName="Fraser Valley Presale Investment Advice"
    intro="I'm Uzair Muhammad, and I invest in the same presales I recommend — so my advice comes from real skin in the game, not a brochure. Here's my honest take on the Fraser Valley presale market for investors: which cities and unit types actually pencil out, what rental demand looks like, how assignment and exit strategy work, and — most importantly — when I tell buyers not to buy. Projected numbers only; no guaranteed returns."
    faqs={faqs}
  >
    <h2>Which cities and unit types I favour</h2>
    <p>
      For appreciation, I focus on the Surrey–Langley SkyTrain corridor: Surrey City Centre, Fleetwood, and Willoughby. For cash-flow-friendly investments, I look at well-designed 1-bed + den layouts in the $500K–$650K range with tight rental fundamentals. Family investors often do better with 2-bed townhomes than small condos — better tenant profile, lower turnover.
    </p>

    <h2>Rental demand in the Fraser Valley</h2>
    <p>
      Surrey City Centre benefits from SFU Surrey, hospital expansion, and the incoming SkyTrain extension — vacancy runs tight and rents track upward. Langley Willoughby draws family renters looking for townhome space. Every investor projection I build compares projected rents against holding costs (mortgage, strata, taxes) before I recommend the deal.
    </p>

    <h2>Assignment sales and exit strategy</h2>
    <p>
      Assignment is your exit option — you sell the contract before completion. Fees typically run 1–3% of the assignment price, with lifting clauses controlling when you can list. This can be powerful in a rising market and useless in a flat one. I review the assignment clause in writing before you sign, so the exit is real.
    </p>

    <h2>When I tell buyers NOT to buy</h2>
    <p>
      When presale $/sqft is above nearby resale comps. When the deposit ladder outruns the buyer's income. When appreciation depends on SkyTrain infrastructure five years out. I lose deals turning buyers away from bad projects — that's the job. Buyer-only means I'm accountable to you, not to a developer's sales quota.
    </p>

    <p className="text-sm text-muted-foreground italic">
      Note: All investment references above are projected or historical context, not guarantees. Real estate carries risk. Consult your own accountant and legal advisor.
    </p>

    <RelatedLinks
      links={[
        { to: "/buy-presale-fraser-valley", label: "How to Buy a Presale in the Fraser Valley" },
        { to: "/best-presale-realtor-fraser-valley", label: "Best Presale Realtor in the Fraser Valley" },
        { to: "/presale-mistakes-fraser-valley", label: "Presale Mistakes I See Fraser Valley Buyers Make" },
      ]}
    />
  </FunnelPage>
);

export default InvestmentAdvice;
