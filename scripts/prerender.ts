/**
 * Post-build prerender: writes per-route static HTML into dist/<path>/index.html
 * so non-JS crawlers (GPTBot, ClaudeBot, PerplexityBot, Bingbot, Facebook,
 * LinkedIn, etc.) get a real <title>, meta, canonical, body copy and JSON-LD —
 * without JavaScript. Uses the same content maps as functions/_middleware.ts.
 *
 * Lovable's static hosting serves dist/<path>/index.html for /<path> before
 * falling back to the SPA index.html, so the SPA still hydrates on top for
 * real users.
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { resolve as pathResolve, dirname, join } from "node:path";
import {
  SITE,
  STATIC_META,
  CITY_META,
  FUNNEL,
  resolve as resolveMeta,
  SUPABASE_REST_URL,
} from "../functions/_middleware.js";

const DIST = pathResolve(process.cwd(), "dist");
const TEMPLATE_PATH = join(DIST, "index.html");

const anonKey =
  process.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  process.env.VITE_SUPABASE_ANON_KEY ||
  process.env.SUPABASE_ANON_KEY ||
  // Public anon key hardcoded fallback so the build works in Lovable/Cloudflare
  // build sandboxes that don't inject VITE_ env vars into the postbuild step.
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InViYm9na2xhc293bm9nbnZpb2JoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY3MjE4MTcsImV4cCI6MjA4MjI5NzgxN30.k_kpjmELjMLrYIu74Op94VDb2bEK_5Kzno5DBaPbSy4";

if (!existsSync(TEMPLATE_PATH)) {
  console.error(`[prerender] dist/index.html missing — skipping`);
  process.exit(0);
}

const TEMPLATE = readFileSync(TEMPLATE_PATH, "utf8");

function escAttr(s: string): string {
  return String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
}

function escText(s: string): string {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function applyMeta(html: string, meta: { title: string; description: string; image: string }, canonical: string, body: string, robots?: string): string {
  let out = html;
  // <title>
  out = out.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escText(meta.title)}</title>`);
  const set = (attr: "name" | "property", key: string, value: string) => {
    const re = new RegExp(`(<meta\\s+${attr}=["']${key}["'][^>]*content=["'])[^"']*(["'][^>]*>)`, "i");
    if (re.test(out)) {
      out = out.replace(re, (m, g1, g2) => `${g1}${escAttr(value)}${g2}`);
    } else {
      out = out.replace(/<\/head>/i, `<meta ${attr}="${key}" content="${escAttr(value)}">\n</head>`);
    }
  };
  set("name", "description", meta.description);
  set("property", "og:title", meta.title);
  set("property", "og:description", meta.description);
  set("property", "og:image", meta.image);
  set("property", "og:image:width", "1200");
  set("property", "og:image:height", "630");
  set("property", "og:url", canonical);
  set("name", "twitter:title", meta.title);
  set("name", "twitter:description", meta.description);
  set("name", "twitter:image", meta.image);
  set("name", "twitter:card", "summary_large_image");
  if (robots) set("name", "robots", robots);
  // canonical
  const canonRe = /<link\s+rel=["']canonical["'][^>]*>/i;
  const canonTag = `<link rel="canonical" href="${escAttr(canonical)}">`;
  out = canonRe.test(out) ? out.replace(canonRe, canonTag) : out.replace(/<\/head>/i, `${canonTag}\n</head>`);
  // Inject body into #root (keep existing root shell intact for hydration)
  out = out.replace(
    /<div\s+id=["']root["'][^>]*>[\s\S]*?<\/div>/i,
    (match) => {
      // Preserve original opening tag; inject prerendered content inside a
      // <noscript>-friendly wrapper so it's readable by non-JS crawlers but
      // React can safely rehydrate on top (React 18 mount replaces children).
      const openTag = match.match(/<div\s+id=["']root["'][^>]*>/i)?.[0] || `<div id="root">`;
      return `${openTag}<div data-prerendered="true">${body}</div></div>`;
    },
  );
  return out;
}

function pathToFile(p: string): string {
  const clean = p === "/" ? "/" : p.replace(/\/+$/, "");
  if (clean === "/") return join(DIST, "index.html");
  return join(DIST, clean.replace(/^\//, ""), "index.html");
}

function blogIndexBody(posts: BlogRow[]): string {
  if (!posts.length) return "";
  const items = posts
    .map((p) => {
      const title = escText(p.title || p.slug.replace(/-/g, " "));
      const url = `${SITE}/blog/${p.slug}`;
      const date = p.date || p.lastmod || "";
      const excerpt = p.excerpt ? `<p>${escText(p.excerpt.slice(0, 200))}</p>` : "";
      return `<li><article><h3><a href="${url}">${title}</a></h3>${date ? `<time datetime="${date}">${date}</time>` : ""}${excerpt}</article></li>`;
    })
    .join("");
  const ld = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "Blog", "@id": `${SITE}/blog`, name: "Presale Buying Guides & BC Market Insights", url: `${SITE}/blog` },
      {
        "@type": "ItemList",
        itemListElement: posts.map((p, i) => ({
          "@type": "ListItem",
          position: i + 1,
          url: `${SITE}/blog/${p.slug}`,
          name: p.title || p.slug,
        })),
      },
    ],
  };
  return `<section><h2>All presale guides (${posts.length})</h2><ul>${items}</ul></section><script type="application/ld+json">${JSON.stringify(ld).replace(/</g, "\\u003c")}</script>`;
}

async function writeRoute(path: string, extraBody = ""): Promise<void> {
  const env: Record<string, string | undefined> = {
    VITE_SUPABASE_PUBLISHABLE_KEY: anonKey,
  };
  const resolved = await resolveMeta(path, env);
  const canonical = resolved.canonical || `${SITE}${path === "/" ? "/" : path.replace(/\/+$/, "")}`;
  const html = applyMeta(TEMPLATE, resolved.meta, canonical, (resolved.body || "") + extraBody, resolved.robots);
  const file = pathToFile(path);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html);
}

interface BlogRow { slug: string; lastmod?: string; title?: string; excerpt?: string; date?: string }

async function fetchBlogPosts(): Promise<BlogRow[]> {
  try {
    const url = `${SUPABASE_REST_URL}/rest/v1/blog_posts?published=eq.true&select=slug,title,excerpt,updated_at,published_at&order=published_at.desc&limit=1000`;
    const r = await fetch(url, { headers: { apikey: anonKey, Authorization: `Bearer ${anonKey}` } });
    if (!r.ok) return [];
    const rows = (await r.json()) as Array<{ slug: string; title?: string; excerpt?: string; updated_at?: string; published_at?: string }>;
    return rows
      .filter((row) => row.slug)
      .map((row) => {
        const stamp = row.updated_at || row.published_at;
        return {
          slug: row.slug,
          title: row.title,
          excerpt: row.excerpt || undefined,
          date: row.published_at ? new Date(row.published_at).toISOString().split("T")[0] : undefined,
          lastmod: stamp ? new Date(stamp).toISOString().split("T")[0] : undefined,
        };
      });
  } catch (e) {
    console.warn("[prerender] blog fetch failed:", (e as Error).message);
    return [];
  }
}


async function fetchProjectSlugs(): Promise<string[]> {
  try {
    const url = `${SUPABASE_REST_URL}/rest/v1/presale_projects?is_published=eq.true&select=slug&limit=1000`;
    const r = await fetch(url, { headers: { apikey: anonKey, Authorization: `Bearer ${anonKey}` } });
    if (!r.ok) return [];
    const rows = (await r.json()) as Array<{ slug: string }>;
    return rows.map((r) => r.slug).filter(Boolean);
  } catch (e) {
    console.warn("[prerender] project fetch failed:", (e as Error).message);
    return [];
  }
}

/**
 * Sitemap generation — runs in the same post-build step as the prerender so
 * blog lastmod values come from each post's real updated timestamp instead of
 * being hand-frozen. Static/city/funnel routes fall back to the build date.
 * /projects/* pages are noindex and excluded; /agents 301s to / and is excluded.
 */
