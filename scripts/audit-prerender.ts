/**
 * Prepublish prerender audit.
 *
 * Crawls the built dist/ output the way a JavaScript-disabled crawler would:
 * it reads the raw HTML that hosting serves for each route and asserts that
 * real content — title, meta description, canonical, an H1 and body copy — is
 * present without any React hydration.
 *
 * Run: npm run audit:prerender   (also runs automatically after `npm run build`)
 * Exits non-zero when any required route fails, so a broken prerender can't
 * silently ship.
 */

import { readFileSync, existsSync, readdirSync } from "node:fs";
import { resolve as pathResolve, join } from "node:path";
import { SITE, STATIC_META, CITY_META, FUNNEL } from "../functions/_middleware.js";

const DIST = pathResolve(process.cwd(), "dist");
const STRICT = process.env.PRERENDER_AUDIT_STRICT !== "false";
const MIN_TEXT = 600; // chars of visible text required in the raw HTML
const SAMPLE = Number(process.env.PRERENDER_AUDIT_SAMPLE || 12); // blog/project samples

interface Result {
  path: string;
  pass: boolean;
  issues: string[];
  textLen: number;
}

function fileFor(path: string): string {
  const clean = path.replace(/^\/+|\/+$/g, "");
  return clean ? join(DIST, clean, "index.html") : join(DIST, "index.html");
}

function visibleText(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function pick(re: RegExp, html: string): string | null {
  const m = html.match(re);
  return m ? m[1].trim() : null;
}

function auditRoute(path: string, homeHtml: string | null): Result {
  const issues: string[] = [];
  const file = fileFor(path);
  if (!existsSync(file)) {
    return { path, pass: false, issues: ["no prerendered file in dist/"], textLen: 0 };
  }
  const html = readFileSync(file, "utf8");
  const text = visibleText(html);

  const title = pick(/<title>([\s\S]*?)<\/title>/i, html);
  const desc =
    pick(/<meta\s+name="description"[^>]*content="([^"]*)"/i, html) ||
    pick(/<meta\s+name='description'[^>]*content='([^']*)'/i, html);
  const canonical =
    pick(/<link\s+rel="canonical"[^>]*href="([^"]*)"/i, html) ||
    pick(/<link\s+rel='canonical'[^>]*href='([^']*)'/i, html);
  const h1s = html.match(/<h1[\s>]/gi) || [];

  if (!title || title.length < 10) issues.push("missing/short <title>");
  if (!desc || desc.length < 50) issues.push("missing/short meta description");
  if (!canonical) issues.push("missing canonical");
  else if (!canonical.startsWith(SITE)) issues.push(`canonical not on ${SITE}`);
  if (h1s.length === 0) issues.push("no <h1> in raw HTML");
  if (h1s.length > 1) issues.push(`${h1s.length} <h1> tags`);
  if (text.length < MIN_TEXT) issues.push(`only ${text.length} chars of text (min ${MIN_TEXT})`);
  if (path !== "/" && homeHtml) {
    const homeTitle = pick(/<title>([\s\S]*?)<\/title>/i, homeHtml);
    if (title && homeTitle && title === homeTitle) issues.push("serves homepage shell (duplicate title)");
  }

  return { path, pass: issues.length === 0, issues, textLen: text.length };
}

function sitemapPaths(prefix: string, limit: number): string[] {
  const f = join(DIST, "sitemap.xml");
  if (!existsSync(f)) return [];
  const xml = readFileSync(f, "utf8");
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].replace(SITE, "").replace(/\/$/, "") || "/");
  return locs.filter((p) => p.startsWith(prefix)).slice(0, limit);
}

function main() {
  if (!existsSync(join(DIST, "index.html"))) {
    console.error("[audit] dist/index.html missing — run the build first");
    process.exit(1);
  }
  const homeHtml = readFileSync(join(DIST, "index.html"), "utf8");

  const required = [
    "/",
    ...Object.keys(STATIC_META),
    ...Object.keys(CITY_META),
    ...Object.keys(FUNNEL),
  ].filter((p, i, a) => a.indexOf(p) === i);

  // Project pages are noindex (canonical points to presaleproperties.com) so
  // they never appear in the sitemap — sample them straight from dist/.
  const projectDir = join(DIST, "projects");
  const projects = existsSync(projectDir)
    ? readdirSync(projectDir, { withFileTypes: true })
        .filter((d) => d.isDirectory())
        .slice(0, SAMPLE)
        .map((d) => `/projects/${d.name}`)
    : [];
  const sampled = [...sitemapPaths("/blog/", SAMPLE), ...projects];

  const groups: Array<[string, string[]]> = [
    ["required", required],
    ["sampled", sampled],
  ];

  let failures = 0;
  const rows: Array<Result & { group: string }> = [];

  for (const [group, paths] of groups) {
    for (const p of paths) {
      const r = auditRoute(p, p === "/" ? null : homeHtml);
      rows.push({ ...r, group });
      if (!r.pass) failures++;
    }
  }

  console.log("\n[audit] prerender pass/fail report (JavaScript disabled)\n");
  for (const r of rows) {
    const status = r.pass ? "PASS" : "FAIL";
    console.log(
      `${status.padEnd(4)}  ${r.path.padEnd(46)} ${String(r.textLen).padStart(6)} chars` +
        (r.pass ? "" : `  — ${r.issues.join("; ")}`),
    );
  }
  const total = rows.length;
  console.log(
    `\n[audit] ${total - failures}/${total} routes pass ` +
      `(${required.length} required, ${sampled.length} sampled from sitemap)\n`,
  );

  if (failures > 0 && STRICT) {
    console.error(`[audit] ${failures} route(s) failed the prerender audit — not safe to publish`);
    process.exit(1);
  }
}

main();
