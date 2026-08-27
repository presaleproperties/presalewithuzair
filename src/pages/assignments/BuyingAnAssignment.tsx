import { FunnelPage, RelatedLinks, DEFAULT_SOCIAL_IMAGE, type FunnelFAQ } from "@/components/FunnelPage";

const faqs: FunnelFAQ[] = [
  {
    question: "Is buying a presale assignment safe?",
    answer:
      "It can be, with proper review. You are inheriting the original buyer's contract exactly as written, so the risk sits in the terms and in the deposit chain rather than in the concept itself. Verify the deposits actually paid, get the developer's written consent, and have a lawyer review the assignment agreement before you commit.",
  },
  {
    question: "Why do lenders treat assignments differently?",
    answer:
      "Because the price you pay and the price in the original developer contract are two different numbers. Many lenders will only base their loan on the original contract price, which means the uplift you are paying has to come from your own funds. Some lenders decline assignments entirely. Confirm financing before removing conditions.",
  },
  {
    question: "Who pays the GST on an assignment purchase?",
    answer:
      "It is negotiable, but in most assignment contracts the buyer pays the 5% GST on the assignment amount, the uplift, rather than on the full purchase price. Get it written into the contract rather than assumed.",
  },
  {
    question: "Do I need the developer's approval to buy an assignment?",
    answer:
      "Almost always yes. The developer must consent in writing and they typically charge an assignment fee. Some restrict how many times a unit can be assigned. The consent is a condition of the deal, not a formality.",
  },
  {
    question: "Is an assignment cheaper than buying from the developer?",
    answer:
      "Sometimes. In a softer market an assignor who needs out may sell below the developer's current price. In a strong market or a sold-out building the assignment may cost more. It is worth comparing both before you assume either.",
  },
];

const BuyingAnAssignment = () => (
  <FunnelPage
    path="/buying-a-presale-assignment"
    title="Buying a Presale Assignment in BC | Uzair Muhammad"
    description="Thinking of buying an assignment instead of direct from the developer? What you inherit from the original buyer, why lenders treat assignments differently, and who pays the GST."
    h1="Buying a Presale Assignment — What You're Actually Taking On."
    eyebrow="Assignment Purchases"
    breadcrumbName="Buying a Presale Assignment"
    image={DEFAULT_SOCIAL_IMAGE}
    intro="When you buy an assignment you step into someone else's contract with the developer. You inherit their purchase price, their deposit schedule, their completion date and their contract terms, good and bad. You are not negotiating with the developer. You are negotiating with the original buyer, and then asking the developer to approve you."
    faqs={faqs}
  >
    <h2>Why people buy assignments anyway</h2>
    <p>
      Assignments can price below the developer's current list, and in a sold-out building an assignment
      may be the only way in at all. That is a genuine opportunity. It just needs a different set of
      checks than a direct presale purchase.
    </p>

    <h2>What I verify before you write an offer</h2>
    <p>
      The original contract and the Disclosure Statement with every amendment. What deposits have
      actually been paid and are being transferred to you. That the developer will consent, and what fee
      applies. The current completion estimate rather than the original one, because those two dates are
      frequently very different by the time an assignment comes to market. And who is paying the GST on
      the assignment amount, settled in writing.
    </p>

    <h2>Financing is where these deals die</h2>
    <p>
      Lenders treat assignments differently from a direct developer purchase. Some will not touch them.
      Many will only lend against the original contract price rather than what you are paying, which
      means the uplift comes out of your own pocket. Talk to a broker who has actually funded assignments
      before you remove conditions, not after.
    </p>

    <h2>Where I sit in this</h2>
    <p>
      I represent buyers, never developers. On an assignment purchase that means my job is to find the
      problems in someone else's contract before they become yours. This page is general information,
      not legal or tax advice. Have a lawyer review the assignment agreement.
    </p>

    <RelatedLinks
      links={[
        { to: "/sell-my-presale-assignment", label: "Selling Your Presale Assignment" },
        { to: "/switching-presale-agents", label: "Can I Switch Agents Mid-Project?" },
        { to: "/new-to-presale-start-here", label: "New to Presale? Start Here" },
        { to: "/call", label: "Book a 15-Minute Call" },
      ]}
    />
  </FunnelPage>
);

export default BuyingAnAssignment;
