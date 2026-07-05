/**
 * Cloudflare Pages Function — per-page META + readable BODY for crawlers.
 *
 * Problem: this is a client-rendered SPA. Non-JS crawlers (Googlebot, GPTBot,
 * ClaudeBot, PerplexityBot, Google-Extended, WhatsApp, Facebook, LinkedIn, etc.)
 * only ever received the static index.html — an empty <div id="root"> with no H1,
 * no page body, no article text, and no city/blog JSON-LD (that schema is rendered
 * client-side via react-helmet-async, so bots never saw it). That makes the site
 * unrankable for non-brand terms and uncitable by AI answer engines.
 *
 * This middleware, for CRAWLER user-agents only:
 *   1. Rewrites <title> + meta/OG/Twitter to match the URL (as before), and
 *   2. Injects a real, readable HTML body into #root — H1, intro, page-specific
 *      content, full blog article text (from Supabase), deep city content,
 *      FAQPage + BreadcrumbList JSON-LD, and a shared entity/About block.
 *
 * SAFETY: real human visitors are NEVER touched — we early-return next() for
 * non-bots, assets, and non-GET, and wrap all bot logic in try/catch that falls
 * back to the unmodified response. A failure here can never break the site.
 *
 * Auto-deploys with the Cloudflare Pages build (no wrangler).
 */

const SITE = "https://presalewithuzair.com";
const DEFAULT_IMAGE =
  "https://storage.googleapis.com/gpt-engineer-file-uploads/5CBz3t8hJXQlE60NLFmYURMrWQu2/social-images/social-1775073854345-Screenshot_2026-03-03_at_2.54.42_PM.webp";
const SUPABASE_URL = "https://ubbogklasownognviobh.supabase.co";

const BOT_RE =
  /(googlebot|google-inspectiontool|bingbot|yandex|duckduckbot|baiduspider|facebookexternalhit|facebot|twitterbot|linkedinbot|whatsapp|slackbot|discordbot|telegrambot|pinterest|applebot|redditbot|embedly|iframely|quora link preview|skypeuripreview|vkshare|w3c_validator|gptbot|oai-searchbot|chatgpt-user|claudebot|claude-web|anthropic-ai|perplexitybot|google-extended|bytespider|amazonbot|cohere-ai|gemini|googleother)/i;

const ASSET_RE =
  /\.(js|mjs|css|png|jpe?g|gif|svg|ico|webp|avif|woff2?|ttf|eot|map|mp4|webm|mp3|pdf|json|xml|txt|zip|wasm|csv)$/i;

interface Meta {
  title: string;
  description: string;
  image: string;
}

const SUFFIX = " | Uzair Muhammad";

