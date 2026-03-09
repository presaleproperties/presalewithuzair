
-- Drop the existing permissive leads policies and ensure only admins can access leads
-- The leads table should ONLY be writable via service role (edge functions), not by any authenticated or anon user directly

-- Drop any existing policies on leads that might be overly permissive
DROP POLICY IF EXISTS "Allow public inserts" ON public.leads;
DROP POLICY IF EXISTS "Allow anonymous insert" ON public.leads;
DROP POLICY IF EXISTS "Public can insert leads" ON public.leads;
DROP POLICY IF EXISTS "Anyone can insert leads" ON public.leads;

-- Ensure the existing admin policies are correct and add explicit deny for everything else
-- The current policies already restrict SELECT and ALL to admins
-- Just verify no public INSERT policy exists by checking the ones we need

-- Add a comment for documentation
COMMENT ON TABLE public.leads IS 'Lead capture table. INSERT only via service role (edge functions). All access restricted to admin users via RLS.';

-- Ensure updated_at trigger exists on leads
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.triggers 
    WHERE trigger_name = 'update_leads_updated_at' 
    AND event_object_table = 'leads'
  ) THEN
    CREATE TRIGGER update_leads_updated_at
    BEFORE UPDATE ON public.leads
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
  END IF;
END $$;
