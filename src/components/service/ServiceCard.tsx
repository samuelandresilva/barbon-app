import type { Servico } from '../../types'

interface ServiceCardProps {
  isSelected: boolean
  onSelect: (servico: Servico) => void
  servico: Servico
}

const currencyFormatter = new Intl.NumberFormat('pt-BR', {
  currency: 'BRL',
  style: 'currency',
})

export function ServiceCard({
  isSelected,
  onSelect,
  servico,
}: ServiceCardProps) {
  return (
    <button
      type="button"
      className={[
        'w-full rounded-md border p-4 text-left shadow-sm transition',
        isSelected
          ? 'border-[var(--color-primary)] bg-[var(--color-primary)] text-[var(--color-on-primary)] shadow-[color:var(--color-shadow)]'
          : 'border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] shadow-[color:var(--color-shadow)] hover:border-[var(--color-border-hover)] hover:bg-[var(--color-background)]',
      ].join(' ')}
      onClick={() => onSelect(servico)}
      aria-pressed={isSelected}
    >
      <span className="block text-lg font-semibold">{servico.nome}</span>
      <span
        className={[
          'mt-2 block text-sm leading-6',
          isSelected ? 'text-[var(--color-background)]' : 'text-[var(--color-muted)]',
        ].join(' ')}
      >
        {servico.descricao}
      </span>
      <span className="mt-4 flex flex-wrap gap-2 text-sm font-semibold">
        <span className="rounded border border-current/20 px-2 py-1">
          {currencyFormatter.format(servico.preco)}
        </span>
        <span className="rounded border border-current/20 px-2 py-1">
          {servico.duracaoMinutos} minutos
        </span>
      </span>
    </button>
  )
}
