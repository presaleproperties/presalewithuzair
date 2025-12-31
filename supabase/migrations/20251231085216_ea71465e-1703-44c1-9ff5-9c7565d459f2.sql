-- Add new columns to leads table for enhanced lead capture
ALTER TABLE public.leads 
ADD COLUMN IF NOT EXISTS timeline text,
ADD COLUMN IF NOT EXISTS budget text,
ADD COLUMN IF NOT EXISTS is_paid boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS payment_intent_id text;

-- Make buyer_type accept new values and allow some fields to be nullable for advice leads
ALTER TABLE public.leads ALTER COLUMN lead_source DROP NOT NULL;