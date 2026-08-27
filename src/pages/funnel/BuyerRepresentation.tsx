import { FunnelPage, RelatedLinks, type FunnelFAQ } from "@/components/FunnelPage";
import { BuyerRepTable } from "@/components/BuyerRepTable";

const faqs: FunnelFAQ[] = [
  {
    question: "Do I legally need a Realtor to buy a presale?",
    answer:
      "No. The question is whether you want independent representation and advice while evaluating the purchase.",
  },
  {
    question: "Who represents the developer?",
    answer:
      "The developer's sales team represents the development's interests.",
  },
  {
    question: "What does my own Realtor do?",
    answer:
      "Helps you compare projects, evaluate the unit, understand the purchase process and advocate for your interests within the Realtor's professional role.",
  },
  {
    question: "Can I call after I've already visited the sales centre?",
    answer:
      "Yes. Tell me exactly what you've done so far and I'll help you understand what options may still be available.",
  },
];

const BuyerRepresentation = () => (
  <FunnelPage
    path="/buyer-representation-presale-fraser-valley"
    title="Do You Need Your Own Realtor for a BC Presale?"
    description="Understand what buyer representation means when purchasing a BC presale and why it helps to speak with your own Realtor before registering."
    h1="The Project Has Representation. You Should Understand Yours."
    eyebrow="Buyer Representation"
    breadcrumbName="Buyer Representation for Presale"
    intro="I'm Uzair Muhammad, a presale and new-construction Realtor serving the Fraser Valley and Metro Vancouver. One of the most common questions buyers ask is whether they really need their own Realtor when purchasing directly from a developer. You don't have to use one. But you should understand the difference between the person selling the development and someone advising you from the buyer's side."
    faqs={faqs}
  >
    <h2>The idea in one line</h2>
    <p>
      The sales centre's job is to sell the project. Your advisor's job should be to help you decide whether to buy it.
    </p>

    <h2>Who does the sales-centre team work for?</h2>
    <p>
      The development. That doesn't make them bad people or unreliable professionals. It simply means their role is different from yours. They're there to explain and sell their project. A buyer-side Realtor can compare that project with other options, question the price and layout, discuss your own goals and tell you when another choice may be stronger.
    </p>

    <BuyerRepTable />

    <h2>What does buyer-side representation actually add?</h2>
    <p>
      Comparison with competing projects. Nearby resale context. Floor plan analysis. Deposit schedule planning. Incentive comparison. Purchase-term walkthrough. Completion planning. And someone who can say, "I don't think you should buy this."
    </p>

    <h2>What does it cost?</h2>
    <p>
      Compensation arrangements vary between transactions. On many presale developments, buyer-agent compensation is paid through the project's sales structure. I'll tell you exactly how compensation works on the specific development before you decide whether to work with me.
    </p>

    <h2>When should you call?</h2>
    <p>
      Before registering directly with the project whenever possible. Developer policies around representation vary. A five-minute conversation before visiting the sales centre can give you clarity about your options.
    </p>

    <RelatedLinks
      links={[
        { to: "/best-presale-realtor-fraser-valley", label: "Best Presale Realtor in the Fraser Valley" },
        { to: "/presale-mistakes-fraser-valley", label: "Presale Mistakes I See Fraser Valley Buyers Make" },
        { to: "/buy-presale-fraser-valley", label: "How to Buy a Presale in the Fraser Valley" },
      ]}
    />
  </FunnelPage>
);

export default BuyerRepresentation;
