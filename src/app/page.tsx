import { Hero } from "@/components/layout/Hero";
import { FeaturedPosts } from "@/components/blog/FeaturedPosts";
import { SocialProof } from "@/components/home/SocialProof";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Hero />
      <SocialProof />
      <FeaturedPosts />
      
      {/* Strategic Tools Section */}
      <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full -ml-32 -mb-32 blur-3xl"></div>
        
        <div className="container mx-auto px-4 text-center lg:px-8 relative z-10">
          <div className="inline-block px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-bold uppercase tracking-widest mb-6">
            Ferramentas Estratégicas
          </div>
          <h2 className="text-4xl font-serif font-bold mb-6 max-w-3xl mx-auto">Sua gestão de saúde está em qual patamar?</h2>
          <p className="text-xl text-primary-foreground/80 mb-10 max-w-2xl mx-auto">
            Acesse ferramentas exclusivas para diagnosticar sua governança e se adequar às novas regras do mercado.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-2xl mx-auto">
            <Link href="/diagnostic" className="flex-1">
              <Button size="lg" variant="secondary" className="w-full rounded-xl px-8 py-8 font-bold text-lg shadow-lg hover:shadow-xl transition-all">
                Diagnóstico de Maturidade
              </Button>
            </Link>
            <Link href="/checklist/rn623" className="flex-1">
              <Button size="lg" variant="outline" className="w-full border-white/30 hover:bg-white/10 rounded-xl px-8 py-8 font-bold text-lg transition-all">
                Checklist RN 623/2024
              </Button>
            </Link>
          </div>
          <p className="mt-8 text-sm text-primary-foreground/60 italic">
            Sem capturas de e-mail. Acesso direto e focado em valor.
          </p>
        </div>
      </section>
    </>
  );
}