const BUILD_DATE = new Date().toISOString().split("T")[0];

const STATIC_PRIORITY: Record<string, { priority: string; changefreq: string }> = {
  "/": { priority: "1.0", changefreq: "weekly" },
  "/blog": { priority: "0.9", changefreq: "daily" },
  "/about": { priority: "0.8", changefreq: "monthly" },
  "/services": { priority: "0.8", changefreq: "monthly" },
  "/contact": { priority: "0.8", changefreq: "monthly" },
  "/call": { priority: "0.6", changefreq: "monthly" },
  "/presale-guide": { priority: "0.7", changefreq: "monthly" },
};

function urlNode(path: string, lastmod: string, changefreq: string, priority: string): string {
  return `  <url><loc>${SITE}${path === "/" ? "/" : path}</loc><lastmod>${lastmod}</lastmod><changefreq>${changefreq}</changefreq><priority>${priority}</priority></url>`;
}

function writeSitemap(blogPosts: BlogRow[]) {
  const lines: string[] = [];
  for (const p of Object.keys(STATIC_META)) {
    const cfg = STATIC_PRIORITY[p] || { priority: "0.8", changefreq: "monthly" };
    lines.push(urlNode(p, BUILD_DATE, cfg.changefreq, cfg.priority));
  }
  for (const p of Object.keys(FUNNEL)) {
    lines.push(urlNode(p, BUILD_DATE, "monthly", "0.9"));
  }
  for (const p of Object.keys(CITY_META)) {
    lines.push(urlNode(p, BUILD_DATE, "weekly", "0.9"));
  }
  for (const post of blogPosts) {
    lines.push(urlNode(`/blog/${post.slug}`, post.lastmod || BUILD_DATE, "monthly", "0.7"));
  }
  const xml = [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    ...lines,
    `</urlset>`,
    ``,
  ].join("\n");
  writeFileSync(join(DIST, "sitemap.xml"), xml);
  try {
    writeFileSync(pathResolve(process.cwd(), "public/sitemap.xml"), xml);
  } catch {
    /* public/ may be read-only in some build sandboxes */
  }
  console.log(`[prerender] sitemap.xml written (${lines.length} urls)`);
}

async function main() {
  const paths = new Set<string>();
  Object.keys(STATIC_META).forEach((p) => paths.add(p));
  Object.keys(CITY_META).forEach((p) => paths.add(p));
  Object.keys(FUNNEL).forEach((p) => paths.add(p));
  const blogPosts = await fetchBlogPosts();
  blogPosts.forEach((p) => paths.add(`/blog/${p.slug}`));
  const projectSlugs = await fetchProjectSlugs();
  projectSlugs.forEach((s) => paths.add(`/projects/${s}`));

  let ok = 0;
  let fail = 0;
  for (const p of paths) {
    try {
      await writeRoute(p, p === "/blog" ? blogIndexBody(blogPosts) : "");
      ok++;
    } catch (e) {
      fail++;
      console.warn(`[prerender] ${p} failed:`, (e as Error).message);
    }
  }
  writeSitemap(blogPosts);
  console.log(`[prerender] wrote ${ok} routes (${blogPosts.length} blog posts, ${projectSlugs.length} projects), ${fail} failed`);
}


main();

