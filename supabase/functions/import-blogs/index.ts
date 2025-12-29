import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface BlogPost {
  slug: string;
  title: string;
  content: string;
  image_url: string;
  category: string;
  published_at: string;
  excerpt: string;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    // Get the authorization header
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      console.error("Missing authorization header");
      return new Response(
        JSON.stringify({ error: "Missing authorization header" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Create client with user's auth to check their role
    const userSupabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } }
    });

    // Verify user is authenticated
    const { data: { user }, error: authError } = await userSupabase.auth.getUser();
    if (authError || !user) {
      console.error("Authentication failed:", authError?.message);
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Authenticated user:", user.id);

    // Check if user has admin role using the has_role function
    const { data: roleData, error: roleError } = await userSupabase
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .eq("role", "admin")
      .maybeSingle();

    if (roleError) {
      console.error("Role check error:", roleError.message);
    }

    if (!roleData) {
      console.error("User does not have admin role:", user.id);
      return new Response(
        JSON.stringify({ error: "Forbidden: Admin access required" }),
        { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Admin access verified for user:", user.id);

    // Now proceed with service role for actual operations
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { posts } = await req.json() as { posts: BlogPost[] };

    if (!posts || !Array.isArray(posts)) {
      return new Response(JSON.stringify({ error: "Posts array required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    console.log("Importing", posts.length, "posts");

    // Get categories
    const { data: categories } = await supabase
      .from("blog_categories")
      .select("id, name, slug");

    const categoryMap = new Map(
      categories?.map((c) => [c.name.toLowerCase(), c.id]) || []
    );

    const results = [];

    for (const post of posts) {
      // Find or create category
      let categoryId = categoryMap.get(post.category.toLowerCase());
      
      if (!categoryId && post.category) {
        const categorySlug = post.category.toLowerCase().replace(/\s+/g, "-");
        const { data: newCat } = await supabase
          .from("blog_categories")
          .upsert({ name: post.category, slug: categorySlug }, { onConflict: "slug" })
          .select("id")
          .single();
        categoryId = newCat?.id;
      }

      // Clean the slug
      const cleanSlug = post.slug
        .replace(/[()]/g, "")
        .replace(/\s+/g, "-")
        .toLowerCase();

      // Generate excerpt if not provided
      const excerpt = post.excerpt || post.content
        .replace(/<[^>]*>/g, "")
        .substring(0, 200) + "...";

      const { data, error } = await supabase
        .from("blog_posts")
        .upsert(
          {
            slug: cleanSlug,
            title: post.title,
            content: post.content,
            image_url: post.image_url,
            category_id: categoryId,
            published: true,
            published_at: post.published_at,
            excerpt: excerpt,
          },
          { onConflict: "slug" }
        )
        .select();

      results.push({ slug: cleanSlug, success: !error, error: error?.message });
    }

    console.log("Import complete:", results.length, "posts processed");

    return new Response(JSON.stringify({ results }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Import error:", message);
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
