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
          setErrorMessage('Não foi possível carregar os profissionais disponíveis.')
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
      <div className="min-h-dvh bg-transparent text-[#3f3437]">
        <HeaderOakbeard />
        <main className="mx-auto w-full max-w-5xl px-5 py-8">
          <div className="rounded-md border border-[#f3d4dc] bg-white p-4">
            <p className="text-sm text-[#7b666d]">
              Selecione um serviço antes de escolher o profissional.
            </p>
            <button
              type="button"
              className="mt-4 min-h-11 rounded bg-[#d88ca4] px-4 text-sm font-semibold text-white"
              onClick={() => navigate('/servicos')}
            >
              Escolher serviço
            </button>
          </div>
        </main>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="min-h-dvh bg-transparent text-[#3f3437]">
        <HeaderOakbeard />
        <main className="mx-auto w-full max-w-5xl px-5 py-8">
          <p className="rounded-md border border-[#f3d4dc] bg-white p-4 text-sm text-[#7b666d]">
            Carregando informações...
          </p>
        </main>
      </div>
    )
  }

  if (errorMessage || !barbearia) {
    return (
      <div className="min-h-dvh bg-transparent text-[#3f3437]">
        <HeaderOakbeard />
        <main className="mx-auto w-full max-w-5xl px-5 py-8">
          <p className="rounded-md border border-[#f0c8cf] bg-[#fff5f6] p-4 text-sm text-[#9f5d68]">
            {errorMessage || 'Não foi possível carregar os profissionais disponíveis.'}
          </p>
        </main>
      </div>
    )
  }

  return (
    <AppLayout barbearia={barbearia} currentStep="barbeiro">
      <div className="flex flex-col gap-5">
        <div>
          <h1 className="text-2xl font-semibold text-[#3f3437]">
            Escolha o profissional
          </h1>
          <p className="mt-2 text-sm leading-6 text-[#7b666d]">
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
            className="min-h-12 rounded-md border border-[#f3d4dc] bg-white px-5 text-sm font-semibold text-[#7b666d] transition hover:border-[#d8a5b5]"
            onClick={() => navigate('/servicos')}
          >
            Voltar
          </button>
          <button
            type="button"
            className="min-h-12 rounded-md bg-[#d88ca4] px-5 text-sm font-bold text-white shadow-lg shadow-[#3f3437]/15 transition enabled:hover:bg-[#c97891] disabled:cursor-not-allowed disabled:bg-[#f8e7ed] disabled:text-[#cdb5bd] disabled:shadow-none"
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
