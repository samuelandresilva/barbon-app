import { useState } from "react";

type InterestModalProps = {
    onClose: () => void;
};

export function InterestModal({ onClose }: InterestModalProps) {
    const [redirected, setRedirected] = useState(false);

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        const nome = formData.get("nome");
        const whatsapp = formData.get("whatsapp");
        const nomeBarbearia = formData.get("nomeBarbearia");
        const cidade = formData.get("cidade");
        const mensagem = formData.get("mensagem");

        const texto = `
Olá, tenho interesse em usar o Barbon.

Nome: ${nome}
WhatsApp: ${whatsapp}
Nome da barbearia: ${nomeBarbearia}
Cidade: ${cidade}
Mensagem: ${mensagem}
`.trim();

        const numeroDestino = "5511970819609";
        const url = `https://wa.me/${numeroDestino}?text=${encodeURIComponent(texto)}`;

        window.open(url, "_blank");

        setRedirected(true);
    }

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 px-4 py-6 backdrop-blur-sm sm:flex sm:items-center sm:justify-center">
            <div className="relative mx-auto w-full max-w-lg rounded-[28px] border border-amber-900/50 bg-stone-950 p-6 shadow-2xl shadow-black/40 sm:p-8">
                <button
                    type="button"
                    onClick={onClose}
                    className="absolute right-5 top-5 flex size-9 items-center justify-center rounded-full bg-stone-900 text-amber-500 transition hover:bg-stone-800"
                    aria-label="Fechar modal"
                >
                    ×
                </button>

                {redirected ? (
                    <div className="py-10 text-center">
                        <div className="mx-auto mb-5 flex size-14 items-center justify-center rounded-full bg-amber-500/10 text-2xl text-amber-500">
                            ✓
                        </div>

                        <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.25em] text-amber-500">
                            Redirecionamento realizado
                        </p>

                        <h2 className="text-2xl font-bold leading-tight text-stone-100">
                            Você foi redirecionado ao WhatsApp.
                        </h2>

                        <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-stone-400">
                            Agora é só enviar a mensagem por lá. Você já pode fechar esta janela.
                        </p>

                        <button
                            type="button"
                            onClick={onClose}
                            className="mt-8 rounded-2xl bg-amber-500 px-6 py-3 text-sm font-bold text-stone-950 shadow-lg shadow-amber-500/20 transition hover:bg-amber-400"
                        >
                            Fechar janela
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="mb-6 pr-10">
                            <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.25em] text-amber-500">
                                Divulgue sua barbearia
                            </p>

                            <h2 className="text-2xl font-bold leading-tight text-stone-100">
                                Leve sua barbearia para o Barbon.
                            </h2>

                            <p className="mt-3 text-xs leading-6 text-stone-400">
                                Preencha seus dados e um especialista entrará em contato para te ajudar
                                a divulgar sua barbearia e receber agendamentos online.
                            </p>
                        </div>

                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <div>
                                <label className="mb-1 block text-xs font-bold uppercase tracking-[0.18em] text-amber-500">
                                    Nome
                                </label>
                                <input
                                    name="nome"
                                    type="text"
                                    placeholder="Seu nome"
                                    className="w-full rounded-2xl border border-amber-900/50 bg-stone-900 px-4 py-3 text-sm text-stone-100 outline-none transition placeholder:text-stone-500 focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10"
                                />
                            </div>

                            <div>
                                <label className="mb-1 block text-xs font-bold uppercase tracking-[0.18em] text-amber-500">
                                    WhatsApp
                                </label>
                                <input
                                    name="whatsapp"
                                    type="tel"
                                    placeholder="(11) 99999-9999"
                                    className="w-full rounded-2xl border border-amber-900/50 bg-stone-900 px-4 py-3 text-sm text-stone-100 outline-none transition placeholder:text-stone-500 focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10"
                                />
                            </div>

                            <div>
                                <label className="mb-1 block text-xs font-bold uppercase tracking-[0.18em] text-amber-500">
                                    Nome da barbearia
                                </label>
                                <input
                                    name="nomeBarbearia"
                                    type="text"
                                    placeholder="Ex: Barbearia do João"
                                    className="w-full rounded-2xl border border-amber-900/50 bg-stone-900 px-4 py-3 text-sm text-stone-100 outline-none transition placeholder:text-stone-500 focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10"
                                />
                            </div>

                            <div>
                                <label className="mb-1 block text-xs font-bold uppercase tracking-[0.18em] text-amber-500">
                                    Cidade
                                </label>
                                <input
                                    name="cidade"
                                    type="text"
                                    placeholder="Ex: Jundiaí - SP"
                                    className="w-full rounded-2xl border border-amber-900/50 bg-stone-900 px-4 py-3 text-sm text-stone-100 outline-none transition placeholder:text-stone-500 focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10"
                                />
                            </div>

                            <div>
                                <label className="mb-1 block text-xs font-bold uppercase tracking-[0.18em] text-amber-500">
                                    Mensagem
                                </label>
                                <textarea
                                    name="mensagem"
                                    placeholder="Conte rapidamente sobre sua barbearia..."
                                    rows={3}
                                    className="w-full resize-none rounded-2xl border border-amber-900/50 bg-stone-900 px-4 py-3 text-sm text-stone-100 outline-none transition placeholder:text-stone-500 focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10"
                                />
                            </div>

                            <button
                                type="submit"
                                className="mt-2 w-full rounded-2xl bg-amber-500 px-5 py-4 text-sm font-bold text-stone-950 shadow-lg shadow-amber-500/20 transition hover:bg-amber-400"
                            >
                                Quero falar com um especialista
                            </button>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
}