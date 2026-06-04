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
      <p className="rounded-md border border-stone-800 bg-stone-900 p-4 text-sm text-stone-300">
        Nenhum horario disponivel para esta data.
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
              'min-h-12 rounded border px-4 text-sm font-semibold transition',
              isSelected
                ? 'border-amber-400 bg-amber-400 text-stone-950'
                : 'border-stone-700 bg-stone-900 text-stone-100 hover:border-amber-300',
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
