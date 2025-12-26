# Executive Platform - Setup Guide

Este guia detalha o processo completo de configuração da plataforma Executive, uma SaaS multi-tenant para consultores executivos.

## 📋 Pré-requisitos

- Node.js 20+ instalado
- Conta no Supabase (obrigatório)
- Conta Vercel (obrigatório - inclui AI Gateway)
- Conta no Stripe (opcional - mock configurado)
- Conta OpenAI (opcional - gerenciada via Vercel AI Gateway)

## 🚀 Instalação Local

### 1. Clone o Repositório

```bash
git clone <repository-url>
cd executive
```

### 2. Instale Dependências

```bash
npm install
```

### 3. Configure Variáveis de Ambiente

Copie o arquivo de exemplo:

```bash
cp .env.example .env.local
```

Edite `.env.local` e preencha as variáveis:

#### Supabase

```env
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_anon_key_publica
SUPABASE_SERVICE_ROLE_KEY=sua_service_role_key
```

**Como obter:**
1. Acesse [Supabase Dashboard](https://app.supabase.com)
2. Selecione seu projeto
3. Vá em Settings > API
4. Copie URL e anon key

#### Stripe

```env
STRIPE_SECRET_KEY=sk_test_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
STRIPE_PRICE_PROFESSIONAL=price_xxx
STRIPE_PRICE_ENTERPRISE=price_xxx
```

**Nota:** Este projeto atualmente usa **números mock do Stripe** para desenvolvimento. O sistema de pagamentos está configurado mas não processa cobranças reais.

Para produção com pagamentos reais:
1. Acesse [Stripe Dashboard](https://dashboard.stripe.com)
2. Em Developers > API keys, copie a Secret key de produção (`sk_live_xxx`)
3. Crie produtos e preços em Products
4. Copie os Price IDs dos planos Professional e Enterprise

**Configurar Webhook (Produção):**
1. Em Developers > Webhooks, clique "Add endpoint"
2. URL: `https://seu-dominio.vercel.app/api/stripe/webhook`
3. Eventos: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`
4. Copie o Webhook Secret

#### OpenAI / Vercel AI Gateway

```env
OPENAI_API_KEY=sk-xxx
```

**Nota:** Este projeto usa **Vercel AI Gateway** para gerenciar as chamadas de IA. As API keys já estão configuradas no AI Gateway da Vercel, portanto você **não precisa** configurar `OPENAI_API_KEY` localmente se estiver usando o ambiente Vercel.

Para desenvolvimento local (opcional):
1. Acesse [OpenAI Platform](https://platform.openai.com)
2. Vá em API keys
3. Crie uma nova key

#### Platform

```env
NEXT_PUBLIC_PLATFORM_DOMAIN=localhost:3000
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

Para produção, use seu domínio Vercel:
```env
NEXT_PUBLIC_PLATFORM_DOMAIN=executive.vercel.app
NEXT_PUBLIC_APP_URL=https://executive.vercel.app
```

#### Analytics (Opcional)

```env
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

## 🗄️ Configuração do Banco de Dados

### 1. Execute as Migrações

No Supabase SQL Editor, execute os arquivos de migração em ordem:

```sql
-- 1. Schema principal
-- Execute: supabase/migrations/001_create_tenants.sql

-- 2. Dados de exemplo (opcional)
-- Execute: supabase/migrations/002_seed_sabrina.sql

-- 3. Tabela de super admins
-- Execute: supabase/migrations/003_super_admins.sql
```

### 2. Adicione seu Email como Super Admin

No SQL Editor:

```sql
INSERT INTO public.super_admins (email)
VALUES ('seu-email@exemplo.com');
```

### 3. Verifique as Políticas RLS

As políticas de Row-Level Security devem estar ativas:

```sql
-- Verificar
SELECT tablename, policyname
FROM pg_policies
WHERE schemaname = 'public';
```

## 🏃 Executar Localmente

```bash
npm run dev
```

Acesse: http://localhost:3000

**Rotas importantes:**
- `/` - Home pública
- `/auth/login` - Login OTP
- `/admin` - Painel do tenant (requer autenticação)
- `/platform-admin` - Super admin (requer super admin)

## 📦 Deploy na Vercel

### 1. Conecte o Repositório

```bash
vercel
```

Ou importe no [Vercel Dashboard](https://vercel.com/new)

### 2. Configure Variáveis de Ambiente

No Vercel Dashboard:
1. Vá em Settings > Environment Variables
2. Adicione todas as variáveis do `.env.local`
3. Selecione os ambientes (Production, Preview, Development)

**Via CLI:**

```bash
# Exemplo
echo "sk_live_xxx" | vercel env add STRIPE_SECRET_KEY production
```

### 3. Deploy

```bash
vercel --prod
```

### 4. Configure Domínios

1. No Vercel Dashboard, vá em Settings > Domains
2. Adicione seu domínio principal (ex: `executive.vercel.app`)
3. Para tenants com domínio customizado, adicione wildcard DNS:
   - Tipo: CNAME
   - Nome: `*.executive.vercel.app`
   - Valor: `cname.vercel-dns.com`

## 🔐 Autenticação

### Como funciona

1. Usuário acessa `/auth/login`
2. Insere email
3. Recebe link mágico (OTP) por email
4. Clica no link → autenticado
5. Redirecionado para `/admin` (se tenant admin) ou `/platform-admin` (se super admin)

### Adicionar Super Admins

```sql
INSERT INTO public.super_admins (email)
VALUES ('admin@empresa.com');
```

## 🏢 Criar Novo Tenant

### Via Super Admin Panel

1. Faça login como super admin
2. Acesse `/platform-admin/tenants`
3. Clique "Criar Tenant"
4. Preencha:
   - Nome
   - Subdomínio (único)
   - Plano (free/professional/enterprise)

### Via SQL (desenvolvimento)

```sql
INSERT INTO public.tenants (name, subdomain, subscription_plan)
VALUES ('Minha Empresa', 'minha-empresa', 'professional');
```

Acesse: `https://minha-empresa.executive.vercel.app`

## 🎨 Personalização

### Temas

Os temas estão em `src/lib/themes.ts`. Cada tenant pode escolher entre:
- executive
- health-executive
- healthcare
- corporate
- minimal
- vibrant

Para adicionar novo tema:

```typescript
// src/lib/themes.ts
export const themePresets = {
  // ... existentes
  meuTema: {
    name: "Meu Tema",
    primaryColor: "#000000",
    accentColor: "#ffffff",
    fontHeading: "Inter",
    fontBody: "Inter",
  },
};
```

## 🧪 Testes

### Testar Autenticação

1. Acesse `/auth/login`
2. Insira um email válido
3. Verifique sua caixa de entrada
4. Clique no link mágico

**Desenvolvimento:**
Supabase envia emails reais mesmo em development. Configure SMTP ou use [Inbucket](https://github.com/inbucket/inbucket).

### Testar Pagamentos

Use cartões de teste do Stripe:

- Sucesso: `4242 4242 4242 4242`
- Falha: `4000 0000 0000 0002`
- 3D Secure: `4000 0027 6000 3184`

Data: qualquer data futura
CVC: qualquer 3 dígitos

### Testar Webhooks Localmente

Use Stripe CLI:

```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

Copie o webhook secret e adicione ao `.env.local`:

```env
STRIPE_WEBHOOK_SECRET=whsec_xxx
```

## 🐛 Troubleshooting

### "Tenant not found"

- Verifique se o tenant existe no banco
- Confirme que o subdomínio está correto
- Para desenvolvimento local, use `localhost:3000` (usa tenant "sabrina" por padrão)

### Erro de autenticação no /admin

- Verifique se fez login primeiro em `/auth/login`
- Limpe cookies e tente novamente
- Confirme que o email usado é de um tenant válido

### Stripe webhook não funciona

- **Mock Mode:** O sistema atual usa mock - webhooks não são necessários para desenvolvimento
- Para produção real:
  - Confirme que `STRIPE_WEBHOOK_SECRET` está configurado
  - Verifique se a URL do webhook está correta no Stripe Dashboard
  - Em local, use `stripe listen` CLI para testar webhooks

### Chatbot não responde

- **Vercel AI Gateway:** Se estiver usando deploy Vercel, o AI Gateway já gerencia as keys automaticamente
- Para desenvolvimento local: Verifique se `OPENAI_API_KEY` está configurado no `.env.local`
- Confirme que tem créditos na conta OpenAI (se usando chave própria)
- Veja logs em `/api/chat` para erros
- O chatbot usa GPT-4o-mini via Vercel AI SDK

## 📚 Estrutura de Arquivos

```
src/
├── app/
│   ├── (public)/          # Páginas públicas
│   ├── admin/             # Painel tenant
│   │   ├── posts/         # CRUD de posts
│   │   ├── pages/         # CRUD de páginas
│   │   └── settings/      # Configurações
│   ├── platform-admin/    # Super admin panel
│   ├── api/               # API routes
│   │   ├── chat/          # Chatbot IA
│   │   └── stripe/        # Stripe checkout e webhooks
│   └── auth/              # Autenticação
├── components/            # Componentes React
├── lib/                   # Utilitários
│   ├── supabase/          # Cliente Supabase
│   ├── auth.ts            # Helpers de autenticação
│   ├── stripe.ts          # Configuração Stripe
│   └── themes.ts          # Temas visuais
└── proxy.ts               # Middleware multi-tenant

supabase/
└── migrations/            # Migrações SQL
```

## 🔒 Segurança

### Checklist de Produção

- [ ] Todas variáveis de ambiente configuradas
- [ ] RLS policies ativas no Supabase
- [ ] Stripe webhooks configurados com secret correto
- [ ] HTTPS habilitado (automático na Vercel)
- [ ] Super admins configurados corretamente
- [ ] Logs de erro configurados (Sentry recomendado)
- [ ] Rate limiting no chat API (via Vercel)

### Boas Práticas

- Nunca commite `.env.local` ou secrets
- Rotacione API keys periodicamente
- Use Stripe em modo test até validar tudo
- Monitore logs de erro regularmente
- Backup do banco Supabase configurado

## 📞 Suporte

- Issues: [GitHub Issues](link-do-repo)
- Documentação Supabase: https://supabase.com/docs
- Documentação Stripe: https://stripe.com/docs
- Documentação Next.js: https://nextjs.org/docs

## 🎉 Próximos Passos

Após configuração básica:

1. ✅ Personalize os temas em `src/lib/themes.ts`
2. ✅ Configure domínio customizado na Vercel
3. ✅ Crie conteúdo de exemplo (posts, páginas)
4. ✅ Configure Google Analytics (opcional)
5. ✅ Implemente backup automático
6. ✅ Configure monitoring (Sentry, Vercel Analytics)

Bom trabalho! 🚀
