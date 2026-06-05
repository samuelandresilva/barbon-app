import type { Profissional } from '../../types'
import { getInitials } from '../../utils/getInitials'
import { hasValidImageUrl } from '../../utils/hasValidImageUrl'

interface ProfessionalCardProps {
  profissional: Profissional
  isSelected: boolean
  onSelect: (profissional: Profissional) => void
}

export function ProfessionalCard({
  profissional,
  isSelected,
  onSelect,
}: ProfessionalCardProps) {
  return (
    <button
      type="button"
      className={[
        'flex w-full items-center gap-4 rounded-md border p-4 text-left shadow-sm transition',
        isSelected
          ? 'border-[var(--color-primary)] bg-[var(--color-primary)] text-[var(--color-on-primary)] shadow-[color:var(--color-shadow)]'
          : 'border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] shadow-[color:var(--color-shadow)] hover:border-[var(--color-border-hover)] hover:bg-[var(--color-background)]',
      ].join(' ')}
      onClick={() => onSelect(profissional)}
      aria-pressed={isSelected}
    >
      {hasValidImageUrl(profissional.fotoUrl) ? (
        <img
          src={profissional.fotoUrl}
          alt={`Foto de ${profissional.nome}`}
          className="size-16 shrink-0 rounded-md border border-[var(--color-border)] object-cover"
        />
      ) : (
        <span
          className={[
            'grid size-16 shrink-0 place-items-center rounded-md border text-lg font-bold',
            isSelected
              ? 'border-[var(--color-secondary)] bg-[var(--color-surface)] text-[var(--color-primary-hover)]'
              : 'border-[var(--color-border)] bg-[var(--color-background)] text-[var(--color-primary-hover)]',
          ].join(' ')}
          aria-hidden="true"
        >
          {getInitials(profissional.nome)}
        </span>
      )}

      <span>
        <span className="block text-lg font-semibold">{profissional.nome}</span>
        <span
          className={[
            'mt-1 block text-sm leading-6',
            isSelected ? 'text-[var(--color-background)]' : 'text-[var(--color-muted)]',
          ].join(' ')}
        >
          {profissional.descricao}
        </span>
      </span>
    </button>
  )
}
