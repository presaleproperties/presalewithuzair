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

export const SITE = "https://presalewithuzair.com";
export const DEFAULT_IMAGE = "https://presalewithuzair.com/og/default.png";
const SUPABASE_URL = "https://ubbogklasownognviobh.supabase.co";
export const SUPABASE_REST_URL = SUPABASE_URL;

/**
 * Legacy URL 301 map (old Framer site + retired routes).
 * Applied to EVERY request (humans and crawlers) before any other logic so
 * search engines receive a real 301 instead of a soft client-side redirect.
 */
const REDIRECT_EXACT: Record<string, string> = {
  "/en/blog/who-is-the-best-presale-condo-realtor-in-surrey": "/best-presale-realtor-fraser-valley",
  "/en/assigments": "/",
  "/webinar-registeration-page": "/call",
  "/agents": "/",
  "/book": "/call",
  "/en": "/",

  // --- Blog consolidation (Aug 2026): retired duplicate posts → cluster winner ---
  // GST / first-time-buyer rebate
  "/blog/fthb-gst-rebate-save-50000-bc-presales-2026": "/blog/first-time-buyer-gst-rebate-bc-presale-2026",
  "/blog/gst-rebate-first-time-buyers-bc-presale-condos": "/blog/first-time-buyer-gst-rebate-bc-presale-2026",
  "/blog/gst-rebate-presale-condos-bc-2026": "/blog/first-time-buyer-gst-rebate-bc-presale-2026",
  // Assignments — process
  "/blog/presale-assignment-condos-bc-how-to-buy-2026": "/blog/assignment-sales-bc-2026-process-fees-taxes",
  "/blog/selling-before-completion-assignment-sales-presale-profits": "/blog/assignment-sales-bc-2026-process-fees-taxes",
  "/blog/surrey-assignment-flip-sell-presale-contract-before-completion": "/blog/assignment-sales-bc-2026-process-fees-taxes",
  "/blog/surrey-presale-assignment-flip-how-to-sell-contract": "/blog/assignment-sales-bc-2026-process-fees-taxes",
  "/blog/selling-a-presale-condo-assignment-in-fraser-valley-what-you-need-to-know": "/blog/assignment-sales-bc-2026-process-fees-taxes",
  "/blog/why-developer-blocking-presale-assignment-bc": "/blog/assignment-sales-bc-2026-process-fees-taxes",
  // Assignments — tax / pricing
  "/blog/gst-on-presale-assignment-sales-bc-rules": "/blog/assignment-sales-gst-cra-anti-flipping-2026",
  "/blog/presale-assignment-sales-exit-strategy-bc": "/blog/how-to-price-presale-assignment-bc",
  // How to buy
  "/blog/how-to-buy-presale-condo-bc": "/blog/how-to-buy-a-presale-in-bc-2026",
  "/blog/how-buying-presale-condo-bc-works": "/blog/how-to-buy-a-presale-in-bc-2026",
  "/blog/how-buying-presale-condo-bc-works-complete-guide": "/blog/how-to-buy-a-presale-in-bc-2026",
  "/blog/complete-guide-buying-presale-condos-vancouver-2026": "/blog/how-to-buy-a-presale-in-bc-2026",
  "/blog/buy-presale-fraser-valley": "/blog/how-to-buy-a-presale-in-bc-2026",
  // Deposits / financing
  "/blog/presale-condo-deposit-structure-bc": "/blog/understanding-presale-deposit-structure-bc-2026",
  "/blog/presale-deposit-protection-bc": "/blog/understanding-presale-deposit-structure-bc-2026",
  "/blog/presale-condo-financials-deposits-mortgages-hidden-costs": "/blog/how-much-cash-to-buy-presale-bc-2026",
  "/blog/presale-condo-bc-deposits-hidden-costs-gst": "/blog/how-much-cash-to-buy-presale-bc-2026",
  // 7-day rescission
  "/blog/7-day-rescission-period-bc-presale": "/blog/bc-presale-7-day-rescission-period-2026",
  // Completion delays / value at completion
  "/blog/presale-completion-delayed-6-24-months-bc-rights": "/blog/presale-delayed-bc-rights-outside-date-2026",
  "/blog/what-happens-if-your-presale-condo-is-worth-less-at-completion": "/blog/presale-appraisal-gap-completion-bc-2026",
  // BC home flipping tax
  "/blog/bc-s-new-20-flipping-tax-what-it-means-for-pre-sale-buyers-and-investors": "/blog/bc-home-flipping-tax-presale-2026",
  "/blog/does-the-bc-home-flipping-tax-apply-to-presale-condos-what-buyers-need-to-know-in-2026": "/blog/bc-home-flipping-tax-presale-2026",
  "/blog/the-bc-home-flipping-tax-and-your-presale-condo-what-surrey-buyers-and-investors-must-know-in-2026": "/blog/bc-home-flipping-tax-presale-2026",
  // Presale risk
  "/blog/presale-risks-developer-bankruptcy-cancellations-bc": "/blog/is-buying-presale-safe-developer-risks-deposit-protection",
  "/blog/5-presale-condo-risks-bc-buyers-must-know": "/blog/is-buying-presale-safe-developer-risks-deposit-protection",
};

/**
 * Hand-built map of known legacy Framer blog URLs (after "/en/blog/") to the
 * current post slug. Used before the dynamic slug lookup.
 */
const LEGACY_BLOG_MAP: Record<string, string> = {
  "how-to-buy-a-presale-condo-in-bc-vancouver-beginner-s-guide-to-purchasing-a-presale-condo":
    "how-to-buy-a-presale-in-bc-2026",
  "who-is-the-best-presale-condo-realtor-in-surrey": "best-presale-realtor-fraser-valley",
};

/** Topic keywords → current slug, for fuzzy matching unknown legacy blog URLs. */
const LEGACY_BLOG_TOPICS: Array<{ keywords: string[]; slug: string }> = [
  { keywords: ["gst", "rebate"], slug: "first-time-buyer-gst-rebate-bc-presale-2026" },
  { keywords: ["assignment"], slug: "assignment-sales-bc-2026-process-fees-taxes" },
  { keywords: ["deposit"], slug: "understanding-presale-deposit-structure-bc-2026" },
  { keywords: ["rescission"], slug: "bc-presale-7-day-rescission-period-2026" },
  { keywords: ["7", "day"], slug: "bc-presale-7-day-rescission-period-2026" },
  { keywords: ["resale"], slug: "move-in-ready-vs-presale-comparison" },
  { keywords: ["best", "realtor"], slug: "best-presale-realtor-fraser-valley" },
  { keywords: ["best", "agent"], slug: "best-presale-realtor-fraser-valley" },
  { keywords: ["flipping", "tax"], slug: "bc-home-flipping-tax-presale-2026" },
  { keywords: ["first", "time"], slug: "first-time-home-buyer-presale-guide-bc-2026" },
  { keywords: ["invest"], slug: "investor-guide-fraser-valley-presales-2026" },
  { keywords: ["floor", "plan"], slug: "how-to-read-presale-floor-plan-bc-2026" },
  { keywords: ["how", "buy"], slug: "how-to-buy-a-presale-in-bc-2026" },
];


export function legacyRedirect(pathname: string): string | null {
  const path = pathname !== "/" ? pathname.replace(/\/+$/, "") : "/";
  if (REDIRECT_EXACT[path]) return REDIRECT_EXACT[path];
  if (path.startsWith("/en/blog/")) return null; // resolved asynchronously
  if (path.startsWith("/en/")) return "/";
  return null;
}

/**
 * Resolve a legacy /en/blog/{slug} URL to the closest live post.
 * Order: hand map → exact slug match → keyword-overlap match → /blog.
 */
export async function legacyBlogRedirect(
  pathname: string,
  env: Record<string, string | undefined>,
): Promise<string> {
  const oldSlug = pathname.replace(/\/+$/, "").slice("/en/blog/".length).toLowerCase();
  if (!oldSlug) return "/blog";
  if (LEGACY_BLOG_MAP[oldSlug]) return `/blog/${LEGACY_BLOG_MAP[oldSlug]}`;

  const key = env.VITE_SUPABASE_PUBLISHABLE_KEY || env.VITE_SUPABASE_ANON_KEY || env.SUPABASE_ANON_KEY;
  let slugs: string[] = [];
  if (key) {
    try {
      const r = await fetch(
        `${SUPABASE_URL}/rest/v1/blog_posts?published=eq.true&select=slug&limit=1000`,
        { headers: { apikey: key, Authorization: `Bearer ${key}` } },
      );
      if (r.ok) slugs = ((await r.json()) as Array<{ slug: string }>).map((x) => x.slug).filter(Boolean);
    } catch { /* fall through */ }
  }

  if (slugs.includes(oldSlug)) return `/blog/${oldSlug}`;

  const words = oldSlug.split("-").filter((w) => w.length > 2);
  let best: { slug: string; score: number } | null = null;
  for (const s of slugs) {
    const parts = new Set(s.split("-"));
    const score = words.filter((w) => parts.has(w)).length;
    if (score >= 3 && (!best || score > best.score)) best = { slug: s, score };
  }
  if (best) return `/blog/${best.slug}`;

  for (const t of LEGACY_BLOG_TOPICS) {
    if (t.keywords.every((k) => words.includes(k))) {
      if (!slugs.length || slugs.includes(t.slug)) return `/blog/${t.slug}`;
    }
  }
  return "/blog";
}




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
    <p>Uzair Muhammad is a presale and new-construction specialist who represents buyers, not developers serving Surrey, Langley, Abbotsford, Coquitlam, Delta, Burnaby South, Chilliwack and Maple Ridge in British Columbia's Fraser Valley. He has helped 450+ families purchase more than $200M in new homes, and he never represents developers — only buyers. A former City of Surrey planning and bylaws professional and founder of the Vancouver Presale Expo, Uzair reviews every developer contract line by line to protect the buyer's deposit. He works in English, Punjabi, Hindi and Urdu.</p>
    <p>Learn more: <a href="${SITE}/about">About Uzair</a> &middot; <a href="${SITE}/services">Buyer-first services</a> &middot; <a href="${SITE}/blog">Presale guides</a> &middot; <a href="${SITE}/contact">Book a free strategy call</a>.</p>
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

/**
 * Three verbatim Google reviews, mirrored from src/data/googleReviews.ts.
 * Rendered on /about so the sitewide aggregateRating in index.html is
 * accompanied by individual Review objects on the page where reviews appear.
 */
const ABOUT_REVIEWS: { name: string; quote: string; when: string }[] = [
  {
    name: "Ray M",
    quote:
      "Now I see why he's called the \"presale expert.\" Uzair's expertise in the presale market is exceptional. His strong relationships with developers enabled us to secure the best unit in the building at an incredible price. It was an outstanding experience.",
    when: "a year ago",
  },
  {
    name: "Mehreen Chaudry",
    quote:
      "I have been working with Uzair for a number of years he is an expert in his knowledge about presale in Vancouver. His personalized approach for his client is what makes it very easy to work with him.",
    when: "a year ago",
  },
  {
    name: "Adam Lai",
    quote:
      "Uzair helped me with my investment property, and I couldn't be more grateful. He's focused on making sure you get the best deal and guiding you through every step of the process. If a deal or project isn't right, he'll tell you exactly that, no fluff, no hype.",
    when: "a year ago",
  },
];

function aboutReviewsBlock(): string {
  const cards = ABOUT_REVIEWS.map(
    (r) =>
      `<figure><p>&#9733;&#9733;&#9733;&#9733;&#9733;</p><blockquote>${esc(r.quote)}</blockquote><figcaption>${esc(r.name)} — Google review, ${esc(r.when)}</figcaption></figure>`,
  ).join("");
  const ld = jsonLd({
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "@id": SITE + "/#agent",
    name: "Uzair Muhammad — Presale With Uzair",
    url: SITE,
    aggregateRating: { "@type": "AggregateRating", ratingValue: 4.9, reviewCount: 36, bestRating: 5 },
    review: ABOUT_REVIEWS.map((r) => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.name.split(" ")[0] },
      reviewRating: { "@type": "Rating", ratingValue: 5, bestRating: 5 },
      reviewBody: r.quote,
      itemReviewed: { "@id": SITE + "/#agent" },
    })),
  });
  return (
    `<section><h2>Reviews from families Uzair has represented</h2>${cards}` +
    `<p><a href="https://share.google/qgUTcQF2kOnjBBPr7" rel="noopener">4.9&#9733; &middot; 36 Google reviews</a></p></section>` +
    ld
  );
}

