import { Button } from "@/components/ui/button";
import { Award, Stethoscope } from "lucide-react";
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
          <p className="text-xl text-primary font-medium mb-8">Dentista | Executiva de Saúde Suplementar | Especialista em Gestão de Redes</p>
          
          <div className="prose prose-slate lg:prose-lg max-w-none mb-10 text-muted-foreground leading-relaxed">
            <p>
              Minha trajetória começou no consultório odontológico, onde aprendi que a saúde bucal é a porta de entrada para o bem-estar sistêmico. No entanto, minha curiosidade sobre o &ldquo;como&rdquo; as coisas funcionam me levou dos atendimentos clínicos para as grandes mesas de decisão da saúde suplementar brasileira.
            </p>
            <p>
              Hoje, atuo como executiva líder, unindo o olhar técnico da odontologia com a visão estratégica necessária para gerir redes credenciadas, otimizar processos e garantir que a jornada do beneficiário seja sempre pautada pela excelência e pela regulação (ANS).
            </p>
            <p>
              Este blog é o meu espaço para compartilhar o que aprendo todos os dias nessa intersecção fascinante entre a ciência da saúde e a arte da gestão.
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

      <section className="bg-muted/30 rounded-3xl p-12 lg:p-20 text-center">
        <h2 className="text-3xl font-serif font-bold mb-8">Vamos nos conectar?</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-10 text-lg">
          Estou sempre aberta a trocar experiências sobre o mercado de saúde, liderança servidora e tendências em gestão hospitalar e odontológica.
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
