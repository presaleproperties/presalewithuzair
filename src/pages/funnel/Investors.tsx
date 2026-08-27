import { FunnelPage, RelatedLinks, TRACK_RECORD, DEFAULT_SOCIAL_IMAGE, type FunnelFAQ } from "@/components/FunnelPage";

const faqs: FunnelFAQ[] = [
  {
    question: "Are Fraser Valley presales still worth considering as investments?",
    answer:
      "Selectively. The answer depends on the project, price, submarket and your financing — not the fact that it's presale.",
  },
  {
    question: "Which market should I invest in?",
    answer:
      "There isn't one universal answer. I compare the specific opportunity against your capital, goal and intended hold period.",
  },
  {
    question: "How should I think about assignments?",
    answer:
      "Assignment rights vary by contract and can involve developer, legal and tax considerations. We look at those provisions early and involve the appropriate professionals where needed.",
  },
  {
    question: "When would you tell an investor not to buy?",
    answer:
      "When the price, project, financing or exit strategy doesn't make sense without optimistic assumptions.",
  },
];

const Investors = () => (
  <FunnelPage
    path="/investors-fraser-valley"
    title="Fraser Valley Presale Investing | Buyer-Side Analysis"
    description="Buyer-side analysis for investors comparing Fraser Valley presales, including price, rent potential, deposit leverage and exit strategy."
    h1="Buy the Numbers, Not the Story."
    eyebrow="Investors"
    breadcrumbName="Investors Fraser Valley"
    image={DEFAULT_SOCIAL_IMAGE}
    intro="Presale marketing is designed to make the future feel inevitable. Investing requires the opposite mindset. Question the assumptions. I help investors compare new construction across the Fraser Valley using price, nearby resale, potential rent, deposit requirements, completion timing and exit flexibility. No guaranteed returns. No appreciation promises. Just a clearer framework for deciding whether the project deserves your capital."
    faqs={faqs}
  >
    <h2>Every project needs an investment thesis.</h2>
    <p>
      Why this city? Why this building? Why this unit? Why this price? Why this completion date? And who buys or rents it from you later? If the answers depend mainly on "prices should go up," the thesis isn't strong enough.
    </p>

    <h2>Cash flow and appreciation are different strategies.</h2>
    <p>
      A lower-priced market may offer a different path than a transit-oriented growth corridor. One isn't automatically better. The right choice depends on your capital, holding period, financing and intended exit.
    </p>

    <h2>Compare presale against existing inventory.</h2>
    <p>
      The resale market gives us something the brochure can't: evidence. I use existing sales and competing inventory to pressure-test the premium you're paying for new construction.
    </p>

    <h2>Deposit leverage cuts both ways.</h2>
    <p>
      Staged deposits can let investors control a larger asset with less capital upfront. That leverage works in both directions. Your financing plan needs to survive a less optimistic completion scenario too.
    </p>

    <h2>Plan the exit before you buy.</h2>
    <p>
      Hold. Rent. Move in. Assign if permitted. Sell after completion. Every strategy has different risks, costs and tax considerations. The exit should be discussed before the deposit leaves your account.
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
        { to: "/fraser-valley-presale-investment-advice", label: "Fraser Valley Presale Investment Advice" },
        { to: "/presale-mistakes-fraser-valley", label: "Presale Mistakes I See Fraser Valley Buyers Make" },
        { to: "/surrey", label: "Surrey Presale Condos" },
        { to: "/langley", label: "Langley Presale Townhomes" },
        { to: "/abbotsford", label: "Abbotsford Presale Condos" },
        { to: "/how-i-help", label: "How I Help — Every Scenario" },
      ]}
    />
  </FunnelPage>
);

export default Investors;
