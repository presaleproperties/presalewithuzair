import { FAQSchema, type FAQItem } from "@/components/blog/FAQSchema";

const HOMEPAGE_FAQS: FAQItem[] = [
  {
    question: "Do I need my own Realtor to buy a presale?",
    answer:
      "You can purchase directly from a developer, but the sales team is there to sell that development. Having your own Realtor gives you someone evaluating the project from your side. On many presale projects, buyer-agent compensation is paid through the project's sales structure. I'll confirm the arrangement for the specific project before you move forward.",
  },
  {
    question: "How much deposit do I need?",
    answer:
      "Presale deposit schedules vary by project. Many developments use staged deposits rather than requiring the full amount upfront. Before you commit, I map out every deposit date so you know exactly how much cash is required and when.",
  },
  {
    question: "What happens if a project is delayed or cancelled?",
    answer:
      "Your rights depend on the purchase agreement, disclosure statement and applicable BC legislation. Delays and cancellations can work differently from project to project, which is why I help you identify the relevant terms and the questions that should be confirmed with your lawyer before you commit.",
  },
  {
    question: "Can I sell my presale before completion?",
    answer:
      "Potentially. This is called an assignment, and the rules vary significantly between projects. Developer approval, fees, marketing restrictions and tax considerations can all affect your options. I look at the assignment provisions early so your exit strategy is based on the contract, not an assumption.",
  },
  {
    question: "Is presale better than resale?",
    answer:
      "Sometimes. Sometimes resale is the better decision. Presale can offer staged deposits, new-home warranty coverage, newer construction and project incentives. Resale gives you certainty about the finished home and today's market value. I compare both when that's what the decision requires.",
  },
];

export const HomeFAQSection = () => {
  return (
    <section className="bg-card section-y">
      <div className="container-xl px-5 sm:px-8 lg:px-16">
        <div className="max-w-3xl mx-auto">
          <FAQSchema
            faqs={HOMEPAGE_FAQS}
            heading="The questions buyers ask before they commit."
          />
        </div>
      </div>
    </section>
  );
};