// Shared entity/E-E-A-T block appended to every bot page (strengthens the
// person/agent entity that AI engines resolve and recommend).
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
    <a href="${SITE}/chilliwack">Chilliwack presales</a> &middot;
    <a href="${SITE}/maple-ridge">Maple Ridge presales</a>
  </nav>`;

const STATIC_META: Record<string, Meta> = {
  "/": {
    title: "Uzair Muhammad | Fraser Valley's Leading Presale Expert",
    description:
      "Buyer-only presale & new-construction specialist. 450+ units sold, $200M+ in sales. VIP early access for first-time buyers & investors in Surrey, Langley, Abbotsford & the Fraser Valley.",
    image: DEFAULT_IMAGE,
  },
  "/about": {
    title: "About Uzair Muhammad — Vancouver Presale Buyer's Agent",
    description:
      "Former City of Surrey planning & bylaws professional turned buyer-only presale specialist. 450+ units sold for first-time buyers and investors across Metro Vancouver & the Fraser Valley.",
    image: DEFAULT_IMAGE,
  },
  "/services": {
    title: "Buyer-Only Presale Services" + SUFFIX,
    description:
      "VIP developer access, contract review, and no developer bias. How Uzair Muhammad protects first-time buyers and investors buying presale & new-construction homes in BC.",
    image: DEFAULT_IMAGE,
  },
  "/contact": {
    title: "Contact Uzair Muhammad — Free Presale Strategy Call",
    description:
      "Book a free, no-pressure presale strategy call with Uzair Muhammad. Buyer-only advice for first-time buyers and investors. English, Punjabi, Hindi & Urdu.",
    image: DEFAULT_IMAGE,
  },
  "/call": {
    title: "Book a Free Presale Strategy Call" + SUFFIX,
    description:
      "Schedule a free 15-minute presale strategy call with Uzair Muhammad — buyer-only guidance for first-time buyers and investors in the Fraser Valley.",
    image: DEFAULT_IMAGE,
  },
  "/agents": {
    title: "The Team Behind Presale With Uzair",
    description:
      "Meet the buyer-only presale team led by Uzair Muhammad — helping first-time buyers and investors secure new construction across Metro Vancouver & the Fraser Valley.",
    image: DEFAULT_IMAGE,
  },
  "/presale-guide": {
    title: "Free Presale Buyer's Guide — 7 Costly Mistakes" + SUFFIX,
    description:
      "Download Uzair Muhammad's free presale guide: spot contract traps, hidden closing costs, and developer red flags before you sign your deposit.",
    image: DEFAULT_IMAGE,
  },
  "/blog": {
    title: "Presale Buying Guides & BC Market Insights" + SUFFIX,
    description:
      "Expert presale and new-construction guides for BC buyers and investors — deposits, GST, assignments, neighbourhoods, and market timing from Uzair Muhammad.",
    image: DEFAULT_IMAGE,
  },
};

// Readable bodies for the static pages (injected into #root for bots).
const STATIC_BODY: Record<string, string> = {
  "/": `<h1>Uzair Muhammad — Fraser Valley's Leading Presale &amp; New-Construction Expert</h1>
    <p>Looking to buy a presale condo, townhome, or new-construction home in the Fraser Valley? Uzair Muhammad is a buyer-only presale specialist who represents buyers — never developers — across Surrey, Langley, Abbotsford, Coquitlam, Delta, Burnaby South, Chilliwack and Maple Ridge.</p>
    <h2>Why buy new construction with Uzair</h2>
    <ul>
      <li>VIP early access to new projects before the general public, with developer incentives.</li>
      <li>Line-by-line contract review to protect your deposit and your rights.</li>
      <li>No developer bias — buyer-only representation, at no cost to you.</li>
      <li>Strategy for both first-time buyers and investors, including assignments and taxes.</li>
    </ul>`,
  "/about": `<h1>About Uzair Muhammad</h1>
    <p>Uzair Muhammad spent a decade with the City of Surrey in planning and bylaws before becoming a buyer-only presale and new-construction specialist. He is the founder of the Vancouver Presale Expo and has helped 450+ buyers and investors purchase over $200M in new homes across Metro Vancouver and the Fraser Valley.</p>`,
  "/services": `<h1>Buyer-Only Presale &amp; New-Construction Services</h1>
    <p>Uzair represents buyers only. Services include VIP early access to new-construction projects, line-by-line contract and disclosure-statement review, deposit-structure and assignment guidance, and independent advice for first-time buyers and investors — with no developer bias.</p>`,
  "/contact": `<h1>Contact Uzair Muhammad</h1>
    <p>Book a free, no-pressure presale strategy call. Buyer-only advice for first-time buyers and investors buying new construction in the Fraser Valley, in English, Punjabi, Hindi and Urdu. <a href="${SITE}/call">Book a call</a>.</p>`,
  "/call": `<h1>Book a Free Presale Strategy Call</h1>
    <p>Schedule a free 15-minute presale strategy call with Uzair Muhammad — buyer-only guidance for first-time buyers and investors across the Fraser Valley.</p>`,
  "/agents": `<h1>The Team Behind Presale With Uzair</h1>
    <p>A buyer-only presale team led by Uzair Muhammad, helping first-time buyers and investors secure new construction across Metro Vancouver and the Fraser Valley.</p>`,
  "/presale-guide": `<h1>Free Presale Buyer's Guide — 7 Costly Mistakes to Avoid</h1>
    <p>Download Uzair Muhammad's free presale buyer's guide and learn how to spot contract traps, hidden closing costs, GST surprises, and developer red flags before you sign your deposit.</p>`,
  "/blog": `<h1>Presale Buying Guides &amp; BC Market Insights</h1>
    <p>Expert, buyer-first guides on presale and new construction in British Columbia — deposits, GST and rebates, assignment sales, the BC flipping tax, neighbourhood breakdowns, developer risk, and market timing.</p>`,
};

const CITY_META: Record<string, Meta> = {
  "/surrey": {
    title: "Surrey Presale Condos & New Construction" + SUFFIX,
    description:
      "Your buyer-only Surrey presale expert. VIP access to new condos & townhomes for first-time buyers and investors — floor plans, pricing, and honest advice. 450+ units sold.",
    image: DEFAULT_IMAGE,
  },
  "/langley": {
    title: "Langley Presale Condos & Townhomes" + SUFFIX,
    description:
      "Buyer-only Langley presale specialist. VIP access to Willoughby & Yorkson new construction for first-time buyers and investors ahead of the SkyTrain extension.",
    image: DEFAULT_IMAGE,
  },
  "/abbotsford": {
    title: "Abbotsford Presale Condos — New Construction" + SUFFIX,
    description:
      "The Fraser Valley's most affordable presale market. Buyer-only access to Abbotsford new condos for first-time buyers and investors, from the high $200s.",
    image: DEFAULT_IMAGE,
  },
  "/chilliwack": {
    title: "Chilliwack Presale Condos & New Homes" + SUFFIX,
    description:
      "Buyer-only Chilliwack presale guidance — the most space for your money in the Fraser Valley. New construction for first-time buyers and investors.",
    image: DEFAULT_IMAGE,
  },
  "/maple-ridge": {
    title: "Maple Ridge Presale Condos & Townhomes" + SUFFIX,
    description:
      "Buyer-only Maple Ridge presale expert. Commuter-friendly new construction for first-time families and investors, with WCE rail access.",
    image: DEFAULT_IMAGE,
  },
};

interface CityContent {
  name: string;
  intro: string;
  why: string;
  faqs: { q: string; a: string }[];
}

const CITY_CONTENT: Record<string, CityContent> = {
  "/surrey": {
    name: "Surrey",
    intro:
      "Surrey is the fastest-growing city in BC and its presale market moves fast. Whether you're looking in Surrey City Centre, Fleetwood, Clayton, or South Surrey, Uzair Muhammad gives you buyer-only VIP access to new presale condos and townhomes — with early pricing and full contract protection.",
    why:
      "With the Surrey–Langley SkyTrain extension and major infrastructure investment, Surrey offers some of the strongest appreciation potential in the Fraser Valley. Not every project is a good deal — Uzair analyzes the developer's track record, the deposit structure, and the assignment clauses so your investment is protected.",
    faqs: [
      { q: "Who is the best presale realtor in Surrey?", a: "Uzair Muhammad is a buyer-only presale specialist who has sold 450+ new-construction units and represents buyers only — never developers — across Surrey and the Fraser Valley." },
      { q: "How much do presale condos cost in Surrey?", a: "Surrey presale condos generally start in the high $400s, with pricing driven by location (City Centre and Fleetwood command a premium) and completion timing. Uzair provides current floor plans and pricing on request." },
      { q: "Do I pay to use a buyer's agent for a Surrey presale?", a: "No. The developer pays the buyer-agent commission, so buyer-only representation and contract review from Uzair costs you nothing while protecting your deposit." },
    ],
  },
  "/langley": {
    name: "Langley",
    intro:
      "Langley is the top destination for Fraser Valley families and investors looking for space and growth. Uzair Muhammad gives you buyer-only VIP access to the most sought-after new-construction townhomes and condos in Willoughby, Latimer Heights, and Central Langley.",
    why:
      "Langley pairs family-friendly communities with rapid transit development. As Willoughby and the SkyTrain corridor build out, getting in early matters. Uzair helps you cut through the hype, negotiate the best terms, and secure a home that fits your financial goals.",
    faqs: [
      { q: "Who is the best presale agent in Langley?", a: "Uzair Muhammad is a buyer-only Langley presale specialist with deep knowledge of Willoughby, Latimer Heights, and Yorkson, and 450+ new-construction units sold." },
      { q: "Is Langley good for presale townhomes?", a: "Yes — Langley is townhome country, with strong family demand and appreciation along the coming SkyTrain corridor. Uzair knows every active project and developer." },
      { q: "When does the Langley SkyTrain open and does it affect presale values?", a: "The Surrey–Langley SkyTrain extension is under construction and is already influencing presale demand and pricing along the 200th Street corridor. Buying ahead of completion is a common strategy." },
    ],
  },
  "/abbotsford": {
    name: "Abbotsford",
    intro:
      "Abbotsford is the Fraser Valley's best-value new-construction market. From the University District to Historic Downtown, Uzair Muhammad gives first-time buyers and investors buyer-only early access to pricing, floor plans, and incentives.",
    why:
      "With lower entry prices than Surrey and Langley, Abbotsford offers strong value for first-time buyers and cash-flow investors. Uzair vets every Abbotsford developer and reads every contract line by line so you can invest with confidence.",
    faqs: [
      { q: "Who is the best presale realtor in Abbotsford?", a: "Uzair Muhammad is a buyer-only presale specialist covering Abbotsford and the wider Fraser Valley, representing buyers only with 450+ units sold." },
      { q: "How much are presale condos in Abbotsford?", a: "Abbotsford is the most affordable Fraser Valley presale market, with condos often starting in the high $200s to low $300s — the best entry point in the region." },
      { q: "Is Abbotsford a good place to buy a presale?", a: "Yes — lower entry prices, a growing University District and downtown core, and steady population growth make Abbotsford attractive for both first-time buyers and investors." },
    ],
  },
  "/chilliwack": {
    name: "Chilliwack",
    intro:
      "Chilliwack offers some of the best price-per-square-foot value in BC. Uzair Muhammad helps first-time buyers and investors navigate the Chilliwack presale market with buyer-only guidance and access to quality new-construction projects.",
    why:
      "Chilliwack is the most affordable new-construction entry point in the Fraser Valley. As infrastructure and population grow, early buyers benefit most — and Uzair makes sure you're buying quality, not just a low price.",
    faqs: [
      { q: "Who is the best presale agent in Chilliwack?", a: "Uzair Muhammad provides buyer-only presale representation in Chilliwack and across the Fraser Valley, with 450+ new-construction units sold." },
      { q: "Are Chilliwack presales worth it?", a: "Chilliwack offers the lowest presale prices in the Fraser Valley with meaningful upside as the city grows. Uzair helps you choose quality projects and protect your deposit." },
    ],
  },
  "/maple-ridge": {
    name: "Maple Ridge",
    intro:
      "Maple Ridge combines mountain lifestyle with urban convenience and West Coast Express rail access. Uzair Muhammad gives buyers VIP access to the best new condo and townhome developments in the area.",
    why:
      "Growing demand, limited supply, and improving infrastructure make Maple Ridge a strong long-term play for presale buyers. Uzair provides buyer-only advice, contract review, and deposit protection.",
    faqs: [
      { q: "Who is the best presale realtor in Maple Ridge?", a: "Uzair Muhammad is a buyer-only presale specialist serving Maple Ridge and the Fraser Valley, with 450+ new-construction units sold." },
      { q: "Is Maple Ridge good for first-time buyers?", a: "Yes — relatively affordable pricing, WCE rail access to Vancouver, and a growing town centre make Maple Ridge appealing for first-time buyers and commuters." },
    ],
  },
};

function humanizeSlug(slug: string): string {
  const s = slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim();
  return s.length > 65 ? s.slice(0, 62) + "..." : s;
}

function esc(s: string): string {
  return String(s || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function jsonLd(obj: unknown): string {
  // Escape closing script tags to keep the JSON-LD block safe inside HTML.
  return `<script type="application/ld+json">${JSON.stringify(obj).replace(/<\//g, "<\\/")}</script>`;
}

function breadcrumb(name: string, path: string): unknown {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE + "/" },
      { "@type": "ListItem", position: 2, name, item: SITE + path },
    ],
  };
}

