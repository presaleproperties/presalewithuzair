import { Helmet } from "react-helmet-async";

const SCHEMA = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "RealEstateAgent"],
  name: "The Presale Properties Group",
  alternateName: "Presale With Uzair",
  description:
    "Fraser Valley's leading presale condo expert. Buyer-only representation across Surrey, Langley, Abbotsford, Coquitlam, Delta and Burnaby South.",
  url: "https://presalewithuzair.com",
  telephone: "+17782313592",
  founder: {
    "@type": "Person",
    name: "Uzair Muhammad",
    jobTitle: "Presale Real Estate Expert",
    knowsLanguage: ["English", "Punjabi", "Urdu", "Hindi", "Telugu"],
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "9639 137A Street",
    addressLocality: "Surrey",
    addressRegion: "BC",
    addressCountry: "CA",
  },
  areaServed: ["Surrey", "Langley", "Abbotsford", "Coquitlam", "Delta", "Burnaby"],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Presale Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "VIP Presale Condo Access" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Presale Townhome Buying" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Assignment Sales" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Investor Advisory" } },
    ],
  },
};

export const SiteSchema = () => (
  <Helmet>
    <script type="application/ld+json">{JSON.stringify(SCHEMA)}</script>
  </Helmet>
);
