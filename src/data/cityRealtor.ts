/**
 * Person/trust-intent layer for the city pages.
 *
 * presaleproperties.com owns inventory intent ("{city} presale condos").
 * These pages target "{city} presale realtor" / "presale agent {city}" —
 * the buyer looking for a person to represent them, not a listing feed.
 *
 * Shared by src/pages/CityLanding.tsx (React) and functions/_middleware.ts
 * (prerender) so the visible copy and the JSON-LD never drift apart.
 */

export interface CityRealtorFAQ {
  q: string;
  a: string;
}

export interface CityRealtorContent {
  city: string;
  title: string;
  description: string;
  h1: string;
  eyebrow: string;
  /** First paragraph — answers "why use Uzair as your {city} presale realtor". */
  intro: string;
  /** Heading for the inventory block that now sits below the trust copy. */
  inventoryHeading: string;
  faqs: CityRealtorFAQ[];
}

const desc = (city: string) =>
  `Looking for a presale realtor in ${city}? Uzair Muhammad represents buyers only — VIP allocations, deposit-structure advice, 450 families helped. Free 15-min call.`;

const build = (
  city: string,
  opts: {
    eyebrow?: string;
    hook: string;
    areas: string;
    areasAnswer: string;
    pricingAnswer: string;
  },
): CityRealtorContent => ({
  city,
  title: `${city} Presale Realtor — Buyer-Side Expert | Uzair Muhammad`,
  description: desc(city),
  h1: `${city}'s Presale Realtor — Talk to Uzair Before You Sign`,
  eyebrow: opts.eyebrow ?? `${city.toUpperCase()} PRESALE REALTOR`,
  intro: `${opts.hook} I'm Uzair Muhammad, and I represent presale buyers in ${city} — buyers only, never developers. That means the shortlist you get is ranked for your budget, deposit capacity and timeline, not by whichever project is paying the biggest incentive this month. I hold realtor VIP allocations, which is how buyers see floor plans and pricing before the public launch, and I read every disclosure statement and deposit schedule inside BC's 7-day rescission window so nothing surprises you at completion. Before real estate I spent 10 years at the City of Surrey in planning and bylaws, so I look at a ${city} project the way a planner does: what's approved around it, what's coming next, and how it will actually live years from now. I work in English, Hindi, Urdu and Punjabi, so the parents helping with the deposit understand the contract too. ${opts.areas}`,
  inventoryHeading: `What's selling in ${city} right now`,
  faqs: [
    {
      q: `Do I pay a realtor to buy presale in ${city}?`,
      a: `No. On the vast majority of ${city} presale projects the developer pays the buyer-agent fee out of the project's own marketing budget, so having me on your side costs you nothing at the purchase price. Going direct to the sales centre does not get you a discount — it simply removes your representation from the deal. I confirm the compensation arrangement for the specific project in writing before you move forward.`,
    },
    {
      q: `Can you get me better pricing than the sales centre?`,
      a: opts.pricingAnswer,
    },
    {
      q: `Which ${city} neighbourhoods do you cover?`,
      a: opts.areasAnswer,
    },
    {
      q: `How do I start?`,
      a: `Book the free 15-minute call. I'll ask what you're trying to accomplish, your budget and your timeline, then tell you honestly whether presale fits — and if it does, which two or three ${city} projects are worth your attention. No pressure and no obligation. Call me before you register at any presentation centre, because registering first can limit who is able to represent you.`,
    },
  ],
});

