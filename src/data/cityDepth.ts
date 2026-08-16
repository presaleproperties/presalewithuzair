/**
 * Long-form, buyer-representation depth content for the top city pages.
 * First person (Uzair). No project inventory lists — trust/representation intent only.
 * Shared by src/pages/CityLanding.tsx and the Cloudflare prerender in functions/_middleware.ts.
 */

export interface CityDepthSection {
  heading: string;
  body: string[];
}

export const CITY_DEPTH: Record<string, CityDepthSection[]> = {
  surrey: [
    {
      heading: "Which Surrey neighbourhoods I point first-time buyers to",
      body: [
        "First-time buyers in Surrey usually get pushed toward whatever tower is releasing that month. I work the other way around. If the plan is to live in the home for five to seven years, I look hardest at Surrey City Centre and Fleetwood, because both are tied to transit that is already funded and under construction rather than to a rezoning that may or may not happen. City Centre gives you the shortest commute, the deepest rental pool if life changes, and the widest resale audience later. Fleetwood is the quieter version of the same bet — lower entry pricing, more townhomes, and a SkyTrain corridor that has not fully repriced yet.",
        "Guildford and Newton come up constantly because the price per square foot looks friendly. They can work, but the buyer has to be honest about the exit. In those pockets I want a well-known developer, an efficient floorplan, and parking included, because that is what makes a resale competitive against the next wave of new supply. South Surrey and Grandview Heights are a different profile again: bigger homes, more family buyers, longer holds, and less rental depth. If someone tells me they may need to rent the unit out within two years, South Surrey is usually the wrong fit and I will say so.",
      ],
    },
    {
      heading: "Where investors should be looking in Surrey — and where they should not",
      body: [
        "For investors, the question is never which building looks nicest. It is which contract lets you get out, and whether the rent covers enough of the carry at completion. In Surrey that pushes me toward City Centre and the King George corridor, where rental demand is real and consistent, and away from projects whose whole thesis is a future amenity. I also weight completion timing heavily: a 2029 completion is a mortgage you are qualifying for at rates nobody can forecast, so the deposit schedule and the assignment terms matter more than the finishes.",
        "I do turn people away from Surrey presales. If the price per square foot is at or above comparable resale in the same neighbourhood, and the only justification is that it is new, there is no margin for the buyer. That happens more often in Surrey than people expect, because the volume of launches invites aggressive pricing. My job is to compare the release against the last three launches in the same pocket and tell you when the number does not work.",
      ],
    },
    {
      heading: "What I actually negotiate on a Surrey presale",
      body: [
        "Presale pricing is less fixed than the sales centre implies. On Surrey projects I regularly work on the deposit structure first — moving a 20 percent schedule to 10 or 15 percent, or stretching the milestones out past the first year, which is often worth more to a buyer than a small discount. Then the assignment clause: whether assignments are permitted at all, what the developer's fee is, when you are allowed to market the unit, and whether the developer can withhold consent for any reason. A contract that technically allows assignment but blocks marketing until occupancy is not a real exit.",
        "After that comes the list most buyers never ask about: caps on the developer's right to change materials and layouts, the completion outside date and what happens if it is missed, parking and storage included rather than optioned, appliance and colour-scheme upgrades, and GST and property transfer tax treatment in writing. I also read the disclosure statement inside BC's seven-day rescission period, not after it — that window is the only real leverage a presale buyer has.",
      ],
    },
    {
      heading: "A recent Surrey scenario",
      body: [
        "A couple came to me after registering at a City Centre sales centre on their own. They had been offered a one-bedroom on a low floor at a price that looked reasonable in isolation. Pulled against the two nearest completed buildings, it was roughly six percent above resale on a per-square-foot basis, with a 20 percent deposit and an assignment clause that required developer consent at their sole discretion. We passed. Two months later a second project in Fleetwood released with a 10 percent staged deposit, parking included, and an assignment fee capped at one percent. They bought there instead, with a smaller cheque up front and an exit that actually exists on paper. Nothing about that outcome required a special relationship with a developer. It required someone reading both contracts on the buyer's side.",
      ],
    },
  ],
  langley: [
    {
      heading: "Which Langley neighbourhoods suit first-time buyers",
      body: [
        "Langley is a townhome market before it is a condo market, and that changes the advice. For first-time buyers I usually start in Willoughby and Latimer Heights, because that is where you find three-bedroom townhomes at prices that still work for one strong income plus a partner, with schools and daycare already built rather than promised. The trade-off is supply: Willoughby has had a lot of it, and two projects a block apart can be priced very differently for very similar product. That is a good problem for a represented buyer and a bad one for someone walking into the first sales centre they find.",
        "Brookswood and Fort Langley appeal to buyers who want the small-town feel, and the product there tends to be lower density with more character. Prices hold up well, but the rental pool is thinner and the buyer audience at resale is narrower. Central Langley and the Langley City side of the border are the better call for anyone who wants transit optionality, because the Surrey-Langley SkyTrain extension terminates there and the walkable core is already established.",
      ],
    },
    {
      heading: "How I read Langley for investors",
      body: [
        "The Langley investment case is almost entirely about the SkyTrain corridor and about buying the right distance from it. Being adjacent to a future station is priced in. Being a fifteen-minute bus ride away often is not, and that gap is where the value tends to sit. I also look closely at unit mix, because Langley builds a lot of large townhomes, and large townhomes do not rent efficiently — the rent does not scale with the square footage the way it does in a two-bedroom condo.",
        "Completion timing is the other filter. Willoughby has phases that complete years apart, and finishing into the same window as three neighbouring phases means competing against a wall of identical inventory on the resale and rental market at once. I check what else completes within six months of your unit before I recommend a phase, not after.",
      ],
    },
    {
      heading: "What I negotiate on a Langley presale",
      body: [
        "On Langley townhome contracts the items that move most are deposit staging, the assignment clause, and the developer's substitution rights. Townhome specifications drift more than condo specifications do — flooring, cabinetry, and appliance packages get changed between phases — so I want the substitution language limited to materials of equal or better quality, in writing, rather than left to the developer's discretion.",
        "I also push on parking configuration, side-by-side versus tandem garages, the completion outside date, and any early-occupancy or rental restrictions in the strata bylaws being filed. And I confirm the GST position and any property transfer tax exemption eligibility before the seven-day rescission window closes, because on a townhome those two numbers together are frequently the difference between the deal working and not working.",
      ],
    },
    {
      heading: "A recent Langley scenario",
      body: [
        "A family looking in Willoughby had their eye on a three-bedroom townhome and were ready to sign at the sales centre that weekend. Reading the disclosure statement, the assignment clause carried a three percent developer fee and blocked any marketing until the building was substantially complete, and the deposit schedule front-loaded 20 percent inside eight months. They were planning to sell their current place at completion, which meant the deposit timeline was tight. We negotiated the deposit into four stages over eighteen months on the same project and got the assignment fee reduced. Same home, same price, materially different risk profile — because someone on their side read the document before the rescission window closed.",
      ],
    },
  ],
  abbotsford: [
    {
      heading: "Where first-time buyers should look in Abbotsford",
      body: [
        "Abbotsford is the most affordable serious presale market in the Fraser Valley, and that affordability is exactly why the buyer needs to be more careful, not less. For first-time buyers I look first at West Abbotsford and the Mount Lehman area, because that is where you get proximity to Highway 1, newer schools, and a resale audience that includes people commuting to Langley and Surrey. The historic downtown core is improving and has real character, but the product varies a lot building to building and I want a developer with a completed local track record before I recommend it.",
        "East Abbotsford and Sumas Mountain give you more space per dollar and a quieter setting, which suits families who are certain they are staying. What I flag for anyone considering the outer pockets is liquidity: fewer buyers, longer selling times, and less rental demand. That is fine for a ten-year hold and risky for a three-year one.",
      ],
    },
    {
      heading: "The investor view on Abbotsford",
      body: [
        "Abbotsford is a cash-flow market more than an appreciation market, and I say that plainly because it changes which units make sense. Two-bedroom condos near transit and the university rent reliably. Large townhomes do not produce proportionate rent. The entry price is low enough that the numbers can work on paper, but the exit is slower than in Surrey, so I weight developer quality and building maintenance risk heavily — a poorly built building in a thin market is genuinely hard to sell.",
        "I also check the supply pipeline harder here. Abbotsford can absorb steady new inventory, but a cluster of completions in the same quarter puts real downward pressure on both rents and resale pricing, and a presale buyer has no ability to change their completion date once they have signed.",
      ],
    },
    {
      heading: "What I negotiate on an Abbotsford presale",
      body: [
        "Because Abbotsford developers are competing harder for buyers than developers in Surrey are, there is usually more room to move. I go after deposit structure first — 10 percent staged is achievable on many projects here — and then at included parking and storage, appliance and finishing upgrades, and the assignment terms. I also read the developer's completion outside date carefully and look for a right to rescind or receive a deposit refund if the date is blown by more than a set period, because construction timelines outside the core have slipped more often.",
        "On every Abbotsford file I run the full landed cost before the buyer commits: purchase price, GST and any new housing rebate eligibility, property transfer tax and first-time buyer exemption eligibility, deposit dates against your actual cash flow, strata fees, and what the mortgage looks like at completion rather than today. That number, not the sales centre price, is what tells you whether the deal works.",
      ],
    },
    {
      heading: "A recent Abbotsford scenario",
      body: [
        "A first-time buyer had been told at a sales centre that the price was fixed and the incentive on offer was the best available. It was a small market window, the project was under-subscribed, and after comparing it against two nearby releases we asked for a staged 10 percent deposit and parking included instead of the advertised finishing credit. The developer agreed to both. The finishing credit would have been worth a few thousand dollars at completion. The deposit change freed up roughly twenty-five thousand dollars of cash over the first year, which mattered far more to a buyer who was also saving for closing costs. Nobody at that sales centre was going to suggest that trade, because nobody there was working for the buyer.",
      ],
    },
  ],
};
