export const createWheelHandler = (
    navigateTo: (index: number) => void,
    currentIndex: number,
    childrenCount: number,
    isScrollingRef: React.RefObject<boolean>
) => {
    let inertiaTimer: ReturnType<typeof setTimeout> | null = null;

    return (e: WheelEvent) => {
        const threshold = 35; // Seuil minimum pour ignorer les micro-mouvements

        // 1. À chaque événement wheel (même d'inertie), on repousse le déverrouillage
        if (inertiaTimer) clearTimeout(inertiaTimer);
        
        inertiaTimer = setTimeout(() => {
            isScrollingRef.current = false;
        }, 250); // Se déverrouille 250ms APRÈS l'arrêt complet des événements du trackpad

        // 2. Si un scroll est déjà verrouillé ou si l'impulsion est trop faible, on sort
        if (isScrollingRef.current || Math.abs(e.deltaY) < threshold) return;

        // 3. On verrouille
        isScrollingRef.current = true;

        const maxIndex = childrenCount - 1;

        if (e.deltaY > 0) {
            navigateTo(Math.min(currentIndex + 1, maxIndex));
        } else {
            navigateTo(Math.max(currentIndex - 1, 0));
        }
    };
};

export const createTouchHandler = (
    navigateTo: (index: number) => void,
    currentIndex: number,
    childrenCount: number,
    touchStartY: React.RefObject<number | null>,
    touchEndY: React.RefObject<number | null>,
    isScrollingRef: React.RefObject<boolean>
) => {

    const handleTouchStart = (e: TouchEvent) => {
        touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
        touchEndY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = () => {
        if (touchStartY.current === null || touchEndY.current === null) return;
        if (isScrollingRef.current) return;

        const distance = touchStartY.current - touchEndY.current;
        const threshold = 50;

        const maxIndex = childrenCount - 1;

        isScrollingRef.current = true;

        setTimeout(() => {
            isScrollingRef.current = false;
        }, 1000);

        if (distance > threshold) {
            navigateTo(Math.min(currentIndex + 1, maxIndex));
        } 
        else if (distance < -threshold) {
            navigateTo(Math.max(currentIndex - 1, 0));
        }

        touchStartY.current = null;
        touchEndY.current = null;
    };

    return {
        handleTouchStart,
        handleTouchMove,
        handleTouchEnd
    };
};