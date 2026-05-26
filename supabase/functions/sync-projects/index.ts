import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// presaleproperties.com Supabase credentials (public/anon - read-only)
const SOURCE_URL = "https://thvlisplwqhtjpzpedhq.supabase.co";
const SOURCE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRodmxpc3Bsd3FodGpwenBlZGhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY3Mzk1NDIsImV4cCI6MjA4MjMxNTU0Mn0.lRValr0GwsWLXmd1LewKPauE-3yGhYiCvskXq4XCf5s";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Restrict to authorized callers (cron job uses service role bearer)
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const authHeader = req.headers.get("Authorization") || "";
  const syncSecret = req.headers.get("x-sync-secret") || "";
  const expectedSecret = Deno.env.get("SYNC_SECRET") || "";
  const isServiceRole = authHeader === `Bearer ${serviceKey}`;
  const isSecretOk = expectedSecret.length > 0 && syncSecret === expectedSecret;
  if (!isServiceRole && !isSecretOk) {
    return new Response(JSON.stringify({ error: "Forbidden" }), {
      status: 403,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const localUrl = Deno.env.get("SUPABASE_URL")!;


    const source = createClient(SOURCE_URL, SOURCE_ANON_KEY);
    const local = createClient(localUrl, serviceKey);

    // Get existing slugs locally
    const { data: existingSlugs } = await local
      .from("presale_projects")
      .select("slug, updated_at");

    const existingMap = new Map(
      (existingSlugs || []).map((p: { slug: string; updated_at: string }) => [p.slug, p.updated_at])
    );

    // Fetch all published projects from source (paginate in batches of 100)
    let allSourceProjects: any[] = [];
    let offset = 0;
    const batchSize = 100;

    while (true) {
      const { data: batch, error: batchError } = await source
        .from("presale_projects")
        .select("*")
        .eq("is_published", true)
        .order("created_at", { ascending: false })
        .range(offset, offset + batchSize - 1);

      if (batchError) throw new Error(`Source fetch error: ${batchError.message}`);
      if (!batch || batch.length === 0) break;

      allSourceProjects = allSourceProjects.concat(batch);
      if (batch.length < batchSize) break;
      offset += batchSize;
    }

    if (allSourceProjects.length === 0) {
      return new Response(
        JSON.stringify({ success: true, synced: 0, updated: 0, message: "No projects to sync" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    let syncedCount = 0;
    let updatedCount = 0;
    const errors: string[] = [];

    for (const project of allSourceProjects) {
      const mapped = {
        source_id: project.id,
        name: project.name,
        slug: project.slug,
        status: project.status || "active",
        city: project.city,
        neighborhood: project.neighborhood,
        address: project.address,
        map_lat: project.map_lat,
        map_lng: project.map_lng,
        developer_name: project.developer_name,
        project_type: project.project_type,
        unit_mix: project.unit_mix,
        starting_price: project.starting_price,
        price_range: project.price_range,
        deposit_structure: project.deposit_structure,
        incentives: project.incentives,
        completion_year: project.completion_year,
        completion_month: project.completion_month,
        occupancy_estimate: project.occupancy_estimate,
        short_description: project.short_description,
        full_description: project.full_description,
        highlights: project.highlights || [],
        amenities: project.amenities || [],
        faq: project.faq || [],
        featured_image: project.featured_image,
        gallery_images: project.gallery_images || [],
        floorplan_files: project.floorplan_files,
        brochure_files: project.brochure_files,
        seo_title: project.seo_title,
        seo_description: project.seo_description,
        is_published: true,
        is_featured: project.is_featured || false,
        near_skytrain: project.near_skytrain || false,
        incentives_available: project.incentives_available || false,
        strata_fees: project.strata_fees,
        deposit_percent: project.deposit_percent,
        video_url: project.video_url,
        updated_at: project.updated_at || new Date().toISOString(),
      };

      const existingUpdatedAt = existingMap.get(project.slug);

      if (!existingUpdatedAt) {
        // New project - insert
        const { error: insertError } = await local
          .from("presale_projects")
          .insert({ ...mapped, created_at: project.created_at });

        if (insertError) {
          errors.push(`Insert "${project.slug}": ${insertError.message}`);
        } else {
          syncedCount++;
        }
      } else if (project.updated_at && project.updated_at > existingUpdatedAt) {
        // Existing project with newer data - update
        const { error: updateError } = await local
          .from("presale_projects")
          .update(mapped)
          .eq("slug", project.slug);

        if (updateError) {
          errors.push(`Update "${project.slug}": ${updateError.message}`);
        } else {
          updatedCount++;
        }
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        synced: syncedCount,
        updated: updatedCount,
        total_source: allSourceProjects.length,
        already_current: allSourceProjects.length - syncedCount - updatedCount - errors.length,
        errors: errors.length > 0 ? errors : undefined,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Sync error:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
