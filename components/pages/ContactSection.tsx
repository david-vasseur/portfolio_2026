"use client"

import { ContactForm } from '../features/ContactForm';
import Subtitle from '../ui/Subtitle';
import FolderIcon from '../features/TestSVG';
import { CardContainer } from '../features/FormSVG';
import { Send } from 'lucide-react';
import { useState } from 'react';
import { CardContainer2 } from '../features/TestFigma2';
import ContactMapCard from '../features/ContactMapCard';

const ContactSection = () => {

    const [isForm, setIsForm] = useState<boolean>(false);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Ici, vous pouvez ajouter la logique pour envoyer le formulaire, par exemple via fetch ou axios.
        console.log('Form submitted');
    }

    return (
        <section className="relative flex flex-col h-lvh w-full gap-5 items-center overflow-hidden pt-15 lg:pt-20 pb-6 sm:px-8 lg:px-16">
            
            <div className="relative col-span-3 row-span-1 w-full self-center flex justify-center items-center overflow-hidden p-6 text-center"> 
                <Subtitle subtitleContent="HAVE A PROJECT IN MIND? LET'S TALK." /> 
                <button
                    type="button"
                    onClick={() => setIsForm(!isForm)}
                    className=" bg-emerald-500 text-blue-500 font-bold text-xs sm:text-red-400 rounded-full hover:bg-emerald-600 transition-colors"
                >
                    {isForm ? "Show Map" : "Show Form"}
                </button>
            </div>

            <main className="z-10 min-h-0 w-full h-full max-w-7xl mx-auto lg:aspect-video"> 
                <div className="relative h-full col-span-1 lg:col-span-3 w-full flex flex-col lg:flex-row justify-evenly gap-12 items-center overflow-hidden pt-0 p-12">
                    {/* <ContactForm />
                    <ContactMapCard /> */}
                    {/* <FolderIcon /> */}
                    <CardContainer
                        isClosed={isForm}
                        action={
                            <button
                                type="submit"
                                form="contact-form"
                                className="
                                    flex
                                    items-center
                                    gap-2
                                    px-4
                                    py-2
                                    text-sm
                                    sm:text-base
                                    2xl:text-lg
                                    font-bold
                                    text-white
                                    transition-all
                                    hover:text-emerald-500
                                    active:scale-95
                                    cursor-pointer
                                    whitespace-nowrap
                                "
                            >
                                <span>{!isForm ? "Send Message" : "Deploy Form"}</span>
                                
                            </button>
                        }>
                        <div className="w-full">
                            <h3 className="text-xl font-bold text-white mb-5">Get In Touch</h3>
                            <form
                                id="contact-form"
                                className="space-y-4"
                                onSubmit={handleSubmit}
                            >
                                {/* NOM */}
                                <div className="space-y-1.5">
                                    <label
                                        htmlFor="name"
                                        className="block pl-2 text-xs font-mono uppercase tracking-wider text-slate-300"
                                    >
                                        Name
                                    </label>

                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        placeholder="John Doe"
                                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none backdrop-blur-md transition-all focus:border-emerald-400/80 focus:bg-white/10 focus:ring-1 focus:ring-emerald-400/80"
                                    />
                                </div>

                                {/* EMAIL */}
                                <div className="space-y-1.5">
                                    <label
                                        htmlFor="email"
                                        className="block pl-2 text-xs font-mono uppercase tracking-wider text-slate-300"
                                    >
                                        Email
                                    </label>

                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        placeholder="john@example.com"
                                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none backdrop-blur-md transition-all focus:border-emerald-400/80 focus:bg-white/10 focus:ring-1 focus:ring-emerald-400/80"
                                    />
                                </div>

                                {/* MESSAGE */}
                                <div className="space-y-1.5">
                                    <label
                                        htmlFor="message"
                                        className="block pl-2 text-xs font-mono uppercase tracking-wider text-slate-300"
                                    >
                                        Message
                                    </label>

                                    <textarea
                                        id="message"
                                        name="message"
                                        rows={4}
                                        placeholder="Tell me about your project..."
                                        className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none backdrop-blur-md transition-all focus:border-emerald-400/80 focus:bg-white/10 focus:ring-1 focus:ring-emerald-400/80"
                                    />
                                </div>
                            </form>
                        </div>
                    </CardContainer>
                    {/* <div className="w-full h-full flex items-center bg-red-400 justify-center p-6" /> */}
                    <ContactMapCard />
                        
                </div>               
            </main>
       </section>
    );
}

export default ContactSection;