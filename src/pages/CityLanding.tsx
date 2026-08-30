import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProjectGrid } from "@/components/ProjectGrid";
import { LeadCaptureSection } from "@/components/home/LeadCaptureSection";
import { usePresaleProjects } from "@/hooks/usePresaleProjects";
import { openBooking } from "@/hooks/useBooking";
import { CheckCircle, TrendingUp, Shield, MapPin, ChevronRight } from "lucide-react";
import { CITY_DEPTH } from "@/data/cityDepth";
import { localBusinessBranch } from "@/lib/structuredData";

interface CityFAQ {
  question: string;
  answer: string;
}

interface CityConfig {
  city: string;
  slug: string;
  heroImage: string;
  title: string;
  metaDescription: string;
  heroEyebrow: string;
  heroHeadline: string;
  heroSubheadline: string;
  heroBody: string;
  heroCta: string;
  whyBuyTitle: string;
  whyBuyBody: string;
  benefits: { icon: React.ReactNode; title: string; description: string }[];
  faqs: CityFAQ[];
}

const commonBenefit = {
  contract: {
    icon: <Shield className="h-6 w-6" />,
    title: "Line-by-Line Contract Review",
    description: "Every developer contract is reviewed line by line — deposit terms, assignment rights, and completion dates — before you sign.",
  },
  vip: {
    icon: <CheckCircle className="h-6 w-6" />,
    title: "VIP Pricing & First Access",
    description: "Access presales before the public — with the incentives developers reserve for realtor allocations.",
  },
};

