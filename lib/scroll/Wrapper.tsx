"use client"

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Observer } from 'gsap/Observer';
import { useGSAP } from '@gsap/react';
import { usePageIndexStore } from '../store/pageIndexStore';
import Transitions, { TransitionHandle } from '@/components/layout/Transitions';

gsap.registerPlugin(Observer);

function Wrapper({ children }: { children: React.ReactNode }) {
    const { currentIndex, setCurrentIndex, hasHydrated } = usePageIndexStore();

    const containerRef = useRef<HTMLDivElement | null>(null);
    const isScrollingRef = useRef<boolean>(false);
    const transitionRef = useRef<TransitionHandle | null>(null);

    // Ref pour maintenir l'index toujours à jour sans détruire l'Observer
    const currentIndexRef = useRef(currentIndex);
    useEffect(() => {
        currentIndexRef.current = currentIndex;
    }, [currentIndex]);

    const pageCount = React.Children.count(children);

    const navigateTo = (newIndex: number) => {
        if (isScrollingRef.current) return;

        const clamped = Math.max(0, Math.min(newIndex, pageCount - 1));
        if (clamped === currentIndexRef.current) return;

        isScrollingRef.current = true;

        transitionRef.current?.play(() => {
            setCurrentIndex(clamped);
        });

        setTimeout(() => {
            isScrollingRef.current = false;
        }, 1200);
    };

    useEffect(() => {
        if (hasHydrated && currentIndex >= pageCount) {
            setCurrentIndex(pageCount - 1);
        }
    }, [hasHydrated, currentIndex, pageCount, setCurrentIndex]);

    // Initialisation UNIQUE de GSAP Observer
    useGSAP(() => {
        if (!hasHydrated || !containerRef.current) return;

        const obs = Observer.create({
            target: containerRef.current,
            type: "wheel,touch",
            tolerance: 30,
            preventDefault: true,
            onDown: () => { // Scroll vers le bas / Swipe vers le haut -> Section suivante
                if (isScrollingRef.current) return;
                if (currentIndexRef.current < pageCount - 1) {
                    navigateTo(currentIndexRef.current + 1);
                }
            },
            onUp: () => { // Scroll vers le haut / Swipe vers le bas -> Section précédente
                if (isScrollingRef.current) return;
                if (currentIndexRef.current > 0) {
                    navigateTo(currentIndexRef.current - 1);
                }
            },
        });

        return () => obs.kill();
    }, { scope: containerRef, dependencies: [hasHydrated, pageCount] }); // Reinstancié uniquement si la page s'hydrate

    if (!hasHydrated) return null;

    return (
        <div id="wrapper" className="relative max-h-[300lvh]" ref={containerRef}>
            <Transitions ref={transitionRef} />
            <div
                id="inner"
                className="h-[300lvh] w-screen overflow-x-hidden transition-transform duration-250 ease-in-out overflow-y-hidden"
                style={{ transform: `translateY(-${currentIndex * 100}lvh)` }}
            >
                {children}
            </div>
        </div>
    );
}

export default Wrapper;