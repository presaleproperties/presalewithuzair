# Diagnose and fix live route 404 handling

## Implementation
- Instrument the middleware route decision with a temporary `x-route-known: true|false|null` response header while retaining `x-mw`.
- Ensure the generated `dist/_worker.js` invokes the route check and immediately returns the 404 response when the result is `false`; preserve fail-open behavior for `null`.
- Publish and probe the specified fake, real, sitemap, and project URLs.
- After live 404 behavior is confirmed, remove both temporary debug headers, republish, and repeat the regression checks.

## Technical details
- Make targeted changes only in the middleware/worker path.
- Keep dynamic blog/project database failures fail-open.
- A false static-route result must return HTTP 404 with `noindex, follow` and must not fall through to asset delivery.
