import { Link } from "react-router-dom";
import { FunnelPage, RelatedLinks, DEFAULT_SOCIAL_IMAGE, type FunnelFAQ } from "@/components/FunnelPage";

const faqs: FunnelFAQ[] = [
  {
    question: "Does Uzair speak Urdu?",
    answer:
      "Urdu is my first language. I was born in Pakistan and raised in Surrey, and I run full purchase conversations in Urdu — contract terms, deposit schedules, completion timing — with buyers and with the parents helping them. I also work in Punjabi, Hindi and English.",
  },
  {
    question: "Do you help Urdu-speaking buyers outside Surrey?",
    answer:
      "Yes. I represent buyers across Surrey, Langley, Abbotsford, Delta, Coquitlam, Burnaby, Maple Ridge and Chilliwack. The market changes from city to city; the representation doesn't. Buyers only, full contract review, and the explanation delivered in the language your family is most comfortable in.",
  },
  {
    question: "Does it cost extra to work with you?",
    answer:
      "On most presale projects the developer pays the buyer-agent fee from the project's marketing budget, so my representation costs you nothing at the purchase price. Arrangements vary by transaction, and I confirm the exact terms for your project in writing before you proceed.",
  },
];

const UrduSpeakingRealtor = () => (
  <FunnelPage
    path="/urdu-speaking-realtor"
    title="Urdu Speaking Presale Realtor | Surrey & Fraser Valley"
    description="Urdu-speaking presale realtor for Surrey, Langley, Abbotsford and the Fraser Valley. Buyer-side only. Contracts, deposits and costs explained in Urdu."
    h1="Urdu-Speaking Presale Realtor in Surrey, Langley & Fraser Valley"
    eyebrow="Urdu Speaking Realtor"
    breadcrumbName="Urdu Speaking Realtor"
    intro="Urdu is my first language. I'm Uzair Muhammad, a buyer-side presale and new-construction realtor working across Surrey, Langley, Abbotsford, Delta and the Fraser Valley — and I explain contracts, deposits and completion costs in Urdu so the people funding the purchase understand exactly what the family is committing to."
    faqs={faqs}
    image={DEFAULT_SOCIAL_IMAGE}
  >
    <p lang="ur" dir="rtl" className="not-prose rounded-sm border-l-2 border-primary bg-card px-6 py-5 text-lg leading-loose text-foreground/85 text-right">
      السلام علیکم، میں عذیر محمد ہوں۔ میں سرے، لینگلی اور فریزر ویلی میں خاندانوں کی ان کا پہلا پری سیل گھر خریدنے میں مدد کرتا ہوں۔ ڈپازٹ کی تاریخیں، کنٹریکٹ کی شرائط اور اصل لاگت میں آپ کے والدین کو اردو میں سمجھاتا ہوں، تاکہ دستخط کرنے سے پہلے پورے خاندان کو سب کچھ واضح ہو۔ میں صرف خریداروں کی نمائندگی کرتا ہوں — ڈویلپر کی کبھی نہیں۔
    </p>

    <h2>Born in Pakistan, raised in Surrey, working for buyers only.</h2>
    <p>
      I know how these purchases actually get made in our community, because I grew up inside them. The decision is rarely one person's. A son or daughter finds the project, a father or an uncle helps with the deposit, and a mother asks the question everyone else is too polite to ask: what happens to our money if this building never gets finished?
    </p>
    <p>
      That question deserves a real answer, in Urdu, before anyone signs. Deposits in British Columbia are generally held in trust under the Real Estate Development Marketing Act, but the protection depends on the specific disclosure statement and purchase agreement in front of you — not on what the sales centre says over tea. I read those documents with the family, in Urdu, and tell you what they actually say.
    </p>

    <h2>What I do for Urdu-speaking buyers</h2>
    <ul>
      <li>Compare the project against the other developments competing for the same money, and explain the comparison in Urdu.</li>
      <li>Lay out every deposit amount and date in writing, so the cash requirement is never a surprise.</li>
      <li>Review the disclosure statement and contract inside BC's seven-day rescission window, while you can still walk away without penalty.</li>
      <li>Explain the full cost: GST and the New Housing Rebate, property transfer tax and the newly-built home exemption, strata fees, closing costs and the mortgage you'll have to qualify for at completion.</li>
      <li>Check the assignment clause early, so an exit strategy is based on the contract rather than an assumption.</li>
      <li>Look hard at the floor plan — usable space, storage, orientation, and who buys it from you later.</li>
      <li>Stay with the file through deposit milestones, construction updates, financing, the deficiency walkthrough and possession.</li>
    </ul>

    <h2>Ten years in planning changes how I read a project.</h2>
    <p>
      Before real estate I spent 10 years with the City of Surrey in planning and bylaws. That background doesn't make me your lawyer or your accountant, but it does mean I look past the show suite: what's zoned nearby, what's already approved, how much competing supply is coming, and whether the neighbourhood in the rendering is the neighbourhood you'll actually get. That's the part of a presale decision most buyers never see, and it's usually the part that decides how the purchase feels in five years.
    </p>
    <p>
      I've helped more than 450 families buy new homes, I represent buyers only, and I have never represented a developer. When a project doesn't fit the family in front of me, I say so — including when the honest advice is to wait or to buy resale instead.
    </p>

    <h2>Talk to me before you register at a sales centre.</h2>
    <p>
      Representation rules differ from one development to another. Once you register directly with a project, their representative may be credited as yours, and that is far harder to reverse than it is to avoid. Ask first — it costs nothing. If you've already registered somewhere, tell me and I'll explain what may still be possible.
    </p>
    <p className="not-prose">
      <Link
        to="/call"
        className="inline-flex items-center gap-2 rounded-sm bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 transition"
      >
        Book a 15-Minute Call
      </Link>
    </p>

    <h2>Prefer another language?</h2>
    <p>
      I also work with families in <Link to="/hindi-speaking-realtor">Hindi</Link> and{" "}
      <Link to="/punjabi-speaking-realtor">Punjabi</Link>, and I've written a separate guide for{" "}
      <Link to="/south-asian-buyers">first-generation South Asian buyers</Link>.
    </p>

    <RelatedLinks
      links={[
        { to: "/hindi-speaking-realtor", label: "Hindi Speaking Realtor" },
        { to: "/punjabi-speaking-realtor", label: "Punjabi Speaking Realtor" },
        { to: "/surrey", label: "Surrey Presale Realtor" },
        { to: "/langley", label: "Langley Presale Realtor" },
        { to: "/abbotsford", label: "Abbotsford Presale Realtor" },
        { to: "/burnaby", label: "Burnaby Presale Realtor" },
        { to: "/south-asian-buyers", label: "South Asian Buyers — First-Generation Guide" },
        { to: "/contact", label: "Contact Uzair" },
      ]}
    />
  </FunnelPage>
);

export default UrduSpeakingRealtor;
