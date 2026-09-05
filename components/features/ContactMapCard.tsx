import React from 'react';
import dynamic from 'next/dynamic';
import { Phone, Mail, GitBranch, FaceAngry, MapPin, Clock } from 'lucide-react';

// Chargement dynamique sans SSR pour éviter l'erreur "window is not defined"
const MapComponent = dynamic(() => import('./MapComponent'), { 
    ssr: false,
    loading: () => <div className="w-full h-full bg-slate-900 animate-pulse rounded-2xl" />
});

const ContactMapCard = () => {
    const coords = [48.8566, 2.3522]; // Tes coordonnées [Lat, Lng]

    return (
        <div className="relative w-full overflow-hidden rounded-3xl border border-white/10 bg-slate-950/40 backdrop-blur-md shadow-2xl flex flex-col justify-between p-6 sm:p-8 group">
            
            {/* === ARRIÈRE-PLAN : VRAIE CARTE LEAFLET SOMBRE === */}
            <div className="absolute hidden lg:block inset-0 z-0 opacity-60 transition-opacity duration-500 group-hover:opacity-80">
                <MapComponent position={coords} />
                {/* Dégradé pour intégrer la carte harmonieusement */}
                <div className="absolute inset-0 pointer-events-none bg-linear-to-t from-slate-950 via-slate-950/20 to-slate-950/60 z-10" />
            </div>

            {/* === HAUT : BADGES === */}
            <div className="relative z-20 flex flex-wrap items-center justify-between gap-3">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-md text-white text-xs font-medium shadow-sm">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400 animate-bounce" />
                    <span>Estezargues & Remote</span>
                </div>

                <div className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/50 border border-white/10 backdrop-blur-md text-slate-300 text-xs font-mono">
                    <Clock className="w-3 h-3 text-blue-400" />
                    <span>UTC+2</span>
                </div>
            </div>

            {/* === MILIEU : TEXTE === */}
            <div className="hidden lg:block relative z-20 my-auto py-6">
                <span className="text-xs font-semibold text-emerald-400 uppercase tracking-widest">
                    Me contacter
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-1 max-w-md">
                    Un projet en tête ? Échangeons ensemble.
                </h3>
            </div>

            {/* === BAS : ACTIONS === */}
            <div className="relative z-20 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                <a 
                    href="mailto:contact@exemple.com"
                    className="inline-flex items-center gap-2 bg-white text-slate-950 font-semibold px-4 py-2.5 rounded-xl hover:bg-emerald-400 transition-all text-xs shadow-lg active:scale-95"
                >
                    <Phone className="w-4 h-4" />
                    <span>Call me</span>
                </a>

                <div className="flex items-center gap-2">
                    <a href="tel:+33600000000" className="p-2.5 rounded-xl bg-white/10 border border-white/15 text-white hover:bg-white hover:text-slate-950 transition-all backdrop-blur-md">
                        <Mail className="w-4 h-4" />
                    </a>
                    <a href="https://github.com" target="_blank" rel="noreferrer" className="p-2.5 rounded-xl bg-white/10 border border-white/15 text-white hover:bg-white hover:text-slate-950 transition-all backdrop-blur-md">
                        <GitBranch className="w-4 h-4" />
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="p-2.5 rounded-xl bg-white/10 border border-white/15 text-white hover:bg-blue-500 transition-all backdrop-blur-md">
                        <FaceAngry className="w-4 h-4" />
                    </a>
                </div>
            </div>

        </div>
    );
};

export default ContactMapCard;