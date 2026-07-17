import { FunnelPage, RelatedLinks, TRACK_RECORD, DEFAULT_SOCIAL_IMAGE, type FunnelFAQ } from "@/components/FunnelPage";

const faqs: FunnelFAQ[] = [
  {
    question: "Is presale a good idea for a first-time buyer?",
    answer:
      "Often yes. You lock today's price with time to save, get a brand-new warrantied home, and can stack the First-Time Buyer GST rebate plus BC's Newly-Built PTT exemption. I only recommend presales where the project, contract, and completion timing fit your income.",
  },
  {
    question: "How much money do I need to start on a Fraser Valley presale?",
    answer:
      "Most Fraser Valley developers ask 15–20% staged over 12–24 months. On a $550,000 first home that's often about $27,500 at signing and another 5% within 30–90 days — a smaller upfront cheque than a resale down payment.",
  },
  {
    question: "What is the up-to-$50,000 First-Time Buyer GST rebate?",
    answer:
      "Canada's enhanced GST rebate for first-time buyers of new construction can save up to $50,000 on qualifying homes under the price cap. Combined with BC's Newly-Built Home PTT exemption (to $1.1M), it's a real five-figure closing benefit — I model it before you commit.",
  },
  {
    question: "How is your fee paid?",
    answer:
      "My fee comes from the developer's marketing budget — it isn't added on top of the purchase price. Skipping independent representation doesn't reduce your price; it just leaves you without someone on your side of the table.",
  },
  {
    question: "What if my income or life changes before completion?",
    answer:
      "That's why the 7-day rescission window matters — we pre-qualify financing then. I only recommend projects where the deposit ladder and completion timing fit your income, and we favour assignment-friendly contracts so you have a real exit if life changes.",
  },
];

const FirstTimeBuyers = () => (
  <FunnelPage
    path="/first-time-buyers-fraser-valley"
    title="First-Time Buyers: Buy New Construction in the Fraser Valley"
    description="I'm Uzair — buyer-only presale specialist. How first-time buyers use presale + new construction to lock today's price, stage deposits, and stack the GST rebate and PTT newly-built exemption."
    h1="First-Time Buyers: How I Help You Buy New Construction in the Fraser Valley"
    eyebrow="First-Time Buyers"
    breadcrumbName="First-Time Buyers Fraser Valley"
    image={DEFAULT_SOCIAL_IMAGE}
    intro="I'm Uzair Muhammad, buyer-only presale specialist for the Fraser Valley. Before you walk into a developer sales centre, talk to someone who works for you. First-time buyers are a big part of who I represent — because presale and new construction are built for how you actually buy: lock today's price on a brand-new home, stage deposits over 12–24 months while you save, and consider federal/provincial new-construction incentives you may qualify for. My fee comes from the developer's marketing budget."
    faqs={faqs}
  >
    <h2>Why presale suits a first home</h2>
    <p>
      You lock in today's price for a home that completes in 12–36 months — time to save, keep your job stable, and grow your down payment. You get a brand-new home under BC's 2-5-10 new-home warranty, no bidding wars against 12 other buyers, and a smaller upfront cheque at signing than a resale down payment.
    </p>

    <h2>The up-to-$50,000 GST rebate + PTT newly-built exemption</h2>
    <p>
      Canada's enhanced First-Time Buyer GST rebate can save you up to $50,000 on qualifying new homes under the price cap. BC's Newly-Built Home PTT exemption removes property transfer tax on qualifying new homes to $1.1M. Stacked, that's a real five-figure closing swing that only exists on new construction — and I model it into every project we look at.
    </p>

    <h2>The 7-day rescission window and deposit protection</h2>
    <p>
      BC law gives you a 7-day rescission window after signing — that's when I review the contract, the disclosure statement, deposit protection, and financing. Your deposits sit in a lawyer's trust account under the Real Estate Development Marketing Act, not the developer's chequing account. If the project cancels, your deposit and interest come back to you.
    </p>

    <h2>My step-by-step for first-time buyers</h2>
    <p>
      Free 15-minute strategy call. Mortgage pre-qualification with a broker I trust. Shortlist of 2–3 projects that fit your budget and completion timeline. VIP pre-public allocation at the private launch event. 7-day rescission review of the contract and disclosure statement. Staged deposits. Deficiency walkthrough and keys at completion.
    </p>

    <h2>Track record</h2>
    <p className="font-semibold">{TRACK_RECORD}</p>

    <h2>How my fee works</h2>
    <p>
      My fee comes from the developer's marketing budget — it isn't added on top of the purchase price you'd pay walking in on your own. First-time buyers get the same buyer-only representation, contract review, and shortlist process as my repeat clients.
    </p>

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
