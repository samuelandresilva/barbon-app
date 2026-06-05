import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ProfessionalCard } from '../../components/professional'
import { AppLayout, HeaderOakbeard } from '../../components/layout'
import { useBooking } from '../../contexts'
import {
  getDadosEmpresa,
  getProfissionalServicos,
  getProfissionais,
} from '../../services/googleSheetsService'
import type { DadosEmpresa, Profissional, ProfissionalServico } from '../../types'

export function ProfessionalPage() {
  const navigate = useNavigate()
  const {
    profissionalSelecionado,
    servicoSelecionado,
    setProfissionalSelecionado,
  } = useBooking()
  const [dadosEmpresa, setDadosEmpresa] = useState<DadosEmpresa | null>(null)
  const [profissionais, setProfissionais] = useState<Profissional[]>([])
  const [profissionalServicos, setProfissionalServicos] = useState<ProfissionalServico[]>(
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
          loadedDadosEmpresa,
          loadedProfissionais,
          loadedProfissionalServicos,
        ] = await Promise.all([
          getDadosEmpresa(),
          getProfissionais(),
          getProfissionalServicos(),
        ])

        if (isMounted) {
          setDadosEmpresa(loadedDadosEmpresa)
          setProfissionais(loadedProfissionais)
          setProfissionalServicos(loadedProfissionalServicos)
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

  const profissionaisCompativeis = useMemo(() => {
    if (!servicoSelecionado) {
      return []
    }

    const compatibleProfissionalIds = new Set(
      profissionalServicos
        .filter((item) => item.servicoId === servicoSelecionado.id)
        .map((item) => item.profissionalId),
    )

    return profissionais.filter((profissional) => compatibleProfissionalIds.has(profissional.id))
  }, [profissionalServicos, profissionais, servicoSelecionado])

  const selectedProfissionalIsCompatible = profissionaisCompativeis.some(
    (profissional) => profissional.id === profissionalSelecionado?.id,
  )

  if (!servicoSelecionado) {
    return (
      <div className="min-h-dvh bg-transparent text-[var(--color-text)]">
        <HeaderOakbeard />
        <main className="mx-auto w-full max-w-5xl px-5 py-8">
          <div className="rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
            <p className="text-sm text-[var(--color-muted)]">
              Selecione um serviço antes de escolher o profissional.
            </p>
            <button
              type="button"
              className="mt-4 min-h-11 rounded bg-[var(--color-primary)] px-4 text-sm font-semibold text-[var(--color-on-primary)]"
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

  if (errorMessage || !dadosEmpresa) {
    return (
      <div className="min-h-dvh bg-transparent text-[var(--color-text)]">
        <HeaderOakbeard />
        <main className="mx-auto w-full max-w-5xl px-5 py-8">
          <p className="rounded-md border border-[var(--color-error-border)] bg-[var(--color-error-background)] p-4 text-sm text-[var(--color-error-text)]">
            {errorMessage || 'Não foi possível carregar os profissionais disponíveis.'}
          </p>
        </main>
      </div>
    )
  }

  return (
    <AppLayout dadosEmpresa={dadosEmpresa} currentStep="profissional">
      <div className="flex flex-col gap-5">
        <div>
          <h1 className="text-2xl font-semibold text-[var(--color-text)]">
            Escolha o profissional
          </h1>
          <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">
            Exibindo profissionais que realizam {servicoSelecionado.nome}.
          </p>
        </div>

        <div className="grid gap-3">
          {profissionaisCompativeis.map((profissional) => (
            <ProfessionalCard
              key={profissional.id}
              profissional={profissional}
              isSelected={profissionalSelecionado?.id === profissional.id}
              onSelect={setProfissionalSelecionado}
            />
          ))}
        </div>

        <div className="flex justify-between gap-3">
          <button
            type="button"
            className="min-h-12 rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] px-5 text-sm font-semibold text-[var(--color-muted)] transition hover:border-[var(--color-border-hover)]"
            onClick={() => navigate('/servicos')}
          >
            Voltar
          </button>
          <button
            type="button"
            className="min-h-12 rounded-md bg-[var(--color-primary)] px-5 text-sm font-bold text-[var(--color-on-primary)] shadow-lg shadow-[color:var(--color-shadow)] transition enabled:hover:bg-[var(--color-primary-hover)] disabled:cursor-not-allowed disabled:bg-[var(--color-secondary)] disabled:text-[var(--color-subtle)] disabled:shadow-none"
            disabled={!selectedProfissionalIsCompatible}
            onClick={() => navigate('/data')}
          >
            Continuar
          </button>
        </div>
      </div>
    </AppLayout>
  )
}
