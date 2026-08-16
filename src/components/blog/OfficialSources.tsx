/**
 * E-E-A-T block for tax / legal blog posts: links to the primary government
 * sources plus the general-information disclaimer.
 */

const SOURCES = [
  { label: "CRA — GST/HST new housing rebate", href: "https://www.canada.ca/en/revenue-agency/services/tax/businesses/topics/gst-hst-businesses/charge-collect-which-rate/rebate-gst-hst-new-housing.html" },
  { label: "CRA — Residential property flipping rule", href: "https://www.canada.ca/en/revenue-agency/programs/about-canada-revenue-agency-cra/federal-government-budgets/residential-property-flipping-rule.html" },
  { label: "Government of BC — Property transfer tax", href: "https://www2.gov.bc.ca/gov/content/taxes/property-taxes/property-transfer-tax" },
  { label: "Government of BC — BC home flipping tax", href: "https://www2.gov.bc.ca/gov/content/taxes/income-taxes/bc-home-flipping-tax" },
  { label: "BC Financial Services Authority (BCFSA)", href: "https://www.bcfsa.ca/" },
  { label: "BC Laws — Real Estate Development Marketing Act (REDMA)", href: "https://www.bclaws.gov.bc.ca/civix/document/id/complete/statreg/04041_01" },
];

/** Slug/title keywords that make a post tax- or law-dependent. */
const TAX_LEGAL_RE =
  /gst|rebate|ptt|property-transfer|property transfer|flipping|tax|rescission|assignment|assign|deposit|disclosure|redma|warranty|legal/i;

export const isTaxLegalPost = (slug: string, title?: string | null): boolean =>
  TAX_LEGAL_RE.test(slug) || TAX_LEGAL_RE.test(title || "");

export const OfficialSources = () => (
  <aside className="mt-14 rounded-sm border border-border bg-card p-6 md:p-8">
    <h2 className="font-display text-xl font-bold text-foreground mb-4">Official sources</h2>
    <ul className="space-y-2 text-sm">
      {SOURCES.map((s) => (
        <li key={s.href}>
          <a
            href={s.href}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="text-foreground/80 underline underline-offset-4 hover:text-primary transition-colors"
          >
            {s.label}
          </a>
        </li>
      ))}
    </ul>
    <p className="mt-5 pt-5 border-t border-border text-sm text-muted-foreground">
      This is general information, not tax or legal advice. Rules change and eligibility depends on your
      situation — confirm with a tax professional or a BC real estate lawyer before you sign.
    </p>
  </aside>
);
