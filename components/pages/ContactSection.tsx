import ContactMapCard from '../features/ContactMapCard';
import { ContactForm } from '../features/ContactForm';
import Subtitle from '../ui/Subtitle';

const ContactSection = () => {
    return (
        <section className="relative flex flex-col h-svh w-full justify-center items-center overflow-hidden pt-15 lg:pt-20 pb-6 px-4 sm:px-8 lg:px-16">
            
            <div className="relative col-span-3 row-span-1 w-full self-center flex justify-center items-center overflow-hidden p-6 text-center"> 
                <Subtitle subtitleContent="HAVE A PROJECT IN MIND? LET'S TALK." /> 
            </div>

            <main className="z-10 min-h-0 w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-stretch justify-center p-2 sm:p-4 gap-3 sm:gap-4 lg:aspect-video"> 
                <div className="relative gap-2 col-span-1 lg:col-span-3 w-full flex flex-col lg:flex-row justify-center items-center overflow-hidden p-2 lg:p-6 text-left">
                    <ContactForm />
                    <ContactMapCard />
                </div>               
            </main>
       </section>
    );
}

export default ContactSection;