export function HeaderOakbeard() {
  return (
    <header className="border-b border-amber-900/40 bg-stone-950">
      <div className="mx-auto flex w-full max-w-5xl items-center gap-4 px-5 py-5">
        <div
          className="grid size-12 shrink-0 place-items-center rounded border border-amber-500/60 bg-stone-900 text-lg font-semibold text-amber-300"
          aria-hidden="true"
        >
          OB
        </div>
        <div>
          <p className="text-xl font-semibold text-stone-50">Oakbeard.app</p>
          <p className="mt-1 text-sm text-stone-400">
            Seu horario, sua barba, sem complicacao.
          </p>
        </div>
      </div>
    </header>
  )
}
