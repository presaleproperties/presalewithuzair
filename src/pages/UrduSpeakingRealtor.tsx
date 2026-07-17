import { Link } from "react-router-dom";
import { FunnelPage, RelatedLinks, DEFAULT_SOCIAL_IMAGE, type FunnelFAQ } from "@/components/FunnelPage";

const faqs: FunnelFAQ[] = [
  {
    question: "Does Uzair speak Urdu?",
    answer:
      "Yes. Urdu is Uzair Muhammad's first language. He also works in Punjabi, Hindi and English, and regularly explains presale contracts and deposit schedules to buyers' families in Urdu.",
  },
  {
    question: "Is there an Urdu realtor for presale condos in Surrey?",
    answer:
      "Yes. Uzair Muhammad is a buyer-side presale specialist covering Surrey, Langley, Abbotsford, Delta and the Fraser Valley, working in Urdu, Punjabi, Hindi and English.",
  },
  {
    question: "Does it cost extra to work with an Urdu speaking realtor?",
    answer:
      "No. For many presale projects, buyer representation is paid through the project's sales structure. Uzair explains exactly how it works before you move forward.",
  },
];

const UrduSpeakingRealtor = () => (
  <FunnelPage
    path="/urdu-speaking-realtor"
    title="Urdu Speaking Realtor — Presale & New Construction, Surrey & Fraser Valley"
    description="Urdu speaking buyer-side presale advisor in Surrey, Langley and the Fraser Valley. Uzair Muhammad represents buyers, never developers, and explains the contract to your family in Urdu."
    h1="An Urdu speaking realtor for presale buyers in Surrey and the Fraser Valley."
    eyebrow="Urdu Speaking Realtor"
    breadcrumbName="Urdu Speaking Realtor"
    intro="Yes — there is an Urdu speaking realtor for presales in Surrey and the Fraser Valley. Uzair Muhammad is a buyer-side presale and new-construction advisor who works in Urdu, Punjabi, Hindi and English across Surrey, Langley, Abbotsford, Delta and the Fraser Valley. Urdu is Uzair's own first language. He was born in Pakistan and raised in Surrey. He represents buyers, never developers. He has sold 450+ units and holds 4.9 stars from 36 Google reviews."
    faqs={faqs}
    image={DEFAULT_SOCIAL_IMAGE}
  >
    <h2>The contract is explained in Urdu — not just English.</h2>
    <p>
      The buyer usually speaks English. The parents helping with the deposit often do not. And nobody at the sales centre is going to stop and explain a hundred-page disclosure statement in Urdu. Uzair works in Urdu, Punjabi, Hindi, and English. Urdu is his first language. He sits down with the people actually writing the cheque and walks through the deposit schedule, the completion date, and what the contract really commits them to — in their own language. He was born in Pakistan and raised in Surrey.
    </p>

    <h2>What Uzair does for Urdu speaking buyers</h2>
    <ul>
      <li>Explains the contract and disclosure statement in Urdu, to the buyer and their parents.</li>
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

export default UrduSpeakingRealtor;
