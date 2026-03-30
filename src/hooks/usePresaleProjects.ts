import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface PresaleProject {
  id: string;
  source_id: string | null;
  name: string;
  slug: string;
  status: string;
  city: string | null;
  neighborhood: string | null;
  address: string | null;
  developer_name: string | null;
  project_type: string | null;
  unit_mix: string | null;
  starting_price: number | null;
  short_description: string | null;
  full_description: string | null;
  featured_image: string | null;
  gallery_images: string[];
  highlights: string[];
  amenities: string[];
  near_skytrain: boolean;
  is_featured: boolean;
  occupancy_estimate: string | null;
  deposit_percent: number | null;
  completion_year: number | null;
  video_url: string | null;
  created_at: string;
}

export function usePresaleProjects(city?: string) {
  return useQuery({
    queryKey: ["presale-projects", city],
    queryFn: async () => {
      let query = supabase
        .from("presale_projects" as any)
        .select("*")
        .eq("is_published", true)
        .eq("status", "active")
        .order("is_featured", { ascending: false })
        .order("created_at", { ascending: false });

      if (city) {
        query = query.ilike("city", city);
      }

      const { data, error } = await query;
      if (error) throw error;
      return (data || []) as unknown as PresaleProject[];
    },
  });
}

export function usePresaleProject(slug: string) {
  return useQuery({
    queryKey: ["presale-project", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("presale_projects" as any)
        .select("*")
        .eq("slug", slug)
        .eq("is_published", true)
        .maybeSingle();

      if (error) throw error;
      return data as unknown as PresaleProject | null;
    },
    enabled: !!slug,
  });
}
