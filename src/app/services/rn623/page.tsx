import { Button } from "@/components/ui/button";
import { Shield, CheckCircle, AlertTriangle, FileText, ArrowLeft } from "lucide-react";
import Link from "next/link";

const benefits = [
  "Adequação completa aos prazos da ANS",
  "Redução de NIPs e processos judiciais",
  "Melhoria na percepção de valor pelo beneficiário",
  "Transformação de conformidade em vantagem competitiva",
  "Relatórios e indicadores para governança"
];

const deliverables = [
  {
    title: "Diagnóstico de Gaps",
    description: "Mapeamento completo das lacunas atuais em relação às exigências da RN 623/2024"
  },
  {
    title: "Plano de Adequação",
    description: "Cronograma detalhado com ações prioritárias e responsáveis definidos"
  },
  {
    title: "Treinamento de Equipes",
    description: "Capacitação das áreas envolvidas nos novos processos de transparência"
  },
  {
    title: "Monitoramento Contínuo",
    description: "Dashboards e indicadores para acompanhamento da conformidade"
  }
];

export default function RN623ServicePage() {
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
          <Shield className="h-10 w-10 text-primary" />
        </div>
        <h1 className="text-4xl font-serif font-bold mb-6 sm:text-5xl">
          Gestão de Crise e Riscos
        </h1>
        <p className="text-2xl text-primary font-medium mb-6">RN 623/2024</p>
        <p className="text-xl text-muted-foreground leading-relaxed">
          A nova regulação da ANS exige transparência sem precedentes. Transformo essa obrigação em oportunidade de diferenciação e fortalecimento da relação com beneficiários.
        </p>
      </div>

      {/* What is RN 623 */}
      <section className="mb-16">
        <h2 className="text-2xl font-serif font-bold mb-6">O que é a RN 623/2024?</h2>
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-8">
          <div className="flex gap-4">
            <AlertTriangle className="h-6 w-6 text-amber-600 shrink-0 mt-1" />
            <div>
              <p className="text-foreground leading-relaxed mb-4">
                A Resolução Normativa 623 da ANS estabelece novos padrões de transparência para operadoras de saúde, incluindo prazos mais rigorosos para resposta a solicitações e comunicação clara sobre negativas de cobertura.
              </p>
              <p className="text-muted-foreground">
                Empresas que não se adequarem enfrentam riscos regulatórios, aumento de NIPs (Notificações de Intermediação Preliminar) e danos reputacionais significativos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="mb-16">
        <h2 className="text-2xl font-serif font-bold mb-8">Benefícios da Adequação</h2>
        <div className="grid gap-4">
          {benefits.map((benefit, idx) => (
            <div key={idx} className="flex items-center gap-4 p-4 rounded-xl bg-green-50 border border-green-100">
              <CheckCircle className="h-5 w-5 text-green-600 shrink-0" />
              <span className="font-medium">{benefit}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Deliverables */}
      <section className="mb-16">
        <h2 className="text-2xl font-serif font-bold mb-8">O que você recebe</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {deliverables.map((item, idx) => (
            <div key={idx} className="p-6 rounded-2xl border border-border bg-white">
              <div className="flex items-start gap-3">
                <FileText className="h-5 w-5 text-primary mt-1 shrink-0" />
                <div>
                  <h3 className="font-bold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
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
          <h2 className="text-3xl font-serif font-bold mb-4">Pronto para se adequar?</h2>
          <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
            Agende uma conversa de 30 minutos para discutir a situação atual da sua operadora e os próximos passos.
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
