import { Link } from "react-router-dom";
import { FunnelPage, RelatedLinks, DEFAULT_SOCIAL_IMAGE, type FunnelFAQ } from "@/components/FunnelPage";

const faqs: FunnelFAQ[] = [
  {
    question: "Does Uzair speak Hindi?",
    answer:
      "Yes. I work in Hindi every week — on the phone, at the presentation centre and at the kitchen table with parents who are funding the deposit. I also work in Punjabi, Urdu and English, so a family can switch languages mid-conversation and nothing gets lost.",
  },
  {
    question: "Do you help Hindi-speaking presale buyers across the Fraser Valley?",
    answer:
      "Yes. My core markets are Surrey, Langley, Abbotsford, Delta, Coquitlam, Burnaby, Maple Ridge and Chilliwack. Wherever the project is, the representation is the same: buyers only, contract reviewed inside the 7-day rescission window, and the explanation given in the language your family thinks in.",
  },
  {
    question: "Does working with you cost extra?",
    answer:
      "On most presale projects the developer pays the buyer-agent fee out of the project's own marketing budget, so it costs you nothing at the purchase price. Compensation arrangements do vary by transaction, and I confirm exactly how it works on your specific project in writing before you move forward.",
  },
];

const HindiSpeakingRealtor = () => (
  <FunnelPage
    path="/hindi-speaking-realtor"
    title="Hindi Speaking Presale Realtor | Surrey & Fraser Valley"
    description="Hindi-speaking presale realtor for Surrey, Langley, Abbotsford and the Fraser Valley. Buyer-side only. Contracts and deposits explained in Hindi."
    h1="Hindi-Speaking Presale Realtor in Surrey, Langley & Fraser Valley"
    eyebrow="Hindi Speaking Realtor"
    breadcrumbName="Hindi Speaking Realtor"
    intro="I'm Uzair Muhammad. I represent presale and new-construction buyers across Surrey, Langley, Abbotsford, Delta and the Fraser Valley — buyers only, never developers — and I do it in Hindi, Punjabi, Urdu and English so every person contributing to the purchase understands what the family is signing."
    faqs={faqs}
    image={DEFAULT_SOCIAL_IMAGE}
  >
    <p lang="hi" className="not-prose rounded-sm border-l-2 border-primary bg-card px-6 py-5 text-lg leading-loose text-foreground/85">
      नमस्ते, मैं उज़ैर मुहम्मद हूँ। मैं सरे, लैंगली और फ्रेज़र वैली में परिवारों को उनका पहला प्रीसेल घर खरीदने में मदद करता हूँ। डिपॉज़िट की तारीखें, कॉन्ट्रैक्ट की शर्तें और असली लागत मैं आपके माता-पिता को हिंदी में समझाता हूँ, ताकि साइन करने से पहले पूरे परिवार को सब कुछ साफ़ हो। मैं सिर्फ़ खरीदारों की तरफ़ से काम करता हूँ — डेवलपर की तरफ़ से कभी नहीं।
    </p>

    <h2>The contract is in English. The money conversation is in Hindi.</h2>
    <p>
      That gap is where most of the trouble starts. In a typical Fraser Valley presale purchase, the buyer is in their late twenties or thirties, comfortable in English, and reads the contract quickly at the presentation centre. The deposit, though, comes from parents — and the parents are the ones asking, in Hindi, what happens if the building is late, whether the money is safe, and what the family owes and when.
    </p>
    <p>
      Nobody at a sales centre is going to slow that conversation down. Their job is to sell the project in front of them. Mine is different: I sit with the whole family, in Hindi, and go line by line through the deposit schedule, the estimated completion date, the disclosure statement and what the contract actually binds you to. If the parents don't understand it, we're not signing it.
    </p>

    <h2>What I do for Hindi-speaking buyers</h2>
    <ul>
      <li>Explain the project, the developer's track record and the competing options — in Hindi, to everyone involved in the decision.</li>
      <li>Map every deposit date and dollar amount before you commit, so nobody is scrambling at the 30, 60 or 90-day milestone.</li>
      <li>Read the disclosure statement and purchase agreement inside BC's seven-day rescission window, while walking away is still free.</li>
      <li>Work through the real cost: GST and the New Housing Rebate, property transfer tax and the newly-built home exemption, closing costs, and the mortgage you'll need to qualify for at completion — not today.</li>
      <li>Pressure-test the floor plan: usable space, storage, orientation, and whether the layout will still appeal to the next buyer.</li>
      <li>Flag the questions that belong with your lawyer, accountant or mortgage broker, and make sure you ask them in time.</li>
      <li>Stay on the file after signing — deposit milestones, construction updates, financing preparation, deficiency walkthrough and possession.</li>
    </ul>

    <h2>Why buyer-side only matters more here</h2>
    <p>
      A first-generation buying family is often working from advice that circulates within the community: a cousin who bought in 2021, a family friend who says presale always goes up, a sales rep who was warm and spoke a familiar language. Warmth is not representation. The person at the presentation centre is paid by the developer and is contractually working for the developer, whatever language they greet you in.
    </p>
    <p>
      I have never represented a developer, and I don't intend to. I was born in Pakistan, raised in Surrey, and spent 10 years at the City of Surrey in planning and bylaws before real estate — which is why I look at what's approved around a site, what's coming next and how a neighbourhood will function years from now, rather than at the rendering on the wall. I've helped more than 450 families buy new homes, and I've told plenty of them to wait.
    </p>

    <h2>Talk to me before registering at a sales centre.</h2>
    <p>
      Representation rules vary by project. Once you register directly with a development, their sales rep may be credited as your representative, and untangling that afterwards is harder than a five-minute call today. If you've already registered, tell me — I'll explain what options may still be open to you.
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
      I also work with families in <Link to="/punjabi-speaking-realtor">Punjabi</Link> and{" "}
      <Link to="/urdu-speaking-realtor">Urdu</Link>, and many of my clients are{" "}
      <Link to="/south-asian-buyers">first-generation South Asian buyers</Link> doing this for the first time in Canada.
    </p>

    <RelatedLinks
      links={[
        { to: "/punjabi-speaking-realtor", label: "Punjabi Speaking Realtor" },
        { to: "/urdu-speaking-realtor", label: "Urdu Speaking Realtor" },
        { to: "/surrey", label: "Surrey Presale Realtor" },
        { to: "/langley", label: "Langley Presale Realtor" },
        { to: "/abbotsford", label: "Abbotsford Presale Realtor" },
        { to: "/coquitlam", label: "Coquitlam Presale Realtor" },
        { to: "/south-asian-buyers", label: "South Asian Buyers — First-Generation Guide" },
        { to: "/contact", label: "Contact Uzair" },
      ]}
    />
  </FunnelPage>
);

export default HindiSpeakingRealtor;
