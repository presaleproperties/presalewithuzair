import { FunnelPage, RelatedLinks, type FunnelFAQ } from "@/components/FunnelPage";

const faqs: FunnelFAQ[] = [
  {
    question: "What is the first step?",
    answer: "Know what you're trying to accomplish before looking at projects.",
  },
  {
    question: "How do deposits work?",
    answer: "Every project is different. I'll map out the actual deposit schedule before you commit.",
  },
  {
    question: "What should I do during the statutory rescission period?",
    answer:
      "Use the time to review the disclosure information, financing and purchase carefully and obtain professional legal advice where appropriate.",
  },
  {
    question: "Do new homes have GST?",
    answer:
      "New-home tax treatment can depend on the transaction and buyer. We identify the potential costs and you should confirm your specific tax position with the appropriate professional.",
  },
];

const BuyPresaleFraserValley = () => (
  <FunnelPage
    path="/buy-presale-fraser-valley"
    title="How to Buy a Presale in the Fraser Valley"
    description="A step-by-step buyer-side guide to purchasing presale condos and townhomes in the Fraser Valley."
    h1="How to Buy a Presale Without Letting the Sales Process Make the Decision for You."
    eyebrow="How To Buy"
    breadcrumbName="How to Buy a Presale in the Fraser Valley"
    intro="Buying presale is different from buying an existing home. You may be committing years before completion. Deposits are staged. Financing happens later. The home isn't finished. And the developer controls the sales process. Here's the buyer-side process I use to make the decision clearer."
    faqs={faqs}
  >
    <h2>Step 1 — Define the goal.</h2>
    <p>
      First home? Investment? Move-up? Family home? The answer changes which cities, buildings and units should even be on the list.
    </p>

    <h2>Step 2 — Compare markets.</h2>
    <p>
      We look at the locations that fit your budget and goal before getting attached to a specific launch.
    </p>

    <h2>Step 3 — Build a shortlist.</h2>
    <p>
      Usually two or three strong candidates are more useful than dozens of listings.
    </p>

    <h2>Step 4 — Compare the units and numbers.</h2>
    <p>
      Price. Floor plan. Deposit schedule. Incentives. Completion. Nearby resale. Developer. Future buyer or renter.
    </p>

    <h2>Step 5 — Understand the purchase before committing.</h2>
    <p>
      If you decide to proceed, we walk through the important purchase terms and identify anything that should be confirmed with your lawyer, lender or accountant.
    </p>

    <h2>Step 6 — Stay prepared through completion.</h2>
    <p>
      Presale isn't finished when the contract is signed. I stay involved through deposits, updates, completion preparation, walkthrough timing and possession.
    </p>

    <h2>When should you call me?</h2>
    <p>
      Ideally before registering directly with the development. Representation policies vary by project, so understanding your options first is useful.
    </p>

    <RelatedLinks
      links={[
        { to: "/presale-mistakes-fraser-valley", label: "Presale Mistakes I See Fraser Valley Buyers Make" },
        { to: "/buyer-representation-presale-fraser-valley", label: "Do You Need Your Own Realtor for a Presale?" },
        { to: "/new-to-presale-start-here", label: "New to Presale? Start Here" },
      ]}
    />
  </FunnelPage>
);

export default BuyPresaleFraserValley;
