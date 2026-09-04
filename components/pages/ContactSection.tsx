import React from 'react';
import Title from '../ui/Title';
import { Phone } from 'lucide-react';
import MapComponent from '../features/MapComponent';
import ContactMapCard from '../features/ContactMapCard';

const ContactSection = () => {
    return (
       <section className="relative flex h-lvh w-full items-center overflow-hidden pt-15 lg:pt-20 pb-5 px-5 sm:px-12 lg:px-20">
            {/* Mobile : 1 colonne, 3 lignes avec un ratio 3:1:1 (60% / 20% / 20%) */}
            {/* Desktop (lg) : 1 ligne, 3 colonnes de taille égale */}
            <main className="z-10 grid h-full w-full max-w-7xl mx-auto backdrop-blur-lg rounded-4xl py-4 gap-4 grid-cols-1 grid-rows-[1fr_4fr_4fr] lg:grid-cols-3 lg:grid-rows-4">
                
                <div className="relative col-span-3 row-span-1 w-full self-center flex justify-center items-center overflow-hidden p-6">
                    <Title titleContent={["Keep in touch"]} />
                </div>
                <div className="relative col-span-2 lg:col-span-1 row-span-3 w-full h-full self-center flex justify-center items-center overflow-hidden p-6 bg-black/20 rounded-3xl border border-white/10 backdrop-blur-md shadow-lg">
                    <form className='w-full p-4'>
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-sm font-medium text-white/80">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                className="rounded-xl mt-1 block w-full border border-slate-300 bg-zinc-600 py-2 px-3 shadow-sm focus:outline-none focus:ring-blue-500"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-white/80">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                className="rounded-xl mt-1 block w-full border border-slate-300 bg-zinc-600 py-2 px-3 shadow-sm focus:outline-none focus:ring-blue-500"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="message" className="block text-sm font-medium text-white/80">
                                Message
                            </label>
                            <textarea
                                id="message"
                                rows={4}
                                className="rounded-xl mt-1 block w-full border border-slate-300 bg-zinc-600 py-2 px-3 shadow-sm focus:outline-none focus:ring-blue-500"
                            ></textarea>
                        </div>
                        <button 
                            type="submit" 
                            className="w-full shadow-xl shadow-black/40 mt-2 sm:w-auto text-center bg-white/80 text-slate-900 font-medium px-6 py-3 rounded-2xl hover:bg-slate-800 transition-all hover:shadow-lg active:scale-95"
                        >
                            Send Message
                        </button>
                    </form>
                </div>
                <ContactMapCard />
            </main>

        </section>
    );
}

export default ContactSection;
