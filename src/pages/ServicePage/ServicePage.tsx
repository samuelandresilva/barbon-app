import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppLayout, HeaderOakbeard } from '../../components/layout'
import { ServiceCard } from '../../components/service'
import { useBooking } from '../../contexts'
import {
  getDadosEmpresa,
  getServicos,
} from '../../services/googleSheetsService'
import type { DadosEmpresa, Servico } from '../../types'

export function ServicePage() {
  const navigate = useNavigate()
  const {
    servicoSelecionado,
    setProfissionalSelecionado,
    setServicoSelecionado,
  } = useBooking()
  const [empresa, setDadosEmpresa] = useState<DadosEmpresa | null>(null)
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
        const [loadedDadosEmpresa, loadedServicos] = await Promise.all([
          getDadosEmpresa(),
          getServicos(),
        ])

        if (isMounted) {
          setDadosEmpresa(loadedDadosEmpresa)
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
    setProfissionalSelecionado(null)
  }

  if (isLoading) {
    return (
      <div className="min-h-dvh bg-transparent text-[var(--color-text)]">
        <HeaderOakbeard />
        <main className="mx-auto w-full max-w-5xl px-5 py-8">
          <p className="rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] p-4 text-sm text-[var(--color-muted)]">
            Carregando informações...
          </p>
        </main>
      </div>
    )
  }

  if (errorMessage || !empresa) {
    return (
      <div className="min-h-dvh bg-transparent text-[var(--color-text)]">
        <HeaderOakbeard />
        <main className="mx-auto w-full max-w-5xl px-5 py-8">
          <p className="rounded-md border border-[var(--color-error-border)] bg-[var(--color-error-background)] p-4 text-sm text-[var(--color-error-text)]">
            {errorMessage || 'Não foi possível carregar os serviços disponíveis.'}
          </p>
        </main>
      </div>
    )
  }

  return (
    <AppLayout dadosEmpresa={empresa} currentStep="servico">
      <div className="flex flex-col gap-5">
        <div>
          <h1 className="text-2xl font-semibold text-[var(--color-text)]">
            Escolha o serviço
          </h1>
          <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">
            Selecione uma opção para continuar.
          </p>
        </div>

        <label className="grid gap-2">
          <span className="text-sm font-medium text-[var(--color-muted)]">
            Filtrar serviços
          </span>
          <input
            type="search"
            className="min-h-12 rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] px-4 text-sm text-[var(--color-text)] outline-none shadow-inner shadow-[color:var(--color-shadow)] transition focus:border-[var(--color-primary)]"
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
          <p className="rounded-md border border-[var(--color-border)] bg-[var(--color-background)] p-4 text-sm text-[var(--color-muted)]">
            Nenhum serviço encontrado para o filtro informado.
          </p>
        ) : null}

        <div className="flex justify-end">
          <button
            type="button"
            className="min-h-12 rounded-md bg-[var(--color-primary)] px-5 text-sm font-bold text-[var(--color-on-primary)] shadow-lg shadow-[color:var(--color-shadow)] transition enabled:hover:bg-[var(--color-primary-hover)] disabled:cursor-not-allowed disabled:bg-[var(--color-secondary)] disabled:text-[var(--color-subtle)] disabled:shadow-none"
            disabled={!servicoSelecionado}
            onClick={() => navigate('/profissionais')}
          >
            Continuar
          </button>
        </div>
      </div>
    </AppLayout>
  )
}
