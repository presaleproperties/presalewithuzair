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
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { posts } = await req.json() as { posts: BlogPost[] };

    if (!posts || !Array.isArray(posts)) {
      return new Response(JSON.stringify({ error: "Posts array required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

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

    return new Response(JSON.stringify({ results }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
