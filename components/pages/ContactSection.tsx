"use client"

import Subtitle from '../ui/Subtitle';
import { CardContainer } from '../features/FormSVG';
import { useState } from 'react';
import ContactMapCard from '../features/ContactMapCard';
import { CardContainer2 } from '../features/TestFigma2';

const ContactSection = () => {

    const [isForm, setIsForm] = useState<boolean>(false);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        console.log('Form submitted');
    }

    return (
        <section className="relative flex flex-col h-lvh w-full gap-5 items-center overflow-hidden pt-15 lg:pt-20 pb-6 sm:px-8 lg:px-16">
            
            <div className="relative col-span-3 row-span-1 w-full self-center flex justify-center items-center overflow-hidden p-6 text-center"> 
                <Subtitle subtitleContent="HAVE A PROJECT IN MIND? LET'S TALK." /> 
            </div>

            <main className="z-10 min-h-0 w-full h-full max-w-7xl mx-auto lg:aspect-video"> 
                <div className="relative h-full col-span-1 lg:col-span-3 w-full flex flex-col lg:flex-row justify-evenly gap-12 items-center overflow-hidden pt-0 p-12">
                    {/* <ContactForm />
                    <ContactMapCard /> */}
                    {/* <FolderIcon /> */}
                    <CardContainer
                        isClosed={isForm}
                        handleSubmit={handleSubmit}
                        action={
                            <button
                                type={!isForm ? "submit" : "button"}
                                {...(!isForm
                                    ? { form: "contact-form" }
                                    : { onClick: () => {window.innerWidth > 1024 || setIsForm(!isForm)} })}
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
                                <span>{!isForm ? "Send Message" : "Extend"}</span>
                            </button>
                        }
                    />
                    {/* <div className="w-full h-full flex items-center bg-red-400 justify-center p-6" /> */}
                    <CardContainer2 
                        isClosed={isForm} 
                        action={
                            <button
                                onClick={() => {
                                    if (window.innerWidth > 1024) return;
                                    setIsForm(!isForm)}
                                }
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
                                <span>{!isForm ? "Location" : ""}</span> 
                            </button>
                        }   
                    />
                        
                </div>               
            </main>
       </section>
    );
}

export default ContactSection;