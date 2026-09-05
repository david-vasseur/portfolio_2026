import ContactMapCard from '../features/ContactMapCard';
import { ContactForm } from '../features/ContactForm';
import Subtitle from '../ui/Subtitle';

const ContactSection = () => {
    return (
       <section className="relative flex h-svh w-full items-center overflow-hidden pt-15 lg:pt-20 pb-5 px-5 sm:px-12 lg:px-20">
            {/* Mobile : 1 colonne, 3 lignes avec un ratio 3:1:1 (60% / 20% / 20%) */}
            {/* Desktop (lg) : 1 ligne, 3 colonnes de taille égale */}
            <main className="z-10 grid h-full w-full max-w-7xl mx-auto py-4 gap-4 grid-cols-1 grid-rows-[1fr_4fr_4fr] lg:grid-cols-3 ">
                
                <div className="relative col-span-3 row-span-1 w-full self-center flex justify-center items-center overflow-hidden p-6 text-center"> 
                    <Subtitle subtitleContent="HAVE A PROJECT IN MIND? LET'S TALK." /> 
                </div>
                <ContactForm />
                <ContactMapCard />
            </main>

        </section>
    );
}

export default ContactSection;
