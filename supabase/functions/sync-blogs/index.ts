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
  const expectedSecret =
    Deno.env.get("SYNC_SECRET") || Deno.env.get("PROJECT_SYNC_SECRET") || "";
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


    // Connect to source (presaleproperties.com)
    const source = createClient(SOURCE_URL, SOURCE_ANON_KEY);

    // Connect to local (this project) with service role to bypass RLS
    const local = createClient(localUrl, serviceKey);

    // Fetch published blog posts from presaleproperties.com (last 10 + any newer)
    // Check what we already have synced
    const { data: existingSlugs } = await local
      .from("blog_posts")
      .select("slug")
      .order("created_at", { ascending: false });

    const existingSlugSet = new Set(
      (existingSlugs || []).map((p: { slug: string }) => p.slug)
    );

    // Fetch published posts from source, ordered by newest first
    const { data: sourcePosts, error: sourceError } = await source
      .from("blog_posts")
      .select("*")
      .eq("is_published", true)
      .order("publish_date", { ascending: false })
      .limit(50);

    if (sourceError) {
      throw new Error(`Failed to fetch from source: ${sourceError.message}`);
    }

    if (!sourcePosts || sourcePosts.length === 0) {
      return new Response(
        JSON.stringify({ success: true, synced: 0, message: "No posts to sync" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Map category names to local category IDs
    const { data: localCategories } = await local
      .from("blog_categories")
      .select("id, slug, name");

    const categoryMap: Record<string, string> = {};
    for (const cat of localCategories || []) {
      categoryMap[cat.slug] = cat.id;
      categoryMap[cat.name.toLowerCase()] = cat.id;
    }

    let syncedCount = 0;
    const errors: string[] = [];

    for (const post of sourcePosts) {
      // Skip if already exists
      if (existingSlugSet.has(post.slug)) {
        continue;
      }

      // Map category
      let categoryId: string | null = null;
      if (post.category) {
        const catKey = post.category.toLowerCase().replace(/\s+/g, "-");
        categoryId = categoryMap[catKey] || categoryMap[post.category.toLowerCase()] || null;
      }

      const mapped = {
        title: post.title,
        slug: post.slug,
        content: post.content || "",
        excerpt: post.excerpt || null,
        image_url: post.featured_image || null,
        published: true,
        published_at: post.publish_date || post.created_at,
        category_id: categoryId,
        created_at: post.created_at,
        updated_at: post.updated_at,
      };

      const { error: insertError } = await local
        .from("blog_posts")
        .insert(mapped);

      if (insertError) {
        errors.push(`Failed to sync "${post.slug}": ${insertError.message}`);
      } else {
        syncedCount++;
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        synced: syncedCount,
        total_source: sourcePosts.length,
        already_existed: sourcePosts.length - syncedCount - errors.length,
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
