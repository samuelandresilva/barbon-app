import type { Barbearia } from '../../types'

interface BarbeariaCardProps {
  barbearia: Barbearia
}

export function BarbeariaCard({ barbearia }: BarbeariaCardProps) {
  return (
    <section
      className="rounded-md border border-stone-800 bg-stone-900 p-4 shadow-lg shadow-black/20"
      aria-label="Informacoes da barbearia"
    >
      <div className="flex items-start gap-4">
        {barbearia.logoUrl ? (
          <img
            src={barbearia.logoUrl}
            alt={`Logo da ${barbearia.nome}`}
            className="size-16 shrink-0 rounded border border-stone-700 object-cover"
          />
        ) : (
          <div
            className="grid size-16 shrink-0 place-items-center rounded border border-stone-700 bg-stone-950 text-lg font-semibold text-amber-300"
            aria-hidden="true"
          >
            BC
          </div>
        )}

        <div className="min-w-0">
          <h2 className="text-lg font-semibold text-stone-50">
            {barbearia.nome}
          </h2>
          {barbearia.descricao ? (
            <p className="mt-1 text-sm leading-6 text-stone-300">
              {barbearia.descricao}
            </p>
          ) : null}
          <dl className="mt-3 grid gap-2 text-sm text-stone-300">
            <div>
              <dt className="sr-only">Telefone</dt>
              <dd>{barbearia.telefoneWhatsapp}</dd>
            </div>
            <div>
              <dt className="sr-only">Endereco</dt>
              <dd>{barbearia.endereco}</dd>
            </div>
            <div>
              <dt className="sr-only">Instagram</dt>
              <dd>{barbearia.instagram}</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  )
}