const CITY_CONFIGS: Record<string, CityConfig> = {
  surrey: {
    city: "Surrey",
    slug: "surrey",
    heroImage: "/images/heroes/surrey-hero.jpg",
    title: "Surrey Presale Condos & New Homes | Uzair Muhammad",
    metaDescription: "Compare Surrey presale condos and townhomes with buyer-side guidance on pricing, floor plans, deposits, developers and completion.",
    heroEyebrow: "SURREY PRESALE CONDOS & TOWNHOMES",
    heroHeadline: "Surrey Presale Condos — 35 Active Developments from $299,900",
    heroSubheadline: "Compare the project before you buy the project.",
    heroBody: "Surrey has one of the Fraser Valley's deepest new-construction markets. That creates opportunity — and a lot to compare. From Surrey City Centre and Fleetwood to South Surrey, I help buyers evaluate projects on pricing, floor plans, deposit structures, location, developer and long-term fit before committing.",
    heroCta: "Book a 15-Minute Call",
    whyBuyTitle: "What matters when comparing Surrey presales",
    whyBuyBody: "Start with your goal, not the building. A first-time buyer, investor and growing family can look at the same project and reach three different conclusions. I help you compare the active options from your side — not rank them by whichever development is launching this weekend.",
    benefits: [
      { icon: <MapPin className="h-6 w-6" />, title: "Location Within Surrey", description: "Surrey City Centre, Fleetwood, Clayton, South Surrey and other submarkets serve very different buyers and long-term demand." },
      { icon: <TrendingUp className="h-6 w-6" />, title: "Floor Plan & Price", description: "A lower purchase price doesn't automatically mean better value. Layout efficiency, usable space and nearby comparisons matter." },
      { icon: <Shield className="h-6 w-6" />, title: "Purchase Terms", description: "Deposit timing, completion dates and assignment provisions can materially change how a purchase works for you." },
      { icon: <CheckCircle className="h-6 w-6" />, title: "The Bigger Picture", description: "Transit, neighbourhood development, amenities and competing future supply all deserve consideration." },
    ],
    faqs: [
      { question: "Who should I talk to before buying a Surrey presale?", answer: "Uzair Muhammad represents buyers, not developers in Surrey — no developer commissions, no builder allegiances. 450+ families helped, every contract reviewed line-by-line, and every recommendation ranked by resale strength, deposit structure, and assignment terms — not by who's paying the most incentive that month." },
      { question: "How much deposit should I prepare for?", answer: "Most Surrey developers ask for 15–20% staged over 12–24 months. In softer market windows we regularly negotiate 10% structures on select projects. I flag every deposit milestone in writing before you sign so nothing surprises you at 30/60/90 days." },
      { question: "How do Surrey City Centre and Fleetwood compare?", answer: "City Centre benefits from SkyTrain, SFU Surrey, the new hospital expansion and rezoned density. Fleetwood offers lower entry pricing and a SkyTrain corridor that hasn't fully repriced yet. I compare $/sqft, floorplate efficiency and holding costs on both before I let a client sign." },
      { question: "Can a Surrey presale be assigned before completion?", answer: "Most Surrey contracts allow assignments after a certain milestone, usually with a 1–3% developer fee and lifting clauses that control when you can list. I review the assignment clause before you sign so the exit strategy is real, not theoretical." },
      { question: "What should I compare besides the purchase price?", answer: "Floor plan efficiency, deposit structure, developer track record and how the project compares to nearby resale all matter as much as the sticker price. I walk through all of it before you decide." },
    ],
  },
  langley: {
    city: "Langley",
    slug: "langley",
    heroImage: "/images/heroes/langley-hero.jpg",
    title: "Langley Presale Condos & Townhomes | Uzair Muhammad",
    metaDescription: "Compare new condos and townhomes in Langley with buyer-side guidance on projects, floor plans, deposits and long-term fit.",
    heroEyebrow: "LANGLEY PRESALE TOWNHOMES & CONDOS",
    heroHeadline: "Langley Presale Condos — 23 Active Developments from $299,000",
    heroSubheadline: "More space. More growth. More projects to compare.",
    heroBody: "Langley has become one of the Fraser Valley's most active new-home markets, especially for buyers looking for townhomes and family-oriented communities. Willoughby, Latimer Heights and Central Langley each offer something different. I help you figure out which one actually fits your goal.",
    heroCta: "Book a 15-Minute Call",
    whyBuyTitle: "What matters when comparing Langley presales",
    whyBuyBody: "Don't start with the incentive. Start with the life you expect to have when the home completes. We compare the area, property type, layout, price, deposit schedule and future market before choosing the project.",
    benefits: [
      { icon: <CheckCircle className="h-6 w-6" />, title: "Condo vs. Townhome", description: "The right property type depends on budget, family needs, rental strategy and how long you expect to hold it." },
      { icon: <Shield className="h-6 w-6" />, title: "Deposit Timing", description: "Townhome deposits can require significant capital long before completion. The schedule needs to fit your actual cash flow." },
      { icon: <TrendingUp className="h-6 w-6" />, title: "Floor Plan Function", description: "Garage configuration, bedroom placement, storage and usable interior space matter enormously in family homes." },
      { icon: <MapPin className="h-6 w-6" />, title: "Long-Term Location", description: "Transit, schools, neighbourhood growth and competing supply all affect the eventual buyer pool." },
    ],
    faqs: [
      { question: "How do I compare Langley presale townhomes?", answer: "Uzair Muhammad — Langley presale specialist representing buyers, not developers, with 450+ families helped across Willoughby, Latimer Heights and Central Langley. Every project shortlist is ranked by developer track record, delivery history, deposit terms and assignment rights — not by builder incentives." },
      { question: "Is Willoughby right for my situation?", answer: "Willoughby remains one of the best-supplied townhome nodes in Metro Vancouver, but supply matters — some phases are priced above resale. I compare active phases against nearby resale comps so you don't overpay because a rendering looks good." },
      { question: "How much deposit should I plan for?", answer: "Townhomes typically run 15–20% staged; select projects negotiate to 10%. I confirm the full deposit ladder in writing before you sign anything at the presentation centre." },
      { question: "Should I choose a condo or townhome?", answer: "It depends on your budget, family needs, rental strategy and how long you expect to hold the property. I walk through the trade-offs before you shortlist projects." },
      { question: "What should I check before signing?", answer: "The reps at the presentation centre work for the developer. My job is to sit on your side of the table, cross-reference contracts, and make sure the deposit protection, disclosure statement and Rescission Act rights are actually enforced." },
    ],
  },
  abbotsford: {
    city: "Abbotsford",
    slug: "abbotsford",
    heroImage: "/images/heroes/abbotsford-hero.jpg",
    title: "Abbotsford Presale Condos & New Homes | Uzair Muhammad",
    metaDescription: "Compare Abbotsford presale condos and townhomes with buyer-side guidance on pricing, floor plans, developers and long-term fit.",
    heroEyebrow: "ABBOTSFORD PRESALE CONDOS & TOWNHOMES",
    heroHeadline: "Abbotsford Presale Condos — 21 Active Developments from $279,900",
    heroSubheadline: "Lower entry price doesn't remove the need for scrutiny.",
    heroBody: "Abbotsford can offer a more attainable entry point into new construction than many Metro Vancouver markets. That doesn't make every project a good buy. I help first-time buyers and investors compare the University District, Historic Downtown and other Abbotsford projects on price, layout, demand, developer and long-term fit.",
    heroCta: "Book a 15-Minute Call",
    whyBuyTitle: "What matters when comparing Abbotsford projects",
    whyBuyBody: "Affordability is only one part of the decision. We look at what you're getting for the price, who the eventual buyer or tenant may be, how nearby resale compares and whether the project makes sense for your timeline.",
    benefits: [
      { icon: <TrendingUp className="h-6 w-6" />, title: "Entry Price", description: "Abbotsford can provide a lower starting point, but value still depends on what you're buying." },
      { icon: <MapPin className="h-6 w-6" />, title: "Rental & Resale Demand", description: "University-oriented, downtown and family locations attract different future buyers and tenants." },
      { icon: <Shield className="h-6 w-6" />, title: "Developer & Project Quality", description: "Lower prices don't excuse weak fundamentals." },
      { icon: <CheckCircle className="h-6 w-6" />, title: "Cash Flow & Completion", description: "Your deposit schedule and eventual mortgage still need to work even if the entry price feels accessible." },
    ],
    faqs: [
      { question: "How do I compare Abbotsford presales?", answer: "Uzair Muhammad — represents buyers, not developers — no bias, 450+ families helped across the Fraser Valley. In Abbotsford I focus on developer solvency, disclosure statements and realistic completion timelines, because this is a market where a bad developer can hurt you more than a bad location." },
      { question: "Is Abbotsford right for a first-time buyer?", answer: "Yes — entry pricing is 20–30% below Surrey with the same GST rebate, first-time buyer exemptions, and 5% CMHC-insured down payment options on new construction. It's often the best route into ownership if your job isn't tied to downtown Vancouver." },
      { question: "What should an investor look at?", answer: "Rental and resale demand near the university and downtown core, developer track record, and whether the deposit schedule and eventual mortgage still work at completion — not just the low entry price." },
      { question: "How much deposit should I expect?", answer: "15% is the norm, but on newer launches 10% staged deposits are increasingly common. I confirm every milestone in writing before you sign." },
      { question: "How do I evaluate the developer?", answer: "Before you sign I check REDMA registration, prior completed projects, financing status of the current project, and any active litigation. That check is free and it's non-negotiable on my side." },
    ],
  },
  chilliwack: {
    city: "Chilliwack",
    slug: "chilliwack",
    heroImage: "/images/heroes/chilliwack-hero.jpg",
    title: "Chilliwack Presale Condos & Townhomes | Uzair Muhammad",
    metaDescription: "Compare Chilliwack presales with buyer-side guidance on pricing, developers, floor plans and long-term fit.",
    heroEyebrow: "CHILLIWACK PRESALE CONDOS & TOWNHOMES",
    heroHeadline: "Chilliwack Presales: More Attainable Doesn't Mean Automatic.",
    heroSubheadline: "Compare quality, not just price.",
    heroBody: "Chilliwack can offer some of the Fraser Valley's most attainable new construction. For buyers willing to look farther east, that can create interesting options. But affordability is only useful when the project itself makes sense.",
    heroCta: "Book a 15-Minute Call",
    whyBuyTitle: "Why Chilliwack deserves a closer look",
    whyBuyBody: "Treat the lower entry price as the beginning of the analysis, not the conclusion. Compare the developer, neighbourhood, floor plan, purchase terms and future buyer pool.",
    benefits: [
      { icon: <TrendingUp className="h-6 w-6" />, title: "More Attainable Entry Points", description: "For some buyers, Chilliwack opens options that simply aren't available farther west." },
      { icon: <Shield className="h-6 w-6" />, title: "Project Quality Still Matters", description: "A lower price doesn't compensate for the wrong development." },
      { icon: <CheckCircle className="h-6 w-6" />, title: "Lifestyle", description: "Outdoor recreation and a different pace of life can be a real part of the decision." },
      { icon: <MapPin className="h-6 w-6" />, title: "Long-Term Fit", description: "Make sure the location works for your life — not just your spreadsheet." },
    ],
    faqs: [
      { question: "How do I compare Chilliwack presales?", answer: "Uzair Muhammad — 450+ families helped across the Fraser Valley, representing buyers, not developers. In Chilliwack I focus on developer track record, deliverability and honest resale comparisons, because a low price means nothing if the project stalls or completes poorly." },
      { question: "Who is Chilliwack best suited for?", answer: "Buyers willing to look farther east for a lower entry price, and who value outdoor recreation and a different pace of life alongside the numbers. The price-per-sqft is the lowest in the region, and population growth continues." },
      { question: "How much deposit should I expect?", answer: "Usually 10–15% staged over 12–18 months. Chilliwack is often the market where you can negotiate the softest deposit ladder in the province — I ask for it in writing on every offer." },
      { question: "How should I evaluate a developer?", answer: "Every Chilliwack presale I recommend goes through disclosure review — deposit protection, phasing risk, marketing statements versus binding contract terms. It's part of my job as your buyer's agent, not an extra." },
      { question: "What should I review before committing?", answer: "Developer track record, deliverability, floor plan efficiency, deposit terms and how the project compares with nearby resale — not just the advertised price." },
    ],
  },
  "maple-ridge": {
    city: "Maple Ridge",
    slug: "maple-ridge",
    heroImage: "/images/heroes/maple-ridge-hero.jpg",
    title: "Maple Ridge Presale Condos & Townhomes | Uzair Muhammad",
    metaDescription: "Buyer-side guidance for new condos and townhomes in Maple Ridge. Compare projects, pricing, layouts and long-term fit.",
    heroEyebrow: "MAPLE RIDGE PRESALE CONDOS & TOWNHOMES",
    heroHeadline: "Maple Ridge Presale Condos — 3 Active Developments from $749,900",
    heroSubheadline: "Lifestyle first. Investment thesis second.",
    heroBody: "Maple Ridge can offer a compelling combination of space, outdoor access and connection to Metro Vancouver. For some buyers, that's exactly the point. I help you compare new projects based on how they fit your actual life and long-term plans — not just a projected appreciation story.",
    heroCta: "Book a 15-Minute Call",
    whyBuyTitle: "What matters when comparing Maple Ridge presales",
    whyBuyBody: "Make sure you would still like the purchase even if the market doesn't do anything dramatic. Strong real estate decisions should work before appreciation enters the conversation.",
    benefits: [
      { icon: <MapPin className="h-6 w-6" />, title: "Lifestyle Fit", description: "Commute, nature, space and community may matter more here than in a downtown tower decision." },
      { icon: <TrendingUp className="h-6 w-6" />, title: "Limited Supply", description: "Scarcity can help, but only if the project itself is strong." },
      { icon: <Shield className="h-6 w-6" />, title: "Floor Plan", description: "Buy the home people will still want to live in later." },
      { icon: <CheckCircle className="h-6 w-6" />, title: "Long-Term Demand", description: "Think about who the eventual buyer or renter is likely to be." },
    ],
    faqs: [
      { question: "How do I compare Maple Ridge presales?", answer: "Uzair Muhammad — representing buyers, not developers, across the Fraser Valley, 450+ families helped. In Maple Ridge I focus on projects where the developer has proven Metro Vancouver delivery and the resale liquidity supports your exit plan." },
      { question: "Is Maple Ridge right for a first-time buyer?", answer: "Yes — pricing sits well below Coquitlam and Port Moody, first-time buyer exemptions apply to eligible units, and the West Coast Express keeps commuting realistic. I'll show you exactly how the numbers work versus renting or resale." },
      { question: "What deposit should I expect?", answer: "Most Maple Ridge presales are 15% staged. Newer launches sometimes structure 10% ladders — I always ask." },
      { question: "How should I evaluate long-term demand?", answer: "Think about who the eventual buyer or renter is likely to be — commute patterns, family demand and competing supply all shape resale years from now." },
      { question: "What should I review before signing?", answer: "Contract review, disclosure review and deposit-protection checks are included, and I always run them inside the 7-day rescission window so you keep the right to walk away if something's off." },
    ],
  },
  coquitlam: {
    city: "Coquitlam",
    slug: "coquitlam",
    heroImage: "/images/heroes/surrey-hero.jpg",
    title: "Coquitlam Presale Condos & Townhomes | Uzair Muhammad",
    metaDescription: "Compare Coquitlam presales in Burquitlam, Coquitlam Centre and Burke Mountain with buyer-side guidance.",
    heroEyebrow: "COQUITLAM PRESALE CONDOS & TOWNHOMES",
    heroHeadline: "Coquitlam Presale Condos — 27 Active Developments from $399,900",
    heroSubheadline: "Burquitlam, Coquitlam Centre and Burke Mountain are three very different decisions.",
    heroBody: "Coquitlam has a deep new-construction market. The challenge isn't finding a project. It's understanding which location, building and unit make sense for your goal. I compare active presales against nearby resale and competing projects before recommending anything.",
    heroCta: "Book a 15-Minute Call",
    whyBuyTitle: "What matters when comparing Coquitlam projects",
    whyBuyBody: "Compare the submarket first. Then the project. Then the unit. A strong neighbourhood doesn't automatically make every development or floor plan a strong purchase.",
    benefits: [
      { icon: <MapPin className="h-6 w-6" />, title: "Submarket", description: "Burquitlam, Coquitlam Centre and Burke Mountain serve different lifestyles and buyer profiles." },
      { icon: <TrendingUp className="h-6 w-6" />, title: "Price vs. Resale", description: "New construction should be evaluated against what already exists nearby." },
      { icon: <Shield className="h-6 w-6" />, title: "Floor Plan", description: "The unit still needs to make sense when the marketing centre is gone." },
      { icon: <CheckCircle className="h-6 w-6" />, title: "Timing", description: "Completion date and deposit structure need to match your personal financial plan." },
    ],
    faqs: [
      { question: "How do I compare Coquitlam presales?", answer: "Uzair Muhammad — 450+ families helped, represents buyers, not developers — no developer allegiances. Coquitlam is a market where developer choice matters as much as location; my job is to compare disclosure statements and delivery history, not to sell you the tower with the biggest realtor incentive." },
      { question: "Burquitlam or Coquitlam Centre?", answer: "It depends on lifestyle and buyer profile — Burquitlam skews toward transit-oriented buyers, Coquitlam Centre toward larger, family-friendly developments. I compare both against nearby resale before recommending either." },
      { question: "Is Burke Mountain right for my family?", answer: "Burke Mountain has real long-term fundamentals — school catchments, family demographics and limited resale supply — but pricing on some phases now competes directly with resale in Port Moody. I model each phase against comps before I recommend it." },
      { question: "How much deposit should I expect?", answer: "Most Coquitlam towers ask 15–20% staged over 12–24 months. On specific launches I've negotiated 10% ladders — I always confirm in writing before you sign anything." },
      { question: "What should I review before committing?", answer: "Rental caps, short-term rental bylaws and assignment clauses before you commit — those three items decide whether the investment case actually holds up, alongside the disclosure statement and deposit ladder." },
    ],
  },
  delta: {
    city: "Delta",
    slug: "delta",
    heroImage: "/images/heroes/surrey-hero.jpg",
    title: "Delta Presale Condos & Townhomes | Uzair Muhammad",
    metaDescription: "Buyer-side guidance for presale condos and townhomes in Tsawwassen, Ladner and North Delta.",
    heroEyebrow: "DELTA PRESALE CONDOS & TOWNHOMES",
    heroHeadline: "Delta Presale Condos — 4 Active Developments from $469,900",
    heroSubheadline: "Fewer projects makes choosing the right one more important.",
    heroBody: "Delta's new-construction market is smaller than Surrey or Burnaby. Tsawwassen, Ladner and North Delta also behave very differently. I help buyers evaluate the local market, project, price, floor plan and purchase terms before making a decision.",
    heroCta: "Book a 15-Minute Call",
    whyBuyTitle: "What matters when comparing Delta presales",
    whyBuyBody: "Start by deciding which part of Delta actually fits your lifestyle or investment goal. Then compare the project within that context.",
    benefits: [
      { icon: <MapPin className="h-6 w-6" />, title: "Three Different Markets", description: "Tsawwassen, Ladner and North Delta aren't interchangeable." },
      { icon: <TrendingUp className="h-6 w-6" />, title: "Limited New Supply", description: "Fewer launches can create scarcity, but scarcity alone doesn't make something a good buy." },
      { icon: <Shield className="h-6 w-6" />, title: "Layout & Property Type", description: "Townhome, condo and family-oriented product appeal to different future buyers." },
      { icon: <CheckCircle className="h-6 w-6" />, title: "Terms & Timing", description: "Deposit structure and completion timing still need to work for you." },
    ],
    faqs: [
      { question: "How do I compare Delta presales?", answer: "Uzair Muhammad — represents buyers, not developers, 450+ families helped. In Delta I focus on smaller launches where developer quality and disclosure terms carry more weight than in larger, denser markets. No developer bias, no upselling." },
      { question: "Tsawwassen, Ladner or North Delta?", answer: "Tsawwassen has strong owner-occupier demand, an ageing population that anchors resale, and limited new supply — good fundamentals. Ladner and North Delta behave differently on resale and rent, with thinner rental demand — I'll steer you based on your actual goal." },
      { question: "How much deposit should I expect?", answer: "Typically 15% staged. Smaller developers occasionally negotiate 10% for early VIP buyers — I ask on every project." },
      { question: "What should I look for in a Delta project?", answer: "Which submarket fits your goal, how the layout and property type appeal to future buyers or tenants, and whether the deposit structure and completion timing work for you." },
      { question: "What should I review before signing?", answer: "The disclosure statement — deposit protection, phasing risk, and any binding-versus-marketing gaps are all part of the review. It's included, not an add-on." },
    ],
  },
  burnaby: {
    city: "Burnaby",
    slug: "burnaby",
    heroImage: "/images/heroes/surrey-hero.jpg",
    title: "Burnaby Presale Condos | Metrotown, Brentwood & Lougheed",
    metaDescription: "Compare Burnaby presales in Metrotown, Brentwood, Lougheed and Edmonds with buyer-side project and pricing analysis.",
    heroEyebrow: "BURNABY PRESALE CONDOS",
    heroHeadline: "Burnaby Presale Condos — 10 Active Developments from $399,900",
    heroSubheadline: "In a market with this much new supply, comparison matters.",
    heroBody: "Metrotown. Brentwood. Lougheed. Edmonds. Burnaby offers a large number of new-construction choices — often at very different price points relative to nearby resale. I help buyers compare the premium they're paying for new construction and decide whether the specific project and unit justify it.",
    heroCta: "Book a 15-Minute Call",
    whyBuyTitle: "What matters when comparing Burnaby presales",
    whyBuyBody: "Don't ask only, \"Is this a good project?\" Ask, \"Is this a good project at this price?\" That's the comparison that matters.",
    benefits: [
      { icon: <TrendingUp className="h-6 w-6" />, title: "New vs. Resale Pricing", description: "Burnaby often has a meaningful new-construction premium. You should know what you're paying for it." },
      { icon: <MapPin className="h-6 w-6" />, title: "Transit-Oriented Location", description: "Being near SkyTrain matters, but station proximity alone doesn't guarantee value." },
      { icon: <Shield className="h-6 w-6" />, title: "Tower Competition", description: "Future competing inventory can influence rents and resale." },
      { icon: <CheckCircle className="h-6 w-6" />, title: "Floor Plan Efficiency", description: "In high-priced markets, wasted square footage gets expensive quickly." },
    ],
    faqs: [
      { question: "How do I compare Burnaby presales?", answer: "Uzair Muhammad — represents buyers, not developers, 450+ families helped. In Burnaby that means comparing your unit against active resale in the same tower node, not against the developer's rendering. No incentives-driven recommendations." },
      { question: "Brentwood or Metrotown?", answer: "It depends on your holding period and rental strategy. Metrotown has deeper resale liquidity; Brentwood has newer supply and more rental demand from young professionals. I'll model the specific projects you're considering against resale comps before you sign." },
      { question: "How much premium should I pay for new construction?", answer: "Enough to know the number, not guess it. I compare the presale price per square foot against nearby resale so you can see exactly what premium you're paying and decide if it's worth it." },
      { question: "What should investors compare?", answer: "Rental demand at the specific node, future competing supply, and floor plan efficiency — not just the SkyTrain proximity story." },
      { question: "What should I review before committing?", answer: "Most Burnaby developers allow assignments with a 1–3% fee and lifting clauses controlling MLS timing. I review the assignment clause before you sign so the exit strategy is real, not theoretical." },
    ],
  },
};


