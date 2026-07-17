# Premium Polish Pass — 10 Improvements

Goal: make the site feel like a $1M advisor brand — quiet confidence, disciplined type, generous but intentional whitespace, one CTA per moment. Zero copy changes. Everything responsive across mobile, tablet, desktop.

## The 10 improvements

1. **Unified section rhythm.** One shared `<Section>` primitive with three padding scales (`sm`/`md`/`lg`) and a max-width container. Every homepage/about/services section is refactored onto it so vertical spacing, container widths, and side gutters are identical top-to-bottom on all breakpoints. Kills the "random whitespace" problem.

2. **Typography scale lockdown.** One canonical scale (H1 → overline) applied globally. Eyebrows/overlines standardized (12px, tracking-widest, muted). H2s all use the same size + weight + letter-spacing. Body copy converges on one size (17px desktop / 16px mobile), one leading (1.65). Removes the "different fonts on different sections" feel.

3. **Semantic color pass.** Audit and remove any hardcoded `text-white`, `bg-black`, `text-gray-*`, `bg-[#...]` in components; move to tokens (`text-foreground`, `text-muted-foreground`, `bg-background`, `bg-card`, `border-border`). Ensures dark sections and light sections read as one system.

4. **Button system consolidation.** Only two visible buttons per section maximum. Primary = "Book a Buyer Strategy Call". Secondary = ghost/link "Get Presale Guide" or "Learn more". Remove tertiary buttons that repeat the same action already visible in navbar/section header. Standardize height (h-11 desktop / h-12 mobile), radius, and hover.

5. **Navbar refinement.** Slimmer height, subtle backdrop blur on scroll, active-route underline, tighter dropdown menus. Ensures the "Book Strategy Call" button is the only CTA above the fold besides the hero primary.

6. **Hero breathing room.** Reduce H1 size on desktop by ~8%, add proper line-height, tighten proof row (single row on tablet+, stacked chip row on mobile), remove any orphan words. No copy change — layout only.

7. **Reviews grid balance.** Equal-height cards already exist; add consistent card chrome (border, radius, subtle shadow), unify quote-mark styling, make the "See all reviews" card visually match (not a dashed placeholder). Rating badge above grid gets a single premium treatment used everywhere it appears.

8. **Process section clarity.** Convert the six steps to a numbered vertical rail on mobile and an aligned 3×2 grid on desktop with equal card heights, uniform icon treatment, and consistent image aspect ratios. Removes the "stacked and floating" feel.

9. **Forms polish + reliability check.** UnifiedLeadForm: consistent input height, label weight, error style, focus ring, and a single primary submit. Manual test each entry point (hero, booking section, guide popup, contact page, city pages, funnel pages) to confirm submission → Supabase → DealzFlow still works. Fix any that regressed.

10. **Footer + section transitions.** Footer gets tighter column alignment, standardized link hover, and consistent legal line. Add a single 1px hairline `border-border/40` between sections (or a subtle bg alternation) so sections stop bleeding into each other on long scroll.

## Structural cleanups included (no copy touched)

- Remove unused/legacy homepage components from disk: `MidPageCTA` (already deleted), `LeadCaptureSection`, `CTASection`, `TestimonialsSection`, `RiskRealitySection`, `InvestmentSection`, `InvestmentApproachSection`, `CaseStudiesSection`, `AboutSection`, `ServicesSection`, `AudienceSegmentSection`, `InstagramSection`, `BlogPreviewSection` if not imported anywhere. Reduces bundle and confusion.
- De-duplicate CTAs: audit About, Services, funnel pages — max one "Book" CTA per full-viewport-height of scroll.
- Ensure every button has an `onClick`/`to`/`href`. Any dead button gets wired to the correct destination.

## Technical notes

- New file: `src/components/ui/section.tsx` — the `<Section>` primitive.
- Edits: `src/index.css` for typography tokens; `tailwind.config.ts` if new spacing scale needed.
- Edits across `src/components/home/*`, `src/pages/About.tsx`, `src/pages/Services.tsx`, `src/pages/Contact.tsx`, `src/components/layout/Navbar.tsx`, `src/components/layout/Footer.tsx`, `src/components/forms/UnifiedLeadForm.tsx`.
- Verification: build passes, then Playwright pass at 390px / 834px / 1440px capturing homepage, About, Services, one blog post, one city page, one funnel page. Screenshots reviewed before I report done.
- Copy is frozen. If any change requires touching copy I will stop and ask.

## Out of scope

- No new sections, no new pages, no schema/SEO changes, no backend changes, no color palette change.

Reply "go" to ship, or tell me which of the 10 to drop/reorder.