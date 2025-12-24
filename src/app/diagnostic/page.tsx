"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, AlertCircle, RefreshCcw } from "lucide-react";
import Link from "next/link";

const questions = [
  {
    id: 1,
    question: "Como sua empresa reage quando a sinistralidade sobe inesperadamente?",
    options: [
      { text: "Corta investimentos e exige reduções imediatas da operadora.", score: 1 },
      { text: "Busca implementar programas genéricos de saúde (APS, crônicos).", score: 2 },
      { text: "Analisa se o aumento é clínico ou comportamental antes de agir.", score: 4 }
    ]
  },
  {
    id: 2,
    question: "Qual o nível de transparência da sua operação em relação à RN 623?",
    options: [
      { text: "Apenas cumprimos o básico para evitar multas.", score: 1 },
      { text: "Temos processos, mas o beneficiário ainda tem muitas dúvidas.", score: 2 },
      { text: "A transparência é usada como ferramenta de redução de conflitos.", score: 4 }
    ]
  },
  {
    id: 3,
    question: "Sua liderança recebe dados de saúde que auxiliam na tomada de decisão de negócio?",
    options: [
      { text: "Não, os dados ficam restritos ao RH ou corretora.", score: 1 },
      { text: "Recebemos relatórios, mas é difícil extrair inteligência deles.", score: 2 },
      { text: "Sim, os indicadores de saúde guiam as decisões estratégicas.", score: 4 }
    ]
  },
  {
    id: 4,
    question: "Existe um plano de sucessão ou desenvolvimento para gestores de benefícios?",
    options: [
      { text: "Não, aprendemos na prática quando alguém sai.", score: 1 },
      { text: "Temos treinamentos pontuais oferecidos por parceiros.", score: 2 },
      { text: "Sim, investimos em mentoria e formação estratégica de lideranças.", score: 4 }
    ]
  },
  {
    id: 5,
    question: "Como você avalia a rede credenciada atual do seu plano?",
    options: [
      { text: "Focamos apenas em custo e abrangência geográfica.", score: 1 },
      { text: "Tentamos equilibrar qualidade, mas a gestão é difícil.", score: 2 },
      { text: "Gerimos por valor e parceria real com os prestadores.", score: 4 }
    ]
  }
];

export default function DiagnosticPage() {
  const [step, setStep] = useState(0); // 0: Intro, 1-5: Questions, 6: Result
  const [answers, setAnswers] = useState<number[]>([]);

  const handleStart = () => setStep(1);
  const handleAnswer = (score: number) => {
    const newAnswers = [...answers, score];
    setAnswers(newAnswers);
    if (step < questions.length) {
      setStep(step + 1);
    } else {
      setStep(questions.length + 1);
    }
  };

  const reset = () => {
    setStep(0);
    setAnswers([]);
  };

  const totalScore = answers.reduce((a, b) => a + b, 0);
  const maxScore = questions.length * 4;
  const percentage = (totalScore / maxScore) * 100;

  const getResult = () => {
    if (percentage < 40) return {
      title: "Gestão Reativa",
      message: "Sua operação está focada em 'apagar incêndios'. O risco de custos descontrolados e judicialização é alto.",
      recommendation: "Você precisa urgentemente de uma auditoria de valor e adequação regulatória profunda."
    };
    if (percentage < 75) return {
      title: "Gestão em Transição",
      message: "Você já possui processos, mas ainda falta integrar a visão comportamental para obter resultados sustentáveis.",
      recommendation: "Uma consultoria estratégica pode ajudar a virar a chave da conformidade para a eficiência."
    };
    return {
      title: "Gestão Estratégica",
      message: "Parabéns! Sua visão está alinhada com as melhores práticas de governança e valor em saúde.",
      recommendation: "O desafio agora é manter a inovação e o desenvolvimento contínuo das suas lideranças."
    };
  };

  const result = getResult();

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-20 px-4">
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl border border-border overflow-hidden">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div 
              key="intro"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="p-12 text-center"
            >
              <div className="inline-block p-4 bg-primary/5 rounded-2xl text-primary mb-6">
                <CheckCircle2 className="h-10 w-10" />
              </div>
              <h1 className="text-3xl font-serif font-bold mb-4">Sua Gestão de Saúde é Reativa ou Estratégica?</h1>
              <p className="text-muted-foreground mb-10 text-lg">
                Responda 5 perguntas rápidas e descubra o nível de maturidade da sua governança em saúde suplementar.
              </p>
              <Button onClick={handleStart} size="lg" className="rounded-full px-10 py-7 text-lg font-bold w-full sm:w-auto">
                Começar Diagnóstico <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          )}

          {step > 0 && step <= questions.length && (
            <motion.div 
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-12"
            >
              <div className="flex justify-between items-center mb-8">
                <span className="text-xs font-bold uppercase tracking-widest text-primary/60">Pergunta {step} de {questions.length}</span>
                <div className="h-1.5 w-32 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary transition-all duration-500" 
                    style={{ width: `${(step / questions.length) * 100}%` }}
                  />
                </div>
              </div>
              <h2 className="text-2xl font-serif font-bold mb-8">{questions[step - 1].question}</h2>
              <div className="space-y-4">
                {questions[step - 1].options.map((option, i) => (
                  <button
                    key={i}
                    onClick={() => handleAnswer(option.score)}
                    className="w-full text-left p-6 rounded-2xl border border-border hover:border-primary hover:bg-primary/5 transition-all group flex justify-between items-center"
                  >
                    <span className="text-foreground/80 font-medium group-hover:text-primary">{option.text}</span>
                    <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-all text-primary" />
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step > questions.length && (
            <motion.div 
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-12 text-center"
            >
              <div className={cn(
                "inline-flex p-4 rounded-2xl mb-6",
                percentage > 75 ? "bg-green-50 text-green-600" : "bg-primary/5 text-primary"
              )}>
                {percentage > 75 ? <CheckCircle2 className="h-12 w-12" /> : <AlertCircle className="h-12 w-12" />}
              </div>
              <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-2">Seu Resultado:</h2>
              <h3 className="text-4xl font-serif font-bold mb-4">{result.title}</h3>
              <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
                {result.message}
              </p>
              
              <div className="p-6 bg-muted/30 rounded-2xl mb-10 text-left border border-border">
                <h4 className="font-bold mb-2 flex items-center gap-2">
                  <ArrowRight className="h-4 w-4 text-primary" /> Recomendação Sabrina Barros:
                </h4>
                <p className="text-muted-foreground">{result.recommendation}</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact" className="flex-1">
                  <Button size="lg" className="w-full rounded-full font-bold">
                    Agendar Conversa Grátis
                  </Button>
                </Link>
                <Button variant="outline" onClick={reset} className="rounded-full">
                  <RefreshCcw className="mr-2 h-4 w-4" /> Refazer
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// Helper function for cn which was used but maybe not present or different
function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
