-- Ensure Victor has admin role (case-insensitive email match)
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'::public.app_role
FROM auth.users
WHERE lower(email) = lower('Victor@skycapnow.com')
ON CONFLICT (user_id, role) DO NOTHING;

-- Add explicit deny-all RLS policies to avoid "RLS enabled, no policy" linter finding
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'user_roles' AND policyname = 'user_roles_deny_select'
  ) THEN
    CREATE POLICY user_roles_deny_select
      ON public.user_roles
      FOR SELECT
      TO public
      USING (false);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'user_roles' AND policyname = 'user_roles_deny_insert'
  ) THEN
    CREATE POLICY user_roles_deny_insert
      ON public.user_roles
      FOR INSERT
      TO public
      WITH CHECK (false);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'user_roles' AND policyname = 'user_roles_deny_update'
  ) THEN
    CREATE POLICY user_roles_deny_update
      ON public.user_roles
      FOR UPDATE
      TO public
      USING (false)
      WITH CHECK (false);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'user_roles' AND policyname = 'user_roles_deny_delete'
  ) THEN
    CREATE POLICY user_roles_deny_delete
      ON public.user_roles
      FOR DELETE
      TO public
      USING (false);
  END IF;
END $$;