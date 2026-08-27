import { FunnelPage, RelatedLinks, type FunnelFAQ } from "@/components/FunnelPage";

const faqs: FunnelFAQ[] = [
  {
    question: "What makes a strong presale investment?",
    answer:
      "A defensible purchase price, useful floor plan, sustainable financing and a believable exit strategy.",
  },
  {
    question: "Is appreciation enough of an investment thesis?",
    answer:
      "I don't think so. Appreciation can help, but it shouldn't be the only reason the numbers work.",
  },
  {
    question: "Should I choose cash flow or appreciation?",
    answer:
      "That depends on your capital, goals and risk tolerance. They require different properties and different assumptions.",
  },
  {
    question: "When should I walk away?",
    answer: "When the project needs too many things to go right.",
  },
];

const InvestmentAdvice = () => (
  <FunnelPage
    path="/fraser-valley-presale-investment-advice"
    title="Fraser Valley Presale Investment Advice"
    description="A practical framework for evaluating Fraser Valley presales as investments without relying on appreciation promises."
    h1="A Presale Investment Should Work on More Than Optimism."
    eyebrow="Investment Advice"
    breadcrumbName="Fraser Valley Presale Investment Advice"
    intro="Every investment presentation can tell a compelling story about population growth, transit and future demand. The investor's job is to ask what happens if the story takes longer than expected. I help investors evaluate Fraser Valley presales around fundamentals: entry price, competing resale, rent potential, deposit schedule, financing, developer, unit type and exit strategy. No guaranteed returns. No “can't miss” projects. Just disciplined comparison."
    faqs={faqs}
  >
    <h2>The filter I use</h2>
    <p>
      Does the price make sense relative to nearby options? Is the floor plan liquid enough for the eventual buyer or tenant? Can you comfortably fund every deposit? Can you qualify and carry the property at completion? Does the deal still work without aggressive appreciation? What is the exit if your plan changes?
    </p>

    <h2>The walk-away test</h2>
    <p>
      If the project only works when every optimistic assumption comes true, it doesn't work.
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
