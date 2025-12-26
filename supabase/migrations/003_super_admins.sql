-- =============================================
-- Super Admins (Bekaa team)
-- =============================================

CREATE TABLE IF NOT EXISTS public.super_admins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.super_admins ENABLE ROW LEVEL SECURITY;

-- Policy: only super admins can read the table
CREATE POLICY "Super admins can view themselves" ON public.super_admins
  FOR SELECT USING (auth.jwt() ->> 'email' = email);

-- Insert initial super admin (Bekaa)
INSERT INTO public.super_admins (email, name) VALUES 
  ('admin@bekaa.eu', 'Bekaa Admin')
ON CONFLICT (email) DO NOTHING;
