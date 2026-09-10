'use client';

import { useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import { Mail } from 'lucide-react';
import { FaGithub, FaLinkedin, FaPhone } from 'react-icons/fa';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

// IMPORT OBLIGATOIRE EN DEHORS DU COMPOSANT
const Map = dynamic(() => import('@/components/layout/MapContainer'), {
    ssr: false,
});

interface MapComponentProps {
    isForm?: boolean;
    animationFinish?: boolean;
}

export default function MapComponent({ isForm, animationFinish }: MapComponentProps) {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const mm = gsap.matchMedia();

            // Mobile & Tablette (< 1024px) : Animation GSAP sur le clic
            mm.add('(max-width: 1023px)', () => {
                gsap.to(cardRef.current, {
                    height: isOpen ? 360 : 90,
                    duration: 0.5,
                    ease: 'power3.inOut',
                });
            });

            // Desktop (>= 1024px) : Aucune animation, nettoyage des styles inline de GSAP
            mm.add('(min-width: 1024px)', () => {
                gsap.set(cardRef.current, { clearProps: 'height' });
            });
        },
        { dependencies: [isOpen], scope: containerRef }
    );

    return (
        <div
            ref={containerRef}
            className="
                relative
                w-full
                max-w-84
                lg:max-w-90
                xl:max-w-none
                lg:w-3/5
                flex
                flex-1
                flex-col
                gap-3
            "
        >
            {/* Bouton de bascule : Mobile & Tablette uniquement */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="
                    lg:hidden
                    w-full
                    py-2.5
                    px-4
                    bg-zinc-900
                    hover:bg-zinc-800
                    border
                    border-white/10
                    rounded-xl
                    text-xs
                    font-medium
                    text-zinc-300
                    flex
                    items-center
                    justify-between
                    transition-colors
                "
            >
                <span>{isOpen ? 'Masquer la carte' : 'Afficher la carte'}</span>
                <span className="text-[10px] opacity-60">{isOpen ? '▲' : '▼'}</span>
            </button>

            {/* Cadre de la carte */}
            <div
                ref={cardRef}
                className="
                    lg:shadow-xl
                    lg:shadow-black/20
                    relative
                    w-full
                    h-22.5
                    lg:h-95
                    overflow-hidden
                    border
                    border-[#D6BDBD]/40
                    rounded-xl
                    bg-zinc-950/5
                "
            >
                {/* Overlay Dégradé */}
                <div className="absolute inset-0 z-10 pointer-events-none bg-[radial-gradient(at_0%_20%,rgba(95,96,106,0.8)_10%,rgba(16,185,129,0.15)_70%,rgba(23,23,23,0.1)_100%)]" />

                {/* Vue Mobile/Tablette Rétractée : Icones seules */}
                <div
                    className={`
                        lg:hidden
                        h-full
                        w-full
                        flex
                        items-center
                        justify-center
                        gap-6
                        text-white
                        transition-opacity
                        duration-300
                        ${isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}
                    `}
                >
                    <FaPhone className="text-xl hover:text-emerald-400 cursor-pointer transition-colors" />
                    <Mail className="w-5 h-5 hover:text-emerald-400 cursor-pointer transition-colors" />
                    <FaGithub className="text-xl hover:text-emerald-400 cursor-pointer transition-colors" />
                    <FaLinkedin className="text-xl hover:text-emerald-400 cursor-pointer transition-colors" />
                </div>

                {/* Carte & Overlay Adresse */}
                <div
                    className={`
                        absolute
                        inset-0
                        w-full
                        h-full
                        transition-opacity
                        duration-300
                        ${isOpen ? 'opacity-100' : 'opacity-0 lg:opacity-100'}
                    `}
                >
                    <Map />

                    {/* Bloc Adresse sur la carte (Desktop) */}
                    <div className="absolute top-4 left-4 z-20 bg-zinc-900/80 backdrop-blur-md border border-white/10 p-3.5 rounded-xl text-white">
                        <h3 className="font-bold text-lg tracking-wide">Estézargues</h3>
                        <p className="font-base text-sm tracking-wide italic">Between Nîmes & Avignon</p>
                        <p className="text-xs text-zinc-400 mt-0.5">Gard, Occitanie - France</p>
                    </div>
                </div>
            </div>

            {/* Cadre "Instant Contact" sous la carte : Desktop uniquement */}
            <div className="hidden lg:flex items-center justify-start p-4 ">
                <div className='p-2 broder-white/20 border-[0.5px] rounded-xl -skew-x-12 bg-zinc-900/40 backdrop-blur-sm"'>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-emerald-400">Instant Contact</h4>
                    <p className="text-xs text-zinc-400">Available to discuss your projects</p>
                </div>
                <div className="flex items-center ml-10 gap-5 text-zinc-200">
                    <FaPhone className="text-3xl hover:text-emerald-400 cursor-pointer transition-colors" />
                    <Mail className="w-8 h-8 hover:text-emerald-400 cursor-pointer transition-colors" />
                    <FaGithub className="text-3xl hover:text-emerald-400 cursor-pointer transition-colors" />
                    <FaLinkedin className="text-3xl hover:text-emerald-400 cursor-pointer transition-colors" />
                </div>
            </div>
        </div>
    );
}