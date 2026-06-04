export function HeaderOakbeard() {
  return (
    <header className="border-b border-amber-900/30 bg-stone-950/95 shadow-lg shadow-black/20">
      <div className="mx-auto flex w-full max-w-5xl items-center gap-4 px-5 py-5 sm:py-6">
        <div
          className="grid size-12 shrink-0 place-items-center rounded-md border border-amber-400/50 bg-stone-900 text-lg font-bold text-amber-300 shadow-inner shadow-amber-950/50"
          aria-hidden="true"
        >
          OB
        </div>
        <div className="min-w-0">
          <p className="text-xl font-bold text-stone-50">Oakbeard.app</p>
          <p className="mt-1 text-sm leading-5 text-stone-400">
            Seu horario, sua barba, sem complicacao.
          </p>
        </div>
      </div>
    </header>
  )
}
