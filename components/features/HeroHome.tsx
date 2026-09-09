import React, { useState, useEffect, useRef } from 'react';
import Title from '../ui/Title';
import Subtitle from '../ui/Subtitle';
import { ButtonCTA } from '../ui/ButtonCTA';
import { ArrowUpRight, FileDown } from 'lucide-react';

// Calcul du path avec biseaux et arrondis fixes
const getDynamicPath = (W: number, H: number) => {
    if (W <= 0 || H <= 0) return '';
    return `
        M 0 ${H - 36.44}
        V 14
        C 0 6.27 6.27 0 14 0
        H ${Math.max(14, W - 40.18)}
        C ${W - 36.84} 0 ${W - 33.61} 1.20 ${W - 31.07} 3.37
        L ${W - 4.89} 25.81
        C ${W - 1.79} 28.47 ${W} 32.35 ${W} 36.44
        V ${Math.max(36.44, H - 14)}
        C ${W} ${H - 6.27} ${W - 6.27} ${H} ${W - 14} ${H}
        H 40.18
        C 36.84 ${H} 33.61 ${H - 1.20} 31.07 ${H - 3.37}
        L 4.89 ${H - 25.81}
        C 1.79 ${H - 28.47} 0 ${H - 32.35} 0 ${H - 36.44}
        Z
    `;
};

const HeroHome = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [size, setSize] = useState({ width: 0, height: 0 });

    // Observer la taille du conteneur en temps réel
    useEffect(() => {
    if (!containerRef.current) return;

    const observer = new ResizeObserver((entries) => {
        for (const entry of entries) {
            // getBoundingClientRect mesure la taille REELLE totale (padding inclus)
            const rect = entry.target.getBoundingClientRect();
            setSize({ width: rect.width, height: rect.height });
        }
    });

    observer.observe(containerRef.current);
    return () => observer.disconnect();
}, []);

    const pathD = getDynamicPath(size.width, size.height);

    return (
        <div 
            ref={containerRef}
            className="relative lg:col-span-2 row-span-2 lg:row-span-3 p-4 sm:p-8 lg:p-10 flex flex-col justify-between shadow-xl min-h-[320px]"
        >
            {/* === SVG DYNAMIQUE EN ARRIÈRE-PLAN (FOND & BORDURE) === */}
            {size.width > 0 && (
                <svg 
    className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible"
    width={size.width}
    height={size.height}
>
                    <defs>
                        {/* Masque pour que l'image reste coincée dans la forme biseautée */}
                        <clipPath id="hero-clip">
                            <path d={pathD} />
                        </clipPath>
                    </defs>

                    {/* Fond semi-transparent avec effet de flou */}
                    <path 
                        d={pathD} 
                        fill="rgba(255, 255, 255, 0.4)" 
                        className="backdrop-blur-md"
                    />

                    {/* Contour / Bordure */}
                    <path 
                        d={pathD} 
                        fill="none" 
                        stroke="rgba(255, 255, 255, 0.6)" 
                        strokeWidth="1.5" 
                    />
                </svg>
            )}

            {/* === 1. IMAGE D'ARRIÈRE-PLAN DÉCOUPÉE === */}
            <div 
                className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
                style={{ clipPath: size.width > 0 ? 'url(#hero-clip)' : 'none' }}
            >
                <div className='absolute inset-0 bg-linear-to-t from-black/70 to-transparent'/>
                <div className="absolute inset-0 bg-linear-to-t from-text-1/90 via-text-1/40 to-transparent lg:bg-linear-to-r lg:from-text-1/95 lg:via-text-1/40 lg:to-transparent" />
                <img 
                    src="right_png.png"
                    alt="David Vasseur" 
                    className="absolute right-0 lg:-right-20 bottom-0 h-full w-full lg:w-3/5 object-cover object-top opacity-20 lg:opacity-85 mix-blend-multiply filter contrast-105 mask-[linear-gradient(to_top,transparent_5%,black_50%)] lg:mask-[linear-gradient(to_right,transparent_0%,black_50%)]"
                />
            </div>

            {/* === 2. MILIEU : TITRES ET ACCROCHE === */}
            <div className="relative z-10 max-w-xl my-auto">
                <Title titleContent={["DAVID ", "VASSEUR"]} />
                <p className="mt-4 text-slate-600 text-sm sm:text-base leading-relaxed">
                    Web developer with 3 years of experience, building modern web applications with React, Next.js & NestJS.
                </p>
            </div>

            {/* === 3. BAS : CTA & RÉSEAUX SOCIAUX === */}
            <div className="relative z-10 mt-8 pt-6 border-t border-slate-200/60 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                <div className="flex flex-col sm:flex-row items-center gap-3">
                    <ButtonCTA 
                        href="#work" 
                        variant="glowMesh" 
                        size="md"
                        icon={<ArrowUpRight className="w-4 h-4" />}
                    >
                        View my projects
                    </ButtonCTA>
                    <ButtonCTA 
                        href="/cv.pdf" 
                        download
                        variant="glass" 
                        size="md"
                        icon={<FileDown className="w-4 h-4 text-slate-800 group-hover:text-emerald-400 transition-colors" />}
                    >
                        Download CV
                    </ButtonCTA>
                </div>

                <div className="flex rounded-xl  p-2 items-center justify-center gap-2">
                    <a 
                        href="https://github.com/ton-profil" 
                        target="_blank" 
                        rel="noreferrer" 
                        aria-label="GitHub"
                        className="p-2.5 rounded-xl bg-white/60 border border-slate-200/80 text-slate-700 hover:text-slate-900 hover:bg-white hover:scale-105 transition-all shadow-sm"
                    >
                        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                        </svg>
                    </a>

                    <a 
                        href="https://linkedin.com/in/ton-profil" 
                        target="_blank" 
                        rel="noreferrer" 
                        aria-label="LinkedIn"
                        className="p-2.5 rounded-xl bg-white/60 border border-slate-200/80 text-slate-700 hover:text-blue-600 hover:bg-white hover:scale-105 transition-all shadow-sm"
                    >
                        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                        </svg>
                    </a>

                    <a 
                        href="mailto:contact@exemple.com" 
                        aria-label="Email"
                        className="p-2.5 rounded-xl bg-white/60 border border-slate-200/80 text-slate-700 hover:text-emerald-600 hover:bg-white hover:scale-105 transition-all shadow-sm"
                    >
                        <svg className="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default HeroHome;