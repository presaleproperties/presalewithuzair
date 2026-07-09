/**
 * Cloudflare Pages Function — per-page META + readable BODY for crawlers.
 *
 * Client-rendered SPA: non-JS crawlers (Googlebot, GPTBot, ClaudeBot,
 * PerplexityBot, Google-Extended, WhatsApp, Facebook, LinkedIn, etc.) only ever
 * received the static index.html — an empty <div id="root"> with no H1, body,
 * article text, or client-rendered JSON-LD. This middleware, for CRAWLER UAs only,
 * rewrites <title>/meta/OG/Twitter + canonical + robots to match the URL AND injects
 * a real readable body into #root (static pages, city pages, blog posts, and
 * individual /projects/:slug project pages pulled live from Supabase).
 *
 * SAFETY: humans/assets/non-GET early-return next(); all bot logic is wrapped in
 * try/catch that falls back to the unmodified response. Cannot break the site.
 */

const SITE = "https://presalewithuzair.com";
const DEFAULT_IMAGE =
  "https://storage.googleapis.com/gpt-engineer-file-uploads/5CBz3t8hJXQlE60NLFmYURMrWQu2/social-images/social-1775073854345-Screenshot_2026-03-03_at_2.54.42_PM.webp";
const SUPABASE_URL = "https://ubbogklasownognviobh.supabase.co";

const BOT_RE =
  /(googlebot|google-inspectiontool|bingbot|yandex|duckduckbot|baiduspider|facebookexternalhit|facebot|twitterbot|linkedinbot|whatsapp|slackbot|discordbot|telegrambot|pinterest|applebot|redditbot|embedly|iframely|quora link preview|skypeuripreview|vkshare|w3c_validator|gptbot|oai-searchbot|chatgpt-user|claudebot|claude-web|anthropic-ai|perplexitybot|perplexity-user|google-extended|bytespider|amazonbot|cohere-ai|ccbot|meta-externalagent|gemini|googleother)/i;

const ASSET_RE =
  /\.(js|mjs|css|png|jpe?g|gif|svg|ico|webp|avif|woff2?|ttf|eot|map|mp4|webm|mp3|pdf|json|xml|txt|zip|wasm|csv)$/i;

interface Meta {
  title: string;
  description: string;
  image: string;
}

const SUFFIX = " | Uzair Muhammad";

const ABOUT_BLOCK = `
  <section>
    <h2>About Uzair Muhammad — Buyer-Only Presale Specialist</h2>
    <p>Uzair Muhammad is a buyer-only presale and new-construction specialist serving Surrey, Langley, Abbotsford, Coquitlam, Delta, Burnaby South, Chilliwack and Maple Ridge in British Columbia's Fraser Valley. He has helped 450+ buyers and investors purchase more than $200M in new-construction condos and townhomes, and he never represents developers — only buyers. A former City of Surrey planning and bylaws professional and founder of the Vancouver Presale Expo, Uzair reviews every developer contract line by line to protect your deposit. He works in English, Punjabi, Hindi and Urdu.</p>
    <p>Learn more: <a href="${SITE}/about">About Uzair</a> &middot; <a href="${SITE}/services">Buyer-only services</a> &middot; <a href="${SITE}/blog">Presale guides</a> &middot; <a href="${SITE}/contact">Book a free strategy call</a>.</p>
  </section>
  <nav aria-label="Fraser Valley presale markets">
    <a href="${SITE}/surrey">Surrey presale condos</a> &middot;
    <a href="${SITE}/langley">Langley presale townhomes</a> &middot;
    <a href="${SITE}/abbotsford">Abbotsford presale condos</a> &middot;
    <a href="${SITE}/coquitlam">Coquitlam presale condos</a> &middot;
    <a href="${SITE}/burnaby">Burnaby presale condos</a> &middot;
    <a href="${SITE}/delta">Delta presale homes</a> &middot;
    <a href="${SITE}/chilliwack">Chilliwack presales</a> &middot;
    <a href="${SITE}/maple-ridge">Maple Ridge presales</a>
  </nav>`;

const STATIC_META: Record<string, Meta> = {
  "/": { title: "Uzair Muhammad | Fraser Valley's Leading Presale Expert", description: "Buyer-only presale & new-construction specialist. 450+ units sold, $200M+ in sales. VIP early access for first-time buyers & investors in Surrey, Langley, Abbotsford & the Fraser Valley.", image: DEFAULT_IMAGE },
  "/about": { title: "About Uzair Muhammad — Vancouver Presale Buyer's Agent", description: "Former City of Surrey planning & bylaws professional turned buyer-only presale specialist. 450+ units sold for first-time buyers and investors across Metro Vancouver & the Fraser Valley.", image: DEFAULT_IMAGE },
  "/services": { title: "Buyer-Only Presale Services" + SUFFIX, description: "VIP developer access, contract review, and no developer bias. How Uzair Muhammad protects first-time buyers and investors buying presale & new-construction homes in BC.", image: DEFAULT_IMAGE },
  "/contact": { title: "Contact Uzair Muhammad — Free Presale Strategy Call", description: "Book a free, no-pressure presale strategy call with Uzair Muhammad. Buyer-only advice for first-time buyers and investors. English, Punjabi, Hindi & Urdu.", image: DEFAULT_IMAGE },
  "/call": { title: "Book a Free Presale Strategy Call" + SUFFIX, description: "Schedule a free 15-minute presale strategy call with Uzair Muhammad — buyer-only guidance for first-time buyers and investors in the Fraser Valley.", image: DEFAULT_IMAGE },
  "/agents": { title: "The Team Behind Presale With Uzair", description: "Meet the buyer-only presale team led by Uzair Muhammad — helping first-time buyers and investors secure new construction across Metro Vancouver & the Fraser Valley.", image: DEFAULT_IMAGE },
  "/presale-guide": { title: "Free Presale Buyer's Guide — 7 Costly Mistakes" + SUFFIX, description: "Download Uzair Muhammad's free presale guide: spot contract traps, hidden closing costs, and developer red flags before you sign your deposit.", image: DEFAULT_IMAGE },
  "/blog": { title: "Presale Buying Guides & BC Market Insights" + SUFFIX, description: "Expert presale and new-construction guides for BC buyers and investors — deposits, GST, assignments, neighbourhoods, and market timing from Uzair Muhammad.", image: DEFAULT_IMAGE },
};

