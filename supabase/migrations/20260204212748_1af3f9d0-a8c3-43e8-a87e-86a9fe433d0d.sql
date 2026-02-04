CREATE OR REPLACE FUNCTION public.is_admin()
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  SELECT COALESCE(
    (SELECT email FROM auth.users WHERE id = auth.uid()) = 'Victor@skycapnow.com',
    false
  )
$function$;