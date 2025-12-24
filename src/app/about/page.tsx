import { Button } from "@/components/ui/button";
import { Award, Stethoscope, BookOpen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-20 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
        <div className="relative">
          <div className="aspect-square rounded-full overflow-hidden shadow-2xl bg-muted border-8 border-background relative">
            <Image 
              src="/sabrinabarros-perfil.png" 
              alt="Sabrina Barros" 
              fill
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-8 -right-8 bg-accent text-accent-foreground p-8 rounded-2xl shadow-xl hidden md:block">
            <p className="font-serif text-2xl font-bold italic">&ldquo;Saúde é gestão, e gestão é cuidado.&rdquo;</p>
          </div>
        </div>

        <div>
          <h1 className="text-4xl font-serif font-bold mb-6 sm:text-5xl lg:text-6xl">Sabrina Barros</h1>
          <p className="text-xl text-primary font-medium mb-8">Parceira Estratégica | Conselheira de Saúde Suplementar</p>
          
          <div className="prose prose-slate lg:prose-lg max-w-none mb-10 text-muted-foreground leading-relaxed">
            <p>
              Minha trajetória começou no consultório odontológico, onde a precisão clínica era a regra. Hoje, traduzo essa mesma precisão para o mundo corporativo da saúde suplementar, atuando como uma <strong>conselheira estratégica</strong> para organizações que buscam mais do que apenas conformidade.
            </p>
            <p>
              Com uma visão independente e estratégica, apoio lideranças na <strong>mitigação de riscos regulatórios</strong>, no desenvolvimento de projetos de alta complexidade e no posicionamento de executivos que buscam novos horizontes ou planejam sucessões seguras.
            </p>
            <p>
              Minha missão é ser a parceira que ajuda a separar o ruído do sinal, garantindo que a tomada de decisão seja sustentável, eficiente e, acima de tudo, focada no equilíbrio entre viabilidade econômica e o cuidado humano.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex gap-4 items-start">
              <div className="p-3 bg-primary/10 rounded-lg text-primary">
                <Stethoscope className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-bold mb-1">Expertise Clínica</h4>
                <p className="text-sm text-muted-foreground">Formação sólida e anos de prática em odontologia de alta performance.</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="p-3 bg-primary/10 rounded-lg text-primary">
                <Award className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-bold mb-1">Liderança Executiva</h4>
                <p className="text-sm text-muted-foreground">Experiência na gestão estratégica de operadoras de saúde suplementar.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-24">
        <div className="lg:col-span-2">
          <h2 className="text-3xl font-serif font-bold mb-8 flex items-center gap-3">
            <Award className="h-8 w-8 text-primary" /> Experiência Profissional
          </h2>
          
          <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
            
            {/* Experience Items */}
            {[
              {
                company: "BenCorp",
                role: "Relacionamento pós-vendas",
                period: "ago de 2024 - dez 2025",
                description: [
                  "Gestão estratégica de satisfação e identificação de oportunidades em clientes corporate.",
                  "Coordenação multissetorial para resolução eficaz de problemas pós-venda.",
                  "Análise de dados de interação para otimização de estratégias de retenção."
                ]
              },
              {
                company: "GALCORR",
                role: "Gerente de Relacionamento Benefícios",
                period: "2023 - 2024",
                description: [
                  "Gestão de parcerias estratégicas e fidelização através de atendimento personalizado.",
                  "Desenvolvimento de KPIs de performance e relatórios para alta administração.",
                  "Liderança de workshops técnicos para equipes de relacionamento."
                ]
              },
              {
                company: "Aon",
                role: "Gerente de Benefícios Saúde, Dental e Vida",
                period: "2022 - 2024",
                description: [
                  "Consultoria técnica em riscos e colocação de seguros de alta complexidade.",
                  "Negociação estratégica com seguradoras para otimização de custos e coberturas.",
                  "Supervisão de compliance contratual e regulamentar."
                ]
              },
              {
                company: "Itaú Unibanco",
                role: "Subject Matter Expert (SME) | Agile | Pós-vendas",
                period: "2021 - 2023",
                description: []
              },
              {
                company: "Grupo Fleury",
                role: "Gerente de Relacionamento Corporate",
                period: "2018 - 2019",
                description: []
              },
              {
                company: "Grupo Case",
                role: "Gerente Executiva de Benefícios e Seguros",
                period: "2017 - 2019",
                description: []
              },
              {
                company: "NotreDame Intermédica",
                role: "Gerente de Relacionamento Pós-vendas",
                period: "2014 - 2017",
                description: []
              },
              {
                company: "Odontoprev",
                role: "Consultora de Relacionamento Rede Credenciada",
                period: "2011 - 2013",
                description: []
              }
            ].map((exp, idx) => (
              <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-border bg-background shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                  <div className="w-3 h-3 bg-primary rounded-full"></div>
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-2xl border bg-card shadow-sm transition-all hover:shadow-md">
                  <div className="flex flex-col mb-1">
                    <time className="text-xs font-bold uppercase tracking-widest text-primary mb-1">{exp.period}</time>
                    <h3 className="text-xl font-bold">{exp.role}</h3>
                    <p className="text-muted-foreground font-medium">{exp.company}</p>
                  </div>
                  {exp.description.length > 0 && (
                    <ul className="mt-4 space-y-2 text-sm text-muted-foreground list-disc list-inside">
                      {exp.description.map((item, i) => <li key={i}>{item}</li>)}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-12">
          <div>
            <h2 className="text-2xl font-serif font-bold mb-8 flex items-center gap-3">
              <BookOpen className="h-7 w-7 text-primary" /> Formação Acadêmica
            </h2>
            <div className="space-y-8">
              {[
                {
                  school: "Insper",
                  degree: "Master of Business Administration - MBA",
                  field: "MBA Executivo em Finanças",
                  period: "2017 - 2019"
                },
                {
                  school: "Universidade Presbiteriana Mackenzie",
                  degree: "Bacharelado em Administração",
                  field: "Administração de Empresas",
                  period: "2011 - 2014"
                },
                {
                  school: "Universidade Estadual de Campinas (Unicamp)",
                  degree: "Graduação em Odontologia",
                  field: "",
                  period: "2000 - 2004"
                }
              ].map((edu, idx) => (
                <div key={idx} className="p-6 rounded-2xl border bg-muted/30">
                  <time className="text-xs font-bold uppercase tracking-widest text-primary mb-2 block">{edu.period}</time>
                  <h4 className="font-bold text-lg">{edu.school}</h4>
                  <p className="text-muted-foreground text-sm font-medium">{edu.degree}</p>
                  {edu.field && <p className="text-muted-foreground text-sm italic mt-1">{edu.field}</p>}
                </div>
              ))}
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-primary text-primary-foreground">
            <h3 className="text-xl font-bold mb-4">Competências Chave</h3>
            <div className="flex flex-wrap gap-2">
              {[
                "Gestão de Redes", "Saúde Suplementar", "ANS", "Pós-vendas", 
                "Agile", "Negociação", "Sinistralidade", "Relacionamento B2B",
                "Experiência do Cliente", "Finanças Corporativas"
              ].map(skill => (
                <span key={skill} className="px-3 py-1 bg-white/10 rounded-lg text-xs font-medium border border-white/10">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <section className="bg-muted/30 rounded-3xl p-12 lg:p-20 text-center">
        <h2 className="text-3xl font-serif font-bold mb-8">Vamos nos conectar?</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-10 text-lg">
          Estou sempre aberta a trocar experiências sobre o mercado de saúde, parcerias estratégicas e transições executivas de alto impacto.
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/contact">
            <Button size="lg" className="rounded-full px-8">Entrar em Contato</Button>
          </Link>
          <a href="https://www.linkedin.com/in/sabrina-barros/" target="_blank" rel="noopener">
            <Button size="lg" variant="outline" className="rounded-full px-8">Ver Linkedin</Button>
          </a>
        </div>
      </section>
    </div>
  );
}
