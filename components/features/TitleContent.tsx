"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { usePageIndexStore } from "@/lib/store/pageIndexStore";
import BadgeHire from "./BadgeHire";

function HeroContent() {

    const { currentIndex } = usePageIndexStore();
    const containerRef = useRef<HTMLDivElement | null>(null);
    const tl = useRef<gsap.core.Timeline | null>(null);

    useGSAP(() => {
        tl.current = gsap.timeline();

        tl.current.from(".hero-title", {
            y: 40,
            opacity: 0,
            delay: 0.4,
            duration: 1,
            ease: "power3.out",
        })
        .from(
            ".hero-subtitle",
            {
                y: 20,
                opacity: 0,
                duration: 0.8,
            },
            "-=0.6"
        )
        .from(
            ".hero-buttons",
            {
                y: 20,
                opacity: 0,                
                duration: 0.8,
                stagger: 0.1,
            },
            "-=0.4"
        );
    }, { scope: containerRef });


    useGSAP(() => {
        if (!tl.current) return;

        if (currentIndex === 0) {
            tl.current.play();
        } else {
            tl.current.reverse();
        }
    }, { dependencies: [currentIndex] });


    return (
        <div
            ref={containerRef}
            className="
                flex flex-col
                justify-center
                gap-6
                w-[50%]
                ml-5
            "
        >
            {/* TITLE */}
            <h1 className="hero-title text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-bold leading-tight">
                Hi, I'm David
                <br />
                <span className="text-accent-1">
                    MERN Developer
                </span>
            </h1>

            {/* STORY */}
            <div className="flex gap-5">
                <BadgeHire title={"Story"}  />
                <BadgeHire title={"Event"}  />
                <BadgeHire title={"Test"}  />
            </div>

            {/* SUBTITLE */}
            <p className="hero-subtitle text-sm sm:text-base md:text-lg text-zinc-400 leading-relaxed">
                I build modern, performant web applications with React,
                Next.js, Node.js and MongoDB. Passionate about clean
                architecture, scalable systems and crafting engaging user
                experiences.
            </p>

            {/* BUTTONS */}
            <div className="hero-buttons flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
                <button
                    className="
                        px-6 py-3
                        rounded-xl
                        bg-accent-1
                        font-semibold
                        transition-all duration-300
                        hover:scale-105
                        active:scale-95
                    "
                >
                    Hire Me
                </button>

                <button
                    className="
                        px-6 py-3
                        rounded-xl
                        border border-zinc-600
                        text-zinc-200
                        transition-all duration-300
                        hover:scale-105
                        hover:border-accent-1
                        active:scale-95
                    "
                >
                    Download CV
                </button>
            </div>
        </div>
    );
}

export default HeroContent;