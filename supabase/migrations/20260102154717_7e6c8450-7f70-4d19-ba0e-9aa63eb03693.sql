-- Add has_agent column to leads table for tracking agent status
ALTER TABLE public.leads 
ADD COLUMN has_agent TEXT;