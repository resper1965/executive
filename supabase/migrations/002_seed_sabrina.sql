-- =============================================
-- SEED: Sabrina Barros as first tenant
-- =============================================

-- Insert Sabrina as the first tenant
INSERT INTO public.tenants (
  id,
  name,
  subdomain,
  custom_domain,
  logo_url,
  theme,
  settings,
  subscription_plan
) VALUES (
  'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
  'Sabrina Barros',
  'sabrina',
  NULL,
  '/sabrinabarros-perfil.png',
  '{
    "preset": "executive",
    "primaryColor": "#0f172a",
    "accentColor": "#d4af37",
    "fontHeading": "Playfair Display",
    "fontBody": "Inter"
  }'::jsonb,
  '{
    "calendlyUrl": "https://calendly.com/sabrina-barros",
    "linkedinUrl": "https://www.linkedin.com/in/sabrina-barros/",
    "instagramUrl": null,
    "googleAnalyticsId": "G-3W69W953QN"
  }'::jsonb,
  'enterprise'
);

-- Insert About page
INSERT INTO public.pages (tenant_id, type, content) VALUES (
  'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
  'about',
  '{
    "title": "Sobre Sabrina Barros",
    "subtitle": "Conselheira Estratégica de Saúde Suplementar",
    "bio": "Executiva com mais de 20 anos de experiência no setor de saúde suplementar, com atuação em operadoras, seguradoras e consultorias estratégicas.",
    "highlights": [
      "Gestão estratégica de saúde suplementar",
      "Mitigação de riscos regulatórios (RN 623/2024)",
      "Mentoria executiva para o setor de saúde",
      "Análise comportamental de sinistralidade"
    ]
  }'::jsonb
);

-- Insert Services page
INSERT INTO public.pages (tenant_id, type, content) VALUES (
  'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
  'services',
  '{
    "title": "Serviços Estratégicos",
    "services": [
      {
        "slug": "conselheira-estrategica",
        "title": "Conselheira Estratégica",
        "description": "Assessoria para decisões críticas em saúde suplementar"
      },
      {
        "slug": "mentoria-executiva",
        "title": "Mentoria Executiva",
        "description": "Desenvolvimento de lideranças no setor de saúde"
      },
      {
        "slug": "gestao-crises-rn623",
        "title": "Gestão de Crises e RN 623",
        "description": "Adequação regulatória e mitigação de riscos"
      },
      {
        "slug": "auditoria-comportamental",
        "title": "Auditoria Comportamental de Valor",
        "description": "Análise de sinistralidade com foco comportamental"
      }
    ]
  }'::jsonb
);

-- Insert Contact page
INSERT INTO public.pages (tenant_id, type, content) VALUES (
  'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
  'contact',
  '{
    "title": "Contato",
    "subtitle": "Vamos conversar sobre como posso ajudar sua organização",
    "email": "contato@sabrinabarros.com.br",
    "calendlyUrl": "https://calendly.com/sabrina-barros"
  }'::jsonb
);

-- Insert Events page
INSERT INTO public.pages (tenant_id, type, content) VALUES (
  'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
  'events',
  '{
    "title": "Palestras e Eventos",
    "subtitle": "Conheça os temas disponíveis para eventos corporativos",
    "topics": [
      "O Futuro da Saúde Suplementar no Brasil",
      "Liderança Feminina no Setor de Saúde",
      "RN 623: Impactos e Adequação",
      "Gestão de Sinistralidade com Foco Comportamental"
    ]
  }'::jsonb
);
