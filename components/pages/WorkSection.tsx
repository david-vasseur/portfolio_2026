import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Project, ProjectSlider } from '../features/ProjectSlider';
import Subtitle from '../ui/Subtitle';

const projects: Project[] = [
    {
        id: 1,
        title: "Lumilaya E-Commerce",
        category: "E-Commerce & Full-Stack",
        metrics: "National E-Commerce · V1 Live",
        bgColor:
            "from-emerald-950/80 via-emerald-950/50 to-transparent from-10% via-40% to-60%",
        accentColor:
            "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
        link: [
            {
                label: "Visit",
                href: "https://lumilaya.fr",
                target: "_blank",
                rel: "noopener noreferrer",
            },
            {
                label: "View Frontend Code",
                href: "https://github.com/lumilaya",
                target: "_blank",
                rel: "noopener noreferrer",
            },
            {
                label: "View Backend Code",
                href: "https://github.com/lumilaya",
                target: "_blank",
                rel: "noopener noreferrer",
            },
        ],
        slides: [
            {
                id: 101,
                title: "Full-Stack E-Commerce",
                subtitle: "An architecture designed from the ground up",
                description:
                    "End-to-end design and development of a national e-commerce platform built with Next.js. Customer-facing experience, product catalog, checkout flow and administration interface were developed on a modern and scalable architecture.",
                image:
                    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop",
                techs: ["Next.js", "React", "TypeScript", "PostgreSQL"],
            },
            {
                id: 102,
                title: "Backend & Administration",
                subtitle: "A dedicated NestJS API for business operations",
                description:
                    "Development of a dedicated NestJS backend powering the entire administration area: product management, variants, orders, users and business data. The frontend communicates with this backend through a Next.js Backend-for-Frontend layer.",
                image:
                    "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600&auto=format&fit=crop",
                techs: ["NestJS", "Prisma", "PostgreSQL", "BFF"],
            },
            {
                id: 103,
                title: "Payments & Services",
                subtitle: "External services integrated into an isolated architecture",
                description:
                    "Integration of Stripe for secure payments and Resend for transactional communications. Product assets are stored on Google Cloud Storage, with an architecture designed to keep sensitive services and credentials isolated from the public client.",
                image:
                    "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=600&auto=format&fit=crop",
                techs: ["Stripe", "Resend", "GCS", "Security"],
            },
            {
                id: 104,
                title: "UX & Performance",
                subtitle: "A refined experience down to the smallest details",
                description:
                    "Custom design, fluid interactions and GSAP animations create a premium experience without compromising performance. The first production-ready version is currently live and the project is still actively evolving.",
                image:
                    "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?q=80&w=600&auto=format&fit=crop",
                techs: ["GSAP", "UX/UI", "SEO", "Performance"],
            },
        ],
    },

    {
        id: 2,
        title: "Gvs3d Service Web",
        category: "Local Business & SEO",
        metrics: "Core Web Vitals: 100/100",
        bgColor:
            "from-amber-950/80 via-amber-950/50 to-transparent from-10% via-40% to-60%",
        accentColor:
            "text-amber-400 border-amber-500/30 bg-amber-500/10",
        link: [
            {
                label: "Visit Project",
                href: "https://gvs3d.fr",
                target: "_blank",
                rel: "noopener noreferrer",
            },
            {
                label: "View Frontend Code",
                href: "https://github.com/gvs3d",
                target: "_blank",
                rel: "noopener noreferrer",
            },
        ],
        slides: [
            {
                id: 201,
                title: "Built to Convert",
                subtitle: "Simple, fast and focused on acquisition",
                description:
                    "Design and development of a website for a local pest control company. The goal was straightforward: clearly present the services, build trust and turn local search traffic into phone calls and quote requests.",
                image:
                    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop",
                techs: ["Next.js", "React", "TypeScript", "UX"],
            },
            {
                id: 202,
                title: "Local SEO",
                subtitle: "Building sustainable visibility on Google",
                description:
                    "In-depth SEO work covering site structure, content, metadata, structured data and local search signals. The website quickly gained measurable visibility for relevant local searches.",
                image:
                    "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600&auto=format&fit=crop",
                techs: ["SEO", "Schema.org", "Metadata", "Local SEO"],
            },
            {
                id: 203,
                title: "BFF & Communications",
                subtitle: "Keeping sensitive services away from the browser",
                description:
                    "A Next.js Backend-for-Frontend was implemented to handle communication with Resend. External service calls and credentials remain server-side, keeping a clear separation between the public interface and sensitive integrations.",
                image:
                    "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=600&auto=format&fit=crop",
                techs: ["Next.js", "BFF", "Resend", "Security"],
            },
            {
                id: 204,
                title: "Measurable Results",
                subtitle: "A website should drive business, not just look good",
                description:
                    "Call and quote request tracking was implemented to measure the website's real-world impact. The goal was not simply to increase traffic, but to generate more qualified business opportunities for the client.",
                image:
                    "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?q=80&w=600&auto=format&fit=crop",
                techs: ["Analytics", "Conversion", "SEO", "Performance"],
            },
        ],
    },

    {
        id: 3,
        title: "DevOps & Infrastructure",
        category: "Security & Automation",
        metrics: "Containerized · Rootless · Isolated",
        bgColor:
            "from-blue-950/80 via-blue-950/50 to-transparent from-10% via-40% to-60%",
        accentColor:
            "text-blue-400 border-blue-500/30 bg-blue-500/10",
        link: [
            {
                label: "Contact for Details",
                href: "+33600000000",
                target: "_blank",
                rel: "noopener noreferrer",
            },
        ],
        slides: [
            {
                id: 301,
                title: "Full Container Architecture",
                subtitle: "A reproducible and isolated infrastructure",
                description:
                    "Design and deployment of a fully containerized infrastructure using Docker. Each service runs in its own isolated environment with clearly defined responsibilities, making deployments more predictable and the overall architecture easier to maintain.",
                image:
                    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop",
                techs: ["Docker", "Linux", "Containers", "CI/CD"],
            },
            {
                id: 302,
                title: "Security by Design",
                subtitle: "Minimizing the attack surface",
                description:
                    "Full VPS hardening with a strict network policy, restrictive iptables rules and isolated Docker networks. Nginx acts as the single public entry point to the server and its exposed services.",
                image:
                    "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600&auto=format&fit=crop",
                techs: ["iptables", "Docker", "Linux", "Nginx"],
            },
            {
                id: 303,
                title: "Service Isolation",
                subtitle: "The database is never exposed to the Internet",
                description:
                    "Services are distributed across private Docker networks. The database remains completely isolated from the public Internet, while communication between applications is restricted to explicitly defined internal paths.",
                image:
                    "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=600&auto=format&fit=crop",
                techs: ["Private Networks", "PostgreSQL", "Nginx", "BFF"],
            },
            {
                id: 304,
                title: "Internal Microservices",
                subtitle: "Decoupling sensitive services from the core applications",
                description:
                    "Dedicated NestJS microservices were built for services such as Resend and Google Cloud Storage. Applications communicate with these services through controlled interfaces, adding another layer of isolation while making it faster to integrate new applications.",
                image:
                    "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?q=80&w=600&auto=format&fit=crop",
                techs: ["NestJS", "Microservices", "GCS", "Resend"],
            },
            {
                id: 305,
                title: "Rootless by Default",
                subtitle: "Reducing privileges at the container level",
                description:
                    "Containers run in rootless mode to reduce the potential impact of a compromise. The infrastructure follows a least-privilege approach with clear separation of responsibilities across the system.",
                image:
                    "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=600&auto=format&fit=crop",
                techs: ["Rootless", "Docker", "Linux", "Hardening"],
            },
        ],
    },
];

