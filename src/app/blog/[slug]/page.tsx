import { getPostBySlug, getAllPosts } from "@/lib/content-api";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Clock, Tag, ArrowLeft, Linkedin } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { StickyCTA } from "@/components/blog/StickyCTA";
import Script from "next/script";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "datePublished": post.date,
    "author": {
      "@type": "Person",
      "name": "Sabrina Barros",
      "url": "https://www.linkedin.com/in/sabrina-barros/"
    },
    "image": "https://site-sabrina-nessbr-projects.vercel.app/hero-cover.png",
    "publisher": {
      "@type": "Person",
      "name": "Sabrina Barros"
    }
  };

  return (
    <article className="container mx-auto px-4 py-20 lg:px-8 max-w-4xl">
      <Script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Link href="/blog">
        <Button variant="ghost" size="sm" className="mb-8 gap-2 -ml-4">
          <ArrowLeft className="h-4 w-4" /> Voltar ao Blog
        </Button>
      </Link>

      <header className="mb-12">
        <div className="flex items-center gap-2 text-primary font-medium text-xs uppercase tracking-[0.2em] mb-4">
          <Tag className="h-3 w-3" />
          {post.category}
        </div>
        <h1 className="text-4xl font-serif font-bold mb-6 sm:text-6xl leading-tight">
          {post.title}
        </h1>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {post.readTime} de leitura
          </div>
          <span>•</span>
          <span>{new Date(post.date).toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "long",
            year: "numeric"
          })}</span>
        </div>
      </header>

      <div className="prose prose-slate lg:prose-xl max-w-none dark:prose-invert font-sans leading-relaxed">
        <MDXRemote source={post.content} />
      </div>

      <footer className="mt-20 pt-12 border-t">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-16">
          <div className="text-center md:text-left">
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">Gostou do conteúdo? Compartilhe:</p>
            <div className="flex gap-3 justify-center md:justify-start">
              <a 
                href={`https://www.linkedin.com/sharing/share-offsite/?url=https://site-sabrina-nessbr-projects.vercel.app/blog/${post.slug}`} 
                target="_blank" 
                rel="noopener" 
                className="h-10 px-6 rounded-full border border-primary/20 bg-primary/5 flex items-center gap-2 hover:bg-primary hover:text-white transition-all font-medium text-sm"
              >
                <Linkedin className="h-4 w-4" /> Linkedin
              </a>
            </div>
          </div>
          <Link href="/blog">
            <Button variant="outline" className="rounded-full px-8">Ver outros artigos</Button>
          </Link>
        </div>

        <div className="bg-muted/50 rounded-3xl p-10 flex flex-col items-center text-center border border-border/40">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
            <span className="text-2xl font-serif font-bold text-primary">SB</span>
          </div>
          <h3 className="text-2xl font-serif font-bold mb-4">Sabrina Barros</h3>
          <p className="text-muted-foreground text-base max-w-lg mb-8 leading-relaxed">
            Dentista e Executiva de Saúde Suplementar. Atua na intersecção entre regulação, tecnologia e cuidado humano para transformar a saúde no Brasil.
          </p>
          <div className="flex gap-4">
            <a href="https://www.linkedin.com/in/sabrina-barros/" target="_blank" rel="noopener">
              <Button size="lg" className="rounded-full px-8 font-bold">Conectar no Linkedin</Button>
            </a>
          </div>
        </div>
      </footer>
      <StickyCTA />
    </article>
  );
}
