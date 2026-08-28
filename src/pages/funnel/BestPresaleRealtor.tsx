import { Helmet } from "react-helmet-async";
import { FunnelPage, RelatedLinks, type FunnelFAQ } from "@/components/FunnelPage";

const faqs: FunnelFAQ[] = [
  {
    question: "What should I ask a presale Realtor before hiring them?",
    answer:
      "Ask how they evaluate projects, how they compare new construction with resale, how they handle the completion process and how they're compensated.",
  },
  {
    question: "Is presale specialization important?",
    answer:
      "Presale has a different timeline, documentation and risk profile from resale, so experience with that process can be valuable.",
  },
  {
    question: "Do you represent developers?",
    answer:
      "My positioning and practice are focused on advising buyers rather than promoting projects on behalf of developers.",
  },
  {
    question: "How do I start?",
    answer: "Send me a project or book a strategy call.",
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
    telephone: "+1-778-231-3592",
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
        title="How to Choose a Presale Realtor in the Fraser Valley"
        description="Five things to look for when choosing a Realtor to help you evaluate presales in the Fraser Valley."
        h1="Don't Ask Who Calls Themselves the Best. Ask How They Think."
        eyebrow="Choosing Your Advisor"
        breadcrumbName="Best Presale Realtor Fraser Valley"
        intro="If you're looking for a presale Realtor in the Fraser Valley, there are plenty of people who can show you a project. The more useful question is: who will help you decide whether the project is worth buying? I'm Uzair Muhammad. Presale and new construction are the focus of my practice, and I've helped 450+ families purchase more than $200M in new homes. But instead of asking you to take the words “presale expert” at face value, here are the questions I think you should ask any Realtor you're considering."
        faqs={faqs}
      >
        <h2>1. Will they tell you not to buy?</h2>
        <p>
          An advisor should be able to lose a transaction to protect the client. Ask them about the last project they told someone to walk away from.
        </p>

        <h2>2. Do they compare projects or only promote launches?</h2>
        <p>You want context. Not another marketing channel.</p>

        <h2>3. Can they explain the full presale timeline?</h2>
        <p>Deposits, completion, financing preparation, walkthrough and possession all matter.</p>

        <h2>4. Do they understand your specific buyer profile?</h2>
        <p>The right project for an investor can be wrong for a first-time buyer.</p>

        <h2>5. Can they explain their compensation clearly?</h2>
        <p>You should understand how your Realtor is paid before moving forward.</p>

        <h2>Why buyers work with me</h2>
        <p>
          Presale-focused practice. 450+ families helped. $200M+ in new-home purchases. 10 years of prior City of Surrey planning/bylaws experience. English, Punjabi, Hindi and Urdu. Founder of the Vancouver Presale Expo. Willingness to recommend waiting or walking away.
        </p>

        <h2>Service area</h2>
        <p>
          Surrey, Langley, Abbotsford, Coquitlam, Delta, Burnaby, Chilliwack, Maple Ridge, White Rock and surrounding Metro Vancouver and Fraser Valley markets.
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
