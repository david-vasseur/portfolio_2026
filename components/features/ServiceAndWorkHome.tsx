"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowUpRight, ShieldCheck, Workflow, Server } from "lucide-react";
import { useRef } from "react";

const principles = [
    {
        number: "01",
        title: "Autonomy",
        description:
            "De l'application au déploiement, je maîtrise l'ensemble de la chaîne.",
        icon: Server,
    },
    {
        number: "02",
        title: "Architecture",
        description:
            "Frontend, BFF, backend, services et infrastructure séparés selon leurs responsabilités.",
        icon: Workflow,
    },
    {
        number: "03",
        title: "Security",
        description:
            "Réseaux isolés, containers rootless et exposition minimale des services.",
        icon: ShieldCheck,
    },
];

const ServicesAndWorkHome = () => {
    const rootRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const tl = gsap.timeline({ paused: true });

            tl.from(".work-label", {
                opacity: 0,
                y: 8,
                duration: 0.5,
                ease: "power3.out",
            })
                .from(
                    ".principle",
                    {
                        opacity: 0,
                        x: -15,
                        duration: 0.6,
                        stagger: 0.1,
                        ease: "power3.out",
                    },
                    "-=0.2"
                )
                .from(
                    ".principle-line",
                    {
                        scaleX: 0,
                        transformOrigin: "left center",
                        duration: 0.5,
                        stagger: 0.1,
                        ease: "power3.inOut",
                    },
                    "-=0.45"
                )
                .from(
                    ".featured",
                    {
                        opacity: 0,
                        x: 20,
                        duration: 0.7,
                        ease: "power3.out",
                    },
                    "-=0.45"
                )
                .from(
                    ".featured-content",
                    {
                        opacity: 0,
                        y: 10,
                        duration: 0.6,
                        ease: "power3.out",
                    },
                    "-=0.35"
                )
                .from(
                    ".featured-tag",
                    {
                        opacity: 0,
                        scale: 0.9,
                        duration: 0.4,
                        ease: "back.out(1.5)",
                    },
                    "-=0.25"
                );

            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        tl.restart();
                    } else {
                        tl.pause(0);
                    }
                },
                {
                    threshold: 0.2,
                }
            );

            if (rootRef.current) {
                observer.observe(rootRef.current);
            }

            return () => observer.disconnect();
        },
        {
            scope: rootRef,
        }
    );

    return (
        <div
            ref={rootRef}
            className="relative hidden lg:col-span-3 lg:flex h-full w-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-md sm:p-6 lg:flex-row lg:gap-6"
        >
            {/* =====================================================
                LEFT — PRINCIPLES
            ====================================================== */}

            <div className="flex min-w-0 flex-1 flex-col justify-between lg:max-w-[42%]">
                <div className="work-label">
                    <div className="mb-2 flex items-center justify-between">
                        <span className="text-[9px] uppercase tracking-[0.3em] text-white/35">
                            Approach
                        </span>

                        <span className="font-mono text-[9px] text-white/20">
                            03 principles
                        </span>
                    </div>

                    <h3 className="text-xl font-medium tracking-[-0.03em] text-white">
                        How I build.
                    </h3>
                </div>

                <div className="my-5 space-y-3">
                    {principles.map((principle) => {
                        const Icon = principle.icon;

                        return (
                            <div
                                key={principle.number}
                                className="principle group relative"
                            >
                                <div className="flex items-start gap-3">
                                    <span className="font-mono pt-0.5 text-[9px] text-white/20">
                                        {principle.number}
                                    </span>

                                    <div className="min-w-0 flex-1">
                                        <div className="flex items-center gap-2">
                                            <Icon
                                                size={13}
                                                strokeWidth={1.5}
                                                className="text-white/35 transition-colors duration-300 group-hover:text-white/70"
                                            />

                                            <h4 className="text-xs font-medium uppercase tracking-[0.12em] text-white/75">
                                                {principle.title}
                                            </h4>
                                        </div>

                                        <p className="mt-1 max-w-sm text-[10px] leading-relaxed text-white/35">
                                            {principle.description}
                                        </p>
                                    </div>
                                </div>

                                <div className="principle-line mt-3 h-px w-full bg-white/10" />
                            </div>
                        );
                    })}
                </div>

                <span className="work-label text-[9px] uppercase tracking-[0.22em] text-white/20">
                    From code to infrastructure
                </span>
            </div>

            {/* =====================================================
                SEPARATOR
            ====================================================== */}

            <div className="my-5 hidden w-px bg-white/10 lg:block" />

            {/* =====================================================
                RIGHT — FEATURED WORK
            ====================================================== */}

            <div className="featured relative flex min-w-0 flex-1 flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-black/20 p-5">
                {/* ambient light */}

                <div className="pointer-events-none absolute -right-24 -top-24 h-48 w-48 rounded-full bg-white/[0.04] blur-3xl" />

                <div className="relative z-10 flex items-center justify-between">
                    <span className="featured-tag inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-2.5 py-1 text-[9px] uppercase tracking-[0.15em] text-white/60">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/80" />
                        Featured work
                    </span>

                    <span className="font-mono text-[9px] text-white/20">
                        01
                    </span>
                </div>

                <div className="featured-content relative z-10 my-5">
                    <span className="mb-2 block text-[9px] uppercase tracking-[0.25em] text-white/25">
                        TrouveTonMarché
                    </span>

                    <h4 className="max-w-lg text-lg font-medium tracking-[-0.025em] text-white sm:text-xl">
                        Une architecture full-stack pensée de bout en bout.
                    </h4>

                    <p className="mt-2 max-w-lg text-[10px] leading-relaxed text-white/40 sm:text-xs">
                        Next.js comme frontend et BFF, NestJS pour le backend,
                        PostgreSQL, Docker et des réseaux isolés pour contrôler
                        précisément l'exposition de chaque service.
                    </p>

                    <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1.5">
                        {[
                            "Next.js",
                            "NestJS",
                            "Prisma",
                            "Docker",
                            "PostgreSQL",
                        ].map((item) => (
                            <span
                                key={item}
                                className="text-[9px] text-white/30 transition-colors duration-300 hover:text-white/70"
                            >
                                {item}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="relative z-10 flex items-center justify-between border-t border-white/10 pt-4">
                    <span className="text-[9px] uppercase tracking-[0.2em] text-white/25">
                        Architecture case study
                    </span>

                    <a
                        href="#work"
                        className="group inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.15em] text-white/70 transition-colors duration-300 hover:text-white"
                    >
                        <span>Explore work</span>

                        <ArrowUpRight
                            size={13}
                            strokeWidth={1.5}
                            className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ServicesAndWorkHome;