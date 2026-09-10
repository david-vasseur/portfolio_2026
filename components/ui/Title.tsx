"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import React, { useRef } from "react";

type TitleProps = {
    titleContent: string[];
};

const Title = ({ titleContent }: TitleProps) => {
    const titleRef = useRef<HTMLHeadingElement | null>(null);

    useGSAP(
        () => {
            if (!titleRef.current) return;

            let split: SplitText | null = null;
            let observer: IntersectionObserver | null = null;

            // 1. Attente du chargement complet des web fonts
            document.fonts.ready.then(() => {
                if (!titleRef.current) return;

                split = new SplitText(titleRef.current, {
                    type: "chars",
                });

                gsap.set(split.chars, {
                    yPercent: 150,
                    rotation: 8,
                    skewY: 12,
                    scaleY: 1.4,
                    opacity: 0,
                });

                observer = new IntersectionObserver(
                    ([entry]) => {
                        if (entry.isIntersecting && split) {
                            gsap.to(split.chars, {
                                yPercent: 0,
                                rotation: 0,
                                skewY: 0,
                                scaleY: 1,
                                opacity: 1,
                                duration: 1.1,
                                ease: "power4.out",
                                stagger: {
                                    each: 0.025,
                                },
                            });
                        } else if (split) {
                            gsap.set(split.chars, {
                                yPercent: 150,
                                rotation: 8,
                                skewY: 12,
                                scaleY: 1.4,
                                opacity: 0,
                            });
                        }
                    },
                    {
                        threshold: 0.2,
                    }
                );

                observer.observe(titleRef.current);
            });

            // 2. Nettoyage lors du démontage ou du re-render
            return () => {
                if (observer) observer.disconnect();
                if (split) split.revert();
            };
        },
        {
            scope: titleRef,
            dependencies: [titleContent],
        }
    );

    return (
        <h1 className="text-center sm:text-left" ref={titleRef}>
            {titleContent.map((span, index) => (
                <React.Fragment key={index}>
                    <span className="text-black text-shadow-[0_0_5px_#5F606A] inline-block h-[2em] sm:h-[3em] lg:h-[5em] xl:h-[6em] overflow-hidden align-bottom">
                        <span className="text-4xl sm:text-5xl font-anta lg:text-7xl xl:text-8xl font-bold">
                            {span}
                        </span>
                    </span>

                    {/* Gestion du retour à la ligne et de l'espace en CSS pur (sans window.innerWidth) */}
                    {index < titleContent.length - 1 && (
                        <>
                            <br className="hidden lg:block" />
                            <span className="inline-block w-2 lg:hidden" />
                        </>
                    )}
                </React.Fragment>
            ))}
        </h1>
    );
};

export default Title;