import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppLayout, HeaderOakbeard } from '../../components/layout'
import { ServiceCard } from '../../components/service'
import { useBooking } from '../../contexts'
import {
  getBarbearia,
  getServicos,
} from '../../services/googleSheetsService'
import type { Barbearia, Servico } from '../../types'

export function ServicePage() {
  const navigate = useNavigate()
  const {
    servicoSelecionado,
    setBarbeiroSelecionado,
    setServicoSelecionado,
  } = useBooking()
  const [barbearia, setBarbearia] = useState<Barbearia | null>(null)
  const [servicos, setServicos] = useState<Servico[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    let isMounted = true

    async function loadPageData() {
      try {
        setIsLoading(true)
        setErrorMessage('')
        const [loadedBarbearia, loadedServicos] = await Promise.all([
          getBarbearia(),
          getServicos(),
        ])

        if (isMounted) {
          setBarbearia(loadedBarbearia)
          setServicos(loadedServicos)
        }
      } catch {
        if (isMounted) {
          setErrorMessage('Nao foi possivel carregar os servicos disponiveis.')
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

  function handleServiceSelect(servico: Servico) {
    setServicoSelecionado(servico)
    setBarbeiroSelecionado(null)
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
            {errorMessage || 'Nao foi possivel carregar os servicos disponiveis.'}
          </p>
        </main>
      </div>
    )
  }

  return (
    <AppLayout barbearia={barbearia} currentStep="servico">
      <div className="flex flex-col gap-5">
        <div>
          <h1 className="text-2xl font-semibold text-stone-50">
            Escolha o servico
          </h1>
          <p className="mt-2 text-sm leading-6 text-stone-300">
            Selecione uma opcao para continuar.
          </p>
        </div>

        <div className="grid gap-3">
          {servicos.map((servico) => (
            <ServiceCard
              key={servico.id}
              servico={servico}
              isSelected={servicoSelecionado?.id === servico.id}
              onSelect={handleServiceSelect}
            />
          ))}
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            className="min-h-12 rounded-md bg-amber-400 px-5 text-sm font-bold text-stone-950 shadow-lg shadow-amber-950/20 transition enabled:hover:bg-amber-300 disabled:cursor-not-allowed disabled:bg-stone-700 disabled:text-stone-400 disabled:shadow-none"
            disabled={!servicoSelecionado}
            onClick={() => navigate('/barbeiros')}
          >
            Continuar
          </button>
        </div>
      </div>
    </AppLayout>
  )
}