export const CITY_REALTOR: Record<string, CityRealtorContent> = {
  surrey: build("Surrey", {
    hook: "Surrey has more active presale developments than anywhere else in the Fraser Valley, which means the hard part isn't finding a project — it's knowing which one is actually worth your deposit.",
    areas: "From Surrey City Centre to South Surrey, I've walked buyers through the projects, the developers behind them and the terms that decide whether the purchase works.",
    areasAnswer:
      "All of them — Surrey City Centre, Fleetwood, Guildford, Newton, Clayton, Cloverdale, Grandview Heights and South Surrey/White Rock. These are not interchangeable markets: City Centre trades on SkyTrain, SFU and the hospital expansion, Fleetwood is repricing around the new line, and South Surrey behaves like its own owner-occupier market. I'll tell you which one fits your goal before we look at a single floor plan.",
    pricingAnswer:
      "I can't promise a discount, and any realtor who does is selling you something. What I can do is register you for the realtor VIP allocation, which is where the earliest release pricing and the strongest incentive packages sit before public launch. Then I compare that price per square foot against nearby resale and competing Surrey launches, so you can see whether the number is genuinely strong or just presented well.",
  }),
  langley: build("Langley", {
    hook: "Langley is the Fraser Valley's townhome market, and townhome deposits ask for real money long before the keys exist.",
    areas: "Willoughby, Latimer Heights and Central Langley each attract a different buyer, and I help you work out which one you actually are.",
    areasAnswer:
      "Willoughby, Latimer Heights, Yorkson, Brookswood, Murrayville, Central Langley/Langley City and Fort Langley. Willoughby is the deepest townhome supply in Metro Vancouver, which cuts both ways — some phases price above nearby resale. I compare phase by phase rather than treating Langley as one market.",
    pricingAnswer:
      "No guarantees, but a real advantage. Langley townhome launches release in phases, and the VIP allocation is where the early-phase pricing and deposit incentives are offered before the public opening. I'll get you in on that release, then hold the number up against resale comps in the same catchment so you know whether the phase is priced to sell or priced to test the market.",
  }),
  abbotsford: build("Abbotsford", {
    hook: "Abbotsford is where a lot of first-time buyers can finally make the numbers work — and also where a weak developer can hurt you more than a weak location.",
    areas: "University District, Historic Downtown, West Abbotsford and Sumas Mountain each serve a different buyer and a different exit.",
    areasAnswer:
      "University District, Historic Downtown, West Abbotsford, McKee/East Abbotsford, Sumas Mountain and Aberdeen. Rental demand near UFV behaves nothing like family demand on the mountain, so the neighbourhood decides the eventual buyer or tenant. I start there, not with the project.",
    pricingAnswer:
      "I won't promise a number. What I will do is put you on the VIP allocation list so you see early-release pricing and incentives ahead of the public launch, and check the developer's REDMA registration, completed projects and financing before you commit. In Abbotsford, deliverability protects your money more than a few thousand dollars off the sticker price.",
  }),
  coquitlam: build("Coquitlam", {
    hook: "Burquitlam, Coquitlam Centre and Burke Mountain are three separate decisions wearing the same city name.",
    areas: "Choosing the submarket correctly matters more here than choosing the tower.",
    areasAnswer:
      "Burquitlam, Coquitlam Centre, Burke Mountain, Austin Heights, Maillardville and the Evergreen corridor into Port Moody. Burquitlam skews transit-first and investor-heavy, Coquitlam Centre toward larger family product, and Burke Mountain toward school catchments with thin resale supply. Each one changes what a fair price looks like.",
    pricingAnswer:
      "No promises on price. The genuine edge is access and analysis: VIP allocation gets you the pre-launch release and incentive package, and I model that price against resale in the same node — including Port Moody, which competes directly with some Burke Mountain phases. If the premium isn't justified, I'll tell you to wait.",
  }),
  burnaby: build("Burnaby", {
    hook: "Burnaby carries one of the largest new-construction premiums in the region, and most buyers never find out what that premium actually is.",
    areas: "Metrotown, Brentwood, Lougheed and Edmonds all price differently against the resale sitting across the street.",
    areasAnswer:
      "Metrotown, Brentwood, Lougheed, Edmonds, Highgate and the Burnaby Heights. Metrotown has the deepest resale liquidity, Brentwood the newest supply and the strongest young-professional rental demand, Edmonds the lowest entry point. Your holding period decides which one is right.",
    pricingAnswer:
      "Not a discount — access and a reality check. VIP allocation puts you in the pre-launch release where the best floor plans and incentives go first. Then I price your specific unit against active resale in the same tower node so the premium you're paying is a number you decided on, not one you discovered later.",
  }),
  delta: build("Delta", {
    hook: "Delta launches a handful of projects a year, so picking the right one matters far more than it does in a market with thirty options.",
    areas: "Tsawwassen, Ladner and North Delta behave like three different cities on resale and rent.",
    areasAnswer:
      "Tsawwassen, Ladner, North Delta, Sunshine Hills and Tsawwassen Springs. Tsawwassen has strong owner-occupier demand and limited new supply; Ladner is tightly held and thin on rentals; North Delta trades closer to Surrey. I steer you by which exit you actually need.",
    pricingAnswer:
      "No guarantee. With smaller Delta launches the real leverage is early — VIP allocation gets you the first release, and smaller developers are more open to structuring deposits for early buyers. I ask on every project and get the answer in writing before you sign.",
  }),
  chilliwack: build("Chilliwack", {
    hook: "Chilliwack has the lowest price per square foot in the region, and that is exactly why the developer matters more than the discount.",
    areas: "Sardis, Vedder Crossing, Garrison Crossing and downtown Chilliwack each attract a different buyer pool.",
    areasAnswer:
      "Sardis, Vedder Crossing, Garrison Crossing, Promontory, Chilliwack Proper and Rosedale. Garrison and Vedder pull family and military demand, Promontory sells on view and space, downtown is the value entry. The buyer pool at resale is different in each one.",
    pricingAnswer:
      "I don't promise pricing. I get you the VIP allocation and early-release incentives, and then I do the part that matters more out here: disclosure review, deposit protection, phasing risk and the developer's completion history. A soft price on a project that stalls is not a win.",
  }),
  "maple-ridge": build("Maple Ridge", {
    hook: "Maple Ridge is a small new-construction market where liquidity at resale, not appreciation, is the thing to get right.",
    areas: "Town Centre, Albion, Silver Valley and Hammond serve very different buyers.",
    areasAnswer:
      "Maple Ridge Town Centre, Albion, Silver Valley, Cottonwood, Hammond and West Maple Ridge, plus neighbouring Pitt Meadows. Town Centre works around the West Coast Express commute; Silver Valley and Albion sell on space and schools. The commute pattern decides who buys it from you later.",
    pricingAnswer:
      "No promised discount. VIP allocation gets you into the release before the public and in front of the better-oriented plans. Then I check the developer's Metro Vancouver delivery record and the resale liquidity behind your exit plan, because in a thin market that is worth more than a price concession.",
  }),
};
