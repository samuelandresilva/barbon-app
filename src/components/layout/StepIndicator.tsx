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
  { id: 'servico', label: 'Servico' },
  { id: 'barbeiro', label: 'Barbeiro' },
  { id: 'data', label: 'Data' },
  { id: 'horario', label: 'Horario' },
  { id: 'dados', label: 'Dados' },
  { id: 'revisao', label: 'Revisao' },
]

export function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <nav aria-label="Progresso do agendamento">
      <ol className="flex gap-2 overflow-x-auto pb-1">
        {bookingSteps.map((step) => {
          const isCurrentStep = step.id === currentStep

          return (
            <li key={step.id} className="shrink-0">
              <span
                className={[
                  'inline-flex min-h-10 items-center rounded border px-3 text-sm font-medium',
                  isCurrentStep
                    ? 'border-amber-400 bg-amber-400 text-stone-950'
                    : 'border-stone-800 bg-stone-900 text-stone-300',
                ].join(' ')}
                aria-current={isCurrentStep ? 'step' : undefined}
              >
                {step.label}
              </span>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
