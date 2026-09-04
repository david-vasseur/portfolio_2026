"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

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

const TechStackHome = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const tl = gsap.timeline({ paused: true });

            tl.from(".tech-header", {
                opacity: 0,
                y: 12,
                duration: 0.6,
                ease: "power3.out",
            })
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
                )
                .from(
                    ".tech-security",
                    {
                        opacity: 0,
                        x: -8,
                        duration: 0.5,
                        ease: "power3.out",
                    },
                    "-=0.2"
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
                    threshold: 0.3,
                }
            );

            if (containerRef.current) {
                observer.observe(containerRef.current);
            }

            return () => observer.disconnect();
        },
        {
            scope: containerRef,
        }
    );

    return (
        <div
            ref={containerRef}
            className="relative flex row-span-1 lg:row-span-3 h-full flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-md"
        >
            {/* HEADER */}

            <div className="tech-header">
                <div className="mb-2 flex items-center justify-between">
                    <span className="text-[9px] uppercase tracking-[0.3em] text-white/35">
                        <div className="inline-block w-2 h-2 bg-emerald-400 border border-zinc-500 rounded-full mr-2" /> Open to new opportunities
                    </span>
                </div>

                <h3 className="text-lg font-bold font-anta tracking-tight text-white">
                    Fullstack Web Development
                </h3>
            </div>

            {/* STACK */}

            <div className="my-6 flex flex-1 flex-col justify-center">
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