const STATIC_BODY: Record<string, string> = {
  "/": `<h1>Uzair Muhammad — Fraser Valley's Leading Presale &amp; New-Construction Expert</h1><p>Looking to buy a presale condo, townhome, or new-construction home in the Fraser Valley? Uzair Muhammad is a buyer-only presale specialist who represents buyers — never developers — across Surrey, Langley, Abbotsford, Coquitlam, Delta, Burnaby South, Chilliwack and Maple Ridge.</p><h2>Why buy new construction with Uzair</h2><ul><li>VIP early access to new projects before the general public, with developer incentives.</li><li>Line-by-line contract review to protect your deposit and your rights.</li><li>No developer bias — buyer-only representation, at no cost to you.</li><li>Strategy for both first-time buyers and investors, including assignments and taxes.</li></ul>`,
  "/about": `<h1>About Uzair Muhammad</h1><p>Uzair Muhammad spent a decade with the City of Surrey in planning and bylaws before becoming a buyer-only presale and new-construction specialist. He is the founder of the Vancouver Presale Expo and has helped 450+ buyers and investors purchase over $200M in new homes across Metro Vancouver and the Fraser Valley.</p>`,
  "/services": `<h1>Buyer-Only Presale &amp; New-Construction Services</h1><p>Uzair represents buyers only. Services include VIP early access to new-construction projects, line-by-line contract and disclosure-statement review, deposit-structure and assignment guidance, and independent advice for first-time buyers and investors — with no developer bias.</p>`,
  "/contact": `<h1>Contact Uzair Muhammad</h1><p>Book a free, no-pressure presale strategy call. Buyer-only advice for first-time buyers and investors buying new construction in the Fraser Valley, in English, Punjabi, Hindi and Urdu. <a href="${SITE}/call">Book a call</a>.</p>`,
  "/call": `<h1>Book a Free Presale Strategy Call</h1><p>Schedule a free 15-minute presale strategy call with Uzair Muhammad — buyer-only guidance for first-time buyers and investors across the Fraser Valley.</p>`,
  "/agents": `<h1>The Team Behind Presale With Uzair</h1><p>A buyer-only presale team led by Uzair Muhammad, helping first-time buyers and investors secure new construction across Metro Vancouver and the Fraser Valley.</p>`,
  "/presale-guide": `<h1>Free Presale Buyer's Guide — 7 Costly Mistakes to Avoid</h1><p>Download Uzair Muhammad's free presale buyer's guide and learn how to spot contract traps, hidden closing costs, GST surprises, and developer red flags before you sign your deposit.</p>`,
  "/blog": `<h1>Presale Buying Guides &amp; BC Market Insights</h1><p>Expert, buyer-first guides on presale and new construction in British Columbia — deposits, GST and rebates, assignment sales, the BC flipping tax, neighbourhood breakdowns, developer risk, and market timing.</p>`,
};

const CITY_META: Record<string, Meta> = {
  "/surrey": { title: "Surrey Presale Condos & New Construction" + SUFFIX, description: "Your buyer-only Surrey presale expert. VIP access to new condos & townhomes for first-time buyers and investors — floor plans, pricing, and honest advice. 450+ units sold.", image: DEFAULT_IMAGE },
  "/langley": { title: "Langley Presale Condos & Townhomes" + SUFFIX, description: "Buyer-only Langley presale specialist. VIP access to Willoughby & Yorkson new construction for first-time buyers and investors ahead of the SkyTrain extension.", image: DEFAULT_IMAGE },
  "/abbotsford": { title: "Abbotsford Presale Condos — New Construction" + SUFFIX, description: "The Fraser Valley's most affordable presale market. Buyer-only access to Abbotsford new condos for first-time buyers and investors, from the high $200s.", image: DEFAULT_IMAGE },
  "/chilliwack": { title: "Chilliwack Presale Condos & New Homes" + SUFFIX, description: "Buyer-only Chilliwack presale guidance — the most space for your money in the Fraser Valley. New construction for first-time buyers and investors.", image: DEFAULT_IMAGE },
  "/maple-ridge": { title: "Maple Ridge Presale Condos & Townhomes" + SUFFIX, description: "Buyer-only Maple Ridge presale expert. Commuter-friendly new construction for first-time families and investors, with WCE rail access.", image: DEFAULT_IMAGE },
  "/coquitlam": { title: "Coquitlam Presale Condos & Townhomes" + SUFFIX, description: "Buyer-only Coquitlam presale expert. VIP access to Coquitlam Centre, Burquitlam and Burke Mountain new construction — Evergreen Line growth, honest advice, 450+ units sold.", image: DEFAULT_IMAGE },
  "/delta": { title: "Delta Presale Condos & New Homes" + SUFFIX, description: "Buyer-only Delta presale specialist. New condos and townhomes in North Delta and Ladner — strong value next to Surrey and Richmond, with buyer-first representation.", image: DEFAULT_IMAGE },
  "/burnaby": { title: "Burnaby Presale Condos & New Construction" + SUFFIX, description: "Buyer-only Burnaby presale expert. VIP access to Metrotown, Brentwood and Lougheed highrise new construction — SkyTrain-connected, strong rental demand, no developer bias.", image: DEFAULT_IMAGE },
};

interface CityContent { name: string; intro: string; why: string; faqs: { q: string; a: string }[]; }

