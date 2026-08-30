/**
 * GA4 conversion tracking for the "Book a 15-Minute Call" funnel.
 *
 * Events:
 *  - `book_call` — fired on every booking CTA click.
 */

const gtag = (...args: unknown[]) => {
  try {
    (window as any).gtag?.(...args);
  } catch {
    /* GA blocked — never break the UI */
  }
};

const pageContext = () => ({
  page_path: window.location.pathname,
  page_title: document.title,
});

/** Fires when any "Book a 15-Minute Call" CTA is clicked. */
export const trackBookCall = (ctaLocation: string) => {
  gtag("event", "book_call", {
    cta_location: ctaLocation,
    ...pageContext(),
  });
};
