"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState, useEffect } from "react";

const stack = [
    {
        number: "01",
        title: "Frontend",
        items: ["Next.js", "React", "TypeScript"],
    },
    {
        number: "02",
        title: "Backend",
        items: ["NestJS", "Prisma", "PostgreSQL"],
    },
    {
        number: "03",
        title: "Infrastructure",
        items: ["Docker", "Nginx", "Ubuntu", "Private Networks"],
    },
];

const services = ["Stripe", "Resend", "Google Cloud Storage"];

// Calcul dynamique du chemin SVG basé sur les nouvelles dimensions de ton encoche
const getDynamicPath = (W: number, H: number) => {
    if (W <= 0 || H <= 0) return "";

    const cx = W / 2;
    const maxSpan = 65.799;
    const span = Math.min(maxSpan, cx - 20);
    const scale = span / maxSpan;

    // Deltas recalculés d'après ton nouveau path (centre x = 195)
    const d1 = 65.799 * scale;
    const d2 = 62.086 * scale;
    const d3 = 58.525 * scale;
    const d4 = 55.8995 * scale;
    const d5 = 44.101 * scale;
    const d6 = 41.475 * scale;
    const d7 = 37.914 * scale;
    const d8 = 34.201 * scale;

    return `
        M 0 ${H - 36.44}
        V 14
        C 0 6.27 6.27 0 14 0
        H ${cx - d1}
        C ${cx - d2} 0 ${cx - d3} 1.47 ${cx - d4} 4.10
        L ${cx - d5} 15.90
        C ${cx - d6} 18.525 ${cx - d7} 20 ${cx - d8} 20
        H ${cx + d8}
        C ${cx + d7} 20 ${cx + d6} 18.525 ${cx + d5} 15.90
        L ${cx + d4} 4.10
        C ${cx + d3} 1.47 ${cx + d2} 0 ${cx + d1} 0
        H ${Math.max(cx + d1, W - 14)}
        C ${W - 6.27} 0 ${W} 6.27 ${W} 14
        V ${Math.max(14, H - 14)}
        C ${W} ${H - 6.27} ${W - 6.27} ${H} ${W - 14} ${H}
        H 40.18
        C 36.84 ${H} 33.61 ${H - 1.20} 31.07 ${H - 3.37}
        L 4.89 ${H - 25.81}
        C 1.79 ${H - 28.47} 0 ${H - 32.35} 0 ${H - 36.44}
        Z
    `;
};

const TechStackHome = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [size, setSize] = useState({ width: 0, height: 0 });

    useEffect(() => {
        if (!containerRef.current) return;

        const observer = new ResizeObserver((entries) => {
            for (const entry of entries) {
                const rect = entry.target.getBoundingClientRect();
                setSize({ width: rect.width, height: rect.height });
            }
        });

        observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, []);

    useGSAP(
        () => {
            const tl = gsap.timeline({ paused: true });

            tl.from(".tech-badge", {
                opacity: 0,
                y: -6,
                duration: 0.5,
                ease: "power3.out",
            })
                .from(
                    ".tech-header",
                    {
                        opacity: 0,
                        y: 12,
                        duration: 0.6,
                        ease: "power3.out",
                    },
                    "-=0.3"
                )
                .from(
                    ".tech-divider",
                    {
                        scaleX: 0,
                        transformOrigin: "left center",
                        duration: 0.6,
                        ease: "power3.inOut",
                    },
                    "-=0.35"
                )
                .from(
                    ".tech-row",
                    {
                        opacity: 0,
                        y: 10,
                        duration: 0.5,
                        stagger: 0.1,
                        ease: "power3.out",
                    },
                    "-=0.3"
                )
                .from(
                    ".tech-item",
                    {
                        opacity: 0,
                        y: 5,
                        duration: 0.35,
                        stagger: 0.025,
                        ease: "power2.out",
                    },
                    "-=0.25"
                )
                .from(
                    ".tech-services",
                    {
                        opacity: 0,
                        duration: 0.5,
                        ease: "power2.out",
                    },
                    "-=0.15"
                );

            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        tl.restart();
                    } else {
                        tl.pause(0);
                    }
                },
                { threshold: 0.3 }
            );

            if (containerRef.current) {
                observer.observe(containerRef.current);
            }

            return () => observer.disconnect();
        },
        { scope: containerRef }
    );

    const pathD = getDynamicPath(size.width, size.height);

    return (
        <div
            ref={containerRef}
            className="relative flex row-span-1 lg:row-span-3 h-full flex-col justify-between p-6 sm:p-8 pt-7 min-h-[320px]"
        >
            {/* === SVG EN ARRIÈRE-PLAN === */}
            {size.width > 0 && (
                <svg
                    className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible"
                    width={size.width}
                    height={size.height}
                >
                    <path
                        d={pathD}
                        fill="rgba(255, 255, 255, 0.05)"
                        className="backdrop-blur-md"
                    />
                    <path
                        d={pathD}
                        fill="none"
                        stroke="#D6BDBD"
                        strokeOpacity="0.3"
                        strokeWidth="1"
                    />
                </svg>
            )}

            {/* === BADGE DANS L'ENCOCHE === */}
            <div className="tech-badge absolute top-0 left-1/2 -translate-x-1/2 h-[20px] flex items-center justify-center z-10 pointer-events-none">
                <span className="text-[9px] text-emerald-400 uppercase tracking-widest flex items-center font-bold">
                    Open to work
                </span>
            </div>

            {/* HEADER */}
            <div className="tech-header relative z-10 pt-2">
                <h3 className="text-lg font-bold font-anta tracking-tight text-white">
                    Fullstack Web Development
                </h3>
            </div>

            {/* STACK */}
            <div className="relative z-10 my-6 flex flex-1 flex-col justify-center">
                <div className="tech-divider mb-5 h-px w-full bg-white/10" />

                <div className="space-y-5">
                    {stack.map((group) => (
                        <div
                            key={group.number}
                            className="tech-row grid grid-cols-[28px_1fr] gap-3"
                        >
                            <span className="font-mono text-[9px] text-white/20">
                                {group.number}
                            </span>

                            <div>
                                <span className="mb-1.5 block text-[10px] font-medium uppercase tracking-[0.18em] text-white/80">
                                    {group.title}
                                </span>

                                <div className="flex flex-wrap gap-x-3 gap-y-1">
                                    {group.items.map((item) => (
                                        <span
                                            key={item}
                                            className="tech-item text-[11px] text-white/40 transition-colors duration-300 hover:text-white"
                                        >
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="tech-services mt-6 border-t border-white/10 pt-4">
                    <span className="mb-2 block text-[9px] uppercase tracking-[0.25em] text-white/25">
                        Services
                    </span>

                    <div className="flex flex-wrap gap-x-4 gap-y-1">
                        {services.map((service) => (
                            <span
                                key={service}
                                className="text-[10px] text-white/35"
                            >
                                {service}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TechStackHome;