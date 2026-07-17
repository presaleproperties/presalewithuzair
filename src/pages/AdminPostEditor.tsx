import { useState, useEffect, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate, useParams, Navigate, Link } from "react-router-dom";
import DOMPurify from "dompurify";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, ExternalLink, Loader2, Save } from "lucide-react";
import { renderMarkdown } from "@/lib/renderMarkdown";

interface Category {
  id: string;
  name: string;
  slug: string;
}

const generateSlug = (text: string) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const AdminPostEditor = () => {
  const { id } = useParams<{ id: string }>();
  const isNew = id === "new";
  const navigate = useNavigate();
  const { user, isAdmin, isLoading: authLoading } = useAuth();
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(!isNew);
  const [isSaving, setIsSaving] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [slugTouched, setSlugTouched] = useState(false);
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [published, setPublished] = useState(false);
  const [originalPublished, setOriginalPublished] = useState(false);
  const [originalPublishedAt, setOriginalPublishedAt] = useState<string | null>(null);

  useEffect(() => {
    fetchCategories();
    if (!isNew && id) {
      fetchPost(id);
    }
  }, [id, isNew]);

  const fetchCategories = async () => {
    const { data } = await supabase
      .from("blog_categories")
      .select("id, name, slug")
      .order("name");
    setCategories(data || []);
  };

  const fetchPost = async (postId: string) => {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("id", postId)
      .maybeSingle();

    if (error || !data) {
      toast({ title: "Error", description: "Post not found", variant: "destructive" });
      navigate("/admin");
      return;
    }

    setTitle(data.title);
    setSlug(data.slug);
    setSlugTouched(true);
    setExcerpt(data.excerpt || "");
    setContent(data.content);
    setImageUrl(data.image_url || "");
    setCategoryId(data.category_id || "");
    setPublished(data.published);
    setOriginalPublished(data.published);
    setOriginalPublishedAt(data.published_at);
    setIsLoading(false);
  };

  const handleTitleChange = (value: string) => {
    setTitle(value);
    if (!slugTouched) setSlug(generateSlug(value));
  };

  const previewHtml = useMemo(() => {
    if (!content.trim()) return "";
    return DOMPurify.sanitize(renderMarkdown(content), { ADD_ATTR: ["target", "rel"] });
  }, [content]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !slug.trim() || !content.trim()) {
      toast({
        title: "Missing fields",
        description: "Title, slug and content are required.",
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);

    // Slug uniqueness check
    const slugQuery = supabase.from("blog_posts").select("id").eq("slug", slug);
    const { data: existing, error: slugErr } = await slugQuery;
    if (slugErr) {
      toast({ title: "Error", description: slugErr.message, variant: "destructive" });
      setIsSaving(false);
      return;
    }
    const clash = (existing || []).find((row: { id: string }) => row.id !== id);
    if (clash) {
      toast({
        title: "Slug already in use",
        description: "Pick a different URL slug — this one is taken by another post.",
        variant: "destructive",
      });
      setIsSaving(false);
      return;
    }

    // Preserve original published_at when a post stays published
    let publishedAt: string | null;
    if (published) {
      publishedAt =
        !isNew && originalPublished && originalPublishedAt
          ? originalPublishedAt
          : new Date().toISOString();
    } else {
      publishedAt = null;
    }

    const postData = {
      title: title.trim(),
      slug: slug.trim(),
      excerpt: excerpt.trim() || null,
      content,
      image_url: imageUrl.trim() || null,
      category_id: categoryId || null,
      published,
      published_at: publishedAt,
    };

    const result = isNew
      ? await supabase.from("blog_posts").insert(postData)
      : await supabase.from("blog_posts").update(postData).eq("id", id);

    if (result.error) {
      toast({ title: "Error", description: result.error.message, variant: "destructive" });
      setIsSaving(false);
      return;
    }

    toast({
      title: "Saved",
      description: `Post ${isNew ? "created" : "updated"}${published ? " and published" : " as draft"}.`,
    });
    navigate("/admin");
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }
  if (!user) return <Navigate to="/admin/login" replace />;
  if (!isAdmin) return <Navigate to="/admin" replace />;
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{isNew ? "New Post" : "Edit Post"} | Admin</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-card border-b border-border">
          <div className="container-xl py-4 flex items-center justify-between gap-3">
            <div className="flex items-center gap-4 min-w-0">
              <Link to="/admin" className="text-muted-foreground hover:text-foreground shrink-0">
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <h1 className="font-display text-xl font-bold text-foreground truncate">
                {isNew ? "New Post" : "Edit Post"}
              </h1>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              {!isNew && originalPublished && slug && (
                <Button asChild variant="outline" size="sm" className="gap-2 hidden sm:inline-flex">
                  <a href={`/blog/${slug}`} target="_blank" rel="noreferrer">
                    <ExternalLink className="h-4 w-4" />
                    View live
                  </a>
                </Button>
              )}
              <Button onClick={handleSubmit} disabled={isSaving} className="gap-2">
                {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                {isSaving ? "Saving..." : published ? "Save & Publish" : "Save Draft"}
              </Button>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="container-xl py-8">
          <form onSubmit={handleSubmit} className="max-w-3xl mx-auto space-y-8">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="Enter post title"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">Slug *</Label>
              <Input
                id="slug"
                value={slug}
                onChange={(e) => {
                  setSlug(generateSlug(e.target.value));
                  setSlugTouched(true);
                }}
                placeholder="post-url-slug"
                required
              />
              <p className="text-xs text-muted-foreground">
                Lives at <span className="font-mono">/blog/{slug || "your-slug"}</span>
              </p>
            </div>

            <div className="space-y-2">
              <Label>Category</Label>
              <Select value={categoryId} onValueChange={setCategoryId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="excerpt">Excerpt</Label>
              <Textarea
                id="excerpt"
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="Brief summary shown on the blog index and social cards"
                rows={3}
                maxLength={280}
              />
              <p className="text-xs text-muted-foreground">{excerpt.length}/280</p>
            </div>

            <div className="space-y-2">
              <Label>Content * (Markdown or HTML)</Label>
              <Tabs defaultValue="write" className="w-full">
                <TabsList>
                  <TabsTrigger value="write">Write</TabsTrigger>
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                </TabsList>
                <TabsContent value="write" className="mt-3">
                  <Textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder={`# Heading\n\nWrite your post here. Supports **bold**, *italic*, lists, > quotes, and tables.`}
                    rows={22}
                    className="font-mono text-sm"
                    required
                  />
                </TabsContent>
                <TabsContent value="preview" className="mt-3">
                  <div className="rounded-lg border border-border bg-card p-6 min-h-[400px]">
                    {previewHtml ? (
                      <article
                        className="blog-article"
                        dangerouslySetInnerHTML={{ __html: previewHtml }}
                      />
                    ) : (
                      <p className="text-sm text-muted-foreground italic">
                        Nothing to preview yet — start writing in the Write tab.
                      </p>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            <div className="space-y-2">
              <Label htmlFor="imageUrl">Featured Image URL</Label>
              <Input
                id="imageUrl"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://example.com/image.jpg"
              />
              {imageUrl && (
                <div className="mt-2 rounded-lg overflow-hidden border border-border">
                  <img
                    src={imageUrl}
                    alt="Preview"
                    className="w-full h-48 object-cover"
                    onError={(e) => ((e.target as HTMLImageElement).style.display = "none")}
                  />
                </div>
              )}
            </div>

            <div className="flex items-center justify-between p-4 bg-card rounded-lg border border-border">
              <div>
                <Label htmlFor="published" className="text-base">
                  Publish Post
                </Label>
                <p className="text-sm text-muted-foreground">
                  Off = save as draft. On = live at /blog immediately.
                </p>
              </div>
              <Switch id="published" checked={published} onCheckedChange={setPublished} />
            </div>

            <div className="md:hidden">
              <Button type="submit" className="w-full gap-2" disabled={isSaving}>
                {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                {isSaving ? "Saving..." : published ? "Save & Publish" : "Save Draft"}
              </Button>
            </div>
          </form>
        </main>
      </div>
    </>
  );
};

export default AdminPostEditor;
