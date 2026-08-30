/**
 * GA4 conversion tracking for the "Book a 15-Minute Call" funnel.
 *
 * Events:
 *  - `book_call` — fired on every booking CTA click (form opened).
 *  - `lead_form_submitted` — fired when the booking form submits successfully.
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

/** Fires when the booking/lead form is successfully submitted. */
export const trackLeadFormSubmitted = (details: {
  ctaSource?: string;
  city?: string;
  project?: string;
  buyerType?: string;
  budget?: string;
  timeline?: string;
  leadSource?: string;
  landingPage?: string;
}) => {
  gtag("event", "lead_form_submitted", {
    cta_source: details.ctaSource,
    city: details.city,
    project: details.project,
    buyer_type: details.buyerType,
    budget: details.budget,
    timeline: details.timeline,
    lead_source: details.leadSource,
    landing_page: details.landingPage,
    ...pageContext(),
  });
};
