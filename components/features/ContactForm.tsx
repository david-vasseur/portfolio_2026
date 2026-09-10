"use client";

import { contactSchema } from "@/schemas/contact";
import { useForm } from "@tanstack/react-form"; 
import { toast } from "sonner";

export default function ContactForm() {
    const form = useForm({
        defaultValues: {
            name: "",
            email: "",
            message: "",
        },
        validators: {
            onChange: contactSchema,
        },
        onSubmit: async ({ value }) => {
           const fakeFetch = () =>
            new Promise((resolve, reject) => {
                setTimeout(() => {
                    // Passe à `false` pour tester l'état d'erreur du toast
                    const shouldSucceed = true;

                    if (shouldSucceed) {
                        resolve(value);
                    } else {
                        reject(new Error("Erreur de connexion"));
                    }
                }, 2000);
            });

        toast.promise(fakeFetch(), {
            loading: "Envoi du message...",
            success: () => {
                form.reset(); // Videz les champs après succès
                return "Message envoyé avec succès !";
            },
            error: "Erreur lors de l'envoi. Réessaie plus tard.",
        });
        },
    });

    return (
        <form
            id="contact-form"
            className="space-y-4"
            onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                form.handleSubmit();
            }}
        >
            {/* NAME FIELD */}
            <form.Field name="name">
                {(field) => {
                    const hasError =
                        field.state.meta.isTouched &&
                        field.state.meta.errors.length > 0;

                    return (
                        <div className="relative space-y-1.5 sm:space-y-1">
                            <label
                                htmlFor={field.name}
                                className="block pl-2 text-xs font-mono uppercase tracking-wider text-slate-300"
                            >
                                Name
                            </label>
                            <input
                                id={field.name}
                                name={field.name}
                                value={field.state.value}
                                onBlur={field.handleBlur}
                                onChange={(e) => field.handleChange(e.target.value)}
                                placeholder="John Doe"
                                className={`w-full rounded-xl border bg-white/5 px-4 py-2 sm:py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 outline-none backdrop-blur-md transition-all focus:bg-white/10 focus:ring-1 ${
                                    hasError
                                        ? "border-rose-500/60 focus:border-rose-500 focus:ring-rose-500/50"
                                        : "border-white/10 focus:border-emerald-400/80 focus:ring-emerald-400/80"
                                }`}
                            />
                            {hasError && (
                                <p className="absolute top-0 right-0 pl-2 text-[10px] font-mono text-rose-400">
                                    {field.state.meta.errors[0]?.message}
                                </p>
                            )}
                        </div>
                    );
                }}
            </form.Field>

            {/* EMAIL FIELD */}
            <form.Field name="email">
                {(field) => {
                    const hasError =
                        field.state.meta.isTouched &&
                        field.state.meta.errors.length > 0;

                    return (
                        <div className="relative space-y-1.5 sm:space-y-1">
                            <label
                                htmlFor={field.name}
                                className="block pl-2 text-xs font-mono uppercase tracking-wider text-slate-300"
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                id={field.name}
                                name={field.name}
                                value={field.state.value}
                                onBlur={field.handleBlur}
                                onChange={(e) => field.handleChange(e.target.value)}
                                placeholder="john@example.com"
                                className={`w-full rounded-xl border bg-white/5 px-4 py-2 sm:py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 outline-none backdrop-blur-md transition-all focus:bg-white/10 focus:ring-1 ${
                                    hasError
                                        ? "border-rose-500/60 focus:border-rose-500 focus:ring-rose-500/50"
                                        : "border-white/10 focus:border-emerald-400/80 focus:ring-emerald-400/80"
                                }`}
                            />
                            {hasError && (
                                <p className="absolute right-0 top-0 pl-2 text-[10px] font-mono text-rose-400">
                                    {field.state.meta.errors[0]?.message}
                                </p>
                            )}
                        </div>
                    );
                }}
            </form.Field>

            {/* MESSAGE FIELD */}
            <form.Field name="message">
                {(field) => {
                    const hasError =
                        field.state.meta.isTouched &&
                        field.state.meta.errors.length > 0;

                    return (
                        <div className="relative space-y-1.5 sm:space-y-1">
                            <label
                                htmlFor={field.name}
                                className="block pl-2 text-xs font-mono uppercase tracking-wider text-slate-300"
                            >
                                Message
                            </label>
                            <textarea
                                id={field.name}
                                name={field.name}
                                value={field.state.value}
                                onBlur={field.handleBlur}
                                onChange={(e) => field.handleChange(e.target.value)}
                                rows={4}
                                placeholder="Tell me about your project..."
                                className={`w-full h-12 min-[390px]:h-20 sm:h-28 resize-none rounded-xl border bg-white/5 px-4 py-2 sm:py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 outline-none backdrop-blur-md transition-all focus:bg-white/10 focus:ring-1 ${
                                    hasError
                                        ? "border-rose-500/60 focus:border-rose-500 focus:ring-rose-500/50"
                                        : "border-white/10 focus:border-emerald-400/80 focus:ring-emerald-400/80"
                                }`}
                            />
                            {hasError && (
                                <p className="absolute top-0 right-0 pl-2 text-[10px] font-mono text-rose-400">
                                    {field.state.meta.errors[0]?.message}
                                </p>
                            )}
                        </div>
                    );
                }}
            </form.Field>

            {/* SUBMIT BUTTON */}
            
        </form>
    );
}