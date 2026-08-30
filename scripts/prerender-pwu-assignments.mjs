/**
 * ADDITIVE prerender pass #2 for presalewithuzair.com — the assignment pillar.
 *
 * WHY THIS IS A SEPARATE FILE, not new entries in functions/_middleware.ts:
 * _middleware.ts is 126KB and is the single source of truth for every existing
 * route's title, body and sitemap entry. Editing it means rewriting the whole
 * file, which risks silently dropping live content. This script only ever
 * CREATES files that do not already exist — it can add pages but it cannot
 * damage any.
 *
 * Runs AFTER scripts/prerender.ts, so dist/index.html (the SPA template) and
 * dist/sitemap.xml already exist. We never touch sitemap.xml; the new URLs go
 * in their own sitemap-assignments.xml, declared in robots.txt.
 *
 * NEVER-CLOBBER RULE: if dist/<path>/index.html already exists, we skip it.
 * The main prerender always wins.
 *
 * CANONICAL FORM: Cloudflare Pages serves directory-style files and 308s
 * /about -> /about/. The trailing-slash form is the one that answers 200, so
 * it is the authoritative form for canonical, og:url and every sitemap <loc>.
 * This matches canonicalPath() in scripts/prerender.ts — do not "fix" it.
 *
 * Fail-safe: any error exits 0 so a content bug can never break the deploy.
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { resolve as pathResolve, dirname, join } from "node:path";

const SITE = "https://presalewithuzair.com";
const DIST = pathResolve(process.cwd(), "dist");
const TEMPLATE_PATH = join(DIST, "index.html");
const DEFAULT_IMAGE = `${SITE}/og-image.png`;

const PHONE = "+1 (778) 231-3592";
const TEL = "+17782313592";

/** Uzair's personal proof line. Matches trustSignals — do not invent numbers. */
const PROOF =
  "I've helped 450+ families buy more than $200M in new homes over five years, with only 2 defaults.";

const NOT_ADVICE =
  "This is general information, not legal, tax or accounting advice. Assignment sales have real tax consequences — talk to a lawyer and a CPA who work in BC real estate before you sign anything.";

/* ------------------------------------------------------------------ pages */

