import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface LeadData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  buyerType: string;
  leadSource: string;
  zapierWebhookUrl?: string;
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
  // Allow digits, spaces, parentheses, plus, and dashes
  const phoneRegex = /^[\d\s()+-]{10,20}$/;
  return phoneRegex.test(phone);
}

function isValidName(name: string): boolean {
  // Allow letters, spaces, hyphens, apostrophes (for names like O'Brien, Mary-Jane)
  const nameRegex = /^[a-zA-Z\s'-]{1,100}$/;
  return nameRegex.test(name);
}

function isValidBuyerType(buyerType: string): boolean {
  const validTypes = ['first-time', 'investor', 'end-user'];
  return validTypes.includes(buyerType);
}

function isValidLeadSource(source: string): boolean {
  // Allow common lead sources, up to 100 chars
  return typeof source === 'string' && source.length > 0 && source.length <= 100;
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

    // Validate required fields exist
    if (!leadData.firstName || !leadData.lastName || !leadData.email || !leadData.phone || !leadData.buyerType || !leadData.leadSource) {
      console.error("Missing required fields");
      return new Response(
        JSON.stringify({ error: "All fields are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Sanitize inputs
    const firstName = leadData.firstName.trim();
    const lastName = leadData.lastName.trim();
    const email = leadData.email.trim().toLowerCase();
    const phone = leadData.phone.trim();
    const buyerType = leadData.buyerType.trim();
    const leadSource = leadData.leadSource.trim();

    // Validate input formats
    if (!isValidName(firstName)) {
      console.error("Invalid first name format:", firstName);
      return new Response(
        JSON.stringify({ error: "Invalid first name format" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!isValidName(lastName)) {
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

    if (!isValidLeadSource(leadSource)) {
      console.error("Invalid lead source:", leadSource);
      return new Response(
        JSON.stringify({ error: "Invalid lead source" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Capturing lead:", email);

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

    // Send to Zapier webhook if configured
    const zapierUrl = leadData.zapierWebhookUrl || Deno.env.get("ZAPIER_WEBHOOK_URL");
    
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
            full_name: `${lead.first_name} ${lead.last_name}`,
            email: lead.email,
            phone: lead.phone,
            buyer_type: lead.buyer_type,
            lead_source: lead.lead_source,
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