export const STATIC_META: Record<string, Meta> = {
  "/": { title: "Presale Condos & New Homes Fraser Valley | Uzair Muhammad", description: "Buyer-side presale guidance across Surrey, Langley, Abbotsford and the Fraser Valley. Compare projects, understand the numbers and buy with confidence.", image: DEFAULT_IMAGE },
  "/about": { title: "About Uzair Muhammad | Presale Buyer Advisor Fraser Valley", description: "Meet Uzair Muhammad, a buyer-side presale Realtor helping families evaluate new condos and townhomes across the Fraser Valley and Metro Vancouver.", image: DEFAULT_IMAGE },
  "/services": { title: "Presale Buyer Services | Uzair Muhammad", description: "Buyer-side presale services including project comparison, purchase guidance, assignments, resale and completion support across the Fraser Valley.", image: DEFAULT_IMAGE },
  "/contact": { title: "Contact Uzair Muhammad | Presale Buyer Advisor", description: "Ask Uzair about a presale condo, townhome or new-construction project in Surrey, Langley, Abbotsford or the Fraser Valley.", image: DEFAULT_IMAGE },
  "/call": { title: "Book a Buyer Strategy Call | Uzair Muhammad", description: "Book a no-pressure presale strategy call with Uzair Muhammad. Buyer-side advice for new condos and townhomes across the Fraser Valley.", image: DEFAULT_IMAGE },
  "/presale-guide": { title: "BC Presale Buyer Guide | Uzair Muhammad", description: "A practical guide to evaluating BC presales, including projects, deposits, purchase terms, closing costs and completion.", image: DEFAULT_IMAGE },
  "/blog": { title: "BC Presale Insights & Buyer Guides | Uzair Muhammad", description: "Practical presale guides, market updates and buyer-side analysis for new homes across the Fraser Valley and Metro Vancouver.", image: DEFAULT_IMAGE },
  "/punjabi-speaking-realtor": { title: "Punjabi Speaking Presale Realtor | Surrey & Fraser Valley", description: "Work with a Punjabi-speaking Realtor for presale and new construction across Surrey and the Fraser Valley.", image: DEFAULT_IMAGE },
  "/hindi-speaking-realtor": { title: "Hindi Speaking Presale Realtor | Surrey & Fraser Valley", description: "Hindi-speaking Realtor helping presale and new-construction buyers across Surrey and the Fraser Valley.", image: DEFAULT_IMAGE },
  "/urdu-speaking-realtor": { title: "Urdu Speaking Presale Realtor | Surrey & Fraser Valley", description: "Work with an Urdu-speaking Realtor for presale and new construction across Surrey and the Fraser Valley.", image: DEFAULT_IMAGE },
  "/south-asian-buyers": { title: "First-Generation Home Buyers | Surrey & Fraser Valley", description: "Presale guidance for first-generation and South Asian home buyers across Surrey and the Fraser Valley, in English, Punjabi, Hindi and Urdu.", image: DEFAULT_IMAGE },
};

const NATIVE_INTRO: Record<string, { code: string; dir?: string; text: string }> = {
  Punjabi: { code: "pa", text: "ਸਤ ਸ੍ਰੀ ਅਕਾਲ, ਮੈਂ ਉਜ਼ੈਰ ਮੁਹੰਮਦ ਹਾਂ। ਮੈਂ ਸਰੀ, ਲੈਂਗਲੀ ਅਤੇ ਫਰੇਜ਼ਰ ਵੈਲੀ ਵਿੱਚ ਪਰਿਵਾਰਾਂ ਦੀ ਉਹਨਾਂ ਦਾ ਪਹਿਲਾ ਪ੍ਰੀਸੇਲ ਘਰ ਖਰੀਦਣ ਵਿੱਚ ਮਦਦ ਕਰਦਾ ਹਾਂ। ਡਿਪਾਜ਼ਿਟ ਦੀਆਂ ਤਰੀਕਾਂ, ਕੰਟਰੈਕਟ ਦੀਆਂ ਸ਼ਰਤਾਂ ਅਤੇ ਅਸਲ ਲਾਗਤ ਮੈਂ ਤੁਹਾਡੇ ਮਾਤਾ-ਪਿਤਾ ਨੂੰ ਪੰਜਾਬੀ ਵਿੱਚ ਸਮਝਾਉਂਦਾ ਹਾਂ, ਤਾਂ ਜੋ ਸਾਈਨ ਕਰਨ ਤੋਂ ਪਹਿਲਾਂ ਪੂਰੇ ਪਰਿਵਾਰ ਨੂੰ ਸਭ ਕੁਝ ਸਾਫ਼ ਹੋਵੇ। ਮੈਂ ਸਿਰਫ਼ ਖਰੀਦਦਾਰਾਂ ਦਾ ਪੱਖ ਰੱਖਦਾ ਹਾਂ — ਡਿਵੈਲਪਰ ਦਾ ਕਦੇ ਨਹੀਂ।" },
  Hindi: { code: "hi", text: "नमस्ते, मैं उज़ैर मुहम्मद हूँ। मैं सरे, लैंगली और फ्रेज़र वैली में परिवारों को उनका पहला प्रीसेल घर खरीदने में मदद करता हूँ। डिपॉज़िट की तारीखें, कॉन्ट्रैक्ट की शर्तें और असली लागत मैं आपके माता-पिता को हिंदी में समझाता हूँ, ताकि साइन करने से पहले पूरे परिवार को सब कुछ साफ़ हो। मैं सिर्फ़ खरीदारों की तरफ़ से काम करता हूँ — डेवलपर की तरफ़ से कभी नहीं।" },
  Urdu: { code: "ur", dir: "rtl", text: "السلام علیکم، میں عذیر محمد ہوں۔ میں سرے، لینگلی اور فریزر ویلی میں خاندانوں کی ان کا پہلا پری سیل گھر خریدنے میں مدد کرتا ہوں۔ ڈپازٹ کی تاریخیں، کنٹریکٹ کی شرائط اور اصل لاگت میں آپ کے والدین کو اردو میں سمجھاتا ہوں، تاکہ دستخط کرنے سے پہلے پورے خاندان کو سب کچھ واضح ہو۔ میں صرف خریداروں کی نمائندگی کرتا ہوں — ڈویلپر کی کبھی نہیں۔" },
};

