import { Button } from "@/components/ui/button";
import { Shield, Users, BarChart3, TrendingUp, ArrowRight } from "lucide-react";
import Link from "next/link";

const services = [
  {
    title: "Conselheira Estratégica",
    description: "Atuação em conselhos de administração e comitês de saúde, trazendo uma visão independente e técnica para decisões críticas de governança e sustentabilidade.",
    icon: Shield,
    href: "/services/conselheira",
    benefits: [
      "Mitigação de riscos regulatórios e jurídicos",
      "Visão de longo prazo para sustentabilidade do benefício",
      "Independência nas recomendações estratégicas"
    ]
  },
  {
    title: "Mentoria Executiva",
    description: "Desenvolvimento de lideranças e apoio em transições de carreira de alto impacto no setor de saúde suplementar.",
    icon: Users,
    href: "/services/mentoria",
    benefits: [
      "Mentoria para novos gestores de saúde",
      "Plano estratégico para transição de executivos",
      "Fortalecimento de liderança baseada em dados"
    ]
  },
  {
    title: "Gestão de Crise e Riscos (RN 623)",
    description: "Implementação de processos para adequação à RN 623/2024, transformando conformidade em vantagem competitiva e transparência.",
    icon: BarChart3,
    href: "/services/rn623",
    benefits: [
      "Adequação rápida aos novos prazos da ANS",
      "Redução de NIPs e processos judiciais",
      "Melhoria na percepção de valor do beneficiário"
    ]
  },
  {
    title: "Auditoria de Valor Comportamental",
    description: "Análise profunda que cruza dados clínicos com padrões comportamentais para revelar a verdadeira causa da variação de custos.",
    icon: TrendingUp,
    href: "/services/auditoria",
    benefits: [
      "Identificação de padrões de uso pré-demissional",
      "Ajuste fino em programas de gestão de saúde",
      "Otimização real do ROI do plano de saúde"
    ]
  }
];

export default function ServicesPage() {
  return (
    <div className="container mx-auto px-4 py-20 lg:px-8">
      <div className="max-w-3xl mb-20">
        <h1 className="text-4xl font-serif font-bold mb-6 sm:text-5xl">Serviços Estratégicos</h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          Transformo dados complexos e normas regulatórias em inteligência de negócio. Meu foco é garantir que sua gestão de saúde seja sustentável, ética e baseada em valor real.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
        {services.map((service, idx) => (
          <div key={idx} className="group p-8 rounded-3xl bg-white border border-border hover:border-primary/20 hover:shadow-xl transition-all duration-300">
            <div className="mb-6 inline-flex p-4 bg-primary/5 rounded-2xl text-primary group-hover:bg-primary group-hover:text-white transition-colors">
              <service.icon className="h-8 w-8" />
            </div>
            <h3 className="text-2xl font-serif font-bold mb-4">{service.title}</h3>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              {service.description}
            </p>
            <ul className="space-y-3 mb-10">
              {service.benefits.map((benefit, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-foreground/80">
                  <span className="mt-1 w-1.5 h-1.5 rounded-full bg-primary shrink-0"></span>
                  {benefit}
                </li>
              ))}
            </ul>
            <Link href={service.href}>
              <Button variant="outline" className="w-full rounded-xl group-hover:bg-primary group-hover:text-white transition-all">
                Saiba Mais <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        ))}
      </div>

      <section className="bg-primary text-primary-foreground rounded-3xl p-12 lg:p-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
        <div className="relative z-10 text-center">
          <h2 className="text-3xl font-serif font-bold mb-6">Precisa de uma abordagem personalizada?</h2>
          <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-10">
            Cada organização possui desafios únicos. Vamos desenhar uma parceria que atenda exatamente às necessidades da sua liderança.
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
