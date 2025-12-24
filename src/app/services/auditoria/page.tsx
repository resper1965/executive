import { Button } from "@/components/ui/button";
import { TrendingUp, CheckCircle, BarChart3, ArrowLeft } from "lucide-react";
import Link from "next/link";

const benefits = [
  "Identificação de padrões ocultos de uso do plano",
  "Detecção de comportamentos pré-demissão",
  "Ajuste fino em programas de gestão de saúde",
  "Otimização real do ROI do benefício",
  "Base de dados para negociação com operadoras"
];

const insights = [
  {
    title: "Análise de Sazonalidade",
    description: "Identificação de picos de utilização e suas causas comportamentais"
  },
  {
    title: "Perfil de Risco por Área",
    description: "Mapeamento de áreas com maior sinistralidade e fatores contribuintes"
  },
  {
    title: "Correlação Turnover x Custo",
    description: "Análise do impacto de desligamentos no aumento de custos de saúde"
  },
  {
    title: "Efetividade de Programas",
    description: "Mensuração real do impacto de ações preventivas e de bem-estar"
  }
];

export default function AuditoriaServicePage() {
  return (
    <div className="container mx-auto px-4 py-20 lg:px-8 max-w-4xl">
      <Link href="/services">
        <Button variant="ghost" size="sm" className="mb-8 gap-2 -ml-4">
          <ArrowLeft className="h-4 w-4" /> Voltar aos Serviços
        </Button>
      </Link>

      {/* Header */}
      <div className="mb-16">
        <div className="inline-flex p-4 bg-primary/5 rounded-2xl mb-6">
          <TrendingUp className="h-10 w-10 text-primary" />
        </div>
        <h1 className="text-4xl font-serif font-bold mb-6 sm:text-5xl">
          Auditoria de Valor Comportamental
        </h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          Análise profunda que cruza dados clínicos com padrões comportamentais para revelar a verdadeira causa da variação de custos em saúde.
        </p>
      </div>

      {/* The Problem */}
      <section className="mb-16">
        <h2 className="text-2xl font-serif font-bold mb-6">O problema que resolvo</h2>
        <div className="bg-muted/30 rounded-2xl p-8 border border-border">
          <p className="text-lg leading-relaxed mb-4">
            A maioria das empresas analisa sinistralidade olhando apenas para dados clínicos. Mas a verdadeira causa da variação de custos muitas vezes está no comportamento:
          </p>
          <ul className="space-y-3 text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="w-2 h-2 bg-amber-500 rounded-full mt-2 shrink-0"></span>
              Funcionários que aumentam uso antes de pedir demissão
            </li>
            <li className="flex items-start gap-2">
              <span className="w-2 h-2 bg-amber-500 rounded-full mt-2 shrink-0"></span>
              Áreas com cultura de uso inadequado do benefício
            </li>
            <li className="flex items-start gap-2">
              <span className="w-2 h-2 bg-amber-500 rounded-full mt-2 shrink-0"></span>
              Programas de bem-estar sem impacto mensurável
            </li>
          </ul>
        </div>
      </section>

      {/* Benefits */}
      <section className="mb-16">
        <h2 className="text-2xl font-serif font-bold mb-8">O que você ganha</h2>
        <div className="grid gap-4">
          {benefits.map((benefit, idx) => (
            <div key={idx} className="flex items-center gap-4 p-4 rounded-xl bg-green-50 border border-green-100">
              <CheckCircle className="h-5 w-5 text-green-600 shrink-0" />
              <span className="font-medium">{benefit}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Insights */}
      <section className="mb-16">
        <h2 className="text-2xl font-serif font-bold mb-8">Tipos de Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {insights.map((insight, idx) => (
            <div key={idx} className="p-6 rounded-2xl border border-border bg-white">
              <div className="flex items-start gap-3">
                <BarChart3 className="h-5 w-5 text-primary mt-1 shrink-0" />
                <div>
                  <h3 className="font-bold mb-2">{insight.title}</h3>
                  <p className="text-sm text-muted-foreground">{insight.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary text-primary-foreground rounded-3xl p-12 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
        <div className="relative z-10">
          <h2 className="text-3xl font-serif font-bold mb-4">Quer entender seus custos de verdade?</h2>
          <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
            Agende uma conversa para discutir como a análise comportamental pode transformar sua gestão de saúde.
          </p>
          <a 
            href="https://calendly.com/sabrina-barros/30min" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <Button size="lg" variant="secondary" className="rounded-full px-10 py-7 font-bold text-lg">
              Agendar Reunião
            </Button>
          </a>
        </div>
      </section>
    </div>
  );
}
