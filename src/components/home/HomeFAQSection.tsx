import { FAQSchema, type FAQItem } from "@/components/blog/FAQSchema";

const HOMEPAGE_FAQS: FAQItem[] = [
  {
    question: "Do I really need a realtor to buy a presale, or can I just walk into the presentation centre?",
    answer:
      "You can walk in — but the sales reps at the presentation centre work for the developer, not for you. For many presale projects the developer pays the buyer commission, so a buyer-side specialist typically costs you nothing and unlocks VIP pricing, hidden incentives, decorating allowances, and assignment fee waivers that aren't offered to walk-in buyers. Going direct almost always means paying more for fewer perks.",
  },
  {
    question: "How much deposit do I actually need for a presale condo in BC?",
    answer:
      "Most Fraser Valley presales require 15–20% staged over 12–24 months — typically 5% at signing, 5% at 90–180 days, and the balance before completion. In the current market, 10% deposit structures are negotiable on select projects. Your deposit is held in trust and becomes part of your down payment at completion.",
  },
  {
    question: "What happens to my deposit if the project gets delayed or cancelled?",
    answer:
      "Your deposits are legally protected under BC's Real Estate Development Marketing Act (REDMA) and held in a lawyer's or developer's trust account — not spent on construction. If the developer cancels, your full deposit is returned with interest. If the project is delayed past the outside completion date in your contract, you have the right to walk away and get your deposit back.",
  },
  {
    question: "Can I sell my presale condo before it completes?",
    answer:
      "Yes — it's called an assignment sale. But you need to account for developer assignment fees (typically 1–3% of the original purchase price), CRA tax implications (the profit may be taxed as business income, not capital gains), and lifting clauses that restrict when you can publicly list the assignment on MLS. A specialist structures your contract upfront to keep assignment flexibility open.",
  },
  {
    question: "Is presale actually cheaper than buying resale right now?",
    answer:
      "When you factor in developer incentives — decorating allowances, capped strata fees, mortgage rate buy-downs, GST rebates, and free upgrades — presale often wins on total cost in the Fraser Valley. You're also locking in today's price for a unit completing in 2–4 years, giving you built-in appreciation runway. But it only works on the right project; roughly 80% of presales in market are overpriced.",
  },
];

export const HomeFAQSection = () => {
  return (
    <section className="bg-background py-20 sm:py-28">
      <div className="container-xl px-5 sm:px-8 lg:px-16">
        <div className="max-w-3xl mx-auto">
          <FAQSchema faqs={HOMEPAGE_FAQS} heading="Presale Questions, Answered" />
        </div>
      </div>
    </section>
  );
};
