import { FunnelPage, RelatedLinks, type FunnelFAQ } from "@/components/FunnelPage";

const faqs: FunnelFAQ[] = [
  {
    question: "What is a presale condo in BC?",
    answer:
      "A presale (or pre-construction) condo is a new home you buy directly from the developer before it's built — often 12 to 36 months before completion. You pay staged deposits, then close and move in when the building is finished. In BC you're protected by a Disclosure Statement and a 7-day rescission window.",
  },
  {
    question: "Is buying presale a good idea for a first-time buyer?",
    answer:
      "It can be — you lock in today's price, control a new home with a smaller upfront deposit, and get years to prepare financing. But it's only smart if the project, contract and location actually pencil out. I only recommend presales that make sense for a first-time buyer's timeline and risk tolerance.",
  },
  {
    question: "What's the difference between presale and resale?",
    answer:
      "Resale is already built — you tour it, get financing today, and move in weeks. Presale is bought on paper — deposits now, keys later, new-home warranty, GST applies. Presale often means better pricing and no bidding war, but you're taking construction and market risk between contract and completion.",
  },
  {
    question: "How much money do I actually need to start?",
    answer:
      "Most Fraser Valley developers ask for a 15–20% deposit staged over 12–24 months, and in softer windows we negotiate 10% ladders. On a $600,000 home that's often $30,000–$60,000 at signing, not the full 20% on day one. I map the full deposit schedule for you before you sign anything.",
  },
  {
    question: "How do I actually get started with you?",
    answer:
      "Book a free 15-minute strategy call. I'll ask what you're looking for, your budget and timeline, then either point you to the right presale shortlist for the Fraser Valley or tell you honestly if presale isn't the right move for you right now. Buyer-only, no cost, no pressure.",
  },
];

const NewToPresale = () => (
  <FunnelPage
    path="/new-to-presale-start-here"
    title="New to Presale? Start Here — Uzair's Plain-English Guide"
    description="New to presale condos in BC? I'm Uzair — buyer-only presale specialist. Learn what a presale is, how it differs from resale, and whether it's right for your first home."
    h1="New to Presale? Start Here — Uzair's Plain-English Guide"
    eyebrow="Start Here"
    breadcrumbName="New to Presale — Start Here"
    intro="I'm Uzair Muhammad, a buyer-only presale specialist in the Fraser Valley. If you've never bought a presale condo before, this page is your plain-English starting point — what a presale actually is, how it differs from resale, whether it makes sense for your first home, and how I help buyers avoid the traps developers won't warn you about."
    faqs={faqs}
  >
    <h2>What is a presale condo, really?</h2>
    <p>
      A presale is a new home you buy from the developer before it's built. You sign a contract, pay staged deposits, and take keys when the building completes — often 12 to 36 months later. In British Columbia, the developer must give you a Disclosure Statement and a 7-day rescission window so you can review the contract with your own realtor and lawyer.
    </p>

    <h2>Presale vs resale — which is right for you?</h2>
    <p>
      Resale means the home already exists. You tour it, finance it now, and move in within weeks. Presale means you're buying on paper — better pricing potential, no bidding war, new-home warranty, but you carry construction and market risk between contract and completion. Neither is universally "better." It depends on your timeline, deposit runway, and risk tolerance.
    </p>

    <h2>Is presale right for a first home?</h2>
    <p>
      Sometimes yes — you lock in today's price with time to save, and you get a brand-new home with builder warranty. Sometimes no — if you need to move in six months, or your income won't support the mortgage at completion, resale is safer. I'll tell you honestly which side you're on before you register with anyone.
    </p>

    <h2>How I help — buyer-only, no cost to you</h2>
    <p>
      I represent buyers only. My commission is paid by the developer out of the price you'd pay anyway — going direct to the sales centre doesn't save you money, it just removes your representation from the deal. I review every contract line by line, negotiate incentives, and only recommend projects that pencil out for you.
    </p>

    <RelatedLinks
      links={[
        { to: "/buy-presale-fraser-valley", label: "How to Buy a Presale in the Fraser Valley (Step-by-Step)" },
        { to: "/presale-mistakes-fraser-valley", label: "Presale Mistakes I See Fraser Valley Buyers Make" },
        { to: "/buyer-representation-presale-fraser-valley", label: "Do You Need Your Own Realtor for a Presale?" },
      ]}
    />
  </FunnelPage>
);

export default NewToPresale;
