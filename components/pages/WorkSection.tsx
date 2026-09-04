import React, { useState } from 'react';
import { ArrowUpRight, ExternalLink } from 'lucide-react';

interface Project {
    id: number;
    title: string;
    category: string;
    subtitle: string;
    description: string;
    techs: string[];
    metrics: string;
    bgColor: string;
    accentColor: string;
    link: string;
}

const projects: Project[] = [
    {
        id: 1,
        title: "Lumilaya E-Commerce",
        category: "E-Commerce & High Perf",
        subtitle: "Plateforme sur-mesure pour bougies artisanales",
        description: "Architecture Next.js avec rendu ISR, routage dynamique complexe et optimisation SEO technique (données structurées Schema.org).",
        techs: ["Next.js", "React", "ISR", "Nginx", "Tailwind"],
        metrics: "Core Web Vitals: 100/100",
        bgColor: "from-amber-950/70 via-slate-900 to-slate-950",
        accentColor: "text-amber-400 border-amber-500/30 bg-amber-500/10",
        link: "#"
    },
    {
        id: 2,
        title: "SaaS Analytics Dashboard",
        category: "Web Application",
        subtitle: "Interface de suivi de métriques en temps réel",
        description: "Tableau de bord haute performance pour le traitement et la visualisation de flux de données complexes avec un temps de réponse minimal.",
        techs: ["React", "TypeScript", "Tailwind", "REST API"],
        metrics: "< 50ms de latence",
        bgColor: "from-blue-950/70 via-slate-900 to-slate-950",
        accentColor: "text-blue-400 border-blue-500/30 bg-blue-500/10",
        link: "#"
    },
    {
        id: 3,
        title: "Infra & Reverse Proxy Nginx",
        category: "DevOps & Serveur",
        subtitle: "Architecture de déploiement Ubuntu Server",
        description: "Configuration et sécurisation d'un environnement de production Linux sous Nginx. Gestion des caches, certificats SSL et routage réseau.",
        techs: ["Ubuntu", "Nginx", "Linux", "SSL/TLS", "Bash"],
        metrics: "99.9% Uptime",
        bgColor: "from-emerald-950/70 via-slate-900 to-slate-950",
        accentColor: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
        link: "#"
    }
];

const WorkSection = () => {
    // Premier projet ouvert par défaut
    const [activeId, setActiveId] = useState<number>(1);

    return (
        <section className="relative flex h-lvh w-full items-center overflow-hidden pt-16 lg:pt-20 pb-6 px-4 sm:px-8 lg:px-16">
            <main className="z-10 flex flex-col lg:flex-row items-center justify-center h-full w-full max-w-7xl mx-auto p-4 sm:p-6 gap-3 sm:gap-4  ">
                
                {projects.map((project) => {
                    const isActive = activeId === project.id;

                    return (
                        <div
                            key={project.id}
                            onClick={() => setActiveId(project.id)}
                            className={`
                                relative h-full transition-all duration-500 ease-in-out cursor-pointer overflow-hidden rounded-2xl border border-white/10
                                transform -skew-x-0 lg:-skew-x-12
                                ${isActive 
                                    ? 'flex-[4] bg-gradient-to-br shadow-2xl ring-1 ring-white/20' 
                                    : 'flex-1 bg-slate-900/60 hover:bg-slate-800/60 opacity-60 hover:opacity-90'
                                }
                                ${project.bgColor}
                            `}
                        >
                            {/* UN-SKEW WRAPPER : Annule le -skew sur le contenu pour qu'il reste droit */}
                            <div className="h-full w-full p-6 sm:p-8 flex flex-col justify-between transform skew-x-0 lg:skew-x-12">
                                
                                {/* EN-TÊTE DE LA CARTE */}
                                <div className="flex items-center justify-between z-10">
                                    <span className={`ml-10 text-xs font-mono font-bold px-3 py-1 rounded-full border backdrop-blur-md ${project.accentColor}`}>
                                        {activeId === project.id ? '0' + project.id + "-" : ""} {activeId === project.id ? project.category : project.category.slice(0, 5) + "..."}
                                    </span>
                                    
                                    {isActive && (
                                        <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-mono text-slate-300 bg-white/5 px-3 py-1 rounded-full border border-white/10">
                                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                                            {project.metrics}
                                        </span>
                                    )}
                                </div>

                                {/* CONTENU QUAND LA CARTE EST ACTIVE */}
                                {isActive ? (
                                    <div className="my-auto space-y-4 max-w-xl animate-fadeIn z-10">
                                        <div>
                                            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
                                                {project.title}
                                            </h3>
                                            <p className="text-xs sm:text-sm font-medium text-slate-400 mt-1">
                                                {project.subtitle}
                                            </p>
                                        </div>

                                        <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                                            {project.description}
                                        </p>

                                        {/* Stacks techniques */}
                                        <div className="flex flex-wrap gap-2 pt-2">
                                            {project.techs.map((tech) => (
                                                <span 
                                                    key={tech} 
                                                    className="text-xs font-medium px-2.5 py-1 rounded-lg bg-white/10 text-slate-200 border border-white/10 backdrop-blur-sm"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    /* TITRE VERTICAL QUAND LA CARTE EST RÉDUITE (DESKTOP) */
                                    <div className="my-auto hidden lg:flex items-center justify-center h-full">
                                        <span className="transform -rotate-90 whitespace-nowrap text-lg font-bold text-slate-400 tracking-wider uppercase">
                                            {project.title}
                                        </span>
                                    </div>
                                )}

                                {/* PIED DE CARTE / CTA */}
                                <div className="flex items-center justify-between border-t border-white/10 pt-4 z-10">
                                    {isActive ? (
                                        <a
                                            href={project.link}
                                            onClick={(e) => e.stopPropagation()} // Évite de redéclencher le onClick parent
                                            className="inline-flex items-center gap-2 text-xs font-bold bg-white text-slate-950 px-5 py-2.5 rounded-xl hover:bg-emerald-400 transition-all shadow-lg active:scale-95"
                                        >
                                            <span>Explorer le projet</span>
                                            <ArrowUpRight className="w-4 h-4" />
                                        </a>
                                    ) : (
                                        <div className="w-full text-center lg:text-left text-xs font-mono text-slate-500">
                                            Cliquer pour étendre
                                        </div>
                                    )}
                                </div>

                            </div>
                        </div>
                    );
                })}

            </main>
        </section>   
    );
};

export default WorkSection;
