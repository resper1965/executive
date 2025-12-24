---
description: Prompt agnóstico para criação de Portal Corporativo B2B para Consultores e Executivos
---

# 🏢 PROMPT: Portal Corporativo B2B para Consultor/Executivo

## CONTEXTO PARA A IA

Você é um desenvolvedor web especialista em criar portais corporativos B2B de alta conversão. Seu objetivo é desenvolver um site profissional que posicione o cliente como autoridade máxima em seu nicho de atuação.

---

## INFORMAÇÕES DO PROFISSIONAL

> **PREENCHA OS CAMPOS ABAIXO COM OS DADOS DO CLIENTE:**

```yaml
nome_completo: "[NOME COMPLETO DO PROFISSIONAL]"
titulo_principal: "[Ex: Conselheiro Estratégico | Mentor Executivo | Consultor de Governança]"
area_especialidade: "[Ex: Saúde Suplementar, Finanças Corporativas, Tecnologia, ESG]"
proposta_valor: "[Frase única que resume o diferencial - máx 20 palavras]"
anos_experiencia: "[Número]"
linkedin: "[URL]"
email_profissional: "[email]"
telefone_whatsapp: "[com DDI]"
calendly_url: "[URL para agendamento]"
foto_profissional: "[caminho/URL da foto de alta qualidade]"
logo: "[caminho/URL do logo, se houver]"
```

---

## SERVIÇOS OFERECIDOS

> **Liste de 3 a 5 serviços principais:**

```yaml
servicos:
  - nome: "[Nome do Serviço 1]"
    descricao: "[Descrição em 2-3 linhas]"
    beneficios:
      - "[Benefício 1]"
      - "[Benefício 2]"
      - "[Benefício 3]"

  - nome: "[Nome do Serviço 2]"
    descricao: "[Descrição em 2-3 linhas]"
    beneficios:
      - "[Benefício 1]"
      - "[Benefício 2]"
      - "[Benefício 3]"

  - nome: "[Nome do Serviço 3]"
    descricao: "[Descrição em 2-3 linhas]"
    beneficios:
      - "[Benefício 1]"
      - "[Benefício 2]"
      - "[Benefício 3]"
```

---

## CREDENCIAIS E AUTORIDADE

```yaml
formacao:
  - "[Graduação - Instituição]"
  - "[MBA/Pós - Instituição]"
  - "[Certificações relevantes]"

cargos_anteriores:
  - titulo: "[Cargo]"
    empresa: "[Empresa]"
    periodo: "[Ano - Ano]"

conselhos_boards:
  - "[Nome do Conselho/Board - Função]"

publicacoes_midia:
  - "[Artigo/Entrevista - Veículo]"

premios_reconhecimentos:
  - "[Prêmio - Ano]"
```

---

## TEMAS PARA PALESTRAS/EVENTOS

```yaml
palestras:
  - titulo: "[Título da Palestra 1]"
    descricao: "[Breve descrição do conteúdo]"

  - titulo: "[Título da Palestra 2]"
    descricao: "[Breve descrição do conteúdo]"
```

---

## PÚBLICO-ALVO

```yaml
publico_primario: "[Ex: CEOs, CFOs, Diretores de RH de empresas com +500 funcionários]"
publico_secundario: "[Ex: Conselhos de Administração, Investidores, Family Offices]"
publico_terciario: "[Ex: Gestores de áreas específicas, Associações de classe]"
```

---

## REQUISITOS TÉCNICOS

### Stack Obrigatória

- **Framework**: Next.js 14+ (App Router)
- **Styling**: Tailwind CSS + shadcn/ui
- **Hospedagem**: Vercel (SSL automático)
- **Agendamento**: Calendly integrado
- **Analytics**: Google Analytics 4 + Hotjar (opcional)

### Páginas Obrigatórias

1. **Home** - Hero com proposta de valor + credenciais resumidas + CTA
2. **Sobre** - Biografia executiva + timeline de carreira + foto profissional
3. **Serviços** - Cards detalhados com benefícios + CTA individual
4. **Serviço Individual** - Landing page dedicada por serviço (SEO)
5. **Palestras & Eventos** - Temas disponíveis + formulário de convite
6. **Contato** - Formulário + Calendly embed + dados de contato

### SEO Obrigatório

- Meta tags otimizadas por página
- Open Graph para compartilhamento social
- Schema.org markup (Person + ProfessionalService)
- Sitemap.xml dinâmico
- Robots.txt configurado

---

## DIRETRIZES DE DESIGN

### Tom Visual

- **Cores**: Palette sóbria e executiva (navy, grafite, dourado/bronze discreto)
- **Tipografia**: Serifada para títulos (autoridade), sans-serif premium para corpo
- **Espaçamento**: Generoso, clean, respirável
- **Imagens**: Alta qualidade, profissionais, sem stock genérico

### Princípios UX

- Mobile-first (executivos acessam via celular)
- Carregamento < 3s (Core Web Vitals)
- CTAs claros e sem atrito
- Hierarquia visual que guia para conversão
- Zero distrações - foco na credibilidade

### Conversão

- CTA principal: **Agendar Reunião (Calendly)**
- CTA secundário: **WhatsApp direto**
- Fluxo: Credibilidade → Confiança → Ação
- Máximo 2 cliques até o agendamento

---

## TOM DE VOZ

```yaml
tom_comunicacao: "[Escolha: Formal Executivo | Técnico Acessível | Consultivo Premium]"
tratamento: "[Escolha: Primeira pessoa (Eu) | Terceira pessoa (Ela/Ele)]"
linguagem_principal: "Português (pt-BR)"
idiomas_secundarios: "[Ex: Inglês, Espanhol - para internacionalização]"
```

### Exemplos de Tom:

- **NÃO**: "Oferecemos serviços de consultoria..."
- **SIM**: "Transformo complexidade regulatória em vantagem competitiva."
- **NÃO**: "Entre em contato conosco..."
- **SIM**: "Vamos conversar sobre sua operação."

---

## CHECKLIST DE ENTREGA

- [ ] Domínio configurado com SSL ativo
- [ ] Todas as páginas responsivas e testadas
- [ ] Formulário de contato funcionando
- [ ] Calendly integrado e testado
- [ ] Meta tags e Open Graph configurados
- [ ] Google Analytics instalado
- [ ] Favicon e Web App Manifest
- [ ] Sitemap.xml gerado
- [ ] Performance > 90 no Lighthouse
- [ ] Textos revisados sem erros

---

## INSTRUÇÕES PARA A IA

1. **Solicite** as informações acima antes de iniciar
2. **Crie** a estrutura de pastas seguindo o padrão Next.js App Router
3. **Desenvolva** componentes reutilizáveis (Header, Footer, CTASection, ServiceCard)
4. **Implemente** design system com variáveis CSS para fácil customização
5. **Otimize** para SEO desde o início
6. **Teste** responsividade em todos os breakpoints
7. **Documente** como trocar cores, fontes e conteúdo

---

## EXEMPLO DE COMANDO INICIAL

```
Crie um portal corporativo B2B para [NOME], [TÍTULO].

Especialidade: [ÁREA]
Proposta de valor: [FRASE]

Serviços:
1. [SERVIÇO 1]
2. [SERVIÇO 2]
3. [SERVIÇO 3]

Público-alvo: [PÚBLICO]
Calendly: [URL]

Use Next.js 14, Tailwind, shadcn/ui. Design premium, executivo,
alta conversão. Foco em credibilidade e agendamento direto.
```

---

_Prompt criado em: Dezembro 2024_
_Baseado no case: Portal B2B Sabrina Barros (sabrinabarros.com)_
