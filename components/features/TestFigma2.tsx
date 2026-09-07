"use client"

import React, { SVGProps, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin';
import { FaGithub, FaLinkedin, FaMailBulk, FaPhoneAlt } from 'react-icons/fa';
import { FaM } from 'react-icons/fa6';
import { Mail } from 'lucide-react';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(useGSAP, MorphSVGPlugin);
}

interface CardContainerProps extends SVGProps<SVGSVGElement> {
    className?: string;
    children?: React.ReactNode;
    action?: React.ReactNode;
    isClosed?: boolean;
    handleSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
}

export function CardContainer2({
    className = "",
    handleSubmit,
    action,
    isClosed = false,
    ...props
}: CardContainerProps) {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const pathRef = useRef<SVGPathElement | null>(null);
    const pathRef1 = useRef<SVGPathElement | null>(null);
    const contentRef = useRef<HTMLDivElement | null>(null);
    const actionRef = useRef<HTMLDivElement | null>(null);

    const CLOSED_PATH ="M150.865 0.5H319.5C328.337 0.5 335.5 7.66344 335.5 16.5V88.5C335.5 97.3366 328.337 104.5 319.5 104.5H16.5C7.66345 104.5 0.5 97.3366 0.5 88.5V50.5C0.5 41.6634 7.66345 34.5 16.5 34.5H95.1351C98.6165 34.5 102.003 33.3645 104.78 31.2659L141.22 3.73412C143.997 1.63546 147.384 0.5 150.865 0.5Z"     
    const OPEN_PATH = "M214.713 37H319.5C328.337 37 335.5 44.1634 335.5 53V423.5C335.5 432.337 328.337 439.5 319.5 439.5H16.5C7.66345 439.5 0.5 432.337 0.5 423.5V16.5C0.5 7.66344 7.66345 0.5 16.5 0.5H141.787C144.549 0.5 147.263 1.21486 149.667 2.57502L206.833 34.925C209.237 36.2851 211.951 37 214.713 37Z"
    useGSAP(() => {
        if (!pathRef.current) return;

        const tl = gsap.timeline({
            defaults: { duration: 0.6, ease: "power3.inOut" }
        });

        // 1. Morph de la forme vectorielle
        tl.to([pathRef.current, pathRef1.current], {
            morphSVG: isClosed ? OPEN_PATH : CLOSED_PATH,
        }, 0);

        // 2. Disparition / Apparition du contenu du formulaire
        if (contentRef.current) {
            tl.to(contentRef.current, {
                opacity: isClosed ? 0 : 1,
                // y: isClosed ? -15 : 0,
                pointerEvents: isClosed ? "none" : "auto",
                duration: 0.3,
            }, 0);
        }

        // 3. Déplacement du bouton d'action vers l'encoche haut-gauche
        if (actionRef.current) {
            tl.to(actionRef.current, {
                top: !isClosed ? "1%" : "93%",
                left: !isClosed ? "5%" : "58%",
            }, 0);
        }

        // 4. Adaptation de la hauteur du conteneur HTML
        if (containerRef.current) {
            tl.to(containerRef.current, {
            aspectRatio: isClosed ? 336 / 440 : 336 / 105,
        }, 0);
        }
    }, { dependencies: [isClosed], scope: containerRef });

    return (
        <div
            ref={containerRef}
            className={`relative w-full max-w-84 lg:max-w-105 2xl:max-w-126  ${className}`}
        >
            <svg
                viewBox={`${!isClosed ? '0 0 336 105' : '0 0 336 440'}`}
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
                {...props}
            >
                <path
                    ref={pathRef}
                    d={OPEN_PATH}
                    fill="url(#radialGradient)"
                />

                <path
                    ref={pathRef1}
                    d={OPEN_PATH}
                    fill="none"
                    stroke="#D6BDBD"
                    strokeOpacity="0.4"
                    filter="url(#folderShadow)"
                />

                <defs>
                    <radialGradient
                        id="radialGradient"
                        cx="0%"
                        cy="20%"
                        r="100%"
                    >
                        <stop
                            offset="10%"
                            stopColor="#5F606A"
                            stopOpacity="0.8"
                        />

                        <stop
                            offset="70%"
                            stopColor="#10B981"
                            stopOpacity="0.15"
                        />

                        <stop
                            offset="100%"
                            stopColor="#171717"
                            stopOpacity="0.1"
                        />
                    </radialGradient>

                    <filter
                        id="folderShadow"
                        x="-50%"
                        y="-50%"
                        width="200%"
                        height="200%"
                        filterUnits="userSpaceOnUse"
                    >
                        <feDropShadow
                            dx="10"
                            dy="10"
                            stdDeviation="6"
                            floodColor="#171717"
                            floodOpacity="1"
                        />
                    </filter>
                </defs>
            </svg>

            {/* Contenu principal */}
            <div
                ref={contentRef}
                className="absolute inset-0 p-4 flex flex-col justify-center z-10"
            >
                <div className="w-full mt-7 flex justify-around items-center gap-4">
                    <FaPhoneAlt className="text-emerald-400 text-2xl sm:text-3xl" />
                    <Mail className="text-emerald-400 text-2xl sm:text-3xl" />
                    <FaGithub className="text-emerald-400 text-2xl sm:text-3xl" />
                    <FaLinkedin className="text-emerald-400 text-2xl sm:text-3xl" />
                </div>
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