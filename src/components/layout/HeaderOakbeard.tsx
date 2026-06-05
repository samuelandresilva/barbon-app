export function HeaderOakbeard() {
  return (
    <header className="border-b border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-background)_95%,transparent)] shadow-lg shadow-[color:var(--color-shadow)]">
      <div className="mx-auto flex w-full max-w-5xl items-center gap-4 px-5 py-5 sm:py-6">
        <a href="/">
          <img
            src="/logo-oak.png"
            alt="Oakbeard.app"
            className="size-16 shrink-0 rounded-md bg-[var(--color-surface)] object-contain shadow-sm shadow-[color:var(--color-shadow)]"
          />
        </a>
        <div className="min-w-0">
          <p className="text-xl font-bold text-[var(--color-text)]">Oakbeard.app</p>
          <p className="mt-1 text-sm leading-5 text-[var(--color-muted)]">
            Seu horário de beleza, sem complicação.
          </p>
        </div>
      </div>
    </header>
  )
}
