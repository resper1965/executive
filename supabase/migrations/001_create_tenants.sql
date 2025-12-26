-- =============================================
-- Multi-Tenant Platform Schema
-- Migration: 001_create_tenants
-- =============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- TENANTS TABLE
-- =============================================
CREATE TABLE public.tenants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  subdomain TEXT UNIQUE NOT NULL,
  custom_domain TEXT UNIQUE,
  logo_url TEXT,
  
  -- Theme configuration
  theme JSONB DEFAULT '{
    "preset": "executive",
    "primaryColor": "#0f172a",
    "accentColor": "#d4af37",
    "fontHeading": "Playfair Display",
    "fontBody": "Inter"
  }'::jsonb,
  
  -- Settings
  settings JSONB DEFAULT '{
    "calendlyUrl": null,
    "linkedinUrl": null,
    "instagramUrl": null,
    "googleAnalyticsId": null
  }'::jsonb,
  
  -- Subscription
  subscription_plan TEXT DEFAULT 'free' CHECK (subscription_plan IN ('free', 'professional', 'enterprise')),
  subscription_status TEXT DEFAULT 'active' CHECK (subscription_status IN ('active', 'cancelled', 'past_due')),
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- POSTS TABLE
-- =============================================
CREATE TABLE public.posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  
  slug TEXT NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT,
  category TEXT,
  read_time TEXT,
  cover_image_url TEXT,
  
  -- Status
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  published_at TIMESTAMPTZ,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Unique slug per tenant
  UNIQUE(tenant_id, slug)
);

-- =============================================
-- PAGES TABLE
-- =============================================
CREATE TABLE public.pages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  
  -- Page type: about, services, contact, events, etc.
  type TEXT NOT NULL,
  
  -- Dynamic content as JSONB
  content JSONB NOT NULL DEFAULT '{}'::jsonb,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- One page type per tenant
  UNIQUE(tenant_id, type)
);

-- =============================================
-- LEADS TABLE (Contact form submissions)
-- =============================================
CREATE TABLE public.leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  message TEXT,
  source TEXT DEFAULT 'contact_form',
  
  -- Status
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'converted', 'lost')),
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- INDEXES
-- =============================================
CREATE INDEX idx_tenants_subdomain ON public.tenants(subdomain);
CREATE INDEX idx_tenants_custom_domain ON public.tenants(custom_domain);
CREATE INDEX idx_posts_tenant_id ON public.posts(tenant_id);
CREATE INDEX idx_posts_slug ON public.posts(slug);
CREATE INDEX idx_posts_status ON public.posts(status);
CREATE INDEX idx_pages_tenant_id ON public.pages(tenant_id);
CREATE INDEX idx_leads_tenant_id ON public.leads(tenant_id);

-- =============================================
-- ROW LEVEL SECURITY
-- =============================================
ALTER TABLE public.tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Public read access for published content
CREATE POLICY "Public can view tenants" ON public.tenants
  FOR SELECT USING (true);

CREATE POLICY "Public can view published posts" ON public.posts
  FOR SELECT USING (status = 'published');

CREATE POLICY "Public can view pages" ON public.pages
  FOR SELECT USING (true);

-- Leads can be inserted by anyone (contact form)
CREATE POLICY "Anyone can create leads" ON public.leads
  FOR INSERT WITH CHECK (true);

-- =============================================
-- UPDATED_AT TRIGGER
-- =============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_tenants_updated_at
  BEFORE UPDATE ON public.tenants
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_posts_updated_at
  BEFORE UPDATE ON public.posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_pages_updated_at
  BEFORE UPDATE ON public.pages
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
