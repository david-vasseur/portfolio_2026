"use client";

import React, { SVGProps, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";

if (typeof window !== "undefined") {
    gsap.registerPlugin(useGSAP, MorphSVGPlugin);
}

interface CardContainerProps extends SVGProps<SVGSVGElement> {
    className?: string;
    children?: React.ReactNode;
    action?: React.ReactNode;
    isClosed?: boolean;
    handleSubmit?: (
        event: React.FormEvent<HTMLFormElement>
    ) => void;
    onAnimationComplete?: () => void;
}

export function CardContainer({
    className = "",
    handleSubmit,
    action,
    isClosed = false,
    onAnimationComplete,
    ...props
}: CardContainerProps) {

    const isFirstRender = useRef(true);

    const containerRef = useRef<HTMLDivElement | null>(null);

    const pathRef = useRef<SVGPathElement | null>(null);
    const pathRef1 = useRef<SVGPathElement | null>(null);

    const contentRef = useRef<HTMLDivElement | null>(null);
    const actionRef = useRef<HTMLDivElement | null>(null);

    /*
    |--------------------------------------------------------------------------
    | PATHS
    |--------------------------------------------------------------------------
    |
    | Les deux commencent exactement au même endroit :
    |
    | M335.5 16.5
    |
    | Toute la partie haute reste donc commune.
    |
    */

    const OPEN_PATH = `
        M335.5 16.5
        C335.5 7.66344 328.337 0.5 319.5 0.5
        H175.5
        H130.5
        H16.5
        C7.66344 0.5 0.5 7.66343 0.5 16.5
        V379.5
        C0.5 388.337 7.66345 395.5 16.5 395.5
        H170.01
        C173.568 395.5 177.025 394.314 179.833 392.13
        L216.167 363.87
        C218.975 361.686 222.432 360.5 225.99 360.5
        H319.5
        C328.337 360.5 335.5 353.337 335.5 344.5
        V16.5
        Z
    `;

    const CLOSED_PATH = `
        M335.5 16.5
        C335.5 7.66344 328.337 0.5 319.5 0.5
        H175.5
        H130.5
        H16.5
        C7.66344 0.5 0.5 7.66344 0.5 16.5
        V44.5
        C0.5 53.3366 7.66345 60.5 16.5 60.5
        H175.5
        H220.5
        H319.5
        C328.337 60.5 335.5 53.3366 335.5 44.5
        V16.5
        Z
    `;

    /*
    |--------------------------------------------------------------------------
    | VIEWBOX
    |--------------------------------------------------------------------------
    |
    | On le découple du state React.
    | Il ne change qu'au moment décidé par la timeline.
    |
    */

    const [svgViewBox, setSvgViewBox] = useState(
        isClosed
            ? "0 0 336 61"
            : "0 0 336 396"
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

            const tl = gsap.timeline({
                onComplete: () => {
                // Si ce n'est pas le montage initial, on prévient le parent
                if (!isFirstRender.current) {
                    onAnimationComplete?.();
                } else {
                    isFirstRender.current = false; // On passe le flag à false après l'entrée
                }
            },
            });

            /*
            |--------------------------------------------------------------------------
            | 1. ON EFFACE
            |--------------------------------------------------------------------------
            */

            tl.to(
                actionRef.current,
                {
                    autoAlpha: 0,
                    duration: 0.1,
                    ease: "power2.in",
                }
            );

            if (contentRef.current) {
                tl.to(
                    contentRef.current,
                    {
                        autoAlpha: 0,
                        y: isClosed ? -15 : 15,
                        duration: 0.2,
                        ease: "power2.in",
                    },
                    "-=0.02"
                );
            }

            /*
            |--------------------------------------------------------------------------
            | 2. MORPH
            |--------------------------------------------------------------------------
            |
            | Le SVG garde temporairement son ancien viewBox.
            |
            | On ne touche PAS au layout ici.
            |
            */

if (!isClosed) {
    tl.call(() => {
        setSvgViewBox("0 0 336 396");

        requestAnimationFrame(() => {
            if (!containerRef.current) return;

            gsap.set(containerRef.current, {
                aspectRatio: 336 / 396,
            });

            gsap.to(
                [pathRef.current, pathRef1.current],
                {
                    morphSVG: OPEN_PATH,
                    duration: 0.7,
                    ease: "power3.inOut",
                    onComplete: () => {
                        tl.resume();
                    },
                }
            );
        });
    });

    // Bloque la timeline jusqu'à la fin du morph
    tl.addPause();


            } else {
                // ---------------------------------------------------------------
                // FERMETURE
                // ---------------------------------------------------------------
                //
                // On fait d'abord le morph dans le grand viewport.
                //
                // Puis seulement après, on réduit le layout.
                //

                tl.to(
                    [pathRef.current, pathRef1.current],
                    {
                        morphSVG: CLOSED_PATH,
                        duration: 0.7,
                        ease: "power3.inOut",
                    }
                );

                // tl.call(() => {
                //     setSvgViewBox("0 0 336 61");
                // });

                // tl.to(
                //     containerRef.current,
                //     {
                //         aspectRatio: 336 / 61,
                //         duration: 0,
                //         ease: "power3.inOut",
                //     }, "+=0.005"
                // );

                tl.call(() => {
                    setSvgViewBox("0 0 336 61");
                });

                tl.call(() => {
                    requestAnimationFrame(() => {
                        if (!containerRef.current) return;

                        gsap.set(containerRef.current, {
                            aspectRatio: 336 / 61,
                        });
                    });
                });
            }

            /*
            |--------------------------------------------------------------------------
            | 3. POSITION DU BOUTON
            |--------------------------------------------------------------------------
            */

            tl.set(actionRef.current, {
                top: isClosed ? "25%" : "93%",
                left: isClosed ? "25%" : "58%",
            });

            /*
            |--------------------------------------------------------------------------
            | 4. ON RALLUME
            |--------------------------------------------------------------------------
            */

            tl.to(
                actionRef.current,
                {
                    autoAlpha: 1,
                    duration: 0.1,
                    ease: "power2.out",
                }
            );

            if (!isClosed && contentRef.current) {
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
            dependencies: [isClosed],
            scope: containerRef,
        }
    );

    return (
        <div
            ref={containerRef}
            style={{ aspectRatio: '336 / 396' }}
            className={`
                relative
                w-full
                flex
                flex-col
                justify-start
                ${className}
            `}
        >
            {/* ================================================================= */}
            {/* SVG                                                               */}
            {/* ================================================================= */}

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
                {/* ============================================================= */}
                {/* FILL                                                          */}
                {/* ============================================================= */}

                <path
                    ref={pathRef}
                    d={OPEN_PATH}
                    fill="url(#radialGradient)"
                />

                {/* ============================================================= */}
                {/* STROKE                                                        */}
                {/* ============================================================= */}

                <path
                    ref={pathRef1}
                    d={OPEN_PATH}
                    fill="none"
                    stroke="#D6BDBD"
                    strokeOpacity="0.4"
                />


                {/* ============================================================= */}
                {/* DEFS                                                          */}
                {/* ============================================================= */}

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
                </defs>
            </svg>

            {/* ================================================================= */}
            {/* CONTENT                                                           */}
            {/* ================================================================= */}

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
                    h-full
                    aspect-336/396
                "
            >
                <div className="w-full">
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-5">
                        Get In Touch
                    </h3>

                    <form
                        id="contact-form"
                        className="space-y-4"
                        onSubmit={handleSubmit}
                    >
                        {/* NOM */}
                        <div className="space-y-1.5 sm:space-y-1">
                            <label
                                htmlFor="name"
                                className="
                                    block
                                    pl-2
                                    text-xs
                                    font-mono
                                    uppercase
                                    tracking-wider
                                    text-slate-300
                                "
                            >
                                Name
                            </label>

                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="John Doe"
                                className="
                                    w-full
                                    rounded-xl
                                    border
                                    border-white/10
                                    bg-white/5
                                    px-4
                                    py-2
                                    sm:py-2.5
                                    text-xs
                                    sm:text-sm
                                    text-white
                                    placeholder-slate-500
                                    outline-none
                                    backdrop-blur-md
                                    transition-all
                                    focus:border-emerald-400/80
                                    focus:bg-white/10
                                    focus:ring-1
                                    focus:ring-emerald-400/80
                                "
                            />
                        </div>

                        {/* EMAIL */}
                        <div className="space-y-1.5 sm:space-y-1">
                            <label
                                htmlFor="email"
                                className="
                                    block
                                    pl-2
                                    text-xs
                                    font-mono
                                    uppercase
                                    tracking-wider
                                    text-slate-300
                                "
                            >
                                Email
                            </label>

                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="john@example.com"
                                className="
                                    w-full
                                    rounded-xl
                                    border
                                    border-white/10
                                    bg-white/5
                                    px-4
                                    py-2
                                    sm:py-2.5
                                    text-xs
                                    sm:text-sm
                                    text-white
                                    placeholder-slate-500
                                    outline-none
                                    backdrop-blur-md
                                    transition-all
                                    focus:border-emerald-400/80
                                    focus:bg-white/10
                                    focus:ring-1
                                    focus:ring-emerald-400/80
                                "
                            />
                        </div>

                        {/* MESSAGE */}
                        <div className="space-y-1.5 sm:space-y-1">
                            <label
                                htmlFor="message"
                                className="
                                    block
                                    pl-2
                                    text-xs
                                    font-mono
                                    uppercase
                                    tracking-wider
                                    text-slate-300
                                "
                            >
                                Message
                            </label>

                            <textarea
                                id="message"
                                name="message"
                                rows={4}
                                placeholder="Tell me about your project..."
                                className="
                                    w-full
                                    h-12
                                    min-[390px]:h-20
                                    sm:h-28
                                    resize-none
                                    rounded-xl
                                    border
                                    border-white/10
                                    bg-white/5
                                    px-4
                                    py-2
                                    sm:py-2.5
                                    text-xs
                                    sm:text-sm
                                    text-white
                                    placeholder-slate-500
                                    outline-none
                                    backdrop-blur-md
                                    transition-all
                                    focus:border-emerald-400/80
                                    focus:bg-white/10
                                    focus:ring-1
                                    focus:ring-emerald-400/80
                                "
                            />
                        </div>
                    </form>
                </div>
            </div>

            {/* ================================================================= */}
            {/* ACTION                                                            */}
            {/* ================================================================= */}

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