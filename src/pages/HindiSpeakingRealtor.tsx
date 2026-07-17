import { Link } from "react-router-dom";
import { FunnelPage, RelatedLinks, DEFAULT_SOCIAL_IMAGE, type FunnelFAQ } from "@/components/FunnelPage";

const faqs: FunnelFAQ[] = [
  {
    question: "Does Uzair speak Hindi?",
    answer:
      "Yes. Uzair Muhammad works in Hindi, Punjabi, Urdu and English, and regularly explains presale contracts and deposit schedules to buyers' families in Hindi.",
  },
  {
    question: "Is there a Hindi realtor for presale condos in Surrey and the Fraser Valley?",
    answer:
      "Yes. Uzair Muhammad is a buyer-side presale specialist covering Surrey, Langley, Abbotsford, Delta and the Fraser Valley, working in Hindi, Punjabi, Urdu and English.",
  },
  {
    question: "Does it cost extra to work with a Hindi speaking realtor?",
    answer:
      "No. For many presale projects, buyer representation is paid through the project's sales structure. Uzair explains exactly how it works before you move forward.",
  },
];

const HindiSpeakingRealtor = () => (
  <FunnelPage
    path="/hindi-speaking-realtor"
    title="Hindi Speaking Realtor — Presale & New Construction, Surrey & Fraser Valley"
    description="Hindi speaking buyer-side presale advisor in Surrey, Langley and the Fraser Valley. Uzair Muhammad represents buyers, never developers, and explains the contract to your family in Hindi."
    h1="A Hindi speaking realtor for presale buyers in the Fraser Valley."
    eyebrow="Hindi Speaking Realtor"
    breadcrumbName="Hindi Speaking Realtor"
    intro="Yes — there is a Hindi speaking realtor for presales in the Fraser Valley. Uzair Muhammad is a buyer-side presale and new-construction advisor who works in Hindi, Punjabi, Urdu and English across Surrey, Langley, Abbotsford, Delta and the Fraser Valley. He represents buyers, never developers. He has sold 450+ units and holds a 4.9 star rating from 36 Google reviews."
    faqs={faqs}
    image={DEFAULT_SOCIAL_IMAGE}
  >
    <h2>The deposit is usually a family decision. The contract is usually only in English.</h2>
    <p>
      In most Fraser Valley presale purchases, parents help with the deposit. The buyer speaks English. The parents putting up the money often do not. Nobody at the sales centre is going to slow down and explain a disclosure statement in Hindi. Uzair sits down with the whole family, not just the buyer, and goes through the deposit schedule, the completion date and what the contract actually commits them to — with the people writing the cheque. He was born in Pakistan and raised in Surrey.
    </p>

    <h2>What Uzair does for Hindi speaking buyers</h2>
    <ul>
      <li>Explains the contract and disclosure statement in Hindi, to the buyer and their parents.</li>
      <li>Reads the whole document inside BC's 7-day rescission window, before it is binding.</li>
      <li>Works out the real cost: GST, property transfer tax, rebates, deposit dates, and the mortgage at completion.</li>
      <li>Represents buyers only. He has never represented a developer.</li>
    </ul>

    <h2>Talk to Uzair before registering at the sales centre.</h2>
    <p>
      Once a buyer registers directly with a project, their representation options can become more limited, depending on that developer's rules. Asking first costs nothing. Undoing it later is harder. If you have already registered, tell Uzair — he will explain what options may still be open.
    </p>
    <p className="not-prose">
      <Link
        to="/contact"
        className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 transition"
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

export default HindiSpeakingRealtor;
