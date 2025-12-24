import { Hero } from "@/components/layout/Hero";
import { FeaturedPosts } from "@/components/blog/FeaturedPosts";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedPosts />
      
      {/* Newsletter / CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center lg:px-8">
          <h2 className="text-3xl font-serif font-bold mb-6">Receba Insights de Gestão Estratégica</h2>
          <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
            Junte-se a outros líderes de saúde e receba semanalmente análises exclusivas sobre regulação, mercado e odontologia de alta performance.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Seu melhor e-mail" 
              className="px-6 py-3 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 text-white placeholder:text-primary-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary-foreground/30 flex-1"
            />
            <Button size="lg" variant="secondary" className="rounded-full px-8 gap-2">
              <Mail className="h-4 w-4" /> Inscrever
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
