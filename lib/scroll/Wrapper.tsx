"use client";


import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { usePageIndexStore } from '../store/pageIndexStore';
import { createTouchHandler, createWheelHandler } from './scrollHandlers';
import Transitions, { TransitionHandle } from '@/components/layout/Transitions';

function Wrapper({ children }: { children: React.ReactNode }) {
    const { currentIndex, setCurrentIndex, hasHydrated } = usePageIndexStore();

    const touchStartY = useRef<number | null>(null);
    const touchEndY = useRef<number | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const isScrollingRef = useRef<boolean>(false);
    const transitionRef = useRef<TransitionHandle | null>(null);

    const pageCount = React.Children.count(children);

    const navigateTo = (index: number) => {
        if (isScrollingRef.current) return;

        const clamped = Math.max(0, Math.min(index, pageCount - 1));

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

    // const handleWheel = useCallback(
    //     createWheelHandler(setCurrentIndex, pageCount, isScrollingRef),
    //     [setCurrentIndex, pageCount]
    // );

    const handleWheel = useCallback(
        (e: WheelEvent) => {
            const maxIndex = pageCount - 1;

            if (e.deltaY > 0) {
                if (currentIndex >= maxIndex) return;
                navigateTo(currentIndex + 1);
            } else {
                if (currentIndex <= 0) return;
                navigateTo(currentIndex - 1);
            }
        },
        [currentIndex, pageCount, navigateTo]
    );

    const { handleTouchStart, handleTouchMove, handleTouchEnd } = useMemo(
        () =>
        createTouchHandler(
            navigateTo,
            currentIndex,
            pageCount,
            touchStartY,
            touchEndY,
            isScrollingRef
        ),
        [currentIndex, pageCount]
    );

    useEffect(() => {
        const node = containerRef.current;
        if (!node || !hasHydrated) return;

        node.addEventListener('wheel', handleWheel, { passive: false });
        node.addEventListener('touchstart', handleTouchStart, { passive: true });
        node.addEventListener('touchmove', handleTouchMove, { passive: true });
        node.addEventListener('touchend', handleTouchEnd, { passive: true });

        return () => {
        node.removeEventListener('wheel', handleWheel);
        node.removeEventListener('touchstart', handleTouchStart);
        node.removeEventListener('touchmove', handleTouchMove);
        node.removeEventListener('touchend', handleTouchEnd);
        };
    }, [handleWheel, hasHydrated]);

    if (!hasHydrated) return null; // ⛔ Bloque le rendu avant hydratation

    return (
        <div id="#wrapper" className="relative max-h-[300lvh]" ref={containerRef}>
            <Transitions ref={transitionRef} />
            <div
                id="#inner"
                className="h-[300lvh] w-screen overflow-x-hidden transition-transform duration-250 ease-in-out overflow-y-hidden"
                style={{ transform: `translateY(-${currentIndex * 100}lvh)` }}
            >
                {children}
            </div>
        </div>
    );
}

export default Wrapper;
