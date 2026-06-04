export function HeaderOakbeard() {
  return (
    <header className="border-b border-amber-900/30 bg-stone-950/95 shadow-lg shadow-black/20">
      <div className="mx-auto flex w-full max-w-5xl items-center gap-4 px-5 py-5 sm:py-6">
        <img
          src="/logo-oak.png"
          alt="Oakbeard.app"
          className="size-16 shrink-0 rounded-md object-contain bg-white"
        />
        <div className="min-w-0">
          <p className="text-xl font-bold text-stone-50">Oakbeard.app</p>
          <p className="mt-1 text-sm leading-5 text-stone-400">
            Seu horário, sua barba e cabelo, sem complicação.
          </p>
        </div>
      </div>
    </header>
  )
}
