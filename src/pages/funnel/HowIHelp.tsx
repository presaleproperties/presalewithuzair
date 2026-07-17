import { Link } from "react-router-dom";
import { FunnelPage, RelatedLinks, TRACK_RECORD, DEFAULT_SOCIAL_IMAGE, type FunnelFAQ } from "@/components/FunnelPage";

const faqs: FunnelFAQ[] = [
  {
    question: "What scenarios do you actually handle?",
    answer:
      "First-time buyer, investor (cash flow or appreciation), upsizing family, new detached / multigenerational, move-in-ready new construction, buying an assignment, selling an assignment, VIP early access, and standalone contract review. All buyer-only, all Fraser Valley and Metro Vancouver.",
  },
  {
    question: "Do you help investors and first-time buyers equally?",
    answer:
      "Yes. Roughly half my book is first-time buyers, half is investors and repeat buyers. Same buyer-only rules and contract discipline. First-timers optimize for the GST rebate, PTT exemption, and hold; investors optimize for cash flow, appreciation, and assignment strategy.",
  },
  {
    question: "Can I use you if I already found the project?",
    answer:
      "Yes — as long as you haven't registered with the developer's sales centre yet, or you registered but haven't signed. I'll review the contract, disclosure statement, and deposit ladder before you commit. If you've already signed, it's usually too late for that project but I can still help on the next one.",
  },
  {
    question: "Do you handle selling a presale assignment?",
    answer:
      "Yes. I list assignments through my buyer network, coordinate the developer's assignment approval and lifting date, and model the 2025 BC flipping-tax exposure. Same buyer-only advisor stance — I represent the seller of the assignment, not the developer.",
  },
  {
    question: "What languages do you work in?",
    answer:
      "English, Hindi, Urdu, and Punjabi. About a third of my buyers prefer to run through the contract in one of those languages, and I make sure nothing is lost in translation.",
  },
];

interface Scenario {
  h: string;
  p: string;
  to: string;
  cta: string;
}

const scenarios: Scenario[] = [
  {
    h: "First-time buyer",
    p: "Presale lets you lock today's price with staged deposits, stack the up-to-$50,000 GST rebate and BC's Newly-Built PTT exemption, and get a warrantied brand-new home.",
    to: "/first-time-buyers-fraser-valley",
    cta: "First-time buyer guide →",
  },
  {
    h: "Investor — cash flow or appreciation",
    p: "Abbotsford for near-break-even cash flow. Surrey–Langley SkyTrain corridor (Willoughby, Latimer, ~2028/29) for appreciation. Assignment structure and BC's 2025 flipping tax built into every plan.",
    to: "/investors-fraser-valley",
    cta: "Investor guide →",
  },
  {
    h: "Upsizing family — townhome or larger condo",
    p: "3-bed townhomes in Willoughby, Latimer, Clayton, Burke Mountain. Better yard-per-dollar than a detached, warranty on everything. Matched to family size, school catchment, and 5–10 year hold.",
    to: "/langley",
    cta: "See Langley townhomes →",
  },
  {
    h: "New detached or multigenerational home",
    p: "New-construction detached in South Surrey, Cloverdale, Willoughby, Burke Mountain — including legal suites and multigenerational layouts. Same buyer-only rules, full builder-contract review.",
    to: "/surrey",
    cta: "See Surrey new construction →",
  },
  {
    h: "Move-in-ready new construction",
    p: "Sometimes presale doesn't fit — you need keys in 60–120 days. I track completed inventory across the region and represent you on completed new-construction the same way I do on presale.",
    to: "/services",
    cta: "See services →",
  },
  {
    h: "Buying an assignment",
    p: "Assignments can be strong buys — original buyer needs out, motivated pricing. I vet the underlying contract, deposit paid, and remaining ladder before you take it over.",
    to: "/buy-presale-fraser-valley",
    cta: "How to buy a presale →",
  },
  {
    h: "Selling your assignment",
    p: "Life changed and you need out before completion? I list your assignment through my buyer network, handle developer approval and lifting date, and model the 2025 flipping-tax exposure.",
    to: "/fraser-valley-presale-investment-advice",
    cta: "Assignment strategy →",
  },
  {
    h: "VIP early access",
    p: "My VIP list gets pre-public allocation on new project launches across the Fraser Valley and Metro Vancouver — usually the best pricing, incentives, and floor-plan choice of the launch cycle.",
    to: "/best-presale-realtor-fraser-valley",
    cta: "How I work →",
  },
  {
    h: "Contract and deposit review",
    p: "Every contract I touch gets a line-by-line review: disclosure statement, deposit structure, assignment rights, material-change clauses, completion window. Even if you found the project yourself.",
    to: "/buyer-representation-presale-fraser-valley",
    cta: "Buyer representation →",
  },
];

const HowIHelp = () => (
  <FunnelPage
    path="/how-i-help"
    title="How I Help — Every Presale & New-Construction Scenario"
    description="I'm Uzair — buyer-only presale specialist. Every scenario I handle: first-time buyer, investor, upsizing, new detached, move-in-ready, assignments (buy or sell), VIP access, contract review."
    h1="How I Help — Every Presale & New-Construction Scenario, One Advisor"
    eyebrow="How I Help"
    breadcrumbName="How I Help"
    image={DEFAULT_SOCIAL_IMAGE}
    intro="I'm Uzair Muhammad, buyer-only presale and new-construction specialist for the Fraser Valley and Metro Vancouver. Whatever your situation — first home, first investment, upsizing, multigenerational, move-in-ready, or buying/selling an assignment — I'm the one advisor who handles all of it. Buyer-only representation, in English, Hindi, Urdu, and Punjabi."
    faqs={faqs}
  >
    <h2>Every scenario I handle</h2>
    <p>
      Below is the full menu. Each has its own playbook — click through to the deep page for the scenario that fits you.
    </p>

    <div className="not-prose grid gap-4 sm:grid-cols-2">
      {scenarios.map((s) => (
        <div key={s.h} className="rounded-2xl border border-border bg-background p-5 sm:p-6">
          <h3 className="font-display text-lg font-semibold text-foreground">{s.h}</h3>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.p}</p>
          <Link
            to={s.to}
            className="mt-3 inline-block text-sm font-semibold text-primary hover:underline underline-offset-4"
          >
            {s.cta}
          </Link>
        </div>
      ))}
    </div>

    <h2>Languages</h2>
    <p>
      I work in English, Hindi, Urdu, and Punjabi. About a third of my buyers prefer to run through the contract in one of those languages, and I make sure nothing is lost in translation.
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
        { to: "/first-time-buyers-fraser-valley", label: "First-Time Buyers — Fraser Valley" },
        { to: "/investors-fraser-valley", label: "Investors — Fraser Valley" },
        { to: "/buyer-representation-presale-fraser-valley", label: "Do You Need Your Own Realtor for a Presale?" },
        { to: "/best-presale-realtor-fraser-valley", label: "Best Presale Realtor Fraser Valley" },
        { to: "/buy-presale-fraser-valley", label: "How to Buy a Presale in the Fraser Valley" },
      ]}
    />
  </FunnelPage>
);

export default HowIHelp;