const WorkSection = () => {
    const [activeId, setActiveId] = useState<number>(1);

    // Fonction de calcul des proportions asymétriques
    const getFlexClass = (projectId: number) => {
        // Sur mobile (par défaut), la carte active prend plus de place en hauteur (ex: flex-[3]), 
        // et les inactives prennent un espace fixe réduit (ex: flex-1). 
        // Sur desktop (lg:), on bascule sur les proportions en largeur.

        if (projectId === activeId) return 'flex-[5] lg:flex-[8]';

        if (activeId === 1) {
            return projectId === 2 ? 'flex-1 lg:flex-[1.3]' : 'flex-1 lg:flex-[1] opacity-50';
        }
        if (activeId === 2) {
            return projectId === 1 ? 'flex-1 lg:flex-[1.3]' : 'flex-1 lg:flex-[1] opacity-50';
        }
        if (activeId === 3) {
            return projectId === 1 ? 'flex-1 lg:flex-[1.3]' : 'flex-1 lg:flex-[1] opacity-50';
        }

        return 'flex-1';
    };

    return (
        <section className="relative flex flex-col h-lvh w-full items-center overflow-hidden pt-15 lg:pt-20 pb-6 px-4 sm:px-8 lg:px-16">
            <div className="relative col-span-3 row-span-1 w-full self-center flex justify-center items-center overflow-hidden p-6 text-center"> 
                <Subtitle subtitleContent="THINGS I'VE BUILT. PROBLEMS I'VE SOLVED." />
            </div>
            <main className="z-10 min-h-0 w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-stretch justify-center p-2 sm:p-4 gap-3 sm:gap-4 lg:aspect-video">   
                

                {projects.map((project) => {
                    const isActive = activeId === project.id;
                    const flexClass = getFlexClass(project.id);

                    return (
                        <div
                            key={project.id}
                            onClick={() => setActiveId(project.id)}
                            className={`
                                relative h-full transition-all duration-500 ease-in-out cursor-pointer overflow-hidden rounded-2xl border border-white/10
                                transform skew-x-0 lg:-skew-x-12 shadow-black/50
                                ${flexClass}
                                ${isActive 
                                    ? 'bg-linear-to-br shadow-2xl ring-1 ring-white/20' 
                                    : 'bg-slate-900/60 hover:bg-slate-800/60 opacity-60 hover:opacity-90 shadow-xl'
                                }
                                ${project.bgColor}
                            `}
                        >
                            {/* UN-SKEW WRAPPER */}
                            <div className="h-full w-full p-6 sm:p-6 flex flex-col justify-between transform skew-x-0 lg:skew-x-12">
                                
                                {/* EN-TÊTE DE LA CARTE */}
                                <div className="flex items-center justify-between z-20">
                                    <span 
                                        className={`
                                            text-xs lg:translate-x-12 xl:translate-x-16 font-mono font-bold px-3 py-1 rounded-full border backdrop-blur-md transition-all text-center
                                            ${isActive 
                                                ? 'lg:ml-10 whitespace-nowrap' 
                                                : 'w-full block truncate'
                                            } 
                                            ${project.accentColor}
                                        `}
                                    >
                                        {isActive ? `0${project.id} - ${project.category}` : project.category}  
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
                                    <ProjectSlider slides={project.slides} isActive={isActive} bgColor={project.bgColor} />
                                ) : (
                                    /* TITRE VERTICAL QUAND LA CARTE EST RÉDUITE */
                                    <div className="my-auto hidden lg:flex items-center justify-center h-full">
                                        <span className="transform -rotate-90 skew-y-12 whitespace-nowrap text-lg font-bold text-slate-400 tracking-wider uppercase">
                                            {project.title}
                                        </span>
                                    </div>
                                )}

                                {/* PIED DE CARTE / CTA */}
                                <div className="flex w-full lg:-translate-x-12 xl:-translate-x-16 items-center justify-between border-t border-white/10 pt-4 z-20">
                                    {isActive ? (
                                        <div className="flex flex-wrap gap-2">
                                            {project.link.map((link, index) => (
                                                <a
                                                    key={index}
                                                    href={link.href}
                                                    target={link.target}
                                                    rel={link.rel}
                                                    onClick={(e) => e.stopPropagation()}
                                                    className="inline-flex items-center gap-2 text-xs font-bold bg-white text-slate-950 px-5 py-2.5 rounded-xl hover:bg-emerald-400 transition-all shadow-lg active:scale-95"
                                                >
                                                    <span>{link.label}</span>
                                                    <ArrowUpRight className="w-4 h-4" />
                                                </a>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="w-full text-center text-xs font-mono text-slate-500 truncate px-1">
                                            Extend
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