const PAGES = [
  {
    path: "/switching-presale-agents",
    title: "Can I Switch Realtors on My Presale? | Uzair Muhammad",
    description:
      "Bought a presale condo with another agent and want to switch? Yes, you can. What you owe your original agent, what to do if they've gone quiet, and how I take over a file mid-project across Vancouver, Burnaby, Coquitlam, Surrey and the Fraser Valley.",
    h1: "Bought your presale with another agent? You can still switch to me.",
    breadcrumb: "Switching Presale Agents",
    body: [
      "Yes — you can switch realtors on a presale. Your Contract of Purchase and Sale is between you and the developer. It does not tie you to the agent who wrote it. If you have no active written listing agreement in force right now, you are free to hire whoever you want to sell your assignment or guide you to completion.",
      "I get this call constantly, and it is almost always the same story: the agent who sold you the presale two or three years ago has stopped replying. They have moved on to new launches, or they simply do not want the assignment listing — assignments are slower, more paperwork, developer-dependent, and there is no guarantee of a sale. A lot of agents have quietly stopped taking them.",
      "I have not. Presale contracts are the only thing I do. " + PROOF,
      "Switching does not restart or jeopardize anything with the developer. Developers care about who the assignee is and whether their consent conditions and fees are met — not which brokerage represents you.",
    ],
    faqs: [
      {
        q: "Can I use a different realtor than the one I bought my presale with?",
        a: "Yes. Your purchase contract is with the developer, not with a brokerage. It does not lock you into one agent for a future assignment sale or for completion support. As long as no written listing agreement is currently in force, you can hire whoever you want.",
      },
      {
        q: "Do I owe my original agent a commission if I switch?",
        a: "Usually no. The agent who represented you on the original purchase was typically paid by the developer at the time of that sale — that transaction closed and was paid years ago. An assignment sale is a separate transaction with its own listing agreement and its own commission. The exception is an assignment listing agreement that is still in force: check its expiry date and any holdover clause, and ask the brokerage for a written release if you are unsure.",
      },
      {
        q: "My agent stopped replying. What do I actually do?",
        a: "Put your request in writing — email is fine — and ask for either an update or a release from any listing agreement. Keep the paper trail. If there is no agreement in force, you do not need their permission at all; just move. Then send me the file and I will pick it up from there.",
      },
      {
        q: "Is it too late to switch if my building is almost finished?",
        a: "Later, not too late — but the clock matters. Once the developer issues a completion notice your window to assign narrows sharply, and the conversation shifts to whether you can complete, extend, or need to sell quickly. If your completion date is inside six months, call this week rather than next month.",
      },
      {
        q: "What do you need from me to take over?",
        a: "Four things: the original Contract of Purchase and Sale, the Disclosure Statement and any amendments, your deposit receipts, and any listing agreement currently in place. I read the assignment clause, confirm the developer's current consent and marketing position, price it against today's developer price list, and tell you honestly whether assigning is your best move. No charge for that review.",
      },
      {
        q: "Will the developer care that I changed agents?",
        a: "No. Consent is about the incoming buyer and the developer's own conditions and fees. Changing representation does not affect a consent request that is already in motion.",
      },
    ],
    related: [
      ["/sell-my-presale-assignment", "Selling your presale assignment"],
      ["/buying-a-presale-assignment", "Buying an assignment"],
      ["/call", "Book a 15-minute call"],
    ],
  },
  {
    path: "/sell-my-presale-assignment",
    title: "Sell My Presale Assignment in BC | Uzair Muhammad",
    description:
      "Need to sell your presale before it completes? Buyer-side guidance on developer consent, pricing, marketing restrictions and GST across Vancouver, Burnaby, Coquitlam, Port Moody, Surrey, Langley and Abbotsford.",
    h1: "Selling your presale before it completes.",
    breadcrumb: "Sell My Presale Assignment",
    body: [
      "An assignment is when you transfer your rights and obligations under a presale contract to a new buyer before the building completes. You are not selling the condo — it does not exist yet. You are selling your contract.",
      "Three things decide whether it works: what your assignment clause allows, whether the developer will consent, and whether the price makes sense against today's developer price list. I check all three before you spend a dollar on marketing.",
      "The pattern across the region is worth knowing up front. In Vancouver and the inner suburbs most developers prohibit MLS listings for assignments, so the sale runs privately through buyer networks. Further out in the Fraser Valley — Surrey, Langley, Abbotsford, Coquitlam — many developers do allow MLS. That single difference changes your entire marketing plan, and it is why a general realtor's usual playbook often does not work here.",
      PROOF + " If the numbers say hold and complete instead of assign, I will tell you that.",
      NOT_ADVICE,
    ],
    faqs: [
      {
        q: "Can I sell my presale before it completes?",
        a: "In most cases yes — if your contract's assignment clause allows it and the developer consents in writing. A small number of developers prohibit assignments outright. I will read your contract and tell you which situation you are in, at no charge.",
      },
      {
        q: "How much can I sell my assignment for?",
        a: "Three numbers set the price: your original contract price, the developer's current price for the same floor plan, and recent comparable assignment or resale sales. Your price usually lands between the first two, discounted somewhat because the buyer is taking on your contract as-is.",
      },
      {
        q: "Can I list my assignment on MLS?",
        a: "It depends entirely on the developer. In Vancouver and the inner suburbs most prohibit it. In much of the Fraser Valley many allow it. We confirm the current position in writing before marketing starts, because some developers change their stance partway through a project.",
      },
      {
        q: "Do I pay GST on an assignment sale?",
        a: "Since May 2022 CRA applies 5% GST to assignment sales of new residential property, calculated on the assignment amount rather than the full contract price. Who pays it is negotiable and is usually a deal point. CRA also generally treats assignment profit as business income rather than a capital gain. Get a CPA involved early.",
      },
      {
        q: "What if I bought with a different agent?",
        a: "That changes nothing about your options. You are not tied to the agent who wrote your original contract — see switching presale agents for exactly how that works.",
      },
      {
        q: "How long does an assignment take to sell?",
        a: "Realistically two to four months from listing to accepted offer, then another 30 to 60 days to close. If your completion date is close, that timeline is the first thing we should talk about.",
      },
    ],
    related: [
      ["/switching-presale-agents", "Can I switch agents mid-project?"],
      ["/buying-a-presale-assignment", "Buying an assignment"],
      ["/call", "Book a 15-minute call"],
    ],
  },
  {
    path: "/buying-a-presale-assignment",
    title: "Buying a Presale Assignment in BC | Uzair Muhammad",
    description:
      "Thinking of buying an assignment instead of direct from the developer? What you inherit from the original buyer, why lenders treat assignments differently, and who pays the GST.",
    h1: "Buying a presale assignment — what you're actually taking on.",
    breadcrumb: "Buying a Presale Assignment",
    body: [
      "When you buy an assignment you step into someone else's contract with the developer. You inherit their purchase price, their deposit schedule, their completion date and their contract terms — good and bad. You are not negotiating with the developer; you are negotiating with the original buyer, and then asking the developer to approve you.",
      "That is often a genuine opportunity. Assignments can price below the developer's current list, and in a sold-out building an assignment may be the only way in at all. But it needs a different set of checks than a direct presale purchase.",
      "Before you write an offer I want to see the original contract and the Disclosure Statement with every amendment, confirm what deposits have actually been paid and are being transferred, confirm the developer will consent and what fee applies, confirm the current completion estimate rather than the original one, and settle in writing who is paying the GST on the assignment amount.",
      "Financing is where these deals most often fall apart. Lenders treat assignments differently from a direct developer purchase: some will not touch them, and many will only lend against the original contract price rather than what you are paying. Talk to a broker who has actually funded assignments before you remove conditions.",
      NOT_ADVICE,
    ],
    faqs: [
      {
        q: "Is buying a presale assignment safe?",
        a: "It can be, with proper review. You are inheriting the original buyer's contract exactly as written, so the risk sits in the terms and in the deposit chain rather than in the concept. Verify the deposits actually paid, get the developer's written consent, and have a lawyer review the assignment agreement before you commit.",
      },
      {
        q: "Why do lenders treat assignments differently?",
        a: "Because the price you pay and the price in the original developer contract are two different numbers. Many lenders will only base their loan on the original contract price, which means the uplift you are paying has to come from your own funds. Some lenders decline assignments entirely. Confirm financing before removing conditions.",
      },
      {
        q: "Who pays the GST on an assignment purchase?",
        a: "It is negotiable, but in most assignment contracts the buyer pays the 5% GST on the assignment amount — the uplift — not on the full purchase price. Get it written into the contract rather than assumed.",
      },
      {
        q: "Do I need the developer's approval to buy an assignment?",
        a: "Almost always yes. The developer must consent in writing, and they typically charge an assignment fee. Some restrict how many times a unit can be assigned. The consent is a condition of the deal, not a formality.",
      },
      {
        q: "Is an assignment cheaper than buying from the developer?",
        a: "Sometimes. In a softer market an assignor who needs out may sell below the developer's current price. In a strong market or a sold-out building the assignment may cost more. It is worth comparing both before you assume either.",
      },
    ],
    related: [
      ["/sell-my-presale-assignment", "Selling your presale assignment"],
      ["/switching-presale-agents", "Can I switch agents mid-project?"],
      ["/call", "Book a 15-minute call"],
    ],
  },
];

