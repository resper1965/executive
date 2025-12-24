import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users, ExternalLink, Mic2 } from "lucide-react";
import Link from "next/link";

const upcomingEvents = [
  {
    title: "Disponível para Palestras e Painéis",
    description: "Entre em contato para discutir participação em eventos corporativos, congressos e workshops sobre saúde suplementar.",
    type: "Convite Aberto",
    isPlaceholder: true
  }
];

const pastEvents = [
  {
    title: "Gestão Estratégica de Benefícios",
    description: "Palestras em congressos do setor sobre como alinhar benefícios de saúde à estratégia corporativa.",
    type: "Palestra"
  },
  {
    title: "RN 623 e Transparência Regulatória",
    description: "Participações em fóruns e painéis discutindo os impactos da nova regulação ANS.",
    type: "Painel"
  },
  {
    title: "Sinistralidade Comportamental",
    description: "Workshops corporativos focados em análise de padrões e redução de custos em saúde.",
    type: "Workshop"
  }
];

export default function EventsPage() {
  return (
    <div className="container mx-auto px-4 py-20 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex p-3 bg-primary/5 rounded-2xl mb-6">
            <Mic2 className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl font-serif font-bold mb-6 sm:text-5xl">Palestras & Eventos</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Compartilho insights sobre gestão de saúde suplementar, regulação e inovação em eventos corporativos e congressos do setor.
          </p>
        </div>

        {/* Upcoming Events */}
        <section className="mb-20">
          <h2 className="text-2xl font-serif font-bold mb-8 flex items-center gap-3">
            <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
            Próximos Eventos
          </h2>
          
          {upcomingEvents.map((event, idx) => (
            <div key={idx} className={`p-8 rounded-3xl border ${event.isPlaceholder ? 'border-dashed border-primary/30 bg-primary/[0.02]' : 'border-border bg-white'}`}>
              <div className="flex flex-col md:flex-row justify-between items-start gap-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-primary mb-2 block">{event.type}</span>
                  <h3 className="text-2xl font-serif font-bold mb-3">{event.title}</h3>
                  <p className="text-muted-foreground">{event.description}</p>
                </div>
                <Link href="/contact">
                  <Button className="rounded-full whitespace-nowrap">
                    Entrar em Contato
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </section>

        {/* Suggested Topics */}
        <section className="mb-20">
          <h2 className="text-2xl font-serif font-bold mb-8">Temas Sugeridos para Palestras</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                title: "RN 623/2024: Da Conformidade à Vantagem Competitiva",
                description: "Como transformar a nova regulação da ANS em diferencial de mercado"
              },
              {
                title: "Sinistralidade Comportamental",
                description: "A análise de padrões que revela a verdadeira causa dos custos em saúde"
              },
              {
                title: "O Executivo e o Plano de Saúde",
                description: "Por que líderes precisam entender de gestão de benefícios"
              },
              {
                title: "Do Operacional ao Estratégico em RH",
                description: "Posicionando a área de benefícios como pilar de retenção de talentos"
              },
              {
                title: "Governança em Saúde Suplementar",
                description: "Estruturando conselhos e comitês para decisões baseadas em evidências"
              },
              {
                title: "Telemedicina e o Futuro do Cuidado",
                description: "Impactos regulatórios e oportunidades para operadoras e empresas"
              }
            ].map((topic, idx) => (
              <div key={idx} className="p-5 rounded-2xl border border-border bg-white hover:border-primary/30 transition-colors">
                <h3 className="font-bold mb-2">{topic.title}</h3>
                <p className="text-sm text-muted-foreground">{topic.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Past Events */}
        <section>
          <h2 className="text-2xl font-serif font-bold mb-8">Participações Anteriores</h2>
          
          <div className="grid gap-6">
            {pastEvents.map((event, idx) => (
              <div key={idx} className="p-6 rounded-2xl border border-border bg-white hover:shadow-lg transition-shadow group">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-bold uppercase tracking-widest text-primary/60">{event.type}</span>
                </div>
                <h3 className="text-xl font-serif font-bold mb-2 group-hover:text-primary transition-colors">{event.title}</h3>
                <p className="text-muted-foreground text-sm">{event.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mt-20 bg-primary text-primary-foreground rounded-3xl p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
          <div className="relative z-10">
            <h2 className="text-3xl font-serif font-bold mb-4">Quer me convidar para um evento?</h2>
            <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
              Palestras, painéis, workshops e mentorias corporativas sobre saúde suplementar e gestão estratégica.
            </p>
            <Link href="/contact">
              <Button size="lg" variant="secondary" className="rounded-full px-10 font-bold">
                Enviar Proposta
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
