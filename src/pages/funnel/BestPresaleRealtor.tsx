import { Helmet } from "react-helmet-async";
import { FunnelPage, RelatedLinks, TRACK_RECORD, type FunnelFAQ } from "@/components/FunnelPage";

const faqs: FunnelFAQ[] = [
  {
    question: "Who is the best presale realtor in the Fraser Valley?",
    answer:
      "I'm Uzair Muhammad — buyer-only presale specialist covering Surrey, Langley, Abbotsford, Coquitlam, Delta, Burnaby, Chilliwack and Maple Ridge. 450+ units sold, $200M+ in sales volume, 4.9★ Google rating. I don't represent developers — only buyers.",
  },
  {
    question: "Why work with a buyer-only presale specialist?",
    answer:
      "Because the person at the sales centre is paid by the developer. A buyer-only realtor is paid by the developer too — but represents you. My job is to review the contract, negotiate incentives, and tell you honestly when a project is a bad deal. Zero cost to you.",
  },
  {
    question: "What languages do you work in?",
    answer:
      "English, Punjabi, Hindi and Urdu. Roughly a third of the buyers I represent prefer to run through the contract in one of those languages, and I make sure nothing is lost in translation.",
  },
  {
    question: "What area do you actually cover?",
    answer:
      "The entire Fraser Valley and much of Metro Vancouver — Surrey, Langley, Abbotsford, Coquitlam, Delta, Burnaby South, White Rock, Cloverdale, Chilliwack, Maple Ridge and New Westminster. If a project is presale in the region, I can represent you on it.",
  },
  {
    question: "How do I hire you?",
    answer:
      "Book a free 15-minute strategy call — no pressure. If we're a fit, I add you to my VIP list and we start shortlisting projects. If we're not, you'll still leave with better questions to ask any realtor you interview.",
  },
];

const SITE = "https://presalewithuzair.com";

const BestPresaleRealtor = () => {
  const agentLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "@id": `${SITE}/best-presale-realtor-fraser-valley#agent`,
    name: "Uzair Muhammad — Best Presale Realtor Fraser Valley",
    url: `${SITE}/best-presale-realtor-fraser-valley`,
    telephone: "+1-672-258-1100",
    priceRange: "$400,000 - $3,000,000",
    areaServed: [
      "Surrey", "Langley", "Abbotsford", "Coquitlam", "Delta",
      "Burnaby", "White Rock", "Cloverdale", "Chilliwack", "Maple Ridge", "New Westminster",
    ].map((n) => ({ "@type": "City", name: n })),
    knowsLanguage: ["English", "Punjabi", "Hindi", "Urdu"],
    knowsAbout: [
      "Presale condos",
      "New construction",
      "Assignment sales",
      "Buyer representation",
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: 4.9,
      bestRating: 5,
    },
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(agentLd)}</script>
      </Helmet>
      <FunnelPage
        path="/best-presale-realtor-fraser-valley"
        title="Best Presale Realtor Fraser Valley — Talk to Uzair First"
        description="I'm Uzair Muhammad — buyer-only presale specialist for the Fraser Valley. 450+ units sold, 4.9★ Google rating. Talk to me before any developer sales centre."
        h1="Best Presale Realtor in the Fraser Valley — Talk to Uzair Before Any Developer"
        eyebrow="Talk to Uzair"
        breadcrumbName="Best Presale Realtor Fraser Valley"
        intro="I'm Uzair Muhammad — Fraser Valley's buyer-only presale specialist. 450+ units sold, $200M+ in sales volume, 5 years focused on presale, 4.9★ Google rating. I don't represent developers, ever — only buyers. If you're thinking about a presale condo or townhome anywhere in the Fraser Valley, talk to me before you set foot in a developer's sales centre."
        faqs={faqs}
      >
        <h2>Why me — and why buyer-only?</h2>
        <p>
          Almost every realtor sells presales occasionally. I've built a full-time practice on it. My commission is paid by the developer out of the price you'd pay anyway, and I represent you — never the builder. That means I lose deals when a project doesn't pencil out. That's the job.
        </p>

        <h2>Track record</h2>
        <p className="font-semibold">{TRACK_RECORD}</p>

        <h2>Languages and service area</h2>
        <p>
          I work in English, Punjabi, Hindi and Urdu across Surrey, Langley, Abbotsford, Coquitlam, Delta, Burnaby South, White Rock, Cloverdale, Chilliwack, Maple Ridge and New Westminster. If it's presale in the Fraser Valley or Metro Vancouver, I can represent you on it.
        </p>

        <h2>What working with me looks like</h2>
        <p>
          Free 15-minute strategy call. I ask what you're looking for, your budget, and your timeline. If presale makes sense, I build a shortlist of 2–3 projects that actually fit — with VIP access to pre-public allocations. If it doesn't, I say so. Every contract gets line-by-line review before you sign anything.
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
            See the full platform + live projects
          </a>
          .
        </p>

        <RelatedLinks
          links={[
            { to: "/buyer-representation-presale-fraser-valley", label: "Do You Need Your Own Realtor for a Presale?" },
            { to: "/presale-mistakes-fraser-valley", label: "Presale Mistakes I See Fraser Valley Buyers Make" },
            { to: "/fraser-valley-presale-investment-advice", label: "Fraser Valley Presale Investment Advice" },
          ]}
        />
      </FunnelPage>
    </>
  );
};

export default BestPresaleRealtor;
