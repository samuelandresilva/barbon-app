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
          ? 'border-amber-400 bg-amber-400 text-stone-950 shadow-amber-950/20'
          : 'border-stone-800 bg-stone-900/90 text-stone-100 shadow-black/20 hover:border-amber-700 hover:bg-stone-900',
      ].join(' ')}
      onClick={() => onSelect(servico)}
      aria-pressed={isSelected}
    >
      <span className="block text-lg font-semibold">{servico.nome}</span>
      <span
        className={[
          'mt-2 block text-sm leading-6',
          isSelected ? 'text-stone-900' : 'text-stone-300',
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
