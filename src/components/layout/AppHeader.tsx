import { useState } from "react";
import { InterestModal } from "./InterestModal";

export function AppHeader() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <header className="border-b border-amber-900/30 bg-stone-950/95 shadow-lg shadow-black/20">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4 px-5 py-5 sm:py-6">
          <a href="/" className="flex min-w-0 items-center gap-4">
            <img
              src="/logo.png"
              alt="barbon.app"
              className="size-13 shrink-0 rounded-md object-contain"
            />

            <div className="min-w-0">
              <p className="font-bold text-stone-50">
                <span className="text-xl font-light text-stone-100">
                  barbon
                </span>
                <span className="text-xl font-light text-amber-500">.</span>
                <span className="text-xs font-light text-stone-100">app</span>
              </p>

              <p className="mt-1 text-xs leading-5 text-stone-400">
                Agende com estilo.
              </p>
            </div>
          </a>

          <div className="flex shrink-0 flex-col items-center gap-1 sm:gap-2">
            <span className="text-[10px] leading-none text-stone-400 sm:text-xs">
              Divulgue sua barbearia
            </span>

            <a
              href="#"
              onClick={(event) => {
                event.preventDefault();
                setOpenModal(true);
              }}
              className="inline-flex h-7 items-center justify-center rounded-full border border-amber-700/60 px-3 text-[9px] font-bold uppercase tracking-[0.12em] text-amber-500 transition hover:border-amber-500 hover:bg-amber-500 hover:text-stone-950 sm:h-8 sm:px-5 sm:text-xs sm:tracking-[0.18em]"
            >
              Usar Barbon
            </a>
          </div>
        </div>
      </header>

      {openModal && (
        <InterestModal onClose={() => setOpenModal(false)} />
      )}
    </>
  );
}