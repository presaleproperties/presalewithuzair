/**
 * GA4 conversion tracking for the "Book a 15-Minute Call" funnel.
 *
 * Events:
 *  - `book_call`   — fired on every CTA click (popup or direct Calendly link).
 *  - `call_booked` — fired when Calendly confirms `calendly.event_scheduled`
 *                    (works for both popup widgets and inline embeds).
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

let scheduledListenerAttached = false;
let callBookedFired = false;

/**
 * Listens for Calendly's postMessage confirmation and fires `call_booked`
 * once per page load. Attach once at app startup.
 */
export const initCalendlyConversionTracking = () => {
  if (scheduledListenerAttached || typeof window === "undefined") return;
  scheduledListenerAttached = true;

  window.addEventListener("message", (e) => {
    if (e.origin !== "https://calendly.com") return;
    const event = (e as MessageEvent).data?.event;
    if (event === "calendly.event_scheduled" && !callBookedFired) {
      callBookedFired = true;
      gtag("event", "call_booked", {
        event_category: "conversion",
        ...pageContext(),
      });
    }
    // A new page load resets callBookedFired via full reloads; SPA navigations
    // keep it so a user can't double-count by re-opening the widget.
  });
};
