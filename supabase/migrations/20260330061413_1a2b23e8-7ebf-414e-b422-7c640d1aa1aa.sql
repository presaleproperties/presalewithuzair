CREATE TABLE public.presale_projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  source_id uuid,
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  status text DEFAULT 'active',
  city text,
  neighborhood text,
  address text,
  map_lat numeric,
  map_lng numeric,
  developer_name text,
  project_type text,
  unit_mix text,
  starting_price numeric,
  price_range text,
  deposit_structure text,
  incentives text,
  completion_year integer,
  completion_month integer,
  occupancy_estimate text,
  short_description text,
  full_description text,
  highlights jsonb DEFAULT '[]'::jsonb,
  amenities jsonb DEFAULT '[]'::jsonb,
  faq jsonb DEFAULT '[]'::jsonb,
  featured_image text,
  gallery_images jsonb DEFAULT '[]'::jsonb,
  floorplan_files jsonb,
  brochure_files jsonb,
  seo_title text,
  seo_description text,
  is_published boolean DEFAULT true,
  is_featured boolean DEFAULT false,
  near_skytrain boolean DEFAULT false,
  incentives_available boolean DEFAULT false,
  strata_fees text,
  deposit_percent numeric,
  video_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE public.presale_projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published projects" ON public.presale_projects
  FOR SELECT TO public USING (is_published = true);

CREATE POLICY "Admins can manage projects" ON public.presale_projects
  FOR ALL TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));