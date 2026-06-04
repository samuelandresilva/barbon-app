import type { Barbeiro } from '../../types'

interface BarberCardProps {
  barbeiro: Barbeiro
  isSelected: boolean
  onSelect: (barbeiro: Barbeiro) => void
}

export function BarberCard({
  barbeiro,
  isSelected,
  onSelect,
}: BarberCardProps) {
  return (
    <button
      type="button"
      className={[
        'flex w-full items-center gap-4 rounded-md border p-4 text-left shadow-sm transition',
        isSelected
          ? 'border-amber-400 bg-amber-400 text-stone-950 shadow-amber-950/20'
          : 'border-stone-800 bg-stone-900/90 text-stone-100 shadow-black/20 hover:border-amber-700 hover:bg-stone-900',
      ].join(' ')}
      onClick={() => onSelect(barbeiro)}
      aria-pressed={isSelected}
    >
      {barbeiro.fotoUrl ? (
        <img
          src={barbeiro.fotoUrl}
          alt={`Foto de ${barbeiro.nome}`}
          className="size-16 shrink-0 rounded-md border border-amber-900/50 object-cover"
        />
      ) : (
        <span
          className={[
            'grid size-16 shrink-0 place-items-center rounded-md border text-lg font-bold',
            isSelected
              ? 'border-stone-800 bg-stone-950 text-amber-300'
              : 'border-stone-700 bg-stone-950 text-amber-300',
          ].join(' ')}
          aria-hidden="true"
        >
          {barbeiro.nome
            .split(' ')
            .map((namePart) => namePart[0])
            .join('')
            .slice(0, 2)}
        </span>
      )}

      <span>
        <span className="block text-lg font-semibold">{barbeiro.nome}</span>
        <span
          className={[
            'mt-1 block text-sm leading-6',
            isSelected ? 'text-stone-900' : 'text-stone-300',
          ].join(' ')}
        >
          {barbeiro.descricao}
        </span>
      </span>
    </button>
  )
}
