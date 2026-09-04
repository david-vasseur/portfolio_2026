import HeroHome from "../features/HeroHome";
import ServicesAndWorkHome from "../features/ServiceAndWorkHome";
import TechStackHome from "../features/TechStackHome";

const TemplateHome = () => {
    return (
        <section className="relative flex h-lvh w-full items-center overflow-hidden pt-15 lg:pt-20 pb-5 px-5 sm:px-12 lg:px-20">
            {/* Mobile : 1 colonne, 3 lignes avec un ratio 3:1:1 (60% / 20% / 20%) */}
            {/* Desktop (lg) : 1 ligne, 3 colonnes de taille égale */}
            <main className="z-10 grid h-full w-full max-w-7xl mx-auto backdrop-blur-lg rounded-4xl py-4 gap-4 grid-cols-1 grid-rows-[3fr_1fr_1fr] lg:grid-cols-3 lg:grid-rows-4">
                
                <HeroHome />
                
                <TechStackHome />
                
                <ServicesAndWorkHome />
                
            </main>
        </section>
    );
}

export default TemplateHome;