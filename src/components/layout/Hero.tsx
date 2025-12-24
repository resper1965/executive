"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-background py-16 lg:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col gap-12 lg:gap-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl font-serif font-bold tracking-tight text-foreground sm:text-6xl mb-6">
              Sabrina Barros
            </h1>
            <p className="text-xl text-primary font-medium tracking-wide uppercase mb-8">
              Estrategista e Conselheira de Saúde Suplementar
            </p>
            <div className="prose prose-slate lg:prose-lg max-w-2xl text-muted-foreground leading-relaxed">
              <p>
                Apoiando lideranças e organizações na mitigação de riscos, desenvolvimento de projetos complexos e transições executivas de alto impacto no setor de saúde.
              </p>
            </div>
          </motion.div>

          {/* New Cover Banner */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative w-full aspect-[21/9] sm:aspect-[3/1] rounded-3xl overflow-hidden shadow-2xl border bg-muted"
          >
            <Image
              src="/hero-cover.png"
              alt="Sabrina Barros Capa"
              fill
              className="object-cover"
              priority
            />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Link href="/blog">
              <Button size="lg" className="rounded-full px-8 text-lg">
                Explorar Insights
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="rounded-full px-8 text-lg">
                Falar com Sabrina
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -z-10 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl" />
    </section>
  );
}
