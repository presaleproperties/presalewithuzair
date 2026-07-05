// Nightly sync: pulls active/published presale projects from presaleproperties.com
// into this site's presale_projects table.
// Authorization: requires header `x-sync-secret` matching PROJECT_SYNC_SECRET.

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-sync-secret",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const ALLOWED_STATUS = new Set(["active", "coming_soon", "sold_out"]);
const ALLOWED_TYPES = new Set([
  "condo",
  "townhouse",
  "detached",
  "duplex",
  "commercial",
  "mixed_use",
  "land",
]);

const SELECT_FIELDS = [
  "id",
  "name",
  "slug",
  "status",
  "city",
  "neighborhood",
  "address",
  "map_lat",
  "map_lng",
  "developer_name",
  "project_type",
  "unit_mix",
  "starting_price",
  "price_range",
  "deposit_structure",
  "deposit_percent",
  "incentives",
  "incentives_available",
  "completion_month",
  "completion_year",
  "occupancy_estimate",
  "short_description",
  "full_description",
  "highlights",
  "amenities",
  "faq",
  "featured_image",
  "gallery_images",
  "floorplan_files",
  "brochure_files",
  "strata_fees",
  "assignment_allowed",
  "near_skytrain",
  "video_url",
  "seo_title",
  "seo_description",
  "og_image",
  "updated_at",
].join(",");

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const expected = Deno.env.get("PROJECT_SYNC_SECRET") ?? "";
  const provided = req.headers.get("x-sync-secret") ?? "";
  if (!expected || provided !== expected) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const sourceUrl = Deno.env.get("PRESALEPROP_SUPABASE_URL")!;
    const sourceKey = Deno.env.get("PRESALEPROP_ANON_KEY")!;
    const localUrl = Deno.env.get("SUPABASE_URL")!;
    const localKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    // Fetch full active/published set from source via REST (paginated)
    const pageSize = 1000;
    let from = 0;
    let sourceRows: any[] = [];
    while (true) {
      const url =
        `${sourceUrl}/rest/v1/presale_projects` +
        `?is_published=eq.true&status=eq.active&select=${SELECT_FIELDS}` +
        `&order=updated_at.desc`;
      const res = await fetch(url, {
        headers: {
          apikey: sourceKey,
          Authorization: `Bearer ${sourceKey}`,
          Range: `${from}-${from + pageSize - 1}`,
          "Range-Unit": "items",
          Prefer: "count=exact",
        },
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Source fetch failed (${res.status}): ${text}`);
      }
      const batch = await res.json();
      sourceRows = sourceRows.concat(batch);
      if (!batch.length || batch.length < pageSize) break;
      from += pageSize;
    }

    const local = createClient(localUrl, localKey, {
      auth: { persistSession: false },
    });

    // Load existing local rows (by source_id + slug) to detect collisions/retirements
    const { data: existing, error: exErr } = await local
      .from("presale_projects")
      .select("id, source_id, slug");
    if (exErr) throw new Error(`Load local error: ${exErr.message}`);

    const bySourceId = new Map<string, { id: string; slug: string }>();
    const bySlug = new Map<string, { id: string; source_id: string | null }>();
    for (const row of existing || []) {
      if (row.source_id) bySourceId.set(row.source_id, { id: row.id, slug: row.slug });
      bySlug.set(row.slug, { id: row.id, source_id: row.source_id });
    }

    let inserted = 0;
    let updated = 0;
    const cityCounts: Record<string, number> = {};
    const errors: string[] = [];

    for (const src of sourceRows) {
      // slug: prefer source slug; if a DIFFERENT source_id already owns it, append -2
      let slug: string = src.slug;
      const owner = bySlug.get(slug);
      if (owner && owner.source_id && owner.source_id !== src.id) {
        slug = `${src.slug}-2`;
      }

      const status = ALLOWED_STATUS.has(src.status) ? src.status : "active";
      const project_type = ALLOWED_TYPES.has(src.project_type) ? src.project_type : null;

      const payload: Record<string, unknown> = {
        source_id: src.id,
        source_slug: src.slug,
        slug,
        name: src.name,
        status,
        city: src.city,
        neighborhood: src.neighborhood,
        address: src.address,
        map_lat: src.map_lat,
        map_lng: src.map_lng,
        developer_name: src.developer_name,
        project_type,
        unit_mix: src.unit_mix,
        starting_price: src.starting_price,
        price_range: src.price_range,
        deposit_structure: src.deposit_structure,
        deposit_percent: src.deposit_percent,
        incentives: src.incentives,
        incentives_available: src.incentives_available ?? false,
        completion_month: src.completion_month,
        completion_year: src.completion_year,
        occupancy_estimate: src.occupancy_estimate,
        short_description: src.short_description,
        full_description: src.full_description,
        highlights: src.highlights ?? [],
        amenities: src.amenities ?? [],
        faq: src.faq ?? [],
        featured_image: src.featured_image,
        gallery_images: src.gallery_images ?? [],
        floorplan_files: src.floorplan_files,
        brochure_files: src.brochure_files,
        strata_fees: src.strata_fees,
        assignment_allowed: src.assignment_allowed,
        near_skytrain: src.near_skytrain ?? false,
        video_url: src.video_url,
        seo_title: src.seo_title,
        seo_description: src.seo_description,
        og_image: src.og_image,
        is_published: true,
        is_indexed: false, // pages canonical to presaleproperties.com
        last_synced_at: new Date().toISOString(),
        updated_at: src.updated_at ?? new Date().toISOString(),
      };

      const existingRow = bySourceId.get(src.id);
      if (existingRow) {
        const { error } = await local
          .from("presale_projects")
          .update(payload)
          .eq("id", existingRow.id);
        if (error) errors.push(`update ${src.slug}: ${error.message}`);
        else updated++;
      } else {
        const { error } = await local.from("presale_projects").insert(payload);
        if (error) errors.push(`insert ${src.slug}: ${error.message}`);
        else inserted++;
      }

      if (src.city) cityCounts[src.city] = (cityCounts[src.city] ?? 0) + 1;
    }

    // Reconcile retired projects
    const activeIds = new Set(sourceRows.map((r: any) => r.id));
    const retiredIds: string[] = [];
    for (const [sid, row] of bySourceId.entries()) {
      if (!activeIds.has(sid)) retiredIds.push(row.id);
    }
    let retired = 0;
    if (retiredIds.length) {
      const { error } = await local
        .from("presale_projects")
        .update({
          status: "sold_out",
          is_published: false,
          last_synced_at: new Date().toISOString(),
        })
        .in("id", retiredIds);
      if (error) errors.push(`retire: ${error.message}`);
      else retired = retiredIds.length;
    }

    const summary = {
      fetched: sourceRows.length,
      inserted,
      updated,
      retired,
      by_city: cityCounts,
      errors: errors.length ? errors : undefined,
    };
    console.log("sync-presale-projects", JSON.stringify(summary));
    return new Response(JSON.stringify({ success: true, ...summary }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    console.error("sync-presale-projects error:", msg);
    return new Response(JSON.stringify({ success: false, error: msg }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