const STATIC_BODY: Record<string, string> = {
  "/": `<h1>Presale Advice From the Buyer's Side.</h1><p>The sales centre knows how to sell the project. I help you decide whether it's actually right for you.</p><p>I represent presale and new-construction buyers across Surrey, Langley, Abbotsford and the Fraser Valley — helping you compare projects, understand the numbers and make a confident decision before you commit.</p><p>English · Punjabi · Hindi · Urdu</p><p>On many presale projects, buyer-agent compensation is paid through the project's sales structure. I'll confirm exactly how it works before you move forward.</p><h2>The project has a sales team. You should have someone looking at it from your side.</h2><p>A beautiful presentation centre doesn't tell you whether a project is a good buy. Presale can be a great fit for the right buyer, but the decision should be based on more than renderings, incentives and a floor plan that looks good on paper. I help you compare the project against your budget, timeline and goals — including the location, developer, deposit schedule, completion timing, floor plan and nearby alternatives. The goal isn't to find a project to buy. It's to find a project worth buying.</p><p>The people selling a development have one job: sell that development. My job is different — I help you evaluate the options from your side and tell you what I actually think. I've helped 450+ families purchase more than \$200M in new homes. Before real estate, I spent 10 years working with the City of Surrey in planning and bylaws. Today I lead The Presale Properties Group and founded the Vancouver Presale Expo. I also work in English, Punjabi, Hindi and Urdu, so everyone involved in the decision can understand what they're committing to. If you're considering a project, talk to me before registering directly with the sales centre — representation rules can vary by development.</p><p>A presale decision has more moving parts than the advertised purchase price. I help buyers work through the deposit schedule, completion timing, assignment provisions, incentives and other important purchase terms in plain language. We also look at the full financial picture: deposits, potential GST, closing costs, financing at completion and whether the purchase still makes sense if circumstances change. When professional legal, tax or lending advice is needed, I make sure you know which questions to take to your lawyer, accountant or lender. And if I don't think a project fits your goal, I'll tell you.</p><h2>Clear advice before you commit.</h2><p>A buyer-side process designed to replace sales-centre pressure with clarity: a Buyer Strategy Call about your goal, budget and timeline; a look at Market Fit across Surrey, Langley, Abbotsford, Delta, Coquitlam and the rest of the Fraser Valley; a Project Shortlist of the right two or three options instead of 140 listings; a Floor Plan &amp; Numbers Review that pressure-tests the unit, the deposit schedule and the incentives; the Walk-Away Rule — sometimes the best presale decision is the one you don't make; and Purchase &amp; Completion Guidance that keeps track of deposit milestones, construction updates, financing preparation, closing costs, walkthrough timing and possession.</p><h2>The questions buyers ask before they commit.</h2><div><h3>Do I need my own Realtor to buy a presale?</h3><p>You can purchase directly from a developer, but the sales team is there to sell that development. Having your own Realtor gives you someone evaluating the project from your side. On many presale projects, buyer-agent compensation is paid through the project's sales structure. I'll confirm the arrangement for the specific project before you move forward.</p></div><div><h3>How much deposit do I need?</h3><p>Presale deposit schedules vary by project. Many developments use staged deposits rather than requiring the full amount upfront. Before you commit, I map out every deposit date so you know exactly how much cash is required and when.</p></div><div><h3>What happens if a project is delayed or cancelled?</h3><p>Your rights depend on the purchase agreement, disclosure statement and applicable BC legislation. Delays and cancellations can work differently from project to project, which is why I help you identify the relevant terms and the questions that should be confirmed with your lawyer before you commit.</p></div><div><h3>Can I sell my presale before completion?</h3><p>Potentially. This is called an assignment, and the rules vary significantly between projects. Developer approval, fees, marketing restrictions and tax considerations can all affect your options. I look at the assignment provisions early so your exit strategy is based on the contract, not an assumption.</p></div><div><h3>Is presale better than resale?</h3><p>Sometimes. Sometimes resale is the better decision. Presale can offer staged deposits, new-home warranty coverage, newer construction and project incentives. Resale gives you certainty about the finished home and today's market value. I compare both when that's what the decision requires.</p></div><h2>7 Costly Mistakes Presale Buyers Make</h2><p>Presale mistakes often happen before the contract is signed. Download my guide to the questions I think buyers should ask about the project, floor plan, deposit schedule, purchase terms and completion costs before committing.</p><h2>Have a project in mind? Ask me about it before you commit.</h2><p>I'll personally review your inquiry and help you understand what deserves a closer look. Buyer-side presale guidance. English, Punjabi, Hindi &amp; Urdu. 450+ families helped. \$200M+ in new-home purchases.</p>`,
  "/about": `<h1>About Uzair Muhammad — I Help Buyers See Past the Brochure.</h1><p>Buying presale means making a major financial decision about a home that may not exist yet. That's why my job isn't simply to find you a project. It's to help you understand what you're buying before you commit.</p><p>I help families compare new condos, townhomes and presales across the Fraser Valley and Metro Vancouver — looking at the project, location, price, floor plan, deposit structure, completion timing and long-term fit. And after you sign, I stay involved through the path to completion and keys.</p><p>I've helped more than 450 families purchase over \$200M in new homes. Before real estate, I spent 10 years working with the City of Surrey in planning and bylaws. That experience changed how I look at development — I naturally ask questions about how a project fits the neighbourhood, what's happening around it and what may matter years from now, not just what looks good on launch day.</p><p>Today I lead The Presale Properties Group and founded the Vancouver Presale Expo. I work in English, Punjabi, Hindi and Urdu. My role is simple: help you understand the options, avoid the wrong ones and make the right decision with confidence.</p><h2>The development already has people selling it. You deserve someone evaluating it from your side.</h2><p>The sales team knows its project better than almost anyone. That's valuable. But its job is to sell that development. My job is to help you decide whether that development makes sense for you — comparing it with alternatives, questioning the numbers, looking critically at the floor plan and helping you understand the purchase terms. If I think the project makes sense, I'll explain why. If I think another project is stronger, I'll say so. If I think you should wait, I'll say that too. Good advice isn't measured by how quickly you buy — it's measured by whether you still feel good about the decision when you get the keys.</p><h2>What I help buyers understand</h2><p>Most buyers don't need more listings. They need better context. I help buyers think through questions like: Is this project fairly priced relative to the alternatives? Does this floor plan actually work? Does the deposit schedule fit my cash flow? What purchase terms deserve closer attention? What costs should I prepare for at completion? Is the incentive meaningful or mostly marketing? How does this neighbourhood fit my goal? What happens if my circumstances change before completion? Should I buy now, wait or compare something else? What should I prepare for at the deficiency walkthrough? Presale can be a strong option, but only when the project, timing, finances and buyer all fit together.</p><h2>With you from decision to keys.</h2><p>Signing the contract isn't the end of a presale purchase — in many cases, it's the beginning of a multi-year timeline. I stay connected through deposit milestones, construction updates, completion preparation, financing conversations, walkthrough timing and possession. When a question requires a lawyer, accountant, lender or other specialist, I help make sure you're asking the right person the right question.</p><h2>I look at developments differently.</h2><p>Before real estate, I spent 10 years working with the City of Surrey in planning and bylaws. That doesn't make me a city planner today, but it gave me a useful lens. When I look at a project, I'm not just looking at finishes and incentives — I'm thinking about location, surrounding development, approvals, land use, neighbourhood change and how the home may function when it's actually completed. Presale isn't only about what looks exciting today. It's about what still makes sense years from now.</p><h2>Who I help</h2><p><strong>First-time buyers.</strong> Buying your first home comes with enough uncertainty already. I help you understand the timeline, deposits, purchase terms, completion costs, location and whether presale is actually the right way for you to enter the market.</p><p><strong>Investors.</strong> I help investors look past the marketing story and evaluate the fundamentals — price, nearby resale, rent potential, deposit leverage, assignment provisions, completion risk and the eventual exit strategy. No guaranteed returns. Just better questions and clearer numbers.</p><p><strong>Move-up buyers.</strong> If you're moving from a condo into a townhome or planning several years ahead, presale can help create time. But timing your existing home, deposits, mortgage and eventual completion matters. I help you see the whole sequence.</p><p><strong>First-generation &amp; newcomer buyers.</strong> Sometimes the buyer understands the process in English but the parents helping with the deposit don't. I work in English, Punjabi, Hindi and Urdu so the people involved in the decision can understand it together. No family member should be writing a cheque for something they don't understand.</p><h2>Local market focus</h2><p>My core focus is presale and new construction across Surrey, Langley, South Surrey, White Rock, Delta, Abbotsford, Coquitlam, Burnaby, Maple Ridge, Chilliwack and surrounding communities. These aren't interchangeable markets. A project that's right for an investor may be wrong for a first-time buyer. A great family townhome may be a mediocre rental. A strong building doesn't automatically make every floor plan a good buy. Context matters.</p><h2>The Presale Properties Group</h2><p>I lead The Presale Properties Group, a multilingual real estate team helping buyers navigate presale and new construction across the Fraser Valley and Metro Vancouver. Our team works in English, Punjabi, Hindi and Urdu. Alongside me you'll work with Ravish Passy and Sarb Grewal — agents who live and work in the communities we serve. Our shared approach is simple: help the buyer understand the decision before asking them to make it.</p><h2>Vancouver Presale Expo</h2><p>I founded the Vancouver Presale Expo to help raise the level of education and conversation around BC's presale industry. The event brings together agents, developers and industry professionals. For me, that work matters because a more informed industry should create more informed buyers.</p><h2>Before you choose a project, choose your advisor.</h2><p>Considering a presale? Start with a conversation, not a showroom. Tell me what you're considering. I'll help you understand the market, compare the options and identify the questions worth asking before you commit. <a href="${SITE}/call">Book a Buyer Strategy Call</a>.</p>`,
  "/services": `<h1>One Advisor From the First Question to the Keys.</h1><p>Buying a presale isn't one decision. It's a series of decisions about the market, project, floor plan, deposit structure, purchase terms, financing and eventual completion. I help you connect those decisions so you're not evaluating each one in isolation.</p><h2>Presale Purchasing &amp; Early Access</h2><p>I'll help you find and compare presale opportunities across the Fraser Valley and Metro Vancouver, including early-access opportunities when they're available. But access isn't the point. Judgment is. My job is to help you determine whether the project deserves your money in the first place — project and location comparison, floor plan and pricing analysis, deposit schedule review, developer and competing-project research, incentive comparison, and a purchase-term walkthrough with the questions to confirm with your lawyer.</p><h2>Presale Assignment Strategy</h2><p>Life can change between signing a presale contract and completion. If you need to explore assigning your contract, I help you understand the market value, developer requirements and practical steps involved in bringing the assignment to market — market-based pricing, developer process and restrictions, marketing strategy and buyer outreach. Because assignments can involve legal and tax considerations, I also make sure those issues are directed to the appropriate professionals.</p><h2>Resale &amp; Portfolio Decisions</h2><p>Presale isn't automatically the right answer. For investors and homebuyers, sometimes the better opportunity is already built. I can help you compare presale and resale through the same lens: price, location, financing, rent potential, long-term demand and your exit strategy. The goal is not to make presale win. The goal is to make the right option obvious.</p><h2>Completion, Walkthrough &amp; After-Key Support</h2><p>Presale purchases can take years to complete. I stay involved — helping you prepare for financing conversations, closing costs, the deficiency walkthrough and possession, and pointing you toward the right professional resources for anything that requires legal, financing, tax or warranty expertise. Completion preparation, closing-cost planning, deficiency walkthrough support, possession-day coordination, new-home warranty orientation and a post-completion check-in.</p><h2>Have a project in mind?</h2><p>Send it to me before you commit. No pressure. No pitch. Just a clear conversation about whether it makes sense for you.</p>`,
  "/contact": `<h1>Have a Presale Project in Mind? Send It to Me.</h1><p>You don't need to know exactly what you want before reaching out. Tell me what you're considering, your approximate budget and what you're trying to accomplish. I'll help you figure out which questions matter next.</p><p>WhatsApp (preferred) is best for a quick project question. Call me directly at <a href="tel:+17782313592">+1 (778) 231-3592</a>, or email <a href="mailto:info@meetuzair.com">info@meetuzair.com</a> with a project, floor plan or detailed question. Office: Real Broker, 3211 152 St, Building C, Surrey, BC V3Z 1H8.</p><p>A few details help me give you a useful answer: your approximate budget, preferred city or cities, condo/townhome/detached, buying to live in or invest, ideal move-in timeline, any projects you're already considering, and whether you've already registered with a sales centre. No obligation — start with a conversation.</p><p>450+ families helped. \$200M+ in new-home purchases. 5 years of presale focus.</p>`,
  "/call": `<h1>Before You Buy a Presale, Get a Second Perspective.</h1><p>15 minutes. No sales-centre pressure. Just a conversation about what you're considering and whether it makes sense.</p><p>450+ families helped. Buyer-side guidance. English · Punjabi · Urdu · Hindi.</p><h2>What happens on the call</h2><p>15 minutes, no obligation. You tell me what you're trying to accomplish. We talk through your budget, timeline and preferred areas. I'll tell you what I'd compare next. If you already have a project in mind, we'll start there. If I don't think presale is the right move, I'll tell you.</p><h2>What I help buyers evaluate</h2><p>Buying a new condo or townhome is a big decision. My job is to help make the decision clearer.</p><p><strong>Understand what you're signing.</strong> I'll walk you through the major business terms, deposit schedule and disclosure information in plain language and identify anything that should be confirmed with your lawyer.</p><p><strong>Compare projects, not just marketing.</strong> Early access can be useful, but the bigger advantage is having someone compare the project against competing presales and nearby resale before you commit.</p><p><strong>Pressure-test the decision.</strong> Not every presale deserves your deposit. We look at the developer, location, pricing, floor plan, terms and your own financial situation before deciding.</p><p><strong>Stay supported through completion.</strong> Presale can take years. I stay connected through deposits, completion preparation, walkthrough timing and possession.</p>`,
  "/presale-guide": `<h1>Presale Guide</h1><p>A practical guide to buying presale from the buyer's side. Coming soon.</p>`,
  "/blog": `<h1>Presale Insights</h1><p>Market updates, practical buyer guides and independent perspective on presale and new construction across BC.</p><p>Not every project is a good project. Not every market headline applies to every buyer. These articles are here to help you understand the difference.</p>`,
  "/punjabi-speaking-realtor": languagePageBody("Punjabi", "Presale Explained Clearly — In Punjabi or English.", "Buying a home is often a family decision. Sometimes the buyer is comfortable in English while parents or other family members contributing money would rather discuss the details in Punjabi.", "/punjabi-speaking-realtor", "Punjabi Speaking Realtor"),
  "/hindi-speaking-realtor": languagePageBody("Hindi", "Presale Guidance in Hindi or English.", "A home purchase can involve the entire family. I work in Hindi, Punjabi, Urdu and English so buyers and the family members helping them can understand the project, deposit schedule and purchase process together.", "/hindi-speaking-realtor", "Hindi Speaking Realtor"),
  "/urdu-speaking-realtor": languagePageBody("Urdu", "Presale Guidance in Urdu — For You and Your Family.", "Urdu is my first language. I was born in Pakistan and raised in Surrey, and today I help families across the Fraser Valley navigate presale and new construction in Urdu, Punjabi, Hindi and English. For many families, buying a home is not an individual decision — parents may be helping with the deposit, and several generations may be discussing the purchase.", "/urdu-speaking-realtor", "Urdu Speaking Realtor"),
  "/south-asian-buyers": southAsianBuyersBody(),
};

