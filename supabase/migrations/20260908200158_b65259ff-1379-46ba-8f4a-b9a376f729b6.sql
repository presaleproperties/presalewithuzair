ALTER TABLE public.leads
  ADD COLUMN IF NOT EXISTS consent_status text,
  ADD COLUMN IF NOT EXISTS consent_source text,
  ADD COLUMN IF NOT EXISTS consent_at timestamptz,
  ADD COLUMN IF NOT EXISTS fbclid text,
  ADD COLUMN IF NOT EXISTS gclid text,
  ADD COLUMN IF NOT EXISTS page_url text,
  ADD COLUMN IF NOT EXISTS forward_attempts integer NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS forward_next_attempt_at timestamptz;

CREATE INDEX IF NOT EXISTS leads_forward_retry_idx
  ON public.leads (forward_status, forward_next_attempt_at);