const CITY_CONTENT: Record<string, CityContent> = {
  "/surrey": { name: "Surrey", intro: "Surrey is the fastest-growing city in BC and its presale market moves fast. Whether you're looking in Surrey City Centre, Fleetwood, Clayton, or South Surrey, Uzair Muhammad gives you buyer-only VIP access to new presale condos and townhomes — with early pricing and full contract protection.", why: "With the Surrey–Langley SkyTrain extension and major infrastructure investment, Surrey offers some of the strongest appreciation potential in the Fraser Valley. Not every project is a good deal — Uzair analyzes the developer's track record, the deposit structure, and the assignment clauses so your investment is protected.", faqs: [ { q: "Who is the best presale realtor in Surrey?", a: "Uzair Muhammad is a buyer-only presale specialist who has sold 450+ new-construction units and represents buyers only — never developers — across Surrey and the Fraser Valley." }, { q: "How much do presale condos cost in Surrey?", a: "Surrey presale condos generally start in the high $400s, with pricing driven by location and completion timing. Uzair provides current floor plans and pricing on request." }, { q: "Do I pay to use a buyer's agent for a Surrey presale?", a: "No. The developer pays the buyer-agent commission, so buyer-only representation and contract review from Uzair costs you nothing while protecting your deposit." } ] },
  "/langley": { name: "Langley", intro: "Langley is the top destination for Fraser Valley families and investors looking for space and growth. Uzair Muhammad gives you buyer-only VIP access to the most sought-after new-construction townhomes and condos in Willoughby, Latimer Heights, and Central Langley.", why: "Langley pairs family-friendly communities with rapid transit development. As Willoughby and the SkyTrain corridor build out, getting in early matters. Uzair helps you cut through the hype, negotiate the best terms, and secure a home that fits your financial goals.", faqs: [ { q: "Who is the best presale agent in Langley?", a: "Uzair Muhammad is a buyer-only Langley presale specialist with deep knowledge of Willoughby, Latimer Heights, and Yorkson, and 450+ new-construction units sold." }, { q: "Is Langley good for presale townhomes?", a: "Yes — Langley is townhome country, with strong family demand and appreciation along the coming SkyTrain corridor. Uzair knows every active project and developer." } ] },
  "/abbotsford": { name: "Abbotsford", intro: "Abbotsford is the Fraser Valley's best-value new-construction market. From the University District to Historic Downtown, Uzair Muhammad gives first-time buyers and investors buyer-only early access to pricing, floor plans, and incentives.", why: "With lower entry prices than Surrey and Langley, Abbotsford offers strong value for first-time buyers and cash-flow investors. Uzair vets every Abbotsford developer and reads every contract line by line so you can invest with confidence.", faqs: [ { q: "Who is the best presale realtor in Abbotsford?", a: "Uzair Muhammad is a buyer-only presale specialist covering Abbotsford and the wider Fraser Valley, representing buyers only with 450+ units sold." }, { q: "How much are presale condos in Abbotsford?", a: "Abbotsford is the most affordable Fraser Valley presale market, with condos often starting in the high $200s to low $300s — the best entry point in the region." } ] },
  "/chilliwack": { name: "Chilliwack", intro: "Chilliwack offers some of the best price-per-square-foot value in BC. Uzair Muhammad helps first-time buyers and investors navigate the Chilliwack presale market with buyer-only guidance and access to quality new-construction projects.", why: "Chilliwack is the most affordable new-construction entry point in the Fraser Valley. As infrastructure and population grow, early buyers benefit most — and Uzair makes sure you're buying quality, not just a low price.", faqs: [ { q: "Who is the best presale agent in Chilliwack?", a: "Uzair Muhammad provides buyer-only presale representation in Chilliwack and across the Fraser Valley, with 450+ new-construction units sold." } ] },
  "/maple-ridge": { name: "Maple Ridge", intro: "Maple Ridge combines mountain lifestyle with urban convenience and West Coast Express rail access. Uzair Muhammad gives buyers VIP access to the best new condo and townhome developments in the area.", why: "Growing demand, limited supply, and improving infrastructure make Maple Ridge a strong long-term play for presale buyers. Uzair provides buyer-only advice, contract review, and deposit protection.", faqs: [ { q: "Who is the best presale realtor in Maple Ridge?", a: "Uzair Muhammad is a buyer-only presale specialist serving Maple Ridge and the Fraser Valley, with 450+ new-construction units sold." } ] },
  "/coquitlam": { name: "Coquitlam", intro: "Coquitlam has some of Metro Vancouver's deepest presale supply — but pricing, timing and developer quality vary widely between towers. Uzair Muhammad compares active Coquitlam projects against resale comps and disclosure documents so you buy the right unit, not just an available one.", why: "Between the Evergreen Line, SFU proximity, and continued Burke Mountain density, Coquitlam has some of the strongest fundamentals in Metro Vancouver. Coquitlam Centre, Burquitlam and Burke Mountain each price and rent very differently — Uzair models each on your behalf, buyer-only.", faqs: [ { q: "Who is the best presale realtor in Coquitlam?", a: "Uzair Muhammad is a buyer-only presale specialist with 450+ new-construction units sold across Coquitlam, Burquitlam, Burke Mountain and the wider region — representing buyers only, never developers." }, { q: "How do I buy a presale condo in Coquitlam?", a: "Register VIP through a buyer's agent, review the disclosure statement and deposit ladder before signing, and use the 7-day rescission window. Uzair handles this end to end at no cost to you, since the developer pays the buyer-agent commission." }, { q: "Is Burke Mountain a good presale investment?", a: "Burke Mountain has strong family demand and steady densification, but projects vary — Uzair ranks active developments on price, developer track record and completion timing." } ] },
  "/delta": { name: "Delta", intro: "North Delta and Ladner are quietly adding new condos and townhomes with strong value versus neighbouring Surrey and Richmond. Uzair Muhammad gives buyer-only access to Delta presales, with honest guidance on which projects are worth it.", why: "Delta offers relative affordability, established family neighbourhoods, and easy access to Surrey, Richmond and the highway network. Uzair reviews every contract and deposit structure so first-time buyers and investors are protected.", faqs: [ { q: "Who is the best presale realtor in Delta?", a: "Uzair Muhammad is a buyer-only presale specialist serving North Delta, Ladner and the Fraser Valley, with 450+ new-construction units sold." }, { q: "Are there presale condos in Delta?", a: "Yes — North Delta and Ladner have a growing pipeline of new condos and townhomes. Uzair gives buyers VIP access and independent, developer-free advice." } ] },
  "/burnaby": { name: "Burnaby", intro: "Burnaby's Metrotown, Brentwood and Lougheed town centres are among Metro Vancouver's most active highrise presale markets. Uzair Muhammad represents buyers only — helping you compare towers, developers and deposit structures before you sign.", why: "Burnaby offers SkyTrain-connected urban living with strong rental demand and long-term appreciation, but highrise presales carry real differences in developer quality and assignment terms. Uzair vets each project so your deposit and your investment are protected.", faqs: [ { q: "Who is the best presale realtor in Burnaby?", a: "Uzair Muhammad is a buyer-only presale specialist covering Metrotown, Brentwood, Lougheed and the wider region, with 450+ new-construction units sold — buyers only, no developer bias." }, { q: "How much are presale condos in Burnaby?", a: "Burnaby highrise presale condos are among Metro Vancouver's pricier submarkets given SkyTrain access and amenities; Uzair provides current floor plans and pricing per project on request." } ] },
};

function humanizeSlug(slug: string): string {
  const s = slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()).trim();
  return s.length > 65 ? s.slice(0, 62) + "..." : s;
}

function cap(s: string): string { return s ? s.charAt(0).toUpperCase() + s.slice(1) : s; }

