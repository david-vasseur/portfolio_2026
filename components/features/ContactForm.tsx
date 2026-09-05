import React from 'react';
import { Send } from 'lucide-react'; // Optionnel : icône pour le bouton

export const ContactForm = () => {
    return (
        <div className="relative w-full h-full self-center flex flex-col justify-between overflow-hidden p-6 sm:p-8 bg-slate-950/60 rounded-2xl border border-white/10 backdrop-blur-xl shadow-2xl">
            
            {/* OVERLAY DÉGRADÉ RADIAL (Rappel du style des cartes Work) */}
            <div className="absolute inset-0 pointer-events-none bg-radial-[at_top_left] from-white/10 via-emerald-500/5 to-transparent transition-opacity duration-500" />

            {/* EN-TÊTE DE FORMULAIRE */}
            <div className="relative z-10 mb-6 flex items-center justify-between">
                <span className="hidden lg:block text-xs font-mono font-bold px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 backdrop-blur-md">
                    Keep in touch
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Free to reach out, I usually respond within 24 hours.
                </span>
            </div>

            {/* FORMULAIRE */}
            <form className="relative z-10 space-y-4 w-full">
                
                {/* CHAMP : NOM */}
                <div className="space-y-1.5">
                    <label htmlFor="name" className="block pl-2 text-xs font-mono uppercase tracking-wider text-slate-300">
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        placeholder="John Doe"
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none backdrop-blur-md transition-all focus:border-emerald-400/80 focus:bg-white/10 focus:ring-1 focus:ring-emerald-400/80"
                    />
                </div>

                {/* CHAMP : EMAIL */}
                <div className="space-y-1.5">
                    <label htmlFor="email" className="block pl-2 text-xs font-mono uppercase tracking-wider text-slate-300">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        placeholder="john@example.com"
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none backdrop-blur-md transition-all focus:border-emerald-400/80 focus:bg-white/10 focus:ring-1 focus:ring-emerald-400/80"
                    />
                </div>

                {/* CHAMP : MESSAGE */}
                <div className="space-y-1.5">
                    <label htmlFor="message" className="block pl-2 text-xs font-mono uppercase tracking-wider text-slate-300">
                        Message
                    </label>
                    <textarea
                        id="message"
                        rows={4}
                        placeholder="Parle-moi de ton projet..."
                        className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none backdrop-blur-md transition-all focus:border-emerald-400/80 focus:bg-white/10 focus:ring-1 focus:ring-emerald-400/80"
                    />
                </div>

                {/* BOUTON ENVOYER (Même style que l'explorer de la carte Work) */}
                <button 
                    type="submit" 
                    className="w-full inline-flex items-center justify-center gap-2 text-xs font-bold bg-white text-slate-950 px-5 py-3 rounded-xl hover:bg-emerald-400 transition-all shadow-lg shadow-black/40 active:scale-95 cursor-pointer mt-2"
                >
                    <span>Send Message</span>
                    <Send className="w-3.5 h-3.5" />
                </button>
            </form>
        </div>
    );
};