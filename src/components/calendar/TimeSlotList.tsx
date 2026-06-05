import type { HorarioDisponivel } from '../../types'

interface TimeSlotListProps {
  horarios: HorarioDisponivel[]
  selectedTime: string
  onSelectTime: (horario: string) => void
}

export function TimeSlotList({
  horarios,
  selectedTime,
  onSelectTime,
}: TimeSlotListProps) {
  if (horarios.length === 0) {
    return (
      <p className="rounded-md border border-[var(--color-border)] bg-[var(--color-background)] p-4 text-sm text-[var(--color-muted)]">
        Nenhum horário disponível para esta data.
      </p>
    )
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
      {horarios.map((slot) => {
        const isSelected = slot.horario === selectedTime

        return (
          <button
            key={`${slot.data}-${slot.horario}`}
            type="button"
            className={[
              'min-h-12 rounded-md border px-4 text-sm font-semibold shadow-sm transition',
              isSelected
                ? 'border-[var(--color-primary)] bg-[var(--color-primary)] text-[var(--color-on-primary)] shadow-[color:var(--color-shadow)]'
                : 'border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] shadow-[color:var(--color-shadow)] hover:border-[var(--color-border-hover)] hover:bg-[var(--color-background)]',
            ].join(' ')}
            aria-pressed={isSelected}
            onClick={() => onSelectTime(slot.horario)}
          >
            {slot.horario}
          </button>
        )
      })}
    </div>
  )
}
