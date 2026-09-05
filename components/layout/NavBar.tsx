"use client"

import { usePageIndexStore } from "@/lib/store/pageIndexStore"; 

const pages = [
    "Home",
    "Work",
    "Contact",
];

const NavBar = () => {

    const { currentIndex, setCurrentIndex } = usePageIndexStore();

    return (
        <nav className="fixed top-2 lg:top-5 left-1/2 z-50 -translate-x-1/2">
            <div className="flex flex-col items-center justify-center">

                <span className="mb-2 text-shadow-[0_0_5px_#FFC9FF] lg:mb-4 text-base lg:text-xl font-anta font-medium uppercase tracking-[0.25em] text-white">
                    {pages[currentIndex]}
                </span>

                <div className="flex items-center gap-2 lg:gap-2">
                    {pages.map((page, index) => (
                        <button
                            key={page}
                            type="button"
                            aria-label={`Aller à ${page}`}
                            onClick={() => setCurrentIndex(index)}
                            className="group flex h-2 w-2 lg:h-3 lg:w-3 items-center justify-center"
                        >
                            <span
                                className={`
                                    h-1 w-1 lg:h-1.5 lg:w-1.5 rounded-full transition-all duration-500
                                    ${
                                        currentIndex === index
                                            ? "scale-150 bg-white"
                                            : "bg-white/40 group-hover:scale-125 group-hover:bg-white/80"
                                    }
                                `}
                            />
                        </button>
                    ))}
                </div>

            </div>
        </nav>
    );
};

export default NavBar;