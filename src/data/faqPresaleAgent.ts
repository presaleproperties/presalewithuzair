/**
 * Content for /faq-presale-agent.
 *
 * Single source of truth: the React page, the crawler prerender in
 * functions/_middleware.ts and the FAQPage JSON-LD all read from here, so the
 * visible answer and the schema answer can never drift.
 *
 * `answer` is plain text with inline links written as [label](/path).
 * Schema uses the link labels only (tags stripped) — identical visible text.
 * The `cta` line is rendered after the answer and is NOT part of the schema.
 *
 * No file-level imports: this module is also pulled into the Cloudflare Pages
 * middleware bundle.
 */

export interface FaqItem {
  question: string;
  answer: string;
  cta: string;
}

export const FAQ_CTA_URL = "https://presalewithuzair.com/meetuzair/quick-call";

export const FAQ_PRESALE_AGENT_PATH = "/faq-presale-agent";

export const FAQ_PRESALE_AGENT_TITLE =
  "Do You Need a Realtor to Buy a Presale Condo? | Uzair Muhammad";

export const FAQ_PRESALE_AGENT_DESCRIPTION =
  "Free to you — the developer pays. 15 honest answers about hiring a presale agent: deposits, negotiation, appraisal risk, assignments, and when to walk away.";

export const FAQ_PRESALE_AGENT_H1 =
  "Do You Need a Realtor to Buy a Presale Condo?";

export const FAQ_PRESALE_AGENT_INTRO =
  "Most buyers visit the sales centre alone and sign with the person paid by the developer. Here's what that actually costs you, and what changes when someone works only for you.";

