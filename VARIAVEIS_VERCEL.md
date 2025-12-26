# Variáveis de Ambiente Configuradas na Vercel

## ✅ Variáveis Já Configuradas

Todas as variáveis abaixo foram configuradas no projeto **executive** na Vercel para os ambientes Production, Preview e Development:

### Supabase (Configuradas via MCP - 26/12/2025)
- `NEXT_PUBLIC_SUPABASE_URL`: https://hyeifxvxifhrapfdvfry.supabase.co
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: sb_publishable_RMMpXpKBjUDFNQt9_X0aog_GzLv4jzd

### Plataforma
- `NEXT_PUBLIC_PLATFORM_DOMAIN`: executive.vercel.app (production/preview) | localhost:3000 (development)
- `NEXT_PUBLIC_APP_URL`: https://executive.vercel.app (production/preview) | http://localhost:3000 (development)

## ⚠️ Variáveis que Precisam ser Configuradas Manualmente

As seguintes variáveis do Stripe precisam ser adicionadas manualmente na Vercel através do dashboard ou CLI:

### Stripe (Requeridas)
- `STRIPE_SECRET_KEY`: Chave secreta da API do Stripe (formato: `sk_test_...` ou `sk_live_...`)
- `STRIPE_WEBHOOK_SECRET`: Secret do webhook do Stripe (formato: `whsec_...`)
- `STRIPE_PRICE_PROFESSIONAL`: ID do preço do plano Professional no Stripe (formato: `price_...`)
- `STRIPE_PRICE_ENTERPRISE`: ID do preço do plano Enterprise no Stripe (formato: `price_...`)

### Opcional
- `NEXT_PUBLIC_GA_ID`: ID do Google Analytics (formato: `G-XXXXXXXXXX`)

## Como Adicionar Variáveis do Stripe

Você pode adicionar as variáveis do Stripe de duas formas:

### Opção 1: Via Dashboard Vercel
1. Acesse https://vercel.com/nessbr-projects/executive/settings/environment-variables
2. Clique em "Add New"
3. Adicione cada variável do Stripe para os ambientes desejados (Production, Preview, Development)

### Opção 2: Via CLI
```bash
# Exemplo para STRIPE_SECRET_KEY
echo "sk_test_seu_secret_key_aqui" | vercel env add STRIPE_SECRET_KEY production
echo "sk_test_seu_secret_key_aqui" | vercel env add STRIPE_SECRET_KEY preview
echo "sk_test_seu_secret_key_aqui" | vercel env add STRIPE_SECRET_KEY development
```

Repita o processo para:
- `STRIPE_WEBHOOK_SECRET`
- `STRIPE_PRICE_PROFESSIONAL`
- `STRIPE_PRICE_ENTERPRISE`

## Verificar Variáveis Configuradas

Para listar todas as variáveis configuradas:
```bash
vercel env ls
```

Para puxar as variáveis para um arquivo local (usando .env.local):
```bash
vercel env pull .env.local
```

