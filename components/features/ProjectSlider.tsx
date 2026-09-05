import React, { useState, useEffect } from 'react';

export interface ProjectSlide {
    id: number;
    title: string;
    subtitle: string;
    description: string;
    image: string;
    techs: string[];
}

export interface LinkProject {
    label: string;
    href: string;
    target?: string;
    rel?: string;
}

export interface Project {
    id: number;
    title: string;
    category: string;
    metrics: string;
    bgColor: string;
    accentColor: string;
    link: LinkProject[];
    slides: ProjectSlide[];
}

interface ProjectSliderProps {
    slides: ProjectSlide[];
    isActive: boolean;
    bgColor: string; // On passe la couleur de fond du projet
    autoPlayInterval?: number;
}

export const ProjectSlider: React.FC<ProjectSliderProps> = ({ 
    slides, 
    isActive, 
    bgColor,
    autoPlayInterval = 4000 
}) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    // Auto-play
    useEffect(() => {
        if (!isActive || isHovered || slides.length <= 1) return;

        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, autoPlayInterval);

        return () => clearInterval(timer);
    }, [isActive, isHovered, slides.length, autoPlayInterval]);

    // Reset à la réouverture
    useEffect(() => {
        if (!isActive) setCurrentSlide(0);
    }, [isActive]);

    const activeSlide = slides[currentSlide];

    return (
        <div 
            className="my-auto w-full h-full flex flex-col justify-between py-2"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* --- COUCHE 1 (Z-0) : IMAGES DU SLIDER --- */}
            <div className="absolute inset-0 z-0 scale-115 overflow-hidden pointer-events-none rounded-2xl">
                {slides.map((slide, index) => {
                    const isVideo = slide.image.endsWith('.mp4');
                    const transitionClasses = `absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out ${
                        index === currentSlide 
                            ? 'opacity-50 scale-105' 
                            : 'opacity-0 scale-100'
                    }`;

                    return isVideo ? (
                        <video
                            key={slide.id}
                            src={slide.image}
                            autoPlay
                            loop
                            muted
                            playsInline
                            preload="metadata"
                            className={transitionClasses}
                        />
                    ) : (
                        <img
                            key={slide.id}
                            src={slide.image}
                            alt={slide.title}
                            className={transitionClasses}
                        />
                    );
                })}
            </div>
            {/* --- COUCHE 1.5 (Z-5) : OVERLAY BLANC RADIAL EN HAUT À GAUCHE --- */}
            <div 
                className="absolute scale-125 w-full h-full inset-0 z-5 pointer-events-none bg-radial-[at_top_left] from-slate-900/90 via-slate-900/40 to-transparent from-10% via-40% to-60% transition-opacity duration-500 opacity-100" 
            />

            {/* --- COUCHE 2 (Z-10) : OVERLAY COLORÉ RADIAL DE LA CARD --- */}
            <div 
                className={`absolute scale-125 w-full h-full inset-0 z-10 pointer-events-none bg-radial-[at_top_left] transition-opacity duration-500 ${bgColor} opacity-100`} 
            />

            {/* --- COUCHE 3 (Z-20) : CONTENU TEXTE --- */}
            <div className="relative z-20 my-auto space-y-4 max-w-xl lg:translate-x-6 animate-fadeIn transition-all duration-300">
                <div>
                    <span className="text-[10px] lg:ml-12 font-mono uppercase tracking-widest text-emerald-400 font-semibold">
                        Feature 0{currentSlide + 1} / 0{slides.length}
                    </span>
                    <h3 className="text-2xl font-anta lg:ml-12 sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight mt-5">
                        {activeSlide.title}
                    </h3>
                    <p className="text-xs lg:ml-12 sm:text-sm font-semibold text-slate-300 mt-1">
                        {activeSlide.subtitle}
                    </p>
                </div>

                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed line-clamp-3 max-w-lg">
                    {activeSlide.description}
                </p>

                {/* Stacks techniques */}
                <div className="flex flex-wrap gap-2 pt-1">
                    {activeSlide.techs.map((tech) => (
                        <span 
                            key={tech} 
                            className="text-xs font-medium px-2.5 py-1 rounded-lg bg-white/10 text-slate-200 border border-white/10 backdrop-blur-md"
                        >
                            {tech}
                        </span>
                    ))}
                </div>
            </div>

            {/* BARRE DE NAVIGATION / DOTS (Z-20) */}
            <div className="relative z-20 flex items-center gap-2 pt-4 lg:translate-x-6">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={(e) => {
                            e.stopPropagation();
                            setCurrentSlide(index);
                        }}
                        className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                            index === currentSlide 
                                ? 'w-8 bg-white' 
                                : 'w-2 bg-white/30 hover:bg-white/60'
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};