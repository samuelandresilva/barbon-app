import { useEffect, useRef } from 'react'

export type BookingStep =
  | 'servico'
  | 'barbeiro'
  | 'data'
  | 'horario'
  | 'dados'
  | 'revisao'

interface StepItem {
  id: BookingStep
  label: string
}

interface StepIndicatorProps {
  currentStep?: BookingStep
}

const bookingSteps: StepItem[] = [
  { id: 'servico', label: 'Serviço' },
  { id: 'barbeiro', label: 'Barbeiro' },
  { id: 'data', label: 'Data' },
  { id: 'horario', label: 'Horário' },
  { id: 'dados', label: 'Dados' },
  { id: 'revisao', label: 'Revisão' },
]

export function StepIndicator({ currentStep }: StepIndicatorProps) {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null)
  const stepRefs = useRef<Record<string, HTMLLIElement | null>>({})

  const currentIndex = Math.max(
    bookingSteps.findIndex((step) => step.id === currentStep),
    0,
  )

  useEffect(() => {
    const currentStepId = bookingSteps[currentIndex]?.id
    const currentElement = currentStepId ? stepRefs.current[currentStepId] : null

    if (!currentElement) {
      return
    }

    currentElement.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center',
    })
  }, [currentIndex])

  return (
    <nav
      aria-label="Progresso do agendamento"
      className="rounded-2xl border border-stone-800/80 bg-stone-950/70 px-4 py-4 shadow-lg shadow-black/20"
    >
      <div
        ref={scrollContainerRef}
        className="overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <ol className="flex min-w-max items-center pr-2">
          {bookingSteps.map((step, index) => {
            const isCurrent = index === currentIndex
            const isCompleted = index < currentIndex
            const isUpcoming = index > currentIndex

            return (
              <li
                key={step.id}
                ref={(element) => {
                  stepRefs.current[step.id] = element
                }}
                className="flex items-center"
              >
                <div className="flex flex-col items-center gap-2">
                  <span
                    className={[
                      'grid size-8 place-items-center rounded-full border text-xs font-bold transition-colors',
                      isCurrent
                        ? 'border-amber-400 bg-amber-400 text-stone-950 shadow-lg shadow-amber-950/40'
                        : '',
                      isCompleted
                        ? 'border-amber-800 bg-amber-950/80 text-amber-300'
                        : '',
                      isUpcoming
                        ? 'border-stone-700 bg-stone-900/80 text-stone-500'
                        : '',
                    ].join(' ')}
                    aria-current={isCurrent ? 'step' : undefined}
                  >
                    {isCompleted ? '✓' : index + 1}
                  </span>

                  <span
                    className={[
                      'whitespace-nowrap text-xs font-semibold transition-colors',
                      isCurrent ? 'text-amber-300' : '',
                      isCompleted ? 'text-stone-300' : '',
                      isUpcoming ? 'text-stone-500' : '',
                    ].join(' ')}
                  >
                    {step.label}
                  </span>
                </div>

                {index < bookingSteps.length - 1 ? (
                  <span
                    className={[
                      'mx-3 mb-6 h-px w-8 rounded-full sm:w-12',
                      index < currentIndex ? 'bg-amber-700' : 'bg-stone-800',
                    ].join(' ')}
                    aria-hidden="true"
                  />
                ) : null}
              </li>
            )
          })}
        </ol>
      </div>
    </nav>
  )
}