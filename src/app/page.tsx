import { Hero } from "@/components/layout/Hero";
import { FeaturedPosts } from "@/components/blog/FeaturedPosts";
import { SocialProof } from "@/components/home/SocialProof";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <>
      <Hero />
      <SocialProof />
      <FeaturedPosts />
      
      {/* Lead Magnet Section */}
      <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full -ml-32 -mb-32 blur-3xl"></div>
        
        <div className="container mx-auto px-4 text-center lg:px-8 relative z-10">
          <div className="inline-block px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-bold uppercase tracking-widest mb-6">
            Recurso Exclusivo
          </div>
          <h2 className="text-4xl font-serif font-bold mb-6 max-w-2xl mx-auto">Sua operação está pronta para a RN 623/2024?</h2>
          <p className="text-xl text-primary-foreground/80 mb-10 max-w-2xl mx-auto">
            Baixe meu **Checklist de Adequação Regulatória** e descubra em 5 minutos os pontos cegos da sua governança em saúde.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="E-mail profissional" 
              className="px-6 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all flex-1"
            />
            <Button size="lg" variant="secondary" className="rounded-xl px-8 py-6 font-bold text-base shadow-lg hover:shadow-xl transition-all">
              Baixar Checklist Grátis
            </Button>
          </div>
          <p className="mt-6 text-sm text-primary-foreground/60 italic">
            Receba também minha newsletter semanal com insights de gestão.
          </p>
        </div>
      </section>
    </>
  );
}
