/**
 * Canonical structured-data identifiers.
 *
 * The authoritative Person + RealEstateAgent/LocalBusiness + WebSite @graph
 * lives once in index.html (and is inherited by every prerendered route).
 * Everything else on the site must REFERENCE those nodes by @id instead of
 * re-declaring a competing Organization — that is what lets Google and answer
 * engines merge every page into one authority entity.
 */

export const SITE_URL = "https://presalewithuzair.com";

export const PERSON_ID = `${SITE_URL}/#uzair`;
export const AGENT_ID = `${SITE_URL}/#agent`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

/** Reference to the canonical RealEstateAgent/LocalBusiness entity. */
export const agentRef = { "@id": AGENT_ID } as const;

/** Reference to the canonical Person entity (Uzair). */
export const personRef = { "@id": PERSON_ID } as const;

/** Use as `publisher` on Article/Blog/WebPage nodes. */
export const publisherRef = agentRef;

/** Use as `author` on Article/Blog nodes. */
export const authorRef = personRef;

/**
 * A page-scoped LocalBusiness/RealEstateAgent branch (e.g. a city landing
 * page). It is a sub-entity of the canonical agent, never a duplicate of it.
 */
export function localBusinessBranch(opts: {
  url: string;
  city: string;
  description: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": ["RealEstateAgent", "LocalBusiness"],
    "@id": `${opts.url}#agent`,
    name: `Uzair Muhammad — Presale With Uzair (${opts.city})`,
    alternateName: "Presale With Uzair",
    description: opts.description,
    url: opts.url,
    parentOrganization: agentRef,
    founder: personRef,
    employee: personRef,
    telephone: "+1-778-231-3592",
    email: "info@meetuzair.com",
    priceRange: "$400,000 - $3,000,000",
    currenciesAccepted: "CAD",
    image: `${SITE_URL}/og/default.png`,
    address: {
      "@type": "PostalAddress",
      streetAddress: "3211 152 St, Building C",
      addressLocality: opts.city,
      addressRegion: "BC",
      postalCode: "V3Z 1H8",
      addressCountry: "CA",
    },
    areaServed: {
      "@type": "City",
      name: opts.city,
      containedInPlace: { "@type": "AdministrativeArea", name: "British Columbia" },
    },
    knowsLanguage: ["en", "pa", "hi", "ur", "ta", "te"],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: 4.9,
      reviewCount: 36,
      bestRating: 5,
    },
  };
}
