import { FunnelPage, RelatedLinks, DEFAULT_SOCIAL_IMAGE, type FunnelFAQ } from "@/components/FunnelPage";

const faqs: FunnelFAQ[] = [
  {
    question: "Can I sell my presale before it completes?",
    answer:
      "In most cases yes, if your contract's assignment clause allows it and the developer consents in writing. A small number of developers prohibit assignments outright. I will read your contract and tell you which situation you are in, at no charge.",
  },
  {
    question: "How much can I sell my assignment for?",
    answer:
      "Three numbers set the price: your original contract price, the developer's current price for the same floor plan, and recent comparable assignment or resale sales. Your price usually lands between the first two, discounted somewhat because the buyer is taking on your contract as-is.",
  },
  {
    question: "Can I list my assignment on MLS?",
    answer:
      "It depends on the developer. In Vancouver and the inner suburbs most prohibit it. In much of the Fraser Valley many allow it. We confirm the current position in writing before marketing starts, because some developers change their stance partway through a project.",
  },
  {
    question: "Do I pay GST on an assignment sale?",
    answer:
      "Since May 2022 CRA applies 5% GST to assignment sales of new residential property, calculated on the assignment amount rather than the full contract price. Who pays it is negotiable and is usually a deal point. CRA also generally treats assignment profit as business income rather than a capital gain. Get a CPA involved early.",
  },
  {
    question: "What if I bought my presale with a different agent?",
    answer:
      "That changes nothing about your options. You are not tied to the agent who wrote your original contract. See the switching presale agents page for exactly how that works.",
  },
  {
    question: "How long does an assignment take to sell?",
    answer:
      "Realistically two to four months from listing to accepted offer, then another 30 to 60 days to close. If your completion date is close, that timeline is the first thing we should talk about.",
  },
];

const SellMyAssignment = () => (
  <FunnelPage
    path="/sell-my-presale-assignment"
    title="Sell My Presale Assignment in BC | Uzair Muhammad"
    description="Need to sell your presale before it completes? Buyer-side guidance on developer consent, pricing, marketing restrictions and GST across Vancouver, Burnaby, Coquitlam, Port Moody, Surrey, Langley and Abbotsford."
    h1="Selling Your Presale Before It Completes."
    eyebrow="Assignment Sales"
    breadcrumbName="Sell My Presale Assignment"
    image={DEFAULT_SOCIAL_IMAGE}
    intro="An assignment is when you transfer your rights and obligations under a pre-construction contract to a new buyer before the building completes. You are not selling the condo, because it does not exist yet. You are selling your contract. Three things decide whether that works: what your assignment clause allows, whether the developer will consent, and whether the price makes sense against today's developer price list."
    faqs={faqs}
  >
    <h2>The regional split nobody tells you about</h2>
    <p>
      In Vancouver and the inner suburbs, most developers prohibit MLS listings for assignments, so the
      sale has to run privately through buyer networks. Further out in the Fraser Valley, in Surrey,
      Langley, Abbotsford and Coquitlam, many developers do allow MLS. That single difference changes
      your entire marketing plan, and it is the main reason a general realtor's usual playbook often
      does not work on these files.
    </p>

    <h2>What I check before we market anything</h2>
    <p>
      The assignment clause in your contract. The developer's current written position on consent,
      fees and marketing, which is not always what it was when you signed. What deposits you have
      actually paid. Your completion date and how much runway is left. And the honest price, measured
      against what the developer is charging today for the same floor plan rather than against what
      you hoped it would be worth.
    </p>

    <h2>Sometimes the answer is do not assign</h2>
    <p>
      If the market has moved against you, assigning at a loss is one option, but holding through
      completion and renting is another, and completing then selling as a resale is a third. Each has
      a different tax outcome and a different cash requirement. I will model all three rather than push
      you toward the one that generates a commission. I have helped 450+ families buy more than $250M
      in new homes over five years, with only 2 defaults, and protecting that record matters more to me
      than one listing.
    </p>

    <h2>A word on tax</h2>
    <p>
      This is general information, not legal, tax or accounting advice. Assignment sales have real tax
      consequences and CRA treats them less favourably than most people expect. Talk to a lawyer and a
      CPA who work in BC real estate before you sign anything.
    </p>

    <RelatedLinks
      links={[
        { to: "/switching-presale-agents", label: "Can I Switch Agents Mid-Project?" },
        { to: "/buying-a-presale-assignment", label: "Buying a Presale Assignment" },
        { to: "/how-i-help", label: "How I Help Presale Buyers" },
        { to: "/call", label: "Book a 15-Minute Call" },
      ]}
    />
  </FunnelPage>
);

export default SellMyAssignment;
