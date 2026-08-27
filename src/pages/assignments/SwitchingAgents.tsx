import { FunnelPage, RelatedLinks, DEFAULT_SOCIAL_IMAGE, type FunnelFAQ } from "@/components/FunnelPage";

const faqs: FunnelFAQ[] = [
  {
    question: "Can I use a different realtor than the one I bought my presale with?",
    answer:
      "Yes. Your Contract of Purchase and Sale is between you and the developer, not a brokerage. It does not lock you into one agent for a future assignment sale or for completion support. As long as no written listing agreement is currently in force, you are free to hire whoever you want.",
  },
  {
    question: "Do I owe my original agent a commission if I switch?",
    answer:
      "Usually no. The agent who represented you on the original purchase was typically paid by the developer at the time of that sale, and that transaction closed and was paid years ago. An assignment sale is a separate transaction with its own listing agreement and its own commission. The exception is an assignment listing agreement still in force: check its expiry date and any holdover clause, and ask the brokerage for a written release if you are unsure.",
  },
  {
    question: "My agent stopped replying. What do I actually do?",
    answer:
      "Put the request in writing and ask for either an update or a release from any listing agreement. Keep the paper trail. If no agreement is in force you do not need their permission at all. Then send me the file and I will pick it up from there.",
  },
  {
    question: "Is it too late to switch if my building is almost finished?",
    answer:
      "Later, not too late, but the clock matters. Once the developer issues a completion notice your window to assign narrows sharply and the conversation shifts to whether you can complete, extend, or need to sell quickly. If your completion date is inside six months, call this week rather than next month.",
  },
  {
    question: "What do you need from me to take over?",
    answer:
      "Four things: the original Contract of Purchase and Sale, the Disclosure Statement and any amendments, your deposit receipts, and any listing agreement currently in place. I read the assignment clause, confirm the developer's current consent and marketing position, price it against today's developer price list, and tell you honestly whether assigning is your best move. No charge for that review.",
  },
  {
    question: "Will the developer care that I changed agents?",
    answer:
      "No. Consent is about the incoming buyer and the developer's own conditions and fees. Changing representation does not affect a consent request that is already in motion.",
  },
];

const SwitchingAgents = () => (
  <FunnelPage
    path="/switching-presale-agents"
    title="Can I Switch Realtors on My Presale? | Uzair Muhammad"
    description="Bought a presale condo with another agent and want to switch? Yes, you can. What you owe your original agent, what to do if they have gone quiet, and how I take over a file mid-project across Vancouver, Burnaby, Coquitlam, Surrey and the Fraser Valley."
    h1="Bought Your Presale With Another Agent? You Can Still Switch."
    eyebrow="Switching Agents"
    breadcrumbName="Switching Presale Agents"
    image={DEFAULT_SOCIAL_IMAGE}
    intro="Yes, you can switch realtors on a presale. Your Contract of Purchase and Sale is between you and the developer. It does not tie you to the agent who wrote it. If you have no active written listing agreement in force right now, you are free to hire whoever you want to sell your assignment or guide you to completion."
    faqs={faqs}
  >
    <h2>Why this comes up so often</h2>
    <p>
      It is almost always the same story. The agent who sold you the presale two or three years ago has
      stopped replying. They have moved on to new launches, or they simply do not want the assignment
      listing. Assignments are slower, involve more paperwork, depend on the developer, and there is no
      guarantee of a sale. A lot of agents have quietly stopped taking them.
    </p>
    <p>
      I have not. Presale contracts are the only thing I do. I have helped 450+ families buy more than
      $200M in new homes over five years, with only 2 defaults.
    </p>

    <h2>What you actually owe your original agent</h2>
    <p>
      In most cases, nothing. Their commission on your original purchase was paid by the developer at the
      time of that sale. That transaction is closed. An assignment is a new transaction with its own
      agreement and its own commission. The one thing to check is whether you signed a listing agreement
      to sell the assignment that is still running. If you did, look at the expiry date and the holdover
      clause, and ask the brokerage for a written release. That is a normal request and most brokerages
      grant it without a fight.
    </p>

    <h2>The developer does not care which agent you use</h2>
    <p>
      Developers care about who the assignee is and whether their consent conditions and fees are met.
      Switching representation does not restart, delay or jeopardize a consent request. It does not
      affect your contract with them in any way.
    </p>

    <h2>How I take over a file mid-project</h2>
    <p>
      Send me the original Contract of Purchase and Sale, the Disclosure Statement with every amendment,
      your deposit receipts, and any listing agreement currently in place. I read the assignment clause,
      confirm what the developer will and will not allow right now, price the contract against today's
      developer price list, and tell you plainly whether assigning is your best move or whether you are
      better off completing. There is no charge for that review and no obligation after it.
    </p>

    <h2>A note on timing</h2>
    <p>
      The single thing that costs people money here is waiting. Every month closer to completion narrows
      the pool of buyers who can take on your contract and shortens the runway for developer consent. If
      you are unhappy with your current representation, the cheapest move is to deal with it now.
    </p>

    <RelatedLinks
      links={[
        { to: "/sell-my-presale-assignment", label: "Selling Your Presale Assignment" },
        { to: "/buying-a-presale-assignment", label: "Buying a Presale Assignment" },
        { to: "/how-i-help", label: "How I Help Presale Buyers" },
        { to: "/call", label: "Book a 15-Minute Call" },
      ]}
    />
  </FunnelPage>
);

export default SwitchingAgents;
