import { Link } from "react-router-dom";
import { FunnelPage, RelatedLinks, TRACK_RECORD, DEFAULT_SOCIAL_IMAGE, type FunnelFAQ } from "@/components/FunnelPage";

const faqs: FunnelFAQ[] = [
  {
    question: "Do I have to be a first-time buyer?",
    answer: "No. I work with first-time buyers, investors, families, repeat buyers and assignment clients.",
  },
  {
    question: "Can I call you if I already found a project?",
    answer: "Absolutely. That's often the easiest place to begin.",
  },
  {
    question: "Do you handle assignments?",
    answer:
      "Yes. Assignment opportunities require careful attention to the specific project's terms and process.",
  },
  {
    question: "What languages do you work in?",
    answer: "English, Punjabi, Hindi and Urdu.",
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
    p: "Understand affordability, staged deposits, available buyer programs, completion timing and whether presale is actually the right first home.",
    to: "/first-time-buyers-fraser-valley",
    cta: "First-time buyer guide →",
  },
  {
    h: "Investor — cash flow or appreciation",
    p: "Compare price, resale evidence, rent potential, leverage, completion risk and exit strategy.",
    to: "/investors-fraser-valley",
    cta: "Investor guide →",
  },
  {
    h: "Move-up buyer",
    p: "Plan today's home around tomorrow's completion.",
    to: "/langley",
    cta: "See Langley townhomes →",
  },
  {
    h: "Family or multigenerational buyer",
    p: "Evaluate space, layout, timing and the financial contribution of everyone involved.",
    to: "/surrey",
    cta: "See Surrey new construction →",
  },
  {
    h: "Move-in-ready new construction",
    p: "Compare the certainty of a finished new home with presale and resale alternatives.",
    to: "/services",
    cta: "See services →",
  },
  {
    h: "Buying an assignment",
    p: "Understand what you're buying from the original purchaser and the developer process around the transfer.",
    to: "/buy-presale-fraser-valley",
    cta: "How to buy a presale →",
  },
  {
    h: "Selling an assignment",
    p: "Assess the market, developer restrictions, pricing and practical exit options.",
    to: "/fraser-valley-presale-investment-advice",
    cta: "Assignment strategy →",
  },
  {
    h: "Early-access opportunities",
    p: "Get notified about relevant launches and early purchase opportunities when available.",
    to: "/best-presale-realtor-fraser-valley",
    cta: "How I work →",
  },
  {
    h: "Project review",
    p: "Already found the building? Send it to me and we'll start there.",
    to: "/buyer-representation-presale-fraser-valley",
    cta: "Buyer representation →",
  },
];

const HowIHelp = () => (
  <FunnelPage
    path="/how-i-help"
    title="How Uzair Helps Presale & New-Construction Buyers"
    description="Explore buyer-side presale and new-construction guidance for first-time buyers, investors, families, assignments and completion."
    h1="Different Buyers. Different Projects. One Decision Framework."
    eyebrow="How I Help"
    breadcrumbName="How I Help"
    image={DEFAULT_SOCIAL_IMAGE}
    intro="I'm Uzair Muhammad, a presale and new-construction Realtor serving buyers across the Fraser Valley and Metro Vancouver. First home. Investment. Move-up purchase. Assignment. New construction that's already completed. Each situation has different priorities. My role is to help you understand which ones matter in yours."
    faqs={faqs}
  >
    <h2>Every scenario I help with</h2>
    <p>
      Below is the full menu. Each has its own playbook — click through to the deep page for the scenario that fits you.
    </p>

    <div className="not-prose grid gap-4 sm:grid-cols-2">
      {scenarios.map((s) => (
        <div key={s.h} className="rounded-sm border border-border bg-background p-5 sm:p-6">
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
    <p>English, Punjabi, Hindi and Urdu.</p>

    <h2>Track record</h2>
    <p className="font-semibold">{TRACK_RECORD}</p>

    <h2>See the full platform + live projects</h2>
    <p>
      For live inventory and project listings, visit{" "}
      <a
        href="https://presaleproperties.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary hover:underline font-semibold"
      >
        presaleproperties.com
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
