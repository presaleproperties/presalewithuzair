
ALTER TABLE public.presale_projects
  ADD COLUMN IF NOT EXISTS og_image text,
  ADD COLUMN IF NOT EXISTS assignment_allowed text,
  ADD COLUMN IF NOT EXISTS source_slug text,
  ADD COLUMN IF NOT EXISTS last_synced_at timestamptz,
  ADD COLUMN IF NOT EXISTS is_indexed boolean NOT NULL DEFAULT true;

-- Deduplicate rows sharing the same source_id, keeping the most recently updated
DELETE FROM public.presale_projects a
USING public.presale_projects b
WHERE a.source_id IS NOT NULL
  AND a.source_id = b.source_id
  AND (a.updated_at, a.id) < (b.updated_at, b.id);

CREATE UNIQUE INDEX IF NOT EXISTS presale_projects_source_id_key
  ON public.presale_projects(source_id)
  WHERE source_id IS NOT NULL;
