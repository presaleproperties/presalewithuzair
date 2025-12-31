-- Add preferred call scheduling fields to leads
ALTER TABLE public.leads
ADD COLUMN IF NOT EXISTS preferred_call_date TEXT,
ADD COLUMN IF NOT EXISTS preferred_call_time TEXT;

CREATE INDEX IF NOT EXISTS idx_leads_preferred_call_date ON public.leads (preferred_call_date);