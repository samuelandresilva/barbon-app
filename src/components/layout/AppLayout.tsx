import { useEffect, useRef, type PropsWithChildren } from 'react'
import { useLocation } from 'react-router-dom'
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
  const location = useLocation()
  const stepSectionRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!currentStep) {
      return
    }

    stepSectionRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }, [currentStep, location.pathname])

  return (
    <div className="min-h-dvh bg-transparent text-stone-100">
      <HeaderOakbeard />
      <main className="mx-auto flex w-full max-w-5xl flex-col gap-5 px-4 py-5 sm:px-5 sm:py-7">
        <BarbeariaCard barbearia={barbearia} />
        {currentStep ? <StepIndicator currentStep={currentStep} /> : null}
        <section
          ref={stepSectionRef}
          className="min-h-80 scroll-mt-4 rounded-md border border-stone-800/90 bg-stone-950/85 p-4 shadow-xl shadow-black/25 sm:p-5"
        >
          {children}
        </section>
      </main>
    </div>
  )
}
