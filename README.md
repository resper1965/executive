# Executive - Plataforma Multi-Tenant de Portais Estratégicos

[![Deploy Status](https://img.shields.io/badge/deploy-vercel-black?logo=vercel)](https://executive.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Database-green?logo=supabase)](https://supabase.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)

Plataforma SaaS multi-tenant para portais profissionais de consultores e executivos.

🔗 **Produção**: [executive.vercel.app](https://executive.vercel.app/)  
🏢 **Desenvolvido por**: [Bekaa](https://bekaa.eu)

---

## 📋 Sobre o Projeto

Plataforma white-label que permite consultores e executivos terem seu próprio portal profissional com:

- ✅ Blog com artigos estratégicos
- ✅ Páginas de serviços e eventos
- ✅ Integração com Calendly
- ✅ Temas customizáveis
- ✅ Painel administrativo

## 🛠️ Tech Stack

| Tecnologia    | Versão | Descrição                      |
| ------------- | ------ | ------------------------------ |
| Next.js       | 16     | Framework React com App Router |
| Supabase      | -      | PostgreSQL + Auth + Storage    |
| Tailwind CSS  | 4      | Estilização utilitária         |
| Vercel AI SDK | -      | Chatbot com IA                 |
| Vercel        | -      | Deploy e hosting               |

## 🚀 Desenvolvimento

```bash
# Clone o repositório
git clone https://github.com/resper1965/executive.git

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env.local
# Edite .env.local com suas credenciais Supabase

# Inicie o servidor de desenvolvimento
npm run dev

# Build de produção
npm run build
```

## 📁 Estrutura do Projeto

```
executive/
├── src/
│   ├── app/           # Páginas e rotas (App Router)
│   │   └── admin/     # Painel administrativo
│   ├── components/    # Componentes React reutilizáveis
│   ├── content/       # Artigos do blog (MDX fallback)
│   └── lib/           # Utilitários, APIs e Supabase
├── supabase/
│   └── migrations/    # SQL migrations
├── public/            # Assets estáticos
└── scripts/           # Scripts de migração
```

## 🏢 Tenants Ativos

| Tenant         | URL                          | Status   |
| -------------- | ---------------------------- | -------- |
| Sabrina Barros | sabrina.executive.vercel.app | ✅ Ativo |

## 📝 Documentação

- [CHANGELOG](./CHANGELOG.md) - Histórico de alterações
- [CONTRIBUTING](./CONTRIBUTING.md) - Como contribuir
- [LICENSE](./LICENSE) - Licença MIT

## 🚀 Deploy

O deploy é automático via Vercel ao fazer push para a branch `main`.

---

Desenvolvido com ❤️ por [Bekaa](https://bekaa.eu)
