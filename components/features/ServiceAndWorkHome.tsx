"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Brain, Compass, MessageSquare, Quote } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const softSkills = [
    {
        number: "01",
        title: "Product Vision",
        description: "Focused on business value and user experience.",
        icon: Compass,
    },
    {
        number: "02",
        title: "Pragmatism",
        description: "Clean, maintainable code without over-engineering.",
        icon: Brain,
    },
    {
        number: "03",
        title: "Communication",
        description: "Making technical concepts clear and keeping the team aligned.",
        icon: MessageSquare,
    },
];

const quotes = [
    {
        quote: "« Simplicity is prerequisite for reliability. »",
        author: "Edsger W. Dijkstra",
        tag: "Engineering",
    },
    {
        quote: "« First, solve the problem. Then, write the code. »",
        author: "John Johnson",
        tag: "Problem Solving",
    },
    {
        quote: "« Make it work, make it right, make it fast. »",
        author: "Kent Beck",
        tag: "Craftsmanship",
    },
];

const SoftSkillsAndQuotesHome = () => {
    const rootRef = useRef<HTMLDivElement>(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    // GSAP Entrance
    useGSAP(
        () => {
            const tl = gsap.timeline({ paused: true });

            tl.from(".section-label", {
                opacity: 0,
                y: 6,
                duration: 0.4,
                ease: "power3.out",
            })
                .from(
                    ".skill-item",
                    {
                        opacity: 0,
                        x: -10,
                        duration: 0.4,
                        stagger: 0.06,
                        ease: "power3.out",
                    },
                    "-=0.2"
                )
                .from(
                    ".quote-card",
                    {
                        opacity: 0,
                        x: 15,
                        duration: 0.5,
                        ease: "power3.out",
                    },
                    "-=0.3"
                );

            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        tl.restart();
                    } else {
                        tl.pause(0);
                    }
                },
                { threshold: 0.2 }
            );

            if (rootRef.current) {
                observer.observe(rootRef.current);
            }

            return () => observer.disconnect();
        },
        { scope: rootRef }
    );

    // GSAP Quote Loop Animation
    useEffect(() => {
        const timer = setInterval(() => {
            const nextIndex = (currentIndex + 1) % quotes.length;

            gsap.to(".quote-anim", {
                y: -12,
                opacity: 0,
                duration: 0.35,
                ease: "power2.in",
                onComplete: () => {
                    setCurrentIndex(nextIndex);
                    gsap.set(".quote-anim", { y: 12, opacity: 0 });
                    gsap.to(".quote-anim", {
                        y: 0,
                        opacity: 1,
                        duration: 0.4,
                        stagger: 0.04,
                        ease: "power3.out",
                    });
                },
            });
        }, 4500);

        return () => clearInterval(timer);
    }, [currentIndex]);

    const currentQuote = quotes[currentIndex];

    return (
        <div
            ref={rootRef}
            className="relative hidden lg:col-span-3 lg:row-span-1 lg:flex h-full w-full items-center overflow-hidden rounded-[14px] border border-white/10 bg-white/5 p-3.5 sm:p-4 backdrop-blur-md gap-4 lg:gap-5"
        >
            {/* =====================================================
                LEFT — SOFT SKILLS (COMPACT)
            ====================================================== */}
            <div className="flex h-full min-w-0 flex-1 flex-col justify-between lg:max-w-[50%]">
                <div className="section-label flex items-center justify-between">
                    <span className="text-[9px] font-medium uppercase tracking-[0.25em] text-white/40">
                        Mindset & Soft Skills
                    </span>
                    <span className="font-mono text-[9px] text-white/20">
                        03 pillars
                    </span>
                </div>

                <div className="space-y-1.5 my-auto">
                    {softSkills.map((skill) => {
                        const Icon = skill.icon;
                        return (
                            <div
                                key={skill.number}
                                className="skill-item flex items-center gap-2 min-w-0"
                            >
                                <Icon
                                    size={12}
                                    strokeWidth={1.75}
                                    className="text-white/40 shrink-0"
                                />
                                <div className="min-w-0 flex-1 flex items-baseline gap-2">
                                    <h4 className="text-[11px] font-semibold text-white/80 shrink-0">
                                        {skill.title}
                                    </h4>
                                    <span className="text-[10px] text-white/35 truncate">
                                        — {skill.description}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* <div className="section-label text-[8px] uppercase tracking-[0.2em] text-white/20">
                    Savoir-être & méthode
                </div> */}
            </div>

            {/* SEPARATOR */}
            <div className="h-full w-px bg-white/10" />

            {/* =====================================================
                RIGHT — ANIMATED GSAP QUOTES (COMPACT)
            ====================================================== */}
            <div className="quote-card relative flex h-full min-w-0 flex-1 flex-col justify-between overflow-hidden rounded-xl border border-white/10 bg-black/20 p-3 lg:p-3.5">
                {/* Background glow */}
                <div className="pointer-events-none absolute -right-12 -top-12 h-28 w-28 rounded-full bg-white/5 blur-2xl" />

                {/* Header */}
                <div className="relative z-10 flex items-center justify-between">
                    <div className="quote-anim flex items-center gap-1.5">
                        <Quote size={11} className="text-white/40" />
                        <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[8px] uppercase tracking-[0.12em] text-white/60">
                            {currentQuote.tag}
                        </span>
                    </div>

                    <span className="font-mono text-[8px] text-white/20">
                        0{currentIndex + 1}/0{quotes.length}
                    </span>
                </div>

                {/* Animated Text */}
                <div className="relative z-10 my-auto py-1">
                    <h4 className="quote-anim text-xs sm:text-sm font-medium tracking-tight text-white/90 leading-tight italic">
                        {currentQuote.quote}
                    </h4>
                    <p className="quote-anim mt-1 text-[10px] font-mono text-white/40">
                        — {currentQuote.author}
                    </p>
                </div>

                {/* Indicators */}
                <div className="relative z-10 flex items-center justify-between border-t border-white/10 pt-1.5">
                    <span className="text-[8px] uppercase tracking-[0.18em] text-white/25">
                        Dev Philosophy
                    </span>
                    <div className="flex gap-1">
                        {quotes.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentIndex(idx)}
                                className={`h-1 rounded-full transition-all duration-300 ${
                                    idx === currentIndex
                                        ? "w-4 bg-white/70"
                                        : "w-1 bg-white/20 hover:bg-white/40"
                                }`}
                                aria-label={`Go to quote ${idx + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SoftSkillsAndQuotesHome;