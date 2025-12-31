-- Add status column to leads table for lead management
ALTER TABLE public.leads 
ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'new';

-- Add index for faster filtering
CREATE INDEX IF NOT EXISTS idx_leads_status ON public.leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_buyer_type ON public.leads(buyer_type);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON public.leads(created_at DESC);