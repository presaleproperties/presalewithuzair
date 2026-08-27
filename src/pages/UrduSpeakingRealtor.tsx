import { Link } from "react-router-dom";
import { FunnelPage, RelatedLinks, DEFAULT_SOCIAL_IMAGE, type FunnelFAQ } from "@/components/FunnelPage";

const faqs: FunnelFAQ[] = [
  {
    question: "Does Uzair speak Urdu?",
    answer: "Yes. Urdu is my first language. I also work in Punjabi, Hindi and English.",
  },
  {
    question: "Do you help Urdu-speaking buyers outside Surrey?",
    answer: "Yes. I work across the Fraser Valley and Metro Vancouver.",
  },
  {
    question: "Does it cost extra to work with you?",
    answer:
      "Compensation arrangements vary by transaction. On many presale projects, buyer-agent compensation is paid through the project's sales structure. I'll explain the arrangement before you proceed.",
  },
];

const UrduSpeakingRealtor = () => (
  <FunnelPage
    path="/urdu-speaking-realtor"
    title="Urdu Speaking Presale Realtor | Surrey & Fraser Valley"
    description="Work with an Urdu-speaking Realtor for presale and new construction across Surrey and the Fraser Valley."
    h1="Presale guidance in Urdu — for you and your family."
    eyebrow="Urdu Speaking Realtor"
    breadcrumbName="Urdu Speaking Realtor"
    intro="Urdu is my first language. I was born in Pakistan and raised in Surrey, and today I help families across the Fraser Valley navigate presale and new construction in Urdu, Punjabi, Hindi and English. For many families, buying a home is not an individual decision — parents may be helping with the deposit, and several generations may be discussing the purchase. Everyone deserves to understand what the family is committing to."
    faqs={faqs}
    image={DEFAULT_SOCIAL_IMAGE}
  >
    <p lang="ur" dir="rtl" className="not-prose rounded-sm border-l-2 border-primary bg-card px-6 py-5 text-lg leading-loose text-foreground/85 text-right">
      السلام علیکم، میں عذیر محمد ہوں۔ میں سرے، لینگلی اور فریزر ویلی میں خاندانوں کی ان کا پہلا پری سیل گھر خریدنے میں مدد کرتا ہوں۔ ڈپازٹ کی تاریخیں، کنٹریکٹ کی شرائط اور اصل لاگت میں آپ کے والدین کو اردو میں سمجھاتا ہوں، تاکہ دستخط کرنے سے پہلے پورے خاندان کو سب کچھ واضح ہو۔ میں صرف خریداروں کی نمائندگی کرتا ہوں — ڈویلپر کی کبھی نہیں۔
    </p>

    <h2>The people contributing to the purchase should understand it.</h2>
    <p>
      I can explain the project, deposit schedule, completion timeline and major purchase terms in Urdu.
    </p>
    <p>
      When something requires legal, tax or lending advice, I help identify what should be confirmed with the appropriate professional.
    </p>

    <h2>What I help Urdu-speaking buyers understand</h2>
    <ul>
      <li>Project comparison</li>
      <li>Deposit amounts and dates</li>
      <li>Floor plan and pricing</li>
      <li>Completion timing</li>
      <li>Major purchase terms</li>
      <li>Closing-cost considerations</li>
      <li>Questions for your lawyer, accountant or lender</li>
    </ul>

    <h2>Talk to me before registering directly with a sales centre.</h2>
    <p>
      Representation options can vary from one development to another. If you're interested in a project, start by asking.
    </p>
    <p className="not-prose">
      <Link
        to="/call"
        className="inline-flex items-center gap-2 rounded-sm bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 transition"
      >
        Talk To Uzair First
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

export default UrduSpeakingRealtor;