/* ----------------------------------------------------------------- helpers */

function escAttr(s) {
  return String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
}
function escText(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/** Trailing-slash form — the URL that actually answers 200 on CF Pages. */
function canonicalPath(p) {
  const clean = p.replace(/\/+$/, "");
  return clean === "" ? "/" : `${clean}/`;
}

function buildSchema(page, canonical) {
  const graph = [
    {
      "@type": "WebPage",
      "@id": canonical,
      url: canonical,
      name: page.title,
      description: page.description,
      inLanguage: "en-CA",
      isPartOf: { "@id": `${SITE}/#website` },
      about: { "@id": `${SITE}/#agent` },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE + "/" },
        { "@type": "ListItem", position: 2, name: page.breadcrumb, item: canonical },
      ],
    },
  ];
  // FAQPage schema is only emitted because every Q&A below is also rendered as
  // visible text on the page. Schema that does not match visible content is a
  // structured-data violation and gets the rich result pulled.
  if (page.faqs && page.faqs.length) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${canonical}#faq`,
      mainEntity: page.faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    });
  }
  return JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(/</g, "\\u003c");
}

function buildBody(page) {
  const paras = page.body.map((p) => `<p>${escText(p)}</p>`).join("");
  const faqs = (page.faqs || [])
    .map((f) => `<div><h3>${escText(f.q)}</h3><p>${escText(f.a)}</p></div>`)
    .join("");
  const related = (page.related || [])
    .map(([href, label]) => `<li><a href="${SITE}${canonicalPath(href)}">${escText(label)}</a></li>`)
    .join("");
  return (
    `<h1>${escText(page.h1)}</h1>` +
    paras +
    (faqs ? `<section><h2>Questions people actually ask</h2>${faqs}</section>` : "") +
    `<section><h2>Talk it through</h2><p>Call or text me directly at <a href="tel:${TEL}">${PHONE}</a>, or <a href="${SITE}/call/">book a free 15-minute call</a>. I represent buyers and assignors — never developers.</p></section>` +
    (related ? `<nav><h2>Related</h2><ul>${related}</ul></nav>` : "")
  );
}

