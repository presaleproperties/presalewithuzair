import { Link } from "react-router-dom";
import { FunnelPage, RelatedLinks, DEFAULT_SOCIAL_IMAGE, type FunnelFAQ } from "@/components/FunnelPage";

const faqs: FunnelFAQ[] = [
  {
    question: "Is Uzair used to working with first-generation South Asian buyers?",
    answer:
      "Yes. Most of Uzair Muhammad's clients are South Asian and many are the first in their family to buy a home in Canada. He works in Punjabi, Hindi, Urdu and English, and regularly sits down with the people writing the cheque to walk through the contract and deposit schedule in their own language.",
  },
  {
    question: "What government programs can first-time buyers stack on a new home?",
    answer:
      "Canada's enhanced First-Time Buyer GST rebate can save up to $50,000 on qualifying new homes under the cap. BC's Newly-Built Home PTT exemption can remove property transfer tax on qualifying homes up to $1.1M. Eligibility depends on the buyer's situation and the rules change — Uzair models whether it is likely to apply, and buyers should confirm with a tax professional or lawyer.",
  },
  {
    question: "Does it cost extra to have Uzair represent the buyer?",
    answer:
      "No. For many presale projects, buyer representation is paid through the project's sales structure. Uzair explains exactly how it works before you move forward.",
  },
];

const SouthAsianBuyers = () => (
  <FunnelPage
    path="/south-asian-buyers"
    title="Buying a Presale as a First-Generation Buyer | Surrey & Fraser Valley"
    description="Most of Uzair Muhammad's clients are South Asian and many are the first in their family to buy a home in Canada. Buyer-side presale guidance in Punjabi, Hindi, Urdu and English."
    h1="Buying a presale when nobody in the family has done it in Canada before."
    eyebrow="First-Generation Buyers"
    breadcrumbName="South Asian Buyers"
    intro="Most of Uzair Muhammad's clients are South Asian, and many are the first in their family to buy a home in Canada. Uzair works in Punjabi, Hindi, Urdu and English, represents buyers only, and sits down with the whole family — including the parents funding the deposit — to walk through the contract."
    faqs={faqs}
    image={DEFAULT_SOCIAL_IMAGE}
  >
    <h2>There is no family playbook.</h2>
    <p>
      Most of Uzair's clients are South Asian, and many are the first in their family to buy a home in Canada. There is no parent who has already done this here to ask. Every step is new, and the sales centre is not going to slow down and explain it.
    </p>

    <h2>The contract is explained in Punjabi, Hindi, and Urdu — not just English.</h2>
    <p>
      The buyer usually speaks English. The parents helping with the deposit often do not. And nobody at the sales centre is going to stop and explain a hundred-page disclosure statement in Punjabi, Hindi, or Urdu. Uzair works in all four languages. He sits down with the people actually writing the cheque and walks through the deposit schedule, the completion date, and what the contract really commits them to — in their own language. He was born in Pakistan and raised in Surrey.
    </p>

    <h2>The people writing the cheque get the contract in their language.</h2>
    <p>
      Uzair explains the deposit schedule, the completion timeline, and the contract terms directly to them, in Punjabi, Hindi, or Urdu. Most of his business comes from referrals by families he has already sat down with.
    </p>

    <h2>The money most first-time buyers miss.</h2>
    <p>
      Canada's enhanced First-Time Buyer GST rebate can save up to $50,000 on qualifying new homes under the cap, and BC's Newly-Built Home PTT exemption can remove property transfer tax on qualifying homes up to $1.1M. Eligibility depends on the buyer's situation and the rules change — Uzair models whether it is likely to apply, and buyers should confirm with a tax professional or lawyer.
    </p>

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
