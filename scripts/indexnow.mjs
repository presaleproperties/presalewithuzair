/**
 * IndexNow ping (Bing, Yandex, Seznam, Naver — one submission, all of them).
 *
 * Reads dist/sitemap.xml after the build and submits every URL, plus the
 * sitemap itself, to https://api.indexnow.org/indexnow. The key file must be
 * reachable at https://presalewithuzair.com/<key>.txt (see public/<key>.txt).
 *
 * Non-fatal by design: a failed ping never breaks a deploy.
 */
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const HOST = "presalewithuzair.com";
const KEY = process.env.INDEXNOW_KEY || "8f62fbc895ed4dfeb1be3581ff05df37";
const ENDPOINT = "https://api.indexnow.org/indexnow";
const SITEMAP = join(process.cwd(), "dist", "sitemap.xml");

// Skip on non-production builds (Cloudflare Pages preview branches, local dev).
const branch = process.env.CF_PAGES_BRANCH;
if (branch && branch !== "main" && !process.env.INDEXNOW_FORCE) {
  console.log(`[indexnow] branch "${branch}" is not production — skipping ping`);
  process.exit(0);
}

if (!existsSync(SITEMAP)) {
  console.log("[indexnow] dist/sitemap.xml missing — skipping ping");
  process.exit(0);
}

const xml = readFileSync(SITEMAP, "utf8");
const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)]
  .map((m) => m[1].trim())
  .filter((u) => u.startsWith(`https://${HOST}`));

// Include the sitemap itself so Bing re-crawls it in the same submission.
const urlList = [...new Set([...urls, `https://${HOST}/sitemap.xml`])];

if (!urlList.length) {
  console.log("[indexnow] no URLs found in sitemap — skipping ping");
  process.exit(0);
}

const payload = { host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList };

try {
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(payload),
  });
  const text = await res.text().catch(() => "");
  console.log(
    `[indexnow] submitted ${urlList.length} URLs → HTTP ${res.status} ${res.statusText}${text ? ` :: ${text.slice(0, 300)}` : ""}`,
  );
  if (res.status !== 200 && res.status !== 202) {
    console.warn("[indexnow] non-success status — search engines were not notified this build");
  }
} catch (err) {
  console.warn(`[indexnow] ping failed (non-fatal): ${err instanceof Error ? err.message : String(err)}`);
}
