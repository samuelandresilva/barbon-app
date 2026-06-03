import type { PropsWithChildren } from 'react'
import type { Barbearia } from '../../types'
import { BarbeariaCard } from './BarbeariaCard'
import { HeaderOakbeard } from './HeaderOakbeard'
import { type BookingStep, StepIndicator } from './StepIndicator'

interface AppLayoutProps extends PropsWithChildren {
  barbearia: Barbearia
  currentStep?: BookingStep
}

export function AppLayout({
  barbearia,
  children,
  currentStep,
}: AppLayoutProps) {
  return (
    <div className="min-h-dvh bg-stone-950 text-stone-100">
      <HeaderOakbeard />
      <main className="mx-auto flex w-full max-w-5xl flex-col gap-5 px-5 py-5">
        <BarbeariaCard barbearia={barbearia} />
        <StepIndicator currentStep={currentStep} />
        <section className="min-h-80 rounded-md border border-stone-800 bg-stone-950 p-4">
          {children}
        </section>
      </main>
    </div>
  )
}
