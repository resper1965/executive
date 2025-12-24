# Guia de Contribuição

Obrigado por considerar contribuir para o portal de Sabrina Barros!

## Desenvolvimento Local

```bash
# Clone o repositório
git clone https://github.com/resper1965/site-sabrina.git

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

## Estrutura de Branches

- `main` - Branch de produção (deploy automático via Vercel)
- `develop` - Branch de desenvolvimento
- `feature/*` - Novas funcionalidades
- `fix/*` - Correções de bugs

## Convenção de Commits

Utilizamos [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` Nova funcionalidade
- `fix:` Correção de bug
- `docs:` Documentação
- `style:` Formatação (não altera código)
- `refactor:` Refatoração de código
- `chore:` Tarefas de manutenção

## Adicionando Conteúdo ao Blog

1. Crie um arquivo `.mdx` em `src/content/`
2. Use o formato de frontmatter:

```yaml
---
title: "Título do Artigo"
date: "YYYY-MM-DD"
excerpt: "Descrição breve e estratégica"
category: "Categoria"
readTime: "X min"
---
```

3. Escreva o conteúdo em Markdown

## Deploy

O deploy é automático via Vercel ao fazer push para `main`.
