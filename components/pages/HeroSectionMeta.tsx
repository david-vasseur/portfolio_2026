"use client"

import React, { useRef } from 'react'
import { useGSAP } from "@gsap/react";
import gsap from 'gsap';
import { Mail, Phone, Sparkles, ArrowUpRight } from 'lucide-react'

function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if(!containerRef.current) return;
    gsap.fromTo(".reveal",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, stagger: 0.12, ease: "power3.out", delay: 0.1 }
    )
    gsap.fromTo(".card",
      { scale: 0.96, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.8, stagger: 0.1, ease: "back.out(1.2)", delay: 0.2 }
    )
  }, { scope: containerRef });

  const contacts = [
    { icon: Mail, href: "https://www.linkedin.com/in/david-vasseur-724439306/" },
    { icon: Phone, href: "https://github.com/david-vasseur" },
    { icon: Mail, href: "mailto:p5y4@laposte.net" },
    { icon: Phone, href: "tel:+33659127367" },
  ]

  const skills = ["Next.js", "TypeScript", "Tailwind", "GSAP", "Framer Motion", "Three.js", "Node.js", "Prisma"]

  return (
    <div ref={containerRef} className="min-h-screen w-full bg-[#F6F5F1] text-zinc-900 p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w- grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-5 auto-rows-auto">

        {/* MAIN CARD */}
        <div className="card lg:col-span-9 bg-white rounded- lg:rounded- border border-black/[0.06] shadow-[0_20px_80px_-20px_rgba(0,0,0,0.1)] p-6 md:p-10 lg:p-12 flex flex-col">

          <div className="reveal flex items-center gap-3 mb-8 md:mb-12">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-zinc-900 text-white text- tracking-widest uppercase font-medium">
              <Sparkles className="w-3.5 h-3.5" /> Available for Freelance
            </div>
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>

          <div className="flex-1 flex flex-col lg:flex-row gap-8 lg:gap-16 items-start">
            {/* Image */}
            <div className="reveal shrink-0 w- h- lg:w- lg:h- rounded- lg:rounded- overflow-hidden bg-zinc-100 rotate-[-2deg] shadow-xl">
              <img src="/test.png" alt="David" className="w-full h-full object-cover" />
            </div>

            <div className="flex-1">
              <h1 className="reveal font-serif text- md:text- lg:text- leading-[0.9] tracking-[-0.04em] font-[500]">
                Creative <br/>
                <span className="italic font-light text-zinc-400">Developer</span><br/>
                based in France.
              </h1>

              <p className="reveal mt-6 md:mt-8 text- md:text- leading-[1.6] text-zinc-500 max-w- font-light">
                Je conçois des expériences web haut de gamme où le design rencontre la performance.
                Spécialisé Next.js & motion design.
              </p>

              <div className="reveal mt-8 md:mt-10 flex flex-wrap gap-3">
                <a href="#work" className="group inline-flex items-center gap-2 px-7 h- rounded-full bg-zinc-900 text-white text- font-medium hover:bg-black transition-all hover:gap-3">
                  Voir mes projets <ArrowUpRight className="w-4 h-4 transition-transform group-hover:rotate-45" />
                </a>
                <a href="tel:+33659127367" className="inline-flex items-center px-7 h- rounded-full bg-white border border-zinc-200 text- font-medium hover:bg-zinc-50 transition-colors">
                  Me contacter
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* CONTACT SIDEBAR */}
        <div className="card lg:col-span-3 bg-zinc-900 text-white rounded- lg:rounded- p-6 md:p-8 flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <p className="text- tracking-[0.2em] uppercase opacity-50">Contact</p>
            <div className="w-6 h-6 rounded-full bg-white/10 grid place-items-center">•</div>
          </div>

          <div className="grid grid-cols-4 lg:grid-cols-1 gap-3 mt-auto">
            {contacts.map((c, i) => (
              <a key={i} href={c.href} target="_blank"
                className="group h- lg:h- rounded- bg-white/[0.06] hover:bg-white border border-white/[0.06] hover:border-white flex lg:justify-between items-center justify-center lg:px-6 transition-all duration-300 hover:scale-[1.02]">
                <c.icon className="w-5 h-5 lg:group-hover:translate-x-1 transition-transform" />
                <span className="hidden lg:block text- opacity-60 group-hover:opacity-100">Ouvrir</span>
              </a>
            ))}
          </div>

          <div className="mt-8 p-4 rounded-2xl bg-white/[0.05] border border-white/[0.06]">
            <p className="text- leading-relaxed opacity-70">Réponse en moins de 2h. Basé à Domazan, dispo remote.</p>
          </div>
        </div>

        {/* SKILLS BAR */}
        <div className="card lg:col-span-12 bg-white rounded- lg:rounded- border border-black/[0.06] shadow-[0_20px_80px_-20px_rgba(0,0,0,0.08)] p-3 md:p-4 flex items-center gap-3 overflow-hidden">
          <div className="shrink-0 hidden md:flex items-center gap-2 px-5 h- rounded-full bg-[#4F4085] text-white text- tracking-widest uppercase font-medium">
            My Skills
          </div>
          <div className="flex gap-2.5 overflow-x-auto scrollbar-none py-1 px-1">
            {skills.map(s => (
              <div key={s} className="shrink-0 px-5 h- grid place-items-center rounded-full bg-[#F6F5F1] border border-black/[0.04] text-[13.5px] font-medium tracking-tight hover:bg-zinc-900 hover:text-white transition-colors cursor-default">
                {s}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}

export default HeroSection;