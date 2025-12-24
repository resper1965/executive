import { Button } from "@/components/ui/button";
import { Shield, CheckCircle, Briefcase, ArrowLeft } from "lucide-react";
import Link from "next/link";

const benefits = [
  "Visão independente e técnica em decisões críticas",
  "Mitigação de riscos regulatórios e jurídicos",
  "Sustentabilidade de longo prazo do benefício de saúde",
  "Governança baseada em evidências e dados",
  "Ponte entre operação e estratégia"
];

const areas = [
  {
    title: "Conselhos de Administração",
    description: "Participação em reuniões de conselho trazendo expertise de saúde suplementar"
  },
  {
    title: "Comitês de Saúde",
    description: "Apoio técnico em comitês específicos de benefícios e bem-estar corporativo"
  },
  {
    title: "Projetos Estratégicos",
    description: "Consultoria em projetos de transformação ou renegociação de contratos"
  },
  {
    title: "Due Diligence",
    description: "Análise de operações de saúde em processos de M&A ou reestruturação"
  }
];

export default function ConselheiraServicePage() {
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
          Conselheira Estratégica
        </h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          Atuação em conselhos de administração e comitês de saúde, trazendo uma visão independente e técnica para decisões críticas de governança e sustentabilidade.
        </p>
      </div>

      {/* My Role */}
      <section className="mb-16">
        <h2 className="text-2xl font-serif font-bold mb-6">Meu papel</h2>
        <div className="bg-muted/30 rounded-2xl p-8 border border-border">
          <p className="text-lg leading-relaxed mb-4">
            Como conselheira, trago mais de 20 anos de experiência na intersecção entre saúde, gestão e regulação. Minha atuação é focada em:
          </p>
          <ul className="space-y-3 text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0"></span>
              Traduzir complexidades regulatórias em insights acionáveis
            </li>
            <li className="flex items-start gap-2">
              <span className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0"></span>
              Identificar riscos antes que se tornem crises
            </li>
            <li className="flex items-start gap-2">
              <span className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0"></span>
              Garantir que decisões de saúde estejam alinhadas à estratégia de negócio
            </li>
          </ul>
        </div>
      </section>

      {/* Benefits */}
      <section className="mb-16">
        <h2 className="text-2xl font-serif font-bold mb-8">Benefícios</h2>
        <div className="grid gap-4">
          {benefits.map((benefit, idx) => (
            <div key={idx} className="flex items-center gap-4 p-4 rounded-xl bg-green-50 border border-green-100">
              <CheckCircle className="h-5 w-5 text-green-600 shrink-0" />
              <span className="font-medium">{benefit}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Areas */}
      <section className="mb-16">
        <h2 className="text-2xl font-serif font-bold mb-8">Áreas de Atuação</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {areas.map((area, idx) => (
            <div key={idx} className="p-6 rounded-2xl border border-border bg-white">
              <div className="flex items-start gap-3">
                <Briefcase className="h-5 w-5 text-primary mt-1 shrink-0" />
                <div>
                  <h3 className="font-bold mb-2">{area.title}</h3>
                  <p className="text-sm text-muted-foreground">{area.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Job-Specific */}
      <section className="mb-16">
        <h2 className="text-2xl font-serif font-bold mb-6">Contratação por Tema</h2>
        <div className="bg-primary/5 rounded-2xl p-8 border border-primary/10">
          <p className="text-lg leading-relaxed mb-4">
            Nem sempre é necessária uma atuação contínua. Você pode me contratar para <strong>projetos específicos</strong> ou <strong>temas pontuais</strong> que demandem suporte técnico especializado:
          </p>
          <ul className="space-y-3 text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0"></span>
              Análise de uma renegociação de contrato específica
            </li>
            <li className="flex items-start gap-2">
              <span className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0"></span>
              Parecer técnico para uma decisão de conselho
            </li>
            <li className="flex items-start gap-2">
              <span className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0"></span>
              Segunda opinião sobre estratégia de benefícios
            </li>
            <li className="flex items-start gap-2">
              <span className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0"></span>
              Suporte em apresentações para stakeholders
            </li>
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary text-primary-foreground rounded-3xl p-12 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
        <div className="relative z-10">
          <h2 className="text-3xl font-serif font-bold mb-4">Precisa de visão estratégica?</h2>
          <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
            Vamos conversar sobre como posso contribuir para a governança da sua organização.
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
