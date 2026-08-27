ALTER TABLE public.leads
  ADD COLUMN IF NOT EXISTS forward_status text,
  ADD COLUMN IF NOT EXISTS forward_error text,
  ADD COLUMN IF NOT EXISTS crm_contact_id text;