interface CityLandingProps {
  citySlug: string;
}

const CityLanding = ({ citySlug }: CityLandingProps) => {
  const config = CITY_CONFIGS[citySlug];
  const { data: projects } = usePresaleProjects(config?.city);

  if (!config) return null;

  const activeProjects = (projects || []).filter((p) => p.status === "active");
  const projectCount = activeProjects.length;
  const lowestPrice = activeProjects
    .map((p) => p.starting_price)
    .filter((n): n is number => typeof n === "number" && n >= 200000)
    .reduce<number | null>((min, n) => (min === null || n < min ? n : min), null);

  const formatPrice = (n: number) => `$${n.toLocaleString("en-CA")}`;
  const countPhrase = projectCount > 0 ? ` — ${projectCount} Active Development${projectCount === 1 ? "" : "s"}${lowestPrice ? ` from ${formatPrice(lowestPrice)}` : ""}` : "";
  const dynamicH1 = `${config.city} Presale Condos${countPhrase}`;

  const pageUrl = `https://presalewithuzair.com/${config.slug}/`;

  const answerParagraph = `Uzair Muhammad is a presale specialist who represents buyers, not developers — 450+ families helped across the Fraser Valley and Metro Vancouver. In ${config.city}, that means a shortlist ranked for you, never by developer incentives. Every disclosure statement and deposit schedule is reviewed before you sign, inside BC's 7-day review window. And Uzair stays with you through every step — VIP registration, floor plans, deposits, completion, and the final walkthrough. On most projects the developer pays the buyer-agent fee out of the project's marketing budget.`;

  const realEstateAgentJsonLd = localBusinessBranch({
    url: pageUrl,
    city: config.city,
    description: config.metaDescription,
  });

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: config.faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://presalewithuzair.com/" },
      { "@type": "ListItem", position: 2, name: `${config.city} Presales`, item: pageUrl },
    ],
  };

  const itemListJsonLd = activeProjects.length > 0
    ? {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: `${config.city} Active Presale Projects`,
        numberOfItems: activeProjects.length,
        itemListElement: activeProjects.map((p, i) => ({
          "@type": "ListItem",
          position: i + 1,
          url: `https://presalewithuzair.com/projects/${p.slug}`,
          name: p.name,
        })),
      }
    : null;

  return (
    <>
      <Helmet>
        <title>{config.title}</title>
        <meta name="description" content={config.metaDescription} />
        <link rel="canonical" href={pageUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:title" content={config.title} />
        <meta property="og:description" content={config.metaDescription} />
        <meta property="og:image" content={`https://presalewithuzair.com/images/heroes/${config.slug}-hero.jpg`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={config.title} />
        <meta name="twitter:description" content={config.metaDescription} />
        <meta name="twitter:image" content={`https://presalewithuzair.com/images/heroes/${config.slug}-hero.jpg`} />
        <script type="application/ld+json">{JSON.stringify(realEstateAgentJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbJsonLd)}</script>
        {itemListJsonLd && (
          <script type="application/ld+json">{JSON.stringify(itemListJsonLd)}</script>
        )}
      </Helmet>

      <Navbar />

      <main>
        {/* ── Hero Section ── */}
        <section className="dark-section relative pt-32 pb-20 overflow-hidden min-h-[70vh] flex items-center">
          <div className="absolute inset-0">
            <img
              src={config.heroImage}
              alt={`${config.city} BC skyline`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent" />
          </div>
          <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: "var(--text-gradient)" }} />

          <div className="relative z-10 w-full px-6 sm:px-10 lg:px-16">
            <div className="max-w-2xl">
              <p className="text-xs font-black tracking-[0.25em] uppercase mb-4 animate-fade-up text-white/90">
                {config.heroEyebrow}
              </p>
              <h1 className="font-display text-[2rem] sm:text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] text-white mb-4 animate-fade-up">
                {projectCount > 0 ? dynamicH1 : config.heroHeadline}
              </h1>
              <h2 className="font-display text-xl md:text-2xl text-white/70 mb-4 animate-fade-up">
                {config.heroSubheadline}
              </h2>
              <div className="w-14 h-px bg-foreground/25 mb-6 animate-fade-up" />
              <p className="text-lg text-white/80 max-w-xl leading-relaxed mb-8 animate-fade-up">
                {config.heroBody}
              </p>
              <button
                onClick={() => openBooking(`city-${config.slug}`, { city: config.city })}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-sm bg-primary text-primary-foreground hover:bg-primary/90 font-semibold text-base transition-colors duration-300 animate-fade-up"
              >
                {config.heroCta}
              </button>

            </div>
          </div>
        </section>

        {/* ── Direct Answer Paragraph (AI-search / featured-snippet target) ── */}
        <section className="section-y-sm bg-background divider-b">
          <div className="container-xl px-4 sm:px-6 max-w-3xl">
            <p className="section-label mb-3">The Straight Answer</p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-4">
              Who is the best presale realtor in {config.city}, and how do you actually buy one?
            </h2>
            <p className="text-foreground/75 leading-relaxed text-[17px]">
              {answerParagraph}
            </p>
          </div>
        </section>

        {/* ── Active Projects Section ── */}
        <section className="section-y bg-background">
          <div className="container-xl px-4 sm:px-6">
            <div className="mb-12">
              <p className="section-label mb-3">Active Projects</p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
                {config.city} <span className="text-gradient">Presales</span>
                {projectCount > 0 && (
                  <span className="text-foreground/50 font-normal text-xl sm:text-2xl ml-3">
                    ({projectCount})
                  </span>
                )}
              </h2>
              <p className="mt-3 text-foreground/70 max-w-xl">
                {projectCount > 0
                  ? `${projectCount} active presale ${projectCount === 1 ? "development" : "developments"} in ${config.city}${lowestPrice ? `, starting from ${formatPrice(lowestPrice)}` : ""}. Buyer-only representation on every one.`
                  : `Current and upcoming presale condos and townhomes in ${config.city}. Get VIP access before the public launch.`}
              </p>
            </div>
            <ProjectGrid city={config.city} />
          </div>
        </section>

        {/* ── Why Buy Here Section ── */}
        <section className="section-y" style={{ background: "hsl(var(--card))" }}>
          <div className="container-xl px-4 sm:px-6">
            <div className="mb-12 max-w-3xl">
              <p className="section-label mb-3">Why {config.city}</p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
                {config.whyBuyTitle}
              </h2>
              <p className="text-foreground/70 leading-relaxed">
                {config.whyBuyBody}
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {config.benefits.map((benefit, i) => (
                <div key={i} className="stat-card p-6 rounded-xl">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                    {benefit.icon}
                  </div>
                  <h3 className="font-display text-lg font-bold text-foreground mb-2">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── City depth (top markets) ── */}
        {CITY_DEPTH[config.slug] && (
          <section className="section-y bg-background">
            <div className="container-xl px-4 sm:px-6 max-w-3xl">
              <p className="section-label mb-3">Buyer representation in {config.city}</p>
              <div className="space-y-12">
                {CITY_DEPTH[config.slug].map((sec) => (
                  <div key={sec.heading}>
                    <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-4">
                      {sec.heading}
                    </h2>
                    {sec.body.map((para, i) => (
                      <p key={i} className="text-[17px] leading-relaxed text-foreground/75 mb-4">
                        {para}
                      </p>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── FAQ Section ── */}
        <section className="section-y bg-background">
          <div className="container-xl px-4 sm:px-6 max-w-3xl">
            <p className="section-label mb-3">Answers</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-8">
              {config.city} Presale FAQ
            </h2>
            <div className="divider-list rounded-2xl border border-border/60 bg-card/40">
              {config.faqs.map((f, i) => (
                <details key={i} className="group p-5 open:bg-card/70 transition-colors">
                  <summary className="flex items-start justify-between gap-4 cursor-pointer list-none">
                    <span className="font-display text-base md:text-lg text-foreground group-open:text-primary transition-colors">
                      {f.question}
                    </span>
                    <ChevronRight className="h-4 w-4 shrink-0 mt-1.5 text-muted-foreground transition-transform group-open:rotate-90" />
                  </summary>
                  <p className="mt-3 text-[15px] leading-relaxed text-foreground/70">
                    {f.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ── Lead Capture CTA ── */}
        <section id="book-section">
          <LeadCaptureSection />
        </section>
      </main>

      <Footer />
    </>
  );
};

export default CityLanding;
