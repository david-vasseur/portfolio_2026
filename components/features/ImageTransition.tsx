"use client"

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { usePageIndexStore } from "@/lib/store/pageIndexStore";

const GRID_SIZE = 10;

function ImageTransition({ src, size = 320 }: { src: string, size?: string | number}) {
    const containerRef = useRef(null);
    const shadowRef = useRef<HTMLDivElement | null>(null);
    const tl = useRef<gsap.core.Timeline | null>(null);
    const { currentIndex } = usePageIndexStore();
    const tiles = Array.from({ length: GRID_SIZE * GRID_SIZE });


    useGSAP(() => {
        const tiles = gsap.utils.toArray(".img-tile");

        gsap.set(shadowRef.current, {
            opacity: 0,
            x: 0,
            y: 0,
            scale: 1,
        });

        tl.current = gsap.timeline({
            paused: true,
            defaults: {
                delay: 0.4,
                duration: 1.5,
                ease: "power3.out",
            },
        });

        tl.current.fromTo(
            tiles,
            {
            rotateY: 90,
            opacity: 0,
            scale: 0.8,
            filter: "blur(6px)",
            },
            {
            rotateY: 0,
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            stagger: {
                amount: 0.6,
                from: "edges",
                grid: [GRID_SIZE, GRID_SIZE],
            },
            }
        );

        tl.current.to(
            shadowRef.current,
            {
                opacity: 0.25,
                duration: 0.4,
                ease: "power2.out",
            },
            ">-0.2"
        );

        tl.current.to(shadowRef.current, {
            x: "5%",
            y: "5%",
            duration: 1.2,
            ease: "power3.out",
        }
    );

    }, { scope: containerRef });

    useGSAP(() => {
        if (!tl.current) return;

        if (currentIndex === 0) {
            tl.current.play();
        } else {
            tl.current.reverse();
        }
    }, { dependencies: [currentIndex] });

    

    return (
        <div
            ref={containerRef}
            className="relative grid gap-0.5"
            style={{
                width: size,
                aspectRatio: "1 / 1",
                gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
                gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)`,
                perspective: "1000px",
            }}
        >
            <div ref={shadowRef} className="absolute z-0 inset-0 bg-black" />
            {/* <div className="absolute z-2 inset-0 bg-linear-to-r from-black/20 via-black/90 to-black/20 from-2% via-25% to-95%" /> */}
            {tiles.map((_, i) => {
                const row = Math.floor(i / GRID_SIZE);
                const col = i % GRID_SIZE;

                return (
                    <div key={i} className="overflow-hidden w-full h-full">
                        <div
                        className="
                            img-tile
                            w-full h-full
                            bg-no-repeat
                            will-change-transform
                            rounded-xs
                        "
                        style={{
                            backgroundImage: `url(${src})`,
                            backgroundSize: `${GRID_SIZE * 100}% ${GRID_SIZE * 100}%`,
                            backgroundPosition: `
                            ${(col / (GRID_SIZE - 1)) * 100}%
                            ${(row / (GRID_SIZE - 1)) * 100}%
                            `,
                            transformStyle: "preserve-3d",
                        }}
                        />
                    </div>
                );
            })}
        </div>
    );
}

export default ImageTransition;