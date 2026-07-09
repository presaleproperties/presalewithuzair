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
      out = out.replace(re, `$1${escAttr(value)}$2`);
    } else {
      out = out.replace(/<\/head>/i, `<meta ${attr}="${key}" content="${escAttr(value)}">\n</head>`);
    }
  };
  set("name", "description", meta.description);
  set("property", "og:title", meta.title);
  set("property", "og:description", meta.description);
  set("property", "og:image", meta.image);
  set("property", "og:url", canonical);
  set("name", "twitter:title", meta.title);
  set("name", "twitter:description", meta.description);
  set("name", "twitter:image", meta.image);
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

async function writeRoute(path: string): Promise<void> {
  const env: Record<string, string | undefined> = {
    VITE_SUPABASE_PUBLISHABLE_KEY: anonKey,
  };
  const resolved = await resolveMeta(path, env);
  const canonical = resolved.canonical || `${SITE}${path === "/" ? "/" : path.replace(/\/+$/, "")}`;
  const html = applyMeta(TEMPLATE, resolved.meta, canonical, resolved.body || "", resolved.robots);
  const file = pathToFile(path);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html);
}

async function fetchBlogSlugs(): Promise<string[]> {
  try {
    const url = `${SUPABASE_REST_URL}/rest/v1/blog_posts?published=eq.true&select=slug&limit=1000`;
    const r = await fetch(url, { headers: { apikey: anonKey, Authorization: `Bearer ${anonKey}` } });
    if (!r.ok) return [];
    const rows = (await r.json()) as Array<{ slug: string }>;
    return rows.map((r) => r.slug).filter(Boolean);
  } catch (e) {
    console.warn("[prerender] blog fetch failed:", (e as Error).message);
    return [];
  }
}

async function main() {
  const paths = new Set<string>();
  Object.keys(STATIC_META).forEach((p) => paths.add(p));
  Object.keys(CITY_META).forEach((p) => paths.add(p));
  Object.keys(FUNNEL).forEach((p) => paths.add(p));
  const blogSlugs = await fetchBlogSlugs();
  blogSlugs.forEach((s) => paths.add(`/blog/${s}`));

  let ok = 0;
  let fail = 0;
  for (const p of paths) {
    try {
      await writeRoute(p);
      ok++;
    } catch (e) {
      fail++;
      console.warn(`[prerender] ${p} failed:`, (e as Error).message);
    }
  }
  console.log(`[prerender] wrote ${ok} routes (${blogSlugs.length} blog posts), ${fail} failed`);
}

main();
