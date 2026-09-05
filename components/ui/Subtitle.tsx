"use client"

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useRef } from "react";

type SubtitleProps = {
    subtitleContent: string;
};

const Subtitle = ({ subtitleContent }: SubtitleProps) => {

    const subtitleRef = useRef<HTMLParagraphElement | null>(null);

    useGSAP(() => {

        if (!subtitleRef.current) return;

        const split = SplitText.create(subtitleRef.current, {
            type: "words",
        });

        gsap.set(split.words, {
            opacity: 0,
            y: 20,
            filter: "blur(8px)",
        });

        const observer = new IntersectionObserver(
            ([entry]) => {

                if (entry.isIntersecting) {

                    gsap.to(split.words, {
                        opacity: 1,
                        y: 0,
                        filter: "blur(0px)",
                        duration: 0.8,
                        ease: "power3.out",
                        stagger: {
                            each: 0.035,
                        },
                    });

                } else {

                    gsap.set(split.words, {
                        opacity: 0,
                        y: 20,
                        filter: "blur(8px)",
                    });

                }

            },
            {
                threshold: 0.3,
            }
        );

        observer.observe(subtitleRef.current);

        return () => {
            observer.disconnect();
            split.revert();
        };

    }, {
        scope: subtitleRef,
    });

    return (
        <p
            ref={subtitleRef}
            className="max-w-2xl text-center text-sm lg:text-lg leading-relaxed text-text-1 italic"
        >
            {subtitleContent}
        </p>
    );
};

export default Subtitle;
