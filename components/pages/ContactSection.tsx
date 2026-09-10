"use client"

import Subtitle from '../ui/Subtitle';
import { CardContainer } from '../features/FormSVG';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import MapComponent from '../features/MapComponent';



const ContactSection = () => {

    const Map = dynamic(() => import('@/components/layout/MapContainer'), { ssr: false });

    const [isForm, setIsForm] = useState<boolean>(false);
    const [delayedIsForm, setDelayedIsForm] = useState<boolean>(isForm);
    const [isAnimationStep1Finish, setIsAnimationStep1Finish] = useState<boolean>(false);
    const [isAnimationStep2Finish, setIsAnimationStep2Finish] = useState<boolean>(false);
    console.log(isAnimationStep1Finish ? "animation step1 fini" : "Animation step1 à 0");
    console.log(isAnimationStep2Finish ? "animation step2 fini" : "Animation step2 à 0");
    console.log("le formulaire est en place: ", isForm)
    
    
    useEffect(() => {
        const timer = setTimeout(() => {
            setDelayedIsForm(isForm);
        }, 500);

        return () => clearTimeout(timer);
    }, [isForm]);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        console.log('Form submitted');
    }

    return (
        <section className="relative flex flex-col h-lvh w-full gap-5 items-center overflow-hidden pt-15 lg:pt-20 pb-6 sm:px-8 lg:px-16">
            
            <div className="relative col-span-3 row-span-1 w-full self-center flex justify-center items-center overflow-hidden p-6 text-center"> 
                <Subtitle subtitleContent="HAVE A PROJECT IN MIND? LET'S TALK" /> 
                {/* <button
                    type="button"
                    onClick={() => {
                        if (window.innerWidth > 1024) return;
                        setIsForm(!isForm)}
                    }
                    className=" bg-emerald-500 text-blue-500 font-bold text-xs sm:text-red-400 rounded-full hover:bg-emerald-600 transition-colors"
                >
                    {isForm ? "Show Map" : "Show Form"}
                </button> */}
            </div>

            <main className="z-1 min-h-0 h-full gap-5 lg:gap-20 w-full max-w-7xl mx-auto px-6 pb-12 overflow-hidden flex flex-col items-center justify-between lg:flex-row lg:aspect-16/10">
                    <CardContainer
                        isClosed={isForm}
                        handleSubmit={handleSubmit}
                        onAnimationComplete={() => setIsAnimationStep1Finish(true)}
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
                                <span>{!delayedIsForm ? "Send Message" : "Click to Expand"}</span>
                            </button>
                        }
                    />
                    {/* <div className="w-full h-full flex items-center bg-red-400 justify-center p-6" /> */}
                    <MapComponent isForm={isForm} animationFinish={isAnimationStep1Finish} />    
            </main>
       </section>
    );
}

export default ContactSection;