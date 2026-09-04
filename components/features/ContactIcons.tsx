import React from 'react';
import { IconType } from 'react-icons';

function ContactIcons({ icons, href }: { icons: IconType[], href: string }) {
    return (
        <div className="py-2 flex sm:flex-col gap-4">
            {icons.map((Icon: IconType , index) => (
                <div key={index} className="group z-3">
                    <a href={href} target="_blank" rel="noopener noreferrer">
                        <Icon className="xl:text-[3rem] 2xl:text-[3.5rem] text-[3rem] text-text-1 neon-icons" />
                    </a>
                    <Icon className="xl:text-[3rem] 2xl:text-[3.5rem] text-[3rem] reflect-icons transition-all duration-500 ease-in-out group-hover:scale-[1.05] group-hover:text-text-2" />
                </div>
            ))}
        </div>
    )
}

export default ContactIcons;