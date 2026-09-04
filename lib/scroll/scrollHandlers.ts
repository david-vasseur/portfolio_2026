export const createWheelHandler = (
    navigateTo: (index: number) => void,
    currentIndex: number,
    childrenCount: number,
    isScrollingRef: React.RefObject<boolean>
) => {
    return (e: WheelEvent) => {
        if (isScrollingRef.current) return;

        isScrollingRef.current = true;

        const maxIndex = childrenCount - 1;

        setTimeout(() => {
            isScrollingRef.current = false;
        }, 1000);

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