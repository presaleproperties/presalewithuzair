-- Add write protection policies to user_roles table
-- Only admins can assign, modify, or remove roles

-- Policy for INSERT: Only admins can assign roles
CREATE POLICY "Only admins can assign roles"
  ON public.user_roles FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Policy for UPDATE: Only admins can modify roles
CREATE POLICY "Only admins can modify roles"
  ON public.user_roles FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Policy for DELETE: Only admins can remove roles
CREATE POLICY "Only admins can remove roles"
  ON public.user_roles FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));