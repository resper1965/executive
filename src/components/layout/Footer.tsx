import Link from "next/link";
import { Linkedin, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-12 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link href="/" className="flex flex-col leading-none mb-4">
              <span className="text-xl font-bold tracking-tight text-primary">SABRINA BARROS</span>
              <span className="text-[10px] font-medium tracking-[0.2em] text-muted-foreground uppercase">Saúde & Gestão</span>
            </Link>
            <p className="max-w-xs text-sm text-muted-foreground">
              Compartilhando conhecimento e insights sobre odontologia, saúde suplementar e gestão executiva.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/" className="hover:text-primary transition-colors">Início</Link></li>
              <li><Link href="/blog" className="hover:text-primary transition-colors">Blog</Link></li>
              <li><Link href="/about" className="hover:text-primary transition-colors">Sobre</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">Redes Sociais</h4>
            <div className="flex gap-4">
              <a href="https://www.linkedin.com/in/sabrina-barros/" target="_blank" rel="noopener" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="mailto:contato@sabrinabarros.com" className="text-muted-foreground hover:text-primary transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t text-center text-[10px] text-muted-foreground uppercase tracking-widest">
          © {new Date().getFullYear()} SABRINA BARROS. TODOS OS DIREITOS RESERVADOS.
        </div>
      </div>
    </footer>
  );
}
