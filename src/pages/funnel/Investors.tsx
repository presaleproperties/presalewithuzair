import { FunnelPage, RelatedLinks, TRACK_RECORD, DEFAULT_SOCIAL_IMAGE, type FunnelFAQ } from "@/components/FunnelPage";

const faqs: FunnelFAQ[] = [
  {
    question: "Are Fraser Valley presales still worth it for investors in 2026?",
    answer:
      "Selectively. Well-priced 1-bed + dens in Abbotsford watch closest to break-even for cash flow. The Surrey–Langley SkyTrain corridor (Willoughby, Latimer, opening ~2028/29) is the appreciation play. Weaker towers priced above nearby resale don't pencil — those I turn down.",
  },
  {
    question: "Which Fraser Valley submarkets do you actually recommend?",
    answer:
      "For cash flow: Abbotsford (University District, downtown). For appreciation: Surrey City Centre, Fleetwood, and the Willoughby / Latimer SkyTrain corridor. For family-investor exits, 2-bed townhomes in Willoughby often outperform 1-bed condos on a hold.",
  },
  {
    question: "How does BC's 2025 home-flipping tax apply to a presale assignment?",
    answer:
      "The tax is 20% on property sold within 365 days, sliding to 0% by day 730 — and CRA treats presale assignments as taxable sales. Structuring the hold and confirming the assignment clause before signing is essential; I model it into every investor scenario.",
  },
  {
    question: "How much of my capital does a Fraser Valley presale actually tie up?",
    answer:
      "Typically 15–20% staged over 12–24 months. On a $600K unit that's about $90–120K over roughly two years — leveraging a full home while your capital is committed on a fraction. Only works if you can carry both the deposit ladder and the completion mortgage.",
  },
  {
    question: "When would you tell an investor NOT to buy?",
    answer:
      "When presale $/sqft is above resale comps, when the deposit ladder outruns income, or when appreciation depends on infrastructure five years out with a thin developer track record. Better to walk than lose a deposit.",
  },
];

const Investors = () => (
  <FunnelPage
    path="/investors-fraser-valley"
    title="Investors: Buy Presale & New Construction in Fraser Valley"
    description="I'm Uzair — buyer-only presale specialist. How I pick Fraser Valley presales for investors: cash-flow vs appreciation, Abbotsford + Surrey-Langley SkyTrain corridor, assignments, 2025 BC flipping tax."
    h1="Investors: How I Help You Buy Presale & New Construction in the Fraser Valley"
    eyebrow="Investors"
    breadcrumbName="Investors Fraser Valley"
    image={DEFAULT_SOCIAL_IMAGE}
    intro="I'm Uzair Muhammad, buyer-only presale specialist for the Fraser Valley — and I invest in the same presales I recommend. Investors get honest picks, not brochure hype: which submarkets watch for cash flow (Abbotsford) versus appreciation (Surrey–Langley SkyTrain corridor: Willoughby, Latimer, ~2028/29), how to structure assignments around BC's 2025 flipping tax, and how to use deposit leverage to build a portfolio without over-extending. Projected numbers only; no guaranteed returns."
    faqs={faqs}
  >
    <h2>How I pick projects — cash flow vs appreciation</h2>
    <p>
      For cash flow: 1-bed + den in Abbotsford and University District — closer to break-even on a stress-tested mortgage than anywhere else in the region. For appreciation: Surrey City Centre and the Willoughby / Latimer corridor along the SkyTrain extension (opening ~2028/29). Different unit types, different holds, different exits. I model each project against active resale comps before I ever recommend it.
    </p>

    <h2>Abbotsford — the near-break-even cash-flow watch</h2>
    <p>
      Abbotsford is the cheapest presale entry in the region and rents have held up. Well-priced 1-bed + dens can get close to break-even on a stress-tested mortgage, especially with lower strata fees in newer buildings. Not every Abbotsford tower pencils — some are priced above nearby resale, which kills the thesis. I run the numbers on each before recommending.
    </p>

    <h2>Surrey–Langley SkyTrain corridor — the appreciation play</h2>
    <p>
      The SkyTrain extension along Fraser Highway opens ~2028/29 through Willoughby and Latimer. Land assemblies are already trading on it. Buying presale now with 3–5 year completion targets the moment stations open — that's the appreciation thesis. Not guaranteed; sensitive to project selection, developer track record, and delivery timing. Getting in at the VIP launch matters.
    </p>

    <h2>Assignment strategy and BC's 2025 flipping tax</h2>
    <p>
      Assignment lets you sell the contract before completion — powerful in a rising market. But BC's 2025 home-flipping tax (20% within 365 days, sliding to 0% by day 730) now applies to presale assignments, and CRA continues to treat presale assignments as taxable sales. Structuring the hold and reviewing the assignment clause before signing is core to my investor work.
    </p>

    <h2>Deposit leverage and portfolio building</h2>
    <p>
      A 20% presale deposit on a $600K unit controls a full home while your capital is tied up on roughly $120K, not the whole purchase. That leverage — combined with 12–36 month completion — is how investors compound. Only works if you can carry deposit dates and the completion mortgage; I stress-test both before you sign.
    </p>

    <h2>When I tell investors NOT to buy</h2>
    <p>
      When presale $/sqft is above active resale comps. When the deposit ladder outruns income. When appreciation depends on infrastructure five years out and the developer's track record is thin. I lose deals turning investors away — that's the job.
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
