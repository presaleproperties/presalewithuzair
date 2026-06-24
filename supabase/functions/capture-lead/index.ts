import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// ─── DealzFlow CRM lead-intake (Website Form source) ───────────────────────
const DEALZFLOW_INTAKE_URL =
  "https://svbilqvudkkdhslxebce.supabase.co/functions/v1/lead-intake?source=website_form";
const DEALZFLOW_SOURCE_SLUG = "website_form";
const DEALZFLOW_INTAKE_TOKEN = Deno.env.get("DEALZFLOW_INTAKE_TOKEN") ?? "";

// buyer-type → DealzFlow Lead Type label
const LEAD_TYPE_FROM_BUYER: Record<string, string> = {
  "first-time": "First-Time Buyer",
  "first-time-buyer": "First-Time Buyer",
  "investor": "Investor",
  "end-user": "End User",
  "upsizer": "Upsizer",
  "buy-presale": "Buying a Presale",
  "assignment-buyer": "Assignment Buyer",
  "sell-assignment": "Selling an Assignment",
  "seller": "Seller",
  "paid-advice": "Paid Advice",
  "other": "Other",
};

const BUYER_TYPE_LABELS: Record<string, string> = {
  "first-time": "First-time buyer",
  "first-time-buyer": "First-time buyer",
  "investor": "Investor",
  "end-user": "End user",
  "upsizer": "Upsizer",
  "buy-presale": "Buying a presale",
  "assignment-buyer": "Assignment buyer",
  "sell-assignment": "Selling an assignment",
  "seller": "Seller",
  "paid-advice": "Paid advice",
  "other": "Other",
};

const LEAD_SOURCE_LABELS: Record<string, string> = {
  instagram: "Instagram",
  tiktok: "TikTok",
  youtube: "YouTube",
  referral: "Referral / Friend",
  google: "Google Search",
  facebook: "Facebook",
  other: "Other",
  website: "Website (direct)",
};

// Budget select value/label → numeric min/max for DealzFlow's structured Budget.
const BUDGET_RANGES: Record<string, { min: number | null; max: number | null; label: string }> = {
  "under-500k": { min: null, max: 500000, label: "Under $500K" },
  "500k-750k": { min: 500000, max: 750000, label: "$500K – $750K" },
  "750k-1m": { min: 750000, max: 1000000, label: "$750K – $1M" },
  "1m-1.5m": { min: 1000000, max: 1500000, label: "$1M – $1.5M" },
  "over-1.5m": { min: 1500000, max: null, label: "Over $1.5M" },
  "not-sure": { min: null, max: null, label: "Not sure yet" },
};

const TIMELINE_LABELS: Record<string, string> = {
  "asap": "ASAP / ready now",
  "1-3-months": "1–3 months",
  "3-6-months": "3–6 months",
  "6-12-months": "6–12 months",
  "just-researching": "Just researching",
};

// Resolve a budget input (either the select value OR an already-formatted label)
// into { min, max, label }.
function resolveBudget(input: string | null): { min: number | null; max: number | null; label: string | null } {
  if (!input) return { min: null, max: null, label: null };
  if (BUDGET_RANGES[input]) return BUDGET_RANGES[input];
  const byLabel = Object.values(BUDGET_RANGES).find((r) => r.label === input);
  if (byLabel) return byLabel;
  return { min: null, max: null, label: input };
}

