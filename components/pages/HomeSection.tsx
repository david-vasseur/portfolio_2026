"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import Title from "../ui/Title";
import Subtitle from "../ui/Subtitle";


gsap.registerPlugin(SplitText);

export default function HomePage() {
  const architectureRef = useRef<HTMLDivElement>(null);
  const codeRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      const nodes = gsap.utils.toArray<HTMLElement>(".architecture-node");

      gsap.from(nodes, {
        opacity: 0,
        y: 20,
        duration: 0.8,
        stagger: 0.12,
        delay: 1,
        ease: "power3.out",
      });

      gsap.from(".architecture-line", {
        scaleY: 0,
        transformOrigin: "top",
        duration: 0.8,
        delay: 1.4,
        ease: "power3.out",
      });

      gsap.from(codeRef.current, {
        opacity: 0,
        y: 10,
        duration: 0.8,
        delay: 2,
        ease: "power3.out",
      });
    });

    return () => ctx.revert();
  }, []);

    return (
        <section className="relative flex h-lvh w-full items-center overflow-hidden px-8 sm:px-12 lg:px-20">

            <div className="relative h-full z-10 flex flex-col lg:flex-row w-full max-w-7xl mx-auto">


                {/* ─────────────────────────────
                    LEFT — POSITIONING
                ───────────────────────────── */}
                <div className="flex w-2/3 flex-col justify-center">

                <span className="mb-6 text-lg uppercase tracking-[0.3em] text-white/40">
                    Full-stack developer
                </span>

                <Title
                    titleContent={[
                    "De l'interface",
                    "à l'infrastructure",
                    ]}
                />

                <Subtitle subtitleContent="Je conçois, développe, déploie et sécurise"/>
                    
                    
                <Subtitle subtitleContent="des applications web de bout en bout."/>

                <div className="mt-10 flex gap-8 text-xs uppercase tracking-[0.2em] text-white/40">
                    <span>Architecture</span>
                    <span>Infrastructure</span>
                    <span>Security</span>
                </div>

                </div>


                {/* ─────────────────────────────
                    RIGHT — ARCHITECTURE
                ───────────────────────────── */}
                <div
                    ref={architectureRef}
                    className="relative flex w-1/3 items-center justify-center"
                >

                <div className="relative flex flex-col items-center">

                    {/* Internet */}

                    <div className="architecture-node text-[10px] uppercase tracking-[0.25em] text-white/40">
                    Internet
                    </div>

                    <div className="architecture-line h-10 w-px bg-white/20" />


                    {/* Nginx */}

                    <div className="architecture-node border border-white/15 px-6 py-3 text-xs tracking-[0.15em]">
                    NGINX
                    </div>

                    <div className="architecture-line h-10 w-px bg-white/20" />


                    {/* Next */}

                    <div className="architecture-node border border-white/15 px-6 py-3 text-xs tracking-[0.15em]">
                    NEXT.JS
                    <span className="ml-2 text-white/30">/ BFF</span>
                    </div>

                    <div className="architecture-line h-10 w-px bg-white/20" />


                    {/* Private zone */}

                    <div className="relative border border-dashed border-white/10 px-12 py-8">

                    <span className="absolute -top-3 left-4 bg-black px-2 text-[9px] uppercase tracking-[0.25em] text-white/30">
                        private network
                    </span>

                    <div className="flex flex-col items-center">

                        <div className="architecture-node border border-white/15 px-6 py-3 text-xs tracking-[0.15em]">
                        NESTJS
                        </div>

                        <div className="architecture-line h-10 w-px bg-white/20" />

                        <div className="architecture-node border border-white/15 px-6 py-3 text-xs tracking-[0.15em]">
                        POSTGRESQL
                        </div>

                    </div>

                    </div>

                </div>


                {/* ─────────────────────────
                    CODE PROOF
                ───────────────────────── */}

                <div
                    ref={codeRef}
                    className="absolute -bottom-4 -right-8 w-64 border border-white/10 bg-black/40 p-4 backdrop-blur-sm"
                >

                    <div className="mb-3 text-[9px] uppercase tracking-[0.25em] text-white/30">
                    Network isolation
                    </div>

                    <pre className="overflow-hidden font-mono text-[10px] leading-relaxed text-white/60">
        {`networks:
        - app-network
        - postgres-network
        - resend-api-gateway`}
                    </pre>

                </div>

                </div>

            </div>

        </section>
    );
}