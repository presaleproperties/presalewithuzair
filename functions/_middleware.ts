/**
 * Cloudflare Pages Function — per-page meta for crawlers.
 *
 * Problem: this is a client-rendered SPA. Non-JS crawlers (WhatsApp, Facebook,
 * iMessage, LinkedIn, GPTBot, ClaudeBot, PerplexityBot, etc.) only ever saw the
 * static index.html — so every shared link showed the homepage title + one OG
 * image. This middleware detects crawler user-agents and rewrites the <title>
 * and meta/OG/Twitter tags to match the actual URL, using HTMLRewriter.
 *
 * SAFETY: real human visitors are never touched — we early-return next() for
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
  /(googlebot|google-inspectiontool|bingbot|yandex|duckduckbot|baiduspider|facebookexternalhit|facebot|twitterbot|linkedinbot|whatsapp|slackbot|discordbot|telegrambot|pinterest|applebot|redditbot|embedly|iframely|quora link preview|skypeuripreview|vkshare|w3c_validator|gptbot|oai-searchbot|chatgpt-user|claudebot|claude-web|anthropic-ai|perplexitybot|google-extended|bytespider|amazonbot|cohere-ai)/i;

const ASSET_RE =
  /\.(js|mjs|css|png|jpe?g|gif|svg|ico|webp|avif|woff2?|ttf|eot|map|mp4|webm|mp3|pdf|json|xml|txt|zip|wasm|csv)$/i;

interface Meta {
  title: string;
  description: string;
  image: string;
}

const SUFFIX = " | Uzair Muhammad";

const STATIC_META: Record<string, Meta> = {
  "/": {
    title: "Uzair Muhammad | Fraser Valley's Leading Presale Expert",
    description:
      "Buyer-only presale & new-construction specialist. 450+ units sold, $200M+ in sales. VIP early access for first-time buyers & investors in Surrey, Langley, Abbotsford & the Fraser Valley.",
    image: DEFAULT_IMAGE,
  },
  "/about": {
    title: "About Uzair Muhammad — Vancouver Presale Buyer's Agent" + "",
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

function humanizeSlug(slug: string): string {
  const s = slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim();
  return s.length > 65 ? s.slice(0, 62) + "..." : s;
}

async function blogMeta(slug: string, key: string | undefined): Promise<Meta> {
  const fallback: Meta = {
    title: humanizeSlug(slug) + SUFFIX,
    description:
      "Presale and new-construction insight for BC buyers and investors from Uzair Muhammad — buyer-only, no developer bias.",
    image: DEFAULT_IMAGE,
  };
  if (!key) return fallback;
  try {
    const url =
      `${SUPABASE_URL}/rest/v1/blog_posts?slug=eq.${encodeURIComponent(slug)}` +
      `&published=eq.true&select=title,excerpt,image_url&limit=1`;
    const r = await fetch(url, {
      headers: { apikey: key, Authorization: `Bearer ${key}` },
    });
    if (!r.ok) return fallback;
    const rows = (await r.json()) as Array<{
      title?: string;
      excerpt?: string;
      image_url?: string;
    }>;
    const p = rows && rows[0];
    if (!p || !p.title) return fallback;
    return {
      title: `${p.title}${SUFFIX}`,
      description: (p.excerpt || fallback.description).slice(0, 300),
      image: p.image_url || DEFAULT_IMAGE,
    };
  } catch {
    return fallback;
  }
}

async function metaForPath(
  pathname: string,
  env: Record<string, string | undefined>,
): Promise<Meta> {
  const path = pathname !== "/" ? pathname.replace(/\/+$/, "") : "/";
  if (STATIC_META[path]) return STATIC_META[path];
  if (CITY_META[path]) return CITY_META[path];
  if (path.startsWith("/blog/")) {
    const slug = path.slice("/blog/".length);
    const key =
      env.VITE_SUPABASE_PUBLISHABLE_KEY ||
      env.VITE_SUPABASE_ANON_KEY ||
      env.SUPABASE_ANON_KEY;
    return blogMeta(slug, key);
  }
  return STATIC_META["/"];
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

export const onRequest: any = async (context: any) => {
  const { request, next, env } = context;

  // Real visitors, assets, and non-GET never touch the meta logic.
  if (request.method !== "GET") return next();
  const ua = request.headers.get("user-agent") || "";
  if (!BOT_RE.test(ua)) return next();

  const url = new URL(request.url);
  if (ASSET_RE.test(url.pathname)) return next();
  if (
    url.pathname.startsWith("/assets/") ||
    url.pathname.startsWith("/api/") ||
    url.pathname.startsWith("/functions/")
  ) {
    return next();
  }

  try {
    const meta = await metaForPath(url.pathname, env);
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
      .transform(res);
  } catch (e) {
    // Never break the site for a meta failure.
    return next();
  }
};
