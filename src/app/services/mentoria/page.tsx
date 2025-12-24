import { Button } from "@/components/ui/button";
import { Users, CheckCircle, Target, ArrowLeft } from "lucide-react";
import Link from "next/link";

const benefits = [
  "Desenvolvimento de lideranças estratégicas em saúde",
  "Preparação para transições de carreira de alto impacto",
  "Fortalecimento de competências baseadas em dados",
  "Networking com outros executivos do setor",
  "Visão sistêmica do mercado de saúde suplementar"
];

const formats = [
  {
    title: "Sessões Individuais",
    description: "Encontros mensais focados em desafios específicos da sua jornada executiva",
    duration: "1 hora/sessão"
  },
  {
    title: "Programa de Transição",
    description: "Acompanhamento intensivo para executivos em mudança de posição ou empresa",
    duration: "3 meses"
  },
  {
    title: "Face-Out Corporativo",
    description: "Programa para empresas que desejam oferecer mentoria estruturada a executivos em desligamento, valorizando o profissional e fortalecendo a marca empregadora",
    duration: "Sob demanda"
  },
  {
    title: "Mentoria de Equipe",
    description: "Desenvolvimento conjunto de lideranças em áreas de benefícios e RH",
    duration: "Sob demanda"
  }
];

export default function MentoriaServicePage() {
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
          <Users className="h-10 w-10 text-primary" />
        </div>
        <h1 className="text-4xl font-serif font-bold mb-6 sm:text-5xl">
          Mentoria Executiva
        </h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          Desenvolvimento de lideranças e apoio em transições de carreira de alto impacto no setor de saúde suplementar. Uma parceria estratégica para acelerar seu crescimento.
        </p>
      </div>

      {/* For Who */}
      <section className="mb-16">
        <h2 className="text-2xl font-serif font-bold mb-6">Para quem é</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            "Gestores assumindo nova posição em saúde",
            "Executivos de RH ampliando escopo para benefícios",
            "Profissionais em transição para o setor",
            "Líderes buscando visão estratégica do mercado"
          ].map((item, idx) => (
            <div key={idx} className="flex items-center gap-3 p-4 rounded-xl border border-border bg-white">
              <Target className="h-5 w-5 text-primary shrink-0" />
              <span>{item}</span>
            </div>
          ))}
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

      {/* Formats */}
      <section className="mb-16">
        <h2 className="text-2xl font-serif font-bold mb-8">Formatos de Mentoria</h2>
        <div className="grid gap-6">
          {formats.map((format, idx) => (
            <div key={idx} className="p-6 rounded-2xl border border-border bg-white">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-bold text-lg">{format.title}</h3>
                <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full font-medium">
                  {format.duration}
                </span>
              </div>
              <p className="text-muted-foreground">{format.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary text-primary-foreground rounded-3xl p-12 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
        <div className="relative z-10">
          <h2 className="text-3xl font-serif font-bold mb-4">Vamos conversar?</h2>
          <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
            Agende uma conversa exploratória para entendermos seu momento e como posso contribuir.
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