/**
 * Replace everything inside <div id="root"> with `inner`, keeping the original
 * opening tag so React 18 can mount over the prerendered children.
 *
 * This walks the tag stack instead of using a non-greedy regex. The shell
 * contains a nested no-JS fallback <div>, and a lazy /<div id="root">[\s\S]*?
 * <\/div>/ stops at the FIRST closing tag — leaving one orphaned </div> in
 * every generated file. Harmless to parsers, but it is real malformed markup
 * and this is cheap to do properly.
 */
function replaceRootContent(html, inner) {
  const openMatch = html.match(/<div\s+id=["']root["'][^>]*>/i);
  if (!openMatch) return html;
  const openTag = openMatch[0];
  const start = openMatch.index + openTag.length;

  const tagRe = /<div\b[^>]*>|<\/div>/gi;
  tagRe.lastIndex = start;
  let depth = 1;
  let m;
  while ((m = tagRe.exec(html)) !== null) {
    depth += m[0][1] === "/" ? -1 : 1;
    if (depth === 0) {
      return html.slice(0, openMatch.index) + openTag + inner + "</div>" + html.slice(m.index + m[0].length);
    }
  }
  return html; // unbalanced shell — leave it exactly as-is rather than guess
}

function applyMeta(template, page, canonical) {
  let out = template;
  out = out.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escText(page.title)}</title>`);

  const set = (attr, key, value) => {
    const re = new RegExp(`(<meta\\s+${attr}=["']${key}["'][^>]*content=["'])[^"']*(["'][^>]*>)`, "i");
    if (re.test(out)) out = out.replace(re, (m, g1, g2) => `${g1}${escAttr(value)}${g2}`);
    else out = out.replace(/<\/head>/i, `<meta ${attr}="${key}" content="${escAttr(value)}">\n</head>`);
  };
  set("name", "description", page.description);
  set("name", "robots", "index, follow, max-image-preview:large, max-snippet:-1");
  set("property", "og:title", page.title);
  set("property", "og:description", page.description);
  set("property", "og:image", DEFAULT_IMAGE);
  set("property", "og:url", canonical);
  set("property", "og:type", "article");
  set("name", "twitter:card", "summary_large_image");
  set("name", "twitter:title", page.title);
  set("name", "twitter:description", page.description);
  set("name", "twitter:image", DEFAULT_IMAGE);

  const canonTag = `<link rel="canonical" href="${escAttr(canonical)}">`;
  const canonRe = /<link\s+rel=["']canonical["'][^>]*>/i;
  out = canonRe.test(out) ? out.replace(canonRe, canonTag) : out.replace(/<\/head>/i, `${canonTag}\n</head>`);

  out = out.replace(
    /<\/head>/i,
    `<script type="application/ld+json">${buildSchema(page, canonical)}</script>\n</head>`,
  );

  // Same injection contract as scripts/prerender.ts: keep the original #root
  // opening tag so React 18 can mount over the prerendered children.
  out = replaceRootContent(out, `<div data-prerendered="true">${buildBody(page)}</div>`);

  return out;
}

function writeSitemap(paths) {
  const today = new Date().toISOString().split("T")[0];
  const xml = [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    ...paths.map(
      (p) =>
        `  <url><loc>${SITE}${canonicalPath(p)}</loc><lastmod>${today}</lastmod><changefreq>monthly</changefreq><priority>0.9</priority></url>`,
    ),
    `</urlset>`,
    ``,
  ].join("\n");
  writeFileSync(join(DIST, "sitemap-assignments.xml"), xml);
  try {
    writeFileSync(pathResolve(process.cwd(), "public/sitemap-assignments.xml"), xml);
  } catch {
    /* public/ can be read-only in some build sandboxes — dist/ is what ships */
  }
}

/* -------------------------------------------------------------------- main */

function main() {
  if (!existsSync(TEMPLATE_PATH)) {
    console.warn("[assignments] dist/index.html missing — skipping");
    return;
  }
  const template = readFileSync(TEMPLATE_PATH, "utf8");

  let written = 0;
  let skipped = 0;
  const shipped = [];

  for (const page of PAGES) {
    const file = join(DIST, page.path.replace(/^\//, ""), "index.html");
    if (existsSync(file)) {
      // The main prerender already owns this route. Never clobber it.
      console.warn(`[assignments] ${page.path} already exists — skipped`);
      skipped++;
      continue;
    }
    const canonical = SITE + canonicalPath(page.path);
    mkdirSync(dirname(file), { recursive: true });
    writeFileSync(file, applyMeta(template, page, canonical));
    shipped.push(page.path);
    written++;
  }

  if (shipped.length) writeSitemap(shipped);
  console.log(`[assignments] wrote ${written} pages, skipped ${skipped}`);
}

try {
  main();
} catch (err) {
  console.error("[assignments] failed (build continues):", err && err.message);
}
process.exit(0);