// Map a landing-page path to the BC city the lead is interested in.
// Output matches DealzFlow's FRASER_VALLEY_CITIES canonical names.
function cityFromPath(path?: string | null): string | null {
  if (!path) return null;
  const m = path.match(/(surrey|langley|abbotsford|chilliwack|maple-ridge|coquitlam|burnaby|delta)/i);
  if (!m) return null;
  return m[1].replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

interface LeadData {
  firstName: string;
  lastName?: string;
  email: string;
  phone: string;
  buyerType: string;
  leadSource?: string;
  timeline?: string;
  budget?: string;
  preferredCallDate?: string;
  preferredCallTime?: string;
  hasAgent?: string;
  message?: string;
  neighbourhood?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
  referrer?: string;
  landingPage?: string;
}

const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW_MS = 60000;
const MAX_REQUESTS_PER_WINDOW = 5;

function isRateLimited(clientIP: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(clientIP);
  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(clientIP, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  if (entry.count >= MAX_REQUESTS_PER_WINDOW) return true;
  entry.count++;
  return false;
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 255;
}
function isValidPhone(phone: string): boolean {
  if (phone === "not-provided") return true;
  const phoneRegex = /^[\d\s()+-]{10,20}$/;
  return phoneRegex.test(phone);
}
function isValidName(name: string): boolean {
  const nameRegex = /^[a-zA-Z\s'-]{1,100}$/;
  return nameRegex.test(name);
}
function isValidBuyerType(buyerType: string): boolean {
  const validTypes = ['first-time', 'investor', 'end-user', 'first-time-buyer', 'buy-presale', 'sell-assignment', 'paid-advice', 'upsizer', 'assignment-buyer', 'seller', 'other'];
  return validTypes.includes(buyerType);
}
function isValidLeadSource(source: string): boolean {
  return typeof source === 'string' && source.length > 0 && source.length <= 100;
}

interface CrmContext {
  userAgent: string | null;
  clientIP: string | null;
  city: string | null;
  budgetMin: number | null;
  budgetMax: number | null;
  budgetLabel: string | null;
  timelineLabel: string | null;
  leadTypeLabel: string | null;
  tags: string[];
  extraMessage?: string | null;
  neighbourhood?: string | null;
}

// Forward a captured lead to DealzFlow lead-intake with a rich summary note
// AND structured fields (city, budget range, lead type, tags). Best-effort.
async function forwardToDealzFlow(lead: Record<string, any>, ctx: CrmContext): Promise<void> {
  try {
    const bt = lead.buyer_type as string | null;
    const buyerLabel = bt ? (BUYER_TYPE_LABELS[bt] || bt) : null;
    const srcLabel = lead.lead_source ? (LEAD_SOURCE_LABELS[lead.lead_source] || lead.lead_source) : null;

    const lines: string[] = [];
    lines.push(`🆕 New lead — presalewithuzair.com${lead.landing_page ? ` (${lead.landing_page})` : ""}`);
    if (ctx.city) lines.push(`📍 City interest: ${ctx.city}`);
    if (ctx.neighbourhood) lines.push(`📍 Neighbourhood: ${ctx.neighbourhood}`);
    if (buyerLabel) lines.push(`👤 Buyer type: ${buyerLabel}`);
    if (srcLabel) lines.push(`📣 How they found us: ${srcLabel}`);
    if (ctx.budgetLabel) lines.push(`💰 Budget: ${ctx.budgetLabel}`);
    if (ctx.timelineLabel) lines.push(`🗓️ Timeline: ${ctx.timelineLabel}`);
    if (lead.has_agent) lines.push(`🤝 Already has an agent: ${lead.has_agent}`);
    if (lead.preferred_call_date || lead.preferred_call_time) {
      lines.push(`📞 Preferred call: ${[lead.preferred_call_date, lead.preferred_call_time].filter(Boolean).join(" ")}`);
    }
    if (ctx.extraMessage) lines.push(`💬 Message: ${ctx.extraMessage}`);
    const attribution = [
      lead.utm_source && `source=${lead.utm_source}`,
      lead.utm_medium && `medium=${lead.utm_medium}`,
      lead.utm_campaign && `campaign=${lead.utm_campaign}`,
      lead.utm_term && `term=${lead.utm_term}`,
      lead.utm_content && `content=${lead.utm_content}`,
    ].filter(Boolean).join(" · ");
    if (attribution) lines.push(`🎯 Ad attribution: ${attribution}`);
    lines.push(`↩️ Referrer: ${lead.referrer || "direct / none"}`);
    lines.push(`🕒 Submitted: ${lead.created_at || new Date().toISOString()}`);

    const crmBody: Record<string, any> = {
      source_slug: DEALZFLOW_SOURCE_SLUG,
      first_name: lead.first_name || undefined,
      last_name: lead.last_name || undefined,
      email: lead.email || undefined,
      phone: lead.phone || undefined,
      message: lines.join("\n"),
      campaign: lead.utm_campaign || (ctx.city ? `pwu-${ctx.city.toLowerCase().replace(/\s+/g, "-")}` : undefined),
      utm_source: lead.utm_source || lead.lead_source || undefined,
      utm_medium: lead.utm_medium || undefined,
      utm_campaign: lead.utm_campaign || undefined,
      ad_id: lead.utm_content || undefined,
      // ── Structured fields → populate DealzFlow's Details panel ──
      city: ctx.city || undefined,
      budget_min: ctx.budgetMin ?? undefined,
      budget_max: ctx.budgetMax ?? undefined,
      lead_type: ctx.leadTypeLabel || undefined,
      lead_types: ctx.leadTypeLabel ? [ctx.leadTypeLabel] : undefined,
      tags: ctx.tags.length ? ctx.tags : undefined,
      raw: {
        site: "presalewithuzair.com",
        local_lead_id: lead.id,
        city_interest: ctx.city,
        neighbourhood: ctx.neighbourhood || null,
        buyer_type: lead.buyer_type,
        buyer_type_label: buyerLabel,
        lead_type: ctx.leadTypeLabel,
        lead_source: lead.lead_source,
        lead_source_label: srcLabel,
        budget_label: ctx.budgetLabel,
        budget_min: ctx.budgetMin,
        budget_max: ctx.budgetMax,
        timeline_label: ctx.timelineLabel,
        has_agent: lead.has_agent,
        message: ctx.extraMessage || null,
        preferred_call_date: lead.preferred_call_date,
        preferred_call_time: lead.preferred_call_time,
        utm_source: lead.utm_source,
        utm_medium: lead.utm_medium,
        utm_campaign: lead.utm_campaign,
        utm_term: lead.utm_term,
        utm_content: lead.utm_content,
        referrer: lead.referrer,
        landing_page: lead.landing_page,
        user_agent: ctx.userAgent,
        client_ip: ctx.clientIP,
        submitted_at: lead.created_at,
      },
    };

    const res = await fetch(DEALZFLOW_INTAKE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-intake-token": DEALZFLOW_INTAKE_TOKEN },
      body: JSON.stringify(crmBody),
    });
    const text = await res.text();
    console.log("DealzFlow lead-intake status:", res.status, text.slice(0, 300));
  } catch (crmErr) {
    console.error("DealzFlow forward error:", crmErr instanceof Error ? crmErr.message : crmErr);
  }
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const clientIP = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
                     req.headers.get("x-real-ip") ||
                     "unknown";

    if (isRateLimited(clientIP)) {
      console.warn("Rate limit exceeded for IP:", clientIP);
      return new Response(
        JSON.stringify({ error: "Too many requests. Please try again later." }),
        { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const leadData: LeadData = await req.json();

    if (!leadData.firstName || !leadData.email || !leadData.phone || !leadData.buyerType) {
      console.error("Missing required fields");
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const firstName = leadData.firstName.trim();
    const lastName = (leadData.lastName ?? "").trim();
    const email = leadData.email.trim().toLowerCase();
    const phone = leadData.phone.trim();
    const buyerType = leadData.buyerType.trim();
    const leadSource = leadData.leadSource?.trim() || 'website';

    // Resolve budget + timeline (accept either the select value or a label)
    const budgetResolved = resolveBudget(leadData.budget?.trim() || null);
    const timelineInput = leadData.timeline?.trim() || null;
    const timelineLabel = timelineInput ? (TIMELINE_LABELS[timelineInput] || timelineInput) : null;

    const budget = budgetResolved.label;       // human label stored locally + shown in note
    const timeline = timelineLabel;             // human label
    const preferredCallDate = leadData.preferredCallDate?.trim() || null;
    const preferredCallTime = leadData.preferredCallTime?.trim() || null;
    const hasAgent = leadData.hasAgent?.trim() || null;
    const message = leadData.message?.trim() || null;
    const neighbourhood = leadData.neighbourhood?.trim() || null;

    const utmSource = leadData.utmSource?.trim() || null;
    const utmMedium = leadData.utmMedium?.trim() || null;
    const utmCampaign = leadData.utmCampaign?.trim() || null;
    const utmTerm = leadData.utmTerm?.trim() || null;
    const utmContent = leadData.utmContent?.trim() || null;
    const referrer = leadData.referrer?.trim() || null;
    const landingPage = leadData.landingPage?.trim() || null;

    if (!isValidName(firstName)) {
      return new Response(JSON.stringify({ error: "Invalid first name format" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }
    if (lastName && !isValidName(lastName)) {
      return new Response(JSON.stringify({ error: "Invalid last name format" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }
    if (!isValidEmail(email)) {
      return new Response(JSON.stringify({ error: "Invalid email format" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }
    if (!isValidPhone(phone)) {
      return new Response(JSON.stringify({ error: "Invalid phone format" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }
    if (!isValidBuyerType(buyerType)) {
      return new Response(JSON.stringify({ error: "Invalid buyer type" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }
    if (leadSource && !isValidLeadSource(leadSource)) {
      return new Response(JSON.stringify({ error: "Invalid lead source" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    console.log("Capturing lead:", email, "Type:", buyerType);

    const { data: lead, error: dbError } = await supabase
      .from("leads")
      .insert({
        first_name: firstName,
        last_name: lastName,
        email: email,
        phone: phone,
        buyer_type: buyerType,
        lead_source: leadSource,
        timeline: timeline,
        budget: budget,
        preferred_call_date: preferredCallDate,
        preferred_call_time: preferredCallTime,
        has_agent: hasAgent,
        utm_source: utmSource,
        utm_medium: utmMedium,
        utm_campaign: utmCampaign,
        utm_term: utmTerm,
        utm_content: utmContent,
        referrer: referrer,
        landing_page: landingPage,
      })
      .select()
      .single();

    if (dbError) {
      console.error("Database error:", dbError.message);
      return new Response(
        JSON.stringify({ error: "Failed to save lead" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Lead saved successfully:", lead.id);

    // Derive structured CRM context
    const city = cityFromPath(landingPage);
    const leadTypeLabel = LEAD_TYPE_FROM_BUYER[buyerType] || null;
    const sourceLabel = LEAD_SOURCE_LABELS[leadSource] || leadSource;
    const tags = Array.from(new Set([
      city,
      leadTypeLabel,
      sourceLabel,
    ].filter((t): t is string => !!t)));

    // ─── Forward to DealzFlow CRM (primary destination) ──────────────────
    await forwardToDealzFlow(lead, {
      userAgent: req.headers.get("user-agent"),
      clientIP,
      city,
      budgetMin: budgetResolved.min,
      budgetMax: budgetResolved.max,
      budgetLabel: budgetResolved.label,
      timelineLabel,
      leadTypeLabel,
      tags,
      extraMessage: message,
      neighbourhood,
    });

    // Legacy Zapier webhook (no-ops when env unset)
    const zapierUrl = Deno.env.get("ZAPIER_WEBHOOK_URL");
    if (zapierUrl) {
      try {
        await fetch(zapierUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: lead.id,
            first_name: lead.first_name,
            last_name: lead.last_name,
            full_name: `${lead.first_name} ${lead.last_name}`.trim(),
            email: lead.email,
            phone: lead.phone,
            buyer_type: lead.buyer_type,
            lead_source: lead.lead_source,
            timeline: lead.timeline,
            budget: lead.budget,
            preferred_call_date: lead.preferred_call_date,
            preferred_call_time: lead.preferred_call_time,
            has_agent: lead.has_agent,
            utm_source: lead.utm_source,
            utm_medium: lead.utm_medium,
            utm_campaign: lead.utm_campaign,
            utm_term: lead.utm_term,
            utm_content: lead.utm_content,
            referrer: lead.referrer,
            landing_page: lead.landing_page,
            created_at: lead.created_at,
            source: "presalewithuzair.com",
          }),
        });
      } catch (zapierError) {
        console.error("Zapier webhook error:", zapierError);
      }
    }

    return new Response(
      JSON.stringify({ success: true, leadId: lead.id }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Lead capture error:", message);
    return new Response(
      JSON.stringify({ error: "An error occurred. Please try again." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