function languagePageBody(lang: string, h1: string, leadSentence: string, path: string, crumb: string): string {
  const faqs = [
    { q: `Does Uzair speak ${lang}?`, a: `Yes. I work in ${lang === "Urdu" ? "Urdu, Punjabi, Hindi" : lang === "Hindi" ? "Hindi, Punjabi, Urdu" : "Punjabi, Hindi, Urdu"} and English and regularly speak with buyers and their families in ${lang}.` },
    { q: `Do you work outside Surrey?`, a: `Yes. I help presale and new-construction buyers across the Fraser Valley and Metro Vancouver.` },
    { q: `Does it cost extra to work with you?`, a: `Compensation arrangements vary by transaction. On many presale projects, buyer-agent compensation is paid through the project's sales structure. I'll explain exactly how it works for the specific project before you proceed.` },
  ];
  return (
    `<h1>${esc(h1)}</h1>` +
    `<p>${esc(leadSentence)} Uzair Muhammad is a buyer-side presale and new-construction advisor who works in Punjabi, Hindi, Urdu and English across Surrey, Langley, Abbotsford, Delta and the Fraser Valley. He represents buyers, never developers. He has helped 450+ families and holds a 4.9-star rating on Google.</p>` +
    (NATIVE_INTRO[lang]
      ? `<p lang="${NATIVE_INTRO[lang].code}"${NATIVE_INTRO[lang].dir ? ` dir="${NATIVE_INTRO[lang].dir}"` : ""}>${esc(NATIVE_INTRO[lang].text)}</p>`
      : "") +
    `<h2>The deposit is usually a family decision. The contract is usually only in English.</h2>` +
    `<p>In most Fraser Valley presale purchases, parents help with the deposit. The buyer speaks English. The parents putting up the money often do not. Nobody at the sales centre is going to slow down and explain a disclosure statement in ${esc(lang)}. Uzair sits down with the whole family, not just the buyer, and goes through the deposit schedule, the completion date and what the contract actually commits them to — with the people writing the cheque. He was born in Pakistan and raised in Surrey.</p>` +
    `<h2>What Uzair does for ${esc(lang)} speaking buyers</h2>` +
    `<ul>` +
    `<li>Explains the contract and disclosure statement in ${esc(lang)}, to the buyer and their parents.</li>` +
    `<li>Reads the whole document inside BC's 7-day rescission window, before it is binding.</li>` +
    `<li>Works out the real cost: GST, property transfer tax, rebates, deposit dates, and the mortgage at completion.</li>` +
    `<li>Represents buyers only. He has never represented a developer.</li>` +
    `</ul>` +
    `<h2>Talk to Uzair before registering at the sales centre.</h2>` +
    `<p>Once a buyer registers directly with a project, their representation options can become more limited, depending on that developer's rules. Asking first costs nothing. Undoing it later is harder. If you have already registered, tell Uzair — he will explain what options may still be open.</p>` +
    `<p><a href="${SITE}/contact">Talk to Uzair first</a>.</p>` +
    `<h2>Frequently Asked Questions</h2>` +
    faqs.map((f) => `<div><h3>${esc(f.q)}</h3><p>${esc(f.a)}</p></div>`).join("") +
    `<nav aria-label="Related"><h2>Related</h2><ul>` +
    `<li><a href="${SITE}/surrey">Surrey Presale Condos</a></li>` +
    `<li><a href="${SITE}/langley">Langley Presale Townhomes</a></li>` +
    `<li><a href="${SITE}/abbotsford">Abbotsford Presale Condos</a></li>` +
    `<li><a href="${SITE}/south-asian-buyers">South Asian Buyers — First-Generation Guide</a></li>` +
    `<li><a href="${SITE}/contact">Contact Uzair</a></li>` +
    `</ul></nav>` +
    jsonLd(breadcrumb(crumb, path)) +
    jsonLd(faqPage(faqs))
  );
}

function southAsianBuyersBody(): string {
  const path = "/south-asian-buyers";
  const faqs = [
    { q: "Is Uzair used to working with first-generation South Asian buyers?", a: "Yes. Most of Uzair Muhammad's clients are South Asian and many are the first in their family to buy a home in Canada. He works in Punjabi, Hindi, Urdu and English, and regularly sits down with parents to walk through the contract in their own language." },
    { q: "What government programs can first-time buyers stack on a new home?", a: "Canada's enhanced First-Time Buyer GST rebate can save up to $50,000 on qualifying new homes under the cap. BC's Newly-Built Home PTT exemption can remove property transfer tax on qualifying homes up to $1.1M. Eligibility depends on the buyer's situation and the rules change — Uzair models whether it is likely to apply, and buyers should confirm with a tax professional or lawyer." },
    { q: "Does it cost extra to have Uzair represent the buyer?", a: "No. For many presale projects, buyer representation is paid through the project's sales structure. Uzair explains exactly how it works before you move forward." },
  ];
  return (
    `<h1>Buying a presale when nobody in the family has done it in Canada before.</h1>` +
    `<p>Most of Uzair Muhammad's clients are South Asian, and many are the first in their family to buy a home in Canada. Uzair works in Punjabi, Hindi, Urdu and English, represents buyers only, and sits down with the whole family — including the parents funding the deposit — to walk through the contract.</p>` +
    `<h2>There is no family playbook.</h2>` +
    `<p>Most of Uzair's clients are South Asian, and many are the first in their family to buy a home in Canada. There is no parent who has already done this here to ask. Every step is new, and the sales centre is not going to slow down and explain it.</p>` +
    `<h2>The deposit is a family decision.</h2>` +
    `<p>In most Fraser Valley presale purchases, parents help with the deposit. The buyer speaks English. The parents putting up the money often do not. Nobody at the sales centre is going to explain a hundred-page disclosure statement in Punjabi, Hindi or Urdu. Uzair sits down with the whole family and goes through the deposit schedule, the completion date and what the contract actually commits them to — with the people writing the cheque.</p>` +
    `<h2>What to tell your parents.</h2>` +
    `<p>Uzair will explain the deposit schedule, the completion timeline and the contract terms directly to them, in Punjabi, Hindi or Urdu. He was born in Pakistan and raised in Surrey, and most of his business comes from referrals by families he has already sat down with.</p>` +
    `<h2>The money most first-time buyers miss.</h2>` +
    `<p>Canada's enhanced First-Time Buyer GST rebate can save up to $50,000 on qualifying new homes under the cap, and BC's Newly-Built Home PTT exemption can remove property transfer tax on qualifying homes up to $1.1M. Eligibility depends on the buyer's situation and the rules change — Uzair models whether it is likely to apply, and buyers should confirm with a tax professional or lawyer.</p>` +
    `<h2>Talk to Uzair before registering at the sales centre.</h2>` +
    `<p>Once a buyer registers directly with a project, their representation options can become more limited, depending on that developer's rules. Asking first costs nothing. Undoing it later is harder. If you have already registered, tell Uzair — he will explain what options may still be open.</p>` +
    `<p><a href="${SITE}/contact">Talk to Uzair first</a>.</p>` +
    `<h2>Frequently Asked Questions</h2>` +
    faqs.map((f) => `<div><h3>${esc(f.q)}</h3><p>${esc(f.a)}</p></div>`).join("") +
    `<nav aria-label="Related"><h2>Related</h2><ul>` +
    `<li><a href="${SITE}/punjabi-speaking-realtor">Punjabi Speaking Realtor</a></li>` +
    `<li><a href="${SITE}/hindi-speaking-realtor">Hindi Speaking Realtor</a></li>` +
    `<li><a href="${SITE}/urdu-speaking-realtor">Urdu Speaking Realtor</a></li>` +
    `<li><a href="${SITE}/surrey">Surrey Presale Condos</a></li>` +
    `<li><a href="${SITE}/langley">Langley Presale Townhomes</a></li>` +
    `<li><a href="${SITE}/abbotsford">Abbotsford Presale Condos</a></li>` +
    `</ul></nav>` +
    jsonLd(breadcrumb("South Asian Buyers", path)) +
    jsonLd(faqPage(faqs))
  );
}

export const CITY_META: Record<string, Meta> = {
  "/surrey": { title: "Surrey Presale Condos & New Homes" + SUFFIX, description: "Compare Surrey presale condos and townhomes with buyer-side guidance on pricing, floor plans, deposits, developers and completion.", image: DEFAULT_IMAGE },
  "/langley": { title: "Langley Presale Condos & Townhomes" + SUFFIX, description: "Compare new condos and townhomes in Langley with buyer-side guidance on projects, floor plans, deposits and long-term fit.", image: DEFAULT_IMAGE },
  "/abbotsford": { title: "Abbotsford Presale Condos & New Homes" + SUFFIX, description: "Compare Abbotsford presale condos and townhomes with buyer-side guidance on pricing, floor plans, developers and long-term fit.", image: DEFAULT_IMAGE },
  "/chilliwack": { title: "Chilliwack Presale Condos & Townhomes" + SUFFIX, description: "Compare Chilliwack presales with buyer-side guidance on pricing, developers, floor plans and long-term fit.", image: DEFAULT_IMAGE },
  "/maple-ridge": { title: "Maple Ridge Presale Condos & Townhomes" + SUFFIX, description: "Buyer-side guidance for new condos and townhomes in Maple Ridge. Compare projects, pricing, layouts and long-term fit.", image: DEFAULT_IMAGE },
  "/coquitlam": { title: "Coquitlam Presale Condos & Townhomes" + SUFFIX, description: "Compare Coquitlam presales in Burquitlam, Coquitlam Centre and Burke Mountain with buyer-side guidance.", image: DEFAULT_IMAGE },
  "/delta": { title: "Delta Presale Condos & Townhomes" + SUFFIX, description: "Buyer-side guidance for presale condos and townhomes in Tsawwassen, Ladner and North Delta.", image: DEFAULT_IMAGE },
  "/burnaby": { title: "Burnaby Presale Condos | Metrotown, Brentwood & Lougheed", description: "Compare Burnaby presales in Metrotown, Brentwood, Lougheed and Edmonds with buyer-side project and pricing analysis.", image: DEFAULT_IMAGE },
};

import { CITY_DEPTH } from "../src/data/cityDepth";

interface CityContent { name: string; intro: string; why: string; faqs: { q: string; a: string }[]; }

