import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

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
        preferred_call_time: sanitizeText(payload.Preferred_Call_Time, 100) || null,
        has_agent: null,
        utm_source: sanitizeText(payload.UTM_Source, 100) || null,
        utm_medium: sanitizeText(payload.UTM_Medium, 100) || null,
        utm_campaign: sanitizeText(payload.UTM_Campaign, 100) || null,
        referrer: sanitizeText(payload.Found_Via, 200) || null,
        landing_page: sanitizeText(payload.Landing_Page, 200) || "/call",
      })
      .select()
      .single();

    if (dbError) {
      console.error("DB insert error:", dbError.message);
      // Don't expose DB error details to client
    } else {
      console.log("Lead saved to DB:", lead?.id);
    }

    // Forward to Zapier
    const webhookUrl = Deno.env.get('ZAPIER_WEBHOOK_URL');
    if (!webhookUrl) throw new Error('Zapier webhook URL not configured');

    // Forward original payload to Zapier (it expects the original field names)
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    return new Response(
      JSON.stringify({ success: true, status: response.status, leadId: lead?.id }),
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
