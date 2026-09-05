"use client"

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import React, { useRef } from "react";

type TitleProps = {
    titleContent: string[]
}

const Title = ({ titleContent }: TitleProps) => {

    const titleRef = useRef<HTMLHeadingElement | null>(null);

    useGSAP(() => {

        const split = SplitText.create(titleRef.current, {
            type: "chars"
        });

        gsap.set(split.chars, {
            yPercent: 150,
            rotation: 8,
            skewY: 12,
            scaleY: 1.4,
            opacity: 0,
        });

        const observer = new IntersectionObserver(
            ([entry]) => {

                if (entry.isIntersecting) {

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

                } else {

                    // On remet le titre dans son état initial
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

        if (titleRef.current) {
            observer.observe(titleRef.current);
        }

        return () => {
            observer.disconnect();
            split.revert();
        };

    }, {
        scope: titleRef,
    });

    return (
        <h1 ref={titleRef}>
            {titleContent.map((span, index) => (
                <React.Fragment key={index}>
                    <span className="text-black text-shadow-[0_0_5px_#5F606A] inline-block h-[2em] lg:h-[5em] xl:h-[6em] overflow-hidden align-bottom">
                        <span className="text-3xl font-anta lg:text-7xl xl:text-8xl font-bold">
                            {span}
                        </span>
                    </span>

                    {index < titleContent.length - 1 && window.innerWidth >= 1024 &&  <br />}
                    {window.innerWidth < 1024 && index < titleContent.length - 1 && <span className="inline-block w-2" />}
                </React.Fragment>
            ))}
        </h1>
    );
}

export default Title;