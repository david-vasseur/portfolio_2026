import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export interface ButtonCTAProps {
    children: React.ReactNode;
    href?: string;
    onClick?: (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void;
    variant?: 'glowMesh' | 'primary' | 'glass' | 'outline';
    size?: 'sm' | 'md' | 'lg';
    icon?: React.ReactNode;
    iconPosition?: 'left' | 'right';
    target?: string;
    rel?: string;
    download?: boolean | string;
    className?: string;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
}

export const ButtonCTA: React.FC<ButtonCTAProps> = ({
    children,
    href,
    onClick,
    variant = 'glowMesh',
    size = 'md',
    icon,
    iconPosition = 'right',
    target,
    rel,
    download,
    className = '',
    type = 'button',
    disabled = false,
}) => {
    const containerRef = useRef<HTMLDivElement>(null);

    // ANIMATION GSAP SUR LE GPU (Transforms)
    useGSAP(() => {
        if (variant !== 'glowMesh') return;

        // Animation du fond mesh (mouvement fluide + rotation)
        gsap.to('.mesh-bg', {
            xPercent: -25,
            yPercent: -25,
            rotation: 45,
            duration: 10,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
        });

        // Animation de l'aura lumineuse en arrière-plan
        gsap.to('.mesh-glow', {
            scale: 1.5,
            duration: 7,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
        });
    }, { scope: containerRef, dependencies: [variant] });

    const baseStyles = "relative inline-flex shadow-black/20 shadow-lg items-center justify-center font-bold rounded-2xl transition-all duration-300 active:scale-95 cursor-pointer disabled:opacity-50 disabled:pointer-events-none select-none overflow-hidden group";

    const sizes = {
        sm: "text-xs px-4 py-2 gap-1.5",
        md: "text-xs sm:text-sm px-6 py-3 gap-2.5",
        lg: "text-sm sm:text-base px-8 py-4 gap-3"
    };

    const content = (
        <>
            {icon && iconPosition === 'left' && (
                <span className="shrink-0 transition-transform duration-300 group-hover:-translate-x-1 z-10">
                    {icon}
                </span>
            )}
            <span className="z-10 tracking-wide">{children}</span>
            {icon && iconPosition === 'right' && (
                <span className="shrink-0 transition-transform duration-300 group-hover:translate-x-1 z-10">
                    {icon}
                </span>
            )}
        </>
    );

    if (variant === 'glowMesh') {
        const buttonWrapper = (
            <div ref={containerRef} className={`relative inline-block ${className}`}>
                {/* 1. HALO LUMINEUX EN ARRIÈRE-PLAN (Mesh Glow) */}
                <div 
                    className="mesh-glow absolute -inset-1 w-2/3 h-2/3 rounded-2xl bg-linear-to-r from-white/60 via-white/90 to-zinc-600 opacity-60 blur-xl group-hover:opacity-100 group-hover:blur-2xl transition-all duration-500"
                />

                {/* 2. BOUTON PRINCIPAL (Conteneur masqué par overflow-hidden) */}
                <div className={`${baseStyles} ${sizes[size]} border border-white/20 text-white shadow-2xl backdrop-blur-md`}>
                    
                    {/* FOND DÉBORDANT ET ANIMÉ PAR GSAP (200% x 200%) */}
                    <div 
                        className="mesh-bg blur-2xl absolute top-[-50%] left-[-50%] w-[200%] h-[200%] z-0 opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                        style={{
                            backgroundImage: `
                                conic-gradient(from 0deg at 0% 0%, #7E0081 0deg, transparent 180deg),
                                conic-gradient(from 180deg at 100% 100%, #6C006F 0deg, transparent 180deg),
                                conic-gradient(from 90deg at 0% 100%, #3D0E3E 0deg, transparent 180deg),
                                conic-gradient(from 270deg at 100% 0%, #7E0081 0deg, transparent 180deg),
                                linear-gradient(135deg, #020617 0%, #0f172a 100%)
                            `,
                        }}
                    />

                    {/* OVERLAY BRILLANT EN HAUT (Reflet Verre 3D) */}
                    <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/50 to-transparent z-10" />

                    {/* BALAYAGE DE LUMIÈRE AU SURVOL (Shimmer Light Flare) */}
                    <div className="absolute inset-0 z-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />

                    {/* TEXTE & ICÔNE */}
                    {content}
                </div>
            </div>
        );

        if (href) {
            return (
                <a href={href} target={target} rel={rel} download={download} onClick={onClick} className="group inline-block">
                    {buttonWrapper}
                </a>
            );
        }

        return (
            <button type={type} onClick={onClick} disabled={disabled} className="group inline-block">
                {buttonWrapper}
            </button>
        );
    }

    // Variantes secondaires
    const variants = {
        primary: "bg-white text-slate-950 hover:bg-emerald-400 shadow-lg shadow-black/40",
        glass: "bg-zinc-400/70 text-slate-700 border border-white/10 backdrop-blur-md hover:bg-white/30 hover:border-white/20 hover:text-white",
        outline: "border border-white/20 text-white hover:bg-white/10"
    };

    const combinedClasses = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

    if (href) {
        return (
            <a href={href} onClick={onClick} target={target} rel={rel} download={download} className={combinedClasses}>
                {content}
            </a>
        );
    }

    return (
        <button type={type} onClick={onClick} disabled={disabled} className={combinedClasses}>
            {content}
        </button>
    );
};