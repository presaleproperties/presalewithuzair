ALTER TABLE public.leads
  ADD COLUMN IF NOT EXISTS cta_source text,
  ADD COLUMN IF NOT EXISTS project_name text;