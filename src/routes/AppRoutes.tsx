import { Route, Routes } from 'react-router-dom'

export function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <main className="min-h-dvh bg-stone-950 px-5 py-8 text-stone-100">
            <section className="mx-auto flex min-h-[calc(100dvh-4rem)] max-w-3xl flex-col justify-center">
              <p className="mb-3 text-sm font-semibold uppercase text-amber-400">
                Oakbeard.app
              </p>
              <h1 className="text-4xl font-semibold tracking-normal text-stone-50 sm:text-5xl">
                Bootstrap do projeto
              </h1>
              <p className="mt-4 max-w-xl text-base leading-7 text-stone-300">
                React, TypeScript, Vite, Tailwind CSS e React Router foram
                configurados para iniciar a implementacao da aplicacao.
              </p>
            </section>
          </main>
        }
      />
    </Routes>
  )
}
