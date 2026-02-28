
# Presale Buyer's Guide Landing Page

## Overview

A dedicated `/presale-guide` page that serves as a lead-gated download page. Visitors read key highlights pulled from the guide, then fill out a short form to unlock the full PDF download. Leads are captured into the existing `leads` table via the `capture-lead` edge function (same system as `/call`).

---

## Page Structure

### 1. Hero Section
- Headline: **"The BC Presale Buyer's Guide"** with subheadline about smart wealth building
- Brief hook using the Sudip story (the $82K deposit loss) contrasted with the 10 who made $50K–$150K profit
- Single CTA button: "Download the Free Guide" → scrolls to or opens the lead form

### 2. Key Highlights Section (6 cards)
Extracted from the guide:
1. Lock In Today's Prices — appreciation while you wait
2. Massive Leverage — 5–10% down, build equity
3. Brand New with Warranty — 2-5-10 BC warranty, no major repairs
4. Tax Savings — up to $47,000 for first-time buyers
5. Strong Cash Flow — tenant covers expenses
6. Assignment Flexibility — exit strategy built in

### 3. "What's Inside" Section
A visual list of the guide's 6 parts:
- What is a presale & why it works
- The money — real numbers
- 7 deadly mistakes to avoid
- Real success stories (Sarah & Mike, David, James)
- Decision framework — 10-question checklist
- 10-step action plan

### 4. Featured Neighborhoods Strip
5 neighborhood pills/cards: Clayton, Guildford, Langley City, Willoughby, South Surrey — with quick price ranges

### 5. Lead Capture Form (gated download)
**Headline:** "Get Your Free Guide — Instantly"
**Fields:**
- First Name
- Email
- Phone
- Buyer Type (First-Time Buyer / Investor / Upgrader)

On submit → calls `capture-lead` edge function with `leadSource: 'presale-guide'` and `buyerType` mapped to valid values → on success, shows a download button / thank-you state.

### 6. Trust Footer Bar
- Logo + "Presale Specialist · Metro Vancouver & Fraser Valley"
- Link back to main site

---

## Technical Details

### Route
- New file: `src/pages/PresaleGuide.tsx`
- Add route in `src/App.tsx`: `<Route path="/presale-guide" element={<PresaleGuide />} />`

### Lead Capture
- Reuses the existing `capture-lead` edge function (no backend changes needed)
- `leadSource` set to `'presale-guide'`
- `buyerType` mapped: first-time buyer → `'first-time'`, investor → `'investor'`, upgrader → `'end-user'`

### PDF Delivery
- The guide PDF will be stored in Lovable Cloud file storage
- On successful lead capture, a download button/link appears pointing to the PDF
- Alternatively (until you upload the PDF): show a "We'll email you the guide within 24 hours" confirmation — I'll wire it to show a real download link once you upload the PDF

### Design
- Matches existing site aesthetic (warm cream tones, amber accent, same typography)
- Uses existing `Button`, `Input`, `Label` components
- Framer Motion animations consistent with `/call` page style
- Mobile-responsive

### SEO
- `<Helmet>` with title "BC Presale Buyer's Guide | Free Download" and meta description

---

## Files to Create/Edit

| File | Change |
|------|--------|
| `src/pages/PresaleGuide.tsx` | New page — full landing page |
| `src/App.tsx` | Add `/presale-guide` route |

No database migration needed — existing `leads` table supports all required fields.

---

## Note on PDF Upload

Once you have the PDF ready, you can share it and I'll store it in file storage and wire the download link directly. For now, the success state will show a confirmation message and the download button can be enabled once the file is ready.
