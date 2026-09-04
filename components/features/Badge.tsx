"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ReactNode } from "react";

type Props = {
    title: string;
    icon?: ReactNode;
};

function Badge({ title, icon }: Props) {
    const badgeRef = useRef<HTMLDivElement | null>(null);
    const shineRef = useRef<HTMLDivElement | null>(null);

    useGSAP(() => {
        const tl = gsap.timeline();

        tl.from(badgeRef.current, {
            y: 10,
            scale: 0.85,
            opacity: 0,
            filter: "blur(8px)",
            duration: 0.6,
            ease: "power3.out",
        });

        // shine loop
        gsap.to(shineRef.current, {
            x: "200%",
            duration: gsap.utils.random(2.2, 3.8),
            ease: "power2.inOut",
            repeat: -1,
            yoyo: true,
            repeatDelay: gsap.utils.random(0.8, 2),
        });
    }, []);

    return (
        <div
            ref={badgeRef}
            className="
                relative
                inline-flex
                items-center
                gap-2
                px-4 py-2
                rounded-full
                text-sm font-medium
                text-zinc-100

                bg-zinc-900/40
                backdrop-blur-xl
                border border-white/10

                overflow-hidden
                cursor-default
            "
        >
            {/* ICON */}
            {icon && (
                <span className="text-accent-1 flex items-center">
                    {icon}
                </span>
            )}

            {/* TEXT */}
            <span className="relative z-10">{title}</span>

            {/* SHINE */}
            <div
                ref={shineRef}
                className="
                    absolute
                    top-0
                    left-[-60%]
                    h-full
                    w-[60%]

                    bg-gradient-to-r
                    from-transparent
                    via-white/20
                    to-transparent

                    rotate-12
                    blur-sm
                    opacity-60
                "
            />

            {/* SUBTLE GRADIENT BASE MOVE */}
            <div
                className="
                    absolute inset-0
                    bg-gradient-to-r
                    from-accent-1/10
                    via-transparent
                    to-accent-1/10
                    animate-pulse
                    opacity-40
                "
            />
        </div>
    );
}

export default Badge;