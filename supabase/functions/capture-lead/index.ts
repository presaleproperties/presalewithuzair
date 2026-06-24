import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// ─── DealzFlow CRM lead-intake (Website Form source) ───────────────────────
// Server-side only (token never reaches the browser). Best-effort forward —
// a CRM hiccup must never block saving the lead locally.
const DEALZFLOW_INTAKE_URL =
  "https://svbilqvudkkdhslxebce.supabase.co/functions/v1/lead-intake?source=website_form";
const DEALZFLOW_SOURCE_SLUG = "website_form";
const DEALZFLOW_INTAKE_TOKEN = "f297b8ce7bbc98180b5a8abd605e6384a985dc52930e9951";

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
  // Traffic tracking fields
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
  referrer?: string;
  landingPage?: string;
}

// Simple in-memory rate limiter (resets on function cold start)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW_MS = 60000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 5;

function isRateLimited(clientIP: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(clientIP);
  
  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(clientIP, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  
  if (entry.count >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }
  
  entry.count++;
  return false;
}

// Input validation functions
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 255;
}

function isValidPhone(phone: string): boolean {
  // Allow digits, spaces, parentheses, plus, dashes, and "not-provided" for lead magnets
  if (phone === "not-provided") return true;
  const phoneRegex = /^[\d\s()+-]{10,20}$/;
  return phoneRegex.test(phone);
}

function isValidName(name: string): boolean {
  // Allow letters, spaces, hyphens, apostrophes (for names like O'Brien, Mary-Jane)
  const nameRegex = /^[a-zA-Z\s'-]{1,100}$/;
  return nameRegex.test(name);
}

function isValidBuyerType(buyerType: string): boolean {
  const validTypes = ['first-time', 'investor', 'end-user', 'first-time-buyer', 'buy-presale', 'sell-assignment', 'paid-advice', 'upsizer', 'assignment-buyer', 'seller', 'other'];
  return validTypes.includes(buyerType);
}

function isValidLeadSource(source: string): boolean {
  // Allow common lead sources, up to 100 chars
  return typeof source === 'string' && source.length > 0 && source.length <= 100;
}

// Forward a captured lead to the DealzFlow CRM lead-intake endpoint.
// Best-effort: any failure is logged but never thrown to the caller.
async function forwardToDealzFlow(lead: Record<string, any>): Promise<void> {
  try {
    const msgParts: string[] = [];
    const bt = lead.buyer_type as string | null;
    if (bt) msgParts.push(`Buyer type: ${BUYER_TYPE_LABELS[bt] || bt}`);
    if (lead.lead_source) msgParts.push(`Found via: ${lead.lead_source}`);
    if (lead.timeline) msgParts.push(`Timeline: ${lead.timeline}`);
    if (lead.budget) msgParts.push(`Budget: ${lead.budget}`);
    if (lead.preferred_call_date || lead.preferred_call_time) {
      msgParts.push(`Preferred call: ${[lead.preferred_call_date, lead.preferred_call_time].filter(Boolean).join(" ")}`);
    }
    if (lead.has_agent) msgParts.push(`Has agent: ${lead.has_agent}`);

    const crmBody = {
      source_slug: DEALZFLOW_SOURCE_SLUG,
      first_name: lead.first_name || undefined,
      last_name: lead.last_name || undefined,
      email: lead.email || undefined,
      phone: lead.phone || undefined,
      message: msgParts.length ? msgParts.join(" · ") : undefined,
      campaign: lead.utm_campaign || undefined,
      // Real UTM wins; fall back to the self-reported "How did you find me?" value.
      utm_source: lead.utm_source || lead.lead_source || undefined,
      utm_medium: lead.utm_medium || undefined,
      utm_campaign: lead.utm_campaign || undefined,
      raw: {
        site: "presalewithuzair.com",
        local_lead_id: lead.id,
        buyer_type: lead.buyer_type,
        lead_source: lead.lead_source,
        timeline: lead.timeline,
        budget: lead.budget,
        has_agent: lead.has_agent,
        preferred_call_date: lead.preferred_call_date,
        preferred_call_time: lead.preferred_call_time,
        utm_term: lead.utm_term,
        utm_content: lead.utm_content,
        referrer: lead.referrer,
        landing_page: lead.landing_page,
      },
    };

    const res = await fetch(DEALZFLOW_INTAKE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-intake-token": DEALZFLOW_INTAKE_TOKEN,
      },
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
    // Rate limiting
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

    // Validate required fields exist (lastName optional)
    if (!leadData.firstName || !leadData.email || !leadData.phone || !leadData.buyerType) {
      console.error("Missing required fields");
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Sanitize inputs
    const firstName = leadData.firstName.trim();
    const lastName = (leadData.lastName ?? "").trim();
    const email = leadData.email.trim().toLowerCase();
    const phone = leadData.phone.trim();
    const buyerType = leadData.buyerType.trim();
    const leadSource = leadData.leadSource?.trim() || 'website';
    const timeline = leadData.timeline?.trim() || null;
    const budget = leadData.budget?.trim() || null;
    const preferredCallDate = leadData.preferredCallDate?.trim() || null;
    const preferredCallTime = leadData.preferredCallTime?.trim() || null;
    const hasAgent = leadData.hasAgent?.trim() || null;
    
    // Traffic tracking data
    const utmSource = leadData.utmSource?.trim() || null;
    const utmMedium = leadData.utmMedium?.trim() || null;
    const utmCampaign = leadData.utmCampaign?.trim() || null;
    const utmTerm = leadData.utmTerm?.trim() || null;
    const utmContent = leadData.utmContent?.trim() || null;
    const referrer = leadData.referrer?.trim() || null;
    const landingPage = leadData.landingPage?.trim() || null;

    // Validate input formats
    if (!isValidName(firstName)) {
      console.error("Invalid first name format:", firstName);
      return new Response(
        JSON.stringify({ error: "Invalid first name format" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (lastName && !isValidName(lastName)) {
      console.error("Invalid last name format:", lastName);
      return new Response(
        JSON.stringify({ error: "Invalid last name format" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!isValidEmail(email)) {
      console.error("Invalid email format:", email);
      return new Response(
        JSON.stringify({ error: "Invalid email format" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!isValidPhone(phone)) {
      console.error("Invalid phone format:", phone);
      return new Response(
        JSON.stringify({ error: "Invalid phone format" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!isValidBuyerType(buyerType)) {
      console.error("Invalid buyer type:", buyerType);
      return new Response(
        JSON.stringify({ error: "Invalid buyer type" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (leadSource && !isValidLeadSource(leadSource)) {
      console.error("Invalid lead source:", leadSource);
      return new Response(
        JSON.stringify({ error: "Invalid lead source" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Capturing lead:", email, "Type:", buyerType);

    // Insert lead into database
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

    // ─── Forward to DealzFlow CRM (primary destination) ──────────────────
    await forwardToDealzFlow(lead);

    // Send to Zapier webhook if configured (legacy; no-ops when env unset)
    const zapierUrl = Deno.env.get("ZAPIER_WEBHOOK_URL");
    
    if (zapierUrl) {
      try {
        console.log("Sending to Zapier webhook...");
        const zapierResponse = await fetch(zapierUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
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
        
        console.log("Zapier webhook response status:", zapierResponse.status);
      } catch (zapierError) {
        // Log but don't fail the request if Zapier fails
        console.error("Zapier webhook error:", zapierError);
      }
    } else {
      console.log("No Zapier webhook URL configured, skipping...");
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
