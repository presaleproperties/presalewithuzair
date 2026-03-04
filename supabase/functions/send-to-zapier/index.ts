import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const payload = await req.json();

    // Parse name into first/last
    const fullName: string = payload.Full_Name || "";
    const nameParts = fullName.trim().split(/\s+/);
    const firstName = nameParts[0] || fullName;
    const lastName = nameParts.slice(1).join(" ") || "";

    // Map buyer type from Help_With field
    const helpWith: string = payload.Help_With || "";
    let buyerType = "buy-presale";
    if (helpWith.toLowerCase().includes("first")) buyerType = "first-time-buyer";
    else if (helpWith.toLowerCase().includes("invest")) buyerType = "investor";
    else if (helpWith.toLowerCase().includes("sell") || helpWith.toLowerCase().includes("assign")) buyerType = "sell-assignment";

    // Save to Supabase leads table
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { data: lead, error: dbError } = await supabase
      .from("leads")
      .insert({
        first_name: firstName,
        last_name: lastName,
        email: payload.Email?.trim().toLowerCase() || "",
        phone: payload.Phone?.trim() || "",
        buyer_type: buyerType,
        lead_source: "landing-page",
        timeline: null,
        budget: null,
        preferred_call_time: payload.Preferred_Call_Time || null,
        has_agent: null,
        utm_source: payload.UTM_Source || null,
        utm_medium: payload.UTM_Medium || null,
        utm_campaign: payload.UTM_Campaign || null,
        referrer: payload.Found_Via || null,
        landing_page: payload.Landing_Page || "/call",
      })
      .select()
      .single();

    if (dbError) {
      console.error("DB insert error:", dbError.message);
    } else {
      console.log("Lead saved to DB:", lead?.id);
    }

    // Forward to Zapier
    const webhookUrl = Deno.env.get('ZAPIER_WEBHOOK_URL');
    if (!webhookUrl) throw new Error('Zapier webhook URL not configured');

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
    console.error('Error in send-to-zapier:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});
