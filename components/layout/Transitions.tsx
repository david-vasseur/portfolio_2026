"use client"

import gsap from "gsap";
import { forwardRef, useImperativeHandle, useRef } from "react"

export type TransitionHandle = {
    play: (onMiddle: () => void) => void;
};

const Transitions = forwardRef<TransitionHandle>((_, ref) => {
    const anim1 = useRef<HTMLDivElement | null>(null);
    const anim2 = useRef<HTMLDivElement | null>(null);

    useImperativeHandle(ref, () => ({
        play(onMiddle) {
            const tl = gsap.timeline();

            // 1. fermeture
            tl.to(anim1.current, {
                x: "0%",
                duration: 0.5,
                ease: "power4.inOut",
            })
            .to(anim2.current, {
                x: "0%",
                duration: 0.5,
                ease: "power4.inOut",
            }, "<")

            // 2. switch page
            .call(() => {
                onMiddle();
            })

            // 3. ouverture
            .to(anim1.current, {
                x: "-100%",
                duration: 0.5,
                ease: "power4.inOut",
            })
            .to(anim2.current, {
                x: "100%",
                duration: 0.5,
                ease: "power4.inOut",
            }, "<");
        }
    }));


    return (
        <>
            <div ref={anim1} className="fixed -translate-x-full z-9999 h-lvh w-full bg-linear-to-br from-black to-transparent from-50% to-50%" />
            <div ref={anim2} className="fixed translate-x-full z-9999 h-lvh w-full bg-linear-to-tl from-black to-transparent from-50% to-50%" />
        </>
    )
})

Transitions.displayName = "Transitions";

export default Transitions;