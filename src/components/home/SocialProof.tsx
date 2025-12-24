"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function SocialProof() {
  const logos = [
    { name: "ness.", isText: true, href: "https://nesshealth.com.br/" },
    { name: "trustness.", isText: true, href: "https://trustness.com.br/" },
    { name: "forense.io", isText: true, href: "https://forense.io/" },
    { name: "Ionic Health", src: "/logo-ionic.png", href: "https://ionichealth.com/" },
    { name: "Bekaa", src: "/logo-bekaa.png", href: "https://www.bekaaprev.com.br/" },
    { name: "Baalbeck", src: "/logo-baalbeck.png", href: "https://baalbeck.com.br/" },
  ];

  // Duplicate logos for seamless scrolling
  const duplicatedLogos = [...logos, ...logos, ...logos];

  return (
    <section className="py-12 bg-muted/20 border-y border-border/40 overflow-hidden">
      <div className="container mx-auto px-4 mb-8">
        <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground/60">
          Empresas que confiam na minha visão estratégica
        </p>
      </div>
      
      <div className="relative flex overflow-hidden">
        <motion.div
          className="flex items-center gap-16 md:gap-24 lg:gap-32 px-4 whitespace-nowrap"
          animate={{
            x: ["0%", "-33.33%"],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: "linear",
            },
          }}
        >
          {duplicatedLogos.map((logo, idx) => (
            <a 
              key={`${logo.name}-${idx}`} 
              href={logo.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-500 hover:scale-110 active:scale-95 block cursor-pointer"
            >
              {logo.isText ? (
                <span className="text-lg md:text-2xl font-medium tracking-tight font-montserrat text-primary">
                  {logo.name}
                </span>
              ) : (
                <Image
                  src={logo.src!}
                  alt={`Logo ${logo.name}`}
                  width={200}
                  height={60}
                  className="h-7 md:h-8 w-auto object-contain"
                />
              )}
            </a>
          ))}
        </motion.div>
        
        {/* Gradient overlays for smooth fading effect at edges */}
        <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-background to-transparent z-10"></div>
        <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-background to-transparent z-10"></div>
      </div>
    </section>
  );
}