function faqPage(faqs: { q: string; a: string }[]): unknown {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

function cityBody(path: string): string {
  const c = CITY_CONTENT[path];
  if (!c) return "";
  const faqHtml = c.faqs
    .map((f) => `<div><h3>${esc(f.q)}</h3><p>${esc(f.a)}</p></div>`)
    .join("");
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

interface Resolved {
  meta: Meta;
  body: string;
}

async function resolve(
  pathname: string,
  env: Record<string, string | undefined>,
): Promise<Resolved> {
  const path = pathname !== "/" ? pathname.replace(/\/+$/, "") : "/";

  if (STATIC_META[path]) {
    return { meta: STATIC_META[path], body: (STATIC_BODY[path] || "") + ABOUT_BLOCK };
  }
  if (CITY_META[path]) {
    return { meta: CITY_META[path], body: cityBody(path) };
  }
  if (path.startsWith("/blog/")) {
    const slug = path.slice("/blog/".length);
    const fallback: Meta = {
      title: humanizeSlug(slug) + SUFFIX,
      description:
        "Presale and new-construction insight for BC buyers and investors from Uzair Muhammad — buyer-only, no developer bias.",
      image: DEFAULT_IMAGE,
    };
    const key =
      env.VITE_SUPABASE_PUBLISHABLE_KEY ||
      env.VITE_SUPABASE_ANON_KEY ||
      env.SUPABASE_ANON_KEY;
    if (!key) return { meta: fallback, body: "" };
    try {
      const url =
        `${SUPABASE_URL}/rest/v1/blog_posts?slug=eq.${encodeURIComponent(slug)}` +
        `&published=eq.true&select=title,excerpt,image_url,content,updated_at&limit=1`;
      const r = await fetch(url, {
        headers: { apikey: key, Authorization: `Bearer ${key}` },
      });
      if (!r.ok) return { meta: fallback, body: "" };
      const rows = (await r.json()) as Array<{
        title?: string;
        excerpt?: string;
        image_url?: string;
        content?: string;
        updated_at?: string;
      }>;
      const p = rows && rows[0];
      if (!p || !p.title) return { meta: fallback, body: "" };
      const meta: Meta = {
        title: `${p.title}${SUFFIX}`,
        description: (p.excerpt || fallback.description).slice(0, 300),
        image: p.image_url || DEFAULT_IMAGE,
      };
      const article =
        `<article><h1>${esc(p.title)}</h1>` +
        (p.excerpt ? `<p>${esc(p.excerpt)}</p>` : "") +
        `<div>${p.content || ""}</div></article>`;
      const ld = jsonLd({
        "@context": "https://schema.org",
        "@type": "Article",
        headline: p.title,
        description: p.excerpt || meta.description,
        image: p.image_url || DEFAULT_IMAGE,
        dateModified: p.updated_at || undefined,
        author: { "@type": "Person", name: "Uzair Muhammad", url: SITE + "/about" },
        mainEntityOfPage: SITE + path,
      });
      return { meta, body: article + ABOUT_BLOCK + ld };
    } catch {
      return { meta: fallback, body: "" };
    }
  }

  // Unknown route (admin, book, projects, 404, etc.): still give bots the entity
  // block so the person/agent is readable, but keep the homepage meta.
  return {
    meta: STATIC_META["/"],
    body: `<h1>Presale With Uzair — Buyer-Only Presale &amp; New Construction</h1>` + ABOUT_BLOCK,
  };
}

class AttrSetter {
  attr: string;
  value: string;
  constructor(attr: string, value: string) {
    this.attr = attr;
    this.value = value;
  }
  element(el: any) {
    el.setAttribute(this.attr, this.value);
  }
}

class TextSetter {
  text: string;
  constructor(text: string) {
    this.text = text;
  }
  element(el: any) {
    el.setInnerContent(this.text);
  }
}

// Injects a readable HTML body into the (empty) SPA #root for bots only.
class RootInjector {
  html: string;
  constructor(html: string) {
    this.html = html;
  }
  element(el: any) {
    if (this.html) el.setInnerContent(this.html, { html: true });
  }
}

export const onRequest: any = async (context: any) => {
  const { request, next, env } = context;

  // Real visitors, assets, and non-GET never touch the crawler logic.
  if (request.method !== "GET") return next();
  const ua = request.headers.get("user-agent") || "";
  if (!BOT_RE.test(ua)) return next();

  const url = new URL(request.url);
  if (ASSET_RE.test(url.pathname)) return next();
  if (
    url.pathname.startsWith("/assets/") ||
    url.pathname.startsWith("/api/") ||
    url.pathname.startsWith("/functions/") ||
    url.pathname.startsWith("/admin")
  ) {
    return next();
  }

  try {
    const { meta, body } = await resolve(url.pathname, env);
    const canonical = `${SITE}${url.pathname === "/" ? "/" : url.pathname.replace(/\/+$/, "")}`;
    const res = await next();

    const ct = res.headers.get("content-type") || "";
    if (!ct.includes("text/html")) return res;

    return new HTMLRewriter()
      .on("title", new TextSetter(meta.title))
      .on('meta[name="description"]', new AttrSetter("content", meta.description))
      .on('meta[property="og:title"]', new AttrSetter("content", meta.title))
      .on('meta[property="og:description"]', new AttrSetter("content", meta.description))
      .on('meta[property="og:image"]', new AttrSetter("content", meta.image))
      .on('meta[property="og:url"]', new AttrSetter("content", canonical))
      .on('meta[name="twitter:title"]', new AttrSetter("content", meta.title))
      .on('meta[name="twitter:description"]', new AttrSetter("content", meta.description))
      .on('meta[name="twitter:image"]', new AttrSetter("content", meta.image))
      .on("#root", new RootInjector(body))
      .transform(res);
  } catch (e) {
    // Never break the site for a crawler-rendering failure.
    return next();
  }
};
