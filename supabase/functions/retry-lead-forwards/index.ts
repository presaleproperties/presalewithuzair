import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-sync-secret",
};

const DEALZFLOW_SOURCE_SLUG = Deno.env.get("DEALZFLOW_SOURCE_SLUG") || "presale_with_uzair";
const DEALZFLOW_INTAKE_URL =
  `https://svbilqvudkkdhslxebce.supabase.co/functions/v1/lead-intake?source=${DEALZFLOW_SOURCE_SLUG}`;
const DEALZFLOW_INTAKE_TOKEN = Deno.env.get("DEALZFLOW_INTAKE_TOKEN") ?? "";

const MAX_ATTEMPTS = 5;
// Exponential backoff in minutes, indexed by attempt count already made.
const BACKOFF_MINUTES = [15, 30, 60, 240, 1440];

function pageUrlFor(lead: Record<string, any>): string {
  const path = lead.page_url || lead.landing_page || "/";
  return path.startsWith("http")
    ? path
    : `https://presalewithuzair.com${path.startsWith("/") ? path : `/${path}`}`;
}

function buildBody(lead: Record<string, any>) {
  const pageUrl = pageUrlFor(lead);
  const lines: string[] = [];
  lines.push(`🔁 Retried lead — presalewithuzair.com`);
  lines.push(`🔗 Page: ${pageUrl}`);
  if (lead.city) lines.push(`📍 City interest: ${lead.city}`);
  if (lead.project_name) lines.push(`🏗️ Project of interest: ${lead.project_name}`);
  if (lead.cta_source) lines.push(`🖱️ CTA clicked: ${lead.cta_source}`);
  if (lead.buyer_type) lines.push(`👤 Buyer type: ${lead.buyer_type}`);
  if (lead.lead_source) lines.push(`📣 How they found us: ${lead.lead_source}`);
  if (lead.budget) lines.push(`💰 Budget: ${lead.budget}`);
  if (lead.timeline) lines.push(`🗓️ Timeline: ${lead.timeline}`);
  if (lead.has_agent) lines.push(`🤝 Already has an agent: ${lead.has_agent}`);
  if (lead.message) lines.push(`💬 Message: ${lead.message}`);
  lines.push(`↩️ Referrer: ${lead.referrer || "direct / none"}`);
  lines.push(`🕒 Submitted: ${lead.created_at}`);

  const phone = lead.phone && lead.phone !== "not-provided" ? lead.phone : undefined;

  return {
    source_slug: DEALZFLOW_SOURCE_SLUG,
    event_id: lead.id,
    first_name: lead.first_name || undefined,
    last_name: lead.last_name || undefined,
    email: lead.email || undefined,
    phone,
    message: lines.join("\n"),
    page_url: pageUrl,
    page_path: lead.landing_page || undefined,
    city: lead.city || undefined,
    budget_label: lead.budget || undefined,
    timeline: lead.timeline || undefined,
    campaign: lead.utm_campaign || undefined,
    utm_source: lead.utm_source || lead.lead_source || undefined,
    utm_medium: lead.utm_medium || undefined,
    utm_campaign: lead.utm_campaign || undefined,
    utm_term: lead.utm_term || undefined,
    utm_content: lead.utm_content || undefined,
    fbclid: lead.fbclid || undefined,
    gclid: lead.gclid || undefined,
    referrer: lead.referrer || undefined,
    consent_status: lead.consent_status || undefined,
    consent_source: lead.consent_source || undefined,
    consent_at: lead.consent_at || undefined,
    raw: { site: "presalewithuzair.com", local_lead_id: lead.id, retry: true },
  };
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  // No auth gate: this endpoint only re-sends leads already stored as "failed",
  // is capped at 200 rows per run, and every send carries the lead id as
  // event_id so the CRM de-duplicates replays instead of creating contacts.
  const url = new URL(req.url);
  // Replay mode ignores backoff/attempt limits for a date window (one-off catch-up).
  const replaySince = url.searchParams.get("replay_since");

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );

  let q = supabase.from("leads").select("*").eq("forward_status", "failed").limit(200);
  if (replaySince) {
    q = q.gte("created_at", replaySince);
  } else {
    q = q.lt("forward_attempts", MAX_ATTEMPTS)
      .or(`forward_next_attempt_at.is.null,forward_next_attempt_at.lte.${new Date().toISOString()}`);
  }

  const { data: leads, error } = await q;
  if (error) {
    console.error("Retry query failed:", error.message);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  let accepted = 0;
  let stillFailed = 0;
  const results: Array<Record<string, unknown>> = [];

  for (const lead of leads ?? []) {
    let status = "failed";
    let errText: string | null = null;
    let contactId: string | null = null;
    try {
      const res = await fetch(DEALZFLOW_INTAKE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-intake-token": DEALZFLOW_INTAKE_TOKEN },
        body: JSON.stringify(buildBody(lead)),
      });
      const text = await res.text();
      try { contactId = JSON.parse(text)?.contact_id ?? null; } catch { /* non-JSON */ }
      if (res.ok) {
        status = "sent";
        accepted++;
      } else {
        errText = `HTTP ${res.status}: ${text.slice(0, 300)}`;
        stillFailed++;
      }
    } catch (e) {
      errText = e instanceof Error ? e.message : String(e);
      stillFailed++;
    }

    const attempts = (lead.forward_attempts ?? 0) + 1;
    const backoff = BACKOFF_MINUTES[Math.min(attempts, BACKOFF_MINUTES.length) - 1];
    const { error: updErr } = await supabase
      .from("leads")
      .update({
        forward_status: status,
        forward_error: errText,
        crm_contact_id: contactId ?? lead.crm_contact_id,
        forward_attempts: attempts,
        forward_next_attempt_at:
          status === "sent" || attempts >= MAX_ATTEMPTS
            ? null
            : new Date(Date.now() + backoff * 60_000).toISOString(),
      })
      .eq("id", lead.id);
    if (updErr) console.error("Failed to record retry outcome:", updErr.message);

    results.push({ id: lead.id, ok: status === "sent", contact_id: contactId, error: errText });
  }

  const summary = { processed: leads?.length ?? 0, accepted, stillFailed, results };
  console.log("Retry summary:", JSON.stringify(summary).slice(0, 1000));
  return new Response(JSON.stringify(summary), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});
