"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ShieldCheck, ArrowLeft, Printer, Download } from "lucide-react";
import Link from "next/link";

const checklistItems = [
  {
    category: "Canais de Atendimento",
    items: [
      { id: "c1", task: "Oferecer atendimento telefônico 24h, 7 dias por semana." },
      { id: "c2", task: "Garantir acompanhamento digital do status da solicitação (site/app)." },
      { id: "c3", task: "Implementar protocolo único para todos os canais." }
    ]
  },
  {
    category: "Prazos e Negativas",
    items: [
      { id: "p1", task: "Responder negativas de cobertura em até 48h úteis." },
      { id: "p2", task: "Fornecer fundamentação técnica e legal clara para cada negativa." },
      { id: "p3", task: "Enviar cópia da resposta por escrito (e-mail ou carta) quando solicitado." }
    ]
  },
  {
    category: "Ouvidoria e Governança",
    items: [
      { id: "o1", task: "Possuir Ouvidoria vinculada diretamente à diretoria (Segunda Instância)." },
      { id: "o2", task: "Garantir autonomia do Ouvidor para reformar decisões da operadora." },
      { id: "o3", task: "Publicar relatório anual de transparência da Ouvidoria." }
    ]
  }
];

export default function ChecklistPage() {
  const [checkedIds, setCheckedIds] = useState<string[]>([]);

  const toggle = (id: string) => {
    setCheckedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const totalItems = checklistItems.reduce((acc, cat) => acc + cat.items.length, 0);
  const progress = Math.round((checkedIds.length / totalItems) * 100);

  return (
    <div className="container mx-auto px-4 py-16 lg:px-8 max-w-4xl">
      <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8 transition-colors">
        <ArrowLeft className="h-4 w-4" /> Voltar para o Início
      </Link>

      <div className="bg-white rounded-3xl border border-border overflow-hidden shadow-sm printable-area">
        <div className="bg-primary text-primary-foreground p-12 lg:p-16">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
            <div>
              <div className="inline-flex p-3 bg-white/10 rounded-xl mb-4">
                <ShieldCheck className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-3xl lg:text-4xl font-serif font-bold">Checklist de Adequação: RN 623/2024</h1>
              <p className="text-primary-foreground/80 mt-2">Sua operação está 100% segura frente à nova regra da ANS?</p>
            </div>
            <div className="text-right">
              <div className="text-5xl font-serif font-bold">{progress}%</div>
              <div className="text-xs uppercase tracking-widest font-bold opacity-60">Status de Conformidade</div>
            </div>
          </div>
          <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-secondary transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <div className="p-12 lg:p-16 space-y-12">
          {checklistItems.map((category, idx) => (
            <div key={idx} className="space-y-6">
              <h3 className="text-xl font-serif font-bold text-primary border-b pb-2 flex items-center gap-3">
                <span className="text-sm bg-primary/5 px-2 py-0.5 rounded text-primary/60 font-sans">{idx + 1}</span>
                {category.category}
              </h3>
              <div className="grid gap-4">
                {category.items.map((item) => (
                  <div 
                    key={item.id} 
                    onClick={() => toggle(item.id)}
                    className="flex items-start gap-4 p-5 rounded-2xl border border-transparent hover:border-primary/20 hover:bg-primary/[0.02] cursor-pointer transition-all"
                  >
                    <Checkbox 
                      id={item.id} 
                      checked={checkedIds.includes(item.id)}
                      onCheckedChange={() => toggle(item.id)}
                      className="mt-1"
                    />
                    <label 
                      htmlFor={item.id} 
                      className={`text-base leading-relaxed cursor-pointer transition-colors ${checkedIds.includes(item.id) ? 'text-muted-foreground line-through' : 'text-foreground/90 font-medium'}`}
                    >
                      {item.task}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="p-10 rounded-3xl bg-muted/30 border border-border space-y-6 no-print">
            <h4 className="font-bold text-lg">Precisa de apoio na implementação?</h4>
            <p className="text-muted-foreground">
              A adequação à RN 623 vai além de marcar boxes. É necessário transformar a cultura de atendimento e governança da sua operadora.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact" className="flex-1">
                <Button className="w-full rounded-xl">Solicitar Auditoria Estratégica</Button>
              </Link>
              <Button variant="outline" onClick={() => window.print()} className="rounded-xl">
                <Printer className="mr-2 h-4 w-4" /> Imprimir Checklist
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <p className="mt-8 text-center text-sm text-muted-foreground italic no-print">
        Conteúdo elaborado por Sabrina Barros - Conselheira de Saúde Suplementar.
      </p>
    </div>
  );
}
