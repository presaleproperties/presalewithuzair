import { FunnelPage, RelatedLinks, TRACK_RECORD, DEFAULT_SOCIAL_IMAGE, type FunnelFAQ } from "@/components/FunnelPage";

const faqs: FunnelFAQ[] = [
  {
    question: "Is presale a good option for a first-time buyer?",
    answer:
      "It can be. The right answer depends on affordability, timeline, project quality and whether you can comfortably handle the deposit schedule and eventual financing.",
  },
  {
    question: "How much cash do I need?",
    answer:
      "It varies by project. I'll map the actual deposit schedule for the development you're considering.",
  },
  {
    question: "What first-time buyer programs may apply?",
    answer:
      "There are federal and provincial programs that may apply to qualifying buyers and new homes. Rules change, so eligibility should be verified before you rely on any projected savings.",
  },
  {
    question: "What happens if my life changes before completion?",
    answer:
      "That's one reason we look closely at your financial buffer, assignment provisions and alternative plans before you buy.",
  },
];

const FirstTimeBuyers = () => (
  <FunnelPage
    path="/first-time-buyers-fraser-valley"
    title="First-Time Presale Buyers Fraser Valley | Uzair Muhammad"
    description="A practical guide for first-time buyers considering presale and new construction across the Fraser Valley."
    h1="Your First Home Doesn't Need to Be Your First Presale Lesson."
    eyebrow="First-Time Buyers"
    breadcrumbName="First-Time Buyers Fraser Valley"
    image={DEFAULT_SOCIAL_IMAGE}
    intro="Buying your first home is already a major financial milestone. Presale adds decisions about future completion, staged deposits, financing years from now, taxes, closing costs and a home you can't fully inspect today. My job is to make those decisions understandable before you commit."
    faqs={faqs}
  >
    <h2>Why first-time buyers consider presale</h2>
    <p>
      Presale can give buyers more time to save between contract and completion, access to a brand-new home and the benefit of new-home warranty coverage. Depending on your circumstances, there may also be first-time buyer programs worth investigating. But none of those benefits make the wrong project a good purchase.
    </p>

    <h2>Start with affordability years from now — not just today's deposit.</h2>
    <p>
      The first deposit may be manageable. The more important question is whether the entire deposit schedule and eventual mortgage still fit your financial life. I help you map the timeline before you sign.
    </p>

    <h2>Compare presale with resale.</h2>
    <p>
      You don't get bonus points for choosing presale. If an existing home is a better fit, you should know that. We'll compare the options when necessary instead of assuming new construction automatically wins.
    </p>

    <h2>Understand the programs, then verify them.</h2>
    <p>
      First-time homebuyer rebates and exemptions can change and eligibility depends on your situation. I can help identify which programs may be relevant and model the potential impact. You should confirm eligibility with the appropriate government source, lender, lawyer or accountant before relying on the savings.
    </p>

    <h2>Build flexibility into the decision.</h2>
    <p>
      A presale purchase may complete years from now. Career changes, relationships, income, interest rates and family plans can all change. That's why we discuss assignment provisions, financing and your backup plan before committing.
    </p>

    <h2>Track record</h2>
    <p className="font-semibold">{TRACK_RECORD}</p>

    <h2>See the full platform + live projects</h2>
    <p>
      For live inventory and the full brokerage platform, visit{" "}
      <a
        href="https://presaleproperties.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary hover:underline font-semibold"
      >
        presaleproperties.com — the full platform + live projects
      </a>
      .
    </p>

    <RelatedLinks
      links={[
        { to: "/new-to-presale-start-here", label: "New to Presale? Start Here" },
        { to: "/buy-presale-fraser-valley", label: "How to Buy a Presale in the Fraser Valley" },
        { to: "/buyer-representation-presale-fraser-valley", label: "Do You Need Your Own Realtor for a Presale?" },
        { to: "/how-i-help", label: "How I Help — Every Presale Scenario" },
        { to: "/surrey", label: "Surrey Presale Condos" },
      ]}
    />
  </FunnelPage>
);

export default FirstTimeBuyers;
