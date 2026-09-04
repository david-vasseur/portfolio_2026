"use client"

import { usePageIndexStore } from '@/lib/store/pageIndexStore';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Link from 'next/link';
import { useRef } from 'react'

function BadgeHire({ title }: { title: string }) {

    const { currentIndex } = usePageIndexStore();
    const tl = useRef<gsap.core.Timeline | null>(null);
    const badgeRef = useRef<HTMLAnchorElement | null>(null);
    const shineRef = useRef<HTMLDivElement | null>(null);

    useGSAP(() => {

        tl.current = gsap.timeline({
            paused: true,
            defaults: {
                delay: 0.5,
                duration: 0.4,
                ease: "power3.out",
            },
        });

        tl.current.fromTo(
            badgeRef.current,
            {
                opacity: 0,
                scale: 0.1,
                filter: "blur(6px)",
            },
            {
                opacity: 1,
                scale: 1,
                filter: "blur(0px)",
            }
        ) 
    }, { scope: badgeRef });

    useGSAP(() => {
        if (!badgeRef.current) return;

        gsap.to(badgeRef.current, {
            y: "random(-3,3)",
            x: "random(-1,1)",
            rotation: "random(-0.4,0.4)",
            duration: "random(2,4)",
            ease: "sine.inOut",
            repeat: -1,
            repeatRefresh: true,
            yoyo: true,
        });
    });

    useGSAP(() => {
        if (!tl.current) return;

        if (currentIndex === 0) {
            tl.current.play();
        } else {
            tl.current.reverse();
        }
    }, { dependencies: [currentIndex] });


    useGSAP(() => {
        if (!shineRef.current) return;

        const animateShine = () => {
            const duration = gsap.utils.random(0.8, 2.2);
            const delay = gsap.utils.random(1.5, 6);

            // 🎯 direction aléatoire
            const fromLeft = Math.random() > 0.3;

            const startX = fromLeft ? -120 : 240;
            const endX = fromLeft ? 240 : -120;

            const rotate = fromLeft
                ? gsap.utils.random(10, 22)
                : gsap.utils.random(-22, -10);

            const tl = gsap.timeline({
                onComplete: () => {
                    gsap.delayedCall(delay, animateShine);
                },
            });

            // reset position
            gsap.set(shineRef.current, {
                x: startX,
                opacity: 0,
                rotate,
            });

            // apparition légère
            tl.to(shineRef.current, {
                opacity: gsap.utils.random(0.4, 0.8),
                duration: 0.15,
                ease: "power2.out",
            });

            // traverse le badge
            tl.to(
                shineRef.current,
                {
                    x: endX,
                    duration,
                    ease: gsap.utils.random([
                        "expo.in",
                        "expo.inOut",
                        "power4.in",
                        "power3.inOut",
                    ]),
                },
                0
            );

            // fade out légèrement avant la fin
            tl.to(
                shineRef.current,
                {
                    opacity: 0,
                    duration: 0.25,
                },
                "-=0.2"
            );
        };

        animateShine();
    }, []);

    return (
        <Link href={"#"} ref={badgeRef} className={`relative overflow-hidden inline-flex w-fit px-3 py-2 mb-10 rounded-full border text-sm `}>
            {title}
            <div
                ref={shineRef}
                className="
                    absolute
                    top-[-20%]
                    left-0
                    h-[140%]
                    w-8
                    rotate-12
                    bg-white/30
                    blur-sm
                    pointer-events-none
                "
            />
        </Link>
    )
}

export default BadgeHire;