export function AppHeader() {
  return (
    <header className="border-b border-amber-900/30 bg-stone-950/95 shadow-lg shadow-black/20">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4 px-5 py-5 sm:py-6">
        <a href="/" className="flex min-w-0 items-center gap-4">
          <img
            src="/logo.png"
            alt="barbon.app"
            className="size-16 shrink-0 rounded-md object-contain"
          />

          <div className="min-w-0">
            <p className="font-bold text-stone-50">
              <span className="text-3xl font-light text-stone-100">barbon</span>
              <span className="text-3xl font-light text-amber-500">.</span>
              <span className="font-light text-stone-100">app</span>
            </p>

            <p className="mt-1 text-sm leading-5 text-stone-400">
              Agende com estilo.
            </p>
          </div>
        </a>

        <div className="hidden flex-col items-center gap-2 sm:flex">
          <span className="text-xs leading-none text-stone-400">
            Divulgue sua barbearia
          </span>

          <a
            href="/contrate"
            className="rounded-full border border-amber-700/60 px-5 py-2 text-xs font-bold uppercase tracking-[0.18em] text-amber-500 transition hover:border-amber-500 hover:bg-amber-500 hover:text-stone-950"
          >
            Usar Barbon
          </a>
        </div>
      </div>
    </header>
  )
}