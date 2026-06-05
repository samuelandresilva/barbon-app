import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppLayout, HeaderApp } from '../../components/layout'
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
  const [serviceFilter, setServiceFilter] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  const filteredServices = useMemo(() => {
    const normalizedFilter = serviceFilter.trim().toLocaleLowerCase('pt-BR')

    if (!normalizedFilter) {
      return servicos
    }

    return servicos.filter((servico) =>
      [servico.nome, servico.descricao].some((value) =>
        value.toLocaleLowerCase('pt-BR').includes(normalizedFilter),
      ),
    )
  }, [serviceFilter, servicos])

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
          setErrorMessage('Não foi possível carregar os serviços disponíveis.')
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
        <HeaderApp />
        <main className="mx-auto w-full max-w-5xl px-5 py-8">
          <p className="rounded-md border border-stone-800 bg-stone-900 p-4 text-sm text-stone-300">
            Carregando informações...
          </p>
        </main>
      </div>
    )
  }

  if (errorMessage || !barbearia) {
    return (
      <div className="min-h-dvh bg-stone-950 text-stone-100">
        <HeaderApp />
        <main className="mx-auto w-full max-w-5xl px-5 py-8">
          <p className="rounded-md border border-red-900/60 bg-red-950/30 p-4 text-sm text-red-100">
            {errorMessage || 'Não foi possível carregar os serviços disponíveis.'}
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
            Escolha o serviço
          </h1>
          <p className="mt-2 text-sm leading-6 text-stone-300">
            Selecione uma opção para continuar.
          </p>
        </div>

        <label className="grid gap-2">
          <span className="text-sm font-medium text-stone-200">
            Filtrar serviços
          </span>
          <input
            type="search"
            className="min-h-12 rounded-md border border-stone-700 bg-stone-950/70 px-4 text-sm text-stone-50 outline-none shadow-inner shadow-black/20 transition focus:border-amber-400"
            value={serviceFilter}
            onChange={(event) => setServiceFilter(event.target.value)}
            placeholder="Digite o nome do serviço"
          />
        </label>

        <div className="grid gap-3">
          {filteredServices.map((servico) => (
            <ServiceCard
              key={servico.id}
              servico={servico}
              isSelected={servicoSelecionado?.id === servico.id}
              onSelect={handleServiceSelect}
            />
          ))}
        </div>

        {filteredServices.length === 0 ? (
          <p className="rounded-md border border-stone-800 bg-stone-900/90 p-4 text-sm text-stone-300">
            Nenhum serviço encontrado para o filtro informado.
          </p>
        ) : null}

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
