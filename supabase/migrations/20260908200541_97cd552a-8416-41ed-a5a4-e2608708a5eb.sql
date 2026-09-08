ALTER TABLE public.leads ALTER COLUMN phone DROP NOT NULL;
UPDATE public.leads SET phone = NULL WHERE phone = 'not-provided';