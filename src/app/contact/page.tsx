import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Linkedin, Mail } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-20 lg:px-8 max-w-6xl">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-serif font-bold mb-6 sm:text-5xl">Contato</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Tem alguma dúvida, proposta de consultoria ou convite para palestras? Deixe sua mensagem abaixo.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <Card className="border-none shadow-xl">
            <CardContent className="p-8 sm:p-12">
              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Nome Completo</label>
                    <Input placeholder="Seu nome" className="rounded-xl border-muted h-12" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium uppercase tracking-wider text-muted-foreground">E-mail Profissional</label>
                    <Input type="email" placeholder="seu@email.com" className="rounded-xl border-muted h-12" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Assunto</label>
                  <Input placeholder="Como posso ajudar?" className="rounded-xl border-muted h-12" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Mensagem</label>
                  <textarea 
                    className="w-full min-h-[150px] rounded-xl border border-muted bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Escreva sua mensagem aqui..."
                  ></textarea>
                </div>
                <Button className="w-full h-12 rounded-xl text-lg font-medium tracking-wide">Enviar Mensagem</Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          <div className="bg-primary/5 rounded-2xl p-8 border border-primary/10">
            <h3 className="text-xl font-serif font-bold mb-6">Informações de Contato</h3>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="text-primary"><Mail className="h-5 w-5" /></div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground font-bold">E-mail</p>
                  <p className="text-sm font-medium">contato@sabrinabarros.com</p>
                </div>
              </div>
              <a href="https://www.linkedin.com/in/sabrina-barros/" target="_blank" rel="noopener" className="flex gap-4 group">
                <div className="text-primary group-hover:scale-110 transition-transform"><Linkedin className="h-5 w-5" /></div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground font-bold">Linkedin</p>
                  <p className="text-sm font-medium group-hover:text-primary transition-colors">linkedin.com/in/sabrina-barros</p>
                </div>
              </a>
            </div>
          </div>
          
          <div className="p-8 border border-muted rounded-2xl">
            <h4 className="font-bold mb-4">Newsletter Semanal</h4>
            <p className="text-sm text-muted-foreground mb-4">Receba insights exclusivos sobre saúde suplementar diretamente na sua caixa de entrada.</p>
            <Input placeholder="Seu e-mail" className="rounded-xl mb-3" />
            <Button size="sm" variant="outline" className="w-full rounded-xl">Assinar</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
