import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BarberCard } from '../../components/barber'
import { AppLayout, HeaderOakbeard } from '../../components/layout'
import { useBooking } from '../../contexts'
import {
  getBarbearia,
  getBarbeiroServicos,
  getBarbeiros,
} from '../../services/googleSheetsService'
import type { Barbearia, Barbeiro, BarbeiroServico } from '../../types'

export function BarberPage() {
  const navigate = useNavigate()
  const {
    barbeiroSelecionado,
    servicoSelecionado,
    setBarbeiroSelecionado,
  } = useBooking()
  const [barbearia, setBarbearia] = useState<Barbearia | null>(null)
  const [barbeiros, setBarbeiros] = useState<Barbeiro[]>([])
  const [barbeiroServicos, setBarbeiroServicos] = useState<BarbeiroServico[]>(
    [],
  )
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    let isMounted = true

    async function loadPageData() {
      try {
        setIsLoading(true)
        setErrorMessage('')
        const [
          loadedBarbearia,
          loadedBarbeiros,
          loadedBarbeiroServicos,
        ] = await Promise.all([
          getBarbearia(),
          getBarbeiros(),
          getBarbeiroServicos(),
        ])

        if (isMounted) {
          setBarbearia(loadedBarbearia)
          setBarbeiros(loadedBarbeiros)
          setBarbeiroServicos(loadedBarbeiroServicos)
        }
      } catch {
        if (isMounted) {
          setErrorMessage('Nao foi possivel carregar os barbeiros disponiveis.')
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    void loadPageData()

    return () => {
      isMounted = false
    }
  }, [])

  const barbeirosCompativeis = useMemo(() => {
    if (!servicoSelecionado) {
      return []
    }

    const compatibleBarberIds = new Set(
      barbeiroServicos
        .filter((item) => item.servicoId === servicoSelecionado.id)
        .map((item) => item.barbeiroId),
    )

    return barbeiros.filter((barbeiro) => compatibleBarberIds.has(barbeiro.id))
  }, [barbeiroServicos, barbeiros, servicoSelecionado])

  const selectedBarberIsCompatible = barbeirosCompativeis.some(
    (barbeiro) => barbeiro.id === barbeiroSelecionado?.id,
  )

  if (!servicoSelecionado) {
    return (
      <div className="min-h-dvh bg-stone-950 text-stone-100">
        <HeaderOakbeard />
        <main className="mx-auto w-full max-w-5xl px-5 py-8">
          <div className="rounded-md border border-stone-800 bg-stone-900 p-4">
            <p className="text-sm text-stone-300">
              Selecione um servico antes de escolher o barbeiro.
            </p>
            <button
              type="button"
              className="mt-4 min-h-11 rounded bg-amber-400 px-4 text-sm font-semibold text-stone-950"
              onClick={() => navigate('/servicos')}
            >
              Escolher servico
            </button>
          </div>
        </main>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="min-h-dvh bg-stone-950 text-stone-100">
        <HeaderOakbeard />
        <main className="mx-auto w-full max-w-5xl px-5 py-8">
          <p className="rounded-md border border-stone-800 bg-stone-900 p-4 text-sm text-stone-300">
            Carregando informacoes...
          </p>
        </main>
      </div>
    )
  }

  if (errorMessage || !barbearia) {
    return (
      <div className="min-h-dvh bg-stone-950 text-stone-100">
        <HeaderOakbeard />
        <main className="mx-auto w-full max-w-5xl px-5 py-8">
          <p className="rounded-md border border-red-900/60 bg-red-950/30 p-4 text-sm text-red-100">
            {errorMessage || 'Nao foi possivel carregar os barbeiros disponiveis.'}
          </p>
        </main>
      </div>
    )
  }

  return (
    <AppLayout barbearia={barbearia} currentStep="barbeiro">
      <div className="flex flex-col gap-5">
        <div>
          <h1 className="text-2xl font-semibold text-stone-50">
            Escolha o barbeiro
          </h1>
          <p className="mt-2 text-sm leading-6 text-stone-300">
            Exibindo profissionais que realizam {servicoSelecionado.nome}.
          </p>
        </div>

        <div className="grid gap-3">
          {barbeirosCompativeis.map((barbeiro) => (
            <BarberCard
              key={barbeiro.id}
              barbeiro={barbeiro}
              isSelected={barbeiroSelecionado?.id === barbeiro.id}
              onSelect={setBarbeiroSelecionado}
            />
          ))}
        </div>

        <div className="flex justify-between gap-3">
          <button
            type="button"
            className="min-h-12 rounded border border-stone-700 px-5 text-sm font-semibold text-stone-200"
            onClick={() => navigate('/servicos')}
          >
            Voltar
          </button>
          <button
            type="button"
            className="min-h-12 rounded bg-amber-400 px-5 text-sm font-semibold text-stone-950 transition enabled:hover:bg-amber-300 disabled:cursor-not-allowed disabled:bg-stone-700 disabled:text-stone-400"
            disabled={!selectedBarberIsCompatible}
            onClick={() => navigate('/data')}
          >
            Continuar
          </button>
        </div>
      </div>
    </AppLayout>
  )
}
