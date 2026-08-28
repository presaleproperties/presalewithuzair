import { Link } from "react-router-dom";
import { FunnelPage, RelatedLinks, DEFAULT_SOCIAL_IMAGE, type FunnelFAQ } from "@/components/FunnelPage";

const faqs: FunnelFAQ[] = [
  {
    question: "Does Uzair speak Punjabi?",
    answer:
      "Yes. I work in Punjabi, Hindi, Urdu and English and regularly speak with buyers and their families in Punjabi.",
  },
  {
    question: "Do you work outside Surrey?",
    answer:
      "Yes. I help presale and new-construction buyers across the Fraser Valley and Metro Vancouver.",
  },
  {
    question: "Does it cost extra to work with you?",
    answer:
      "Compensation arrangements vary by transaction. On many presale projects, buyer-agent compensation is paid through the project's sales structure. I'll explain exactly how it works for the specific project before you proceed.",
  },
];

const PunjabiSpeakingRealtor = () => (
  <FunnelPage
    path="/punjabi-speaking-realtor"
    title="Punjabi Speaking Presale Realtor | Surrey & Fraser Valley"
    description="Work with a Punjabi-speaking Realtor for presale and new construction across Surrey and the Fraser Valley."
    h1="Presale explained clearly — in Punjabi or English."
    eyebrow="Punjabi Speaking Realtor"
    breadcrumbName="Punjabi Speaking Realtor"
    intro="Buying a home is often a family decision. Sometimes the buyer is comfortable in English while parents or other family members contributing money would rather discuss the details in Punjabi. I work in Punjabi, Hindi, Urdu and English so the whole family can understand the decision together. I'm Uzair Muhammad, a presale and new-construction Realtor serving buyers across Surrey, Langley, Abbotsford, Delta and the Fraser Valley."
    faqs={faqs}
    image={DEFAULT_SOCIAL_IMAGE}
  >
    <p lang="pa" className="not-prose rounded-sm border-l-2 border-primary bg-card px-6 py-5 text-lg leading-loose text-foreground/85">
      ਸਤ ਸ੍ਰੀ ਅਕਾਲ, ਮੈਂ ਉਜ਼ੈਰ ਮੁਹੰਮਦ ਹਾਂ। ਮੈਂ ਸਰੀ, ਲੈਂਗਲੀ ਅਤੇ ਫਰੇਜ਼ਰ ਵੈਲੀ ਵਿੱਚ ਪਰਿਵਾਰਾਂ ਦੀ ਉਹਨਾਂ ਦਾ ਪਹਿਲਾ ਪ੍ਰੀਸੇਲ ਘਰ ਖਰੀਦਣ ਵਿੱਚ ਮਦਦ ਕਰਦਾ ਹਾਂ। ਡਿਪਾਜ਼ਿਟ ਦੀਆਂ ਤਰੀਕਾਂ, ਕੰਟਰੈਕਟ ਦੀਆਂ ਸ਼ਰਤਾਂ ਅਤੇ ਅਸਲ ਲਾਗਤ ਮੈਂ ਤੁਹਾਡੇ ਮਾਤਾ-ਪਿਤਾ ਨੂੰ ਪੰਜਾਬੀ ਵਿੱਚ ਸਮਝਾਉਂਦਾ ਹਾਂ, ਤਾਂ ਜੋ ਸਾਈਨ ਕਰਨ ਤੋਂ ਪਹਿਲਾਂ ਪੂਰੇ ਪਰਿਵਾਰ ਨੂੰ ਸਭ ਕੁਝ ਸਾਫ਼ ਹੋਵੇ। ਮੈਂ ਸਿਰਫ਼ ਖਰੀਦਦਾਰਾਂ ਦਾ ਪੱਖ ਰੱਖਦਾ ਹਾਂ — ਡਿਵੈਲਪਰ ਦਾ ਕਦੇ ਨਹੀਂ।
    </p>

    <h2>The whole family should understand the purchase.</h2>
    <p>
      I can explain the project, deposit schedule, completion timeline and major purchase terms in Punjabi so the people involved in the decision understand what they're contributing toward.
    </p>
    <p>
      When something requires legal, tax or lending advice, I also help identify what should be confirmed with the appropriate professional.
    </p>

    <h2>What I help Punjabi-speaking buyers understand</h2>
    <ul>
      <li>The project and competing options</li>
      <li>Deposit amounts and timing</li>
      <li>Floor plan and pricing</li>
      <li>Completion timeline</li>
      <li>Major purchase terms</li>
      <li>Potential closing costs</li>
      <li>Questions to take to your lawyer, lender or accountant</li>
    </ul>

    <h2>Talk to me before registering directly with a sales centre.</h2>
    <p>
      Representation rules vary between projects. If you're considering a development, it's easier to understand your options before you register than after.
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

export default PunjabiSpeakingRealtor;