const CITY_CONTENT: Record<string, CityContent> = {
  "/surrey": { name: "Surrey", intro: "Surrey Presale Condos — 35 Active Developments from $299,900. Compare the project before you buy the project. Surrey has one of the Fraser Valley's deepest new-construction markets. That creates opportunity — and a lot to compare. From Surrey City Centre and Fleetwood to South Surrey, I help buyers evaluate projects on pricing, floor plans, deposit structures, location, developer and long-term fit before committing.", why: "How should you choose a Surrey presale? Start with your goal, not the building. A first-time buyer, investor and growing family can look at the same project and reach three different conclusions. I help you compare the active options from your side — not rank them by whichever development is launching this weekend. What matters when comparing Surrey presales: Location Within Surrey — Surrey City Centre, Fleetwood, Clayton, South Surrey and other submarkets serve very different buyers and long-term demand. Floor Plan & Price — a lower purchase price doesn't automatically mean better value; layout efficiency, usable space and nearby comparisons matter. Purchase Terms — deposit timing, completion dates and assignment provisions can materially change how a purchase works for you. The Bigger Picture — transit, neighbourhood development, amenities and competing future supply all deserve consideration.", faqs: [ { q: "Who should I talk to before buying a Surrey presale?", a: "Uzair Muhammad represents buyers, not developers in Surrey — no developer commissions, no builder allegiances. 450+ families helped, every contract reviewed line-by-line, and every recommendation ranked by resale strength, deposit structure, and assignment terms — not by who's paying the most incentive that month." }, { q: "How much deposit should I prepare for?", a: "Most Surrey developers ask for 15–20% staged over 12–24 months. In softer market windows we regularly negotiate 10% structures on select projects. I flag every deposit milestone in writing before you sign so nothing surprises you at 30/60/90 days." }, { q: "How do Surrey City Centre and Fleetwood compare?", a: "City Centre benefits from SkyTrain, SFU Surrey, the new hospital expansion and rezoned density. Fleetwood offers lower entry pricing and a SkyTrain corridor that hasn't fully repriced yet. I compare $/sqft, floorplate efficiency and holding costs on both before I let a client sign." }, { q: "Can a Surrey presale be assigned before completion?", a: "Most Surrey contracts allow assignments after a certain milestone, usually with a 1–3% developer fee and lifting clauses that control when you can list. I review the assignment clause before you sign so the exit strategy is real, not theoretical." }, { q: "What should I compare besides the purchase price?", a: "Floor plan efficiency, deposit structure, developer track record and how the project compares to nearby resale all matter as much as the sticker price. I walk through all of it before you decide." } ] },
  "/langley": { name: "Langley", intro: "Langley Presale Condos — 23 Active Developments from $299,000. More space. More growth. More projects to compare. Langley has become one of the Fraser Valley's most active new-home markets, especially for buyers looking for townhomes and family-oriented communities. Willoughby, Latimer Heights and Central Langley each offer something different. I help you figure out which one actually fits your goal.", why: "How should you choose a Langley presale? Don't start with the incentive. Start with the life you expect to have when the home completes. We compare the area, property type, layout, price, deposit schedule and future market before choosing the project. What matters when comparing Langley presales: Condo vs. Townhome — the right property type depends on budget, family needs, rental strategy and how long you expect to hold it. Deposit Timing — townhome deposits can require significant capital long before completion, so the schedule needs to fit your actual cash flow. Floor Plan Function — garage configuration, bedroom placement, storage and usable interior space matter enormously in family homes. Long-Term Location — transit, schools, neighbourhood growth and competing supply all affect the eventual buyer pool.", faqs: [ { q: "How do I compare Langley presale townhomes?", a: "Uzair Muhammad — Langley presale specialist representing buyers, not developers, with 450+ families helped across Willoughby, Latimer Heights and Central Langley. Every project shortlist is ranked by developer track record, delivery history, deposit terms and assignment rights — not by builder incentives." }, { q: "Is Willoughby right for my situation?", a: "Willoughby remains one of the best-supplied townhome nodes in Metro Vancouver, but supply matters — some phases are priced above resale. I compare active phases against nearby resale comps so you don't overpay because a rendering looks good." }, { q: "How much deposit should I plan for?", a: "Townhomes typically run 15–20% staged; select projects negotiate to 10%. I confirm the full deposit ladder in writing before you sign anything at the presentation centre." }, { q: "Should I choose a condo or townhome?", a: "It depends on your budget, family needs, rental strategy and how long you expect to hold the property. I walk through the trade-offs before you shortlist projects." }, { q: "What should I check before signing?", a: "The reps at the presentation centre work for the developer. My job is to sit on your side of the table, cross-reference contracts, and make sure the deposit protection, disclosure statement and Rescission Act rights are actually enforced." } ] },
  "/abbotsford": { name: "Abbotsford", intro: "Abbotsford Presale Condos — 21 Active Developments from $279,900. Lower entry price doesn't remove the need for scrutiny. Abbotsford can offer a more attainable entry point into new construction than many Metro Vancouver markets. That doesn't make every project a good buy. I help first-time buyers and investors compare the University District, Historic Downtown and other Abbotsford projects on price, layout, demand, developer and long-term fit.", why: "How should you choose an Abbotsford presale? Affordability is only one part of the decision. We look at what you're getting for the price, who the eventual buyer or tenant may be, how nearby resale compares and whether the project makes sense for your timeline. What matters when comparing Abbotsford projects: Entry Price — Abbotsford can provide a lower starting point, but value still depends on what you're buying. Rental & Resale Demand — university-oriented, downtown and family locations attract different future buyers and tenants. Developer & Project Quality — lower prices don't excuse weak fundamentals. Cash Flow & Completion — your deposit schedule and eventual mortgage still need to work even if the entry price feels accessible.", faqs: [ { q: "How do I compare Abbotsford presales?", a: "Uzair Muhammad — represents buyers, not developers — no bias, 450+ families helped across the Fraser Valley. In Abbotsford I focus on developer solvency, disclosure statements and realistic completion timelines, because this is a market where a bad developer can hurt you more than a bad location." }, { q: "Is Abbotsford right for a first-time buyer?", a: "Yes — entry pricing is 20–30% below Surrey with the same GST rebate, first-time buyer exemptions, and 5% CMHC-insured down payment options on new construction. It's often the best route into ownership if your job isn't tied to downtown Vancouver." }, { q: "What should an investor look at?", a: "Rental and resale demand near the university and downtown core, developer track record, and whether the deposit schedule and eventual mortgage still work at completion — not just the low entry price." }, { q: "How much deposit should I expect?", a: "15% is the norm, but on newer launches 10% staged deposits are increasingly common. I confirm every milestone in writing before you sign." }, { q: "How do I evaluate the developer?", a: "Before you sign I check REDMA registration, prior completed projects, financing status of the current project, and any active litigation. That check is free and it's non-negotiable on my side." } ] },
  "/chilliwack": { name: "Chilliwack", intro: "Chilliwack Presales: More Attainable Doesn't Mean Automatic. Compare quality, not just price. Chilliwack can offer some of the Fraser Valley's most attainable new construction. For buyers willing to look farther east, that can create interesting options. But affordability is only useful when the project itself makes sense.", why: "How should you choose a Chilliwack presale? Treat the lower entry price as the beginning of the analysis, not the conclusion. Compare the developer, neighbourhood, floor plan, purchase terms and future buyer pool. Why Chilliwack deserves a closer look: More Attainable Entry Points — for some buyers, Chilliwack opens options that simply aren't available farther west. Project Quality Still Matters — a lower price doesn't compensate for the wrong development. Lifestyle — outdoor recreation and a different pace of life can be a real part of the decision. Long-Term Fit — make sure the location works for your life, not just your spreadsheet.", faqs: [ { q: "How do I compare Chilliwack presales?", a: "Uzair Muhammad — 450+ families helped across the Fraser Valley, representing buyers, not developers. In Chilliwack I focus on developer track record, deliverability and honest resale comparisons, because 'cheap' means nothing if the project stalls or completes poorly." }, { q: "Who is Chilliwack best suited for?", a: "Buyers willing to look farther east for a lower entry price, and who value outdoor recreation and a different pace of life alongside the numbers. The price-per-sqft is the lowest in the region, and population growth continues." }, { q: "How much deposit should I expect?", a: "Usually 10–15% staged over 12–18 months. Chilliwack is often the market where you can negotiate the softest deposit ladder in the province — I ask for it in writing on every offer." }, { q: "How should I evaluate a developer?", a: "Every Chilliwack presale I recommend goes through disclosure review — deposit protection, phasing risk, marketing statements versus binding contract terms. It's part of my job as your buyer's agent, not an extra." }, { q: "What should I review before committing?", a: "Developer track record, deliverability, floor plan efficiency, deposit terms and how the project compares with nearby resale — not just the advertised price." } ] },
  "/maple-ridge": { name: "Maple Ridge", intro: "Maple Ridge Presale Condos — 3 Active Developments from $749,900. Lifestyle first. Investment thesis second. Maple Ridge can offer a compelling combination of space, outdoor access and connection to Metro Vancouver. For some buyers, that's exactly the point. I help you compare new projects based on how they fit your actual life and long-term plans — not just a projected appreciation story.", why: "How should you choose a Maple Ridge presale? Make sure you would still like the purchase even if the market doesn't do anything dramatic. Strong real estate decisions should work before appreciation enters the conversation. What matters when comparing Maple Ridge presales: Lifestyle Fit — commute, nature, space and community may matter more here than in a downtown tower decision. Limited Supply — scarcity can help, but only if the project itself is strong. Floor Plan — buy the home people will still want to live in later. Long-Term Demand — think about who the eventual buyer or renter is likely to be.", faqs: [ { q: "How do I compare Maple Ridge presales?", a: "Uzair Muhammad — representing buyers, not developers, across the Fraser Valley, 450+ families helped. In Maple Ridge I focus on projects where the developer has proven Metro Vancouver delivery and the resale liquidity supports your exit plan." }, { q: "Is Maple Ridge right for a first-time buyer?", a: "Yes — pricing sits well below Coquitlam and Port Moody, first-time buyer exemptions apply to eligible units, and the West Coast Express keeps commuting realistic. I'll show you exactly how the numbers work versus renting or resale." }, { q: "What deposit should I expect?", a: "Most Maple Ridge presales are 15% staged. Newer launches sometimes structure 10% ladders — I always ask." }, { q: "How should I evaluate long-term demand?", a: "Think about who the eventual buyer or renter is likely to be — commute patterns, family demand and competing supply all shape resale years from now." }, { q: "What should I review before signing?", a: "Contract review, disclosure review and deposit-protection checks are included, and I always run them inside the 7-day rescission window so you keep the right to walk away if something's off." } ] },
  "/coquitlam": { name: "Coquitlam", intro: "Coquitlam Presale Condos — 27 Active Developments from $399,900. Burquitlam, Coquitlam Centre and Burke Mountain are three very different decisions. Coquitlam has a deep new-construction market. The challenge isn't finding a project. It's understanding which location, building and unit make sense for your goal. I compare active presales against nearby resale and competing projects before recommending anything.", why: "How should you choose a Coquitlam presale? Compare the submarket first. Then the project. Then the unit. A strong neighbourhood doesn't automatically make every development or floor plan a strong purchase. What matters when comparing Coquitlam projects: Submarket — Burquitlam, Coquitlam Centre and Burke Mountain serve different lifestyles and buyer profiles. Price vs. Resale — new construction should be evaluated against what already exists nearby. Floor Plan — the unit still needs to make sense when the marketing centre is gone. Timing — completion date and deposit structure need to match your personal financial plan.", faqs: [ { q: "How do I compare Coquitlam presales?", a: "Uzair Muhammad — 450+ families helped, represents buyers, not developers — no developer allegiances. Coquitlam is a market where developer choice matters as much as location; my job is to compare disclosure statements and delivery history, not to sell you the tower with the biggest realtor incentive." }, { q: "Burquitlam or Coquitlam Centre?", a: "It depends on lifestyle and buyer profile — Burquitlam skews toward transit-oriented buyers, Coquitlam Centre toward larger, family-friendly developments. I compare both against nearby resale before recommending either." }, { q: "Is Burke Mountain right for my family?", a: "Burke Mountain has real long-term fundamentals — school catchments, family demographics and limited resale supply — but pricing on some phases now competes directly with resale in Port Moody. I model each phase against comps before I recommend it." }, { q: "How much deposit should I expect?", a: "Most Coquitlam towers ask 15–20% staged over 12–24 months. On specific launches I've negotiated 10% ladders — I always confirm in writing before you sign anything." }, { q: "What should I review before committing?", a: "Rental caps, short-term rental bylaws and assignment clauses before you commit — those three items decide whether the investment case actually holds up, alongside the disclosure statement and deposit ladder." } ] },
  "/delta": { name: "Delta", intro: "Delta Presale Condos — 4 Active Developments from $469,900. Fewer projects makes choosing the right one more important. Delta's new-construction market is smaller than Surrey or Burnaby. Tsawwassen, Ladner and North Delta also behave very differently. I help buyers evaluate the local market, project, price, floor plan and purchase terms before making a decision.", why: "How should you choose a Delta presale? Start by deciding which part of Delta actually fits your lifestyle or investment goal. Then compare the project within that context. What matters when comparing Delta presales: Three Different Markets — Tsawwassen, Ladner and North Delta aren't interchangeable. Limited New Supply — fewer launches can create scarcity, but scarcity alone doesn't make something a good buy. Layout & Property Type — townhome, condo and family-oriented product appeal to different future buyers. Terms & Timing — deposit structure and completion timing still need to work for you.", faqs: [ { q: "How do I compare Delta presales?", a: "Uzair Muhammad — represents buyers, not developers, 450+ families helped. In Delta I focus on smaller launches where developer quality and disclosure terms carry more weight than in larger, denser markets. No developer bias, no upselling." }, { q: "Tsawwassen, Ladner or North Delta?", a: "Tsawwassen has strong owner-occupier demand, an ageing population that anchors resale, and limited new supply — good fundamentals. Ladner and North Delta behave differently on resale and rent, with thinner rental demand — I'll steer you based on your actual goal." }, { q: "How much deposit should I expect?", a: "Typically 15% staged. Smaller developers occasionally negotiate 10% for early VIP buyers — I ask on every project." }, { q: "What should I look for in a Delta project?", a: "Which submarket fits your goal, how the layout and property type appeal to future buyers or tenants, and whether the deposit structure and completion timing work for you." }, { q: "What should I review before signing?", a: "The disclosure statement — deposit protection, phasing risk, and any binding-versus-marketing gaps are all part of the review. It's included, not an add-on." } ] },
  "/burnaby": { name: "Burnaby", intro: "Burnaby Presale Condos — 10 Active Developments from $399,900. In a market with this much new supply, comparison matters. Metrotown. Brentwood. Lougheed. Edmonds. Burnaby offers a large number of new-construction choices — often at very different price points relative to nearby resale. I help buyers compare the premium they're paying for new construction and decide whether the specific project and unit justify it.", why: "How should you choose a Burnaby presale? Don't ask only, \u201cIs this a good project?\u201d Ask, \u201cIs this a good project at this price?\u201d That's the comparison that matters. What matters when comparing Burnaby presales: New vs. Resale Pricing — Burnaby often has a meaningful new-construction premium, and you should know what you're paying for it. Transit-Oriented Location — being near SkyTrain matters, but station proximity alone doesn't guarantee value. Tower Competition — future competing inventory can influence rents and resale. Floor Plan Efficiency — in high-priced markets, wasted square footage gets expensive quickly.", faqs: [ { q: "How do I compare Burnaby presales?", a: "Uzair Muhammad — represents buyers, not developers, 450+ families helped. In Burnaby that means comparing your unit against active resale in the same tower node, not against the developer's rendering. No incentives-driven recommendations." }, { q: "Brentwood or Metrotown?", a: "It depends on your holding period and rental strategy. Metrotown has deeper resale liquidity; Brentwood has newer supply and more rental demand from young professionals. I'll model the specific projects you're considering against resale comps before you sign." }, { q: "How much premium should I pay for new construction?", a: "Enough to know the number, not guess it. I compare the presale price per square foot against nearby resale so you can see exactly what premium you're paying and decide if it's worth it." }, { q: "What should investors compare?", a: "Rental demand at the specific node, future competing supply, and floor plan efficiency — not just the SkyTrain proximity story." }, { q: "What should I review before committing?", a: "Most Burnaby developers allow assignments with a 1–3% fee and lifting clauses controlling MLS timing. I review the assignment clause before you sign so the exit strategy is real, not theoretical." } ] },
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
  const dot = c.intro.indexOf(". ");
  const headline = dot > 0 ? c.intro.slice(0, dot) : `${c.name} Presale Condos & New Homes`;
  const introRest = dot > 0 ? c.intro.slice(dot + 2) : c.intro;
  return (
    `<h1>${esc(headline)}</h1>` +
    `<p>${esc(introRest)}</p>` +
    `<h2>How should you choose a ${esc(c.name)} presale?</h2><p>${esc(c.why)}</p>` +
    (CITY_DEPTH[path.slice(1)] || [])
      .map((sec) => `<h2>${esc(sec.heading)}</h2>` + sec.body.map((b) => `<p>${esc(b)}</p>`).join(""))
      .join("") +
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
  image?: string;
}

// Slugs that have a real 1200x630 PNG committed at public/og/<slug>.png.
// Any FUNNEL page NOT in this set falls back to DEFAULT_IMAGE so we never
// ship a broken link-preview.
const FUNNEL_OG_SLUGS = new Set<string>([
  "new-to-presale-start-here",
  "buy-presale-fraser-valley",
  "presale-mistakes-fraser-valley",
  "fraser-valley-presale-investment-advice",
  "best-presale-realtor-fraser-valley",
  "buyer-representation-presale-fraser-valley",
]);

function funnelImage(path: string): string {
  const slug = path.replace(/^\//, "");
  if (FUNNEL_OG_SLUGS.has(slug)) return `${SITE}/og/${slug}.png`;
  return DEFAULT_IMAGE;
}

const TRACK_RECORD_LINE =
  "450+ families helped · $200M+ in new homes · 4.9 stars on Google.";

export const FUNNEL: Record<string, FunnelPage> = {
  "/new-to-presale-start-here": {
    title: "New to Presale? Start Here — Uzair's Plain-English Guide",
    description: "New to presale condos in BC? I'm Uzair — presale specialist who represents buyers, not developers. Learn what a presale is, how it differs from resale, and whether it's right for your first home.",
    h1: "New to Presale? Start Here — Uzair's Plain-English Guide",
    breadcrumbName: "New to Presale — Start Here",
    intro: "I'm Uzair Muhammad, a presale specialist who represents buyers, not developers in the Fraser Valley. If you've never bought a presale condo before, this page is your plain-English starting point — what a presale actually is, how it differs from resale, whether it makes sense for your first home, and how I help buyers avoid the traps developers won't warn you about.",
    sections: [
      { h: "What is a presale condo, really?", p: "A presale is a new home you buy from the developer before it's built. You sign a contract, pay staged deposits, and take keys when the building completes — often 12 to 36 months later. In BC the developer must give you a Disclosure Statement and a 7-day rescission window." },
      { h: "Presale vs resale — which is right for you?", p: "Resale already exists — tour it, finance it, move in. Presale is bought on paper — better pricing potential, no bidding war, new-home warranty, but you carry construction and market risk between contract and completion." },
      { h: "Is presale right for a first home?", p: "Sometimes yes — you lock in today's price with time to save and get a brand-new home with builder warranty. Sometimes no — if you need to move in six months, or your income won't support the mortgage at completion, resale is safer." },
      { h: "How I help — buyer-first representation", p: "I represent buyers only. For many presale projects my commission is paid through the project's sales structure, and I represent you — never the builder. I'll explain exactly how it works on your project before you move forward. Going direct to the sales centre doesn't save you money — it removes your representation from the deal." },
    ],
    faqs: [
      { q: "What is a presale condo in BC?", a: "A presale (pre-construction) condo is a new home you buy directly from the developer before it's built — often 12 to 36 months before completion. Staged deposits, close at completion. Protected in BC by a Disclosure Statement and a 7-day rescission window." },
      { q: "Is buying presale a good idea for a first-time buyer?", a: "It can be — you lock in today's price and control a new home with a smaller upfront deposit. It's only smart if the project, contract and location pencil out. I only recommend presales that make sense for a first-time buyer's timeline." },
      { q: "What's the difference between presale and resale?", a: "Resale is built — tour, finance, move in weeks. Presale is on paper — deposits now, keys later, warranty, GST applies. Presale can mean better pricing and no bidding war but carries construction and market risk." },
      { q: "How much money do I actually need to start?", a: "Most Fraser Valley developers ask 15–20% staged over 12–24 months; softer windows allow 10% ladders. On a $600,000 home that's often $30,000–$60,000 at signing." },
      { q: "How do I actually get started with you?", a: "Book a Buyer Strategy Call. I'll ask your budget and timeline, then either shortlist presales or tell you honestly if presale isn't right for you now. Buyer-first, no cost, no pressure." },
    ],
    related: [
      { href: "/buy-presale-fraser-valley", label: "How to Buy a Presale in the Fraser Valley" },
      { href: "/presale-mistakes-fraser-valley", label: "Presale Mistakes I See Fraser Valley Buyers Make" },
      { href: "/buyer-representation-presale-fraser-valley", label: "Do You Need Your Own Realtor for a Presale?" },
    ],
  },
  "/buy-presale-fraser-valley": {
    title: "How to Buy a Presale in the Fraser Valley (With Uzair)",
    description: "I'm Uzair — presale specialist who represents buyers, not developers. Step-by-step guide to buying a presale condo in Surrey, Langley, Abbotsford and the Fraser Valley: deposits, rescission, GST and timing.",
    h1: "How to Buy a Presale in the Fraser Valley (With Uzair)",
    breadcrumbName: "How to Buy a Presale in the Fraser Valley",
    intro: "I'm Uzair Muhammad, presale specialist who represents buyers, not developers for the Fraser Valley. Buying a presale isn't like buying resale — the deposit ladder, rescission window, GST rules and disclosure statement all move on the developer's schedule. Here's the step-by-step I run with every buyer, and exactly when in the process you should call me — before you set foot in a presentation centre.",
    sections: [
      { h: "My step-by-step", p: "Step 1: talk before you register. Step 2: I shortlist 2–3 projects fitting your budget and timeline. Step 3: VIP allocation before public launch. Step 4: 7-day rescission — contract review, disclosure statement, financing. Step 5: staged deposits and completion." },
      { h: "Deposits", p: "Fraser Valley developers typically ask 15–20% staged over 12–24 months. Often 5% at signing, another 5% within 30–90 days, balance at milestones. I flag every deposit date in writing." },
      { h: "The 7-day rescission window", p: "BC law gives you seven days to walk away with no penalty. That window is when your realtor and lawyer review the contract, disclosure statement and deposit protection. Skip it at your own risk." },
      { h: "GST and the New Housing Rebate", p: "5% GST applies to new construction. Principal residences under the price cap may qualify for the partial GST New Housing Rebate. I walk you through the calculation before you commit." },
      { h: "When to call me — before the sales centre", p: "Once you register with a developer their sales rep is credited as your representative. Call me first — even a five-minute call protects your right to independent buyer-first representation." },
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
    description: "I'm Uzair — presale specialist who represents buyers, not developers. The Fraser Valley presale mistakes I see most: registering with developers first, skipping disclosure, bad floor plans, no exit plan.",
    h1: "Presale Mistakes I See Fraser Valley Buyers Make",
    breadcrumbName: "Presale Mistakes Fraser Valley",
    intro: "I'm Uzair Muhammad, and I've helped 450+ families close on presales in the Fraser Valley. The same mistakes come up over and over — and they cost real money. Here they are: registering with the developer first, trusting the sales-centre rep, skipping the disclosure statement, ignoring assignment/rescission, choosing bad floor plans, mismanaging GST and deposit timing, and buying without an exit plan.",
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
    description: "I'm Uzair — presale specialist who represents buyers, not developers. Honest Fraser Valley presale investment advice: which cities, rental demand, assignment strategy, and when NOT to buy. No hype.",
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
    description: "I'm Uzair Muhammad — presale specialist who represents buyers, not developers for the Fraser Valley. 450+ families helped, 4.9 stars on Google. Talk to me before any developer sales centre.",
    h1: "Best Presale Realtor in the Fraser Valley — Talk to Uzair Before Any Developer",
    breadcrumbName: "Best Presale Realtor Fraser Valley",
    intro: "I'm Uzair Muhammad — Fraser Valley's presale specialist who represents buyers, not developers. 450+ families helped, $200M+ in sales volume, 5 years focused on presale, 4.9 stars on Google. I don't represent developers, ever — only buyers. If you're thinking about a presale condo or townhome anywhere in the Fraser Valley, talk to me before you set foot in a developer's sales centre.",
    sections: [
      { h: "Why me — and why buyer-first?", p: "Almost every realtor sells presales occasionally. I've built a full-time practice on it. For many presale projects my commission is paid through the project's sales structure, and I represent you — never the builder. I'll explain exactly how it works on your project before you move forward." },
      { h: "Track record", p: TRACK_RECORD_LINE },
      { h: "Languages and service area", p: "English, Punjabi, Hindi, Urdu — across Surrey, Langley, Abbotsford, Coquitlam, Delta, Burnaby South, White Rock, Cloverdale, Chilliwack, Maple Ridge, New Westminster." },
      { h: "What working with me looks like", p: "A Buyer Strategy Call. Shortlist of 2–3 projects that actually fit, with VIP access to pre-public allocations. Line-by-line contract review before you sign." },
      { h: "See the full platform + live projects", p: "For live inventory and the full brokerage platform, visit presaleproperties.com — the full platform + live projects." },
    ],
    faqs: [
      { q: "Who is the best presale realtor in the Fraser Valley?", a: "Uzair Muhammad — presale specialist who represents buyers, not developers covering Surrey, Langley, Abbotsford, Coquitlam, Delta, Burnaby, Chilliwack, Maple Ridge. 450+ families helped, 4.9 stars on Google." },
      { q: "Why work with a presale specialist who represents buyers, not developers?", a: "Because the person at the sales centre is paid by the developer. A buyer-first realtor represents you instead. For many presale projects that representation is paid through the project's sales structure, so it typically costs the buyer nothing — I'll confirm exactly how it works on your specific project." },
      { q: "What languages do you work in?", a: "English, Punjabi, Hindi and Urdu. About a third of my buyers prefer to run through the contract in one of those languages." },
      { q: "What area do you actually cover?", a: "The Fraser Valley and much of Metro Vancouver — Surrey, Langley, Abbotsford, Coquitlam, Delta, Burnaby South, White Rock, Cloverdale, Chilliwack, Maple Ridge, New Westminster." },
      { q: "How do I hire you?", a: "Book a Buyer Strategy Call — no cost, no pressure. If we're a fit, I add you to my VIP list and we shortlist projects." },
    ],
    related: [
      { href: "/buyer-representation-presale-fraser-valley", label: "Do You Need Your Own Realtor for a Presale?" },
      { href: "/presale-mistakes-fraser-valley", label: "Presale Mistakes I See Fraser Valley Buyers Make" },
      { href: "/fraser-valley-presale-investment-advice", label: "Fraser Valley Presale Investment Advice" },
    ],
  },
  "/buyer-representation-presale-fraser-valley": {
    title: "Do You Need a Realtor for a BC Presale? Yes — Here's Why",
    description: "I'm Uzair — presale specialist who represents buyers, not developers. who the sales-centre rep really works for, and why you need your own realtor on every BC presale.",
    h1: "Do You Need Your Own Realtor for a Presale? (Yes — Here's Why)",
    breadcrumbName: "Buyer Representation for Presale",
    intro: "I'm Uzair Muhammad, presale specialist who represents buyers, not developers for the Fraser Valley. The most common question I get is: do I really need my own realtor if I'm buying a presale? Short answer: yes — because for many presale projects it costs the buyer nothing and gives you someone on your side. Here's the full picture: who the sales-centre rep actually works for, why the developer pays your agent's commission anyway, and what you lose by skipping representation.",
    sections: [
      { h: "The thesis, in one line", p: "The developer already built a buyer's-agent commission into the price of every presale. If you don't hire your own realtor, the developer keeps that commission — you don't save a dollar. All you save is having someone on your side of the table." },
      { h: "Who does the sales-centre rep actually represent?", p: "Not you. Their client is the developer. They're paid to move the developer's inventory, not to warn you when a floor plan is inefficient or a competing project is a better deal." },
      { h: "What a buyer's agent actually does", p: "Reviews the contract and Disclosure Statement line by line. Negotiates deposit ladders and incentives. Compares against active presales and resale comps. Tells you when a deal is bad." },
      { h: "How the fee works", p: "For many presale projects, buyer representation is paid through the project's sales structure. I'll explain exactly how it works on your project before you commit." },
    ],
    faqs: [
      { q: "Do I need my own realtor to buy a presale?", a: "Yes. The rep at the sales centre works for the developer. For many presale projects your own buyer's agent is paid through the project's sales structure — I'll explain exactly how it works on your project." },
      { q: "Does hiring a buyer's agent cost me anything?", a: "For many presale projects, buyer representation is paid through the project's sales structure. I'll walk you through the specific arrangement on your project before you commit." },
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
  "/first-time-buyers-fraser-valley": {
    title: "First-Time Buyers: Buy New Construction in the Fraser Valley",
    description: "I'm Uzair — presale specialist who represents buyers, not developers. How first-time buyers use presale + new construction to lock today's price, stage deposits, and stack the GST rebate and PTT newly-built exemption.",
    h1: "First-Time Buyers: How I Help You Buy New Construction in the Fraser Valley",
    breadcrumbName: "First-Time Buyers Fraser Valley",
    intro: "I'm Uzair Muhammad, presale specialist who represents buyers, not developers for the Fraser Valley. First-time buyers are half of who I represent — because presale and new construction are built for you. Lock today's price with a brand-new home, stage deposits over 12–24 months while you save, stack the up-to-$50,000 First-Time Buyer GST rebate and BC's Newly-Built Home PTT exemption, and get a full new-home warranty. For many presale projects, buyer representation is paid through the project's sales structure. Uzair will explain exactly how it works before you move forward, and tell you upfront if anything is different.",
    sections: [
      { h: "Why presale suits a first home", p: "You lock in today's price for a home that completes in 12–36 months — time to save, keep your job stable, and grow your down payment. You get a brand-new home under 2-5-10 warranty, no bidding wars, and a smaller cheque at signing than a resale down payment." },
      { h: "The up-to-$50,000 GST rebate + PTT newly-built exemption", p: "Canada's enhanced First-Time Buyer GST rebate can save you up to $50,000 on qualifying new homes under the cap. BC's Newly-Built Home PTT exemption removes property transfer tax on qualifying new homes to $1.1M. Stacked, that's a five-figure closing swing." },
      { h: "The 7-day rescission window and deposit protection", p: "BC law gives you a 7-day rescission after signing — that's when I review the contract, disclosure statement, deposit protection and financing. Your deposits sit in a lawyer's trust account under Real Estate Development Marketing Act rules, not the developer's chequing account." },
      { h: "My step-by-step for first-time buyers", p: "Free strategy call. Mortgage pre-qualification with a broker I trust. Shortlist 2-3 projects that fit your budget and completion timeline. VIP pre-public allocation. 7-day rescission review. Staged deposits. Walkthrough and keys at completion." },
      { h: "What representation costs you", p: "For many presale projects, buyer representation is paid through the project's sales structure. Uzair will explain exactly how it works before you move forward, and tell you upfront if anything is different. First-time buyers get the same buyer-first treatment as my repeat investor clients." },
    ],
    faqs: [
      { q: "Is presale a good idea for a first-time buyer?", a: "Often yes. You lock today's price with time to save, get a brand-new warrantied home, and can stack the First-Time Buyer GST rebate plus BC's Newly-Built PTT exemption. Only smart if the project, contract and completion timing fit your income — that's what I screen for." },
      { q: "How much money do I need to start on a Fraser Valley presale?", a: "Most Fraser Valley developers ask 15-20% staged over 12-24 months. On a $550,000 first home that's often ~$27,500 at signing and another 5% within 30-90 days — smaller upfront than a resale down payment." },
      { q: "What is the up-to-$50,000 First-Time Buyer GST rebate?", a: "Canada's enhanced GST rebate for first-time buyers of new construction can save up to $50,000 on qualifying homes under the price cap. Combined with BC's Newly-Built Home PTT exemption (to $1.1M), it's a real five-figure closing benefit — I model it before you commit." },
      { q: "Does using you cost me anything?", a: "For many presale projects, buyer representation is paid through the project's sales structure, so it typically costs the buyer nothing. Uzair confirms exactly how it works on your specific project before you commit." },
      { q: "What if my income or life changes before completion?", a: "That's why the 7-day rescission window matters — we pre-qualify financing then. I only recommend projects where the deposit ladder and completion timing fit your income, and we choose assignment-friendly contracts so you have a real exit if life changes." },
    ],
    related: [
      { href: "/new-to-presale-start-here", label: "New to Presale? Start Here" },
      { href: "/buy-presale-fraser-valley", label: "How to Buy a Presale in the Fraser Valley" },
      { href: "/buyer-representation-presale-fraser-valley", label: "Do You Need Your Own Realtor for a Presale?" },
      { href: "/how-i-help", label: "How I Help — Every Presale Scenario" },
    ],
  },
  "/investors-fraser-valley": {
    title: "Investors: Buy Presale & New Construction in Fraser Valley",
    description: "I'm Uzair — presale specialist who represents buyers, not developers. How I pick Fraser Valley presales for investors: cash-flow vs appreciation, Abbotsford + Surrey-Langley SkyTrain corridor, assignments, 2025 BC flipping tax.",
    h1: "Investors: How I Help You Buy Presale & New Construction in the Fraser Valley",
    breadcrumbName: "Investors Fraser Valley",
    intro: "I'm Uzair Muhammad, presale specialist who represents buyers, not developers for the Fraser Valley — and I invest in the same presales I recommend. Investors get honest picks, not brochure hype: which submarkets watch for cash flow (Abbotsford) versus appreciation (Surrey-Langley SkyTrain corridor: Willoughby, Latimer, ~2028/29), how to structure assignments around BC's 2025 flipping tax, and how to use deposit leverage to build a portfolio without over-extending.",
    sections: [
      { h: "How I pick projects — cash flow vs appreciation", p: "For cash flow: 1-bed + den in Abbotsford and University District — closer to break-even on a stress-tested mortgage than anywhere else in the region. For appreciation: Surrey City Centre and the Willoughby / Latimer corridor along the SkyTrain extension (opening ~2028/29). Different unit types, different holds, different exits." },
      { h: "Abbotsford — the near-break-even cash-flow watch", p: "Abbotsford is the cheapest presale entry in the region and rents have held up. Well-priced 1-bed + dens can get close to break-even on a stress-tested mortgage, especially with lower strata fees in newer buildings. Not every Abbotsford tower pencils — I model each one against resale comps before recommending." },
      { h: "Surrey-Langley SkyTrain corridor — the appreciation play", p: "The SkyTrain extension along Fraser Highway opens ~2028/29 through Willoughby and Latimer. Land assemblies are already trading on it. Buying presale now with 3-5 year completion targets the moment stations open — that's the appreciation thesis. Not guaranteed; sensitive to project selection and delivery timing." },
      { h: "Assignment strategy and BC's 2025 flipping tax", p: "Assignment lets you sell the contract before completion — powerful in a rising market, but BC's 2025 home-flipping tax (20% sliding to 0% between 366-730 days of ownership) now applies to presale assignments too. Structuring the hold and reviewing the assignment clause before signing is core to my investor work." },
      { h: "Deposit leverage and portfolio building", p: "A 20% presale deposit on a $600K unit controls a full home while your capital is tied up on ~$120K, not the whole purchase. That leverage — combined with 12-36 month completion — is how investors compound. Only works if you can carry deposit dates and the completion mortgage; I stress-test both." },
      { h: "When I tell investors NOT to buy", p: "When presale $/sqft is above active resale comps. When the deposit ladder outruns income. When appreciation depends on infrastructure five years out and the developer's track record is thin. I lose deals turning investors away — that's the job." },
    ],
    faqs: [
      { q: "Are Fraser Valley presales still worth it for investors in 2026?", a: "Selectively. Well-priced 1-bed + dens in Abbotsford watch closest to break-even for cash flow. The Surrey-Langley SkyTrain corridor (Willoughby, Latimer, opening ~2028/29) is the appreciation play. Weaker towers priced above nearby resale don't pencil — those I turn down." },
      { q: "Which Fraser Valley submarkets do you actually recommend for investors?", a: "For cash flow: Abbotsford (University District, downtown). For appreciation: Surrey City Centre, Fleetwood, and the Willoughby / Latimer SkyTrain corridor. For family-investor exits, 2-bed townhomes in Willoughby often outperform 1-bed condos on a hold." },
      { q: "How does BC's 2025 home-flipping tax apply to a presale assignment?", a: "The tax is 20% on property sold within 365 days of purchase, sliding to 0% by day 730 — and CRA treats presale assignments as taxable sales. Structuring the hold and confirming the assignment clause before signing is now essential; I model it into every investor scenario." },
      { q: "How much of my capital does a Fraser Valley presale actually tie up?", a: "Typically 15-20% staged over 12-24 months. On a $600K unit that's ~$90-120K over roughly two years — leveraging a full home while your capital is committed on a fraction of it. Only works if you can carry both the deposit ladder and the completion mortgage." },
      { q: "When would you tell an investor NOT to buy?", a: "When presale $/sqft is above resale comps, when the deposit ladder outruns income, or when appreciation depends on infrastructure five years out with a thin developer track record. Better to walk than lose a deposit." },
    ],
    related: [
      { href: "/fraser-valley-presale-investment-advice", label: "Fraser Valley Presale Investment Advice" },
      { href: "/presale-mistakes-fraser-valley", label: "Presale Mistakes I See Fraser Valley Buyers Make" },
      { href: "/surrey", label: "Surrey Presale Condos" },
      { href: "/langley", label: "Langley Presale Townhomes" },
      { href: "/abbotsford", label: "Abbotsford Presale Condos" },
      { href: "/how-i-help", label: "How I Help — Every Scenario" },
    ],
  },
  "/how-i-help": {
    title: "How I Help — Every Presale & New-Construction Scenario",
    description: "I'm Uzair — presale specialist who represents buyers, not developers. Every scenario I handle: first-time buyer, investor, upsizing, new detached, move-in-ready, assignments (buy or sell), VIP access, contract review.",
    h1: "How I Help — Every Presale & New-Construction Scenario, One Advisor",
    breadcrumbName: "How I Help",
    intro: "I'm Uzair Muhammad, presale and new-construction specialist who represents buyers, not developers for the Fraser Valley and Metro Vancouver. Whatever your situation — first home, first investment, upsizing, multigenerational, move-in-ready, or buying/selling an assignment — I'm the one advisor who handles all of it. Buyer-first, in English, Hindi, Urdu and Punjabi. 450+ families helped, $200M+ in sales volume, 4.9 stars on Google.",
    sections: [
      { h: "First-time buyer", p: "Presale lets you lock today's price with staged deposits, stack the up-to-$50,000 GST rebate and BC's Newly-Built PTT exemption, and get a warrantied brand-new home. Full walkthrough on the first-time buyer page." },
      { h: "Investor — cash flow or appreciation", p: "Abbotsford for near-break-even cash flow. Surrey-Langley SkyTrain corridor (Willoughby, Latimer, ~2028/29) for appreciation. I model each project against resale comps before recommending. Assignment structure and BC's 2025 flipping tax built into every plan." },
      { h: "Upsizing family — townhome or larger condo", p: "3-bed townhomes in Willoughby, Latimer, Clayton, Burke Mountain. Better yard-per-dollar than a detached, warranty on everything. I match plan to family size, school catchment and 5-10 year hold." },
      { h: "New detached or multigenerational home", p: "New-construction detached in South Surrey, Cloverdale, Willoughby, Burke Mountain — including legal suites and multigenerational layouts. Same buyer-first rules apply. I review builder contracts, allowances and completion timelines." },
      { h: "Move-in-ready new construction", p: "Sometimes presale doesn't fit — you need keys in 60-120 days. I track completed inventory across the region and represent you on completed new-construction the same way I do on presale, buyer-first." },
      { h: "Buying an assignment", p: "Assignments can be strong buys — original buyer needs out, motivated pricing. I vet the underlying contract, deposit paid, and remaining ladder before you take it over." },
      { h: "Selling your assignment", p: "If life changed and you need out before completion, I list your assignment through my buyer network and handle the developer approval, lifting date, and the 2025 flipping-tax calculation. Full advisor, not just a form-filler." },
      { h: "VIP early access", p: "My VIP list gets pre-public allocation on new project launches across the Fraser Valley and Metro Vancouver — usually the best pricing, incentives and floor-plan choice of the launch cycle." },
      { h: "Contract and deposit review", p: "Every contract I touch gets a line-by-line review: disclosure statement, deposit structure, assignment rights, material change clauses, completion window. Even if you've already found the project on your own, I'll review the contract before you sign." },
      { h: "Languages and track record", p: "English, Hindi, Urdu and Punjabi. 450+ families helped, $200M+ in sales volume, 5 years focused on presale, 4.9 stars on Google. Buyers, not developers — always." },
    ],
    faqs: [
      { q: "What scenarios do you actually handle?", a: "First-time buyer, investor (cash flow or appreciation), upsizing family, new detached / multigenerational, move-in-ready new construction, buying an assignment, selling an assignment, VIP early access, and standalone contract review. All buyer-first, all Fraser Valley and Metro Vancouver." },
      { q: "Do you help investors and first-time buyers equally?", a: "Yes. Roughly half my book is first-time buyers, half is investors and repeat buyers. Same buyer-first rules, same contract discipline. The advice differs — first-timers optimize for GST rebate + PTT exemption + hold; investors optimize for cash flow, appreciation and assignment strategy." },
      { q: "Can I use you if I already found the project?", a: "Yes — as long as you haven't registered with the developer's sales centre yet, or you registered but haven't signed. I'll review the contract, disclosure statement and deposit ladder before you commit. If you've already signed, it's usually too late for that project but I can still help on the next one." },
      { q: "Do you handle selling a presale assignment?", a: "Yes. I list assignments through my buyer network, coordinate the developer's assignment approval and lifting date, and model the 2025 BC flipping-tax exposure. Same buyer-first advisor stance — I represent the seller of the assignment, not the developer." },
      { q: "What languages do you work in?", a: "English, Hindi, Urdu and Punjabi. About a third of my buyers prefer to run through the contract in one of those languages, and I make sure nothing is lost in translation." },
    ],
    related: [
      { href: "/first-time-buyers-fraser-valley", label: "First-Time Buyers — Fraser Valley" },
      { href: "/investors-fraser-valley", label: "Investors — Fraser Valley" },
      { href: "/buyer-representation-presale-fraser-valley", label: "Do You Need Your Own Realtor for a Presale?" },
      { href: "/best-presale-realtor-fraser-valley", label: "Best Presale Realtor Fraser Valley" },
      { href: "/buy-presale-fraser-valley", label: "How to Buy a Presale in the Fraser Valley" },
    ],
  },
};

const OFFICIAL_SOURCES: { label: string; href: string }[] = [
  { label: "CRA — GST/HST new housing rebate", href: "https://www.canada.ca/en/revenue-agency/services/tax/businesses/topics/gst-hst-businesses/charge-collect-which-rate/rebate-gst-hst-new-housing.html" },
  { label: "CRA — Residential property flipping rule", href: "https://www.canada.ca/en/revenue-agency/programs/about-canada-revenue-agency-cra/federal-government-budgets/residential-property-flipping-rule.html" },
  { label: "Government of BC — Property transfer tax", href: "https://www2.gov.bc.ca/gov/content/taxes/property-taxes/property-transfer-tax" },
  { label: "Government of BC — BC home flipping tax", href: "https://www2.gov.bc.ca/gov/content/taxes/income-taxes/bc-home-flipping-tax" },
  { label: "BC Financial Services Authority (BCFSA)", href: "https://www.bcfsa.ca/" },
  { label: "BC Laws — Real Estate Development Marketing Act (REDMA)", href: "https://www.bclaws.gov.bc.ca/civix/document/id/complete/statreg/04041_01" },
];

const TAX_LEGAL_RE = /gst|rebate|ptt|property-transfer|property transfer|flipping|tax|rescission|assignment|assign|deposit|disclosure|redma|warranty|legal/i;

function officialSourcesBlock(): string {
  return (
    `<section><h2>Official sources</h2><ul>` +
    OFFICIAL_SOURCES.map((x) => `<li><a href="${x.href}" rel="noopener nofollow">${esc(x.label)}</a></li>`).join("") +
    `</ul><p>This is general information, not tax or legal advice. Rules change and eligibility depends on your situation — confirm with a tax professional or a BC real estate lawyer before you sign.</p></section>`
  );
}

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
    `<p><a href="${SITE}/call">Book a Buyer Strategy Call</a> · <a href="tel:+17782313592">+1 778-231-3592</a></p>` +
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

export async function resolve(pathname: string, env: Record<string, string | undefined>): Promise<Resolved> {
  const path = pathname !== "/" ? pathname.replace(/\/+$/, "") : "/";

  if (FUNNEL[path]) {
    const f = FUNNEL[path];
    return { meta: { title: f.title, description: f.description, image: funnelImage(path) }, body: funnelBody(path) + ABOUT_BLOCK };
  }
  if (STATIC_META[path]) {
    const extra = path === "/about" ? aboutReviewsBlock() : "";
    return { meta: STATIC_META[path], body: (STATIC_BODY[path] || "") + extra + ABOUT_BLOCK };
  }
  if (CITY_META[path]) {
    const citySlug = path.replace(/^\//, "");
    const cityImage = `${SITE}/images/heroes/${citySlug}-hero.jpg`;
    return { meta: { ...CITY_META[path], image: cityImage }, body: cityBody(path) };
  }

  if (path.startsWith("/blog/")) {
    const slug = path.slice("/blog/".length);
    const fallback: Meta = { title: humanizeSlug(slug) + SUFFIX, description: "Presale and new-construction insight for BC buyers and investors from Uzair Muhammad — buyer-first, no developer bias.", image: DEFAULT_IMAGE };
    const key = anonKey(env);
    if (!key) return { meta: fallback, body: "" };
    try {
      const url = `${SUPABASE_URL}/rest/v1/blog_posts?slug=eq.${encodeURIComponent(slug)}&published=eq.true&select=title,excerpt,image_url,content,updated_at,published_at,slug&limit=1`;
      const r = await fetch(url, { headers: { apikey: key, Authorization: `Bearer ${key}` } });
      if (!r.ok) return { meta: fallback, body: "" };
      const rows = (await r.json()) as Array<{ title?: string; excerpt?: string; image_url?: string; content?: string; updated_at?: string; published_at?: string }>;
      const p = rows && rows[0];
      if (!p || !p.title) return { meta: fallback, body: "" };
      const meta: Meta = { title: `${p.title}${SUFFIX}`, description: (p.excerpt || fallback.description).slice(0, 300), image: p.image_url || DEFAULT_IMAGE };
      const pub = p.published_at ? String(p.published_at).slice(0, 10) : "";
      const upd = p.updated_at ? String(p.updated_at).slice(0, 10) : "";
      const dateLine =
        `<p>By <a href="${SITE}/about">Uzair Muhammad</a>` +
        (pub ? ` &middot; Published <time datetime="${pub}">${pub}</time>` : "") +
        (upd && upd !== pub ? ` &middot; Updated <time datetime="${upd}">${upd}</time>` : "") +
        `</p>`;
      const sources = TAX_LEGAL_RE.test(slug) || TAX_LEGAL_RE.test(p.title || "") ? officialSourcesBlock() : "";
      const article =
        `<article><h1>${esc(p.title)}</h1>` + dateLine + (p.excerpt ? `<p>${esc(p.excerpt)}</p>` : "") +
        `<div>${p.content || ""}</div>` + sources + `</article>`;
      const ld = jsonLd({ "@context": "https://schema.org", "@type": "Article", headline: p.title, description: p.excerpt || meta.description, image: p.image_url || DEFAULT_IMAGE, datePublished: p.published_at || undefined, dateModified: p.updated_at || p.published_at || undefined, author: { "@type": "Person", name: "Uzair Muhammad", url: SITE + "/about" }, mainEntityOfPage: SITE + path });
      return { meta, body: article + ABOUT_BLOCK + ld };
    } catch { return { meta: fallback, body: "" }; }
  }

  if (path.startsWith("/projects/")) {
    const slug = path.slice("/projects/".length);
    const genericBody = `<h1>Presale Project — Buyer-Only Access with Uzair Muhammad</h1>` + ABOUT_BLOCK;
    const fallback: Resolved = { meta: { title: humanizeSlug(slug) + " — Presale" + SUFFIX, description: "Presale new-construction project — floor plans, pricing and buyer-first representation with Uzair Muhammad.", image: DEFAULT_IMAGE }, body: genericBody, canonical: SITE + path, robots: "noindex, follow" };
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
      parts.push(`<p>For floor plans, pricing and buyer-first representation on ${esc(p.name)}, <a href="${SITE}/contact">contact Uzair Muhammad</a> — 450+ families helped, no developer bias.</p>`);
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
  if (request.method !== "GET" && request.method !== "HEAD") return next();

  // Legacy 301s — applied for humans AND crawlers, before any rewriting.
  const reqUrl = new URL(request.url);
  let target = legacyRedirect(reqUrl.pathname);
  if (!target && reqUrl.pathname.replace(/\/+$/, "").startsWith("/en/blog/")) {
    try { target = await legacyBlogRedirect(reqUrl.pathname, env); } catch { target = "/blog"; }
  }
  if (target) {
    const dest = new URL(target, reqUrl.origin);
    dest.search = reqUrl.search;
    return Response.redirect(dest.toString(), 301);
  }

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
      .on('link[rel="canonical"]', new AttrSetter("href", canonical))
      .on("#root", new RootInjector(body));
    if (resolved.robots) rw = rw.on('meta[name="robots"]', new AttrSetter("content", resolved.robots));
    return rw.transform(res);
  } catch (e) {
    return next();
  }
};
