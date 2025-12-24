import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Linkedin, Mail, Calendar, MessageCircle } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-20 lg:px-8 max-w-5xl">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-serif font-bold mb-6 sm:text-5xl">Vamos Conversar?</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Escolha a melhor forma de entrar em contato.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Option 1: Calendly for Meetings */}
        <div className="bg-primary text-primary-foreground rounded-3xl p-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -mr-24 -mt-24 blur-3xl"></div>
          <div className="relative z-10">
            <div className="inline-flex p-3 bg-white/10 rounded-xl mb-6">
              <Calendar className="h-8 w-8" />
            </div>
            <h2 className="text-2xl font-serif font-bold mb-3">Agendar Reunião</h2>
            <p className="text-primary-foreground/80 mb-6 text-sm">
              Conversa de 30 minutos para discutir consultoria, mentoria ou projetos estratégicos.
            </p>
            <a 
              href="https://calendly.com/sabrina-barros/30min" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Button variant="secondary" className="w-full rounded-xl font-bold">
                Escolher Horário
              </Button>
            </a>
          </div>
        </div>

        {/* Option 2: Message Form */}
        <div className="border border-border rounded-3xl p-10 bg-white">
          <div className="inline-flex p-3 bg-primary/5 rounded-xl mb-6 text-primary">
            <MessageCircle className="h-8 w-8" />
          </div>
          <h2 className="text-2xl font-serif font-bold mb-3">Enviar Mensagem</h2>
          <p className="text-muted-foreground mb-6 text-sm">
            Perguntas, propostas ou apenas dizer olá. Respondo em até 48h.
          </p>
          
          <form 
            action="https://formspree.io/f/xzzdpqkv" 
            method="POST"
            className="space-y-4"
          >
            <Input 
              type="text" 
              name="name" 
              placeholder="Seu nome" 
              required
              className="rounded-xl h-11"
            />
            <Input 
              type="email" 
              name="email" 
              placeholder="seu@email.com" 
              required
              className="rounded-xl h-11"
            />
            <textarea 
              name="message"
              placeholder="Sua mensagem..."
              required
              className="w-full min-h-[100px] rounded-xl border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            ></textarea>
            <Button type="submit" className="w-full rounded-xl font-bold">
              Enviar Mensagem
            </Button>
          </form>
        </div>
      </div>

      {/* Secondary Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <a 
          href="https://www.linkedin.com/in/sabrina-barros/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="group p-6 rounded-2xl border border-border bg-white hover:border-primary/30 hover:shadow-lg transition-all flex items-center gap-4"
        >
          <div className="p-2 bg-primary/5 rounded-lg text-primary group-hover:bg-primary group-hover:text-white transition-colors">
            <Linkedin className="h-5 w-5" />
          </div>
          <div>
            <p className="font-bold group-hover:text-primary transition-colors">LinkedIn</p>
            <p className="text-sm text-muted-foreground">Conecte-se comigo</p>
          </div>
        </a>

        <a 
          href="mailto:contato@sabrinabarros.com"
          className="group p-6 rounded-2xl border border-border bg-white hover:border-primary/30 hover:shadow-lg transition-all flex items-center gap-4"
        >
          <div className="p-2 bg-primary/5 rounded-lg text-primary group-hover:bg-primary group-hover:text-white transition-colors">
            <Mail className="h-5 w-5" />
          </div>
          <div>
            <p className="font-bold group-hover:text-primary transition-colors">E-mail Direto</p>
            <p className="text-sm text-muted-foreground">contato@sabrinabarros.com</p>
          </div>
        </a>
      </div>
    </div>
  );
}
