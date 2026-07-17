import { FunnelPage, RelatedLinks, type FunnelFAQ } from "@/components/FunnelPage";
import { BuyerRepTable } from "@/components/BuyerRepTable";

const faqs: FunnelFAQ[] = [
  {
    question: "Do I need my own realtor to buy a presale?",
    answer:
      "Yes. The rep at the developer's sales centre works for the developer — that's their client, that's who pays them. Your own buyer's agent represents you. For many presale projects, buyer representation is paid through the project's sales structure. Uzair confirms exactly how it works on your specific project before you commit.",
  },
  {
    question: "Does hiring a buyer's agent cost me anything?",
    answer:
      "For many presale projects, buyer representation is paid through the project's sales structure, so it typically costs the buyer nothing. Uzair confirms exactly how it works on your specific project before you commit — and tells you upfront if anything is different.",
  },
  {
    question: "Who does the sales-centre rep actually represent?",
    answer:
      "The developer. Their job title is 'developer sales representative' for a reason. They're licensed, they're friendly, they're knowledgeable — and their duty is to the developer's profit, not to your outcome. That's not a criticism, it's simply the structure.",
  },
  {
    question: "What does a buyer's agent actually do differently?",
    answer:
      "Reviews your contract line by line. Negotiates deposit structure and incentives. Compares the project against other active presales and resale comps. Tells you when a deal is bad. Uses the 7-day rescission window to protect you. Represents your interests, not the developer's quota.",
  },
  {
    question: "Can I still hire you if I've already visited a sales centre?",
    answer:
      "Sometimes — depends on whether you've registered. If you registered but haven't signed anything, we may still be able to transfer representation. If you've signed, it's usually too late for that project but we can plan the rescission review and any future presales. Call me first, always.",
  },
];

const BuyerRepresentation = () => (
  <FunnelPage
    path="/buyer-representation-presale-fraser-valley"
    title="Do You Need a Realtor for a BC Presale? Yes — Here's Why"
    description="I'm Uzair — buyer-only presale specialist. Who the sales-centre rep really works for, and why you need your own realtor on every BC presale."
    h1="Do You Need Your Own Realtor for a Presale? (Yes — Here's Why)"
    eyebrow="Buyer Representation"
    breadcrumbName="Buyer Representation for Presale"
    intro="I'm Uzair Muhammad, buyer-only presale specialist for the Fraser Valley. The most common question I get is: do I really need my own realtor if I'm buying a presale? Short answer: yes — because for many presale projects it costs the buyer nothing and gives you someone on your side. Here's the full picture: who the sales-centre rep actually works for, how the developer's sales structure works, and what you lose by skipping representation."
    faqs={faqs}
  >
    <h2>The thesis, in one line</h2>
    <p>
      The developer already built a buyer's-agent commission into the price of every presale. If you don't hire your own realtor, the developer simply keeps that commission — you don't save a dollar. All you save is having someone on your side of the table.
    </p>

    <h2>Who does the sales-centre rep actually represent?</h2>
    <p>
      Not you. Their client is the developer. That doesn't make them dishonest — it makes them exactly what their job title says: developer sales representatives. They're paid to move the developer's inventory, not to warn you when a floor plan is inefficient or a competing project is a better deal.
    </p>

    <h2>Why I don't promote or hype projects</h2>
    <p>
      I don't work for developers, and I never will. Most realtors promote every new launch that hits the market because that builds their relationship with developers and brings more deals later. But you can't push inventory and protect the buyer at the same time. I represent buyers only. If a project is overpriced, poorly laid out, or from a builder I don't trust, I'll tell you to walk away — even if it means losing the commission.
    </p>

    <BuyerRepTable />

    <h2>What a buyer's agent actually does</h2>
    <p>
      Reviews the contract and Disclosure Statement line by line. Negotiates deposit ladders and incentives that don't reach public buyers. Compares your shortlisted project against other active presales and resale comps. Tells you when a deal is bad. Uses the 7-day rescission window to protect your deposit. Represents your interests, not a sales quota.
    </p>

    <h2>What representation costs you</h2>
    <p>
      For many presale projects, buyer representation is paid through the project's sales structure. Uzair will explain exactly how it works before you move forward, and tell you upfront if anything is different.
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
