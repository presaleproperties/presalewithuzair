import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

// ─── DealzFlow CRM lead-intake (Website Form source) ───────────────────────
// Server-side only. Best-effort forward — never blocks the lead response.
const DEALZFLOW_INTAKE_URL =
  "https://svbilqvudkkdhslxebce.supabase.co/functions/v1/lead-intake?source=website_form";
const DEALZFLOW_SOURCE_SLUG = "website_form";
const DEALZFLOW_INTAKE_TOKEN = "f297b8ce7bbc98180b5a8abd605e6384a985dc52930e9951";

// --- Rate limiting (in-memory, resets on cold start) ---
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 5;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  if (entry.count >= MAX_REQUESTS_PER_WINDOW) return true;
  entry.count++;
  return false;
}

// --- Input validation ---
function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 255;
}

function isValidPhone(phone: string): boolean {
  return /^[\d\s()+-]{7,20}$/.test(phone);
}

function isValidName(name: string): boolean {
  return /^[\p{L}\s'.-]{1,100}$/u.test(name);
}

function sanitizeText(val: unknown, maxLen = 500): string {
  if (typeof val !== "string") return "";
  return val.trim().slice(0, maxLen);
}

// Best-effort forward to the DealzFlow CRM lead-intake endpoint.
async function forwardToDealzFlow(args: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  buyerTypeLabel: string;
  helpWith: string;
  preferredCallTime: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  foundVia: string;
  landingPage: string;
  localLeadId?: string | null;
}): Promise<void> {
  try {
    const msgParts: string[] = [];
    if (args.buyerTypeLabel) msgParts.push(`Buyer type: ${args.buyerTypeLabel}`);
    if (args.helpWith) msgParts.push(`Help with: ${args.helpWith}`);
    if (args.preferredCallTime) msgParts.push(`Preferred call: ${args.preferredCallTime}`);

    const crmBody = {
      source_slug: DEALZFLOW_SOURCE_SLUG,
      first_name: args.firstName || undefined,
      last_name: args.lastName || undefined,
      email: args.email || undefined,
      phone: args.phone || undefined,
      message: msgParts.length ? msgParts.join(" · ") : undefined,
      campaign: args.utmCampaign || undefined,
      utm_source: args.utmSource || args.foundVia || undefined,
      utm_medium: args.utmMedium || undefined,
      utm_campaign: args.utmCampaign || undefined,
      raw: {
        site: "presalewithuzair.com",
        form: "landing-page-call",
        local_lead_id: args.localLeadId ?? null,
        help_with: args.helpWith,
        preferred_call_time: args.preferredCallTime,
        found_via: args.foundVia,
        landing_page: args.landingPage,
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

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  // Rate limiting
  const clientIP =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";

  if (isRateLimited(clientIP)) {
    console.warn("Rate limit exceeded for IP:", clientIP);
    return new Response(
      JSON.stringify({ error: "Too many requests. Please try again later." }),
      { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  try {
    const payload = await req.json();

    // Parse and sanitize name
    const fullName: string = sanitizeText(payload.Full_Name, 200);
    const nameParts = fullName.trim().split(/\s+/);
    const firstName = nameParts[0] || "";
    const lastName = nameParts.slice(1).join(" ") || "";

    const email = sanitizeText(payload.Email).toLowerCase();
    const phone = sanitizeText(payload.Phone, 30);

    // Validate required fields
    if (!firstName || !email || !phone) {
      return new Response(
        JSON.stringify({ error: "Missing required fields: name, email, phone" }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!isValidName(firstName)) {
      return new Response(
        JSON.stringify({ error: "Invalid name format" }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!isValidEmail(email)) {
      return new Response(
        JSON.stringify({ error: "Invalid email format" }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!isValidPhone(phone)) {
      return new Response(
        JSON.stringify({ error: "Invalid phone format" }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Map buyer type from Help_With field
    const helpWith: string = sanitizeText(payload.Help_With, 200);
    let buyerType = "buy-presale";
    if (helpWith.toLowerCase().includes("first")) buyerType = "first-time-buyer";
    else if (helpWith.toLowerCase().includes("invest")) buyerType = "investor";
    else if (helpWith.toLowerCase().includes("sell") || helpWith.toLowerCase().includes("assign")) buyerType = "sell-assignment";

    const preferredCallTime = sanitizeText(payload.Preferred_Call_Time, 100);
    const utmSource = sanitizeText(payload.UTM_Source, 100);
    const utmMedium = sanitizeText(payload.UTM_Medium, 100);
    const utmCampaign = sanitizeText(payload.UTM_Campaign, 100);
    const foundVia = sanitizeText(payload.Found_Via, 200);
    const landingPage = sanitizeText(payload.Landing_Page, 200) || "/call";

    // Save to Supabase leads table via service role
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { data: lead, error: dbError } = await supabase
      .from("leads")
      .insert({
        first_name: firstName,
        last_name: lastName,
        email: email,
        phone: phone,
        buyer_type: buyerType,
        lead_source: "landing-page",
        timeline: null,
        budget: null,
        preferred_call_time: preferredCallTime || null,
        has_agent: null,
        utm_source: utmSource || null,
        utm_medium: utmMedium || null,
        utm_campaign: utmCampaign || null,
        referrer: foundVia || null,
        landing_page: landingPage,
      })
      .select()
      .single();

    if (dbError) {
      console.error("DB insert error:", dbError.message);
      // Don't expose DB error details to client
    } else {
      console.log("Lead saved to DB:", lead?.id);
    }

    // ─── Forward to DealzFlow CRM (primary destination) ──────────────────
    const buyerTypeLabel =
      buyerType === "first-time-buyer" ? "First-time buyer"
      : buyerType === "investor" ? "Investor"
      : buyerType === "sell-assignment" ? "Selling an assignment"
      : "Buying a presale";
    await forwardToDealzFlow({
      firstName, lastName, email, phone,
      buyerTypeLabel, helpWith, preferredCallTime,
      utmSource, utmMedium, utmCampaign, foundVia, landingPage,
      localLeadId: lead?.id ?? null,
    });

    // Optional legacy Zapier forward — only if still configured. Never throws.
    const webhookUrl = Deno.env.get('ZAPIER_WEBHOOK_URL');
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } catch (zapErr) {
        console.error("Zapier forward error:", zapErr instanceof Error ? zapErr.message : zapErr);
      }
    }

    return new Response(
      JSON.stringify({ success: true, leadId: lead?.id }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    );
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Unknown error";
    console.error('Error in send-to-zapier:', msg);
    return new Response(
      JSON.stringify({ error: "An error occurred. Please try again." }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});
