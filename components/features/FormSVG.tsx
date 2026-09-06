"use client"

import React, { SVGProps, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(useGSAP, MorphSVGPlugin);
}

interface CardContainerProps extends SVGProps<SVGSVGElement> {
    className?: string;
    children?: React.ReactNode;
    action?: React.ReactNode;
    isClosed?: boolean;
}

export function CardContainer({
    className = "",
    children,
    action,
    isClosed = false,
    ...props
}: CardContainerProps) {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const pathRef = useRef<SVGPathElement | null>(null);
    const contentRef = useRef<HTMLDivElement | null>(null);
    const actionRef = useRef<HTMLDivElement | null>(null);

    const CLOSED_PATH = "M335.5 78.5V16.5C335.5 7.66344 328.337 0.5 319.5 0.5H167.795C164.357 0.5 161.01 1.60772 158.25 3.65903L121.75 30.791C118.99 32.8423 115.643 33.95 112.205 33.95H16.5C7.66344 33.95 0.5 41.1134 0.5 49.95V78.5C0.5 87.3366 7.66345 94.5 16.5 94.5H176H227H319.5C328.337 94.5 335.5 87.3366 335.5 78.5Z";
    const OPEN_PATH = "M319.5 0.5H16.5C7.66344 0.5 0.5 7.66345 0.5 16.5V379C0.5 387.837 7.66344 395 16.5 395H169.533C173.077 395 176.521 393.824 179.324 391.655L214.176 364.693C216.979 362.524 220.423 361.348 223.967 361.348H319.5C328.337 361.348 335.5 354.184 335.5 345.348V16.5C335.5 7.66344 328.337 0.5 319.5 0.5Z";

    useGSAP(() => {
        if (!pathRef.current) return;

        const tl = gsap.timeline({
            defaults: { duration: 0.6, ease: "power3.inOut" }
        });

        // 1. Morph de la forme vectorielle
        tl.to(pathRef.current, {
            morphSVG: isClosed ? CLOSED_PATH : OPEN_PATH,
        }, 0);

        // 2. Disparition / Apparition du contenu du formulaire
        if (contentRef.current) {
            tl.to(contentRef.current, {
                opacity: isClosed ? 0 : 1,
                y: isClosed ? -15 : 0,
                pointerEvents: isClosed ? "none" : "auto",
                duration: 0.3,
            }, 0);
        }

        // 3. Déplacement du bouton d'action vers l'encoche haut-gauche
        if (actionRef.current) {
            tl.to(actionRef.current, {
                top: isClosed ? "1%" : "93%",
                left: isClosed ? "5%" : "60%",
            }, 0);
        }

        // 4. Adaptation de la hauteur du conteneur HTML
        if (containerRef.current) {
            tl.to(containerRef.current, {
            aspectRatio: isClosed ? 336 / 95 : 336 / 396,
        }, 0);
        }
    }, { dependencies: [isClosed], scope: containerRef });

    return (
        <div
            ref={containerRef}
            className={`relative w-full max-w-[336px] lg:max-w-[420px] 2xl:max-w-[504px]  ${className}`}
        >
            <svg
                viewBox={`${isClosed ? '0 0 336 95' : '0 0 336 396'}`}
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
                {...props}
            >
                <path
                    ref={pathRef}
                    d={OPEN_PATH}
                    fill="url(#paint0_radial_7_32)"
                    stroke="#D6BDBD"
                    strokeOpacity="0.4"
                    filter="url(#folderShadow)"
                />

                <defs>
                    <radialGradient
                        id="paint0_radial_7_32"
                        cx="0"
                        cy="0"
                        r="1"
                        gradientUnits="userSpaceOnUse"
                        gradientTransform="translate(0.5 0.5) rotate(-132.458) scale(302.94 258.692)"
                    >
                        <stop offset="0.063" stopColor="white" stopOpacity="0.2" />
                        <stop offset="0.5" stopColor="#10B981" stopOpacity="0.1" />
                        <stop offset="0.9" stopColor="#171717" stopOpacity="0.2" />
                    </radialGradient>

                    <filter
                        id="folderShadow"
                        x="-30%"
                        y="-30%"
                        width="160%"
                        height="160%"
                        filterUnits="userSpaceOnUse"
                    >
                        <feDropShadow
                            dx="10"
                            dy="10"
                            stdDeviation="12"
                            floodColor="#10B981"
                            floodOpacity="1"
                        />
                    </filter>
                </defs>
            </svg>

            {/* Contenu principal */}
            <div
                ref={contentRef}
                className="absolute inset-0 p-4 flex flex-col justify-between z-10"
            >
                {children}
            </div>

            {/* Bouton d'action */}
            {action && (
                <div
                    ref={actionRef}
                    className="absolute top-[93%] left-[60%] z-20 h-8.5 flex items-center pointer-events-auto"
                >
                    {action}
                </div>
            )}
        </div>
    );
}