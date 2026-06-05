import { useEffect, useRef } from 'react'

export type BookingStep =
  | 'servico'
  | 'profissional'
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
  { id: 'profissional', label: 'Profissional' },
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
      className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-4 shadow-lg shadow-[color:var(--color-shadow)]"
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
                        ? 'border-[var(--color-primary)] bg-[var(--color-primary)] text-[var(--color-on-primary)] shadow-lg shadow-[color:var(--color-shadow)]'
                        : '',
                      isCompleted
                        ? 'border-[var(--color-border)] bg-[var(--color-secondary)] text-[var(--color-muted)]'
                        : '',
                      isUpcoming
                        ? 'border-[var(--color-secondary)] bg-[var(--color-background)] text-[var(--color-subtle)]'
                        : '',
                    ].join(' ')}
                    aria-current={isCurrent ? 'step' : undefined}
                  >
                    {isCompleted ? '✓' : index + 1}
                  </span>

                  <span
                    className={[
                      'whitespace-nowrap text-xs font-semibold transition-colors',
                      isCurrent ? 'text-[var(--color-accent)]' : '',
                      isCompleted ? 'text-[var(--color-muted)]' : '',
                      isUpcoming ? 'text-[var(--color-subtle)]' : '',
                    ].join(' ')}
                  >
                    {step.label}
                  </span>
                </div>

                {index < bookingSteps.length - 1 ? (
                  <span
                    className={[
                      'mx-3 mb-6 h-px w-8 rounded-full sm:w-12',
                      index < currentIndex
                        ? 'bg-[var(--color-border-hover)]'
                        : 'bg-[var(--color-secondary)]',
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