function esc(s: string): string {
  return String(s || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function jsonLd(obj: unknown): string {
  return `<script type="application/ld+json">${JSON.stringify(obj).replace(/<\//g, "<\\/")}</script>`;
}

function breadcrumb(name: string, path: string): unknown {
  return { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [ { "@type": "ListItem", position: 1, name: "Home", item: SITE + "/" }, { "@type": "ListItem", position: 2, name, item: SITE + path } ] };
}

function faqPage(faqs: { q: string; a: string }[]): unknown {
  return { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) };
}

function cityBody(path: string): string {
  const c = CITY_CONTENT[path];
  if (!c) return "";
  const faqHtml = c.faqs.map((f) => `<div><h3>${esc(f.q)}</h3><p>${esc(f.a)}</p></div>`).join("");
  return (
    `<h1>${esc(c.name)} Presale Condos &amp; New Construction — Buyer-Only Expert Uzair Muhammad</h1>` +
    `<p>${esc(c.intro)}</p>` +
    `<h2>Why buy a presale in ${esc(c.name)}?</h2><p>${esc(c.why)}</p>` +
    `<h2>${esc(c.name)} presale FAQ</h2>${faqHtml}` +
    ABOUT_BLOCK +
    jsonLd(breadcrumb(c.name + " Presales", path)) +
    jsonLd(faqPage(c.faqs))
  );
}

// ---- Funnel pages (SEO/AEO track) ----------------------------------------

interface FunnelPage {
  title: string;
  description: string;
  h1: string;
  intro: string;
  sections: { h: string; p: string }[];
  faqs: { q: string; a: string }[];
  breadcrumbName: string;
  related: { href: string; label: string }[];
}

const TRACK_RECORD_LINE =
  "450+ Units Sold · $200M+ in Sales Volume · 5 Years in the Presale Market · 4.9\u2605 from 36 Google reviews · Buyer-only representation.";

const FUNNEL: Record<string, FunnelPage> = {
  "/new-to-presale-start-here": {
    title: "New to Presale? Start Here — Uzair's Plain-English Guide",
    description: "New to presale condos in BC? I'm Uzair — buyer-only presale specialist. Learn what a presale is, how it differs from resale, and whether it's right for your first home.",
    h1: "New to Presale? Start Here — Uzair's Plain-English Guide",
    breadcrumbName: "New to Presale — Start Here",
    intro: "I'm Uzair Muhammad, a buyer-only presale specialist in the Fraser Valley. If you've never bought a presale condo before, this page is your plain-English starting point — what a presale actually is, how it differs from resale, whether it makes sense for your first home, and how I help buyers avoid the traps developers won't warn you about.",
    sections: [
      { h: "What is a presale condo, really?", p: "A presale is a new home you buy from the developer before it's built. You sign a contract, pay staged deposits, and take keys when the building completes — often 12 to 36 months later. In BC the developer must give you a Disclosure Statement and a 7-day rescission window." },
      { h: "Presale vs resale — which is right for you?", p: "Resale already exists — tour it, finance it, move in. Presale is bought on paper — better pricing potential, no bidding war, new-home warranty, but you carry construction and market risk between contract and completion." },
      { h: "Is presale right for a first home?", p: "Sometimes yes — you lock in today's price with time to save and get a brand-new home with builder warranty. Sometimes no — if you need to move in six months, or your income won't support the mortgage at completion, resale is safer." },
      { h: "How I help — buyer-only, no cost to you", p: "I represent buyers only. My commission is paid by the developer out of the price you'd pay anyway. Going direct to the sales centre doesn't save you money — it removes your representation from the deal." },
    ],
    faqs: [
      { q: "What is a presale condo in BC?", a: "A presale (pre-construction) condo is a new home you buy directly from the developer before it's built — often 12 to 36 months before completion. Staged deposits, close at completion. Protected in BC by a Disclosure Statement and a 7-day rescission window." },
      { q: "Is buying presale a good idea for a first-time buyer?", a: "It can be — you lock in today's price and control a new home with a smaller upfront deposit. It's only smart if the project, contract and location pencil out. I only recommend presales that make sense for a first-time buyer's timeline." },
      { q: "What's the difference between presale and resale?", a: "Resale is built — tour, finance, move in weeks. Presale is on paper — deposits now, keys later, warranty, GST applies. Presale can mean better pricing and no bidding war but carries construction and market risk." },
      { q: "How much money do I actually need to start?", a: "Most Fraser Valley developers ask 15–20% staged over 12–24 months; softer windows allow 10% ladders. On a $600,000 home that's often $30,000–$60,000 at signing." },
      { q: "How do I actually get started with you?", a: "Book a free 15-minute strategy call. I'll ask your budget and timeline, then either shortlist presales or tell you honestly if presale isn't right for you now. Buyer-only, no cost, no pressure." },
    ],
    related: [
      { href: "/buy-presale-fraser-valley", label: "How to Buy a Presale in the Fraser Valley" },
      { href: "/presale-mistakes-fraser-valley", label: "Presale Mistakes I See Fraser Valley Buyers Make" },
      { href: "/buyer-representation-presale-fraser-valley", label: "Do You Need Your Own Realtor for a Presale?" },
    ],
  },
  "/buy-presale-fraser-valley": {
    title: "How to Buy a Presale in the Fraser Valley (With Uzair)",
    description: "I'm Uzair — buyer-only presale specialist. Step-by-step guide to buying a presale condo in Surrey, Langley, Abbotsford and the Fraser Valley: deposits, rescission, GST and timing.",
    h1: "How to Buy a Presale in the Fraser Valley (With Uzair)",
    breadcrumbName: "How to Buy a Presale in the Fraser Valley",
    intro: "I'm Uzair Muhammad, buyer-only presale specialist for the Fraser Valley. Buying a presale isn't like buying resale — the deposit ladder, rescission window, GST rules and disclosure statement all move on the developer's schedule. Here's the step-by-step I run with every buyer, and exactly when in the process you should call me — before you set foot in a presentation centre.",
    sections: [
      { h: "My step-by-step", p: "Step 1: talk before you register. Step 2: I shortlist 2–3 projects fitting your budget and timeline. Step 3: VIP allocation before public launch. Step 4: 7-day rescission — contract review, disclosure statement, financing. Step 5: staged deposits and completion." },
      { h: "Deposits", p: "Fraser Valley developers typically ask 15–20% staged over 12–24 months. Often 5% at signing, another 5% within 30–90 days, balance at milestones. I flag every deposit date in writing." },
      { h: "The 7-day rescission window", p: "BC law gives you seven days to walk away with no penalty. That window is when your realtor and lawyer review the contract, disclosure statement and deposit protection. Skip it at your own risk." },
      { h: "GST and the New Housing Rebate", p: "5% GST applies to new construction. Principal residences under the price cap may qualify for the partial GST New Housing Rebate. I walk you through the calculation before you commit." },
      { h: "When to call me — before the sales centre", p: "Once you register with a developer their sales rep is credited as your representative. Call me first — even a five-minute call protects your right to independent buyer-only representation." },
    ],
    faqs: [
      { q: "What are the actual steps to buy a Fraser Valley presale?", a: "Register early with me for VIP access, shortlist 2–3 projects, secure your unit at the private VIP event before public launch, then use the 7-day rescission window for contract review, disclosure review and financing pre-qualification." },
      { q: "When should I actually call you?", a: "Before you talk to any presentation centre. Once you register with a developer, their sales rep is credited as your representative and I can't step in without a fight." },
      { q: "How do deposits work on a Fraser Valley presale?", a: "Most developers ask 15–20% staged over 12–24 months. Softer windows allow 10% ladders. Typically 5% at signing, 5% at 30–90 days, balance at pre-set milestones." },
      { q: "What is the 7-day rescission window?", a: "BC law gives you seven days after signing to walk away with no penalty. Use it — that's when I review the disclosure statement, run financing and pressure-test the contract." },
      { q: "Do I have to pay GST on a presale?", a: "Yes — new construction is subject to 5% GST. A partial GST New Housing Rebate is available for principal residences under the price cap." },
    ],
    related: [
      { href: "/presale-mistakes-fraser-valley", label: "Presale Mistakes I See Fraser Valley Buyers Make" },
      { href: "/buyer-representation-presale-fraser-valley", label: "Do You Need Your Own Realtor for a Presale?" },
      { href: "/new-to-presale-start-here", label: "New to Presale? Start Here" },
    ],
  },
  "/presale-mistakes-fraser-valley": {
    title: "Presale Mistakes I See Fraser Valley Buyers Make",
    description: "I'm Uzair — buyer-only presale specialist. The Fraser Valley presale mistakes I see most: registering with developers first, skipping disclosure, bad floor plans, no exit plan.",
    h1: "Presale Mistakes I See Fraser Valley Buyers Make",
    breadcrumbName: "Presale Mistakes Fraser Valley",
    intro: "I'm Uzair Muhammad, and I've helped 450+ buyers close on presales in the Fraser Valley. The same mistakes come up over and over — and they cost real money. Here they are: registering with the developer first, trusting the sales-centre rep, skipping the disclosure statement, ignoring assignment/rescission, choosing bad floor plans, mismanaging GST and deposit timing, and buying without an exit plan.",
    sections: [
      { h: "Mistake 1 — Registering with the developer first", p: "The single most expensive presale mistake. The moment you register, their in-house rep is credited as your representative. You just gave away independent representation for free." },
      { h: "Mistake 2 — Trusting the sales-centre rep", p: "Licensed, professional, pleasant — and paid by the developer. Their job is to sell what the developer needs, not tell you a competing project is better priced." },
      { h: "Mistake 3 — Skipping the disclosure statement", p: "The Disclosure Statement is where the ugly clauses live: assignment fees (1–3%), lifting restrictions, deposit protection, right to change plans. Skipping it in the 7-day window is how buyers get blindsided." },
      { h: "Mistake 4 — Ignoring assignment and rescission clauses", p: "Assignment is your exit strategy. Some contracts allow it at 50% deposit paid, some ban it, some charge 3%. Know your assignment rights before you sign." },
      { h: "Mistake 5 — Bad floor plans", p: "Wasted square footage, awkward bedrooms, no storage. Same $/sqft, worse resale. I compare every shortlisted plan against resale comps." },
      { h: "Mistake 6 — GST and deposit-timing surprises", p: "GST 5% at completion, rebate capped. Deposits are staged with hard dates. Not mapping cash-flow = scramble at closing." },
      { h: "Mistake 7 — No exit plan", p: "Assignment, hold-and-rent, or move-in-and-sell resale. If you don't know which applies before signing, you're guessing with $600,000." },
    ],
    faqs: [
      { q: "What's the #1 presale mistake you see in the Fraser Valley?", a: "Registering with the developer's sales centre before hiring your own realtor. The moment you register, that sales rep is credited as your representative — and they work for the developer, not you." },
      { q: "Isn't the sales-centre rep just there to help me?", a: "They're licensed but loyal to the developer. Their job is to sell what the developer needs — not tell you the floor plan is inefficient or a better project launches next month." },
      { q: "Why does the disclosure statement matter so much?", a: "It reveals deposit protection, assignment fees, occupancy dates, and material change rights. Skipping it is how buyers get surprised by 2–3% assignment fees or blocked from selling." },
      { q: "What's the deal with GST and deposit timing?", a: "GST (5%) is charged at completion. Deposits are staged. Buyers who don't map deposit dates and GST cash-flow end up short at closing." },
      { q: "How do I know if a floor plan is actually bad?", a: "Long entry hallways, bedrooms opening to living rooms, unusable bump-outs. Same $/sqft, worse resale. I compare every shortlisted plan against resale comps." },
    ],
    related: [
      { href: "/buyer-representation-presale-fraser-valley", label: "Do You Need Your Own Realtor for a Presale?" },
      { href: "/best-presale-realtor-fraser-valley", label: "Best Presale Realtor in the Fraser Valley" },
      { href: "/buy-presale-fraser-valley", label: "How to Buy a Presale in the Fraser Valley" },
    ],
  },
  "/fraser-valley-presale-investment-advice": {
    title: "Fraser Valley Presale Investment Advice (2026)",
    description: "I'm Uzair — buyer-only presale specialist. Honest Fraser Valley presale investment advice: which cities, rental demand, assignment strategy, and when NOT to buy. No hype.",
    h1: "Fraser Valley Presale Investment Advice",
    breadcrumbName: "Fraser Valley Presale Investment Advice",
    intro: "I'm Uzair Muhammad, and I invest in the same presales I recommend — so my advice comes from real skin in the game, not a brochure. Here's my honest take on the Fraser Valley presale market: which cities and unit types actually pencil out, what rental demand looks like, how assignment and exit strategy work, and — most importantly — when I tell buyers not to buy. Projected numbers only; no guaranteed returns.",
    sections: [
      { h: "Which cities and unit types I favour", p: "For appreciation: Surrey City Centre, Fleetwood and Willoughby along the SkyTrain corridor. For cash-flow: 1-bed + den layouts $500K–$650K with tight rental fundamentals. Family investors often do better with 2-bed townhomes." },
      { h: "Rental demand in the Fraser Valley", p: "Surrey City Centre — SFU Surrey, hospital expansion, SkyTrain — tight vacancy. Langley Willoughby draws family renters. Every projection compares rents against holding costs before recommending." },
      { h: "Assignment sales and exit strategy", p: "Assignment lets you sell the contract before completion. Fees 1–3%, lifting clauses control timing. Powerful in a rising market. I review the assignment clause before you sign." },
      { h: "When I tell buyers NOT to buy", p: "When presale $/sqft is above nearby resale. When deposit ladder outruns income. When appreciation depends on SkyTrain five years out. I lose deals turning buyers away — that's the job." },
    ],
    faqs: [
      { q: "Are Fraser Valley presales still a good investment in 2026?", a: "Selectively yes. Surrey–Langley SkyTrain corridor and well-located Coquitlam/Burnaby South projects show strong fundamentals. Weaker Abbotsford towers priced above resale don't." },
      { q: "Which cities and unit types do you actually recommend?", a: "Surrey City Centre, Fleetwood, Willoughby for appreciation. 1-bed + den $500K–$650K for cash-flow. 2-bed townhomes often outperform for family investors." },
      { q: "What kind of rental demand exists in the Fraser Valley?", a: "Strong. Surrey City Centre benefits from SFU Surrey, hospital expansion and SkyTrain — vacancy tight. Langley Willoughby draws long-term family tenants." },
      { q: "How do assignment sales and exit strategy actually work?", a: "Assignment lets you sell the contract before completion. Fees 1–3%, lifting clauses control when you can list. Review the clause before signing." },
      { q: "When would you tell me NOT to buy a presale?", a: "When presale price is above resale comps, deposit ladder outruns income, or appreciation depends on infrastructure five years out. Better to lose a deal than a deposit." },
    ],
    related: [
      { href: "/buy-presale-fraser-valley", label: "How to Buy a Presale in the Fraser Valley" },
      { href: "/best-presale-realtor-fraser-valley", label: "Best Presale Realtor in the Fraser Valley" },
      { href: "/presale-mistakes-fraser-valley", label: "Presale Mistakes I See Fraser Valley Buyers Make" },
    ],
  },
  "/best-presale-realtor-fraser-valley": {
    title: "Best Presale Realtor Fraser Valley — Talk to Uzair First",
    description: "I'm Uzair Muhammad — buyer-only presale specialist for the Fraser Valley. 450+ units sold, 4.9\u2605 from 36 Google reviews. Talk to me before any developer sales centre.",
    h1: "Best Presale Realtor in the Fraser Valley — Talk to Uzair Before Any Developer",
    breadcrumbName: "Best Presale Realtor Fraser Valley",
    intro: "I'm Uzair Muhammad — Fraser Valley's buyer-only presale specialist. 450+ units sold, $200M+ in sales volume, 5 years focused on presale, 4.9\u2605 from 36 Google reviews. I don't represent developers, ever — only buyers. If you're thinking about a presale condo or townhome anywhere in the Fraser Valley, talk to me before you set foot in a developer's sales centre.",
    sections: [
      { h: "Why me — and why buyer-only?", p: "Almost every realtor sells presales occasionally. I've built a full-time practice on it. My commission is paid by the developer out of the price you'd pay anyway, and I represent you — never the builder." },
      { h: "Track record", p: TRACK_RECORD_LINE },
      { h: "Languages and service area", p: "English, Punjabi, Hindi, Urdu — across Surrey, Langley, Abbotsford, Coquitlam, Delta, Burnaby South, White Rock, Cloverdale, Chilliwack, Maple Ridge, New Westminster." },
      { h: "What working with me looks like", p: "Free 15-minute strategy call. Shortlist of 2–3 projects that actually fit, with VIP access to pre-public allocations. Line-by-line contract review before you sign." },
      { h: "See the full platform + live projects", p: "For live inventory and the full brokerage platform, visit presaleproperties.com — the full platform + live projects." },
    ],
    faqs: [
      { q: "Who is the best presale realtor in the Fraser Valley?", a: "Uzair Muhammad — buyer-only presale specialist covering Surrey, Langley, Abbotsford, Coquitlam, Delta, Burnaby, Chilliwack, Maple Ridge. 450+ units sold, 4.9★ from 36 Google reviews." },
      { q: "Why work with a buyer-only presale specialist?", a: "Because the person at the sales centre is paid by the developer. A buyer-only realtor is paid by the developer too but represents you. Zero cost." },
      { q: "What languages do you work in?", a: "English, Punjabi, Hindi and Urdu. About a third of my buyers prefer to run through the contract in one of those languages." },
      { q: "What area do you actually cover?", a: "The Fraser Valley and much of Metro Vancouver — Surrey, Langley, Abbotsford, Coquitlam, Delta, Burnaby South, White Rock, Cloverdale, Chilliwack, Maple Ridge, New Westminster." },
      { q: "How do I hire you?", a: "Book a free 15-minute strategy call — no cost, no pressure. If we're a fit, I add you to my VIP list and we shortlist projects." },
    ],
    related: [
      { href: "/buyer-representation-presale-fraser-valley", label: "Do You Need Your Own Realtor for a Presale?" },
      { href: "/presale-mistakes-fraser-valley", label: "Presale Mistakes I See Fraser Valley Buyers Make" },
      { href: "/fraser-valley-presale-investment-advice", label: "Fraser Valley Presale Investment Advice" },
    ],
  },
  "/buyer-representation-presale-fraser-valley": {
    title: "Do You Need a Realtor for a BC Presale? Yes — Here's Why",
    description: "I'm Uzair — buyer-only presale specialist. The $0-cost buyer representation thesis: who the sales-centre rep really works for, and why you need your own realtor on every BC presale.",
    h1: "Do You Need Your Own Realtor for a Presale? (Yes — Here's Why)",
    breadcrumbName: "Buyer Representation for Presale",
    intro: "I'm Uzair Muhammad, buyer-only presale specialist for the Fraser Valley. The most common question I get is: do I really need my own realtor if I'm buying a presale? Short answer: yes — because it costs you nothing and gives you someone on your side. Here's the full picture: who the sales-centre rep actually works for, why the developer pays your agent's commission anyway, and what you lose by skipping representation.",
    sections: [
      { h: "The thesis, in one line", p: "The developer already built a buyer's-agent commission into the price of every presale. If you don't hire your own realtor, the developer keeps that commission — you don't save a dollar. All you save is having someone on your side of the table." },
      { h: "Who does the sales-centre rep actually represent?", p: "Not you. Their client is the developer. They're paid to move the developer's inventory, not to warn you when a floor plan is inefficient or a competing project is a better deal." },
      { h: "What a buyer's agent actually does", p: "Reviews the contract and Disclosure Statement line by line. Negotiates deposit ladders and incentives. Compares against active presales and resale comps. Tells you when a deal is bad." },
      { h: "The cost — $0", p: "My commission is paid by the developer out of the price you'd pay anyway. Skipping me doesn't save you money — it just removes your representation." },
    ],
    faqs: [
      { q: "Do I need my own realtor to buy a presale?", a: "Yes. The rep at the sales centre works for the developer. Your own buyer's agent is also paid by the developer but represents you. There is no cost for having independent representation." },
      { q: "Does hiring a buyer's agent cost me anything?", a: "No. The developer builds a commission for the buyer's agent into every presale. If you skip your own representation, the developer keeps that budget — you don't save a dollar." },
      { q: "Who does the sales-centre rep actually represent?", a: "The developer. Their title is 'developer sales representative.' Licensed, friendly, knowledgeable — and their duty is to the developer's profit, not your outcome." },
      { q: "What does a buyer's agent actually do differently?", a: "Reviews your contract line by line. Negotiates deposit structure and incentives. Compares projects. Tells you when a deal is bad. Uses the 7-day rescission window to protect you." },
      { q: "Can I still hire you if I've already visited a sales centre?", a: "Sometimes — depends whether you've registered. If you registered but haven't signed, we may transfer representation. If you've signed, it's usually too late for that project." },
    ],
    related: [
      { href: "/best-presale-realtor-fraser-valley", label: "Best Presale Realtor in the Fraser Valley" },
      { href: "/presale-mistakes-fraser-valley", label: "Presale Mistakes I See Fraser Valley Buyers Make" },
      { href: "/buy-presale-fraser-valley", label: "How to Buy a Presale in the Fraser Valley" },
    ],
  },
};

function funnelBody(path: string): string {
  const p = FUNNEL[path];
  if (!p) return "";
  const sections = p.sections
    .map((s) => `<h2>${esc(s.h)}</h2><p>${esc(s.p)}</p>`)
    .join("");
  const faqHtml = p.faqs.map((f) => `<div><h3>${esc(f.q)}</h3><p>${esc(f.a)}</p></div>`).join("");
  const relHtml =
    `<nav aria-label="Related reading"><h2>Keep Reading</h2><ul>` +
    p.related.map((r) => `<li><a href="${SITE}${r.href}">${esc(r.label)}</a></li>`).join("") +
    `</ul></nav>`;
  const articleLd = jsonLd({
    "@context": "https://schema.org",
    "@type": "Article",
    headline: p.h1,
    description: p.description,
    datePublished: "2026-07-09",
    dateModified: "2026-07-09",
    author: { "@type": "Person", name: "Uzair Muhammad", url: SITE + "/about" },
    publisher: { "@type": "Organization", name: "Presale With Uzair", url: SITE },
    mainEntityOfPage: SITE + path,
  });
  const bcLd = jsonLd(breadcrumb(p.breadcrumbName, path));
  const faqLd = jsonLd(faqPage(p.faqs));
  return (
    `<article><h1>${esc(p.h1)}</h1>` +
    `<p>${esc(p.intro)}</p>` +
    `<p><strong>${esc(TRACK_RECORD_LINE)}</strong></p>` +
    sections +
    `<h2>Frequently Asked Questions</h2>${faqHtml}` +
    relHtml +
    `<p><a href="${SITE}/call">Book a free strategy call with Uzair</a> · <a href="tel:+16722581100">+1 672-258-1100</a></p>` +
    `</article>` +
    articleLd +
    bcLd +
    faqLd
  );
}


interface Resolved { meta: Meta; body: string; canonical?: string; robots?: string; }

function anonKey(env: Record<string, string | undefined>): string | undefined {
  return env.VITE_SUPABASE_PUBLISHABLE_KEY || env.VITE_SUPABASE_ANON_KEY || env.SUPABASE_ANON_KEY;
}

async function resolve(pathname: string, env: Record<string, string | undefined>): Promise<Resolved> {
  const path = pathname !== "/" ? pathname.replace(/\/+$/, "") : "/";

  if (FUNNEL[path]) {
    const f = FUNNEL[path];
    return { meta: { title: f.title, description: f.description, image: DEFAULT_IMAGE }, body: funnelBody(path) + ABOUT_BLOCK };
  }
  if (STATIC_META[path]) return { meta: STATIC_META[path], body: (STATIC_BODY[path] || "") + ABOUT_BLOCK };
  if (CITY_META[path]) {
    const citySlug = path.replace(/^\//, "");
    const cityImage = `${SITE}/images/heroes/${citySlug}-hero.jpg`;
    return { meta: { ...CITY_META[path], image: cityImage }, body: cityBody(path) };
  }

  if (path.startsWith("/blog/")) {
    const slug = path.slice("/blog/".length);
    const fallback: Meta = { title: humanizeSlug(slug) + SUFFIX, description: "Presale and new-construction insight for BC buyers and investors from Uzair Muhammad — buyer-only, no developer bias.", image: DEFAULT_IMAGE };
    const key = anonKey(env);
    if (!key) return { meta: fallback, body: "" };
    try {
      const url = `${SUPABASE_URL}/rest/v1/blog_posts?slug=eq.${encodeURIComponent(slug)}&published=eq.true&select=title,excerpt,image_url,content,updated_at&limit=1`;
      const r = await fetch(url, { headers: { apikey: key, Authorization: `Bearer ${key}` } });
      if (!r.ok) return { meta: fallback, body: "" };
      const rows = (await r.json()) as Array<{ title?: string; excerpt?: string; image_url?: string; content?: string; updated_at?: string }>;
      const p = rows && rows[0];
      if (!p || !p.title) return { meta: fallback, body: "" };
      const meta: Meta = { title: `${p.title}${SUFFIX}`, description: (p.excerpt || fallback.description).slice(0, 300), image: p.image_url || DEFAULT_IMAGE };
      const article = `<article><h1>${esc(p.title)}</h1>` + (p.excerpt ? `<p>${esc(p.excerpt)}</p>` : "") + `<div>${p.content || ""}</div></article>`;
      const ld = jsonLd({ "@context": "https://schema.org", "@type": "Article", headline: p.title, description: p.excerpt || meta.description, image: p.image_url || DEFAULT_IMAGE, dateModified: p.updated_at || undefined, author: { "@type": "Person", name: "Uzair Muhammad", url: SITE + "/about" }, mainEntityOfPage: SITE + path });
      return { meta, body: article + ABOUT_BLOCK + ld };
    } catch { return { meta: fallback, body: "" }; }
  }

  if (path.startsWith("/projects/")) {
    const slug = path.slice("/projects/".length);
    const genericBody = `<h1>Presale Project — Buyer-Only Access with Uzair Muhammad</h1>` + ABOUT_BLOCK;
    const fallback: Resolved = { meta: { title: humanizeSlug(slug) + " — Presale" + SUFFIX, description: "Presale new-construction project — floor plans, pricing and buyer-only representation with Uzair Muhammad.", image: DEFAULT_IMAGE }, body: genericBody, canonical: SITE + path, robots: "noindex, follow" };
    const key = anonKey(env);
    if (!key) return fallback;
    try {
      const url = `${SUPABASE_URL}/rest/v1/presale_projects?slug=eq.${encodeURIComponent(slug)}&is_published=eq.true&select=name,city,neighborhood,developer_name,project_type,starting_price,short_description,full_description,seo_title,seo_description,og_image,featured_image,source_url,faq,unit_mix&limit=1`;
      const r = await fetch(url, { headers: { apikey: key, Authorization: `Bearer ${key}` } });
      if (!r.ok) return fallback;
      const rows = (await r.json()) as Array<any>;
      const p = rows && rows[0];
      if (!p || !p.name) return fallback;
      const loc = [p.neighborhood, p.city].filter(Boolean).join(", ");
      const baseTitle = p.seo_title || `${p.name} — Presale ${p.project_type ? cap(String(p.project_type)) : "Home"}${p.city ? " in " + p.city : ""}`;
      const title = String(baseTitle).includes("Uzair") ? String(baseTitle) : String(baseTitle) + SUFFIX;
      const description = String(p.seo_description || p.short_description || `${p.name}${p.developer_name ? " by " + p.developer_name : ""} — presale new construction${p.city ? " in " + p.city : ""}. Get floor plans and pricing.`).slice(0, 300);
      const image = p.og_image || p.featured_image || DEFAULT_IMAGE;
      const canonical = p.source_url || (SITE + path);
      const price = Number(p.starting_price);
      const showPrice = Number.isFinite(price) && price >= 200000;
      const faqs = Array.isArray(p.faq) ? (p.faq as any[]).map((f) => ({ q: String(f?.question ?? f?.q ?? "").trim(), a: String(f?.answer ?? f?.a ?? "").trim() })).filter((f) => f.q && f.a) : [];
      const parts: string[] = [];
      parts.push(`<h1>${esc(p.name)}${loc ? " — Presale in " + esc(loc) : ""}</h1>`);
      const sub: string[] = [];
      if (p.developer_name) sub.push("By " + esc(p.developer_name));
      if (p.project_type) sub.push(esc(cap(String(p.project_type))));
      if (showPrice) sub.push("from $" + price.toLocaleString());
      if (sub.length) parts.push(`<p>${sub.join(" · ")}</p>`);
      if (p.short_description) parts.push(`<p>${esc(p.short_description)}</p>`);
      if (p.full_description) parts.push(`<div>${esc(p.full_description)}</div>`);
      if (p.unit_mix) parts.push(`<p><strong>Homes:</strong> ${esc(p.unit_mix)}</p>`);
      parts.push(`<p>For floor plans, pricing and buyer-only representation on ${esc(p.name)}, <a href="${SITE}/contact">contact Uzair Muhammad</a> — 450+ units sold, no developer bias.</p>`);
      if (faqs.length) parts.push(`<h2>${esc(p.name)} FAQ</h2>` + faqs.map((f) => `<div><h3>${esc(f.q)}</h3><p>${esc(f.a)}</p></div>`).join(""));
      const productLd = jsonLd({ "@context": "https://schema.org", "@type": "Product", name: p.name, description, image, category: p.project_type || "Presale Condo", ...(p.city ? { areaServed: { "@type": "Place", name: p.city } } : {}), ...(showPrice ? { offers: { "@type": "Offer", price, priceCurrency: "CAD", availability: "https://schema.org/InStock", url: canonical } } : {}) });
      const bcLd = jsonLd(breadcrumb(p.name, path));
      const faqLd = faqs.length ? jsonLd(faqPage(faqs)) : "";
      return { meta: { title, description, image }, body: parts.join("") + ABOUT_BLOCK + productLd + bcLd + faqLd, canonical, robots: "noindex, follow" };
    } catch { return fallback; }
  }

  return { meta: STATIC_META["/"], body: `<h1>Presale With Uzair — Buyer-Only Presale &amp; New Construction</h1>` + ABOUT_BLOCK };
}

class AttrSetter { attr: string; value: string; constructor(a: string, v: string) { this.attr = a; this.value = v; } element(el: any) { el.setAttribute(this.attr, this.value); } }
class TextSetter { text: string; constructor(t: string) { this.text = t; } element(el: any) { el.setInnerContent(this.text); } }
class RootInjector { html: string; constructor(h: string) { this.html = h; } element(el: any) { if (this.html) el.setInnerContent(this.html, { html: true }); } }
class HeadAppender { html: string; constructor(h: string) { this.html = h; } element(el: any) { if (this.html) el.append(this.html, { html: true }); } }

export const onRequest: any = async (context: any) => {
  const { request, next, env } = context;
  if (request.method !== "GET") return next();
  const ua = request.headers.get("user-agent") || "";
  if (!BOT_RE.test(ua)) return next();

  const url = new URL(request.url);
  if (ASSET_RE.test(url.pathname)) return next();
  if (url.pathname.startsWith("/assets/") || url.pathname.startsWith("/api/") || url.pathname.startsWith("/functions/") || url.pathname.startsWith("/admin")) return next();

  try {
    const resolved = await resolve(url.pathname, env);
    const { meta, body } = resolved;
    const canonical = resolved.canonical || `${SITE}${url.pathname === "/" ? "/" : url.pathname.replace(/\/+$/, "")}`;
    const res = await next();
    const ct = res.headers.get("content-type") || "";
    if (!ct.includes("text/html")) return res;

    let rw = new HTMLRewriter()
      .on("title", new TextSetter(meta.title))
      .on('meta[name="description"]', new AttrSetter("content", meta.description))
      .on('meta[property="og:title"]', new AttrSetter("content", meta.title))
      .on('meta[property="og:description"]', new AttrSetter("content", meta.description))
      .on('meta[property="og:image"]', new AttrSetter("content", meta.image))
      .on('meta[property="og:url"]', new AttrSetter("content", canonical))
      .on('meta[name="twitter:title"]', new AttrSetter("content", meta.title))
      .on('meta[name="twitter:description"]', new AttrSetter("content", meta.description))
      .on('meta[name="twitter:image"]', new AttrSetter("content", meta.image))
      .on("head", new HeadAppender(`<link rel="canonical" href="${canonical}">`))
      .on("#root", new RootInjector(body));
    if (resolved.robots) rw = rw.on('meta[name="robots"]', new AttrSetter("content", resolved.robots));
    return rw.transform(res);
  } catch (e) {
    return next();
  }
};
