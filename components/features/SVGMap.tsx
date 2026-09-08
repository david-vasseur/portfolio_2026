"use client";

import React, { SVGProps, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";

if (typeof window !== "undefined") {
    gsap.registerPlugin(useGSAP, MorphSVGPlugin);
}

interface SVGMapProps extends SVGProps<SVGSVGElement> {
    className?: string;
    children?: React.ReactNode;
    action?: React.ReactNode;
    isClosed?: boolean;
    isFinish?: boolean;
    onAnimationComplete?: () => void;
}

export function SVGMap({
    className = "",
    action,
    isClosed = false,
    isFinish = false,
    onAnimationComplete,
    ...props
}: SVGMapProps) {
    const isFirstRender = useRef(true);

    const containerRef = useRef<HTMLDivElement | null>(null);
    const pathRef = useRef<SVGPathElement | null>(null);
    const pathRef1 = useRef<SVGPathElement | null>(null);
    const contentRef = useRef<HTMLDivElement | null>(null);
    const actionRef = useRef<HTMLDivElement | null>(null);

    const CLOSED_PATH = "M150.865 0.5H319.5C328.337 0.5 335.5 7.66344 335.5 16.5V88.5C335.5 97.3366 328.337 104.5 319.5 104.5H16.5C7.66345 104.5 0.5 97.3366 0.5 88.5V50.5C0.5 41.6634 7.66345 34.5 16.5 34.5H95.1351C98.6165 34.5 102.003 33.3645 104.78 31.2659L141.22 3.73412C143.997 1.63546 147.384 0.5 150.865 0.5Z";
    const OPEN_PATH = "M214.713 37H319.5C328.337 37 335.5 44.1634 335.5 53V423.5C335.5 432.337 328.337 439.5 319.5 439.5H16.5C7.66345 439.5 0.5 432.337 0.5 423.5V16.5C0.5 7.66344 7.66345 0.5 16.5 0.5H141.787C144.549 0.5 147.263 1.21486 149.667 2.57502L206.833 34.925C209.237 36.2851 211.951 37 214.713 37Z";

    const OFFSET_Y = 440 - 105; // 335px

    const [svgViewBox, setSvgViewBox] = useState(
        isClosed && isFinish ? "0 0 336 440" : "0 0 336 105"
    );

    useGSAP(
        () => {
            if (
                !pathRef.current ||
                !pathRef1.current ||
                !containerRef.current ||
                !actionRef.current
            ) {
                return;
            }

            if (isClosed && !isFinish) {
                return;
            }

            const shouldExpand = isClosed && isFinish;

            const tl = gsap.timeline({
                onComplete: () => {
                    if (!isFirstRender.current) {
                        onAnimationComplete?.();
                    } else {
                        isFirstRender.current = false;
                    }
                },
            });

            /*
            |--------------------------------------------------------------------------
            | 1. MASQUAGE
            |--------------------------------------------------------------------------
            */
            tl.to(actionRef.current, {
                autoAlpha: 0,
                duration: 0.1,
                ease: "power2.in",
            });

            if (contentRef.current) {
                tl.to(
                    contentRef.current,
                    {
                        autoAlpha: 0,
                        y: shouldExpand ? 15 : -15,
                        duration: 0.2,
                        ease: "power2.in",
                    },
                    "-=0.02"
                );
            }

            /*
            |--------------------------------------------------------------------------
            | 2. MORPHING & LAYOUT
            |--------------------------------------------------------------------------
            */
            if (shouldExpand) {
                tl.call(() => {
                    requestAnimationFrame(() => {
                        if (!containerRef.current) return;

                        // On applique le nouvel aspectRatio et le decalage Y simultanement
                        gsap.set(containerRef.current, {
                            aspectRatio: 336 / 440,
                        });

                        gsap.set([pathRef.current, pathRef1.current], {
                            y: OFFSET_Y,
                        });

                        // Mise à jour du viewBox dans la même frame
                        setSvgViewBox("0 0 336 440");

                        // Lancement de l'animation
                        gsap.to([pathRef.current, pathRef1.current], {
                            morphSVG: OPEN_PATH,
                            y: 0,
                            duration: 0.7,
                            ease: "power3.inOut",
                            onComplete: () => {
                                tl.resume();
                            },
                        });
                    });
                });

                tl.addPause();
            } else {
                // FERMETURE
                tl.to([pathRef.current, pathRef1.current], {
                    morphSVG: CLOSED_PATH,
                    y: OFFSET_Y,
                    duration: 0.7,
                    ease: "power3.inOut",
                });

                tl.call(() => {
                    requestAnimationFrame(() => {
                        if (!containerRef.current) return;

                        gsap.set(containerRef.current, {
                            aspectRatio: 336 / 105,
                        });

                        gsap.set([pathRef.current, pathRef1.current], {
                            y: 0,
                        });

                        setSvgViewBox("0 0 336 105");
                    });
                });
            }

            /*
            |--------------------------------------------------------------------------
            | 3. POSITION BOUTON ET RE-AFFICHAGE
            |--------------------------------------------------------------------------
            */
            tl.set(actionRef.current, {
                top: shouldExpand ? "5%" : "93%",
                left: shouldExpand ? "75%" : "60%",
            });

            tl.to(actionRef.current, {
                autoAlpha: 1,
                duration: 0.1,
                ease: "power2.out",
            });

            if (contentRef.current) {
                tl.to(
                    contentRef.current,
                    {
                        autoAlpha: 1,
                        y: 0,
                        duration: 0.3,
                        ease: "power2.out",
                    },
                    "+=0.05"
                );
            }
        },
        {
            dependencies: [isClosed, isFinish],
            scope: containerRef,
        }
    );

    return (
        <div
            ref={containerRef}
            className={`
                relative
                w-full
                flex
                flex-col
                justify-end
                max-w-[336px]
                lg:max-w-[420px]
                2xl:max-w-[504px]
                ${className}
            `}
        >
            <svg
                viewBox={svgViewBox}
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="
                    absolute
                    inset-0
                    w-full
                    h-full
                    overflow-visible
                    pointer-events-none
                "
                {...props}
            >
                <path
                    ref={pathRef}
                    d={OPEN_PATH}
                    fill="url(#radialGradientMap)"
                />

                <path
                    ref={pathRef1}
                    d={OPEN_PATH}
                    fill="none"
                    stroke="#D6BDBD"
                    strokeOpacity="0.4"
                />

                <defs>
                    <radialGradient
                        id="radialGradientMap"
                        cx="100%"
                        cy="80%"
                        r="100%"
                    >
                        <stop offset="10%" stopColor="#5F606A" stopOpacity="0.8" />
                        <stop offset="70%" stopColor="#10B981" stopOpacity="0.15" />
                        <stop offset="100%" stopColor="#171717" stopOpacity="0.1" />
                    </radialGradient>
                </defs>
            </svg>

            <div
                ref={contentRef}
                className="
                    absolute
                    inset-0
                    p-4
                    flex
                    flex-col
                    justify-between
                    z-10
                "
            >
                <div className="w-full">{/* Contenu de la carte du bas */}</div>
            </div>

            {action && (
                <div
                    ref={actionRef}
                    className="
                        absolute
                        top-[93%]
                        left-[60%]
                        z-20
                        h-8.5
                        flex
                        items-center
                        pointer-events-auto
                    "
                >
                    {action}
                </div>
            )}
        </div>
    );
}