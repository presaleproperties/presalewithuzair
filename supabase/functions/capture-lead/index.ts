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

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const leadData: LeadData = await req.json();

    // Validate required fields
    if (!leadData.firstName || !leadData.lastName || !leadData.email || !leadData.phone || !leadData.buyerType || !leadData.leadSource) {
      console.error("Missing required fields:", leadData);
      return new Response(
        JSON.stringify({ error: "All fields are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Capturing lead:", leadData.email);

    // Insert lead into database
    const { data: lead, error: dbError } = await supabase
      .from("leads")
      .insert({
        first_name: leadData.firstName.trim(),
        last_name: leadData.lastName.trim(),
        email: leadData.email.trim().toLowerCase(),
        phone: leadData.phone.trim(),
        buyer_type: leadData.buyerType,
        lead_source: leadData.leadSource,
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
      JSON.stringify({ error: message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
