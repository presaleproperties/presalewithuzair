// ============================================================================
// presalewithuzair.com — edge router (Cloudflare Worker)
//
// HISTORY / DO NOT REINTRODUCE THE STUB
// Until 2026-09-16 this worker detected crawlers and replaced the page with a
// ~1.6KB HTML stub containing only meta tags, an <h1> and one <p>. Any path not
// in its hardcoded STATIC map fell through to a catch-all that served the
// HOMEPAGE title and description with a 200 status — inventing pages that
// return 404 to real users.
//
// The origin already prerenders full pages with a unique <title>, meta
// description, canonical, og:title, og:image, twitter:card and 2-3 JSON-LD
// blocks. The stub was strictly worse than doing nothing, for search engines
// and for link previews alike.
//
// Responsibilities now:
//   1. www -> apex, 301, path and query preserved. Canonicals, og:url and the
//      sitemap all use the apex host, so www must never serve a 200.
//   2. Everything else passes through to origin untouched — same bytes for
//      crawlers and humans, which is what Google and Bing want anyway.
// ============================================================================

export default {
  async fetch(request) {
    const url = new URL(request.url);

    if (url.hostname === "www.presalewithuzair.com") {
      const apex = new URL(url.toString());
      apex.hostname = "presalewithuzair.com";
      return Response.redirect(apex.toString(), 301);
    }

    return fetch(request);
  },
};
