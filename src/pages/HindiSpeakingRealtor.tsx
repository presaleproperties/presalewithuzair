import { Link } from "react-router-dom";
import { FunnelPage, RelatedLinks, DEFAULT_SOCIAL_IMAGE, type FunnelFAQ } from "@/components/FunnelPage";

const faqs: FunnelFAQ[] = [
  {
    question: "Does Uzair speak Hindi?",
    answer: "Yes. I work in Hindi, Punjabi, Urdu and English.",
  },
  {
    question: "Do you help Hindi-speaking presale buyers across the Fraser Valley?",
    answer: "Yes. My core markets include Surrey, Langley, Abbotsford, Delta and surrounding communities.",
  },
  {
    question: "Does working with you cost extra?",
    answer:
      "Compensation arrangements vary by transaction. On many presale projects, buyer-agent compensation is paid through the project's sales structure. I'll explain the arrangement before you move forward.",
  },
];

const HindiSpeakingRealtor = () => (
  <FunnelPage
    path="/hindi-speaking-realtor"
    title="Hindi Speaking Presale Realtor | Surrey & Fraser Valley"
    description="Hindi-speaking Realtor helping presale and new-construction buyers across Surrey and the Fraser Valley."
    h1="Presale guidance in Hindi or English."
    eyebrow="Hindi Speaking Realtor"
    breadcrumbName="Hindi Speaking Realtor"
    intro="A home purchase can involve the entire family. I work in Hindi, Punjabi, Urdu and English so buyers and the family members helping them can understand the project, deposit schedule and purchase process together. I'm Uzair Muhammad, a buyer-side presale and new-construction Realtor serving Surrey, Langley, Abbotsford, Delta and the Fraser Valley."
    faqs={faqs}
    image={DEFAULT_SOCIAL_IMAGE}
  >
    <p lang="hi" className="not-prose rounded-sm border-l-2 border-primary bg-card px-6 py-5 text-lg leading-loose text-foreground/85">
      नमस्ते, मैं उज़ैर मुहम्मद हूँ। मैं सरे, लैंगली और फ्रेज़र वैली में परिवारों को उनका पहला प्रीसेल घर खरीदने में मदद करता हूँ। डिपॉज़िट की तारीखें, कॉन्ट्रैक्ट की शर्तें और असली लागत मैं आपके माता-पिता को हिंदी में समझाता हूँ, ताकि साइन करने से पहले पूरे परिवार को सब कुछ साफ़ हो। मैं सिर्फ़ खरीदारों की तरफ़ से काम करता हूँ — डेवलपर की तरफ़ से कभी नहीं।
    </p>

    <h2>The whole family should understand the purchase.</h2>
    <p>
      I can walk through the project, deposits, completion timeline and major purchase terms in Hindi.
    </p>
    <p>
      When legal, lending or tax advice is required, I'll help identify what needs to be confirmed with the appropriate professional.
    </p>

    <h2>What I help Hindi-speaking buyers understand</h2>
    <ul>
      <li>The project and competing options</li>
      <li>Deposit schedule</li>
      <li>Floor plan and pricing</li>
      <li>Completion timing</li>
      <li>Major purchase terms</li>
      <li>Potential closing costs</li>
      <li>Questions for your lawyer, lender or accountant</li>
    </ul>

    <h2>Talk to me before registering directly with a sales centre.</h2>
    <p>
      Representation rules vary by project. Understanding your options first is easier than trying to change them later.
    </p>
    <p className="not-prose">
      <Link
        to="/call"
        className="inline-flex items-center gap-2 rounded-sm bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 transition"
      >
        Book a 15-Minute Call
      </Link>
    </p>

    <RelatedLinks
      links={[
        { to: "/surrey", label: "Surrey Presale Condos" },
        { to: "/langley", label: "Langley Presale Townhomes" },
        { to: "/abbotsford", label: "Abbotsford Presale Condos" },
        { to: "/south-asian-buyers", label: "South Asian Buyers — First-Generation Guide" },
        { to: "/contact", label: "Contact Uzair" },
      ]}
    />
  </FunnelPage>
);

export default HindiSpeakingRealtor;
