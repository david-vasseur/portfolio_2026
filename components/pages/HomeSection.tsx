import HeroHome from "../features/HeroHome";
import ServicesAndWorkHome from "../features/ServiceAndWorkHome";
import TechStackHome from "../features/TechStackHome";

const HomeSection = () => {
    return (
        <section className="relative flex h-lvh w-full items-center justify-center overflow-hidden pt-15 lg:pt-20 pb-20 px-4 sm:px-8 lg:px-16">
            {/* 
              - Mobile : h-full pour occuper l'espace verticalement.
              - Desktop (lg) : 
                1. lg:h-auto pour ne plus forcer 100% de la hauteur.
                2. lg:aspect-[16/10] pour verrouiller le ratio "Dashboard".
                3. lg:max-h-[85vh] pour éviter que ça ne dépasse en haut/bas sur petits écrans.
            */}
            <main className="z-10 min-h-0 grid w-full max-w-7xl h-full lg:aspect-16/10 mx-auto backdrop-blur-lg rounded-4xl p-4 gap-4 grid-cols-1 grid-rows-4 lg:grid-cols-3 lg:grid-rows-4">
                
                <HeroHome />
                
                <TechStackHome />
                
                <ServicesAndWorkHome />
                
            </main>
        </section>
    );
}

export default HomeSection;