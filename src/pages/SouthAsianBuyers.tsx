import { Link } from "react-router-dom";
import { FunnelPage, RelatedLinks, DEFAULT_SOCIAL_IMAGE, type FunnelFAQ } from "@/components/FunnelPage";

const faqs: FunnelFAQ[] = [
  {
    question: "Do you work with first-generation buyers?",
    answer:
      "Yes. Many of the buyers I work with are purchasing their first home in Canada and making the decision with their families.",
  },
  {
    question: "Can you explain the process to my parents?",
    answer: "Yes. I work in Punjabi, Hindi, Urdu and English.",
  },
  {
    question: "Can you tell me which first-time buyer programs I qualify for?",
    answer:
      "I can help identify programs that may be relevant, but eligibility and tax/legal advice should be confirmed with the appropriate professional or government source.",
  },
  {
    question: "Does it cost extra to have you represent me?",
    answer:
      "Compensation arrangements vary. On many presale projects, buyer-agent compensation is paid through the project's sales structure. I'll explain the specific arrangement before you move forward.",
  },
];

const SouthAsianBuyers = () => (
  <FunnelPage
    path="/south-asian-buyers"
    title="First-Generation Home Buyers | Surrey & Fraser Valley"
    description="Presale guidance for first-generation and South Asian home buyers across Surrey and the Fraser Valley, in English, Punjabi, Hindi and Urdu."
    h1="When the whole family is buying, the whole family should understand."
    eyebrow="First-Generation Buyers"
    breadcrumbName="South Asian Buyers"
    intro="Many of the families I work with are buying their first home in Canada. Sometimes parents are helping with the deposit. Sometimes the buyer is translating the process back to the family. Sometimes everyone has an opinion — because everyone has something at stake. I work in English, Punjabi, Hindi and Urdu so we can slow the process down and make sure the people involved understand the decision."
    faqs={faqs}
    image={DEFAULT_SOCIAL_IMAGE}
  >
    <h2>There may not be a family playbook for buying in Canada.</h2>
    <p>
      If you're the first person in your family navigating Canadian real estate, there can be a lot to learn quickly. Presale adds another layer: staged deposits, completion years in the future, disclosure documents, financing at completion and closing costs. My role is to make the process understandable.
    </p>

    <h2>Explain the decision in the language that works for your family.</h2>
    <p>
      I work in Punjabi, Hindi, Urdu and English. That means parents contributing to the purchase don't need to rely entirely on a translated summary from their children. We can discuss the project and purchase process together.
    </p>

    <h2>The cheque shouldn't be clearer than the contract.</h2>
    <p>
      If family money is going into the purchase, everyone should understand the major commitments behind it. That's not just good communication. It's good decision-making.
    </p>

    <h2>Understand the financial programs — without building the decision around them.</h2>
    <p>
      First-time buyers may qualify for federal or provincial programs related to new-home purchases. Eligibility can change and depends on your circumstances. I'll help you identify the programs worth investigating and what should be confirmed with your accountant, lawyer, lender or government source before relying on them.
    </p>

    <h2>Talk to Uzair before registering at the sales centre.</h2>
    <p>
      Representation rules vary between projects. If you already have a project in mind, send it to me first.
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
        { to: "/punjabi-speaking-realtor", label: "Punjabi Speaking Realtor" },
        { to: "/hindi-speaking-realtor", label: "Hindi Speaking Realtor" },
        { to: "/urdu-speaking-realtor", label: "Urdu Speaking Realtor" },
        { to: "/surrey", label: "Surrey Presale Condos" },
        { to: "/langley", label: "Langley Presale Townhomes" },
        { to: "/abbotsford", label: "Abbotsford Presale Condos" },
      ]}
    />
  </FunnelPage>
);

export default SouthAsianBuyers;
