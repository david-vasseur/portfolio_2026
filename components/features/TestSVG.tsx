
"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import { useRef, useState } from "react";

gsap.registerPlugin(MorphSVGPlugin);

const CLOSED_PATH =
    "M113.5 80.5H4.5C2.29086 80.5 0.5 78.7091 0.5 76.5V15C0.5 12.7909 2.29086 11 4.5 11H67.0308C69.0214 11 70.7091 9.53628 70.9906 7.56568L71.5094 3.93431C71.7909 1.96372 73.4786 0.5 75.4692 0.5H113.5C115.709 0.5 117.5 2.29086 117.5 4.5V76.5C117.5 78.7091 115.709 80.5 113.5 80.5Z";

const OPEN_PATH =
    "M113.5 80.5H4.5C2.29086 80.5 0.5 78.7091 0.5 76.5V4.5C0.5 2.29086 2.29086 0.5 4.5 0.5H35C37.2091 0.5 39 2.29086 39 4.5V7C39 9.20914 40.7909 11 43 11H113.5C115.709 11 117.5 12.7909 117.5 15V76.5C117.5 78.7091 115.709 80.5 113.5 80.5Z";

const CLOSED_CONTENT = {
    label: "01",
    title: "About me",
    description:
        "Full-stack developer focused on modern web applications, clean architecture and refined digital experiences.",
};

const OPEN_CONTENT = {
    label: "01",
    title: "Let's build something",
    description:
        "Have a project in mind? Let's create something fast, scalable and beautifully crafted.",
};

export default function FolderCard() {
    const pathRef = useRef<SVGPathElement | null>(null);
    const contentRef = useRef<HTMLDivElement | null>(null);

    const [isOpen, setIsOpen] = useState(false);

    useGSAP(() => {
        if (!pathRef.current) return;

        gsap.set(pathRef.current, {
            morphSVG: CLOSED_PATH,
        });
    }, []);

    const toggle = () => {
        if (!pathRef.current || !contentRef.current) return;

        const nextState = !isOpen;

        const tl = gsap.timeline();

        // Morph du dossier
        tl.to(pathRef.current, {
            morphSVG: nextState ? OPEN_PATH : CLOSED_PATH,
            duration: 0.8,
            ease: "power3.inOut",
        });

        // Petit fade du contenu
        tl.to(
            contentRef.current,
            {
                opacity: 0,
                y: 8,
                duration: 0.2,
                ease: "power2.in",
            },
            0
        );

        tl.set(contentRef.current, {
            y: -8,
        });

        tl.to(contentRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.35,
            ease: "power2.out",
        });

        setIsOpen(nextState);
    };

    const content = isOpen ? OPEN_CONTENT : CLOSED_CONTENT;

    return (
        <button
            type="button"
            onClick={toggle}
            className="relative block w-100 text-left"
        >
            {/* SVG background */}
            <svg
                viewBox="-10 -10 138 101"
                className="absolute inset-0 h-full w-full overflow-visible"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <linearGradient
                        id="folderGradient"
                        x1="0"
                        y1="0"
                        x2="118"
                        y2="81"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop offset="0%" stopColor="#fce7f3" />
                        <stop offset="100%" stopColor="#f9a8d4" />
                    </linearGradient>

                    <filter
                        id="folderShadow"
                        x="-20%"
                        y="-20%"
                        width="140%"
                        height="160%"
                    >
                        <feDropShadow
                        dx="5"
                        dy="8"
                        stdDeviation="6"
                        floodColor="#5F606A"
                        floodOpacity="0.9"
                    />
                        </filter>
                </defs>

                <path
                    ref={pathRef}
                    d={CLOSED_PATH}
                    fill="url(#folderGradient)"
                    stroke="white"
                    strokeWidth="0.8"
                    filter="url(#folderShadow)"
                />
            </svg>

            {/* HTML content */}
            <div
                ref={contentRef}
                className="relative flex min-h-[275px] flex-col justify-center p-12"
            >
                <span className="mb-4 text-sm tracking-[0.2em] text-black/50">
                    {content.label}
                </span>

                <h2 className="text-4xl font-medium tracking-tight text-black">
                    {content.title}
                </h2>

                <p className="mt-4 max-w-sm text-sm leading-relaxed text-black/70">
                    {content.description}
                </p>

                <span className="mt-8 text-xs uppercase tracking-[0.2em] text-black/50">
                    {isOpen ? "Close" : "Open"}
                </span>
            </div>
        </button>
    );
}