export const FAQ_PRESALE_AGENT: FaqItem[] = [
  {
    question: "Do I need a realtor to buy a presale condo?",
    answer:
      "No. Nothing stops you from walking into a sales centre and signing on your own. The real question is who reads the contract on your behalf. The person at the desk is hired by the developer to sell that building, and they are good at it. A buyer's agent opens the same disclosure statement with a different job: finding the parts that cost you money later. Deposit dates. Completion windows. Assignment restrictions. What the developer is allowed to change without asking you. In BC you get a 7-day rescission period after signing, and that window closes fast. If nobody is going through the documents with you inside it, you are relying on the seller's description of the deal. Representation on a presale does not add to your purchase price, which is the part most buyers get wrong. You can see how I work on my [services page](/services).",
    cta: "Want a second read before your rescission window closes? Book a 15-minute call.",
  },
  {
    question: "Do I have to pay the realtor, or does the developer pay?",
    answer:
      "The developer pays. On presale projects, the buyer's agent commission comes out of the developer's marketing and sales budget. It is not added to your purchase price, and it is not something you write a cheque for at completion. The price on the price sheet is the same whether you show up alone or with your own representation. That surprises people, because in most industries advice costs money. Here the developer has already budgeted for it, and if you arrive unrepresented that budget simply stays with the project. Two practical notes. First, ask what the arrangement is on your specific project before you register, because a small number of developments handle it differently. Second, register with your agent first — most projects require the agent to be disclosed on your first visit. Read more about how I represent buyers on my [about page](/about).",
    cta: "Not sure whether you registered correctly? Book a 15-minute call.",
  },
  {
    question: "What happens if I visit the sales centre without an agent?",
    answer:
      "You get sold to, and you usually lose the right to bring someone in later. Most projects treat the first registration as final. Once your name is in the developer's system as an unrepresented buyer, bringing your own agent afterwards is often refused, and the money the developer set aside for buyer representation stays with the developer. You paid the same price and received no advice. The second thing that happens is pace. Sales centres run on urgency: limited release, incentive ends Sunday, three left in that tier. That pressure is designed to shorten the time you spend thinking. If you have already visited alone, you are not stuck — you still have a rescission period, and you can still get the contract reviewed. Just do it quickly. If you are touring projects in [Surrey](/surrey) or [Langley](/langley), register with your agent before your first walkthrough.",
    cta: "Touring a sales centre this weekend? Book a 15-minute call first.",
  },
  {
    question: "How do I know the sales centre rep isn't working for the developer?",
    answer:
      "They are working for the developer. That is not a criticism, it is the job description. The sales team is hired by the development, paid by the development, and measured on how many units of that development they sell. They are not permitted to advise you that a competing project down the road is a better buy for your budget, because that is not who they represent. A licensed rep must disclose their relationship in writing, and you should ask for that disclosure in plain terms: who do you represent in this transaction? Listen to the answer. A good sales rep will tell you honestly, and many are genuinely helpful about the building itself. They simply cannot be objective about whether you should buy it. That comparison is the part you need somebody independent for.",
    cta: "Want an independent read on the project you're looking at? Book a 15-minute call.",
  },
  {
    question: "What questions should I ask a presale realtor before hiring them?",
    answer:
      "Ask about presale specifically, not general real estate. Start here. How many presale contracts have you personally written, and on which projects? Which developers have you worked with directly? Do you represent buyers only, or do you also take listing contracts from developers? Walk me through a deposit schedule you handled and what you flagged in it. What happens if I want out, and what have you seen go wrong at completion? Who do you bring in for legal, mortgage and tax questions? Will you tell me not to buy something? The answers should be concrete and full of project names, not adjectives. A resale-focused agent can be excellent at resale and still have never read a disclosure statement. Presale is a different document set with different risk. You are hiring for that specific experience. My background is on my [about page](/about).",
    cta: "Want to ask me these directly? Book a 15-minute call.",
  },
  {
    question: "How many presale contracts has this agent closed?",
    answer:
      "Ask the number, then verify it. Volume alone tells you very little, so follow up with three specifics: name the projects, name the developers, and tell me what happened at completion. Completion is where presale experience shows. Did their buyers close? Did any fail to complete, and why? Did anyone get caught short on financing or an appraisal? An agent who has been through multiple completion cycles will answer without hesitation because they lived through it. An agent who has written two contracts will speak in generalities. You can also cross-check: developers and sales teams know who actually brings buyers into their projects, so ask a sales rep who they see regularly. For my own record — I have helped 400+ clients buy presale, with only 2 defaults. Ask me about any of those projects by name.",
    cta: "Want to hear how those completions actually went? Book a 15-minute call.",
  },
  {
    question: "Can a presale agent negotiate a better price than the posted price?",
    answer:
      "Sometimes, and less often than buyers expect. Developers hold price closely because a discount on one unit affects the appraised value of every remaining unit and the project's financing. What moves more easily is everything around the price: parking, storage, upgrade credits, appliance packages, decorating allowances, deposit timing, and which units are released to you before general release. That is where a relationship with the sales team genuinely matters. Leverage also depends on the moment. A project in the last third of its sell-out behaves differently from a launch weekend. An agent who knows where a specific development sits in that cycle knows what is realistically available to ask for. Be careful with anyone who promises a discount up front — they do not control the price sheet. Ask instead what has actually been given on that project recently.",
    cta: "Want to know what's actually available on your project? Book a 15-minute call.",
  },
  {
    question: "What is negotiable in a presale contract?",
    answer:
      "More than price, and it varies by developer. Commonly discussed items include the deposit schedule and instalment dates, parking and storage allocation, colour scheme and finishing selections, upgrade or appliance credits, and unit selection within a release. Contract terms themselves are harder but not always fixed: assignment permission and the conditions attached to it, the outside completion date, and how change notices are handled are all worth asking about in writing. Understand that the developer's standard contract is written to protect the developer, and most clauses will not move. The value is in knowing which ones are worth pushing on and which are genuinely non-negotiable, so you spend your leverage where it counts. Anything you agree to verbally at the sales centre means nothing unless it is written into the contract or an addendum. Get it on paper before your rescission period ends.",
    cta: "Not sure what's negotiable on your project? Book a 15-minute call.",
  },
  {
    question: "What deposit structure is normal, and who holds the deposit?",
    answer:
      "Deposits on BC presales are commonly staged rather than paid all at once, often starting around 5%, with further instalments on a schedule set by your contract. Those later dates can be tied to the calendar, to construction milestones, or to both. That schedule is the single most important cash-flow document in your purchase, because missing an instalment is a default. Your deposit is generally required to be held in trust — typically by the developer's lawyer or brokerage — rather than spent freely, and the disclosure statement will state where. Read that section. Before you sign, map every instalment date against when your money actually becomes available, including funds coming from a sale, an RRSP withdrawal, or family. If the timeline is tight, that is the thing to solve now, not in eighteen months. Understand what happens if you cannot pay one.",
    cta: "Want a second read on a deposit schedule? Book a 15-minute call.",
  },
  {
    question: "What happens if the developer delays completion?",
    answer:
      "Your contract decides, not the marketing brochure. Presale contracts contain an estimated completion date and an outside date, and the developer is usually permitted to extend within defined limits, often with allowances for delays outside their control. Read the outside date first — it is the one that matters legally. If completion pushes past it, you may have rights, and those rights are contract-specific and worth a lawyer's opinion. Practically, delays cost money in ways buyers do not budget for: rate holds expire, mortgage pre-approvals lapse and must be redone at current qualifying rules, rent or interim housing runs longer, and your own sale timing can fall out of alignment. Plan for the outside date rather than the estimated one. Ask the developer for construction updates in writing and keep them. If your timeline is rigid, presale may be the wrong product for you.",
    cta: "Worried about your completion timing? Book a 15-minute call.",
  },
  {
    question: "What happens if the appraisal comes in low at completion?",
    answer:
      "You cover the difference in cash. Your lender funds a mortgage based on the appraised value at completion, not the price you agreed to years earlier. If the appraisal comes in below your contract price, the gap between the two is yours to fund on top of your down payment, and it is due at closing. There is no clause that erases it. What you can do is prepare before it happens. Talk to a mortgage broker early and again as completion approaches. Keep a cash buffer beyond your deposits. Know what your lender's policy is on presale appraisals and whether your approval survives a value shortfall. Watch resale prices in the same building and neighbourhood as completion nears, because that is what an appraiser looks at. If a gap appears, you want to find out months ahead, not two weeks before you need the funds.",
    cta: "Want to stress-test your completion numbers? Book a 15-minute call.",
  },
  {
    question: "Can I assign my presale contract later, and what are the fees?",
    answer:
      "Usually yes, subject to the developer's permission and their conditions. Assignment means selling your contract to another buyer before completion. Almost every BC presale contract addresses it, and the terms differ sharply between developers: some allow it freely after a certain construction stage, some require written consent, some restrict advertising, and some prohibit it until the building is nearly complete. Developers typically charge an assignment fee, and the amount is set out in the contract — read it before you sign rather than when you need to sell. There are also tax consequences. Assignments in BC are reportable, GST can apply to the profit portion, and the Canada Revenue Agency treats some assignment income as business income rather than a capital gain. Speak to an accountant early. Treat assignment as a possible exit, not a guaranteed one, and never as your primary plan.",
    cta: "Thinking about your exit before you sign? Book a 15-minute call.",
  },
  {
    question: "Is buying a presale still worth it in 2026, or should I buy resale?",
    answer:
      "It depends on your timeline, your risk tolerance and your financing — and each one suits a different buyer. Presale suits people who do not need a home immediately, who can handle a staged deposit schedule, who want a new building with 2-5-10 warranty coverage and no immediate maintenance, and who can absorb a delay or an appraisal gap at completion. Resale suits people who need to move now, who want a known price with a firm closing date, who can qualify for financing today, and who prefer a building with a visible maintenance and depreciation history. I am not going to tell you which way prices move, because nobody knows that. What I will do is run both options against your actual numbers. Compare specific buildings, not categories — start with the projects in [Surrey](/surrey) or [Coquitlam](/coquitlam) you are already considering.",
    cta: "Weighing presale against resale? Book a 15-minute call.",
  },
  {
    question: "How do I compare two presale projects side by side?",
    answer:
      "Put them on one page and compare the same fields, not the marketing. Price per square foot for a comparable layout. Usable floor area versus advertised area, including how much of it is balcony. Ceiling height. Parking and storage — included or extra. Strata fee estimate and what it covers. Deposit schedule and instalment dates. Estimated and outside completion dates. Developer track record on previous buildings. Location specifics: transit, schools, what is approved to be built next door. Then look at resale evidence nearby, because that is your future comparable and your future appraisal. Do this in writing. Two projects that feel similar in a sales centre often separate immediately once the deposit schedules and usable areas sit next to each other. City pages like [Abbotsford](/abbotsford) and [Burnaby](/burnaby) are a place to start building your shortlist.",
    cta: "Want me to build the comparison with you? Book a 15-minute call.",
  },
  {
    question: "What red flags should I watch for in a developer or a contract?",
    answer:
      "Start with the developer. No completed buildings you can walk through. Unwillingness to name previous projects. Warranty provider not clearly identified. Unresolved issues in past buildings that owners will tell you about if you ask. Then the contract. Very wide developer discretion to change layouts, finishes or square footage without your consent. An outside completion date far beyond the estimate. Assignment effectively prohibited. Deposit not clearly held in trust. Verbal promises from the sales centre that never appear in writing. And a process red flag: pressure to sign today, or discouragement from having your own representation or your own lawyer review the documents. A confident developer has no problem with either. If two or more of these show up together, slow down and use your 7-day rescission period. More buyer guides are on the [blog](/blog).",
    cta: "Seeing something that doesn't sit right? Book a 15-minute call.",
  },
];

/** Strip inline [label](/path) markup down to plain text (schema + word counts). */
export function faqPlainText(answer: string): string {
  return answer.replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1");
}

/** Split an answer into text/link segments for rendering. */
export function faqSegments(
  answer: string,
): Array<{ text: string; href?: string }> {
  const out: Array<{ text: string; href?: string }> = [];
  const re = /\[([^\]]+)\]\(([^)]+)\)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(answer))) {
    if (m.index > last) out.push({ text: answer.slice(last, m.index) });
    out.push({ text: m[1], href: m[2] });
    last = m.index + m[0].length;
  }
  if (last < answer.length) out.push({ text: answer.slice(last) });
  return out;
}
