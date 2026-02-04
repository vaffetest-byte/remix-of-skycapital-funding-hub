-- Create cookie_consents table for GDPR compliance tracking
CREATE TABLE public.cookie_consents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  visitor_id TEXT NOT NULL,
  consent_status TEXT NOT NULL CHECK (consent_status IN ('accepted', 'declined')),
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create index for faster lookups by visitor_id
CREATE INDEX idx_cookie_consents_visitor_id ON public.cookie_consents(visitor_id);

-- Create index for analytics queries by date
CREATE INDEX idx_cookie_consents_created_at ON public.cookie_consents(created_at);

-- Enable RLS
ALTER TABLE public.cookie_consents ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert consent (visitors don't need to be logged in)
CREATE POLICY "Anyone can record consent"
ON public.cookie_consents
FOR INSERT
WITH CHECK (true);

-- Allow anyone to update their own consent by visitor_id
CREATE POLICY "Anyone can update their consent"
ON public.cookie_consents
FOR UPDATE
USING (true);

-- Only admins can view all consents (for compliance reporting)
CREATE POLICY "Admins can view all consents"
ON public.cookie_consents
FOR SELECT
USING (public.is_admin());

-- Add trigger for updated_at
CREATE TRIGGER update_cookie_consents_updated_at
BEFORE UPDATE ON public.cookie_consents
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();