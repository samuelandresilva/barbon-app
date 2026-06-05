export function AppHeader() {
  return (
    <header className="border-b border-amber-900/30 bg-stone-950/95 shadow-lg shadow-black/20">
      <div className="mx-auto flex w-full max-w-5xl items-center gap-4 px-5 py-5 sm:py-6">
        <a href="/">
          <img
            src="/logo.png"
            alt="barbon.app"
            className="size-16 shrink-0 rounded-md object-contain"
          />
        </a>
        <div className="min-w-0">
          <p className="font-bold text-stone-50">
            <span className="text-stone-100 font-light text-3xl">barbon</span>
            <span className="text-amber-500 font-light text-3xl">.</span>
            <span className="text-stone-100 font-light">app</span>
          </p>
          <p className="mt-1 text-sm leading-5 text-stone-400">
            Agende com estilo.
          </p>
        </div>
      </div>
    </header>
  )
}
