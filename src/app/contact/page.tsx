import { Button } from "@/components/ui/button";
import { Linkedin, Mail, Calendar, MessageCircle } from "lucide-react";
import Link from "next/link";

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-20 lg:px-8 max-w-4xl">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-serif font-bold mb-6 sm:text-5xl">Vamos Conversar?</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Agende uma conversa de 30 minutos para discutir como posso ajudar sua organização.
        </p>
      </div>

      {/* Main CTA - Calendly */}
      <div className="bg-primary text-primary-foreground rounded-3xl p-12 text-center mb-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
        <div className="relative z-10">
          <div className="inline-flex p-4 bg-white/10 rounded-2xl mb-6">
            <Calendar className="h-10 w-10" />
          </div>
          <h2 className="text-3xl font-serif font-bold mb-4">Agende uma Reunião</h2>
          <p className="text-primary-foreground/80 mb-8 max-w-lg mx-auto">
            Escolha o melhor horário na minha agenda. Conversa rápida de 30 minutos para entender suas necessidades.
          </p>
          <a 
            href="https://calendly.com/sabrina-barros/30min" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <Button size="lg" variant="secondary" className="rounded-full px-12 py-7 font-bold text-lg">
              Agendar Agora
            </Button>
          </a>
        </div>
      </div>

      {/* Secondary Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* LinkedIn */}
        <a 
          href="https://www.linkedin.com/in/sabrina-barros/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="group p-8 rounded-2xl border border-border bg-white hover:border-primary/30 hover:shadow-xl transition-all"
        >
          <div className="flex items-start gap-4">
            <div className="p-3 bg-primary/5 rounded-xl text-primary group-hover:bg-primary group-hover:text-white transition-colors">
              <Linkedin className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-xl font-serif font-bold mb-2 group-hover:text-primary transition-colors">
                Conecte no LinkedIn
              </h3>
              <p className="text-muted-foreground text-sm">
                Acompanhe insights sobre saúde suplementar e gestão estratégica.
              </p>
            </div>
          </div>
        </a>

        {/* Email */}
        <a 
          href="mailto:contato@sabrinabarros.com"
          className="group p-8 rounded-2xl border border-border bg-white hover:border-primary/30 hover:shadow-xl transition-all"
        >
          <div className="flex items-start gap-4">
            <div className="p-3 bg-primary/5 rounded-xl text-primary group-hover:bg-primary group-hover:text-white transition-colors">
              <Mail className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-xl font-serif font-bold mb-2 group-hover:text-primary transition-colors">
                Envie um E-mail
              </h3>
              <p className="text-muted-foreground text-sm">
                contato@sabrinabarros.com
              </p>
            </div>
          </div>
        </a>
      </div>

      {/* Quick Links */}
      <div className="mt-16 text-center">
        <p className="text-sm text-muted-foreground mb-4">Ou explore mais sobre meu trabalho:</p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/services">
            <Button variant="outline" className="rounded-full">Serviços</Button>
          </Link>
          <Link href="/blog">
            <Button variant="outline" className="rounded-full">Blog</Button>
          </Link>
          <Link href="/about">
            <Button variant="outline" className="rounded-full">Sobre Mim</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
