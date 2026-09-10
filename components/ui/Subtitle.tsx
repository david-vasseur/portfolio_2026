"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useRef } from "react";

type SubtitleProps = {
    subtitleContent: string;
};

const Subtitle = ({ subtitleContent }: SubtitleProps) => {
    const subtitleRef = useRef<HTMLParagraphElement | null>(null);

    const match = subtitleContent.match(/^([^.?!]*[.?!])([\s\S]*)$/);
    const firstPart = match ? match[1] : subtitleContent;
    const secondPart = match ? match[2] : "";

    useGSAP(
        () => {
            if (!subtitleRef.current) return;

            let split: SplitText | null = null;
            let observer: IntersectionObserver | null = null;

            // On attend que le navigateur ait fini d'importer toutes les polices
            document.fonts.ready.then(() => {
                if (!subtitleRef.current) return;

                split = new SplitText(subtitleRef.current, {
                    type: "words",
                });

                gsap.set(split.words, {
                    opacity: 0,
                    y: 20,
                    filter: "blur(8px)",
                });

                observer = new IntersectionObserver(
                    ([entry]) => {
                        if (entry.isIntersecting && split) {
                            gsap.to(split.words, {
                                opacity: 1,
                                y: 0,
                                filter: "blur(0px)",
                                duration: 0.8,
                                ease: "power3.out",
                                stagger: { each: 0.035 },
                            });
                        } else if (split) {
                            gsap.set(split.words, {
                                opacity: 0,
                                y: 20,
                                filter: "blur(8px)",
                            });
                        }
                    },
                    { threshold: 0.3 }
                );

                observer.observe(subtitleRef.current);
            });

            return () => {
                if (observer) observer.disconnect();
                if (split) split.revert();
            };
        },
        {
            scope: subtitleRef,
            dependencies: [subtitleContent],
        }
    );

    return (
       <p
            ref={subtitleRef}
            className="max-w-2xl text-center text-sm lg:text-lg leading-relaxed text-text-1 italic"
        >
            {match ? (
                <>
                    {firstPart}
                    <span className="font-bold text-white">{secondPart}</span>
                </>
            ) : (
                subtitleContent
            )}
        </p>
    );
};

export default Subtitle;